import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import EggBucketImage from "../assets/Images/EggBucket.png";
import logo from "../assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../redux/userSlice";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure the recaptcha container is present
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            window.alert("reCAPTCHA expired. Please try again.");
          },
        },
        auth
      );
    }

    // Cleanup function
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear(); // Clear the verifier if needed
        delete window.recaptchaVerifier; // Remove the reference to avoid reinitialization
      }
    };
  }, []);

  const handleLogin = () => {
    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+91${phone}`;
    console.log(formatPh);

    if (appVerifier) {
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setConfirmationResult(confirmationResult);
          setOtpSent(true);
          setMessage("OTP sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending OTP:", error.code, error.message);
          setMessage("Error sending OTP, please try again.");
        });
    } else {
      setMessage(
        "reCAPTCHA not initialized properly. Please refresh and try again."
      );
    }
  };

  const setIdToken = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken(false);
        localStorage.setItem("token", token);
        const phoneNumber = currentUser.phoneNumber;
        await dispatch(fetchUserData(phoneNumber)).unwrap();

        navigate("/order");
      } catch (error) {
        console.error("Error fetching ID token:", error);
      }
    } else {
      console.error("Couldn't verify user");
    }
  };

  const verifyOtp = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((res) => {
          console.log(res);
          setMessage(`Phone verified! Welcome ${res.user.phoneNumber}`);
          setIdToken();
        })
        .catch((err) => {
          console.error(err);
          setMessage("Incorrect OTP, please try again.");
        });
    } else {
      setMessage("Please request the OTP first.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row mt-12 ">
      <div className="hidden lg:flex lg:w-[700px] bg-[#F0A817] items-center justify-center rounded-r-3xl">
        <div className="text-white mt-3 font-sans">
          <div>
            <p className="text-3xl ml-9 font-bold text-red-900">
              Think of an Egg,{" "}
            </p>
            <p className="mt-3 ml-[200px] text-3xl font-bold">
              Think of EggBucket!
            </p>
          </div>
          <img
            src={EggBucketImage}
            alt="Egg Bucket Product"
            className="h-[520px] mx-auto object-contain"
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
              <span className="flex items-center px-4 bg-gray-200 border rounded-l-md text-gray-700">
                +91
              </span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your 10 digits"
                pattern="[6789][0-9]{9}"
                className="flex-1 border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div id="recaptcha-container"></div>{" "}
              {/* Ensure this div is always present */}
              <button
                type="button"
                onClick={handleLogin}
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
                  maxLength="6"
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="button"
                onClick={verifyOtp}
                className="bg-[#F0A817] text-white w-full py-3 rounded-md hover:bg-[#D08704] focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Login
              </button>
            </>
          )}

          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
