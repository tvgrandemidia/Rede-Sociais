import styles from "./styles.module.css";

import logo from "../../assets/3103415.png";

function App() {
    return (
        <main className={styles.container}>

            {/* LOGOMARCA */}

            <div className={styles.logo}>
                <img
                    src={logo}
                    alt="TV Grande Mídia"
                />
            </div>


            {/* TÍTULO */}

            <h1 className={styles.titulo}>
                TV Grande Mídia
            </h1>


            <p className={styles.subtitulo}>
                Informação, notícias e conteúdo
                em todos os lugares.
            </p>


            {/* REDES SOCIAIS */}

            <section className={styles.redes}>

                {/* INSTAGRAM */}

                <a
                    className={styles.botao}
                    href="https://www.instagram.com/tvgrandemidia?igsi=MWl6OHRmMnZhbWp1cg=="
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.icone}>
                        ◎
                    </div>

                    <div className={styles.texto}>
                        <strong>
                            Instagram
                        </strong>

                        <small>
                            @tvgrandemidia
                        </small>
                    </div>

                    <div className={styles.seta}>
                        →
                    </div>
                </a>


                {/* FACEBOOK */}

                <a
                    className={styles.botao}
                    href="https://www.facebook.com/share/14kMp7kt9oL/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.icone}>
                        f
                    </div>

                    <div className={styles.texto}>
                        <strong>
                            Facebook
                        </strong>

                        <small>
                            TV Grande Mídia
                        </small>
                    </div>

                    <div className={styles.seta}>
                        →
                    </div>
                </a>


                {/* YOUTUBE */}

                <a
                    className={styles.botao}
                    href="https://youtube.com/@tv.grandemidia?si=puFCIzzI6mVTrWK0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.icone}>
                        ▶️
                    </div>

                    <div className={styles.texto}>
                        <strong>
                            YouTube
                        </strong>

                        <small>
                            TV Grande Mídia
                        </small>
                    </div>

                    <div className={styles.seta}>
                        →
                    </div>
                </a>


                {/* TIKTOK */}

                <a
                    className={styles.botao}
                    href="https://www.tiktok.com/@tv.grandemidia?_r=1&_t=ZS-99LyuVTqljU"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.icone}>
                        ♪
                    </div>

                    <div className={styles.texto}>
                        <strong>
                            TikTok
                        </strong>

                        <small>
                            @tvgrandemidia
                        </small>
                    </div>

                    <div className={styles.seta}>
                        →
                    </div>
                </a>


                {/* WHATSAPP */}

                <a
                    className={styles.botao}
                    href="https://wa.me/5586988208877"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.icone}>
                        ◔
                    </div>

                    <div className={styles.texto}>
                        <strong>
                            WhatsApp
                        </strong>

                        <small>
                            Fale com a TV Grande Mídia
                        </small>
                    </div>

                    <div className={styles.seta}>
                        →
                    </div>
                </a>


                {/* PORTAL */}

                <a
                    className={styles.botao}
                    href="https://radiogm.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={styles.icone}>
                        GM
                    </div>

                    <div className={styles.texto}>
                        <strong>
                            Portal de Notícias
                        </strong>

                        <small>
                            Acesse as principais notícias
                        </small>
                    </div>

                    <div className={styles.seta}>
                        →
                    </div>
                </a>

            </section>


            {/* TV AO VIVO */}

            <a
                className={styles.aoVivo}
                href="https://www.youtube.com/live/NG7OOH4J-Ek?is=WOlrvR78FlaUvS6d"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={styles.bolinha}></div>

                <div>
                    <strong>
                        🔴 TV GRANDE MÍDIA AO VIVO
                    </strong>

                    <span>
                        Clique para assistir à nossa programação
                    </span>
                </div>

                <div className={styles.setaLive}>
                    →
                </div>
            </a>


            {/* RODAPÉ */}

            <footer className={styles.footer}>
                © 2026 TV Grande Mídia
                • Todos os direitos reservados
            </footer>

        </main>
    );
}

export default App;