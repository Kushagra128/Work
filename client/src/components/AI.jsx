import React, { useState, useEffect } from "react";
import gif from "../assets/images/gif/AI.gif";
import { motion } from "framer-motion";

const typingText = "Hi! Here is your AI Assistant... 🤖";

const AI = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [index, setIndex] = useState(0);

	// Typing effect
	useEffect(() => {
		if (index < typingText.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + typingText[index]);
				setIndex(index + 1);
			}, 100); // Speed of typing effect
			return () => clearTimeout(timeout);
		}
	}, [index]);

	return (
		<section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left  px-6 sm:px-12 bg-white w-full">
			{/* Left Side - AI GIF */}
			<div className="flex justify-center items-center">
				<img src={gif} alt="AI Assistant" className="w-40 h-40 felx items-center justify-center md:w-100 md:h-100" />
			</div>

			{/* Right Side - Typing Text Animation */}
			<div className="md:w-1/2 mt-6 md:mt-0 md:pl-10">
				<motion.h2
					className="text-4xl font-bold text-orange-500"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					{displayedText} {/* Shows text with typing effect */}
				</motion.h2>

				<p className="text-gray-700 text-lg mt-3 leading-relaxed font-semibold">
					🚀 I'm your **AI-powered language assistant**!<br></br>  
					🌍 Breaking down language barriers for smooth<br></br> communication.<br></br>  
					💬 Type your message, and I'll **translate and deliver it <br></br>instantly**!  
				</p>

				{/* Features Section */}
				<div className="mt-5 font-semibold">
					<h3 className="text-xl font-semibold text-gray-800">Why Choose Me?</h3>
					<div className="mt-2 text-gray-700 text-md list-disc list-inside">
						<p>⚡ **Real-time message translation**</p>
						<p>🌎 **Supports multiple languages**</p>
						<p>🤖 **AI-powered smart responses**</p>
						<p>📱 **Seamless cross-device experience**</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AI;
