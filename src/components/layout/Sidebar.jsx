import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Settings,
  LayoutDashboard,
  User,
  BriefcaseMedical,
  PlusIcon
} from "lucide-react";
import logo from "../../assets/img/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarClasses = `fixed top-0 left-0 h-full bg-[#ffffff] text-black transition-all duration-300 ease-in-out z-40 shadow-lg ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0 md:relative ${isCollapsed ? "w-20" : "w-64"}`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50 text-white bg-blue-600 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Logo and Collapse Button */}
        <div
          className={`flex ${
            isCollapsed ? "flex-col" : "flex-row"
          } items-center justify-between p-4 h-16`}
        >
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <img src={logo} alt="Logo" className="rounded-full w-12 h-10" />
            {!isCollapsed && (
              <span className="ml-3 font-semibold text-lg">
                <p className="text-blue-600">Diagnostica</p>
              </span>
            )}
          </div>

          {!isCollapsed && (
            <button
              className="hidden md:block text-black hover:bg-gray-200 p-1 rounded-full"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Collapse sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-2 overflow-y-auto h-[calc(100vh-64px)]">
          <SidebarLink
            to="/dashboard"
            icon={<LayoutDashboard size={isCollapsed ? 22 : 20} />}
            text="Dashboard"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/patient"
            icon={<User size={isCollapsed ? 22 : 20} />}
            text="Patient"
            isCollapsed={isCollapsed}
            matchPaths={["/edit-patient", "/view-patient", "/diagnostica-form"]}
          />
          <SidebarLink
            to="/doctor"
            icon={<BriefcaseMedical size={isCollapsed ? 22 : 20} />}
            text="Doctors"
            isCollapsed={isCollapsed}
          />
           <SidebarLink
            to="/add-doctor"
            icon={<PlusIcon size={isCollapsed ? 22 : 20} />}
            text="Add Doctor"
            isCollapsed={isCollapsed}
          />
          {/* <SidebarLink
            to="/settings"
            icon={<Settings size={isCollapsed ? 22 : 20} />}
            text="Settings"
            isCollapsed={isCollapsed}
          /> */}
        </nav>

        {/* Expand Button */}
        {isCollapsed && (
          <button
            className="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 text-black hover:bg-gray-200 p-2 rounded-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Expand sidebar"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

const SidebarLink = ({ to, icon, text, isCollapsed, matchPaths = [] }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive =
    currentPath === to ||
    matchPaths.some((path) => currentPath.startsWith(path));

  return (
    <Link
      to={to}
      className={`flex items-center py-3 px-4 rounded-lg mx-2 my-1 transition-all duration-200 ${
        isCollapsed ? "justify-center" : "space-x-3"
      } ${
        isActive
          ? "bg-[#1849D6] text-white font-semibold shadow"
          : "text-black hover:bg-[#3366FF] hover:text-white hover:shadow-md hover:brightness-110"
      }`}
      title={isCollapsed ? text : ""}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="text-sm">{text}</span>}
    </Link>
  );
};

export default Sidebar;
