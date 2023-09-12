# PokemonApp

This responsive app shows a list of all pokemons and most relevant information on each of them. Nicely designed an coded.
This app is uses https://pokeapi.co/docs/v2 as data source.

## Demo

You can check the site deployed in here: http://pokemon-app.cesarvereau.com/
Don't forget to try it on you phone!

## Technologies

- Angular 15
- Ngrx 
- rxjs (advanced)
- Scss (flexbox and css-grid) BEM Methodology used, Responsive design.
- ngx-toastr

## Components

### Topbar Navigation

A responsive and fixed topbar menu to access the pokemons section and a credits page.
### Pokemon List

A list of all pokemons with gmail-like pagination (30 pokemons per page) and responsive cards built with css-grid. You can click on any pokemon you like to access the pokemon details page.

### Pokemon Details

A page for showing most relevant details on a selected pokemon, including types and evolutions. You can navigate into a specific evolution from the details page, and also navigate back to the pokemon list page without losing the state.

## Utilities

The following component utilities were made from scratch without any external libraries:

- Reponsive menu
- loading animation
- Pokemon Type tooltip
- Pokemon Details Card

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running linting

Run `ng lint` to run the linter.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
