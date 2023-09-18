# CookeaseWebApp
![Picture1](https://github.com/OysteinKvilhaugsvik/Cookease_Frontend/assets/54100417/021b5378-61bf-407a-a57d-864404128ad8)
![Picture2](https://github.com/OysteinKvilhaugsvik/Cookease_Frontend/assets/54100417/87b256aa-23fe-4998-84a1-0b02de1b5ae7)
![Picture3](https://github.com/OysteinKvilhaugsvik/Cookease_Frontend/assets/54100417/f3dc8765-9a69-4a17-9ce1-f6fba1d598ff)
![Picture4](https://github.com/OysteinKvilhaugsvik/Cookease_Frontend/assets/54100417/37add0b2-9942-49c8-b7ae-81c4fcdaf9cb)
![Picture5](https://github.com/OysteinKvilhaugsvik/Cookease_Frontend/assets/54100417/e99412ac-8307-497b-99f8-3aae14f8355b)



This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
