import React from "react";

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  return (
    <div className="w-1/5 p-4 border border-[#A1A1A1] rounded-md">
      <h2 className="text-xl font-bold mb-6 text-center text-[#545454]">SECTIONS</h2>
      <button
        className="w-full py-2 mb-3 bg-headerground rounded-md hover:bg-gray-300 text-sm"
        onClick={() => setActiveSection("aanvraag")}
      >
        AANVRAGEN
      </button>
      <button
        className="w-full py-2 mb-3 bg-headerground rounded-md hover:bg-gray-300 text-sm"
        onClick={() => setActiveSection("absentie")}
      >
        ABSENTIE
      </button>
      <button
        className="w-full py-2 bg-headerground rounded-md hover:bg-gray-300 text-sm"
        onClick={() => setActiveSection("gebruikers")}
      >
        GEBRUIKERS
      </button>
    </div>
  );
};

export default Sidebar;
