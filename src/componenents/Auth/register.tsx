import React, { useState } from "react";
import Button from "../utils/Button.tsx";
import { handleSubmit } from "./businessLogics/registerBusinessLogic.ts";
import { handleChange } from "./businessLogics/loginBusinessLogic.ts";
import ToastNotification from "../hooks/useNotification.tsx";
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
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);

  return (
    <div className="w-[100vw] min-h-[100vh] generalBG pt-[rem] flex items-center justify-center">
      <div className="animate-fadeIn">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-600 text-center mb-8 animate-pulse">
          Create Your Account
        </h1>

        {/* error toast */}
        {isError && (
          <ToastNotification
            message={ErrorMsg}
            type="error"
          />
        )}

        {/* success toast */}
        {isSuccess && (
          <ToastNotification
            message={successMsg}
            type="success"
          />
        )}

        {/* form start */}

        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              formData,
              setLoading,
              isLoading,
              setErrorMsg,
              setisError,
              setSuccessMsg,
              setAuthFeedback
            )
          }
          action="/register"
          method="post"
          className="bg-green-900/10 backdrop-blur-sm h-auto w-[400px] shadow-2xl rounded-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col gap-[1.5rem]">
            {/* username */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              name="username"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* email */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="email"
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
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* status */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="status"
              type="text"
              placeholder="Status"
              value={formData.status}
              name="status"
              onChange={(e) => handleChange(e, setFormData)}
            />

            {/* role */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              id="role"
              type="text"
              placeholder="Role"
              value={formData.role}
              name="role"
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
                Register
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
        {/* form end */}
      </div>
    </div>
  );
};
export default Register;
