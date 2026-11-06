use leptos::prelude::*;

#[component]
pub fn PainPoints() -> impl IntoView {
    view! {
        <section id="gargalos" class="section">
            <div class="container">
                <p class="section__kicker">"Os gargalos de uma empresa offline"</p>
                <h2 class="section__title">
                    "O perigo oculto de ignorar a maturidade digital do seu negócio"
                </h2>
                <ul class="grid-3">
                    <li class="card">
                        <h3 class="card__title">"Site antigo que espanta clientes"</h3>
                        <p class="card__body">
                            "Sua marca é premium no mundo físico, mas quem acessa o seu site pelo celular encontra uma página lenta, desatualizada e que não gera novos contatos comerciais."
                        </p>
                    </li>
                    <li class="card">
                        <h3 class="card__title">"Processos manuais engessados"</h3>
                        <p class="card__body">
                            "Sua equipe ainda perde tempo valioso preenchendo planilhas soltas ou copiando dados de forma manual porque os sistemas antigos da empresa não conversam entre si."
                        </p>
                    </li>
                    <li class="card">
                        <h3 class="card__title">"Falta de rastreamento comercial"</h3>
                        <p class="card__body">
                            "Você investe em anúncios ou marketing, mas não tem um painel claro que mostre de onde vêm os seus clientes mais lucrativos e onde o orçamento está sendo desperdiçado."
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    }
}
