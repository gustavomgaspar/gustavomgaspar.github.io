use crate::components::page::HomePage;
use leptos::prelude::*;
use leptos_meta::{provide_meta_context, Link, Meta, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <AutoReload options=options.clone() />
                <HydrationScripts options/>
                <MetaTags/>
            </head>
            <body>
                <App/>
            </body>
        </html>
    }
}

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/pagina_gaspar.css"/>
        <Title text="Gaspar — engenharia digital para empresas consolidadas"/>
        <Meta name="description" content="Modernização digital para empresas consolidadas: site de alta performance, integração CRM e ERP, automação de vendas e painel de métricas operacionais. Agende uma Reunião de Diagnóstico Digital Gratuita de 20 minutos."/>
        <Meta property="og:title" content="Gaspar — engenharia digital para empresas consolidadas"/>
        <Meta property="og:description" content="Site de alta performance, integração de sistemas, automação comercial e painel de métricas para sustentar e expandir o faturamento da sua empresa."/>
        <Meta property="og:type" content="website"/>
        <Meta property="og:image:alt" content="Gaspar — engenharia digital para empresas consolidadas"/>
        <Meta name="twitter:card" content="summary"/>
        <Link rel="icon" href="/favicon.svg" type_="image/svg+xml"/>
        <Router>
            <Routes fallback=|| "Página não encontrada.".into_view()>
                <Route path=StaticSegment("") view=HomePage/>
            </Routes>
        </Router>
    }
}
