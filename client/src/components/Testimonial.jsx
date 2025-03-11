import React from "react";
import { motion } from "framer-motion";

// Sample testimonial data (you can replace this with real data or props)
const testimonials = [
	{
		id: 1,
		name: "Sophie L.",
		role: "Freelance Translator",
		quote:
			"Let’s Talk has transformed how I connect with clients worldwide. The real-time translation is flawless!",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder image
	},
	{
		id: 2,
		name: "Mark R.",
		role: "Business Owner",
		quote:
			"This AI assistant is a game-changer for my international team. Communication is now effortless.",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder image
	},
	{
		id: 3,
		name: "Aisha K.",
		role: "Student",
		quote:
			"I love how easy it is to chat with friends in different languages. Highly recommend!",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg", // Placeholder image
	},
];

const Testimonial = () => {
	return (
		<section className="py-16 px-6 sm:px-12 bg-white">
			<div className="container mx-auto">
				{/* Section Header */}
				<motion.h2
					className="text-3xl md:text-4xl font-bold text-orange-500 text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					What Our Users Say
				</motion.h2>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial) => (
						<motion.div
							key={testimonial.id}
							className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: testimonial.id * 0.2 }}
						>
							<div className="flex items-center mb-4">
								<img
									src={testimonial.avatar}
									alt={testimonial.name}
									className="w-12 h-12 rounded-full border-2 border-orange-300 mr-3"
								/>
								<div>
									<h3 className="text-lg font-semibold text-gray-800">
										{testimonial.name}
									</h3>
									<p className="text-sm text-gray-600">{testimonial.role}</p>
								</div>
							</div>
							<p className="text-gray-700 italic leading-relaxed">
								"{testimonial.quote}"
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
