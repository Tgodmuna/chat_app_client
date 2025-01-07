import React, { useState } from "react";
import Button from "../utils/Button.tsx";
import { handleSubmit } from "./businessLogics/registerBusinessLogic.ts";
import { handleChange } from "./businessLogics/loginBusinessLogic.ts";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    secondName: "",
    email: "",
    location: "",
    city: "",
    status: "",
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div className="w-[100vw] min-h-[100vh] generalBG pt-[rem] flex items-center justify-center">
      <div className="animate-fadeIn">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400  to-gray-600 text-center mb-8 animate-pulse">
          Welcome Back
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e, formData, setLoading, isLoading)}
          action="/register"
          method="post"
          className="bg-green-900/10 backdrop-blur-sm h-auto w-[400px] shadow-2xl rounded-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col gap-[1.5rem]">
            {/* username */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gra y-400"
              id="username"
              type="text"
              placeholder="Username or email"
              value={formData.username}
              name={"username"}
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
            </div>

            {/* submit button */}
            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="w-full py-4 bg-green-500 text-white rounded-lg font-semibold transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300">
                Login
              </Button>
            </div>

            {/*  have an account? */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">already got an account?</p>
              <a
                href="/login"
                className="text-blue-700 hover:text-blue-600 transition-colors duration-300 mt-2 inline-block">
                login →
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
