## Introduction

Base domain under test: https://reqres.in/

Testcase list: [github issues](https://github.com/thanhlelgg/e2e-regres-tests/issues?q=is%3Aissue+is%3Aclosed)

This project employs `Typescript`, `mocha` as test runner, `Allure` as reporter and `axios` as the base tool to execute API requests

`mocha` and `axios` is a very powerful combination when it comes to API testing, it's fast, lightweight and very easy to setup and use.  
I chose `typescript` over `javascript` also because it's easier to use for me, and everyone else who familiar with Object-oriented programming languages like Java, C#...  
`allure` is one of the most popular and powerful reporter out there so it's also a safe choice.

## Project Structure

The code structure is basically based on `Page Object Model` pattern, but instead of UI page, we use one class for each API route instead.

```
├── example                         Project name
│ ├── actions                       all action methods
│ │ ├── api-requests                contains all api requests
│ │ ├── CommonActions.ts            common actions and/or scenarios, api requests chains...
│ ├── base                          all base class for running test and setup axios api
│ ├── common                        helper methods, commomn variables, config file, decorator...
│ ├── model                         business models
│ ├── resource                      test data and schemas for verification
│ ├── test                          test scenarios
├── src                             shared lib, TBD
├── .mocharc.json                   mocha configs
├── reporterConfig.json             report configs
```

## Codestyle

Install and enable Eslint for your prefered IDE

```
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "typescriptreact"]
```

## Prerequisites

- `nodejs` latest version installed

## How to install and run

Install dependencies:  
`npm install`

Build and run all tests in `test` folder:  
`npm run test`

Open report:  
`npm run allure-report`

## Technical debts

Currently, we can't run this project in parallel, the main reason is parallel execution implemeted by mocha development team doesn't work well with allure team, and they are still working on a solution. Details can be found in [here](https://www.npmjs.com/package/allure-decorators?activeTab=readme) or [here](https://github.com/sskorol/mocha-allure2-example/issues/16).  
If we want to execute test in parallel, we have to switch to another reporter (like Mochawesome), which isn't quite as powerful and not as much convenient for debugging. So for a few seconds saved trade off, I still prefer to use the Allure reporter. If the parallel requirement is a must, we can switch back anytime.
