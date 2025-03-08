import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const navigate = useNavigate(); // React Router navigation

	const handleStart = () => {
		navigate("/chatbox"); // Navigate to ChatBox
	};

	return (
		<section className="flex flex-col items-center justify-center text-center py-16 px-6 sm:px-12">
			<div className="bg-orange-100 border border-orange-400 rounded-2xl p-6 sm:p-10 shadow-2xl w-full max-w-4xl">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
					Chat Without Language Barriers
				</h1>
				<p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
					Instantly translate messages in real-time and communicate effortlessly with anyone, anywhere.
				</p>
				<div className="mt-6">
					<motion.button
						whileTap={{
							scale: 0.9,
							backgroundColor: "#f97316",
							color: "#fff",
						}}
						whileHover={{ scale: 1.1 }}
						className="bg-white text-orange-500 px-6 py-3 rounded-xl border border-orange-400 font-bold 
              hover:bg-orange-400 hover:text-white transition cursor-pointer text-lg"
						onClick={handleStart} // Navigate to ChatBox
					>
						Start Chatting
					</motion.button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
