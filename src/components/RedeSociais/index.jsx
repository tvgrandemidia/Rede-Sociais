import style from "./styles.module.css";

import fundoDesktop from "../../assets/fundo-desktop.png";
import fundoMobile from "../../assets/fundo-mobile.png";

function Rede() {
  return (
    <main className={style.container}>

      <picture className={style.fundo}>
        <source
          media="(max-width: 768px)"
          srcSet={fundoMobile}
        />

        <img
          src={fundoDesktop}
          alt="TV Grande Mídia"
        />
      </picture>

      <section className={style.perfil}>

        <div className={style.logo}>
          TV GM
        </div>

        <h1>TV Grande Mídia</h1>

        <p>Informação em tempo real</p>

      </section>

      <section className={style.links}>

        <a
          href="https://www.instagram.com/tvgrandemidia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          📷 Instagram
        </a>

        <a
          href="https://radiogm.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🌐 Portal TV GM
        </a>

        <a
          href="https://wa.me/5586988208877"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 WhatsApp
        </a>

        <a
          href="https://www.youtube.com/@tv.grandemidia"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶️ YouTube
        </a>

      </section>

      <footer>
        © TV Grande Mídia
      </footer>

    </main>
  );
}

export default Rede;