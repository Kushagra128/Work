import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Team from "../components/Team";
// Assuming you'll replace this with the actual illustration image
import missionIllustration from "../assets/images/mission/mission.png"; // Placeholder path

const About = () => {
	const navigate = useNavigate();

	const handleStart = () => {
		navigate("/chatbox");
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
						About Let’s Talk
					</h1>
					<p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
						We’re on a mission to break down language barriers and connect the
						world through seamless.
					</p>
				</motion.section>

				{/* Mission Section */}
				<section className="bg-white rounded-xl shadow-lg p-8 mb-16">
					<div className="flex flex-col md:flex-row items-center gap-6">
						<div className="md:w-2/3">
							<h2 className="text-3xl font-bold text-orange-500 mb-4">
								Our Mission
							</h2>
							<p className="text-gray-700 text-lg leading-relaxed">
								At Let’s Talk, we believe communication should know no
								boundaries. Our advanced AI technology empowers individuals and
								businesses to connect instantly, no matter the language. We’re
								here to make global conversations effortless, inclusive, and
								meaningful.
							</p>
						</div>
						<div className="md:w-1/3 flex justify-center">
							<img
								src={missionIllustration}
								alt="Mission Illustration"
								className="w-full max-w-xs h-auto rounded-lg object-contain"
							/>
						</div>
					</div>
				</section>

				{/* Divider */}
				<hr className="my-12 border-orange-200" />

				{/* Team Section */}
				<section className="mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-orange-500 text-center mb-12">
						Meet Our Team
					</h2>
					<Team />
				</section>

				{/* CTA Section */}
				<motion.section
					className="text-center bg-orange-100 border border-orange-300 rounded-2xl p-8 shadow-xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
						Ready to Connect?
					</h2>
					<p className="text-lg text-gray-700 mb-6">
						Join thousands of users breaking language barriers with Let’s Talk.
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
				</motion.section>
			</div>
		</main>
	);
};

export default About;
