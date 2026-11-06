use leptos::prelude::*;

#[component]
pub fn WhyGaspar() -> impl IntoView {
    view! {
        <section id="por-que-gaspar" class="section">
            <div class="container">
                <p class="section__kicker">"Quebra de objeções"</p>
                <h2 class="section__title">"Por que essa é a escolha mais segura?"</h2>
                <p class="lead">
                    "Eu não vendo \"tecnologia pela tecnologia\". Eu desenvolvo a engenharia digital necessária para sustentar, proteger e expandir o faturamento que sua empresa já possui."
                </p>
                <p class="lead lead--muted">
                    "Centralizar essa modernização com um desenvolvedor Full-Stack experiente elimina o custo astronômico de contratar consultorias corporativas infladas e garante entregas rápidas, focadas puramente no retorno sobre o investimento (ROI)."
                </p>
                <ul class="pills">
                    <li class="pill">"Foco em ROI"</li>
                    <li class="pill">"Entregas rápidas"</li>
                    <li class="pill">"Um único executor Full-Stack"</li>
                </ul>
            </div>
        </section>
    }
}
