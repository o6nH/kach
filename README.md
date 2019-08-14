# Grace Shopper Setup
## KaCH Team
Katherine, Conner, Hugo

## Purpose
Grace Shopper is an e-commerce application created by a group of developers looking to:

1) improve their communication skills via git commits, documentation, GitHub issues/pull-requests, Slack channels, etc. 
2) review full-stack concepts. 

## Products/Theme
[KaCH](#kach-team) have selected a **THEMELESS** marketplace that sells **dinguses**.

# Babel, React, and Webpack
[Babel](https://babeljs.io/setup#installation) is [loaded](webpack.config.js#L21) via [Webpack](https://webpack.js.org/concepts/#loaders) to transpile and bundle [React](https://reactjs.org/docs/hello-world.html) code written in the **client** folder. The [entry point](https://webpack.js.org/concepts/#entry) 
 for Webpack will be [client/index.js](client/index.js) and its bundled [output](https://webpack.js.org/concepts/#output) will be *public/bundle.js* (which is ignored by the [.gitignore](.gitignore) file).

 ## React to the Public HTML Root
 The static [public/index.html](public/index.html#L5) imports the bundled script, allowing [ReactDOM](https://reactjs.org/docs/react-dom.html) to replace the [#root div](public/index.html#L9) with renderings of [React components](https://reactjs.org/docs/react-api.html#components).

 # Dependencies and Scripts
 [<abbr title='Node Package Manager'>NPM</abbr>](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)'s [package.json](package.json) should include all necessary [dependencies](package.json#L36) for both development and production environments as well as some of the [scripts](package.json#L6) that run commands on their respective terminals. 
 
 To install dependencies, run:
 ```bash
npm install
 ```

 To build the Webpack bundle during development, run:
 ```bash
npm run webpack-watch
 ```
 
 To have the [Express]() server listen during development, run:
```bash
npm run start-watch
```

To run both of the previous commands simultaneously on a terminal that supports *background processes* with the *ampersand* operator (`&`): 
```bash
npm run start:dev
```
