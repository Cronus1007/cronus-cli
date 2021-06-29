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
const forge = require('node-forge');
const fs = require('fs');
const { exit } = require('process');

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
        // the user typed 'cronus [command]
        const currentTime = new Date().getHours() + ' hrs ' + new Date().getMinutes() + ' mins ' + new Date().getSeconds() + ' secs';
        argv.currentTime = currentTime;
        const UTCTime = new Date().getUTCHours() + ' hrs ' + new Date().getUTCMinutes() + ' mins ' + new Date().getUTCSeconds() + ' secs';
        argv.utcOffset = UTCTime;
        argv.verbose = true;
        argv.v = true;
        return argv;
    }
    /**
     * @param {object} argv - the inbound argument values object
     * @param {object} options - Additional Options to generate-pem command
     * @returns {object} a modfied argument object
     */
    static validateSignArgs(argv,options) {
        if(!options.pubinput || !options.privinput) {
            log(chalk.red('Generate public and private keys in order to genrate the signature.Use the command "cronus generate-pem" to generate the required files.'));
            exit();
        }
        const currentTime = new Date().getHours() + ' hrs ' + new Date().getMinutes() + ' mins ' + new Date().getSeconds() + ' secs';
        argv.currentTime = currentTime;
        const UTCTime = new Date().getUTCHours() + ' hrs ' + new Date().getUTCMinutes() + ' mins ' + new Date().getUTCSeconds() + ' secs';
        argv.utcOffset = UTCTime;
        argv.verbose = true;
        argv.v = true;
        console.log(argv);
        return argv;
    }
    /**
     * Set default params we generate pem files
     *
     * @param {object} argv - the inbound argument values object
     * @param {object} options - Additional Options to generate-pem command
     * @returns {object} a modfied argument object
     */
    static async generatePEM(argv,options) {
        argv = this.validatePEMArgs(argv);
        if(!options.puboutput) {
            options.puboutput = 'public.pem';
        }
        if(!options.privoutput) {
            options.privoutput = 'private.pem';
        }
        if(options.puboutput.match('.pem') === null) {
            options.puboutput += '.pem';
        }
        if(options.privoutput.match('.pem') === null) {
            options.privoutput += '.pem';
        }
        if(argv.verbose) {
            log(chalk.blue(chalk.bold('Arguments to generate PEM files has been satisfied. Process to generate the public and private keys has been initiated')));
        }
        return new Promise((f, r) => forge.pki.rsa.generateKeyPair(
            2048, (err, pair) => err ? r(err) : f(pair)))
            .then(keypair => {
                const priv = keypair.privateKey;
                const pub = keypair.publicKey;
                // PEM serialize: public key
                const pubPem  = forge.pki.publicKeyToPem(pub);
                fs.writeFileSync(`${options.puboutput}`, pubPem);
                // PEM Serialize: Private Key
                const privPem  = forge.pki.privateKeyToPem(priv);
                fs.writeFileSync(`${options.privoutput}`, privPem);
                return keypair;
            })
            .then(() => {
                log(chalk.blue(chalk.bold(`Public PEM files generated to ${options.puboutput}`)));
                log(chalk.blue(chalk.bold(`Private PEM files generated to ${options.privoutput}`)));
            }) .catch((err) => {
                log(chalk.red(err.message));
            });
    }
}


module.exports = Commands;