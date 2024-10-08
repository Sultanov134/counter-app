import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {


  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter =5;
    this.min =0;
    this.max =10;

  }

  static get properties() {
    return {
      title: { type: String },
      counter: {type: Number},
      max: {type: Number},
      min: {type: Number}
    };
  }

  static get styles() {
    return [
      super.styles,
    css`

  :host {
    display: block;
    color: var(--ddd-theme-primary);
    background-color: var(--ddd-theme-accent);
    font-family: var(--ddd-font-navigation);
    font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
  }
  .wrapper {
    padding: 8px 16px;
    margin: 0 8px;
    text-align: center;
    font-size: 48px;
    margin-bottom: 16px;
    }
  
  
  div.counter {
   font-size: 48px;
   margin-bottom: 16px;
  }
  button {
      padding: 8px 16px;
      margin: 0 8px;
      font-size: 24px;
      
    }
  button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `];
  }

  render() {
    return html`
<confetti-container id="confetti" class="wrapper">
  <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
  <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
  <div class="counter">counter: ${this.counter}</div>
  </confetti-container>`;
  }


  increment() {
    if (this.counter < this.max) {
      this.counter +=1;
    }
   
  }


  decrement(){
    if (this.counter > this.min){
      this.counter -=1;
    }
  }


 updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === this.max){
        this.makeItRain();
      }
    }
  }

  makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
}

  

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
     .href;
 }
}

globalThis.customElements.define(counterApp.tag, counterApp);