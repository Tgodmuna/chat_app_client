import React, { useState } from "react";
import Button from "../utils/Button.tsx";
import { handleFormLevel, handleSubmit } from "./businessLogics/registerBusinessLogic.ts";
import { handleChange } from "./businessLogics/loginBusinessLogic.ts";
import type { newUserFormData } from "../../types.tsx";
import Spinner from "../utils/Spinner.tsx";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<newUserFormData>({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    location: { city: "", state: "", country: "" },
    gender: undefined,
    age: "",
    status: "",
    role: "user",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isError, setisError] = useState<boolean>(false);
  const [isSuccess, setisSuccess] = useState<boolean>(false);
  const [formLevel, setFormLevel] = useState<number>(1);

  const navigate = useNavigate();

  return (
    <div className="w-[100vw] min-h-screen generalBG p-4 flex items-center justify-center">
      <div className="animate-fadeIn w-full max-w-md">
        <h1 className="text-2xl font-bold pt-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-600 text-center mb-8 animate-pulse">
          Create Your Account
        </h1>

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
              setisSuccess,
              navigate
            );
          }}
          action="/register"
          method="post"
          className="bg-green-900/10 backdrop-blur-sm h-auto w-full shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex flex-col gap-4"></div>
          <div className={"flex max-w-[100vw] "}>
            {/* First Level */}
            <div className={`formLevelStyle ${formLevel === 1 ? "flex " : "hidden"}`}>
              <input
                className="FormInputStyle"
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                required={true}
                name="username"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <input
                className="FormInputStyle"
                id="email"
                required={true}
                type="email"
                placeholder="Email"
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <input
                className="FormInputStyle"
                id="password"
                type="password"
                name="password"
                required={true}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <Button
                type={"button"}
                onClick={() => {
                  if (!formData.username && !formData.email && !formData.password) {
                    setErrorMsg("fields are required to be filled");
                    setisError(true);
                    return;
                  }
                  setisError(false);
                  handleFormLevel(2, formLevel, setFormLevel);
                }}
                className={`formLevelButton`}>
                Next
              </Button>
            </div>

            {/* Second Level */}
            <div className={`formLevelStyle  ${formLevel === 2 ? "flex" : "hidden "}  `}>
              <input
                className="FormInputStyle"
                id="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                required={true}
                name="name"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <input
                className="FormInputStyle"
                id="phone"
                type="text"
                placeholder="Phone"
                value={formData.phone}
                name="phone"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <input
                className="FormInputStyle"
                id="city"
                type="text"
                placeholder="City"
                required={true}
                value={formData.location.city}
                name="location.city"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <input
                className="FormInputStyle"
                id="state"
                type="text"
                placeholder="State"
                value={formData.location.state}
                name="location.state"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <input
                className="FormInputStyle"
                id="country"
                type="text"
                placeholder="Country"
                required={true}
                value={formData.location.country}
                name="location.country"
                onChange={(e) => handleChange(e, setFormData)}
              />

              <Button
                type={"button"}
                onClick={() => {
                  if (!formData.location.city || !formData.location.country) {
                    setErrorMsg("fields are required to be filled");
                    setisError(true);
                    return;
                  }

                  setisError(false);
                  handleFormLevel(3, formLevel, setFormLevel);
                }}
                className={`formLevelButton`}>
                Next
              </Button>
            </div>

            {/* Third Level */}
            <div className={`formLevelStyle ${formLevel === 3 ? "flex" : "hidden "}`}>
              <select
                title={"gender selection"}
                className="FormInputStyle  "
                id="gender"
                required={true}
                value={formData.gender || ""}
                name="gender"
                onChange={(e) => handleChange(e, setFormData)}>
                <option
                  className={"text-gray-400 text-center"}
                  value=""
                  disabled>
                  Select Gender
                </option>
                <option
                  className={`text-black text-lg`}
                  value="male">
                  Male
                </option>
                <option
                  className={`text-black text-lg`}
                  value="female">
                  Female
                </option>
                <option
                  className={`text-black text-lg`}
                  value="other">
                  Other
                </option>
              </select>

              <input
                className="FormInputStyle"
                id="age"
                type="number"
                placeholder="Age"
                value={formData.age.toString()}
                name="age"
                required={true}
                onChange={(e) => handleChange(e, setFormData)}
              />

              <select
                title={"gender"}
                className="FormInputStyle"
                id="status"
                required={true}
                value={formData.status}
                name="status"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange(e, setFormData)
                }>
                <option
                  value=""
                  disabled>
                  Select Status
                </option>
                <option
                  className={`text-black text-lg`}
                  value="single">
                  Single
                </option>
                <option
                  className={`text-black text-lg`}
                  value="married">
                  Married
                </option>
                <option
                  className={`text-black text-lg`}
                  value="divorced">
                  Divorced
                </option>
              </select>

              <div className="flex gap-2 justify-center mt-4">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className={`w-full ${
                      isLoading ? "bg-opacity-15" : ""
                    } p-4 bg-green-500 text-white rounded-lg font-semibold transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300`}>
                    {isLoading ? "loading....." : "Register"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>

        {isError && ErrorMsg ? (
          <div className="mt-4 text-center text-red-700">
            <p>{ErrorMsg}</p>
          </div>
        ) : (
          ""
        )}
        {isSuccess && successMsg ? (
          <div className="mt-4 text-center text-green-800">
            <p>{successMsg}</p>
          </div>
        ) : (
          ""
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">already got an account?</p>
          <a
            href="/login"
            className="text-blue-700 hover:text-blue-600 transition-colors duration-300 mt-2 inline-block">
            login →
          </a>
        </div>
      </div>
    </div>
  );
};
export default Register;
