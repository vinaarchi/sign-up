import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
}

const initialData: IUser = {
  id: null,
  name: null,
  username: null,
  email: null,
};

// Define slice config to create function reducer and actions

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialData },
  reducers: {
    setSignIn: (state, action) => {
        //kalo cuma login, pake initialState, tpi karena ingin menambahkan logout
        //jadinya hanya memakai state tidak perlu initialnya,
        // karena parameter state merepresentasikan state terkini
      console.log("CHECK ACTION REDUX FROM USER SIGNIN:", action);
      // menyimpan data ke global store
      return { ...action.payload };
    },
    setSignOut: () => {
    // {penjelasan: reset data in global store user}
    // return { ...initialData };

    // ini aku tambahinn buat bisa logout
    
        return { id: null, name: null, username: null, email: null}
    }
    },
  },
);

// Export action
export const { setSignIn, setSignOut } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
