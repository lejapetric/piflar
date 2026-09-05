// api/utils/validator.js
exports.isNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
};

exports.isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
};

exports.isNonNegativeInteger = (value) => {
    return Number.isInteger(value) && value >= 0;
};

exports.validateQuadraticInput = (a, b, c) => {
    if (!this.isNumber(a) || !this.isNumber(b) || !this.isNumber(c)) {
        throw new Error('Vsi koeficienti morajo biti števila');
    }
    if (a === 0) {
        throw new Error('a ne sme biti 0');
    }
};

exports.validateSequenceInput = (a1, d, n) => {
    if (!this.isNumber(a1) || !this.isNumber(d)) {
        throw new Error('Prvi člen in razlika morata biti števili');
    }
    if (!this.isPositiveInteger(n)) {
        throw new Error('n mora biti pozitivno celo število');
    }
};