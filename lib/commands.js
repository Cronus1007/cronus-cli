/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const chalk = require('chalk');
const log = console.log;
const PEM = require('../utils/pem');
/**
 * Utility class that implements the commands exposed by the Cronus-CLI
 * @class
 */
class Commands {

    /**
     * Common default params before we create an archive using a template
     *
     * @param {object} argv - the inbound argument values object
     * @returns {object} a modfied argument object
     */
    static validatePEMArgs(argv) {
        // the user typed 'cronus [command]'
        const currentTime = new Date().getHours() + ' hrs ' + new Date().getMinutes() + ' mins ' + new Date().getSeconds() + ' secs';
        argv.currentTime = currentTime;
        const UTCTime = new Date().getUTCHours() + ' hrs ' + new Date().getUTCMinutes() + ' mins ' + new Date().getUTCSeconds() + ' secs';
        argv.utcOffset = UTCTime;
        console.log(argv);
        argv.verbose = true;
        argv.v = true;
        return argv;
    }
    /**
     * Set default params we generate pem files
     *
     * @param {object} argv - the inbound argument values object
     * @param {object} options - Additional Options to generate-pem command
     * @returns {object} a modfied argument object
     */
    static draft(argv,options) {
        argv = this.validatePEMArgs(argv,options);
        if(argv.verbose) {
            log(chalk.blue(chalk.bold('Arguments to generate PEM files has been satisfied. Process to generate the public and private keys has been initiated')));
        }
        return PEM.then(() => {
            log(chalk.blue(chalk.bold(`PEM files generated to ${options.output}`)));
        }) .catch((err) => {
            log(chalk.red(err.message));
        });
    }
}


module.exports = Commands;