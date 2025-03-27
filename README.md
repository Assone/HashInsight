# HashInsight

HashInsight is a high-performance hash checker application built on React. It uses WASM to achieve high performance, and your files are never uploaded to the server side. It is designed for use in secure and private environments, ensuring that your data remains confidential and protected at all times.

## Features

- **Fast Hash Calculation**: Utilizes WebAssembly (WASM) for ultra-fast hash calculations.
- **Secure File Handling**: Ensures that files are processed locally without ever being uploaded to the server.

## Environment

You need to have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/en/download/). Make sure you have the latest version of pnpm installed. If you don't have pnpm installed, you can install it by running `npm install -g pnpm`.

At the same time, you also need to install the environment of Rust. You can download it from [here](https://www.rust-lang.org/tools/install). And make sure you have the latest version of [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/).

## Usage

- Clone the repository: `git clone https://github.com/Assone/HashInsight.git`
- Install dependencies: `pnpm install`
- Build the WASM module(in calculation folder): `wasm-pack build --target web`
- Start the development server: `pnpm dev`

## Contributing

- Fork the repository
- Create a new branch: `git checkout -b feature/your-feature`
- Make your changes and commit them: `git commit -m 'Add your feature'`
- Push to the branch: `git push origin feature/your-feature`
- Submit a pull request

## Acknowledgments

- Thanks to the React community for their support and contributions.
