#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use axum::Router;
    use leptos::logging::log;
    use leptos::prelude::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use pagina_gaspar::app::{shell, App};

    let conf = get_configuration(None).unwrap();
    let mut leptos_options = conf.leptos_options;

    // Railway injeta a PORT; local usa o site-addr do Cargo.toml.
    // Binding em 0.0.0.0 é obrigatório em container.
    if let Ok(port) = std::env::var("PORT") {
        leptos_options.site_addr = format!("0.0.0.0:{port}")
            .parse()
            .expect("variável PORT com valor inválido");
    }

    let addr = leptos_options.site_addr;
    let routes = generate_route_list(App);

    let app = Router::new()
        .route("/healthz", axum::routing::get(|| async { "ok\n" }))
        .leptos_routes(&leptos_options, routes, {
            let options = leptos_options.clone();
            move || shell(options.clone())
        })
        .fallback(leptos_axum::file_and_error_handler(shell))
        .with_state(leptos_options);

    log!("escutando em http://{}", &addr);
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("não foi possível abrir a porta");
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}

#[cfg(not(feature = "ssr"))]
pub fn main() {
    // Sem servidor no alvo cliente; a hidratação fica em src/lib.rs.
}
