import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5050/auth/login', {
      email: user.email,
      password: user.password
    });
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    reset: (state) => initialState
  },
  extraReducers:(builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload;
    });
  }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;