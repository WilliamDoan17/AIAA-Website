import { createContext } from "react";
import type { User } from "../types/auth";
import { Member } from "../types/member";

interface AuthContextType {
  user: User | null;
  member: Member | null;
  loading: boolean;
}

const defaultContext = {
  user: null,
  member: null,
  loading: true,
}

const AuthContext = createContext<AuthContextType>(defaultContext);

export default AuthContext
