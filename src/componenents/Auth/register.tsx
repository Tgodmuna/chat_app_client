import React, { useState } from "react";
import Button from "../utils/Button.tsx";
import { handleSubmit } from "./businessLogics/registerBusinessLogic.ts";
import { handleChange } from "./businessLogics/loginBusinessLogic.ts";
import type { newUserFormData } from "../../types.tsx";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<newUserFormData>({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    gender: undefined,
    age: "",
    status: "",
    role: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isError, setisError] = useState<boolean>(false);
  const [isSuccess, setisSuccess] = useState<boolean>(false);

  return (
    <div className="w-[100vw] generalBG p-[0.5rem] overflow flex items-center justify-center">
      <div className="animate-fadeIn">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-600 text-center mb-8 animate-pulse">
          Create Your Account
        </h1>

        {/* form start */}
        <form
          onSubmit={(e) => {
            return handleSubmit(
              e,
              formData,
              setLoading,
              isLoading,
              setErrorMsg,
              setisError,
              setSuccessMsg,
              setisSuccess
            );
          }}
          action="/register"
          method="post"
          className="bg-green-900/10 backdrop-blur-sm h-auto w-[400px] shadow-2xl rounded-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          {/* first child */}
          {/*  */}
          {/*  */}
          <div className={"flex flex-col gap-[1rem] max-w-[100vw] "}>
            {/* username */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              required={true}
              name="username"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* email */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="email"
              required={true}
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* password */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="password"
              type="password"
              name="password"
              required={true}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* name */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              required={true}
              name="name"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* phone */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="phone"
              type="text"
              placeholder="Phone"
              value={formData.phone}
              name="phone"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* location */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="location"
              type="text"
              placeholder="Location"
              required={true}
              value={formData.location}
              name="location"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* gender */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="gender"
              type="text"
              placeholder="Gender"
              required={true}
              value={formData.gender}
              name="gender"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* age */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              name="age"
              required={true}
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* status */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="status"
              type="text"
              placeholder="Status"
              value={formData.status}
              required={true}
              name="status"
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
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
              ) : (
                <Button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full ${
                    isLoading ? "bg-opacity-15" : ""
                  } py-4 bg-green-500 text-white rounded-lg font-semibold transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300`}>
                  Register
                </Button>
              )}
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
        {/* form end */}

        {/* Feedback Messages */}
        {isError && ErrorMsg && (
          <div className="mt-4 text-center text-red-500">
            <p>{ErrorMsg}</p>
          </div>
        )}
        {isSuccess && successMsg && (
          <div className="mt-4 text-center text-green-500">
            <p>{successMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
