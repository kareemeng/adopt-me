import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; //allows us to select data from the store
import useBreedList from "./useBreedList";
import { useSearchPetsQuery } from "./petApiService";
import Results from "./Results";
import { updateSearchParams } from "./searchParamsSlice";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchPrams = () => {
  const [animal, setAnimal] = useState("");
  //it is better to use react-query instead of useEffect almost always because of the unpredictable nature of useEffect
  const [breeds] = useBreedList(animal); //custom hook using react-query to fetch data
  //this function is subscribed to the store and will be called whenever the store changes

  const requestParams = useSelector((state) => state.searchParams.value);
  const adoptedPet = useSelector((state) => state.adoptedPet.value); // take all the state from the store and return the adoptedPet slice
  /**
   * ?this is bad because it will rerender the entire component whenever the store changes
   * !this is a lot of un necessary rerendering make sure to pull only the data you need from the store
   * const store = useSelector((state) => state);
   * const adoptedPet = store.adoptedPet;
   */

  const dispatch = useDispatch(); //allows us to dispatch actions to the store
  const { data: results } = useSearchPetsQuery(requestParams); //custom hook using RTK-query to fetch data
  const pets = results ?? []; //?if results is undefined, then pets will be an empty array

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
          // console.log("updated params", obj);
          dispatch(updateSearchParams(obj));
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
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchPrams;
