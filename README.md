# Gaspar — Landing pages que transformam visita em conversa comercial

Landing page de geração de leads para o Gaspar: desenho, integração e automação de
engenharia digital para empresas que já lideram no mercado físico.

Conteúdo comercial em `copy.md` — fonte de verdade. Nada de provas ou métricas
inventadas: o painel do hero é uma demonstração com dados sintéticos, rotulada como tal
na própria interface.

## Stack

- **HTML, CSS e JavaScript estáticos** — sem build, sem dependências, sem backend.
- `index.html` — página única, todo o conteúdo comercial já no HTML inicial.
- `site.css` — sistema visual (tokens OKLCH, escala tipográfica modular, grade fluida).
- `site.js` — demonstração do painel, validação do formulário e envio por WhatsApp.
- `waves.js` — campo de linhas do hero (WebGL2, shader próprio, sem interação).

## Desenvolvimento local

Qualquer servidor estático serve a página. Não há build nem `npm install`:

```sh
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Estrutura

```
index.html     página única
404.html       página de erro, no visual da marca
site.css       sistema visual
site.js        comportamento do painel e do formulário
waves.js       campo de linhas do hero (WebGL2, sem interação)
gaspar.svg     logo da marca (mascote)
favicon.svg    ícone da aba (a logo sobre fundo)
apple-touch-icon.png   ícone para iOS (PNG, 180×180)
og.png         imagem de prévia para compartilhamento (1200×630)
copy.md        copy comercial (fonte de verdade)
DESIGN.md      sistema de design documentado
robots.txt     diretivas para buscadores
sitemap.xml    mapa do site
.nojekyll      desliga o Jekyll no GitHub Pages
PRODUCT.md     contexto de produto (Impeccable)
```

## Fundo do hero

O hero tem um campo de linhas onduladas gerado em tempo real, em WebGL2 puro — sem
biblioteca, sem build, sem interação com o mouse. É decorativo: some sozinho em
navegadores sem WebGL2, e sob `prefers-reduced-motion` desenha um único frame estático.

Detalhes de custo e contraste em `DESIGN.md`.

## Formulário de contato

Sem backend e sem servidor: o formulário monta a mensagem e abre o WhatsApp do Gaspar
com o texto pronto. Nada é gravado em disco nem enviado a um endpoint. Se um backend de
captura entrar no futuro, troca-se o manipulador de `submit` em `site.js` — o desenho da
página não muda.

## Deploy

**GitHub Pages**, servido na raiz do domínio: <https://gustavomgaspar.github.io/>

A página é publicada no repositório de site de usuário `gustavomgaspar.github.io`: a branch
`main` recebe o conteúdo deste repositório por force-push, e o Pages reconstrói sozinho a
cada push. O arquivo `.nojekyll` impede que o GitHub rode Jekyll sobre o conteúdo estático.

O site anterior que ocupava esse repositório ("GMG Web", Jekyll, de 2022) foi preservado no
branch `legacy/gmg-web` do repositório de site de usuário.

### Republicar

```sh
git push github-pages main:main
```

O Pages reconstrói em ~1 minuto e serve na raiz do domínio. Nada mais é preciso.

### Domínio próprio

Ainda em decisão. Quando houver, basta criar o arquivo `CNAME` no repositório de site de
usuário com o domínio e apontar o DNS — o restante do setup não muda.

## Limites assumidos

- Sem backend, sem banco de dados, sem autenticação e sem persistência.
- Sem etapa de build: o que está no repositório é o que vai ao ar.
- Sem analytics instalado.
- O painel de métricas é demonstração; dados reais exigiriam o sistema do cliente.
