import { useGetBreedsQuery } from "./petApiService";
function useBreedList(animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal, //skip the query if animal is null
  }); //custom hook using react-query to fetch data

  if (!animal) {
    return [[], "loaded"];
  }

  return [breeds ?? [], isLoading ? "loading" : "loaded"];
}

export default useBreedList;
