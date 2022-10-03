import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const token = Cookies.get('token');
try {
  console.log(jwt_decode(token));
} catch (error) {
  console.log(error);
}
const tokenDecode = token ? jwt_decode(token) : '';
const uuid = tokenDecode ? tokenDecode.uuid : '';
const name = tokenDecode ? tokenDecode.name : '';
const email = tokenDecode ? tokenDecode.email : '';
const roleId = tokenDecode ? tokenDecode.roleId : '';
const role = tokenDecode ? tokenDecode.role : '';
const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    uuid: uuid, 
    name: name, 
    email: email, 
    roleId: roleId,
    role: role
  }, reducers: {
    update: (state, action) => {
      state.uuid = action.payload.uuid
      state.name = action.payload.name
      state.email = action.payload.email
      state.roleId = action.payload.roleId
      state.role = action.payload.role
    }
  }
})

export const {update} = authUserSlice.actions;
export default authUserSlice.reducer;