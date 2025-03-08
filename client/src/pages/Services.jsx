import React from "react";
import ChatBox from "../components/ChatBox";
import assitent from "../assets/images/gif/AI.gif";

const Services = () => {
	return (
		<>
			<header className="p-6 text-center bg-white">
				<div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
					<img
						src={assitent}
						alt="AI Assistant"
						className="mx-auto w-32 h-32 mb-4"
					/>
					<h1 className="text-3xl font-bold">
						Let's Talk - Seamless Communication
					</h1>
					<p className="mt-2 text-lg">
						Break language barriers with our AI-powered real-time chat service.
					</p>
				</div>
			</header>
			<ChatBox />
			<section className="p-6 bg-white">
				<div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
					<h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						<details className="bg-gray-50 p-4 rounded-lg shadow-md">
							<summary className="text-gray-800 font-medium cursor-pointer">
								How does real-time translation work?
							</summary>
							<p className="mt-2 text-gray-600">
								Our AI-powered system instantly translates messages between
								languages using advanced natural language processing, ensuring
								seamless communication.
							</p>
						</details>
						<details className="bg-gray-50 p-4 rounded-lg shadow-md">
							<summary className="text-gray-800 font-medium cursor-pointer">
								Is Let’s Talk free to use?
							</summary>
							<p className="mt-2 text-gray-600">
								Yes, our basic features are free, with optional premium plans
								for additional functionality.
							</p>
						</details>
					</div>
				</div>
			</section>
			<section className="p-6 bg-orange-100 text-center">
				<div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Ready to Break Language Barriers?
					</h2>
					<p className="text-gray-700 mb-4">
						Sign up now and start chatting with anyone, anywhere, in any
						language!
					</p>
					<button className="bg-orange-300 text-white px-6 py-3 rounded-lg hover:bg-orange-400 transition font-semibold">
						Sign Up Today
					</button>
				</div>
			</section>
		</>
	);
};

export default Services;
