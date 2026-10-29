---
name: git-commit
description: >-
  Padroniza a criação de commits no Git seguindo Conventional Commits com emojis
  (Gitmoji). Use esta skill sempre que o usuário pedir para criar um commit,
  salvar alterações no Git, sugerir mensagens de commit ou organizar o histórico
  do repositório.
---

# Padrão de Commits com Emojis (Conventional Commits + Gitmoji)

Use este guia sempre que for criar ou sugerir mensagens de commit neste repositório.

## Formato da Mensagem

```text
<emoji> <tipo>(<escopo>): <descrição curta e clara>

[corpo opcional em tópicos explicando o que mudou e o porquê]
```

### Regras Gerais

1. **Idioma**: escreva em **português** (exceto termos técnicos consagrados como `lightbox`, `masonry`, `hero`, `SEO`, `CSS`).
2. **Verbo no imperativo / presente**: comece a descrição com verbo na 3ª pessoa ou infinitivo curto (ex.: `corrige`, `adiciona`, `atualiza`, `remove`, `ajusta`).
3. **Tamanho do título**: máximo de **72 caracteres** na primeira linha, sem ponto final.
4. **Escopo opcional**: indique a área afetada entre parênteses quando fizer sentido. Escopos comuns neste projeto:
   - `menu`, `header`, `footer`
   - `home`, `hero`, `sobre`, `contato`, `trabalhos`
   - `galeria`, `masonry`, `lightbox`
   - `cms`, `seo`, `config`
   - `css`, `js`, `media`

---

## Tabela de Tipos e Emojis

| Emoji | Tipo | Quando usar | Exemplo |
| :--- | :--- | :--- | :--- |
| ✨ | `feat` | Nova funcionalidade, seção ou recurso | `✨ feat(contato): adiciona envio assíncrono via Formspree` |
| 🐛 | `fix` | Correção de bug visual, de layout ou de script | `🐛 fix(menu): corrige abertura e alinhamento do submenu mobile` |
| 💄 | `style` | Ajustes visuais, CSS, tipografia, espaçamento ou responsividade | `💄 style(galeria): centraliza masonry quando há apenas 1 foto` |
| 📸 | `content` | Adição ou atualização de fotos, ensaios, categorias ou textos | `📸 content(ensaios): adiciona novo ensaio e atualiza capa` |
| ♻️ | `refactor` | Refatoração de código (HTML/Liquid/CSS/JS) sem alterar comportamento | `♻️ refactor(js): simplifica cálculo de colunas do masonry` |
| ⚡ | `perf` | Melhoria de desempenho, carregamento de imagens ou animações | `⚡ perf(hero): otimiza carregamento dos slides secundários` |
| ♿ | `a11y` | Melhorias de acessibilidade, atributos ARIA ou navegação por teclado | `♿ a11y(menu): sincroniza aria-expanded no submenu mobile` |
| 📝 | `docs` | Alterações no `README.md` ou documentação do projeto | `📝 docs(readme): atualiza instruções de uso do Pages CMS` |
| 🔧 | `chore` | Configurações do Jekyll (`_config.yml`), Pages CMS (`.pages.yml`) ou `.agents` | `🔧 chore(cms): ajusta campos de configuração no Pages CMS` |
| 🔥 | `prune` | Remoção de arquivos, fotos ou códigos não utilizados | `🔥 prune(media): remove imagens de teste duplicadas` |

---

## Passo a Passo para Criar o Commit

1. **Inspecione o estado atual**:
   Execute `git status` e `git diff` para revisar todas as alterações antes de preparar o commit.
2. **Verifique se não há arquivos temporários**:
   Garanta que arquivos de teste, cache ou rascunho não sejam incluídos por engano.
3. **Escolha o tipo, emoji e escopo adequados**:
   - Se houver apenas uma mudança focada, use uma única linha objetiva.
   - Se o commit reunir várias melhorias relacionadas, adicione um corpo em lista (`- `) detalhando os pontos principais.
4. **Execute o commit**:
   ```bash
   git add <arquivos>
   git commit -m "<emoji> <tipo>(<escopo>): <descrição>"
   ```
5. **Confirme o resultado**:
   Execute `git log -n 1` e `git status` para validar que o commit foi registrado corretamente.

---

## Exemplos Práticos

### Commit simples (1 linha)
```text
🐛 fix(contato): adiciona rótulo visível ao campo de sobrenome no mobile
```

### Commit completo (com corpo detalhado)
```text
🐛 fix(menu): corrige menu colapsável de trabalhos no celular e ajustes gerais

- Corrige abertura/fechamento do submenu ao tocar em TRABALHOS ou na seta
- Mantém posição vertical fixa do menu ao expandir/recolher categorias
- Adiciona rotação do ícone chevron e alinhamento central dos links
- Exibe cabeçalho editorial em todas as categorias (modo galeria e ensaios)
- Ajusta envio do formulário de contato via AJAX com Formspree
```

