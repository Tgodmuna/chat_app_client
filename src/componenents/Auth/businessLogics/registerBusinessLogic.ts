import axios from "axios";
import { FormSubmitHandlerType, newUserFormData } from "../../../types";
import joi from "joi";

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
  SuccessMsgSetter,
  SetSuccessMessage
) => {
  //defualt state for state and error setter
  stateSetter(state);
  errorSetter(false);

  try {
    const { error } = validationHandler(formData);
    if (error) {
      errorMsgSetter(error.details[0].message);
      errorSetter(true);
      return;
    }
    // post the data after successful validation
    const result = await axios.post<{ data: any }>("knkk", formData);

    if (!result) {
      console.log("errorResult", result);
      errorSetter(true);
      return;
    }

    console.log(result);
    if (result.status === 200) {
      SuccessMsgSetter("registered successfully");
      SetSuccessMessage(true);

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

//validation handler
export const validationHandler = (formData: newUserFormData) => {
  //check for empty fields
  if (
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.name ||
    !formData.phone ||
    !formData.location ||
    !formData
  ) {
    throw new Error("fields cant be empty");
  }

  //check for constraints
  const formDataSchema = joi.object({
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

    phone: joi.number(),
    location: joi.string(),
  });

  return formDataSchema.validate(formData);
};
