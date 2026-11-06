use leptos::prelude::*;

const PERIODS: [&str; 3] = ["Hoje", "Últimos 7 dias", "Últimos 30 dias"];

// Dados sintéticos. Rótulo visível de demonstração é obrigatório —
// nenhum número pertence a clientes reais (ver PRODUCT.md).
const METRIC_LABELS: [&str; 4] = [
    "Visitas no site",
    "Leads captados",
    "Conversas no WhatsApp",
    "Horas operacionais poupadas",
];

const METRIC_VALUES: [[&str; 3]; 4] = [
    ["214", "1.486", "6.320"],
    ["19", "117", "470"],
    ["11", "64", "261"],
    ["3,5h", "21h", "84h"],
];

const METRIC_DELTAS: [[&str; 3]; 4] = [
    ["—", "+12% vs. anterior", "+9% vs. anterior"],
    ["—", "+8% vs. anterior", "+15% vs. anterior"],
    ["—", "+10% vs. anterior", "+6% vs. anterior"],
    ["—", "fluxo automático ativo", "fluxo automático ativo"],
];

const CHANNELS: [&str; 5] = ["Google", "Instagram", "Indicação", "Direct", "WhatsApp"];

const CHANNEL_HEIGHTS: [[u32; 5]; 3] = [
    [82, 58, 34, 22, 66],
    [78, 52, 40, 18, 70],
    [84, 56, 32, 20, 62],
];

#[component]
pub fn MetricsDemo() -> impl IntoView {
    let period = RwSignal::new(0usize);

    view! {
        <section id="painel" class="section">
            <div class="container">
                <p class="section__kicker">"Demonstração ilustrativa"</p>
                <h2 class="section__title">"Painel de Métricas Operacionais"</h2>
                <p class="section__note">
                    "Dados sintéticos, apenas para mostrar o tipo de visão que o seu painel entrega. Nenhum número aqui pertence a clientes reais."
                </p>

                <div class="panel" role="region" aria-label="Demonstração do painel de métricas">
                    <div
                        class="panel__toolbar"
                        role="group"
                        aria-label="Selecionar período dos dados"
                    >
                        {move || (0..3usize)
                            .map(move |i| {
                                view! {
                                    <button
                                        type="button"
                                        class="chip"
                                        class:is-active=move || period.get() == i
                                        aria-pressed=move || if period.get() == i { "true" } else { "false" }
                                        on:click=move |_| period.set(i)
                                    >
                                        {PERIODS[i]}
                                    </button>
                                }
                            })
                            .collect::<Vec<_>>()}
                    </div>

                    <p class="panel__summary" aria-live="polite">
                        {move || format!("Período: {}", PERIODS[period.get()])}
                    </p>

                    <ul class="panel__cards">
                        {move || (0..4usize)
                            .map(move |i| {
                                view! {
                                    <li class="metric">
                                        <span class="metric__label">{METRIC_LABELS[i]}</span>
                                        <span class="metric__value">
                                            {move || METRIC_VALUES[i][period.get()]}
                                        </span>
                                        <span class="metric__delta">
                                            {move || METRIC_DELTAS[i][period.get()]}
                                        </span>
                                    </li>
                                }
                            })
                            .collect::<Vec<_>>()}
                    </ul>

                    <svg
                        class="panel__chart"
                        viewBox="0 0 520 160"
                        role="img"
                        aria-label="Origem dos clientes por canal de aquisição, dados sintéticos"
                    >
                        {move || (0..5usize)
                            .map(move |i| {
                                let h = (CHANNEL_HEIGHTS[period.get()][i] as f64) * 0.95;
                                let x = (12 + i * 104) as f64;
                                let y = 140.0 - h;
                                let cx = x + 28.0;
                                view! {
                                    <rect
                                        x=x
                                        y=y
                                        width="56"
                                        height=h
                                        rx="4"
                                        class="panel__bar"
                                    />
                                    <text
                                        x=cx
                                        y="156"
                                        text-anchor="middle"
                                        class="panel__bar-label"
                                    >
                                        {CHANNELS[i]}
                                    </text>
                                }
                            })
                            .collect::<Vec<_>>()}
                    </svg>
                </div>
            </div>
        </section>
    }
}
