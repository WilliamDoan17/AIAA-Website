import { createContext } from "react";
import type { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const defaultContext = {
  user: null,
  loading: true,
}

const AuthContext = createContext<AuthContextType>(defaultContext);

export default AuthContext
