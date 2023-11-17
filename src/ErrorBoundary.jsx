import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  //use class component to catch errors because the function component does not have error handling methods

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //TODO: typically log this to an error service like Sentry, TrackJS, New Relic, etc.
    console.error(`ErrorBoundary caught an error`, error, info);
  }

  render() {
    if (this.state.hasError) {
      //if there is an error, return this message. can be more generic if you receive the error message as a prop
      return (
        <h2>
          This listing has an error. <Link to="/">Click here</Link> to go back
          to the home page.
        </h2>
      );
    } else {
      //if there is no error, return the children (the component that is wrapped by the ErrorBoundary)
      return this.props.children;
    }
  }
}
export default ErrorBoundary;
