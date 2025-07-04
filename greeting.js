import { LightningElement } from 'lwc';
export default class Greeting extends LightningElement {

greetingMessage = '';
  subText = "Welcome to Certification Management platform! We're glad to have you here.";

  connectedCallback() {
    this.setGreetingMessage();
  }

  setGreetingMessage() {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      this.greetingMessage = 'Good Morning!';
    } else if (currentHour < 18) {
      this.greetingMessage = 'Good Afternoon!';
    } else {
      this.greetingMessage = 'Good Evening!';
    }
  }
}