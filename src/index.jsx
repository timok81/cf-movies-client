import { createRoot } from "react-dom/client";
import "./index.scss";

const CfMoviesApplication = () => {
  return (
    <div className="cf-movies">
      <div>Good morning</div>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<CfMoviesApplication />);