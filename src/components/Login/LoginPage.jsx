import React, { useState } from "react";
import { close, signupBg } from "../../assets";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authenticateStackId = async (stackId) => {
    try {
      const response = await fetch(`https://copartners.in:5133/api/AffiliatePartner/${stackId}`, {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("StackId authentication response:", data); // Log the data received from the server

      if (response.ok && data.isSuccess) {
        return data.data; // Return the stackId data
      } else {
        console.error("StackId server response:", data); // Log server response for debugging
        setError("StackId authentication failed. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("StackId authentication error:", error);
      setError("An error occurred during StackId authentication. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      mobile: "",
      email: email,
      passwordHash: password,
      isLoginUsingOtpRequest: false,
      userIpAddress: "string",
    };

    try {
      const response = await fetch("https://copartners.in:5130/Authentication/authenticate", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const authId = data.data.stackholderId;
      sessionStorage.setItem("authId", authId);
      if (response.ok && data.isSuccess) {
        // Authenticate StackId
        const stackIdData = await authenticateStackId(authId);
        
        if (stackIdData) {
          // Save JWT token and email to local storage
          localStorage.setItem("token", data.data.password);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("stackIdData", JSON.stringify(stackIdData));

          navigate("/"); // Redirect to dashboard on successful login
        }
      } else {
        console.error("Server response:", data.data); // Log server response for debugging
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }

    setLoading(false);
  };

  const isFormEmpty = () => !email || !password;

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
            <h2 className="text-2xl font-semibold text-white">Log In</h2>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
            />
            <button
              type="submit"
              className={`bg-white hover:bg-black hover:text-white text-black transition duration-300 font-semibold text-[20px] py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isFormEmpty() || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isFormEmpty() || loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="mt-4">
            <button onClick={() => navigate("/forgot-password")} className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;






// import React, { useState } from "react";
// import { close, signupBg } from "../../assets";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Check if email and password match predefined credentials
//     if (email === "your@email.com" && password === "yourmom") {
//       try {
//         // Placeholder for login request
//         // Replace this with your actual login API call
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading

//         // Save credentials to local storage
//         localStorage.setItem("email", email);
//         localStorage.setItem("password", password);

//         // Assuming successful login for demo
//         navigate("/"); // Redirect to dashboard on successful login
//       } catch (error) {
//         console.error("Login error:", error);
//         setError("An error occurred during login. Please try again.");
//       }
//     } else {
//       setError("Invalid email or password. Please try again.");
//     }

//     setLoading(false);
//   };

//   const isFormEmpty = () => {
//     return !email || !password;
//   };

//   const handleClose = () => {
//     navigate("/"); // Navigate to the home page
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <>
//       <div
//         className="h-screen"
//         style={{
//           backgroundImage: `url(${signupBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       ></div>
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50 w-screen h-screen">
//         <div className="bg-gradient border-[1px] border-[#ffffff2a] m-4 p-6 rounded-lg w-96 relative text-center">
//           <div className="absolute top-3 right-0 text-right">
//             <button
//               onClick={() => {
//                 handleClose();
//                 scrollToTop();
//               }}
//               className="text-gray-400 w-8 text-[20px] cursor-pointer hover:text-white"
//             >
//               <img src={close} alt="close" />
//             </button>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-2xl font-semibold text-white">Log In</h2>
//           </div>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <form
//             className="flex flex-col gap-4 text-white"
//             onSubmit={handleSubmit}
//           >
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-4 py-3 border border-[#ffffff34] rounded-xl focus:outline-none focus:border-white-500 bg-transparent"
//             />
//             <button
//               type="submit"
//               className={`bg-white hover:bg-black hover:text-white text-black transition duration-300 font-semibold text-[20px] py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 isFormEmpty() || loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={isFormEmpty() || loading}
//             >
//               {loading ? "Logging in..." : "Log In"}
//             </button>
//           </form>
//           <div className="mt-4">
//             <button
//               onClick={() => navigate("/forgot-password")}
//               className="text-sm text-blue-500 hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

