# Barbarians! v1.3

![Game Gif Image](https://github.com/W01fw00d/barbarians/blob/master/src/images/gifs/barbarians_demo.gif)

A little web-browser turn-based strategy game.

[[Play Game]](https://w01fw00d.itch.io/barbarians)

# Includes:

<div align="center">
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/javascript.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/jquery.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/bootstrap.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/jasmine.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/cypress.svg"/>
</div>

# How to play

Just open the `index.html` file with your browser of choice 👍

## Features details:

- Hover a unit to display a tooltip with extra information
- You can drag and drop a Roman soldier to move it, or just select it and then click where do you want to move it

# Url Params (cheat codes):

- Choose the map/level: `index.html?level=2`
  (1 - 10 are used for the main campaign, 0 and 11 - XX are used for testing)
- Mute the story narration on startup: `index.html?muteNarration`
- Disable animations on startup: `index.html?disableAnimations`
- Disable modals (pop-ups) on startup: `index.html?disableModals`

Example (useful for manual testing):

```
index.html?level=12&muteNarration&disableAnimations&disableModals
```

# How to test

To launch the Jasmine unit tests, just open `SpecRunner.html` (please check that all tests are green before launching a pull request 😀).

- Note: some Jasmine tests are currently disabled after a refactor.
- Note 2: Cypress runs the jasmine tests in one of its specs.

* Launch Cypress (Functional Tests)

```
npm run f-test
```

Launch with ui

```
npm run f-test-ui
```

- This project code has been formatted by default prettier

# Contributors:

[How to contribute](https://github.com/MarcDiethelm/contributing/blob/master/README.md)

- Art

[@gelabert.art](https://www.instagram.com/gelabert.art/)

[@W01fw00d](https://github.com/W01fw00d)

- Programming

[@tattarrattat](https://github.com/tattarrattat)

[@dakotahavel](https://github.com/dakotahavel)

[@ccmetz](https://github.com/ccmetz)

[@MHase](https://github.com/MHase)

[@W01fw00d](https://github.com/W01fw00d)

- Game design

[@W01fw00d](https://github.com/W01fw00d)

Thanks everyone! 😉
