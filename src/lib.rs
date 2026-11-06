// Views Leptos geram tipos profundamente aninhados; em release (LTO) o
// solver estoura o limite padrão de 128.
#![recursion_limit = "256"]

pub mod app;
pub mod components;
pub mod content;

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();

    use crate::app::App;

    leptos::mount::hydrate_body(App);
}
