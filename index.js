#!/usr/bin/env node
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

const Commands = require('./lib/commands');
const chalk = require('chalk');
const log = console.log;
const options = {};

require('yargs')
    .scriptName('cronus')
    .usage('$0 <cmd> [args]')
    .demandCommand(1, '# Please specify a command')
    .recommendCommands()
    .strict()
    .command('generate-pem','generate public and private keys', (yargs) => {
        yargs.option('puboutput', {
            describe: 'path to the output file consisting of public keys',
            type: 'string'
        });
        yargs.option('privoutput', {
            describe: 'path to the output file consisting of private keys',
            type: 'string'
        });
        yargs.option('currentTime', {
            describe: 'set current time',
            type: 'string',
            default: null
        });
        yargs.option('utcOffset', {
            describe: 'set UTC offset',
            type: 'number',
            default: null
        });
        yargs.option('warnings', {
            describe: 'print warnings',
            type: 'boolean',
            default: false
        });
    } , (argv) => {
        try {
            argv = Commands.validatePEMArgs(argv);
            options.warnings = argv.warnings;
            options.puboutput = argv.puboutput;
            options.privoutput = argv.privoutput;
            return Commands.generatePEM(argv,options)
                .then((result) => {
                    if(result) {
                        log(chalk.blue(result));}
                })
                .catch((err) => {
                    log(chalk.red(err.message));
                });
        } catch (err) {
            log(chalk.red(err.message));
            return;
        }
    })
    .command('sign', 'generate digital signatures from the required pem files', (yargs) => {
        yargs.option('pubinput', {
            describe: 'path to the input file consisting of public keys',
            type: 'string'
        });
        yargs.option('privinput', {
            describe: 'path to the input file consisting of private keys',
            type: 'string'
        });
        yargs.option('currentTime', {
            describe: 'set current time',
            type: 'string',
            default: null
        });
        yargs.option('utcOffset', {
            describe: 'set UTC offset',
            type: 'number',
            default: null
        });
        yargs.option('warnings', {
            describe: 'print warnings',
            type: 'boolean',
            default: false
        });
    } , (argv) => {
        try {
            options.warnings = argv.warnings;
            options.pubinput = argv.pubinput;
            options.privinput = argv.privinput;
            argv = Commands.validateSignArgs(argv,options);
            return Commands.generateSignature(argv,options);
        } catch (err) {
            log(chalk.red(err.message));
        }
    })
    .option('verbose', {
        alias: 'v',
        default: false
    })
    .help()
    .argv;