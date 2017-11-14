# :bike: SkyBikes :bike:
Bicycle rental program prototype

**Live [demo](https://skybikes.jeanloup.me/)**

![circle ci passing](https://circleci.com/gh/Malivuk/sky-bikes.svg?style=shield&circle-token=2f8aa2cdabc83b4b39fb99eb3e46bf812ab74c85)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## :information_desk_person: Project

### Requirements
* Node 7.1.0 or above
* NPM 3.10.9 or above
* Chrome (latest) `||` Firefox (latest) `||` Edge (latest)

### Key concepts
* Modern JS [workflow](http://ccoenraets.github.io/es6-tutorial/) (ES6, babel, webpack)
* Component-based [architecture](https://medium.com/@dan.shapiro1210/understanding-component-based-architecture-3ff48ec0c238)
* Progressive Wep App ([PWA](https://developers.google.com/web/progressive-web-apps/))
* Automated test and continuous integration ([circleci](https://circleci.com/))
* Minimizing amount of NPM dependencies

### Strcuture
* `./src/components`: files for each component (JS, CSS, tests)
* `./src/common`: pure functions to import in components
* `./public`: various static assets (images, datasets...)

### Model
The data relies on two different browser APIs:
* [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), for data that needs to persist (i.e., stations and bikes)
* [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), for ephemeral data (i.e., user session)

Both grant offline support, which is good for prototyping and live demos. Moving from that solution to another, does not imply a lot of code refactoring.

### Scripts
```shell
# Install required depedencies
npm install

# Start the development server
npm start

# Run tests manually
npm run test

# Build production version
npm run build
```

### Usage
From the home screen, you can either register or login. On the main screen (stations), you can click on a *bike* to start renting it. Return it by clicking on a *parking* case or you will be banned and logged out.

When loggin as a *sys admin*, you can see the list of all the users. If you logged in as a *worker*, you have the option to sort the bikes in the default order (reset `stations` and `members` object). Note that both roles can rent bikes but they can't be banned.

Whenever you log into the app, a session will start and remain active for **the current tab** only. Other data (users, stations) remain accessible across the tabs. It allows you to simulate many connections within a single browser window.

You can try the following cases (accounts) out of the box:
* *regular user*: `normal@user.com`
* *banned user*: `banned@user.com`
* *sys admin*: `admin@sb.com`
* *worker*: `staff@sb.co`

### Possible improvements
* Make countdown persistent against page refresh
* find a way to kill all sessions with `cleanBikes()`, to avoid conflicts
* Prevent multi-accounting (allowed by `sessionStorage`'s nature)
* Write better tests and extend their coverage
* Give each member a unique ID
* Implement a custom [JSX-like](https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff) solution
* Implement a custom data-binding solution
* Implement a custom routing solution
* consider server-side rendering for SEO purposes
* Handle user input on server-side


## :memo: Dev log

*`1 hour` is the lowest time unit I decided to attribute to a given task. Even if a task looks simple, it's pretty common to spend extra time reading docs or working on another task in parallel.*

### Draft on paper - 1h
I started by drawing a rough representation of the model its interactions with the view, based on the stories. I usually try to forecast all connections and dependencies to isolate as global methods as possible. Then, I'm transforming methods into tasks and I evaluate their complexity.

### Defining the stack - 1h
* [ES6](https://github.com/lukehoban/es6features) JS
* [Webpack](https://webpack.github.io/) (module bundler)
* [NPM](https://www.npmjs.com/) (package manager)
* [ESLint](https://eslint.org/) (linter)
* [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) & [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) APIs
* [Atom](https://atom.io/) (text editor)
* [GitHub](https://github.com/Malivuk/sky-bikes) (version control)
* [GitKraken](https://www.gitkraken.com/) (Git GUI client)
* [Circleci](https://circleci.com/) (running unit testing on PR)

*While benchmarking data storage solutions, I came across Firebase, AWS or even PouchDB. However, I realized that using the default `browser API` offers more flexibility (no need for a stable internet connection) and scalability (easy to interchange). It also reduces learning curve for anyone involved in the project.*

*`ESLint` is the kind of tool that helps teams to follow a guideline while writing code. It also helps reducing mistakes, by raising live error message in your text editor. I arbitrarily chose the standard mode but it could (should) be defined at the team level.*

### Project scaffolding - 1h
* NPM dependencies installation
* Webpack configuration (modules, plugins...)
* Writing custom NPM scripts
* GitHub repository & circleci setup
* ESLint setup
* Generate basic folder architecture (components-based)
* Write a documentation mockup
* Generate dummy static files to test webpack configuration
* Write dummy test to check circleci integration
* Make dummy calls to the model

### Development - 8h
* Creating responsive and interactive components
* Binding data to views and handling updates
* Writing tests
* Writing docs
* Cleaning, refactoring, rewriting...

### Hosting prod version - 1h
* Create a new s3 bucket (AWS)
* Issue a new SSL certificate (Certificate Manager)
* Set up a CloudFront distribution
* Bind the distribution to a subdomain (Route 53)
* Create an update script with the S3 SDK and IAM credentials

### Front end optimization - 1h
* Add PWA features (icons, theme, launcher, banner support...)
* Add appropriate meta and OG tags
* Add proper fonts
* Optimize responsive layout

### QA - 1h
* Test stories on main browsers, devices and OS
* Test scripts on new environment

### Total - 14h

### Last words
The project was challenging considering the timeline and my full time job. However, I found it interesting and I learned new things through the technical limitations (i.e., no front end framework).
