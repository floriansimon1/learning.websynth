const methodify = require('../../../source/core/utils').methodify;

describe('The methodify util', function () {
    const add         = (a, b) => a.b + b;
    const methodified = methodify(add);

    it('should be able to methodify an arrow function', () => {
        expect(methodified.call({ b: 1 }, 1)).toBe(2);
    });

    it('should not bind the this context of its passed function', () => {
        expect(methodified.call({ b: 1 }, 1)).toBe(2);
        expect(methodified.call({ b: 2 }, 1)).toBe(3);
    });
});
