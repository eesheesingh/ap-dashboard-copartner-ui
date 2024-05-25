import React, { useState } from "react";
import { close, signupBg } from "../../assets";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Check if email is present in the database
      const emailCheckResponse = await fetch("https://copartners.in:5130/api/Users?userType=AP&page=1&pageSize=10", {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
      });

      const emailCheckData = await emailCheckResponse.json();

      if (emailCheckResponse.ok && emailCheckData.isSuccess) {
        const user = emailCheckData.data.find((user) => user.email === email);

        if (user) {
          const userId = user.userId;

          // Verify old password
          const verifyOldPasswordResponse = await fetch("https://copartners.in:5130/Authentication/authenticate", {
            method: "POST",
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, passwordHash: oldPassword, isLoginUsingOtpRequest: false, userIpAddress: "string" }),
          });

          const verifyOldPasswordData = await verifyOldPasswordResponse.json();

          if (verifyOldPasswordResponse.ok && verifyOldPasswordData.isSuccess) {
            // Reset the password
            const resetPasswordResponse = await fetch("https://copartners.in:5130/api/Users/ResetPassword", {
              method: "POST",
              headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: userId, oldPassword, newPassword, lastPasswordUpdateDate: new Date().toISOString() }),
            });

            const resetPasswordData = await resetPasswordResponse.json();

            if (resetPasswordResponse.ok && resetPasswordData.isSuccess) {
              navigate("/login");
            } else {
              setError("Failed to reset password. Please try again.");
            }
          } else {
            setError("Old password is incorrect.");
          }
        } else {
          setError("Email not found.");
        }
      } else {
        setError("Failed to check email. Please try again.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An error occurred during password reset. Please try again.");
    }

    setLoading(false);
  };

  const isFormEmpty = () => !email || !newPassword || !confirmPassword || !oldPassword;

  const handleClose = () => {
    navigate("/"); // Navigate to the home page
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="h-screen"
        style={{
          backgroundImage: `url(${signupBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50 w-screen h-screen">
        <div className="bg-gradient border-[1px] border-[#ffffff2a] m-4 p-6 rounded-lg w-96 relative text-center">
          <div className="absolute top-3 right-0 text-right">
            <button
              onClick={() => {
                handleClose();
                scrollToTop();
              }}
              className="text-gray-400 w-8 text-[20px] cursor-pointer hover:text-white"
            >
              <img src={close} alt="close" />
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white">Reset Password</h2>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
            />
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="text-center px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-center px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-center px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
            />
            <button
              type="submit"
              className={`bg-white hover:bg-black hover:text-white text-black transition duration-300 font-semibold text-[20px] py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isFormEmpty() || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isFormEmpty() || loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
