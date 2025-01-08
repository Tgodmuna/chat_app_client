import axios from "axios";
import type React from "react";
type formDataType = {
  username: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  location: string;
  gender: string;
  age: string;
  status: string;
  role: string;
};

/**
 * Handles the form submission event.
 *
 * @param e - The form submission event.
 * @param formData - The data from the form to be submitted.
 * @param statesetter - A function to set the state.
 * @param state - The current state.
 * @returns A promise that resolves to void.
 */
type FormSubmitHandler = (
  e: React.FormEvent<HTMLFormElement>,
  formData: formDataType,
  stateSetter: (state: boolean) => void,
  state: boolean,
  errorMsgSetter: (value: string | null) => void,
  errorSetter: (value: boolean) => void
) => Promise<void>;

export const handleSubmit: FormSubmitHandler = async (
  e,
  formData,
  stateSetter,
  state,
  errorMsgSetter,
  errorSetter
) => {
  stateSetter(state);
  errorSetter(false);

  try {
    const result = await axios.post("knkk", formData);

    if (!result) {
      console.log("errorResult", result);
      errorSetter(true);
      return;
    }

    console.log(result);
    if (result.status === 200) errorMsgSetter("registered successfully");
  } catch (error) {
    errorMsgSetter(error.message);
    console.log(error);
  }
};
