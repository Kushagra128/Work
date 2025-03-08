import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const socket = io("http://localhost:5000");

const colors = [
	{ name: "Soft Orange", value: "#f7a628" },
	{ name: "Mint Green", value: "#d1e7dd" },
	{ name: "Sky Blue", value: "#dbeafe" },
	{ name: "Lavender", value: "#e9d5ff" },
	{ name: "Light Red", value: "#fee2e2" },
	{ name: "Sunny Yellow", value: "#fefcbf" },
	{ name: "Pink Blush", value: "#fce7f3" },
	{ name: "Seafoam", value: "#d1fae5" },
	{ name: "Lilac", value: "#ede9fe" },
	{ name: "Peach", value: "#ffe4e6" },
];

const messageVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const sidebarVariants = {
	hidden: { x: "-100%", opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.3, ease: "easeInOut" },
	},
};

const buttonVariants = {
	closed: { rotate: 0 },
	open: { rotate: 90 },
};

const ChatBox = () => {
	const [message, setMessage] = useState("");
	const [chat, setChat] = useState([]);
	const [username, setUsername] = useState("");
	const [language, setLanguage] = useState("en");
	const [usersList, setUsersList] = useState([]);
	const [isUserSet, setIsUserSet] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [color, setColor] = useState(colors[0].value);
	const [isRecording, setIsRecording] = useState(false);
	const [error, setError] = useState("");
	const mediaRecorderRef = useRef(null);
	const audioChunksRef = useRef([]);
	const chatContainerRef = useRef(null); // Ref for chat container

	// Scroll to bottom when chat updates
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTo({
				top: chatContainerRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [chat]);

	useEffect(() => {
		if (isUserSet) {
			socket.emit("join_chat", { username, language, color });

			socket.on("chat_history", (history) => {
				setChat(history.map((msg) => ({ ...msg, animation: false })));
			});

			socket.on("receive_message", (data) => {
				setChat((prev) => [
					...prev,
					{ ...data, animation: true, id: Date.now() },
				]);
			});

			socket.on("user_list", (users) => {
				setUsersList(users);
			});

			socket.on("connect_error", (err) => {
				setError("Connection failed. Please refresh.");
				console.error("Socket error:", err);
			});

			return () => {
				socket.off("chat_history");
				socket.off("receive_message");
				socket.off("user_list");
				socket.off("connect_error");
			};
		}
	}, [isUserSet, username, language, color]);

	const sendMessage = () => {
		if (message.trim() && message.length <= 5000) {
			socket.emit("send_message", {
				message,
				sender: username,
				isVoice: false,
			});
			setMessage("");
		} else if (message.length > 5000) {
			setError("Message too long (max 5,000 characters).");
		}
	};

	const startRecording = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const mediaRecorder = new MediaRecorder(stream);
				mediaRecorderRef.current = mediaRecorder;
				audioChunksRef.current = [];

				mediaRecorder.ondataavailable = (event) => {
					audioChunksRef.current.push(event.data);
				};

				mediaRecorder.onstop = () => {
					const audioBlob = new Blob(audioChunksRef.current, {
						type: "audio/wav",
					});
					const reader = new FileReader();
					reader.onloadend = () => {
						const base64String = reader.result.split(",")[1];
						socket.emit("send_message", {
							message: base64String,
							sender: username,
							isVoice: true,
						});
					};
					reader.readAsDataURL(audioBlob);
					stream.getTracks().forEach((track) => track.stop());
				};

				mediaRecorder.start();
				setIsRecording(true);
			})
			.catch((error) => {
				setError("Microphone access denied. Please allow permission.");
				console.error("Microphone error:", error);
			});
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	const playMessage = (text, lang) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = lang === "hg" ? "hi-IN" : lang;
		window.speechSynthesis.speak(utterance);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && message.trim()) {
			sendMessage();
		}
	};

	const handleUserSubmit = (e) => {
		e.preventDefault();
		if (username.trim() && language.trim()) {
			setIsUserSet(true);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="flex flex-col w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
				{!isUserSet ? (
					<div className="p-6 bg-white rounded-2xl shadow-inner border border-gray-200">
						<form onSubmit={handleUserSubmit} className="space-y-6">
							<h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
								Join the Chat with Let’s Talk
							</h2>
							<div className="space-y-4">
								<input
									type="text"
									placeholder="Your Name"
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
								<select
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
									value={language}
									onChange={(e) => setLanguage(e.target.value)}
									required
								>
									<option value="en">English</option>
									<option value="es">Spanish</option>
									<option value="fr">French</option>
									<option value="hi">Hindi</option>
									<option value="de">German</option>
									<option value="hg">Hinglish</option>
								</select>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Chat Color
									</label>
									<select
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
										value={color}
										onChange={(e) => setColor(e.target.value)}
									>
										{colors.map((c) => (
											<option
												key={c.value}
												value={c.value}
												style={{ backgroundColor: c.value }}
											>
												{c.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<button
								type="submit"
								className="w-full bg-orange-300 text-white py-3 rounded-lg hover:bg-orange-400 transition font-semibold text-sm"
							>
								Start Chatting
							</button>
						</form>
					</div>
				) : (
					<div className="flex flex-row h-[80vh]">
						<AnimatePresence>
							{sidebarOpen && (
								<motion.div
									variants={sidebarVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="fixed md:hidden w-64 flex flex-col bg-gray-50 text-gray-800 shadow-lg rounded-r-2xl z-40 h-full"
								>
									<div className="p-3 border-b border-gray-200">
										<h3 className="text-sm font-semibold text-gray-700">
											Online Users
										</h3>
									</div>
									<div className="flex-1 p-2 space-y-2 overflow-y-auto">
										{usersList
											.filter((u) => u.username === username)
											.map((u, index) => (
												<div key={index} className="flex items-center">
													<span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
													<p className="text-xs font-medium text-gray-900">
														ME ({u.username})
													</p>
												</div>
											))}
										{usersList
											.filter((u) => u.username !== username)
											.map((u, index) => (
												<div key={index} className="flex items-center">
													<span
														className={`w-2 h-2 rounded-full mr-2 ${
															u.status === "online"
																? "bg-green-400"
																: "bg-red-400"
														}`}
													></span>
													<p className="text-xs text-gray-700">{u.username}</p>
												</div>
											))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						{isUserSet && (
							<motion.button
								variants={buttonVariants}
								animate={sidebarOpen ? "open" : "closed"}
								className="md:hidden fixed top-4 left-4 z-50 bg-orange-300 text-white p-2 rounded-full shadow-lg hover:bg-orange-400 transition focus:outline-none"
								onClick={() => setSidebarOpen(!sidebarOpen)}
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
							</motion.button>
						)}

						<div className="flex-1 flex flex-col">
							<div className="p-3 bg-orange-300 text-gray-800 text-center rounded-tl-2xl">
								<h2 className="text-lg font-semibold">
									Let’s Talk - Live Chat
								</h2>
								{error && <p className="text-red-600 text-sm">{error}</p>}
							</div>

							<div
								ref={chatContainerRef}
								className="flex-1 p-3 overflow-y-auto bg-gray-50"
							>
								{chat.length === 0 ? (
									<div className="text-center text-gray-500 py-4">
										<p className="text-sm">
											👋 Say something to start the conversation!
										</p>
									</div>
								) : (
									<AnimatePresence>
										{chat.slice(-10).map((msg) => (
											<motion.div
												key={
													msg.id ||
													`${msg.sender}-${msg.timestamp}-${msg.message}`
												}
												initial="hidden"
												animate="visible"
												exit="hidden"
												variants={messageVariants}
												className={`flex mb-3 ${
													msg.sender === "Me" ? "justify-end" : "justify-start"
												}`}
											>
												<div
													className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md flex items-center ${
														msg.sender === "Me" ? "text-black" : "text-gray-800"
													}`}
													style={{ backgroundColor: msg.color || "#d1e7dd" }}
												>
													<span className="font-semibold text-sm">
														{msg.sender === "Me" ? "Me" : msg.sender}:
													</span>
													<span className="text-sm ml-1">{msg.message}</span>
													{msg.isVoice && msg.sender !== "Me" && (
														<button
															onClick={() => playMessage(msg.message, language)}
															className="ml-2 text-gray-600 hover:text-gray-800"
														>
															<svg
																className="w-4 h-4"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
																/>
															</svg>
														</button>
													)}
												</div>
											</motion.div>
										))}
									</AnimatePresence>
								)}
							</div>

							<div className="p-3 bg-white border-t border-gray-200">
								<div className="flex gap-2 items-center">
									<input
										type="text"
										placeholder="Type your message..."
										className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										onKeyPress={handleKeyPress}
									/>
									<button
										onClick={sendMessage}
										className="bg-orange-300 text-white p-2 rounded-lg hover:bg-orange-400 transition font-semibold text-sm"
										style={{ width: "80px" }}
									>
										Send
									</button>
									<button
										onClick={isRecording ? stopRecording : startRecording}
										className={`p-2 rounded-full ${
											isRecording ? "bg-red-500" : "bg-green-500"
										} text-white`}
									>
										{isRecording ? (
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										) : (
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
												/>
											</svg>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatBox;
