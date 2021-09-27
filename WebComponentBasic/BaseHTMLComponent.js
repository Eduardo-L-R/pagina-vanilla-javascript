class BaseHtmlElement extends HTMLElement {
	/**
	 * Improved this.getAttribute, allows default value and type cast.
	 *
	 * @param {string} name - Name of the attribute to get.
	 * @param {*} [byDefault] - Default value. The string '_req' means that
	 * param is required.
	 * @param {Function} [type] - String, Number, Boolean, Array or Object. The
	 * last three are processed with JSON.parse().
	 */
	getAttr(name, byDefault = null, type = String) {
		let value = this.getAttribute(name);
		if (byDefault === "_req" && value === undefined) {
			throw new Error(`${name} is a required attribute`);
		}
		if ([Array, Object, Boolean].includes(type)) {
			type = JSON.parse;
			if (value) value = value.replaceAll("'", '"'); // allow any '
            value = String(value); 
		}
		return value ? type(value) : byDefault;
	}
}
export default BaseHtmlElement;
// <contnet-filter placeholder = 'Buscar ...' filter-selector=".post" inner-selector ="['.title', '.content'. '.hashtag']"></conntent-filter>
