//............................:form types

export type Gender = "male" | "female" | "other";

export type role = "user" | "admin";

export type newUserFormData = {
  username: string;
  email: string;
  gender: Gender | undefined;
  age: string;
  password: string;
  name: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  status: string;
  role: role;
};

export type FormSubmitHandlerType = (
  e: React.FormEvent<HTMLFormElement>,
  formData: newUserFormData,
  stateSetter: (state: boolean) => void,
  state: boolean,
  setErrorMessage: (value: string | null) => void,
  setErrorState: (value: boolean) => void,
  UpdateSuccessMessage: (value: string) => void,
  SetSuccessMessage: (value: boolean) => void,
  navigate: (path: string) => void
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
  _id: string;
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
//.........................:.login form type
export type loginformDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type userDataType = newUserFormData & {
  profilePicture: string | null;
  bio: string | null;
  interest: string | null;
  isOnline: boolean;
  lastSeen: Date;
  friendRequestList: string[];
  friends: friendListType | [];
  createdAt: Date;
};

export type friendListType = userDataType[];

// ...................: layout context type
export type LayoutContextType = {
  showChats: boolean;
  setShowChats: React.Dispatch<React.SetStateAction<boolean>>;
  showFriends: boolean;
  setShowFriends: React.Dispatch<React.SetStateAction<boolean>>;
};
