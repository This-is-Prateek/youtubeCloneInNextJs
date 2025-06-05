import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
    userName: string;
    email: string;
    fullName: string;
    avatar: string | null;
    coverImage: string | null;
    watchHistory: string[];
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

type AuthState = {
    status: boolean;
    userData: UserData | null;
}

const initialState: AuthState = {
  status: false,
  userData: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userData: UserData }>) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
