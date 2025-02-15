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
export type Participant = {
  _id: string | undefined;
  profilePicture: string | undefined | null;
  name: string | undefined;
  username: string | undefined;
  isOnline: boolean | undefined;
  lastSeen: Date | undefined;
};

export type Message = {
  id: string | undefined;
  content: string | undefined;
  sender: Participant | undefined;
  reciever: Participant | undefined;
  updatedAt: Date | undefined;
  createdAt: Date | undefined;
  read: boolean | undefined;
  delivered: boolean | undefined;
  isEdited: boolean | undefined;
  conversationID: string | undefined;
  [key: string]: any;
};

export type newMessage = {
  content: string | undefined;
  sender: { _id: string } | undefined;
  reciever: { _id: string } | undefined;
  updatedAt: Date | undefined;
  timestamp: Date | undefined;
  read: boolean | undefined;
  delivered: boolean | undefined;
  isEdited: boolean | undefined;
  conversationID: string | undefined;
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
  _id: string;
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
export type LayoutContextType = {};
