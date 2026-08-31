import style from "./styles.module.css";

import logo from "../../assets/3103415.png";

function Rede() {
  return (
    <main className={style.container}>

      {/* LOGOMARCA */}

      <div className={style.logo}>
        <img
          src={logo}
          alt="TV Grande Mídia"
        />
      </div>


      {/* TÍTULO */}

      <h1>
        TV Grande Mídia
      </h1>


      <p className={style.subtitulo}>
        Informação, notícias e conteúdo
        em todos os lugares.
      </p>


      {/* REDES SOCIAIS */}

      <section className={style.redes}>

        {/* INSTAGRAM */}

        <a
          className={style.botao}
          href="https://www.instagram.com/tvgrandemidia?igsi=MWl6OHRmMnZhbWp1cg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.icone}>
            ◎
          </div>

          <div className={style.texto}>
            <strong>
              Instagram
            </strong>

            <small>
              @tvgrandemidia
            </small>
          </div>

          <div className={style.seta}>
            →
          </div>
        </a>


        {/* FACEBOOK */}

        <a
          className={style.botao}
          href="https://www.facebook.com/share/14kMp7kt9oL/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.icone}>
            f
          </div>

          <div className={style.texto}>
            <strong>
              Facebook
            </strong>

            <small>
              TV Grande Mídia
            </small>
          </div>

          <div className={style.seta}>
            →
          </div>
        </a>


        {/* YOUTUBE */}

        <a
          className={style.botao}
          href="https://youtube.com/@tv.grandemidia?si=puFCIzzI6mVTrWK0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.icone}>
            ▶️
          </div>

          <div className={style.texto}>
            <strong>
              YouTube
            </strong>

            <small>
              TV Grande Mídia
            </small>
          </div>

          <div className={style.seta}>
            →
          </div>
        </a>


        {/* TIKTOK */}

        <a
          className={style.botao}
          href="https://www.tiktok.com/@tv.grandemidia?_r=1&_t=ZS-99LyuVTqljU"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.icone}>
            ♪
          </div>

          <div className={style.texto}>
            <strong>
              TikTok
            </strong>

            <small>
              @tvgrandemidia
            </small>
          </div>

          <div className={style.seta}>
            →
          </div>
        </a>


        {/* WHATSAPP */}

        <a
          className={style.botao}
          href="https://wa.me/5586988208877"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.icone}>
            ◔
          </div>

          <div className={style.texto}>
            <strong>
              WhatsApp
            </strong>

            <small>
              Fale com a TV Grande Mídia
            </small>
          </div>

          <div className={style.seta}>
            →
          </div>
        </a>


        {/* PORTAL */}

        <a
          className={style.botao}
          href="https://radiogm.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.icone}>
            GM
          </div>

          <div className={style.texto}>
            <strong>
              Portal de Notícias
            </strong>

            <small>
              Acesse as principais notícias
            </small>
          </div>

          <div className={style.seta}>
            →
          </div>
        </a>

      </section>


      {/* TV AO VIVO */}

      <a
        className={style.aoVivo}
        href="https://www.youtube.com/live/NG7OOH4J-Ek?is=WOlrvR78FlaUvS6d"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={style.bolinha}></div>

        <div className={style.liveTexto}>
          <strong>
            🔴 TV GRANDE MÍDIA AO VIVO
          </strong>

          <span>
            Clique para assistir à nossa programação
          </span>
        </div>

        <div className={style.setaLive}>
          →
        </div>
      </a>


      {/* RODAPÉ */}

      <footer>
        © 2026 TV Grande Mídia
        • Todos os direitos reservados
      </footer>

    </main>
  );
}

export default Rede;