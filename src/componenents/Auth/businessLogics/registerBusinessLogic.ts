import axios from "axios";
import type React from "react";
type stateTypes = {
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
  formData: any,
  statesetter: () => void,
  state: stateTypes
) => Promise<void>;

export const handleSubmit: FormSubmitHandler = async (e, formData, statesetter, state) => {
  try {
    const result = await axios.post("knkk", formData);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
