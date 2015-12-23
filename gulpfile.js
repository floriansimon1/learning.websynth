/**
 * Loads all tasks defined in the gulp tasks folder.
 * The ones you'll likely need are the following :
 * - run
 * - live-reload
 */

const scriptsDirectory = './scripts/gulp/';

require('fs')
.readdirSync(scriptsDirectory)
.forEach(file => require(scriptsDirectory + file));
