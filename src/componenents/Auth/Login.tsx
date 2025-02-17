import React, { useState } from "react";
import Button from "../utils/Button.tsx";
import { handleChange, handleSubmit } from "./businessLogics/loginBusinessLogic.ts";
import Spinner from "../utils/Spinner.tsx";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [IsError, setIsError] = useState<boolean>(false);
  const [IsSuccess, setIsSuccess] = useState<boolean>(false);
  const [ErrorMessage, setErrorMessage] = useState<string | null>(null);
  const [SuccessMessage, setSuccessMessage] = useState<string | null>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="w-[100vw] min-h-[100vh] generalBG pt-[1rem] flex items-center justify-center">
      <div className="animate-fadeIn">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400  to-gray-600 text-center mb-8 animate-pulse">
          Welcome Back
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (formData.email.length < 1 || formData.password.length < 1) {
              setIsError(true);
              setErrorMessage("Please fill all fields");
              return;
            }
            handleSubmit(
              e,
              formData,
              setIsError,
              setIsSuccess,
              setErrorMessage,
              setSuccessMessage,
              setLoading,
              navigate
            );
          }}
          action="/login"
          method="post"
          className="bg-green-900/10 backdrop-blur-sm h-auto w-[400px] shadow-2xl rounded-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col gap-[1.5rem]">
            {/* email */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gra y-400"
              id="email"
              type="text"
              placeholder=" Email"
              value={formData.email}
              name={"email"}
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* password */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="password"
              type="password"
              name={"password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* rememberMe */}
            <div className="flex justify-between items-center text-sm text-gray-300">
              <label
                htmlFor="rememberMe"
                className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors duration-300">
                <input
                  className="w-4 h-4 accent-green-500 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  id="rememberMe"
                  type="checkbox"
                  onChange={(e) => {
                    handleChange(e, setFormData);
                  }}
                />
                <span className="select-none">Remember Me</span>
              </label>

              <p className="cursor-pointer hover:text-white transition-colors duration-300">
                Reset Password?
              </p>
            </div>

            {/* submit button */}
            <div className="flex justify-center mt-4">
              <Button
                disabled={isLoading}
                type="submit"
                className={`w-full ${
                  isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"
                } py-4 bg-green-500 text-gray-500 rounded-lg font-semibold transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300`}>
                {isLoading ? <Spinner /> : "Login"}
              </Button>
            </div>
            {IsError && ErrorMessage ? (
              <div className="mt-4 text-center text-red-700">
                <p>{ErrorMessage}</p>
              </div>
            ) : (
              ""
            )}
            {IsSuccess && SuccessMessage ? (
              <div className="mt-4 text-center text-green-800">
                <p>{SuccessMessage}</p>
              </div>
            ) : (
              ""
            )}

            {/* dont have an account? */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <a
                href="/register"
                className="text-blue-700 hover:text-blue-600 transition-colors duration-300 mt-2 inline-block">
                Create an account →
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

// type Props = {
//   name: string;
//   age: number;
//   email: string;
// };
