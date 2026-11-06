# syntax=docker/dockerfile:1
#
# Build multi-stage compatível com Railway:
# - builder: Rust + cargo-leptos (binário pré-compilado) + build release
# - runner: debian slim, usuário não-root, PORT do Railway

ARG CARGO_LEPTOS_VERSION=0.3.11

FROM rust:1-slim-bookworm AS builder
ARG CARGO_LEPTOS_VERSION

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl tar gzip \
    && rm -rf /var/lib/apt/lists/* \
    && rustup target add wasm32-unknown-unknown \
    && curl -fsSL \
        "https://github.com/leptos-rs/cargo-leptos/releases/download/v${CARGO_LEPTOS_VERSION}/cargo-leptos-x86_64-unknown-linux-gnu.tar.gz" \
        | tar -xz -C /usr/local/bin --strip-components=1 \
            "cargo-leptos-x86_64-unknown-linux-gnu/cargo-leptos"

WORKDIR /build

# Camada de cache de dependências: stubs compilam tudo antes do código real.
COPY Cargo.toml Cargo.lock ./
RUN mkdir -p src public/styles \
    && echo "pub fn stub() {}" > src/lib.rs \
    && echo "fn main() {}" > src/main.rs \
    && printf ':root {\n}\n' > public/styles/app.css \
    && cargo leptos build --release \
    && rm -rf src public target/site

# Build real com o código do projeto (só o crate próprio recompila).
COPY src ./src
COPY public ./public
RUN cargo leptos build --release

# ---------- runner ----------
FROM debian:bookworm-slim AS runner

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 gaspar

WORKDIR /app

COPY --from=builder /build/Cargo.toml ./Cargo.toml
COPY --from=builder /build/target/release/pagina-gaspar ./target/release/pagina-gaspar
COPY --from=builder /build/target/site ./target/site

ENV RUST_LOG=info
ENV LEPTOS_SITE_ROOT=target/site

USER gaspar

# Porta real vem da variável PORT (Railway); 8080 é apenas documentação.
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://127.0.0.1:8080/healthz || exit 1

ENTRYPOINT ["/app/target/release/pagina-gaspar"]
