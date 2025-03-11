import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const navigate = useNavigate();

	const handleStart = () => {
		navigate("/chatbox");
	};

	return (
		<section className="py-20 px-6 sm:px-12 text-center">
			<motion.div
				className="bg-orange-100 border border-orange-300 rounded-2xl p-8 sm:p-12 shadow-xl max-w-3xl mx-auto"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
					Communicate Beyond Borders
				</h1>
				<p className="text-lg sm:text-xl text-gray-700 mb-8">
					Experience effortless, real-time message translation and connect with
					anyone, anywhere, instantly.
				</p>
				<motion.button
					whileHover={{
						scale: 1.05,
						backgroundColor: "#f97316",
						color: "#fff",
					}}
					whileTap={{ scale: 0.95 }}
					className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-orange-600 transition"
					onClick={handleStart}
				>
					Start Chatting Now
				</motion.button>
			</motion.div>
		</section>
	);
};

export default Hero;
