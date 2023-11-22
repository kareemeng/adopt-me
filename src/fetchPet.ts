import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";
//first param is the return type, second param is the params type (in this case, the id and the query key)
const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch failed`);
  }
  //no need to await here, react-query will handle it
  // console.log(await apiRes.json());
  return apiRes.json();
};

export default fetchPet;
