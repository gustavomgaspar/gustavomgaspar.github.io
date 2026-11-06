use crate::content::WHATSAPP_URL;
use leptos::prelude::*;

#[component]
pub fn Hero() -> impl IntoView {
    view! {
        <section id="topo" class="hero">
            <div class="container hero__inner">
                <p class="hero__kicker">"Modernização digital para empresas consolidadas"</p>
                <h1 class="hero__title">
                    "Sua empresa é líder no mercado físico, mas invisível na internet?"
                </h1>
                <p class="hero__lede">
                    "Transforme seu site institucional em uma máquina automática de captação de clientes."
                </p>
                <p class="hero__sub">
                    "Unifico engenharia digital de ponta, melhoria de processos internos e automação de vendas para negócios consolidados que precisam acelerar no digital."
                </p>
                <a
                    class="btn btn--primary btn--lg"
                    href=WHATSAPP_URL
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    "Quero Modernizar Minha Empresa"
                </a>
            </div>
        </section>
    }
}
