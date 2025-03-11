import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import translate from "translate";
import Sanscript from "@indic-transliteration/sanscript";

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("✅ Connected to MongoDB"))
	.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Schemas
const UserSchema = new mongoose.Schema({
	socketId: String,
	username: String,
	language: String,
	color: String,
	status: String,
	joinedAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", UserSchema);

const ChatSchema = new mongoose.Schema({
	sender: String,
	senderLang: String,
	color: String,
	message: String,
	timestamp: { type: Date, default: Date.now },
});
const Chat = mongoose.model("Chat", ChatSchema);

const ContactSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	message: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", ContactSchema);

// Configure translation engine
translate.engine = "google";
translate.key = process.env.GOOGLE_TRANSLATE_API_KEY || undefined;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Contact Submission Route
app.post("/api/contact", async (req, res) => {
	const { name, email, message } = req.body;
	try {
		const newContact = new Contact({ name, email, message });
		await newContact.save();
		res.status(201).json({ message: "Contact saved successfully" });
	} catch (error) {
		console.error("Error saving contact:", error);
		res.status(500).json({ message: "Error saving contact", error });
	}
});

const users = {};

const translateText = async (text, fromLang, toLang) => {
	try {
		if (fromLang === toLang) return text;

		let textToTranslate = text;
		if (fromLang === "hg") {
			textToTranslate = Sanscript.t(text, "itrans", "devanagari");
			console.log(`Transliterated "${text}" to "${textToTranslate}"`);
			fromLang = "hi";
		}
		if (toLang === "hg") return text;

		const translated = await translate(textToTranslate, {
			from: fromLang,
			to: toLang,
		});
		return translated;
	} catch (error) {
		console.error("Translation Error:", error.message);
		return text;
	}
};

io.on("connection", async (socket) => {
	console.log(`✅ User connected: ${socket.id}`);

	const chatHistory = await Chat.find().sort({ timestamp: 1 }).limit(20);
	socket.emit("chat_history", chatHistory);

	socket.on("join_chat", async ({ username, language, color }) => {
		users[socket.id] = { username, language, color, status: "online" };
		await User.create({
			socketId: socket.id,
			username,
			language,
			color,
			status: "online",
		});
		console.log(`${username} joined with language: ${language}`);
		io.emit("user_list", Object.values(users));
	});

	socket.on("send_message", async ({ message, sender, isVoice = false }) => {
		console.log(`Message from ${sender}: ${message} (isVoice: ${isVoice})`);
		const senderData = users[socket.id];
		if (!senderData) return;

		const senderLang = senderData.language;
		const chatMessage = {
			sender,
			senderLang,
			color: senderData.color,
			message,
			timestamp: new Date(),
		};

		await Chat.create(chatMessage);
		console.log(`Saved to DB: ${message}`);

		io.to(socket.id).emit("receive_message", {
			sender: "Me",
			color: senderData.color,
			message,
			isVoice,
		});

		for (let socketId in users) {
			if (socketId !== socket.id) {
				const receiverLang = users[socketId].language;
				const translatedMessage = await translateText(
					message,
					senderLang,
					receiverLang
				);
				console.log(
					`Sending to ${socketId} (${users[socketId].username}): ${translatedMessage}`
				);
				io.to(socketId).emit("receive_message", {
					sender,
					color: senderData.color,
					message: translatedMessage,
					isVoice,
				});
			}
		}
	});

	socket.on("disconnect", async () => {
		console.log(`❌ User disconnected: ${socket.id}`);
		if (users[socket.id]) {
			await User.updateOne(
				{ socketId: socket.id },
				{ status: "offline", $set: { disconnectedAt: new Date() } }
			);
			users[socket.id].status = "offline";
			io.emit("user_list", Object.values(users));
			delete users[socket.id];
		}
	});
});

server.listen(process.env.PORT || 5000, () =>
	console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
);
