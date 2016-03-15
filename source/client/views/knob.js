/** @file A knob component */

const _    = require('lodash');
const Knob = require('knob');

/**
 * Knob components class factory that builds knobs
 * according to the given specs
 *
 * @name     Knob
 * @function
 * @memberof module:client.views
 *
 * @param {Number}  minimum
 * @param {Number}  maximum
 * @param {Funtion} getter  A function to retrieve the current value
 * @param {Funtion} setter  A function to set the current value
 *
 * @return {Function} A knob virtual-dom widget constructor
 */
module.exports = store => (minimum, maximum, getter, setter) => (
    Object.assign(function () {}, {
        prototype: {
            type: 'Widget',

            init: () => Object.assign(
                Knob({
                    bgColor:   '#888',
                    fgColor:   'white',
                    value:     getter(),
                    min:       minimum,
                    max:       maximum,
                    lineCap:   'round',
                    thickness: 0.2,
                    width:     50
                }), {
                    onchange: function () {
                        if (!isNaN(this.value)) {
                            setter(this.value);
                        } else {
                            setter(120);
                        }
                    }
                }
            ),

            update: (_, element) => element.setValue(getter())
        }
    })
);
