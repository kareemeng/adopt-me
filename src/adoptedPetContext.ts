import { createContext } from "react";
import { IPet } from "./APIResponsesTypes";
//we can use this context to share the state of the adopted pets
const AdoptedPetContext = createContext<
  [IPet | null, (adoptedPet: IPet) => void]
>([
  {
    id: 151,
    name: "Mittens",
    animal: "cat",
    breed: "Long Haired Domestic",
    images: [],
    city: "Seattle",
    state: "WA",
    description: "Mittens is a ...",
  },
  () => {},
]);
// add a default value to the context to satisfy typescript requirements or test requirements
// else we never use this default value

export default AdoptedPetContext;
