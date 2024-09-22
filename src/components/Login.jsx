import React, { useState } from "react";
import EggBucketImage from '../assets/Images/EggBucket.png';
import logo from '../assets/Images/logo.png';

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      alert("OTP Sent!");
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  const handleLogin = () => {
    if (otp.length === 4) {
      alert("Login Successful!");
      setPhone("");
      setOtp("");
      setOtpSent(false);
      setRememberMe(false);
    } else {
      alert("Please enter a valid OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-[700px] bg-[#F0A817] items-center justify-center rounded-r-3xl">
        <div className=" text-white mt-3 font-sans">
          <div>
            <p className="text-3xl ml-9 font-bold text-red-900 ">
              Think of an Egg ,{" "}
            </p>
            <p className="mt-3 ml-[200px] text-3xl font-bold ">
              Think of EggBucket !
            </p>
          </div>
          <img
            src={EggBucketImage}
            alt="Egg Bucket Product"
            className=" h-[520px]  mx-auto object-contain"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <img src={logo} alt="Egg Bucket Logo" className="mb-8 h-25" />
        <h2 className="text-3xl font-semibold mb-2">Login to your Account</h2>
        <p className="text-gray-500 mb-6">Welcome to Eggbucket</p>

        <form className="w-full max-w-md">
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <div className="flex">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91"
                pattern="[6789][0-9]{9}"
                className="flex-1 border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-[#F0A817] text-white p-2 rounded-r-md hover:bg-[#D08704] focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Send OTP
              </button>
            </div>
          </div>

          {otpSent && (
            <>
              <div className="mb-4">
                <label className="block mb-2">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="****"
                  maxLength="4"
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
{/*                 <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  <label>Remember Me</label>
                </div> */}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#D08704] hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleLogin}
            className="bg-[#F0A817] text-white w-full py-3 rounded-md hover:bg-[#D08704] focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
