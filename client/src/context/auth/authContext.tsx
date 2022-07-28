import { createContext } from "react";
import { AuthenticationContext } from "../../shared/types";

const authContext = createContext({} as AuthenticationContext);

export default authContext;
