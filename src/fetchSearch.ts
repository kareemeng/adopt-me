import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse, ISearchParams } from "./APIResponsesTypes";

const fetchSearch: QueryFunction<
  PetAPIResponse,
  ["search", ISearchParams]
> = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  if (!apiRes.ok)
    throw new Error(`pet search failed for ${animal} - ${breed} - ${location}`);

  return apiRes.json();
};

export default fetchSearch;
