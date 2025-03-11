import React from "react";
import { motion } from "framer-motion";
import kushagra from "../assets/images/avatar/kushagra.png"; // Corrected import syntax
import abhishek from "../assets/images/avatar/abhishek.png"; // Corrected import syntax
import dheeraj from "../assets/images/avatar/dheeraj.png";   // Corrected import syntax

// Team data with corrected avatar references
const teamMembers = [
  {
    id: 1,
    name: "Kushagra",
    role: "Frontend Developer",
    bio: "Crafting seamless and intuitive user experiences.",
    avatar: kushagra, 
  },
  {
    id: 2,
    name: "Abhishek", 
    role: "Lead Developer",
    bio: "Visionary leader driving the mission to connect the world.",
    avatar: abhishek, 
  },
  {
    id: 3,
    name: "Dheeraj",
    role: "UX Designer",
    bio: "Architect of our cutting-edge AI technology.",
    avatar: dheeraj, 
  },
];

const Team = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <motion.div
          key={member.id}
          className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: member.id * 0.2 }}
        >
          <img
            src={member.avatar}
            alt={member.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
          <p className="text-orange-500 font-medium mb-2">{member.role}</p>
          <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Team;