import { createContext } from "react";

//we can use this context to share the state of the adopted pets
const AdoptedPetContext = createContext(); // create a context object can have a default value

export default AdoptedPetContext;
