import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// just like error boundary, it just passes the children through if it has children else it renders nothing
const Modal = ({ children }) => {
  // useRef is a hook that gives us access to the DOM element that it is attached to (in this case, the div with id="modal")
  const elementRef = useRef(null);
  // if the elementRef is null, create a div and assign it to the elementRef
  if (!elementRef.current) {
    // create it only once and reuse it
    elementRef.current = document.createElement("div");
  }

  // useEffect is a hook that runs after the component has been rendered
  useEffect(() => {
    //the reason why we are creating ref is to remove the elementRef when the component is unmounted (to avoid memory leaks)
    const modalRoot = document.getElementById("modal");
    // append the elementRef to the modalRoot
    modalRoot.appendChild(elementRef.current);

    //*return a function that will be called when the component is unmounted
    return () => modalRoot.removeChild(elementRef.current); // clean up the elementRef when the component is unmounted

    /**
     * cases where you need to clean up
     * remove event listeners
     * remove dom elements
     * stop timers (setInterval, setTimeout, animationFrame)
     */
  }, []); // the empty array ensures that the useEffect runs only once

  //pass the children to the createPortal function
  //note i used a div for styling purposes
  return createPortal(<div>{children}</div>, elementRef.current); //*the second argument is the DOM element that we want to render the children into
};

export default Modal;
