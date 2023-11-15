import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet); //?details is the cache key, run fetchPet if the key is not in the cache

  // results.refetch(); //?refetch will refetch the data from the server
  //?isError is a boolean that will be true if there is an error
  if (results.isError) return <h2>Error: {results.error.message}</h2>;
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌏</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];

  if (!pet) {
    return <h2>Not Found</h2>;
  }

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;
