# OE Verbalisation Miniproject

## Setup
Install the latest version of [node](https://nodejs.org/en/). Version 5.9.0 is the latest version as of writing.

Install the packages:

```bash
npm install
```
### Install Grunt

```bash
npm install -g grunt
```

### Install Ruby
```bash
sudo apt-get install ruby-full
```
### Install SASS
```bash
sudo su -c "gem install sass"
```

## Running

```bash
DEBUG=oe-verbalisation:* npm start
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
