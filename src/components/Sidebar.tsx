import { Link, useLocation } from "react-router-dom";
import { projects } from "../projects/projectsData";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6 z-40 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Projects count */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide">
            Projects ({projects.length})
          </h3>
        </div>

        {/* Projects list with custom scrollbar */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] pr-2 -mr-2 sidebar-scroll">
          <nav className="space-y-2 pb-2">
            {projects.map((proj) => (
              <Link
                key={proj.path}
                to={`/${proj.path}`}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-md hover:translate-x-1 group ${
                  location.pathname === `/${proj.path}`
                    ? "bg-white text-indigo-800 font-semibold shadow-lg"
                    : "text-indigo-100"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                    location.pathname === `/${proj.path}`
                      ? "bg-indigo-600"
                      : "bg-indigo-300 group-hover:bg-white"
                  }`}
                ></span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {proj.title}
                  </div>
                  <div className="text-xs text-indigo-300 group-hover:text-indigo-100 truncate">
                    {proj.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
        {/* Footer */}
        <footer>
          <div className="text-center text-indigo-300 text-sm p-4">
            {new Date().getFullYear()} Made with{" "}
            <span className="text-red-400">❤️</span> using React & Tailwind
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
