import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import roleReducer from "../features/roleSlice";
import backInShapeReducer from "../features/backInShapeSlice";
import bisPayReducer from "../features/bisPaySlice";
import personalTrainerReducer from "../features/personalTrainerSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    backInShapes: backInShapeReducer,
    personalTrainers: personalTrainerReducer,
    bisPays: bisPayReducer,
  },
})