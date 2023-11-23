import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    //if iam requesting specific pet, i need to pass id
    getPet: builder.query({
      //? url is base url + endpoint url (http://pets-v2.dev-apis.com/pets) + id (http://pets-v2.dev-apis.com/pets?id=1)
      query: (id) => ({ url: "pets", params: { id } }),
      //*transformResponse is a function that will be called before the data is returned to the user
      transformResponse: (response) => response.pets[0], // instead of doing response.pets[0] in the component, we can do it here
    }),
    getBreeds: builder.query({
      query: (animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response) => response.breeds,
    }),
    searchPets: builder.query({
      query: ({ location, animal, breed }) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response) => response.pets,
    }),
  }),
});
// use for hock and getPet is the name of the endpoint and query is the function
export const { useGetPetQuery, useGetBreedsQuery, useSearchPetsQuery } = petApi;
