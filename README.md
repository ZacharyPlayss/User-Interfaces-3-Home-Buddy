# Homebuddy
## Uitdagingen & Prestaties
### Uitdagingen
De belangrijkste uitdagingen die ik ben tegengekomen, waren state management en cache invalidation.

Sommige packages zoals Zustand, zijn duidelijk gericht op state management en voorzien eigen stores.
Maar er zijn ook libraries zoals React Router, waarbij dat naar mijn mening minder voor de hand ligt. Zo heb ik bijvoorbeeld lang gezochtnaar een manier om 'route params' te kunnen
synchroniseren met een interne useState. Het antwoord daarop vond ik (redelijk laat in het project) in de [documentatie van react-router](https://reactrouter.com/explanation/state-management)

Cache invalidation bleek eveneens een uitdaging. Tijdens de ontwikkeling maakte ik te veel query-keys aan, die uiteindelijk overlappend en vooral onnodig bleken te zijn.
De tip tijdens de laatste lessen om 'query-keys' op te slaan in een aparte files zorge ervoor dat ik hierin snel weer een goed overzicht kreeg, en de keys tot een minimum kon beperken.

### Prestaties
Ik ben het meest trots op de look and feel van de applicatie, alles voelt aan als één geheel. 
Voor het eerst ben ik ook aan de slag gegaan met animaties binnen en user interface, zowel SVG-animaties als UI-animaties, en ik vind dat deze svg's goed tot hun recht komen binnen het geheel.
Al met al denk ik dat dit mijn meest complexe UI-project tot nu toe is.
---
## Afgewerkte Functionaliteiten✅
Lijst van alle functies die met succes zijn geïmplementeerd en getest.
- [x] [US1] #2 Verdiepingen beheren (CRUD) om een gebouw met meerdere verdiepingen te
  structureren.
- [x] [US2] Kamers beheren (CRUD) om een grondplan (bovenaanzicht) per verdieping
  aan te maken.
- [x] [US3] Domotica controls beheren (CRUD) zodat deze beschikbaar zijn voor gebruikers.
- [x] [US4] Globale scenes beheren (CRUD) zodat deze toegankelijk zijn voor alle gebruikers
- [x] [US5] Tijdsloten (automations) koppelen aan scenes (CRUD) zodat deze periodiek actief worden.
- [x] [US6] Domotica controls zoeken, filteren, bekijken en aanpassen.
- [x] [US7] Scenes (CRUD) beheren om eenvoudig eigen voorkeuren in te stellen.
- [x] [US8] Scenes ativeren en deactiveren om onmiddelijk een bepaalde situatie of sfeer te bekomen.
- [x] [US9] De interface in dark/light/sys modus zetten.
- [x] [US14] Een 3D weergave van het grondplan integreren.
- [x] Animatie library geïntegreerd voor animaties (svg, als componenten als 3D elementen)
- [x] Onboarding systeem met een korte uitleg over hoe de applicatie werkt voor nieuwe gebruikers.
---
## Onvoltooide / Geplande Functionaliteiten❌
Zaken die gepland zijn, in ontwikkeling zijn of nog niet zijn geïmplementeerd.
- [ ] Er is geen vlotte manier om controls van hetzelfde type vlot eenzelfde waarde te geven bv. alle temperatuur op 27°C
- [ ] Het onboarding systeem is een leuke toevoeging maar heeft nog bugs doordat deze ook binnen dialog contexts gebruikt meoten worden.
- [ ] Storybook implementeren (experiment)