"use client";
import DashHeader from "../compontenten/DashHeader";
import DashFooter from "../compontenten/DashFooter";
import Sidebar from "../compontenten/Sidebar";
import { useState } from "react";
import Aanvraag from "../compontenten/Aanvraag";
import Absentie from "../compontenten/Absentie";
import Gebruikers from "../compontenten/Gebruikers";
export default function Admin() {
  const links = [
    { href: "/admin", label: "Home" },
    { href: "/admin", label: "DASHBOARD" },
  ];
  const [activeSection, setActiveSection] = useState<string>("aanvraag");
  const renderSection = () => {
    switch (activeSection) {
      case "aanvraag":
        return <Aanvraag />;
      case "absentie":
        return <Absentie />;
      case "gebruikers":
        return <Gebruikers />;
      default:
        return <Aanvraag />;
    }
  };
  return (
    <>
      {/* Admin Header  */}
      <DashHeader links={links} />
      {/* Eind Admin Header */}

      {/* Admin content */}
      <div className="inneradmin w-full flex justify-center items-center">
        <div className="inner_dash w-11/12 flex gap-2">
          <Sidebar setActiveSection={setActiveSection} />

          <div className="w-4/5">{renderSection()}</div>
        </div>
      </div>
      {/* Eind Admin content */}

      {/* Admin Footer */}
      <DashFooter Links={links} />
      {/* Eind Admin Footer */}
    </>
  );
}
