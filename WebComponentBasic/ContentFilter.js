import BaseHtmlElements from "./BaseHtmlElements.js";

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& significa toda la cadena coincidente
}

class ContentFilter extends BaseHtmlElements {
  constructor() {
    super();
    // Properties from attributes
    this.placeholder = this.getAttr("placeholder");
    this.filterSelector = this.getAttr("filter-selector", "_req");
    this.innerSelectors = this.getAttr("inner-selector", "_req", Array);

    // Other properties
    this.render(); // this.inputEl is set here

    // Do the job
    this.initFiltering();
  }

  render() {
    this.inputEl = document.createElement("input");
    this.inputEl.setAttribute("type", "search");
    if (this.placeholder) {
      this.inputEl.setAttribute("placeholder", this.placeholder);
    }
    this.inputEl.classList.add("content-filter-input");
    this.appendChild(this.inputEl);
  }

  /**
   * Add event listener to this.inputEl and filters :)
   */
  initFiltering() {
    this.inputEl.addEventListener("input", (event) => {
      const inputVal = event.target.value;

      const toFilter = document.querySelectorAll(this.filterSelector);
      toFilter.forEach((extElm) => {
        // Show all elements
        extElm.classList.remove("hidden");
        let match = false;
        this.innerSelectors.forEach((innerSelector) => {
          extElm.querySelectorAll(innerSelector).forEach((innerElm) => {
            const regex = RegExp(escapeRegExp(inputVal), "ig");
            if (regex.test(innerElm.innerText)) {
              match = true;
            }
          });
        });

        //Hide non-matched elements
        if (!match && inputVal.length) {
          extElm.classList.add("hidden");
        }
      });
    });
  }
}

window.customElements.define("content-filter", ContentFilter);
// <content-filter placeholder = 'Buscar ...' filter-selector=".post" inner-selector ="['.title', '.content'. '.hashtag']"></content-filter>
