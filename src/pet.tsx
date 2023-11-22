import { Link } from "react-router-dom";

interface IProps {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}
// React.FC is not recommended
const Pet = (props: IProps) => {
  const { name, animal, breed, images, location, id } = props;
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (images.length) hero = images[0];

  return (
    // Link is better than <a> tag because it doesn't reload the page
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
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
