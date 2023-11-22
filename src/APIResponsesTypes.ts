//central place for all api response types to be defined
/*
types can grant us type safety and help us avoid typos in our
as you are not safe from typos in the api response types you can use a library like TRPC
TRPC is a library that allows us to define our API in a type-safe way
*/

export type Animal = "bird" | "cat" | "dog" | "rabbit" | "reptile";

export interface IPet {
  // can change the Pet to IPet to indicate that it is an interface
  id: number;
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  city: string;
  state: string;
  description: string;
}

export interface ISearchParams {
  animal: Animal;
  breed: string;
  location: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  pets: IPet[];
}

export interface BreedAPIResponse {
  animal: Animal;
  breeds: string[];
}
