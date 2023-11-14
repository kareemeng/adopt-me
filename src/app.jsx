import { createRoot } from "react-dom/client";
import SearchPet from "./SearchPet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchPet />
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
