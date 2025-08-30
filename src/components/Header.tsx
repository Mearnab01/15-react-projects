import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { projects } from "../projects/projectsData";
import { Search, X, Zap, Menu } from "lucide-react";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<typeof projects>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter projects when typing
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProjects([]);
      setShowSearchResults(false);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = projects.filter(
        (proj) =>
          proj.title.toLowerCase().includes(query) ||
          proj.description.toLowerCase().includes(query) ||
          proj.path.toLowerCase().includes(query)
      );
      setFilteredProjects(filtered);
      setShowSearchResults(true);
    }
  }, [searchQuery]);

  // Close search dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredProjects.length > 0) {
      navigate(`/${filteredProjects[0].path}`);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (path: string) => {
    navigate(`/${path}`);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <header className="w-full border-b bg-gradient-to-r from-purple-900 to-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
          >
            <div className="bg-white p-2 rounded-lg mr-3">
              <Zap className="w-6 h-6 text-indigo-600" />{" "}
              {/* Lucide Zap icon */}
            </div>
            <h1 className="font-bold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Project Hub
            </h1>
          </Link>
        </div>

        {/* Search bar - Desktop */}
        <div className="hidden md:block relative w-1/3" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-indigo-800 text-white rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-indigo-400" />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-indigo-400 hover:text-indigo-200" />
                </button>
              )}
            </div>
          </form>

          {/* Search Results Dropdown */}
          {showSearchResults && filteredProjects.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-indigo-800 rounded-lg shadow-lg border border-indigo-700 max-h-80 overflow-y-auto">
              <div className="py-2">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.path}
                    onClick={() => handleSearchResultClick(proj.path)}
                    className="px-4 py-2 hover:bg-indigo-700 cursor-pointer transition-colors"
                  >
                    <div className="text-white font-medium">{proj.title}</div>
                    <div className="text-indigo-300 text-sm truncate">
                      {proj.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-blue-200 font-medium px-3 py-2 rounded-md hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="text-white hover:text-blue-200 font-medium px-3 py-2 rounded-md hover:bg-white/10"
          >
            Projects
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" /> // Close icon
            ) : (
              <Menu className="h-6 w-6 text-white" /> // Menu icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-purple-900 to-blue-900 shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="text-white hover:text-blue-200 font-medium px-3 py-2 rounded-md hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="text-white hover:text-blue-200 font-medium px-3 py-2 rounded-md hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            {/* Add other links if needed */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
