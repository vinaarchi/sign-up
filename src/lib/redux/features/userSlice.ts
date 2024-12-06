import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  isAuth?: boolean;
}

const initialData: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
};

// Define slice config to create function reducer and action
const userSlice = createSlice({
  name: "user",
  initialState: { ...initialData },
  reducers: {
    setSignIn: (initialState, action) => {
      console.log("CHECK ACTION REDUX FROM USER SIGNIN:", action);
      // Store data to global store user reducer
      return { ...action.payload };
    },
    setSignOut: () => {
      // reset data in global store user reducer
      return { ...initialData };
    },
  },
});

// Export action
export const { setSignIn, setSignOut } = userSlice.actions;

// Export reducer
export default userSlice.reducer;