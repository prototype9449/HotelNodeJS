function isNumeric(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}

exports.isNumeric = isNumeric