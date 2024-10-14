import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Payment from "./components/Payment";
import MainContent from "./components/MainContent";
import { GiHamburgerMenu } from "react-icons/gi";

const HomePage = ({ activeTab: defaultActiveTab , connectionType, setIsConnected}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultActiveTab || "home"); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  useEffect(() => {
    if (location.pathname.includes("home-page")) {
      setActiveTab("home");
    } else if (location.pathname.includes("payment-realnumber")) {
      setActiveTab("payments");
    } else if (location.pathname.includes("notifications")) {
      setActiveTab("notifications");
    }
    
  }, [location]);

 
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <MainContent connectionType={connectionType} />;
      case "payments":
        return <Payment connectionType={connectionType} />; 
      default:
        return <MainContent connectionType={connectionType} />;
    }
  };

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        navigate("/sending-crpto/home-page");
        break;
      case "payments":
        navigate("/sending-crpto/payment-realnumber");
        break;
      default:
        navigate("/sending-crpto/home-page");
    }
  };

  return (
    <div className="flex h-screen md:overflow-hidden inter-font">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={handleTabChange} 
        setIsConnected={setIsConnected}
        connectionType={connectionType}
      />
      <div className="flex-1 flex flex-col bg-[#08061e] overflow-y-scroll">
        <header className="bg-[#222945] rounded-b-md py-2 md:hidden">
          <button
            onClick={toggleSidebar}
            className="bg-[#616a8d12] rounded-lg font-medium p-1 text-white text-xl mt-1 ml-5"
          >
            <GiHamburgerMenu />
          </button>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
