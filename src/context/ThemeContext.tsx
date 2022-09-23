import { ArtivaContextType } from "@artiva/shared";
import { createContext } from "react";

export default createContext<ArtivaContextType | undefined>(undefined);
