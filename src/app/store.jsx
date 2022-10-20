import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import roleReducer from "../features/roleSlice";
import rp99kReducer from "../features/rp99kSlice";
import backInShapeReducer from "../features/backInShapeSlice";
import bisPayReducer from "../features/bisPaySlice";
import personalTrainerReducer from "../features/personalTrainerSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    rp99ks: rp99kReducer,
    backInShapes: backInShapeReducer,
    bisPays: bisPayReducer,
    personalTrainers: personalTrainerReducer,
  },
})