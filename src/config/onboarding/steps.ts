import type {StepType} from "@reactour/tour";

export interface CustomStepType extends StepType{
    hideNext:boolean;
    hidePrevious:boolean;
}

export const steps= [
    {
        selector:'#onboarding-first-step',
        content:'Welkom op het dashboard! Momenteel is het hier nog best leeg :(',
    },
    {
        selector:'#onboarding-first-step',
        content:'Na het aanmaken van vloeren, ruimten en apparaten zal je hier een handige plattegrond vinden van jouw gebouw!',
    },
    {
        selector:"#onboarding-second-step",
        content:'Klaar om te starten? Met deze knoppen begint het avontuur! \n De eerste stap is het aanmaken van een vloer',
        hideNext:true
    },
    {
        selector:"#onboarding-first-step",
        content:'Door het gebruik van dit formulier voeg je eenvoudig een nieuwe vloer toe.',
        hideNext:true,
    },
    {
        selector:"#onboarding-second-step",
        content:'De vloer ligt! Klaar om een kamer toe te voegen!',
        hideNext:true
    },
    {
        selector:"#onboarding-first-step",
        content:'Een kamer aanmaken verloopt net zoals het aanmaken van een vloer.',
        hideNext:true
    },
    {
        selector:"#onboarding-first-step",
        content:'De plattegrond visualiseerd nu jouw zonet aangemaakte huis. (Door te klikken en slepen kan je rondom het huis kijken!)',
        hidePrevious:true
    },
    {
        selector:"#onboarding-first-step",
        content:'Vanaf hier is het volledig aan jou, maak nieuwe vloeren, kamers en voeg apparaten toe waarover jij de controle wilt nemen!',
    },
    {
        selector:"#onboarding-fifth-step",
        content:'Oh en nog een laatste tip! Gebruik de navigatie om detail paginas te bekijken!',
    },
    {
        selector:"#onboarding-sixth-step",
        content:'Ohja, je kan ook makkelijk de applicatie aanpassen aan wat jou het best past via de instellingen.',
    }
];