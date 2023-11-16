import { Component } from "react";
//this is a class component just trying to show the difference between a class component and a functional component for learning purposes

//*any class component needs to extend Component and have a render method

class Carousel extends Component {
  state = {
    active: 0,
  };
  //   if nothing is passed in, then the default props will be used
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  /*
  componentDidMount() //?this is a lifecycle method that is called after the component is mounted like useEffect with an empty array
  componentDidUpdate() //?this is a lifecycle method that is called after the component is updated like useEffect with an array of dependencies
  shouldComponentUpdate()//? is a lifecycle method that is called before the component is updated not in functional components
  componentWillUnmount() //?this is a lifecycle method that is called before the component is unmounted like useEffect with a return statement
  */
  //!used an arrow function because it will bind the this keyword to the class normal functions will not bind the this keyword
  handelIndexClick = (e) => {
    // + to convert the string to a number as every thing in the dom is a string
    this.setState({ active: +e.target.dataset.index });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handelIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
/*
!you can not use hooks in a class component directly.
! but you can use them in a functional component that is nested inside of a class component
example:

function CarouselParent({ animal }) {
  const [breedList] = useBreedList(animal);
  return <Carousel breedList={breedList} />;
}

!then should be used like this:
export default CarouselParent;
*/

export default Carousel;
