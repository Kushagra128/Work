import React from "react";
import Hero from "../components/Hero";
import AI from "../components/AI";
import Testimonial from "../components/Testimonial";

const Home = () => {
	return (
		<main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<Hero />
				<hr className="my-12 border-orange-200" />
				<AI />
				<hr className="my-12 border-orange-200" />
				<Testimonial />
			</div>
		</main>
	);
};

export default Home;
