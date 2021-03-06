var nodeName = node.nodeName.toUpperCase(),
	nodeType = node.type,
	doc = document;

if (nodeName === 'INPUT') {
	return ['hidden', 'range', 'color', 'checkbox', 'radio', 'image'].indexOf(nodeType) === -1 && !node.disabled;
}

if (nodeName === 'SELECT') {
	return !!node.options.length && !node.disabled;
}

if (nodeName === 'TEXTAREA') {
	return !node.disabled;
}

if (nodeName === 'OPTION') {
	return false;
}

if (nodeName === 'BUTTON' && node.disabled) {
	return false;
}

// check if the element is a label for a disabled control
if (nodeName === 'LABEL') {
	// explicit label of disabled input
	var candidate = node.htmlFor && doc.getElementById(node.htmlFor);
	if (candidate && candidate.disabled) {
		return false;
	}

	var candidate = node.querySelector('input:not([type="hidden"]):not([type="image"])' +
		':not([type="button"]):not([type="submit"]):not([type="reset"]), select, textarea');
	if (candidate && candidate.disabled) {
		return false;
	}

}

// label of disabled control associated w/ aria-labelledby
if (node.id) {
	var candidate = doc.querySelector('[aria-labelledby~=' + commons.utils.escapeSelector(node.id) + ']');
	if (candidate && candidate.disabled) {
		return false;
	}
}

if (commons.text.visible(node, false, true) === '') {
	return false;
}

var range = document.createRange(),
	childNodes = node.childNodes,
	length = childNodes.length,
	child, index;

for (index = 0; index < length; index++) {
	child = childNodes[index];

	if (child.nodeType === 3 && commons.text.sanitize(child.nodeValue) !== '') {
		range.selectNodeContents(child);
	}
}

var rects = range.getClientRects();
length = rects.length;

for (index = 0; index < length; index++) {
	//check to see if the rectangle impinges
	if (commons.dom.visuallyOverlaps(rects[index], node)) {
		return true;
	}
}

return false;
