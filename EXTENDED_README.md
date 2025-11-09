# Examenproject

> Zachary Van De Staey - IAO3

Het examenproject omvat een React implementatie voor een 'domotica'-applicatie. In mijn uitwerking van de applicatie
wordt
uitgegaan van thuis-gebruikers.

## Wireframes and usability tests

Binnen de [folder](/wireframes-usability-tests) vind je enkele bestanden

- [moodboard](#moodboard)
- [wireframes](#wireframes) per formaat (desktop, tablet, phone) te zien aan de suffix van dit bestand.

### Moodboard

Voorafgaand aan het maken van de wireframes maakte ik een moodboard met inspiratie.
Dit moodboard bevat foto's van de gevonden inspiratie waarop geklikt kan worden om de bron te zien.

Ook zijn er 2 pagina's met AI gegenereerde concepten, hierbij zijn prompts en mijn bedenkingen t.o.v. het gegenereerde
bestand
te vinden.

### Wireframes

Hier vind je de wireframes voor mijn schermen.
Sommige wireframes. bv.( Devices -> Devices > keuken licht op phone formaat)
beschrijft dezelfde pagina maar in een andere state)

### Belangrijke components?

Binnen de [svg folder](/src/components/svg) vind je react componenten die 'zeer groot' lijken.

Echter zijn dit niet zomaar react componenten! Het gaat hier om svg bestanden die door middel
van [svg to react converter](https://react-svgr.com/playground/).

Dit pas ik toe op deze manier zodat ik d.m.v. de [animation library](#Dependencies) geanimeerd kon worden.

> Good to know? Het betrefende svg bestand is mee opgeleverd in assets/svg en heeft altijd een gelijkaaridge naam.

> bv. 'welcome.svg' = '/components/sg/WelcomeSvgComponent.tsx'

## 🚀 How to run?

1. **Clone the repository**

```bash
 git clone https://gitlab.com/kdg-ti/user-interfaces-3/25-26/students/ti/van-de-staey-zachary/exam.git
```

2. **Open het document in een IDE naar keuze**
   Voorbeeld voor VSCODE.

```bash
 cd exam
 code .
```

3. **Installeer [dependencies](#dependencies)**

```bash
npm install
```

4. **Het opstarten van de mock backend**

```bash
npm run backend-mock
```

5. **Het lokaal opstarten van de projectcode**

> Let op! Het react project verwacht dat de backend simultaan draait met het project.
> Voer dit commando dus uit in een andere terminal.

```bash
npm run dev
```

### Dependencies

| Dependency           | Description                                                                                        | Documentation/help links                                                              |
|----------------------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| React                | The front end 'framework' used.                                                                    | [react docs](https://react.dev/reference/react)                                       |
| React Query          | Provides an async cache for react for a performance gain                                           | [Rquery docs](https://tanstack.com/query/latest/docs/framework/react/overview)        |
| React router         | Provides front-end routing for React                                                               | [React Router Docs](https://reactrouter.com/home)                                     |
| Axios                | A better HTTP client like the build in fetch                                                       | [Axios docs](https://axios-http.com/docs/intro)                                       |
| React hook form      | A react library for working with Forms in an easier manner.                                        | [React hook form docs](https://react-hook-form.com/)                                  |
| zod                  | A schema based validator used for our forms with useForms                                          | [Zod docs](https://zod.dev/)                                                          |
| MUI                  | A component framework for React with the google feel.                                              | [MUI docs](https://mui.com/material-ui/getting-started/)                              |
| mui/icons-material   | Provides a lot of icons to be used in our MUI ui.                                                  | [mui icons list](https://mui.com/material-ui/material-icons/)                         |
| react-zoom-pan-pinch | This provides a zoom-pan-pinch control wrapper for regular React components.                       | [react zoom pan pinch npm pagina](https://www.npmjs.com/package/react-zoom-pan-pinch) |
| motion               | An animation library build for react.                                                              | [motion](https://motion.dev/docs/react)                                               |
| React compiler       | Compilar which introduces memoization into React components.                                       | [react compiler docs](https://react.dev/learn/react-compiler)                         |
| Zustand              | State management solution. (Used for keeping track of heavily changing global states)              | [zustand docs](https://zustand.docs.pmnd.rs/getting-started/introduction)             |
| DayJs                | A small library which parses/validates/manipulates and displays dates and times.                   | [day-js](https://day.js.org/en/)                                                      |
| react-swipeable      | A small react hook used for swiping interactions.                                                  | [react-swipeable](https://nearform.com/open-source/react-swipeable/)                  |
| React Three Fiber    | React renderer for Three.js                                                                        | [react three fiber docs](https://r3f.docs.pmnd.rs/getting-started/introduction)       |
| Drei                 | Collection of usefull helpers and fully functional, ready made abstractions for react three fiber. | [Drei docs](https://drei.docs.pmnd.rs/getting-started/introduction)                   |
| useHooks-ts           | Collection of usefull hooks for commong interactions.                                              | [usehooks](https://usehooks-ts.com)                                                     |
