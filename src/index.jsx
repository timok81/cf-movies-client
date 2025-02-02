import { createRoot } from "react-dom/client";
import "./index.scss";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const CfMoviesApplication = () => {
  return (
    <Provider store={store}>
      <Container fluid className="px-0">
        <MainView />
      </Container>
    </Provider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<CfMoviesApplication />);
