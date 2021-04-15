# Modusbox UI Components

A collection of reusable React components and some Redux / JS utilities.

- [Usage](#usage)
- [Components](#components)
- [Prerequisites](#prerequisites)
- [Scripts](#scripts)
- [Versioning](#versioning)
- [Publishing](#publishing)

## Usage 

Install this library in your React project use command `yarn add @modusbox/modusbox-ui-components`.

You can import the components in your project as follows: 
```javascript
// The CSS file only needs to be imported once
import '@modusbox/modusbox-ui-components/dist/react/components/index.css';
import { Button } from '@modusbox/modusbox-ui-components/dist/react/components/index';
```

## Components

The library exports a number of components.

Almost each component has a README file describing the prop types.

There are 2 different playgrounds to use to inspect and play with the components:
 - the _embedded_ playground: [see how to run](#run).
 - the _Storybook_ playground: [see how to run](#storybook).

## Prerequisites

It requires `node v12` to run; please make sure to have the correct version installed.

It is suggested to use [nvm](https://github.com/nvm-sh/nvm) to easily install and manage multiple node versions.

## Scripts

### Install
Install all the dependencies 
```bash
yarn install
```

### Run 
Starts the webpack-dev-server with hot reloading capabilities in development mode.

It uses the `webpack.dev.config.js` config file.

```bash
yarn start
```
Open the browser at the specified address [http://localhost:9090](http://localhost:9090)

### Build
Builds the bundle artifact with webpack.

It uses the `webpack.config.js` config file.

```bash
yarn build
```

### Prettier
Runs prettier on the codebase.

```bash
yarn prettier
```

### ESLint
Lints on the codebase.

```bash
yarn lint
```

### Test
Runs Jest tests.

```bash
yarn test
```

### Storybook
Runs the Storybook playground.

```bash
yarn storybook
```

## Versioning

It's important to create a unique version for every PR.

Versions are used to deploy the correct articafts online.

**Note:** Forgetting to create a version will cause the previous build artifacts to be overridden.

Creating a new version is done with `yarn version`, make sure to do the correct incremental update.

Versions need to be pushed to the repo with `git push --tags`


## Publishing

Artifacts are automatically saved as a zip library with the AWS CI setup for this project.

To publish as a npm module, run the following command `npm publish --access public`.

A new release will be published at [https://www.npmjs.com/package/@modusbox/modusbox-ui-components](https://www.npmjs.com/package/@modusbox/modusbox-ui-components)

**Note:** you need to be logged in the _modusbox_ organization in npm, credentials can be found in _1Password_.
