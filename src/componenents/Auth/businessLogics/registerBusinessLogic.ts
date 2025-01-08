import axios from "axios";
import { FormSubmitHandlerType } from "../../../types";

/**
 * Handles the form submission event.
 *
 * @param e - The form submission event.
 * @param formData - The data from the form to be submitted.
 * @param statesetter - A function to set the state.
 * @param state - The current state.
 * @returns A promise that resolves to void.
 */

export const handleSubmit: FormSubmitHandlerType = async (
  e,
  formData,
  stateSetter,
  state,
  errorMsgSetter,
  errorSetter,
  SuccessMsgSetter
) => {
  //defualt state for state and error setter
  stateSetter(state);
  errorSetter(false);

  try {
    const result = await axios.post<{ data: any }>("knkk", formData);

    if (!result) {
      console.log("errorResult", result);
      errorSetter(true);
      return;
    }

    console.log(result);
    if (result.status === 200) {
      SuccessMsgSetter("registered successfully");

      //navigate user to dashboard
      //............

      //............
    }
  } catch (error) {
    errorSetter(true);
    errorMsgSetter(error.message);

    console.log(error);
  }
};

export const registerInitialState = {
  username: "",
  email: "",
  password: "",
  name: "",
  phone: "",
  location: "",
  gender: "",
  age: "",
  status: "",
  role: "",
};
