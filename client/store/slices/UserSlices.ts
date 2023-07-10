import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  userId: string;
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  role: string;
  token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userId: "",
  name: "Abdul Ahad",
  email: "",
  city: "",
  state: "",
  country: "",
  occupation: "",
  phoneNumber: "",
  role: "",
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
