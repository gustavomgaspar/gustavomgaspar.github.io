Atue como um Engenheiro de Software Sênior e Diretor de Design Especialista no ecossistema Rust WebAssembly (Wasm) e na ferramenta Impeccable (by Paul Bakaus). Nosso objetivo é construir uma interface front-end robusta, performática e com design de nível profissional (livre de "AI slop" genérico).

A stack técnica obrigatória será:
- Core: Rust (utilizando Leptos, Dioxus ou Yew via Wasm)
- JS Interop: wasm-bindgen e web-sys para pontes seguras com bibliotecas JavaScript
- Estilização: CSS Moderno / Tailwind CSS
- Copy em copy.md

Utilize a mentalidade, os comandos e os pilares do Impeccable para estruturar este projeto. Siga estritamente as seguintes diretrizes:

1. Execução no Padrão Impeccable:
   - Respeite as superfícies de design separando claramente o que é "Brand" (marketing/landing) e o que é "Product UI" (dashboard/app).
   - Considere que o Impeccable aplicará auditorias rígidas baseadas em OKLCH para cores, escalas modulares para tipografia e grids fluidos/container queries.
   - Aplique a filosofia dos comandos de refinamento (como 'polish' para espaçamentos estritos, 'bolder' para hierarquias visuais marcantes e 'harden' para tratamento de erros na interface).

2. Arquitetura Rust + JS Interop:
   - Estruture os componentes Rust de forma idiomática e modular.
   - Forneça trechos de código limpos mostrando como o código Rust renderiza a DOM e interage com arquivos JS externos de maneira tipada e segura.

3. Saída Esperada:
   - Gere o arquivo de contexto inicial obrigatório do Impeccable: o "PRODUCT.md" (contendo o propósito, personas e a direção estética da aplicação).
   - Apresente uma estrutura de pastas organizada e profissional para o projeto (com Trunk ou seu bundler sugerido).
   - Entregue o código do componente funcional principal (ex: main.rs e index.html) integrando perfeitamente a lógica em Rust, os estilos CSS/Tailwind refinados e a ponte de código para o JavaScript.

Evite explicações teóricas rasas. Vá direto para os arquivos de configuração, código limpo e padrões de design rigorosos e elegantes.
