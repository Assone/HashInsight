mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate(input_bytes: &[u8]) -> String {
    let digest = md5::compute(input_bytes);

    format!("{:x}", digest)
}
