import React, { useState } from "react";
import { customBtn, graph, graph2, usersPurple } from "../assets";
import LeaderboardTable from "./LeaderboardTable";

const Subscription = () => {
  const [activeButtonLeaderSection, setActiveButtonLeaderSection] = useState("weekly");

  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="text-white text-center">
          <div className="flex justify-between">
            <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Lead Board Analysis</h2>
            <div className="space-x-4 md:mr-1 xl:mr-[60px] flex items-center">
              <button
                className={`button ${activeButtonLeaderSection === "weekly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
                onClick={() => setActiveButtonLeaderSection("weekly")}
              >
                Weekly
              </button>
              <button
                className={`button ${activeButtonLeaderSection === "monthly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
                onClick={() => setActiveButtonLeaderSection("monthly")}
              >
                Monthly
              </button>
              <button
                className={`button flex items-center ${activeButtonLeaderSection === "custom" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
                onClick={() => setActiveButtonLeaderSection("custom")}
              >
                Custom
                <img src={customBtn} alt="" className="inline-block w-5 ml-1" />
              </button>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="w-full md:w-2/3 pr-8">
              <img src={activeButtonLeaderSection === "monthly" ? graph2 : graph} alt="Graph" className="w-full rounded-lg" />
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center container-bg rounded-[30px] p-2">
              <img src={usersPurple} alt="" className="w-[150px] border-[2px] rounded-full p-4" />
              <div className="px-4">
                <h3 className="text-left md:text-[3rem] xl:text-[4rem] font-bold text-gradient">Leader Board</h3>
                <div className="flex flex-row justify-between md:text-xl xl:text-2xl">
                  <span>Total Visit:</span>
                  <span className="font-semibold text-[#247673]">100</span>
                </div>
                <div className="flex flex-row justify-between md:text-xl xl:text-2xl">
                  <span>Users:</span>
                  <span className="font-semibold text-[#25A2DE]">+40</span>
                </div>
                <div className="flex flex-row justify-between md:text-xl xl:text-2xl">
                  <span>Not Interested:</span>
                  <span className="font-semibold text-[#D0667A]">60</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LeaderboardTable />
      </div>
    </div>
  );
};

export default Subscription;
