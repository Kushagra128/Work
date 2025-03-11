import React, { useState } from "react";
import { MdLogin, MdOutlineAccountCircle } from "react-icons/md";
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
	const [authType, setAuthType] = useState("login");
	const [menuOpen, setMenuOpen] = useState(false);

	const openModal = (type) => {
		setAuthType(type);
		setAuthOpen(true);
		setMenuOpen(false);
	};

	return (
		<>
			<nav className="sticky top-0 z-50 bg-white shadow-md">
				<div className="container mx-auto px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
					{/* Logo */}
					<a
						href="/"
						className="flex items-center gap-2 text-2xl font-bold uppercase"
					>
						<RiSpeakAiLine className="text-orange-500" />
						<span>Let’s</span>
						<span className="text-orange-400">Talk</span>
					</a>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-8">
						<ul className="flex gap-6">
							{NavbarMenu.map((item) => (
								<li key={item.id}>
									<a
										href={item.link}
										className="text-gray-600 font-semibold hover:text-orange-500 transition duration-300 relative group"
									>
										{item.title}
										<span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
									</a>
								</li>
							))}
						</ul>
						<div className="flex gap-4">
							<button
								onClick={() => openModal("register")}
								className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-semibold transition"
							>
								Register <MdOutlineAccountCircle />
							</button>
							<button
								onClick={() => openModal("login")}
								className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-semibold transition"
							>
								Login <MdLogin />
							</button>
						</div>
					</div>

					{/* Mobile Menu Toggle */}
					<div className="md:hidden">
						<TiThMenuOutline
							className="text-3xl cursor-pointer text-gray-600"
							onClick={() => setMenuOpen(!menuOpen)}
						/>
					</div>
				</div>

				{/* Mobile Menu */}
				{menuOpen && (
					<div className="md:hidden bg-white shadow-lg p-4">
						<ul className="flex flex-col gap-4 text-gray-600">
							{NavbarMenu.map((item) => (
								<li key={item.id}>
									<a
										href={item.link}
										className="block py-2 hover:text-orange-500 font-semibold transition"
										onClick={() => setMenuOpen(false)}
									>
										{item.title}
									</a>
								</li>
							))}
							<li>
								<button
									onClick={() => openModal("register")}
									className="w-full text-left py-2 hover:text-orange-500 font-semibold transition"
								>
									Register
								</button>
							</li>
							<li>
								<button
									onClick={() => openModal("login")}
									className="w-full text-left py-2 hover:text-orange-500 font-semibold transition"
								>
									Login
								</button>
							</li>
						</ul>
					</div>
				)}
			</nav>

			<AuthModal
				isOpen={isAuthOpen}
				onClose={() => setAuthOpen(false)}
				type={authType}
				setAuthType={setAuthType}
			/>
		</>
	);
};

export default Navbar;
