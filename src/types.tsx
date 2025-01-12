//............................:form types
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

//.........................:chats types
type Participant = {
  _id: string;
  profilePicture: string;
  name: string;
};

type Message = {
  id: string;
  content: string;
  sender: Participant;
  timestamp: Date;
  [key: string]: any;
};

export type Conversation = {
  id: string;
  type: "direct" | "group";
  lastMessage: Message | null;
  participants: Participant[];
  date: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

//.............................:network req types
export type Endpoint = {
  url: string;
  headers?: Record<string, string>;
};
