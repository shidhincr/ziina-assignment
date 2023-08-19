# Ziina Assignment Solution

## About

This repo contains the solution for the Ziina interview task. It's built using Svelte, Typescript, and Node, with unit tests implemented in Vitest.

## Prerequisites

1. **Typescript**: This project is written in Typescript, a strict syntactical superset of JavaScript. Make sure you are familiar with Typescript before jumping onto the code.
2. **Node.js**: Node.js is required for installing and managing the project's dependencies. 
3. **PNPM**: This project uses PNPM for installing node modules. However, you are free to use Yarn or NPM if you prefer.

## Getting Started

### Setting up the project

1. **Clone the repository**:

   ```
   git clone git@github.com:shidhincr/ziina-assignment.git
   cd ziina-assignment
   ```

2. **Install the dependencies**:

   Using PNPM:

   ```
   pnpm install
   ```

   Alternatively, you can use Yarn or NPM:

   ```
   yarn install
   # OR
   npm install
   ```

### Development Workflow

1. **Start the development server**:

   ```
   pnpm dev
   ```

   This will start the development server at [http://localhost:5173](http://localhost:5173).

2. **Build for production**:

   To generate the production build, run the following command:

   ```
   pnpm build
   ```

   This will create a `dist` folder in your project directory containing the optimized production build. This can be previewed using `pnpm preview`.

3. **Run unit tests**:

   To execute the unit tests, use the following command:

   ```
   pnpm test
   ```

   This will run the Vitest suite and display the test results in your terminal.

## Live Demo

The project is hosted on Vercel, a cloud platform for static sites and Serverless Functions. You can access the live demo [here](https://ziina-assignment.vercel.app/).

## Technologies Used

- [Svelte](https://svelte.dev/) - A component framework for building user interfaces.
- [Typescript](https://www.typescriptlang.org/) - A strict syntactical superset of JavaScript.
- [Vitejs](https://vitejs.dev/) - A build tool that aims to provide a faster and leaner development experience.
- [Vitest](https://github.com/vitest-dev/vitest) - A test runner for Vite projects.
- [Vercel](https://vercel.com/) - A cloud platform for static sites and Serverless Functions.

## Contribution

If you'd like to contribute to this repo, please create a pull request with your changes or contact the repository owner.

## Author

Shidhin CR

