use crate::content::WHATSAPP_URL;
use leptos::prelude::*;

#[component]
pub fn Footer() -> impl IntoView {
    view! {
        <footer class="footer">
            <div class="container footer__inner">
                <p class="footer__brand">"Gaspar"</p>
                <p class="footer__line">
                    "Engenharia digital de resultado para empresas consolidadas."
                </p>
                <a
                    class="footer__link"
                    href=WHATSAPP_URL
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    "WhatsApp +55 15 99818-2559"
                </a>
            </div>
        </footer>
    }
}
