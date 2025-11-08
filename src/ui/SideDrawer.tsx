import * as React from "react";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  children: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  title,
  width = "max-w-md",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-transparent backdrop-brightness-90 bg-opacity-50 duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer container */}
      <div
        className={`relative bg-white h-full w-full ${width} shadow-2xl transform transition-transform duration-300 border-l border-gray-200 rounded-l-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center mb-4 p-6 border-b">
            <h2 className="text-xl font-bold text-purple-950">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 focus:outline-none"
            >
              X
            </button>
          </div>
        )}

        {/* Drawer content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;