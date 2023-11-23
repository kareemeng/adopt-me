import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); //responsible for navigation (rerouting)

  const dispatch = useDispatch(); // useDispatch is a hook that will return the dispatch function from the store which we can use to give actions to the store

  const { id } = useParams();
  const { isLoading, data: pet } = useGetPetQuery(id); //?useGetPetQuery is a hook that will return the data from the server
  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌏</h2>
      </div>
    );
  }

  if (!pet) {
    return <h2>Not Found</h2>;
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
                    dispatch(adopt(pet)); // makes action object with the pet as the payload and dispatches it to the store
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

function DetailsWithErrorBoundary(props) {
  // add props in case we need to pass props to the Details component later

  //*we can make it reusable by passing the error message as a prop ro the ErrorBoundary component
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsWithErrorBoundary;
