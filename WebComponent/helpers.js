function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getTemplate(name) {
	return document.getElementById(`${name}-tpl`).content.cloneNode(true);
}

export { escapeRegExp, getTemplate };
