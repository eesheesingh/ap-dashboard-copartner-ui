import React, { useState } from "react";
import { customBtn, graph, graph2, usersPurple } from "../../assets";
import LeaderboardTable from "./LeaderboardTable";
import LeaderBoardAnalysisChart from "../Dashboard/LeaderBoardAnalysisChart";
import LeaderBoardChartMob from '../Dashboard/LeaderBoardChartMob'


const Subscription = () => {
  const [activeButtonLeaderSection, setActiveButtonLeaderSection] = useState("today");
  const [activeButtonSecondSection, setActiveButtonSecondSection] = useState("today"); // Change initial state to "today"

  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="text-white text-center">
          {/* Second Section */}
          <div className="flex md:flex-row flex-col justify-between mt-10 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-center md:text-[22px] text-[30px] xl:text-[40px] font-semibold w-full">Lead Board Analysis</h2>
            <div className="space-x-4 md:mr-1 xl:mr-[60px] flex w-full md:justify-end justify-center md:flex-nowrap flex-wrap">
              <button
                className={`button ${activeButtonSecondSection === "today" ? "bg-[#fff] text-[#000]" : "bg-transparent"} md:text-[18px] border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 md:py-2 py-1 px-2 md:px-6 rounded mb-2 md:mb-0`}
                onClick={() => setActiveButtonSecondSection("today")} // Change to set activeButtonSecondSection to "today"
              >
                Today
              </button>
              <button
                className={`button ${activeButtonSecondSection === "weekly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} md:text-[18px] border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 md:py-2 py-1 px-2 md:px-6 rounded mb-2 md:mb-0`}
                onClick={() => setActiveButtonSecondSection("weekly")}
              >
                Weekly
              </button>
              <button
                className={`button ${activeButtonSecondSection === "monthly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} md:text-[18px] border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 md:py-2 py-1 px-2 md:px-6 rounded mb-2 md:mb-0`}
                onClick={() => setActiveButtonSecondSection("monthly")}
              >
                Monthly
              </button>
              <button
                className={`button ${activeButtonSecondSection === "custom" ? "bg-[#fff] text-[#000]" : "bg-transparent"} md:text-[18px] border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 md:py-2 py-1 px-2 md:px-6 rounded mb-2 md:mb-0`}
                onClick={() => setActiveButtonSecondSection("custom")}
              >
                Custom
                <img src={customBtn} alt="" className="inline-block w-5 ml-1" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:mt-8 mt-4">
            <div className="w-full md:w-2/3 pr-0 md:pr-8 md:flex hidden">
              <LeaderBoardAnalysisChart activeButton={activeButtonSecondSection}/> {/* Change activeButton prop to activeButtonSecondSection */}
            </div>
            <div className="w-full md:w-2/3 pr-0 md:pr-8 md:hidden">
            <LeaderBoardChartMob activeButton={activeButtonSecondSection}/> {/* Change activeButton prop to activeButtonSecondSection */}
            </div>
            <div className="w-full md:w-1/3 flex md:flex-col justify-center items-center container-bg rounded-[30px] p-2 md:mt-0 mt-3">
              <img src={usersPurple} alt="" className="md:w-[150px] w-[100px] border-[2px] rounded-full p-4" />
              <div className="px-4">
                <h3 className="text-left md:text-[3rem] text-[2rem] xl:text-[4rem] font-bold text-gradient">Leader Board</h3>
                <div className="flex flex-row justify-between md:text-xl xl:text-2xl">
                  <span>Total Visit:</span>
                  <span className="font-semibold text-[#247673]">100</span>
                </div>
                <div className="flex flex-row justify-between md:text-xl xl:text-2xl">
                  <span>Paid Users:</span>
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
