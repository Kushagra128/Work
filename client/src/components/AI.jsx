import React, { useState, useEffect } from "react";
import gif from "../assets/images/gif/AI.gif";
import { motion } from "framer-motion";

const typingText = "Hi! I’m Your Professional AI Assistant... 🤖";

const AI = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index < typingText.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + typingText[index]);
				setIndex(index + 1);
			}, 80); // Slightly faster for a polished feel
			return () => clearTimeout(timeout);
		}
	}, [index]);

	return (
		<section className="py-16 px-6 sm:px-12 bg-white rounded-xl shadow-lg">
			<div className="flex flex-col md:flex-row items-center justify-between gap-8">
				{/* Left Side - AI GIF */}
				<motion.div
					className="flex justify-center items-center"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					<img
						src={gif}
						alt="AI Assistant"
						className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-orange-200"
					/>
				</motion.div>

				{/* Right Side - Text Content */}
				<div className="md:w-2/3 text-center md:text-left">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-orange-500 mb-4"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						{displayedText}
					</motion.h2>
					<p className="text-gray-700 text-lg leading-relaxed mb-6">
						Elevate your communication with an AI-powered assistant designed to
						break language barriers and deliver seamless, real-time
						translations.
					</p>

					{/* Features Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="flex items-start gap-2">
							<span className="text-orange-500 text-xl">⚡</span>
							<p className="text-gray-700 font-medium">Real-Time Translation</p>
						</div>
						<div className="flex items-start gap-2">
							<span className="text-orange-500 text-xl">🌎</span>
							<p className="text-gray-700 font-medium">
								Multi-Language Support
							</p>
						</div>
						<div className="flex items-start gap-2">
							<span className="text-orange-500 text-xl">🤖</span>
							<p className="text-gray-700 font-medium">Smart AI Responses</p>
						</div>
						<div className="flex items-start gap-2">
							<span className="text-orange-500 text-xl">📱</span>
							<p className="text-gray-700 font-medium">
								Cross-Device Compatibility
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AI;
