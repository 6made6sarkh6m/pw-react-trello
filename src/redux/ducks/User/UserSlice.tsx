import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultUser } from "utils/mock";
import { UserDataProps, SaveUserPayload } from "./types";

export const initialUserState: UserDataProps = defaultUser;

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    saveUser(state, action: PayloadAction<SaveUserPayload>) {
      const {
        payload: { isAuth, name },
      } = action;
      state = { isAuth, name };
      return state;
    },
  },
});

export const { saveUser } = UserSlice.actions;

export default UserSlice.reducer;
