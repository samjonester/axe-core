
if (commons.dom.isHTML5(document)) {
	return false;
}

return node.nodeName.toUpperCase() === 'TH' || node.nodeName.toUpperCase() === 'TD';