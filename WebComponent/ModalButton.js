import { getTemplate } from './helpers.js';

class ModalButton extends HTMLElement {
	constructor() {
		super();

		// Properties from attributes.
		this.value = this.getAttribute('value');

		// Other properties.
		this.render(); // this.triggerEl
		this.divEl = this.shadowRoot.querySelector('div');
		this.asideEl = this.shadowRoot.querySelector('aside');
		this.closeEl = this.shadowRoot.querySelector('button.close');

		// Display modal on click.
		this.triggerEl.addEventListener( 'click', () => {
			this.classList.add('show');
		});

		// Hide modal on background click.
		this.divEl.addEventListener('click', (ev) => {
			if (ev.target === this.divEl) this.closeModal();
		});

		// Hide modal on closeEl click.
		this.closeEl.addEventListener('click', () => {
			this.closeModal();
		});
	}

	closeModal() {
		this.classList.remove('show');
	}

	render() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(getTemplate('modal-button'));
		this.triggerEl = this.shadowRoot.querySelector('button.trigger');
		this.triggerEl.textContent = this.value;
	}

	static get observedAttributes() {
		return ['value'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'value') this.triggerEl.textContent = newValue;
	}
}

customElements.define('modal-button', ModalButton);
