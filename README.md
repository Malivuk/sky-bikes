# SkyBikes
Bicycle rental program prototype :bike:

![circle ci passing](https://circleci.com/gh/Malivuk/sky-bikes.svg?style=shield&circle-token=2f8aa2cdabc83b4b39fb99eb3e46bf812ab74c85)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


## Installation
s
### Requirements
* node
* browser scope
* local storage
* session storage

### Scripts
todo

## Structure

### View
todo

### Model
todo

## Improvements

### Routing

### Server-side verification

### Data-binding

### JSX
[post](https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff)

## My approach (dev log)

### Analysis and paper draft - 1h
I'm first working on a white paper, writing and drawing a rough representation of the model and its interactions, based on the stories.

#### OOP
First implementation of the problem as a `is-a` relationship.

#### FP
Rethink the model as a `has-a` relationship.

#### Tools & stack
* Plain JavaScript + Babel (transpiling ES6 to ES5)
* Webpack (module bundler)
* NPM (package manager)
* ESLint (linting utility)
* Firebase (cloud solution)
* Atom (text editor)
* GitHub & GitKraken (code versioning)
* Circleci (running unit testing on PR)

*While benchmarking DB solutions, AWS or PouchDB seemed like good alternatives to `Firebase`. However, it offers great features (offline syncing, easy authentication, https, shared state) and a lower learning curve, in a very handy way.*

*`ESLint` allows a team to follow the same guidelines while writing code. It also reduces mistakes when coupled with a text editor such as Atom, that will trigger live warnings. I arbitrarily chose the `standard` mode but it could (should) be customized according to the team's preferences.*

### Project scaffolding - 1h
Project setup covers the following scope:
* Webpack configuration (ES6, HRM...)
* Node modules installation
* Writing custom NPM scripts
* GitHub repository & circleci setup
* ESLint setup
* Folder architecture (components-based) & basic documentation
* Cloud setup (CDN, DB) and dummy call to DB
* Dummy static files to test webpack configuration and circleci integration

*From my experience, that part is often underestimated but it will impact the project on the long run. However, for the sake of simplicity (prototyping), I didn't spend too much time on it.*
