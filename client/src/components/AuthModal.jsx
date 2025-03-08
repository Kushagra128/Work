import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AuthModal = ({ isOpen, onClose, type, setAuthType, setUser }) => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	// ✅ Disable scrolling when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	// ✅ Handle form input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// ✅ Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const endpoint =
				type === "login" ? "/api/auth/login" : "/api/auth/register";
			const { data } = await axios.post(endpoint, formData, {
				withCredentials: true,
			});

			setUser(data.user); // ✅ Set user after login/register
			onClose(); // ✅ Close modal
		} catch (err) {
			setError(err.response?.data?.message || "Something went wrong");
		}
	};

	return (
		<div className="fixed inset-0 flex rounded-2xl items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
				className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
			>
				<h2 className="text-2xl font-bold text-center text-orange-500">
					{type === "login" ? "Login" : "Register"}
				</h2>

				<form className="mt-4" onSubmit={handleSubmit}>
					{type === "register" && (
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="w-full p-2 border rounded mb-3"
							onChange={handleChange}
							required
						/>
					)}
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full p-2 border rounded mb-3"
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full p-2 border rounded mb-3"
						onChange={handleChange}
						required
					/>
					<button
						type="submit"
						className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
					>
						{type === "login" ? "Login" : "Register"}
					</button>
				</form>

				{error && <p className="text-red-500 text-center mt-2">{error}</p>}

				<p className="text-center text-sm mt-4">
					{type === "login"
						? "Don't have an account?"
						: "Already have an account?"}{" "}
					<span
						className="text-orange-500 cursor-pointer font-semibold"
						onClick={() => setAuthType(type === "login" ? "register" : "login")}
					>
						{type === "login" ? "Sign Up" : "Login"}
					</span>
				</p>

				<button
					className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-xl"
					onClick={onClose}
				>
					✖
				</button>
			</motion.div>
		</div>
	);
};

export default AuthModal;
