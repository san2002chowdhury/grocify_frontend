import React from "react";
import { sidebarLinks } from "../assets/asset";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="fixed left-0 w-64 h-[calc(100vh-4rem)] border-r border-gray-300 bg-white">
      {sidebarLinks.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === "/admin"}
          className={({ isActive }) => `flex items-center py-5 pr-4 pl-5 gap-3
          
      ${
        isActive
          ? "border-r-4 md:border-r-[6px] bg-primary/20 border-primary text-primary"
          : "hover:bg-primary/20 border-white text-gray-700"
      }`}
          onClick={() => scrollTo(0, 0)}
        >
          <img src={item.icon} alt="icon" className="w-7 h-7" />
          <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSidebar;
