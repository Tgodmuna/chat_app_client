import axios from "axios";
import { FormSubmitHandlerType, newUserFormData } from "../../../types";
import joi from "joi";

/**
 * Handles the form submission event.
 *
 * @param e - The form submission event.
 * @param formData - The data from the form to be submitted.
 * @param stateSetter - A function to set the state.
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
  SuccessMsgSetter,
  SetSuccessMessage
) => {
  // Reset state and error flags
  stateSetter(state);
  errorSetter(false);

  // Prevent default form submission behavior
  e.preventDefault();

  try {
    const validation = validationHandler(formData);
    if (validation.error) {
      // Handle validation errors gracefully
      errorMsgSetter(validation.error.details[0].message);
      errorSetter(true);
      return;
    }

    // Post the data after successful validation
    const result = await axios.post<{ data: any }>(
      "https://example.com/api/endpoint", // Replace with a valid URL
      formData
    );

    if (result.status === 200) {
      SuccessMsgSetter("Registered successfully");
      SetSuccessMessage(true);

      // Navigate user to dashboard
      // (implement navigation logic here)
    }
  } catch (error: any) {
    // Enhanced error handling
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    errorSetter(true);
    errorMsgSetter(errorMessage);
    console.error("Request failed:", error);
  }
};

// Validation handler
export const validationHandler = (formData: newUserFormData) => {
  const schema = joi.object({
    username: joi.string().min(4).required(),
    name: joi.string().min(3).required(),
    email: joi
      .string()
      .required()
      .regex(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: joi
      .string()
      .min(8)
      .required()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    phone: joi.number().optional(),
    location: joi.string().optional(),
  });

  // Validate and return
  return schema.validate(formData, { abortEarly: false });
};

// Form level handler
export const handleFormLevel = (
  newLevel: number,
  currentLevel: number,
  stateSetter: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    if (typeof newLevel !== "number") {
      throw new Error("newLevel must be a number");
    }
    if (newLevel > currentLevel) {
      stateSetter(newLevel);
      console.log("Activated a new page");
    }
  } catch (error) {
    console.error("Error handling form level:", error);
  }
};
