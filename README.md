<div align="center">
    <a href="https://github.com/cronus1007">
        <img width="200" height="200" src="https://images.pexels.com/photos/5987154/pexels-photo-5987154.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500">
    </a>
</div>

<h1 align="center">Cronus CLI</h1>

<p align="center">
  The official CLI of Cronus package
</p>

___

## Table of Contents

-   [About](#about)
    -   [How to install](#how-to-install)
-   [Supported arguments and commands](#supported-arguments-and-commands)
-   [Packages](#packages)
    -   [Commands](#commands)
    -   [Utilities](#utilities)
-   [Getting started](#getting-started)
-   [Exit codes and their meanings](#exit-codes-and-their-meanings)
<!-- -   [Open Collective](#open-collective) -->

___


## About


### ◦ How to install


## Supported arguments and commands

```cronus``` Prefix to command to access the node package
## Packages


### ◦ Commands

Supporting developers is an important task for cronus CLI.
Thus, webpack CLI provides different commands for many common tasks.

```cronus generate-pem``` To generate public and private keys in .pem format 

###### Options for  ```cronus generate-pem``` command

```--puboutput``` Default none, not required

```--privoutput``` Default none, not required
___

```cronus sign``` generate signature from the given public and private keys with a message digest

###### Options for  ```cronus sign``` command

```--pubinput``` File name consisting of public key(required)

```--privinput``` File name consisting of private key(required)

```--message``` some text for creating the signatures (default none, not required)

### ◦ Utilities
The project has several utility packages which are used by other commands

```commands``` - Contains all cronus-cli related generators.

## Getting started

You would need to install cronus CLI and the packages you want to use using either npm or yarn. To start with a new project:

<!-- ```npm``` command here -->

```generate-pem ``` command generates public and private keys in .pem format

## Exit codes and their meanings

| Exit Code | Description                                        |
| --------- | -------------------------------------------------- |
| `0`       | Success                                            |
| `1`       | Errors from cronus                                 |


<!-- ## Open Collective

If you like **cronus**, please consider donating to our [Open Collective](https://opencollective.com/cronus) to help us maintain it. -->


## Code of Conduct

Guidelines to how the cronus organization expects you to behave is documented under [Code of Conduct](./CODE_OF_CONDUCT.md)

___