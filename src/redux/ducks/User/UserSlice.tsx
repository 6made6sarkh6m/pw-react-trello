import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultUser } from "utils/mock";
import { StorageService } from "helpers/storageService";
import { StorageProperties } from "enum/enum";
import { UserDataProps, SaveUserPayload } from "./types";

export const initialUserState: UserDataProps = StorageService.getData(
  defaultUser,
  StorageProperties.user
);

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    saveUser(state, action: PayloadAction<SaveUserPayload>) {
      const {
        payload: { isAuth, name },
      } = action;
      state = { isAuth, name };
      StorageService.setData(state, StorageProperties.user);
      return state;
    },
  },
});

export const { saveUser } = UserSlice.actions;

export default UserSlice.reducer;
