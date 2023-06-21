// noinspection JSValidateTypes

import {
    html,
    css,
    LitElement,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class CounterLit extends LitElement {
    static styles = css`
        p {
            color: blue
        }
        .counter {
            padding: 10px;
            margin: 10px;
            border: 1px solid black;
        }
    `

    static properties = {
        counter: { type: Number },
        name: { attribute: true },
    }

    constructor() {
        super()
        this.counter = 0
        this.name = ''
    }

    increment() {
        this.counter += 1
    }

    decrement() {
        this.counter -= 1
    }

    render() {
        return html`
            <div class="counter">
                Počítadlo ${this.name}
                <p>${this.counter}</p>
                <button @click="${this.increment}">+</button>
                <button @click="${this.decrement}">-</button>
            </div>`
    }
}

customElements.define('counter-xy', CounterLit);
