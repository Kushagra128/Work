import React from "react";
import { RiSpeakAiLine } from "react-icons/ri";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-t from-orange-200 to-orange-50 py-8">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
				{/* Logo */}
				<a
					href="/"
					className="flex items-center gap-2 text-2xl font-bold uppercase"
				>
					<RiSpeakAiLine className="text-orange-500" />
					<span>Let’s</span>
					<span className="text-orange-400">Talk</span>
				</a>

				{/* Copyright */}
				<p className="text-sm text-gray-700">
					© {new Date().getFullYear()} Let’s Talk. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
