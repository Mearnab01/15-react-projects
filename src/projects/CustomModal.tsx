import { useState, useEffect, useRef } from "react";

const CustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
          >
            <h2 className="text-xl font-bold mb-4">Custom Modal</h2>
            <p className="mb-4">
              This is a custom modal with keyboard & outside click support.
            </p>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              ✕
            </button>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomModal;
