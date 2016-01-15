/**
 * Page that allows an user to compose music.
 */

const di    = require('di4js');
const React = require('react');
const h     = require('react-hyperscript');

const Composer = React.createClass({
    render() {
        return h('a.btn.waves-effect.waves-light', undefined, 'Stuff');
    }
});

di.register('fs1-ws.views.pages.Composer').instance(Composer);

