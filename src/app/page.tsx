"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faWebflow } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';


//TODO: Incluir links do pixieset no lugar dos álbums
class TypeWriting {
  element: HTMLElement;
  words: string[];
  speed: number;
  delay: number;
  loop: string | null;
  char: string;
  counter: number;
  isDeleting: boolean;

  constructor(element: HTMLElement) {
    this.element = element;
    try {
      this.words = JSON.parse(element.getAttribute('data-words') || '[]');
    } catch (e) {
      console.error("Failed to parse data-words attribute:", e);
      this.words = [];
    }
    this.speed = parseInt(element.getAttribute('data-speed') || '100', 10);
    this.delay = parseInt(element.getAttribute('data-delay') || '1000', 10);
    this.loop = element.getAttribute('data-loop');
    this.char = '';
    this.counter = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.counter % this.words.length;
    const fullText = this.words[current];

    if (this.isDeleting) {
      this.char = fullText.substring(0, this.char.length - 1);
    } else {
      this.char = fullText.substring(0, this.char.length + 1);
    }

    this.element.innerHTML = `<span class="wrap">${this.char}</span>`;

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.char === fullText) {
      typeSpeed = this.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.char === '') {
      this.isDeleting = false;
      this.counter++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

export default function Home() {
  useEffect(() => {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      new TypeWriting(element);
    }
  }, []);

  return (
    <div>
      <header id="header" className="vh-100 flex">
        <div className="container">
          <div className="header-content">
            <h1 style={{ height: '200px' }}>
              Eu sou <br />
              <span
                className="typewrite"
                data-loop="yes"
                data-speed="100"
                data-delay="2000"
                data-words='["estudante", "fotógrafo", "designer"]'
              ></span>
            </h1>
            <h3>Mateus Machado</h3>
            <ul className="social-links">
              <li>
                <a
                  href="https://www.instagram.com/machado.fotografia01?igsh=MWtxNzJ6M3R5MzM5dg=="
                  className="flex"
                >
                   <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://linktr.ee/machado0" className="flex">
                <i className="bi bi-link-45deg"></i>                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className={styles.page}>
      <section id="about" className="about py-7">
            <div className="container">
                <div className="about-content grid">
                    <div className="about-left">
                        <img className="img-about" src="images/about-pic.jpg" alt=""/>
                    </div>
                    <div className="about-right">
                        <div className="title">
                            <h2>Sobre mim</h2>
                        </div>
                        <p className="lead"> Eu comecei na fotografia como um hobby, apenas por lazer e curiosidade dessa
                            área de fotografia.
                            Consegui comprar minha câmera com um dinheiro que havia economizado e também com o dinheiro
                            do meu trabalho anterior na feira do bosque.
                            E na segunda metade do ano de 2023 iniciei com trabalhos profissionais visto que foi
                            possível conseguir uma renda extra com isso
                            e como gosto muito de fotografia estou sempre "treinando" pois gosto de registrar momentos
                            importantes na minha vida.</p>
                        <p className="lead">Também possuo vários trabalhos concluídos na area de design, e sempre lembrando
                            que isso essa minha flexibilidade
                            sempre foi pensada voltando para a minha formação que virá em breve pois sou estudante de
                            Odontologia.</p>
                        <a href="#work" className="btn-down">
                            <i className="fas fa-chevron-down" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section id="work" className="vh-100 flex">
            <div className="container">
                <div className="work-content">
                    <div className="title">
                        <h2>O que eu faço?</h2>
                    </div>
                    <ul className="work-top grid">
                        <li className="lead"><i className="fas fa-dot-circle" aria-hidden="true"></i> Gosto de tirar fotos de coisas variadas, sem
                            me prender muito a um só nicho.</li>
                        <li className="lead"><i className="fas fa-dot-circle" aria-hidden="true"></i> Faço meus trabalhos com uma camera digital da
                            Canon, comprada com meu próprio dinheiro.</li>
                        <li className="lead"><i className="fas fa-dot-circle" aria-hidden="true"></i> No meu tempo livre quando não estou na
                            faculdade gosto de aprender coisas novas.</li>
                        <li className="lead"><i className="fas fa-dot-circle" aria-hidden="true"></i> Eu compartilho algumas de minhas fotos em meu
                            instagram.</li>
                    </ul>

                    <div className="work-bottom grid">
                        <div>
                            <span className="icon"><img className="img-work" src="images/landscape-icon.png"/></span>
                            <h3>Ensaios</h3>
                        </div>
                        <div>
                            <span className="icon"><img className="img-work" src="images/street-icon.png"/></span>
                            <h3>Animais</h3>
                        </div>
                        <div>
                            <span className="icon"><img className="img-work" src="images/portrait-icon.png"/></span>
                            <h3>Eventos</h3>
                        </div>
                        <div>
                            <span className="icon"><img className="img-work" src="images/wildlife-icon.png"/></span>
                            <h3>Esportes</h3>
                        </div>
                    </div>
                    <a href="#portfolio" className="btn-down btn-down-white">
                        <i className="fas fa-chevron-down" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </section>

        <section id="insta" className="py-7">
            <div className="container">
                <div className="insta-content">
                    <div className="title">
                        <h2>Categorias</h2>
                    </div>
                    <div className="insta-grid grid">
                        <div className="image-container">
                            <a href="#destaque">
                                <img src="images/instagram/port-11.jpg"/>
                                <div className="overlay-text">Destaques</div>
                            </a>
                      
                        </div>
                        <div className="image-container">
                            <a href="#animais">
                                <img src="images/port-2.jpg"/>
                                <div className="overlay-text">Animais</div>
                            </a>
                        </div>
                        <div className="image-container">
                            <a href ="#eventos">
                                <img src="images/instagram/port-13.jpg"/>
                                <div className="overlay-text">Eventos</div>
                            </a>
                        </div>
                        <div className="image-container">
                            <a href="#esportes">
                                <img src="images/instagram/port-14.jpg"/>
                                <div className="overlay-text">Esportes</div>
                            </a>
                            <h3>Esportes</h3>
                        </div>
                        <div className="image-container">
                            <a href="#comidas">
                                <img src="images/port-4.PNG"/>
                                <div className="overlay-text">Comidas</div>
                            </a>
                        </div>
                        <div className="image-container">
                            <a href="#odonto">
                                <img src="images/port-6.jpg"/>
                                <div className="overlay-text">Odonto</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="destaque" className="vh-100 py-7">
            <div className="container">
                <div className="portfolio-content">
                    <div className="title">
                        <h2>Destaques</h2>
                        <a href="#animais" className="btn-down btn-down-black">
                            <i className="fas fa-chevron-down" aria-hidden="true"></i>
                        </a>
                    </div>

                    <div className="portfolio-grid grid">
                        <div className="foto-grid"><img src="images/port-1.jpg"/></div>
                        <div><img src="images/port-2.jpg"/></div>
                        <div><img src="images/port-3.jpg"/></div>
                        <div><img src="images/port-4.PNG"/></div>
                        <div><img src="images/port-5.jpg"/></div>
                        <div><img src="images/port-6.jpg"/></div>
                        <div><img src="images/port-7.jpg"/></div>
                        <div><img src="images/port-8.jpg"/></div>
                        <div><img src="images/port-9.jpg"/></div>
                        <div><img src="images/port-10.jpg"/></div>
                    </div>
                </div>
            </div>
        </section>

        <section id="animais" className="vh-100 py-7">
            <div className="container">
                <div className="portfolio-content">
                    <div className="title">
                        <h2>Animais</h2>
                        <a href="#contact" className="btn-down btn-down-black">
                            <i className="fas fa-chevron-down" aria-hidden="true"></i>
                        </a>
                    </div>

                    <div className="portfolio-grid grid">
                        <div className="foto-grid"><img src="images/port-1.jpg"/></div>
                        <div><img src="images/port-2.jpg"/></div>
                        <div><img src="images/port-3.jpg"/></div>
                        <div><img src="images/port-4.PNG"/></div>
                        <div><img src="images/port-5.jpg"/></div>
                        <div><img src="images/port-6.jpg"/></div>
                        <div><img src="images/port-7.jpg"/></div>
                        <div><img src="images/port-8.jpg"/></div>
                        <div><img src="images/port-9.jpg"/></div>
                        <div><img src="images/port-10.jpg"/></div>
                    </div>
                </div>
            </div>
        </section>


        <section id="contact" className="py-7">
            <div className="container">
                <div className="contact-content flex">
                    <div className="contact-left">
                        <div className="title">
                            <h2>entre em contato comigo</h2>
                        </div>
                        <p className="lead">
                          <i className="fa-solid fa-envelope fa-xl" aria-hidden="true"></i>
                          <span className="contato-links">
                              <a href="mailto:mateus.souza.070202@gmail.com">Enviar email</a>
                              </span>
                        </p>
                        <p className="lead"><i className="fa-brands fa-whatsapp fa-xl" aria-hidden="true"></i><span className="contato-links"> <a
                                    href="https://wa.me/5594991404214">Enviar mensagem</a></span></p>
                    </div>

                    <div className="contact-right">
                        <img src="images/contact-pic.jpg" alt="contact image"/>
                    </div>
                </div>
            </div>
        </section>

      </main>
      
    </div>
  );
}
