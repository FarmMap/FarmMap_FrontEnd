import { createContext } from "react";
import UserAccount from "../../data/types/UserAccount";
const UserContext = createContext<UserAccount | undefined>(undefined);

export { UserContext };
