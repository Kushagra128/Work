// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const colors = [
// 	"#f97316", "#10b981", "#3b82f6", "#a855f7", "#ef4444",
// 	"#facc15", "#ec4899", "#14b8a6", "#8b5cf6", "#d946ef"
// ];

// const ChatBox = () => {
// 	const [message, setMessage] = useState("");
// 	const [chat, setChat] = useState([]);
// 	const [username, setUsername] = useState("");
// 	const [language, setLanguage] = useState("en");
// 	const [usersList, setUsersList] = useState([]);
// 	const [isUserSet, setIsUserSet] = useState(false);
// 	const [sidebarOpen, setSidebarOpen] = useState(false);

// 	// Assign random color to user
// 	const [color, setColor] = useState(
// 		colors[Math.floor(Math.random() * colors.length)]
// 	);

// 	useEffect(() => {
// 		if (isUserSet) {
// 			socket.emit("join_chat", { username, language, color });

// 			socket.on("chat_history", (history) => setChat(history));
// 			socket.on("receive_message", (data) =>
// 				setChat((prev) => [...prev, data])
// 			);
// 			socket.on("user_list", (users) => setUsersList(users));

// 			return () => {
// 				socket.off("chat_history");
// 				socket.off("receive_message");
// 				socket.off("user_list");
// 			};
// 		}
// 	}, [isUserSet]);

// 	const sendMessage = () => {
// 		if (message.trim()) {
// 			socket.emit("send_message", { message, sender: username });
// 			setMessage("");
// 		}
// 	};

// 	const handleUserSubmit = (e) => {
// 		e.preventDefault();
// 		if (username.trim() && language.trim()) {
// 			setIsUserSet(true);
// 		}
// 	};

// 	return (
// 		<div className="flex flex-col md:flex-row bg-gray-100 p-5">
// 			{/* Mobile Sidebar Toggle */}
// 			<button
// 				className="md:hidden p-3 bg-orange-500 text-white fixed top-5 left-4 rounded-md z-50"
// 				onClick={() => setSidebarOpen(!sidebarOpen)}
// 			>
// 				☰ Users
// 			</button>

// 			{/* Left Sidebar - Online Users */}
// 			<div
// 				className={`absolute md:static top-0 left-0 h-full md:h-auto w-64 md:w-1/4 bg-gray-200 border-r border-gray-600 p-4 rounded-2xl shadow-lg md:shadow-none transition-transform ${
// 					sidebarOpen ? "translate-x-0" : "-translate-x-full"
// 				} md:translate-x-0 md:flex md:flex-col`}
// 			>
// 				<h3 className="font-bold mb-3 text-center">Online Users</h3>
// 				<div className="p-3 bg-white rounded-2xl overflow-y-auto max-h-[70vh]">
// 					{/* Current User */}
// 					{usersList
// 						.filter((u) => u.username === username)
// 						.map((u, index) => (
// 							<div key={index} className="flex items-center mb-2 gap-2">
// 								<p className="ml-2">🟢 ME</p>
// 							</div>
// 						))}

// 					<hr className="my-2 border-gray-400" />

// 					{/* Other Users */}
// 					{usersList
// 						.filter((u) => u.username !== username)
// 						.map((u, index) => (
// 							<div key={index} className="flex items-center mb-2 gap-2">
// 								<p className="ml-2">
// 									{u.status === "online" ? "🟢" : "🔴"} {u.username}
// 								</p>
// 							</div>
// 						))}
// 				</div>
// 			</div>

// 			{/* Chat Area */}
// 			<div className="w-full md:w-3/4 flex flex-col p-5 bg-gray-200 border border-gray-600 rounded-2xl shadow-md">
// 				{!isUserSet ? (
// 					<form
// 						className="p-5 bg-white rounded-2xl w-full max-w-lg mx-auto"
// 						onSubmit={handleUserSubmit}
// 					>
// 						<h2 className="text-xl font-bold mb-3 text-center">
// 							Enter Your Details
// 						</h2>
// 						<input
// 							type="text"
// 							placeholder="Enter your name"
// 							className="w-full p-2 mb-2 border rounded"
// 							value={username}
// 							onChange={(e) => setUsername(e.target.value)}
// 							required
// 						/>
// 						<select
// 							className="w-full p-2 mb-2 border rounded"
// 							value={language}
// 							onChange={(e) => setLanguage(e.target.value)}
// 							required
// 						>
// 							<option value="en">English</option>
// 							<option value="es">Spanish</option>
// 							<option value="fr">French</option>
// 							<option value="hi">Hindi</option>
// 							<option value="de">German</option>
// 						</select>

// 						<label className="block font-semibold">Select Chat Color:</label>
// 						<div className="flex flex-wrap gap-2 mb-3">
// 							{colors.map((c, i) => (
// 								<div
// 									key={i}
// 									className={`w-6 h-6 rounded-full cursor-pointer border ${
// 										c === color ? "border-black" : "border-transparent"
// 									}`}
// 									style={{ backgroundColor: c }}
// 									onClick={() => setColor(c)}
// 								></div>
// 							))}
// 						</div>

