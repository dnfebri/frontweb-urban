import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import roleReducer from "../features/roleSlice";
import backInShapeReducer from "../features/backInShapeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    backInShapes: backInShapeReducer
  },
})