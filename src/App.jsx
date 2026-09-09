import RedeSociais from "./components/RedeSociais";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import "./App.css";

function App() {
  const caminho = window.location.pathname;

  if (caminho === "/termos") {
    return <Termos />;
  }

  if (caminho === "/privacidade") {
    return <Privacidade />;
  }

  return <RedeSociais />;
}

export default App;
