import BaseHtmlElement from './BaseHtmlElement.js';
import { escapeRegExp, getTemplate } from './helpers.js';

class ContentFilter extends BaseHtmlElement {
	constructor() {
		super();

		// Properties from attributes.
		this.placeholder = this.getAttr("placeholder");
		this.filterSelector = this.getAttr("filter-selector", "_req");
		this.innerSelectors = this.getAttr("inner-selectors", "_req", Array);

		// Other properties
		this.render(); // this.inputEl is set here.

		// Do the job!
		this.initFiltering();
	}

	render() {
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(getTemplate('content-filter'));
		this.inputEl = this.shadowRoot.querySelector('input');

		if (this.placeholder) {
			this.inputEl.setAttribute('placeholder', this.placeholder);
		}
	}

	/**
	 * Adds event listener to this.inputEl and filters :)
	 */
	initFiltering() {
		this.inputEl.addEventListener('input', (event) => {
			const inputVal = event.target.value;

			const toFilter = document.querySelectorAll(this.filterSelector);
			toFilter.forEach((extElm) => {
				// Show all elements.
				extElm.classList.remove('hidden');
				let match = false;

				this.innerSelectors.forEach((innerSelector) => {
					extElm.querySelectorAll(innerSelector).forEach((innerElm) => {
						// Clean prev highlights.
						innerElm.innerHTML = innerElm.innerText;

						// Search coincidences.
						const regex = RegExp(escapeRegExp(inputVal), 'ig');
						if (regex.test(innerElm.innerText)) {
							// Highlight.
							innerElm.innerHTML = innerElm.innerText.replaceAll(
								regex,
								( m ) => `<span class="highlight">${ m }</span>`
							);
							match = true;
						}
					});
				});

				// Hide non-matched elements.
				if (!match && inputVal.length) {
					extElm.classList.add('hidden');
				}
			});
		});
	}
}

customElements.define('content-filter', ContentFilter);
