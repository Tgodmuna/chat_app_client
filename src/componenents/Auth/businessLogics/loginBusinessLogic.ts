import axios from "axios";
import type { loginformDataType } from "../../../types";
import Joi from "joi";

/**
 * Handles the change event for an input element and updates the state using the provided setter function.
 *
 * @param e - The change event triggered by the input element.
 * @param setter - A function to update the state with the new input value.
 *
 * The function extracts the `id`, `value`, `type`, and `checked` properties from the event target.
 * It then calls the setter function with the previous state and updates the state based on the input type.
 * If the input type is a checkbox, it updates the state with the `checked` value; otherwise, it updates with the `value`.
 */

export function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setter: (prevData: any) => void
) {
  const { id, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked;

  setter((prevData: any) => {
    // Check if the id corresponds to a location field
    if (["city", "state", "country"].includes(id)) {
      return {
        ...prevData,
        location: {
          ...prevData.location,
          [id]: value,
        },
      };
    }

    // Update other fields
    return {
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    };
  });
}

/**
 * Handles the form submission for login.
 *
 * @param e - The form event triggered by the submission.
 * @param formData - An object containing the username, password, and rememberMe flag.
 * @param statesetter - A function to update the state.
 * @param state - The current state value.
 *
 * @returns A promise that resolves when the form submission is complete.
 *
 * @remarks
 * This function prevents the default form submission behavior, logs the form data,
 * toggles the loading spinner state, and sends a POST request to the server with the form data.
 * If the request is successful, it logs the result and toggles the loading spinner state again.
 * If an error occurs, it logs the error.
 */
export async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  formData: { email: string; password: string; rememberMe: boolean },
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  SetErrorMsg: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>,
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
) {
  e.preventDefault();

  //turn on loading spinner
  setIsloading(true);

  try {
    setIsloading(true);

    const invalid = !validate(formData);
    if (typeof invalid === "string") {
      setIsError(true);
      setIsloading(false);
      SetErrorMsg(invalid);
      throw new Error(invalid);
    }

    // proceed with the posting
    const result = await axios.post("http://localhost:7000/api/auth/sign-in", formData);

    if (result.status === 200) {
      console.log(result);
      setSuccessMsg(result?.data?.message);
      setIsloading(false);
      setIsError(false);

      const token = result.data.token;
      sessionStorage.setItem("token", token);

      //serialized and save user data to localstorage
      localStorage.setItem("UserData", JSON.stringify(result.data.user));

      //navigate to the dashboard
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
    setIsError(true);
    setIsloading(false);
    SetErrorMsg(error?.response?.data || error?.message || "An error occurred");
  }
}
const validate: (data: loginformDataType) => boolean | string = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean(),
  });

  const { error } = schema.validate(data);

  if (error) return error.message;

  return true;
};
