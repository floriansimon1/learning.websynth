/** @file A visual instrument */

const React = require('react');
const _     = require('lodash');
const h     = require('react-hyperscript');

module.exports = function (Note) {
    /**
     * React component for a single instrument
     *
     * @name Instrument
     * @class
     * @memberof module:client.views.components
     */
    return React.createClass({
        render () {
            const actions             = this.props.actions;
            const instrument          = this.props.instrument;
            const notesPerTrack       = this.props.notesPerTrack;
            const currentlyPlayedNote = this.props.currentlyPlayedNote;

            return h(
                'tr', {}, _.range(notesPerTrack).map(
                    position => h(
                        'td', {}, h(
                            Note, {
                                instrument,
                                position,
                                actions,

                                currentlyPlayed: (
                                    currentlyPlayedNote
                                    .map(note => note === position)
                                    .getOrElse(false)
                                ),
                            }
                        )
                    )
                )
            )
        }
    });
};