// 						<button
// 							type="submit"
// 							className="bg-orange-500 text-white p-2 rounded w-full"
// 						>
// 							Save & Start Chatting
// 						</button>
// 					</form>
// 				) : (
// 					<>
// 						<h2 className="text-xl font-bold mb-3 text-center">Live Chat</h2>
// 						{/* Chat Messages */}
// 						<div className="border p-4 h-72 md:h-[400px] overflow-y-auto mb-4 bg-gray-100 rounded-lg">
// 							{chat.length === 0 && (
// 								<div className="text-center text-gray-600 p-4">
// 									👋 Start a conversation by sending a message!
// 								</div>
// 							)}
// 							{chat.map((msg, index) => (
// 								<div
// 									key={index}
// 									className={`flex w-full mb-2 ${
// 										msg.sender === username ? "justify-end" : "justify-start"
// 									}`}
// 								>
// 									<div
// 										className="p-2 rounded-lg py-2 px-4 text-white max-w-[60%]"
// 										style={{
// 											backgroundColor:
// 												msg.color || (msg.sender === username ? "#facc15" : "#3b82f6"),
// 											wordWrap: "break-word",
// 											// textAlign: msg.sender === username ? "right" : "left",
// 										}}
// 									>
// 										<span className="font-bold">
// 											{msg.sender === username ? "Me" : msg.sender}:
// 										</span>{" "}
// 										{msg.message}
// 									</div>
// 								</div>
// 							))}
// 						</div>

// 						{/* Message Input */}
// 						<div className="flex gap-2">
// 							<input
// 								type="text"
// 								placeholder="Type a message..."
// 								value={message}
// 								onChange={(e) => setMessage(e.target.value)}
// 								className="w-6/8 p-2 border rounded-2xl"
// 							/>
// 							<button
// 								onClick={sendMessage}
// 								className="w-2/8 bg-orange-500 text-white p-2 rounded-2xl border border-orange-900 hover:bg-orange-600 cursor-pointer"
// 							>
// 								Send
// 							</button>
// 						</div>
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default ChatBox;



// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import translateText from "./utils/translationService.js";

// dotenv.config();

// mongoose
// 	.connect(process.env.MONGO_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log("✅ Connected to MongoDB"))
// 	.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// const ChatSchema = new mongoose.Schema({
// 	sender: String,
// 	color: String,
// 	message: String,
// 	timestamp: { type: Date, default: Date.now },
// });
// const Chat = mongoose.model("Chat", ChatSchema);

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });

// app.use(cors());
// app.use(express.json());

// const users = {}; // Store users { socketId: { username, language, color, status } }

// io.on("connection", async (socket) => {
// 	console.log(`✅ User connected: ${socket.id}`);

// 	// Send chat history to the new user
// 	const chatHistory = await Chat.find().sort({ timestamp: 1 }).limit(20);
// 	socket.emit("chat_history", chatHistory);

// 	socket.on("join_chat", async ({ username, language, color }) => {
// 		users[socket.id] = { username, language, color, status: "online" };
// 		console.log(`${username} joined with language: ${language}`);

// 		// 🔥 Removed ChatBot welcome message here

// 		io.emit("user_list", Object.values(users));
// 	});

// 	socket.on("send_message", async ({ message, sender }) => {
// 		const senderData = users[socket.id];
// 		if (!senderData) return;

// 		const senderLang = senderData.language;

// 		// Send only the original message to the sender
// 		io.to(socket.id).emit("receive_message", {
// 			sender: "Me",
// 			color: senderData.color,
// 			message,
// 		});

// 		// Send translated messages to other users
// 		for (let socketId in users) {
// 			if (socketId !== socket.id) {
// 				const receiverLang = users[socketId].language;
// 				const translatedMessage = await translateText(
// 					message,
// 					senderLang,
// 					receiverLang
// 				);

// 				io.to(socketId).emit("receive_message", {
// 					sender,
// 					color: senderData.color,
// 					message: translatedMessage,
// 				});
// 			}
// 		}

// 		// Save message in DB
// 		await Chat.create({ sender, color: senderData.color, message });
// 	});

// 	socket.on("disconnect", () => {
// 		console.log(`❌ User disconnected: ${socket.id}`);
// 		if (users[socket.id]) {
// 			users[socket.id].status = "offline";
// 			io.emit("user_list", Object.values(users));
// 			delete users[socket.id];
// 		}
// 	});
// });

// server.listen(5000, () => console.log("✅ Server running on port 5000"));



// import axios from "axios";

// const translateText = async (text, fromLang, toLang) => {
// 	try {
// 		if (fromLang === toLang) return text;

// 		const response = await axios.get(
// 			`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
// 				text
// 			)}&langpair=${fromLang}|${toLang}`
// 		);

// 		const translatedText = response.data.responseData.translatedText;
// 		if (
// 			translatedText
// 				.toLowerCase()
// 				.includes("please select two distinct languages")
// 		) {
// 			return text;
// 		}

// 		return translatedText || text;
// 	} catch (error) {
// 		console.error("Translation Error:", error);
// 		return text;
// 	}
// };

// export default translateText;
