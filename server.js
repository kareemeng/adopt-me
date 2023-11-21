import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

//* this is what ever directory the file is in
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3001;

// this gonna grap index.html after build
const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"), "utf8")
  .toString();

/*
    The server aims to send the head part first (before the dynamic content),
    allowing CSS and JS to start loading while the dynamic content is being prepared.
    */
const [head, body] = html.split("<!-- APP -->");

const app = express();

//Configures Express to serve static files from the /assets route, pointing to the ./dist/client/assets directory.
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

/**
 * The server is set to handle all incoming requests through a callback function.
 *  It writes the first part of the HTML (the head) to the response.
 * --------------------------------------------------------------------
 * It then presumably renders the application using the renderApp function,
 * passing the request URL and a set of callbacks for different events (like when the shell is ready, when an error occurs, etc.).
 * --------------------------------------------------------------------
 * When the shell is ready, the server begins streaming the rendered content incrementally (Stream.pipe(res, { end: false })),
 *  which means it starts sending the response without waiting for the entire content to be generated.
 * --------------------------------------------------------------------
 * Upon completion of rendering and when everything is ready (onAllReady),
 *  the second part of the HTML (the body) is sent, followed by the response being ended (res.end()).
 */

app.use((req, res) => {
  res.write(head);
  const Stream = renderApp(req.url, {
    onShellReady() {
      //   ?SEO optimization
      //*if it is a crawler then we need to send the full html so do nothing
      if (
        !req.headers["user-agent"].match(
          /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i
        )
      )
        Stream.pipe(res, { end: false });
    },
    onShellError(error) {
      //error handling for shell rendering
      error.log(error); //tip: use a logger like sentry or winston to log errors
    },
    onAllReady() {
      //*if it is a crawler then we need to send the full html
      if (
        req.headers["user-agent"].match(
          /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i
        )
      )
        return res.end(html);

      //every thing is done
      //when all is ready as it's gonna send it incrementally
      res.write(body);
      res.end();
    },
    onError(error) {
      //error handling for app rendering (general error)
      error.log(error); //tip: use a logger like sentry or winston to log errors
    },
  });
});

console.log(`Listening on  http://localhost:${port}`);
app.listen(port);
