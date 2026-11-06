use crate::content::WHATSAPP_URL;
use leptos::prelude::*;

#[component]
pub fn DiagnosisCta() -> impl IntoView {
    view! {
        <section id="diagnostico" class="section cta">
            <div class="container cta__inner">
                <p class="section__kicker">"Chamada para ação"</p>
                <h2 class="section__title">
                    "Vamos desenhar o plano de modernização do seu negócio?"
                </h2>
                <p class="cta__body">
                    "Agende uma Reunião de Diagnóstico Digital Gratuita (20 minutos). Vou analisar a velocidade do seu site atual, identificar gargalos no seu processo operacional e apresentar os primeiros passos para consolidar sua presença digital."
                </p>
                <ul class="cta__checks">
                    <li>"Velocidade do seu site atual"</li>
                    <li>"Gargalos no seu processo operacional"</li>
                    <li>"Primeiros passos para consolidar sua presença digital"</li>
                </ul>
                <a
                    class="btn btn--primary btn--lg"
                    href=WHATSAPP_URL
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    "Agendar Meu Diagnóstico Gratuito"
                </a>
                <p class="cta__note">"Reunião gratuita de 20 minutos, direto no WhatsApp."</p>
            </div>
        </section>
    }
}
