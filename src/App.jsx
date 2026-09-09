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

  if (caminho === "/auth/tiktok/callback") {
    return (
      <div>
        <h1>Autorização do TikTok</h1>
        <p>Retorno da autorização recebido.</p>
      </div>
    );
  }

  return <RedeSociais />;
}

export default App;

