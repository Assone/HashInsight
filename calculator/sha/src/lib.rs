mod utils;

use sha2::Digest;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate_sha1(input_bytes: &[u8]) -> String {
    let digest = sha1::Sha1::digest(input_bytes);

    format!("{:x}", digest)
}

#[wasm_bindgen]
pub fn calculate_sha256(input_bytes: &[u8]) -> String {
    let digest = sha2::Sha256::digest(input_bytes);

    format!("{:x}", digest)
}

#[wasm_bindgen]
pub fn calculate_sha384(input_bytes: &[u8]) -> String {
    let digest = sha2::Sha384::digest(input_bytes);

    format!("{:x}", digest)
}

#[wasm_bindgen]
pub fn calculate_sha512(input_bytes: &[u8]) -> String {
    let digest = sha2::Sha512::digest(input_bytes);

    format!("{:x}", digest)
}
