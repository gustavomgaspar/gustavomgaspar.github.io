use crate::content::WHATSAPP_URL;
use leptos::prelude::*;

#[component]
pub fn Header() -> impl IntoView {
    view! {
        <header class="header">
            <div class="container header__inner">
                <a class="header__brand" href="/">
                    "Gaspar"
                    <span class="header__tagline">"Engenharia digital"</span>
                </a>
                <a
                    class="btn btn--ghost"
                    href=WHATSAPP_URL
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir conversa no WhatsApp com o Gaspar"
                >
                    "Falar com o Gaspar"
                </a>
            </div>
        </header>
    }
}
