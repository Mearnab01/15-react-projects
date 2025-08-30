import { useState, useRef } from "react";

const tabsData = [
  { id: "tab1", label: "Home", content: "Welcome to the Home tab!" },
  { id: "tab2", label: "Profile", content: "This is your Profile tab." },
  { id: "tab3", label: "Settings", content: "Adjust your Settings here." },
];

const CustomTabs = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % tabsData.length;
    if (e.key === "ArrowLeft")
      nextIndex = (index - 1 + tabsData.length) % tabsData.length;

    if (nextIndex !== index) {
      setActiveTab(tabsData[nextIndex].id);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex border-b border-gray-300" role="tablist">
          {tabsData.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex-1 p-3 text-center focus:outline-none ${
                activeTab === tab.id
                  ? "border-b-4 border-blue-500 font-semibold text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 text-gray-700">
          {tabsData.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              hidden={activeTab !== tab.id}
              className={activeTab === tab.id ? "block" : "hidden"}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTabs;
