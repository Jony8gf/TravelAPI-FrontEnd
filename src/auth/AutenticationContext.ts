import React from "react";
import { claim } from "./auth.model";

const AutenticationContext = React.createContext<{
    claims: claim[];
    actualizar(claims: claim[]) :void;
}>({claims: [], actualizar: () => {}});

export default AutenticationContext;