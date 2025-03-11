import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Services = () => {
	const navigate = useNavigate();

	const handleChat = () => navigate("/chatbox");
	const handleVideoConference = () => navigate("/video-conference"); // Placeholder route
	const handleTextScanner = () => navigate("/text-scanner"); // Placeholder route
	const handleOpenTranslator = () => navigate("/open-translator"); // Placeholder route

	const services = [
		{
			id: 1,
			title: "Real-Time Chatting",
			description:
				"Connect instantly with anyone, anywhere, using our AI-powered chat feature. Seamlessly translate messages in real-time across multiple languages.",
			icon: "💬",
			onClick: handleChat,
		},
		{
			id: 2,
			title: "Video Conferencing",
			description:
				"Host crystal-clear video meetings with real-time translation and subtitles. Collaborate globally without language barriers.",
			icon: "🎥",
			onClick: handleVideoConference,
		},
		{
			id: 3,
			title: "Text Scanner",
			description:
				"Scan printed or handwritten text and translate it instantly. Perfect for documents, signs, or notes in any language.",
			icon: "📷",
			onClick: handleTextScanner,
		},
		{
			id: 4,
			title: "Open Translator",
			description:
				"Translate full conversations or documents with our versatile open translator. Customize settings for accuracy and context.",
			icon: "🌐",
			onClick: handleOpenTranslator,
		},
	];

	// State for interactive Q&A
	const [userQuestion, setUserQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmitQuestion = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		// Simulate AI response (Grok 3 logic)
		setTimeout(() => {
			let response = "I'm Grok 3, created by xAI. Let me help you! ";
			if (userQuestion.toLowerCase().includes("chat")) {
				response +=
					"Our Real-Time Chatting feature translates messages instantly. Try it at /chatbox!";
			} else if (userQuestion.toLowerCase().includes("video")) {
				response +=
					"Video Conferencing offers real-time translation. Check it out at /video-conference!";
			} else if (userQuestion.toLowerCase().includes("scan")) {
				response +=
					"Use the Text Scanner for instant translation of scanned text. Visit /text-scanner!";
			} else if (userQuestion.toLowerCase().includes("translator")) {
				response +=
					"The Open Translator customizes translations. Explore it at /open-translator!";
			} else {
				response +=
					"That’s a great question! Please provide more details, or try asking about our services (e.g., chat, video, scan, translator).";
			}
			setAnswer(response);
			setIsSubmitting(false);
		}, 1000); // Simulated delay for AI response
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Hero Section */}
				<motion.section
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
						Our Services
					</h1>
					<p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
						Discover the power of Let’s Talk with our cutting-edge AI solutions
						designed to revolutionize global communication.
					</p>
				</motion.section>

				{/* Services Grid */}
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{services.map((service) => (
						<motion.div
							key={service.id}
							className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: service.id * 0.1 }}
							onClick={service.onClick}
						>
							<div className="text-4xl mb-4 text-orange-500">
								{service.icon}
							</div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								{service.title}
							</h3>
							<p className="text-gray-700 text-sm leading-relaxed">
								{service.description}
							</p>
							<motion.button
								className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Learn More
							</motion.button>
						</motion.div>
					))}
				</section>

				{/* Frequently Asked Questions Section */}
				<section className="bg-white rounded-xl shadow-lg p-8 mb-16">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-orange-500 text-center mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						Frequently Asked Questions
					</motion.h2>
					<div className="space-y-6">
						{/* Pre-defined FAQs */}
						<details className="group">
							<summary className="text-lg font-semibold text-gray-800 cursor-pointer group-open:mb-2">
								How does real-time chatting work?
							</summary>
							<p className="text-gray-700 text-sm leading-relaxed">
								Our AI translates your messages instantly as you type,
								supporting over 100 languages. Simply start a chat at /chatbox!
							</p>
						</details>
						<details className="group">
							<summary className="text-lg font-semibold text-gray-800 cursor-pointer group-open:mb-2">
								Is video conferencing secure?
							</summary>
							<p className="text-gray-700 text-sm leading-relaxed">
								Yes, we use end-to-end encryption for all video calls. Access it
								via /video-conference for secure global meetings.
							</p>
						</details>
						<details className="group">
							<summary className="text-lg font-semibold text-gray-800 cursor-pointer group-open:mb-2">
								Can the Text Scanner recognize handwriting?
							</summary>
							<p className="text-gray-700 text-sm leading-relaxed">
								Yes, our advanced OCR technology supports both printed and
								handwritten text. Try it at /text-scanner!
							</p>
						</details>
						<details className="group">
							<summary className="text-lg font-semibold text-gray-800 cursor-pointer group-open:mb-2">
								What makes Open Translator different?
							</summary>
							<p className="text-gray-700 text-sm leading-relaxed">
								It offers customizable translation settings for accuracy, ideal
								for complex documents. Explore it at /open-translator!
							</p>
						</details>
					</div>

					{/* Interactive Q&A */}
					<motion.div
						className="mt-8 p-6 bg-orange-50 rounded-xl shadow-md"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h3 className="text-xl font-semibold text-orange-500 mb-4">
							Ask Your Question
						</h3>
						<form onSubmit={handleSubmitQuestion} className="space-y-4">
							<textarea
								className="w-full p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
								rows="3"
								value={userQuestion}
								onChange={(e) => setUserQuestion(e.target.value)}
								placeholder="Type your question here..."
								disabled={isSubmitting}
							/>
							<motion.button
								type="submit"
								className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								disabled={isSubmitting}
							>
								{isSubmitting ? "Answering..." : "Submit"}
							</motion.button>
						</form>
						{answer && (
							<motion.div
								className="mt-4 p-4 bg-white rounded-lg shadow-md text-gray-700"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<p>
									<strong>Grok 3:</strong> {answer}
								</p>
							</motion.div>
						)}
					</motion.div>
				</section>

				{/* CTA Section */}
				{/* <motion.section
					className="text-center bg-orange-100 border border-orange-300 rounded-2xl p-8 shadow-xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
						Ready to Explore?
					</h2>
					<p className="text-lg text-gray-700 mb-6">
						Start experiencing seamless communication with Let’s Talk today.
					</p>
					<motion.button
						whileHover={{
							scale: 1.05,
							backgroundColor: "#f97316",
							color: "#fff",
						}}
						whileTap={{ scale: 0.95 }}
						className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-orange-600 transition"
						onClick={handleChat}
					>
						Start Chatting Now
					</motion.button>
				</motion.section> */}
			</div>
		</main>
	);
};

export default Services;
