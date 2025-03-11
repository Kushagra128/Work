import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./components/Footer";


const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/chatbox" element={<ChatBox />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="*"
					element={
						<div className="text-center py-20 text-gray-700">
							404 - Page Not Found
						</div>
					}
				/>
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
