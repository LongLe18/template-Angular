# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0 - node v18.18.0.

<!-- ## project structure
```python
src
├── assets # includes icons and js file
│   ├── icons
│   ├── js # external js and directory for translation (vi, en, ...)
├── app
│   ├── components
│   │   ├── main components # defining the components to use in pages folder
│   │   ├── shared # defining components to reuse main components
│   │   ├── .....
│   ├── constants # 
│   │   ├── constant # defining the components to use in pages folder
│   │   ├── enum # defining components to reuse main components
│   │   ├── types # like models to define class data
│   ├── interceptors # Most interceptors transform the outgoing request 
│   ├── layouts # main layout 
│   ├── pages # to define main pages 
│   ├── pipes
│   ├── services
│   ├── utils # common function
│   ├── app-navigation.ts # define route to show sidebar of main pages
│   ├── app-routing.module.ts # all of route of project 
│   ├── app.component.ts
│   ├── app.module.ts
├── environments # config API_URL -->
```

<!-- ### Detail Description 

| Configuration topic | File path | Description |
|:-------------:|:-----------:|:-----------:|
| `directory translation` |	src/assets/js/localization | `add json file language for translate (example: https://github.com/DevExpress/DevExtreme/tree/23_1/js/localization/messages)` |
|  `environments` | src/environments | `includes: API_URL, mode. Only change API_URL` | 
| `components` | src/commonLib/components | `to define the components to build main pages` | 
| `constants` | src/commonLib/constants | `some constants of project (not have API_URL) include: constant, enum, model` |
| `interceptors` | src/commonLib/interceptors | `` | 
| `layouts` | src/commonLib/layouts | `to store main layouts project` | 
| `pages` | src/commonLib/pages | `includes main pages: dashboard, auth, ...` |
| `pipes` | src/commonLib/pipes |  `defining pipe of project: transorm data in UI` | 
| `services` | src/commonLib/services | `all of services project: when one service call external API can build like data.service sample` |
| `common function ` | src/commonLib/utils | `define common function in there` |  
| `route` | src/app/app-routing.module.ts | `all of route of project ` |  -->

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


