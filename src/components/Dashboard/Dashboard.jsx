import React, { useRef, useState } from "react";
import { graph, graph2, usersPurple, customBtn, tick, clipboard } from "../../assets";
import DashboardTable from "./DashboardTable";
import WithdrawalPopup from "./WithdrawalPopup";




const Dashboard = () => {
  const [activeButtonFirstSection, setActiveButtonFirstSection] = useState("weekly");
  const [activeButtonSecondSection, setActiveButtonSecondSection] = useState("weekly");
  const [copiedReferralLink, setCopiedReferralLink] = useState(false);
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);
  const [isWithdrawalPopupOpen, setIsWithdrawalPopupOpen] = useState(false);

  const referralLinkRef = useRef(null);
  const referralCodeRef = useRef(null);

  const copyReferralLinkToClipboard = () => {
    if (referralLinkRef.current) {
      const fullLink = referralLinkRef.current.innerText;
      navigator.clipboard.writeText(fullLink);
      setCopiedReferralLink(true);
      setTimeout(() => {
        setCopiedReferralLink(false);
      }, 3000);
    }
  };

  const copyReferralCodeToClipboard = () => {
    if (referralCodeRef.current) {
      const fullCode = referralCodeRef.current.innerText;
      navigator.clipboard.writeText(fullCode);
      setCopiedReferralCode(true);
      setTimeout(() => {
        setCopiedReferralCode(false);
      }, 3000);
    }
  };

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
                <img src={customBtn} alt="" className="inline-block w-5 ml-1" />
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
              {/* Withdrawal Button */}
          <div className="flex justify-center">
            <button className="bg-[#fff] transition duration-300 text-[#000] hover:bg-[#000] hover:text-[#fff] px-6 py-3 rounded" onClick={() => setIsWithdrawalPopupOpen(true)}>
              Withdrawal
            </button>
          </div>

          {/* Withdrawal Popup */}
          <WithdrawalPopup isOpen={isWithdrawalPopupOpen} onClose={() => setIsWithdrawalPopupOpen(false)} />
            </div>
          </div>

          <div className="flex flex-row justify-between p-3 px-[40px] mt-5 bg-[#29303F] rounded-[20px] items-center">
  <div className="flex flex-row items-center gap-3">
    <span className="text-lg">Referral Link :</span>
    <div className="p-1 px-3 flex rounded-[30px] bg-transparent border-[1px]">
    <span ref={referralLinkRef} className="mr-1">https://www.example.com/referral</span>
    <button onClick={copyReferralLinkToClipboard} className="flex items-center mt-[2px]">| 
      {copiedReferralLink ? (
        <img src={tick} alt="Copied" className="w-5" />
      ) : (
        <img src={clipboard} alt="Copy" className="w-5" />
      )}
    </button>
    </div>
  </div>
  <div className="flex flex-row items-center gap-3 py-2">
    <span className="text-lg">Referral Code :</span>
    <div className="p-1 px-3 flex rounded-[30px] bg-transparent border-[1px]">
    <span ref={referralCodeRef} className="mr-1">REFCODE123</span>
    <button onClick={copyReferralCodeToClipboard}className="flex items-center">| 
      {copiedReferralCode ? (
        <img src={tick} alt="Copied" className="w-5" />
      ) : (
        <img src={clipboard} alt="Copy" className="w-5" />
      )}
    </button>
    </div>
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
                <img src={customBtn} alt="" className="inline-block w-5 ml-1" />
              </button>
            </div>
          </div>

          {/* Second Section Content */}
          <div className="flex mt-8">
            <div className="w-full md:w-2/3 pr-8 container1">
              <img src={activeButtonSecondSection === "monthly" ? graph2 : graph} alt="Graph" className="w-full rounded-lg" />
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
          <div><DashboardTable /></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
