import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import adoptedPetsContext from "./adoptedPetContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import { Animal, ISearchParams } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchPrams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });

  const [animal, setAnimal] = useState("" as Animal);
  //it is better to use react-query instead of useEffect almost always because of the unpredictable nature of useEffect
  const [breeds] = useBreedList(animal); //custom hook using react-query to fetch data

  const [adoptedPet] = useContext(adoptedPetsContext);

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results.data?.pets ?? []; //?if results.data is undefined, then pets will be an empty array

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //use currentTarget instead of target because target because typeScript will complain that target is null
          const formData = new FormData(e.currentTarget); //?pulls the data from the form
          const obj: ISearchParams = {
            animal: (formData.get("animal")?.toString() ?? "") as Animal,
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          console.log("updated params", obj);
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => {
              return <option key={animal}>{animal}</option>;
            })}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={!breeds.length} name="breed">
            <option />
            {breeds.map((breed) => {
              return <option key={breed}>{breed}</option>;
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchPrams;
