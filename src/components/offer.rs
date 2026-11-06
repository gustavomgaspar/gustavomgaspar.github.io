use leptos::prelude::*;

#[component]
pub fn Offer() -> impl IntoView {
    view! {
        <section id="oferta" class="section section--alt">
            <div class="container">
                <p class="section__kicker">"A oferta estruturada"</p>
                <h2 class="section__title">
                    "Infraestrutura digital completa e pronta para escalar"
                </h2>
                <ol class="offer__list">
                    <li class="offer__item">
                        <span class="offer__num" aria-hidden="true">"01"</span>
                        <div class="offer__content">
                            <h3 class="offer__name">"Desenvolvimento web de alta performance"</h3>
                            <p class="offer__body">
                                "Reformulação completa do seu site ou portal. Páginas rápidas, seguras, otimizadas para o Google e desenhadas puramente para conversão comercial."
                            </p>
                        </div>
                    </li>
                    <li class="offer__item">
                        <span class="offer__num" aria-hidden="true">"02"</span>
                        <div class="offer__content">
                            <h3 class="offer__name">"Integração de sistemas (CRM e ERP)"</h3>
                            <p class="offer__body">
                                "Conexão inteligente de todas as suas ferramentas existentes para que os dados fluam sozinhos — do clique no site ao faturamento no seu sistema de gestão."
                            </p>
                        </div>
                    </li>
                    <li class="offer__item">
                        <span class="offer__num" aria-hidden="true">"03"</span>
                        <div class="offer__content">
                            <h3 class="offer__name">"Automação de atendimento e vendas"</h3>
                            <p class="offer__body">
                                "Implementação de fluxos automatizados que qualificam os contatos e direcionam os melhores potenciais clientes direto para o WhatsApp do seu time comercial."
                            </p>
                        </div>
                    </li>
                    <li class="offer__item">
                        <span class="offer__num" aria-hidden="true">"04"</span>
                        <div class="offer__content">
                            <h3 class="offer__name">"Painel de métricas operacionais"</h3>
                            <p class="offer__body">
                                "Um dashboard executivo sob medida para você acompanhar o crescimento digital do seu negócio de forma visual e simples."
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
    }
}
