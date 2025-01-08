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
  errorMsgSetter: (value: string | null) => void,
  errorSetter: (value: boolean) => void,
  SuccessMsgSetter: (value: string) => void,
  setAuthFeedback?: (value: string) => void
) => Promise<void>;
