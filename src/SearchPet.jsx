import {
  useState,
  useContext,
  useDeferredValue,
  useMemo,
  useTransition,
} from "react";
import { useQuery } from "@tanstack/react-query";
import adoptedPetsContext from "./adoptedPetContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchPrams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [adoptedPet] = useContext(adoptedPetsContext);
  const [animal, setAnimal] = useState("");
  //it is better to use react-query instead of useEffect almost always because of the unpredictable nature of useEffect
  const [breeds] = useBreedList(animal); //custom hook using react-query to fetch data
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results.data?.pets ?? []; //?if results.data is undefined, then pets will be an empty array
  /*
   if there is a change in the value of pets, then update the value of deferredPets after the render queue is empty 
   (after all higher priority tasks are done)
  here we give re-rendering new value of pets a lower priority than the current render
  */
  const deferredPets = useDeferredValue(pets);
  // update the value of renderedPets only when deferredPets changes
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target); //?pulls the data from the form
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          //?startTransition is used to give the re-rendering of the component a lower priority than the current render
          startTransition(() => {
            setRequestParams(obj);
          });
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
              setAnimal(e.target.value);
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
        {
          //?useTransition returns a boolean value which is true when the transition is in progress
          isPending ? (
            <div className="mini loading-pane">
              <h2 className="loader">🦮</h2>
            </div>
          ) : (
            <button>Submit</button>
          )
        }
      </form>
      {renderedPets}
    </div>
  );
};

export default SearchPrams;
