import { LightningElement } from 'lwc';
export default class FooterLWC extends LightningElement { 
    currentYear = new Date().getFullYear(); // Dynamically fetch the current year
}