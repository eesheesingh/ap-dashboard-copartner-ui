import React, { useState } from "react";
import { graph, graph2, serviceIcon, coursePurple, webinarPurple, usersPurple } from "../assets";

const Dashboard = () => {
  const [activeButtonFirstSection, setActiveButtonFirstSection] = useState("weekly");
  const [activeButtonSecondSection, setActiveButtonSecondSection] = useState("weekly");

  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
    <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    <div className="text-white text-center">
      {/* First Section */}
      <div className="flex justify-between mt-2">
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Earning Analysis</h2>
        <div className="space-x-4 md:mr-1 xl:mr-[60px]">
          <button
            className={`button ${activeButtonFirstSection === "weekly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
            onClick={() => setActiveButtonFirstSection("weekly")}
          >
            Weekly
          </button>
          <button
            className={`button ${activeButtonFirstSection === "monthly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
            onClick={() => setActiveButtonFirstSection("monthly")}
          >
            Monthly
          </button>
          <button
            className={`button ${activeButtonFirstSection === "custom" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
            onClick={() => setActiveButtonFirstSection("custom")}
          >
            Custom
          </button>
        </div>
      </div>

      {/* First Section Content */}
      <div className="flex mt-8">
        <div className="w-full md:w-2/3 pr-8">
          <img src={activeButtonFirstSection === "monthly" ? graph2 : graph} alt="Graph" className="w-full rounded-lg" />
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center container-bg rounded-[30px]">
          <h3 className="text-center font-semibold md:text-[30px] xl:text-[50px]">Total Earning</h3>
          <h1 className="md:text-[75px] xl:text-[85px] text-gradient font-bold">₹100</h1>
          <div className="md:px-[40px] mb-4 xl:text-[20px] md:text-[14px]">
            <p className="text-center text-[#c9c9c9]">
              With Cobalt, managing your business.{" "}
              <span className="text-[#fff]">Say no to spreadsheets.</span>
            </p>
          </div>
          <button className="bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff] transition duration-300 py-2 px-6 rounded">
            Withdrawn
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex justify-between mt-10">
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Lead Board Analysis</h2>
        <div className="space-x-4 md:mr-1 xl:mr-[60px]">
          <button
            className={`button ${activeButtonSecondSection === "weekly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
            onClick={() => setActiveButtonSecondSection("weekly")}
          >
            Weekly
          </button>
          <button
            className={`button ${activeButtonSecondSection === "monthly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
            onClick={() => setActiveButtonSecondSection("monthly")}
          >
            Monthly
          </button>
          <button
            className={`button ${activeButtonSecondSection === "custom" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
            onClick={() => setActiveButtonSecondSection("custom")}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Second Section Content */}
      <div className="flex mt-8">
        <div className="w-full md:w-2/3 pr-8 container1">
          <img src={activeButtonSecondSection === "monthly" ? graph2 : graph} alt="Graph" className="w-full rounded-lg" />
        </div>
        {/* <div className=" flex flex-row gap-2">
          <div className="w-2/3 container-bg p-2 px-8 rounded-xl">
            <img src={usersPurple} alt="" className="w-20 border-[1px] rounded-full p-3" />
            <div className="px-2">
              <h3 className="text-left text-[20px]">Leader Board</h3>
              <div className="flex flex-row justify-between text-sm">
                <span>Total Visit: </span>
                <span>100</span>
              </div>
              <div className="flex flex-row justify-between text-sm">
                <span>Users: </span>
                <span>+40</span>
              </div>
              <div className="flex flex-row justify-between text-sm">
                <span>Not Interested: </span>
                <span>60</span>
              </div>
            </div>
          </div>
          <div className="w-1/3 container-bg justify-center items-center p-2 px-8 rounded-xl">
            <img src={serviceIcon} alt="" className="w-20 border-[1px] rounded-[50px] p-3" />
            <div className="px-2 items-center justify-center">
              <h3 className="text-left text-lg">Service</h3>
              <div className="flex flex-row justify-between text-sm">
                <span>Users: </span>
                <span>100</span>
              </div>
              
            </div>
          </div>

          
        </div>
        <div className="flex flex-row mt-2 gap-2">
          <div className="w-1/2 container-bg justify-center items-center p-2 px-8 rounded-xl">
            <img src={serviceIcon} alt="" className="w-20 border-[1px] rounded-[50px] p-3" />
            <div className="px-2 items-center justify-center">
              <h3 className="text-left text-lg">Service</h3>
              <div className="flex flex-row justify-between text-sm">
                <span>Users: </span>
                <span>100</span>
              </div>
              
            </div>
          </div>

          <div className="w-1/2 container-bg justify-center items-center p-2 px-8 rounded-xl">
            <img src={serviceIcon} alt="" className="w-20 border-[1px] rounded-[50px] p-3" />
            <div className="px-2 items-center justify-center">
              <h3 className="text-left text-lg">Service</h3>
              <div className="flex flex-row justify-between text-sm">
                <span>Users: </span>
                <span>100</span>
              </div>
              </div>
            </div>
            </div> */}


<div className="w-full md:w-1/3 xl:1/3 flex flex-col justify-center items-start container-bg rounded-[30px] p-4">
  <img src={usersPurple} alt="" className="w-[100px] border-[2px] rounded-full p-4" /> {/* Increased icon size */}
  <div className="px-4"> {/* Increased font size */}
    <h3 className="text-left md:text-[3rem] xl:text-[4rem] font-bold text-gradient">Leader Board</h3> {/* Increased font size */}
    <div className="flex flex-row justify-between md:text-xl xl:text-2xl md:mb-3 xl:mb-5"> {/* Increased font size */}
      <span>Total Visit:</span> {/* Increased font size */}
      <span className="font-semibold mb-3 text-[#247673]">100</span> {/* Increased font size */}
    </div>
    <div className="flex flex-row justify-between md:text-xl md:mb-3 xl:mb-5 xl:text-2xl"> {/* Increased font size */}
      <span>Users:</span> {/* Increased font size */}
      <span className="font-semibold text-[#25A2DE]">+40</span> {/* Increased font size */}
    </div>
    <div className="flex flex-row justify-between md:text-xl md:mb-3 xl:mb-5 xl:text-2xl"> {/* Increased font size */}
      <span>Not Interested:</span> {/* Increased font size */}
      <span className="font-semibold text-[#D0667A]">60</span> {/* Increased font size */}
    </div>
  </div>
</div>

      </div>
    </div>
    </div></div>
  );
};

export default Dashboard;


