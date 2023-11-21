// run on the server side (node.js) using node stream
// node stream is a way to send data from the server to the client slowly sends the data piece by piece
import { renderToPipeableStream } from "react-dom/server";
//static router is used to render the app on the server side but without history and location
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );
  return stream;
}

//vite will use this file to render the app on the server side
//vite is gonna build ServerApp.jsx then we can import what was built into node.js server as node can't understand jsx
//alternative is using babel to convert jsx to js but it's not recommended as it's slow
