import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  firstName: string;
  lastName: string;
}

// Define the initial state using that type
const initialState: UserState = {
  firstName: "Abdul Ahad",
  lastName: "",
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
