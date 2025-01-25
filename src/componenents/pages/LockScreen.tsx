import React, { useState } from "react";
import { handleChange } from "../Auth/businessLogics/loginBusinessLogic.ts";
import Button from "../utils/Button.tsx";
import axios, { type AxiosResponse } from "axios";

const LockScreen = () => {
  const [formData, setformData] = useState<string>("");
  const [error, seterror] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  const handleSubmit: (data: string) => void = async (data) => {
    try {
      //activating loading
      setloading(!loading);

      const empty: () => boolean | undefined = () => {
        if (!data) {
          setloading(!loading);
          seterror(true);
          setErrorMsg("field is empty");
          return true;
        }

        seterror(false);
        setloading(!loading);
        return false;
      };

      if (!empty || (data && data !== "")) {
        setloading(!loading);
        seterror(false);
        const trimmed = data.trim();

        //post data to the server
        const result: AxiosResponse<any, any> = await axios.post("url", trimmed);

        if (!result) {
          setloading(!loading);
          seterror(true);
          setErrorMsg("error submitting data,check and resubmit");
          console.log(result);
        }

        if (result.status === 200) {
          const Message = result.statusText;

          seterror(false);
          setloading(false);
          setErrorMsg(Message);

          console.log(result);
        }
      }
    } catch (error) {
      setloading(!loading);
      console.log(error);
      seterror(true);
      setErrorMsg(error.Message);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] generalBG pt-[rem] flex items-center justify-center">
      <div className="animate-fadeIn w-full p-2">
        <h1 className="text-2xl capitalize font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400  to-gray-600 text-center mb-8 animate-pulse">
          unlock{" "}
        </h1>

        <form
          onSubmit={(e) => handleSubmit(formData)}
          action="/login"
          method="post"
          className="bg-green-900/10 backdrop-blur-sm h-auto  shadow-2xl rounded-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          
          <div className="flex flex-col gap-[1.5rem]">
            {/* password */}
            <input
              className="bg-white/20 border border-gray-300/20 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder:text-gra y-400"
              id="username"
              type="text"
              placeholder="password"
              value={formData}
              name={"password"}
              onChange={(e) => handleChange(e, setformData)}
            />

            {/* submit button */}
            <div className="flex justify-center mt-4">
              <Button
                disabled={loading}
                type="submit"
                className={`w-[10rem] py-4 text-white rounded-lg font-semibold transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 ${
                  formData === ""
                    ? " bg-green-300 hover:cursor-not-allowed"
                    : "bg-green-500 cursor-pointer"
                }`}>
                Login
              </Button>
            </div>

            {/* sign out */}
            <div className="mt-6 text-center">
              <Button
                type={"submit"}
                className={`w-[4rem] capitalize font-mono p-2 text-neutral-600 rounded-md hover:shadow-md shadow-black`}>
                sign out
              </Button>
            </div>

            {error && <p className={`text-sm text-red-600 text-center  capitalize`}>{ErrorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default LockScreen;
