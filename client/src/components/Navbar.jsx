import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiSpeakAiLine } from "react-icons/ri";
import { TiThMenuOutline } from "react-icons/ti";
import AuthModal from "./AuthModal";

const NavbarMenu = [
	{ id: 1, title: "Home", link: "/" },
	{ id: 2, title: "About", link: "/about" },
	{ id: 3, title: "Services", link: "/services" },
	{ id: 4, title: "Contact", link: "/contact" },
];

const Navbar = () => {
	const [isAuthOpen, setAuthOpen] = useState(false);
	const [authType, setAuthType] = useState("login"); // "login" or "register"
	const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

	const openModal = (type) => {
		setAuthType(type);
		setAuthOpen(true);
		setMenuOpen(false); // Close menu when modal opens
	};

	return (
		<>
			<nav className="m-5">
				<div className="container flex items-center justify-between py-8 mx-auto px-4 sm:px-8 lg:px-16">
					{/* Logo section */}
					<div className="flex items-center gap-2 py-3 text-2xl font-bold uppercase">
						<RiSpeakAiLine />
						<p>Let's</p>
						<p className="text-orange-400">Talk</p>
					</div>

					{/* Menu section - Visible only on larger screens */}
					<div className="hidden md:block">
						<ul className="flex items-center gap-6 text-gray-600">
							{NavbarMenu.map((item) => (
								<li key={item.id}>
									<a
										href={item.link}
										className="relative inline-block py-1 px-1 text-gray-600 font-semibold hover:text-orange-400 transition duration-300
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 
            after:transition-all after:duration-300 hover:after:w-full"
									>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Auth Buttons - Hidden on small screens */}
					<div className="hidden md:flex items-center">
						<button
							onClick={() => openModal("register")}
							className="flex items-center gap-2 hover:bg-orange-500 hover:text-white rounded-full p-2 duration-200 cursor-pointer"
						>
							Register <MdOutlineAccountCircle />
						</button>
						<button
							onClick={() => openModal("login")}
							className="flex items-center gap-2 hover:bg-orange-500 hover:text-white rounded-full p-2 duration-200 cursor-pointer"
						>
							Login <MdLogin />
						</button>
					</div>

					{/* Hamburger Menu - Only on small screens */}
					<div className="md:hidden">
						<TiThMenuOutline
							className="text-4xl cursor-pointer"
							onClick={() => setMenuOpen(!menuOpen)}
						/>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Dropdown */}
			{menuOpen && (
				<div className="md:hidden absolute top-20 w-full bg-orange-100 border border-orange-600 rounded-2xl shadow-lg p-4 z-50">
					<ul className="flex flex-col items-center gap-4 text-gray-700">
						<li>
							<a href="/" className="hover:text-orange-400">
								Home
							</a>
						</li>
						<li>
							<a href="/about" className="hover:text-orange-400">
								About
							</a>
						</li>
						<li>
							<a href="/services" className="hover:text-orange-400">
								Services
							</a>
						</li>
						<li>
							<a href="/contact" className="hover:text-orange-400">
								Contact
							</a>
						</li>
						<hr className="w-full border-gray-300" />

						{/* Auth Buttons inside Mobile Menu */}
						<button
							onClick={() => openModal("register")}
							className="w-full text-center bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
						>
							Register
						</button>
						<button
							onClick={() => openModal("login")}
							className="w-full text-center bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
						>
							Login
						</button>
					</ul>
				</div>
			)}

			{/* Auth Modal */}
			<AuthModal
				isOpen={isAuthOpen}
				onClose={() => setAuthOpen(false)}
				type={authType}
				setAuthType={setAuthType} // ✅ Allows switching between login & register
			/>
		</>
	);
};

export default Navbar;
