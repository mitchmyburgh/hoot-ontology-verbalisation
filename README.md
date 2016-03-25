# OE Verbalisation Miniproject

## Setup
Install the latest version of [node](https://nodejs.org/en/). Version 5.9.0 is the latest version as of writing.

Install the packages:

```bash
npm install
```

### Install nodemon
Nodemon reloads the project when files are changed
```bash
npm install -g nodemon
```
### The following steps are only for css, you can ignore them
#### Install Grunt

```bash
npm install -g grunt
```

#### Install Ruby
```bash
sudo apt-get install ruby-full
```
#### Install SASS
```bash
sudo su -c "gem install sass"
```
### /end css steps

## Running

```bash
npm start
```

## Coding

For UI code we are using React and SASS. Edit the code in:
```
./src
```
Then run:
```
grunt
```
Then refresh the site.

For Your code edit the file in
```
./scripts/lang/lang.js
```
and modify it to output the correct string given a certain input.

NOTE: don't use any owl file, the one in `./sample-owl` contains the features that are currently in use
