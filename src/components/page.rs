use super::diagnosis_cta::DiagnosisCta;
use super::footer::Footer;
use super::header::Header;
use super::hero::Hero;
use super::metrics_demo::MetricsDemo;
use super::offer::Offer;
use super::pain_points::PainPoints;
use super::why_gaspar::WhyGaspar;
use leptos::prelude::*;

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <a class="skip-link" href="#conteudo">
            "Pular para o conteúdo principal"
        </a>
        <Header/>
        <main id="conteudo">
            <Hero/>
            <PainPoints/>
            <Offer/>
            <MetricsDemo/>
            <WhyGaspar/>
            <DiagnosisCta/>
        </main>
        <Footer/>
    }
}
