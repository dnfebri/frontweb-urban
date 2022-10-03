import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
  try {
    const response = await axios.post( process.env.API_URL_APP + 'auth/login', {
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

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
  console.log(axios.defaults.headers);
  try {
    const response = await axios.get( process.env.API_URL_APP + 'auth/me');
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async(user, thunkAPI) => {
  await axios.delete( process.env.API_URL_APP + 'auth/logout');
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
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload.token;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload;
    });

    // get User
    builder.addCase(getMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload;
    });
  }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;