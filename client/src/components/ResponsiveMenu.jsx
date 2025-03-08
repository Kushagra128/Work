import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdLogin } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

const ResponsiveMenu = ({ open, setOpen }) => {
	return (
		<AnimatePresence mode="wait">
			{open && (
				<motion.div
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -100 }}
					transition={{ duration: 0.3 }}
					className="absolute top-20 left-0 w-full h-screen z-20 flex justify-center items-start"
					onClick={() => setOpen(false)} // Close menu on outside click
				>
					<div
						className="text-xl font-semibold uppercase bg-orange-300 py-10 px-20 m-6 rounded-3xl"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
					>
						<ul className="flex flex-col justify-center items-center gap-10">
							<li className="hover:text-white hover:bg-orange-500 py-2 px-3 rounded-full">
								<a href="#">Home</a>
							</li>
							<li className="hover:text-white hover:bg-orange-500 py-2 px-3 rounded-full">
								<a href="#">About</a>
							</li>
							<li className="hover:text-white hover:bg-orange-500 py-2 px-3 rounded-full">
								<a href="#">Services</a>
							</li>
							<li className="hover:text-white hover:bg-orange-500 py-2 px-3 rounded-full">
								<a href="#">Contact</a>
							</li>
						</ul>
						<div className="flex items-center justify-center mt-8">
							<button className="flex items-center gap-2 hover:bg-orange-500 hover:text-white rounded-full p-2 duration-200 cursor-pointer">
								<p className="py-1 px-2 flex items-center gap-2">
									Register <MdOutlineAccountCircle />{" "}
								</p>
							</button>
							<button className="flex items-center gap-2 hover:bg-orange-500 hover:text-white rounded-full p-2 duration-200 cursor-pointer">
								<p className="py-1 px-2 flex items-center gap-2">
									Login <MdLogin />{" "}
								</p>
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ResponsiveMenu;
