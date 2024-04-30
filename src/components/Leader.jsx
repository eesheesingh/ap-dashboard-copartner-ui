// import React, { useState } from "react";
// import { graph, graph2 } from "../assets";

// const Subscription = () => {
//   const [activeButtonFirstSection, setActiveButtonFirstSection] = useState("weekly");
//   const [activeButtonSecondSection, setActiveButtonSecondSection] = useState("weekly");

//   return (
//     <div className="text-white text-center px-[50px]">
//       {/* First Section */}
//       <div className="flex justify-between mt-2">
//         <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Earning Analysis</h2>
//         <div className="space-x-4 md:mr-1 xl:mr-[60px]">
//           <button
//             className={`button ${activeButtonFirstSection === "weekly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
//             onClick={() => setActiveButtonFirstSection("weekly")}
//           >
//             Weekly
//           </button>
//           <button
//             className={`button ${activeButtonFirstSection === "monthly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
//             onClick={() => setActiveButtonFirstSection("monthly")}
//           >
//             Monthly
//           </button>
//           <button
//             className={`button ${activeButtonFirstSection === "custom" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
//             onClick={() => setActiveButtonFirstSection("custom")}
//           >
//             Custom
//           </button>
//         </div>
//       </div>

//       {/* First Section Content */}
//       <div className="flex mt-8">
//         <div className="w-full md:w-2/3 pr-8">
//           <img src={activeButtonFirstSection === "monthly" ? graph2 : graph} alt="Graph" className="w-full rounded-lg" />
//         </div>
//         <div className="w-full md:w-1/3 flex flex-col justify-center items-center container-bg rounded-[30px]">
//           <h3 className="text-center font-semibold md:text-[30px] xl:text-[50px]">Total Earning</h3>
//           <h1 className="md:text-[75px] xl:text-[85px] text-gradient font-bold">₹100</h1>
//           <div className="md:px-[40px] mb-4 xl:text-[20px] md:text-[14px]">
//             <p className="text-center text-[#c9c9c9]">
//               With Cobalt, managing your business.{" "}
//               <span className="text-[#fff]">Say no to spreadsheets.</span>
//             </p>
//           </div>
//           <button className="bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff] transition duration-300 py-2 px-6 rounded">
//             Withdrawn
//           </button>
//         </div>
//       </div>

//       {/* Second Section */}
//       <div className="flex justify-between mt-10">
//         <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Lead Board Analysis</h2>
//         <div className="space-x-4 md:mr-1 xl:mr-[60px]">
//           <button
//             className={`button ${activeButtonSecondSection === "weekly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
//             onClick={() => setActiveButtonSecondSection("weekly")}
//           >
//             Weekly
//           </button>
//           <button
//             className={`button ${activeButtonSecondSection === "monthly" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
//             onClick={() => setActiveButtonSecondSection("monthly")}
//           >
//             Monthly
//           </button>
//           <button
//             className={`button ${activeButtonSecondSection === "custom" ? "bg-[#fff] text-[#000]" : "bg-transparent"} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
//             onClick={() => setActiveButtonSecondSection("custom")}
//           >
//             Custom
//           </button>
//         </div>
//       </div>

//       {/* Second Section Content */}
//       <div className="flex mt-8">
//         <div className="w-full md:w-2/3 pr-8">
//           <img src={activeButtonSecondSection === "monthly" ? graph2 : graph} alt="Graph" className="w-full rounded-lg" />
//         </div>
//         <div className="w-full md:w-1/3 flex flex-col justify-center items-center container-bg rounded-[30px]">
//           <h3 className="text-center font-semibold md:text-[30px] xl:text-[50px]">Total Earning</h3>
//           <h1 className="md:text-[75px] xl:text-[85px] text-gradient font-bold">₹100</h1>
//           <div className="md:px-[40px] mb-4 xl:text-[20px] md:text-[14px]">
//             <p className="text-center text-[#c9c9c9]">
//               With Cobalt, managing your business.{" "}
//               <span className="text-[#fff]">Say no to spreadsheets.</span>
//             </p>
//           </div>
//           <button className="bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff] transition duration-300 py-2 px-6 rounded">
//             Withdrawn
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subscription;


import React from 'react'

const Subscription = () => {
  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
    <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      This is a lEAder Board
      </div>
      </div>
  )
}

export default Subscription