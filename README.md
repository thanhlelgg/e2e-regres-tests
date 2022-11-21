## Introduction

Base domain under test: https://reqres.in/

This project employs `Typescript`, `mocha` as test runner, `Allure` as reporter and `axios` as the base tool to execute API requests

Testcase list: https://github.com/thanhlelgg/e2e-regres-tests/issues?q=is%3Aissue+is%3Aclosed

## Project Structure

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

Install and enable Eslint

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

Currently, we can't run this project in parallel, the main reason is parallel execution implemeted by mocha development team doesn't work well with allure team, and they are still working on a solution. Details can be found in [here](https://www.npmjs.com/package/allure-decorators?activeTab=readme) and [here](https://github.com/sskorol/mocha-allure2-example/issues/16).  
If we want to execute test in parallel, we have to switch to another reporter (like Mochawesome), which isn't quite as powerful and verify inconvenient for debugging. So for a few seconds saved tradeback, I still prefer to use the Allure reporter. If the parallel requirement is a must, we can switch back anytime.
