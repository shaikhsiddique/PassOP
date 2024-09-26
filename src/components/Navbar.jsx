import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between gap-4">
  {/* Logo Section */}
  <div className="con1">
    <h1 className="text-[4vw] sm:text-2xl md:text-5xl font-bold tracking-wide flex items-center space-x-2">
      <span className="text-green-400">&lt;</span>
      <span className="text-white">Pass</span>
      <span className="text-green-400">OP &gt;</span>
    </h1>
  </div>

  {/* Navigation Links */}
  <div className="con2">
    <ul className="flex space-x-6 text-lg">
      <li>
        <a href="#home" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
          Home
        </a>
      </li>
      <li>
        <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
          About
        </a>
      </li>
      <li>
        <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
          Contact
        </a>
      </li>
    </ul>
  </div>
</nav>
  )
};

export default Navbar;
