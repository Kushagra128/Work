import React from "react";
import { RiSpeakAiLine } from "react-icons/ri";

const Footer = () => {
	return (
		<footer className="w-full py-6 bg-gradient-to-t from-orange-200 to-orange-50">
			<div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col md:flex-row justify-between items-center">
				{/* Logo Section */}
				<div className="flex items-center gap-2 text-2xl font-bold uppercase">
					<RiSpeakAiLine />
					<p>Let's</p>
					<p className="text-orange-400">Talk</p>
				</div>

				{/* Copyright Section */}
				<p className="text-sm mt-4 md:mt-0 text-gray-700">
					© {new Date().getFullYear()} Let's Talk. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
