import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
	sender: String,
	color: String,
	message: String,
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", ChatSchema);
