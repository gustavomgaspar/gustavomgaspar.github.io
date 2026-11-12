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

## Desenvolvimento local

Qualquer servidor estático serve a página. Não há build nem `npm install`:

```sh
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Estrutura

```
index.html     página única
site.css       sistema visual
site.js        comportamento do painel e do formulário
copy.md        copy comercial (fonte de verdade)
DESIGN.md      sistema de design documentado
favicon.svg    ícone
robots.txt     diretivas para buscadores
PRODUCT.md     contexto de produto (Impeccable)
```

## Formulário de contato

Sem backend e sem servidor: o formulário monta a mensagem e abre o WhatsApp do Gaspar
com o texto pronto. Nada é gravado em disco nem enviado a um endpoint. Se um backend de
captura entrar no futuro, troca-se o manipulador de `submit` em `site.js` — o desenho da
página não muda.

## Deploy

**Alvo de deploy em decisão.** A página é estática e serve em qualquer hospedagem de
arquivos estáticos; a escolha do provedor e do domínio custom ainda não foi registrada.

## Limites assumidos

- Sem backend, sem banco de dados, sem autenticação e sem persistência.
- Sem etapa de build: o que está no repositório é o que vai ao ar.
- Sem analytics instalado.
- O painel de métricas é demonstração; dados reais exigiriam o sistema do cliente.
