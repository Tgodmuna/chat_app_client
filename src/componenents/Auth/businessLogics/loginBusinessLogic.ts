import axios from "axios";

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
