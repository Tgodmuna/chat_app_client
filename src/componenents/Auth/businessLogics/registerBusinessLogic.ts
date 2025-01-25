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
  SetSuccessMessage,
  navigate
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
      "http://localhost:7000/api/auth/register",
      formData
    );

    if (result.status === 201) {
      SuccessMsgSetter("Registered successfully");
      SetSuccessMessage(true);

      // Navigate user to login to dashboard
      navigate("/login");
    }
  } catch (error: any) {
    // Enhanced error handling
    const errorMessage = error.response?.data || error.message || "An error occurred";
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
    password: joi.string().min(8).required(),
    phone: joi.number().optional(),
    location: {
      city: joi.string(),
      state: joi.string(),
      country: joi.string(),
    },
    gender: joi.string().valid("male", "female", "other"),
    status: joi.string(),
    age: joi.number(),
    role: joi.string().valid("user", "admin"),
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
