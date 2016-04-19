/** @file Registers models inside the sandal container */

const uuid = require('node-uuid');
const _    = require('lodash');

/**
 * Data types
 *
 * @namespace models
 * @memberof  module:core
 */

/**
 * Pointer to the note of a specific instrument
 *
 * @typedef  InstrumentNote
 * @memberof module:core.models
 *
 * @property {String} instrument The instrument
 * @property {Number} position   The position of the note
 */

 /**
  * Type that describes updates to the playback state
  *
  * @typedef  PlaybackStateUpdate
  * @memberof module:core.models
  *
  * @property {Number}                         songNote     The note that's currently being
  *                                                         played in the song
  * @property {Array<module:core.models.Note>} playedNotes  Newly played notes of instruments
  * @property {Number}                         currentTempo The tempo for the current song note
  */

const modelWithIdFactory = (Model, keys) => args => (
    new Model(Object.assign({}, { id: uuid.v4() }, (
        keys
        ? _.zipObject(keys, args)
        : args
    )))
);

module.exports = sandal => {
    /**********/
    /* Models */
    /**********/

    sandal.object('core.models.ParameterChange', require('../models/parameter-change'));
    sandal.object('core.models.SamplesFolder', require('../models/samples-folder'));
    sandal.object('core.models.Instrument', require('../models/instrument'));
    sandal.object('core.models.NoteName', require('../models/note-name'));
    sandal.object('core.models.Note', require('../models/note'));

    sandal.factory(
        'core.models.State', ['core.models.ParameterChange'], require('../models/state')
    );

    /*************/
    /* Factories */
    /*************/

    sandal.factory(
        'core.models.makeSamplesFolder',
        ['core.models.SamplesFolder'],
        SamplesFolder => modelWithIdFactory(SamplesFolder, ['name'])
    );

    sandal.factory(
        'core.models.makeInstrument',
        ['core.models.Instrument'],
        Instrument => modelWithIdFactory(Instrument, ['noteName'])
    );
};
