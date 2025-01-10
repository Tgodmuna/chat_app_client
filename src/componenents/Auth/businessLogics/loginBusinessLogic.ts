import axios from "axios";

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
  e: React.ChangeEvent<HTMLInputElement>,
  setter: (prevData: any) => void
) {
  const { id, value, type, checked } = e.target;

  setter((prevData: any) => ({
    ...prevData,
    [id]: type === "checkbox" ? checked : value,
  }));
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
  formData: { username: string; password: string; rememberMe: boolean },
  statesetter: (prevState: boolean | (() => any)) => void,
  state
) {
  e.preventDefault();
  console.log(formData);

  //turn on loading spinner
  statesetter(!state);

  try {
    const result = await axios.post("knkk", formData);

    if (result) {
      console.log(result);
      statesetter(!state);
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
}
