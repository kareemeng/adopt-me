import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (images && images.length) hero = images[0];

  return (
    // Link is better than <a> tag because it doesn't reload the page
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img data-testid="pet-thumbnail" src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} -{location || "N/A"}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
