import { createContext } from "react";
import type { User } from "../types/auth";
import { Member } from "../types/member";

interface AuthContextType {
  user: User | null;
  member: Member | null;
  loading: boolean;
  refetchMember: () => Promise<void>;
}

const defaultContext = {
  user: null,
  member: null,
  loading: true,
  refetchMember: async () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContext);

export default AuthContext
