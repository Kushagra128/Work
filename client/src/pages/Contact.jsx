import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Contact = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus("");

		try {
			const response = await fetch("http://localhost:5000/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			if (response.ok) {
				setStatus(
					"Message submitted successfully! We'll get back to you soon."
				);
				setFormData({ name: "", email: "", message: "" });
			} else {
				setStatus(`Error: ${result.message}`);
			}
		} catch (error) {
			setStatus("Error: Failed to submit message. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
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
						Contact Us
					</h1>
					<p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
						We’d love to hear from you! Reach out with any questions or
						feedback, and we’ll respond promptly.
					</p>
				</motion.section>

				{/* Contact Form */}
				<motion.section
					className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								className="block text-gray-700 font-medium mb-2"
								htmlFor="name"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
								required
								disabled={isSubmitting}
							/>
						</div>
						<div>
							<label
								className="block text-gray-700 font-medium mb-2"
								htmlFor="email"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
								required
								disabled={isSubmitting}
							/>
						</div>
						<div>
							<label
								className="block text-gray-700 font-medium mb-2"
								htmlFor="message"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								className="w-full p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
								rows="5"
								required
								disabled={isSubmitting}
							/>
						</div>
						<motion.button
							type="submit"
							className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Send Message"}
						</motion.button>
						{status && (
							<motion.p
								className={`text-center ${
									status.includes("Error") ? "text-red-500" : "text-green-500"
								}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								{status}
							</motion.p>
						)}
					</form>
				</motion.section>

				{/* Contact Info */}
				<motion.section
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
						Get in Touch
					</h2>
					<p className="text-lg text-gray-700 mb-4">
						Email: support@letstalk.com | Phone: +1-800-LET-TALK
					</p>
					<p className="text-gray-600">
						Let’s Talk HQ, 123 Global Connect St, Tech City, TC 12345
					</p>
				</motion.section>
			</div>
		</main>
	);
};

export default Contact;
