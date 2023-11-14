import { useState } from "react";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchPrams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const breeds = ["a", "b", "c"];
  return (
    <div className="search-params">
      <form action="">
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed(""); //reset breed to empty string //!need empty option in select tag
            }}
          >
            <option />
            {ANIMALS.map((animal) => {
              return <option key={animal}>{animal}</option>;
            })}
          </select>
          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              disabled={!breeds.length} //if breeds.length is 0, then disabled is true
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              <option />
              {breeds.map((breed) => {
                return <option key={breed}>{breed}</option>;
              })}
            </select>
          </label>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchPrams;
