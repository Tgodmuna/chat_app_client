export type Gender = "male" | "female" | "other";

export type newUserFormData = {
  username: string;
  email: string;
  gender: Gender | undefined;
  age: string;
  password: string;
  name: string;
  phone: string;
  location: string;
  status: string;
  role: string;
};

export type FormSubmitHandlerType = (
  e: React.FormEvent<HTMLFormElement>,
  formData: newUserFormData,
  stateSetter: (state: boolean) => void,
  state: boolean,
  setErrorMessage: (value: string | null) => void,
  setErrorState: (value: boolean) => void,
  UpdateSuccessMessage: (value: string) => void,
  SetSuccessMessage: (value: boolean) => void
) => Promise<void>;
