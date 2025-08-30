import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar overlay for mobile */}
        <div
          className={`
            fixed inset-0 z-40 transition-opacity duration-300 lg:hidden
            ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Sidebar */}
        <div
          className={`
            transform transition-transform duration-300 ease-in-out z-50
            fixed lg:relative h-full
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main
          className={`
            flex-1 p-4 transition-all duration-300 overflow-auto
            ${sidebarOpen && isMobile ? "opacity-30" : "opacity-100"}
          `}
        >
          <div className="bg-gradient-to-b from-blue-500 to-amber-300 rounded-2xl shadow-lg p-6 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
