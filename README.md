# Machado Fotografia — Portfólio

Portfólio fotográfico de **Mateus Machado**, construído com **Jekyll** (hospedado gratuitamente no **GitHub Pages**) e totalmente gerenciável via **Pages CMS** (`https://app.pagescms.org`), inspirado na linguagem visual do template *Scale*.

---

## Como gerenciar fotos e textos pelo Pages CMS

1. Acesse **[app.pagescms.org](https://app.pagescms.org)** e faça login com sua conta do **GitHub**.
2. Selecione o repositório **`machadofotografia.github.io`** (branch `main`).
3. No menu lateral você encontrará:
   - **Categorias**: crie ou edite categorias (ex.: *Casamentos & Histórias*, *Ensaios*, *Eventos & Formaturas*).
     - Em **Exibição (`modo`)**, escolha entre:
       - **Galeria única (`galeria`)**: exibe o masonry de 3 colunas direto na página da categoria.
       - **Dividida por ensaios (`ensaios`)**: exibe os cartões dos ensaios vinculados àquela categoria.
   - **Ensaios**: crie ensaios individuais (ex.: *Ana & João*), escolha a categoria correspondente, foto de capa, data, local, texto de abertura e faça upload das fotos da galeria.
   - **Configurações**:
     - **Site e redes**: altere o nome no cabeçalho, WhatsApp, Instagram, e-mail e o **ID do Formspree**.
     - **Home**: edite os slides do Hero em tela cheia (suporta 1 foto inteira ou 2 fotos lado a lado em díptico), frases, resumo "Sobre", depoimentos, etapas do processo e banner final.
     - **Sobre**: altere a foto, título e biografia da página Sobre.
     - **Contato**: personalize textos e foto da página de Contato.
   - **Media**: gerencie todas as fotos enviadas para a pasta `/media`.

Cada alteração salva no Pages CMS gera um commit automático no GitHub e atualiza o site em aproximadamente 1 minuto.

---

## Como ativar o formulário de contato (Formspree)

1. Crie uma conta gratuita em **[formspree.io](https://formspree.io)**.
2. Crie um novo formulário apontando para o seu e-mail (`mateus.souza.070202@gmail.com`) e copie o código final do endpoint (por exemplo, em `https://formspree.io/f/xabcdefg`, o ID é `xabcdefg`).
3. No **Pages CMS**, abra **Configurações → Site e redes** e cole esse código no campo **ID do formulário Formspree**.
   *(Enquanto o campo estiver em branco, o formulário redireciona automaticamente a mensagem preenchida para o seu WhatsApp).*

---

## Desenvolvimento local

### Usando Docker (sem precisar instalar Ruby)

```bash
docker run --rm -it -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4 jekyll serve
```

### Usando Ruby / Bundler

```bash
bundle install
bundle exec jekyll serve
```

O site ficará disponível em `http://localhost:4000`.
