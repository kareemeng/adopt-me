import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./adoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";
//// import { PetAPIResponse } from "./APIResponsesTypes"

const Details = () => {
  const { id } = useParams();
  if (!id) throw new Error("Details component requires an id param");
  //! do not use PetAPIResponse here, Because wa already set the type in the fetchPet function
  const results = useQuery(["details", id], fetchPet); //?details is the cache key, run fetchPet if the key is not in the cache

  const [_, setAdoptedPet] = useContext(AdoptedPetContext); //eslint-disable-line @typescript-eslint/no-unused-vars

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); //responsible for navigation (rerouting)

  // results.refetch(); //?refetch will refetch the data from the server
  //?isError is a boolean that will be true if there is an error
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌏</h2>
      </div>
    );
  }
  const pet = results?.data?.pets[0];

  if (!pet) {
    throw new Error("No pet found");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Yould You Like To Adopt {pet.name} ? </h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

/* 
in order to use the ErrorBoundary, we need to wrap the Details component in the ErrorBoundary component
we need to do this that way so that all the details component will be wrapped in the ErrorBoundary component
*/

function DetailsWithErrorBoundary() {
  // add props in case we need to pass props to the Details component later

  //*we can make it reusable by passing the error message as a prop ro the ErrorBoundary component
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsWithErrorBoundary;
