'use strict';

let articles = require('articles');
const decamelize = require('decamelize');

//http://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

let simpleEnglish = {
  subClassOf: function (subC, superC) {
    return (decamelize(subC, " ").capitalize(true)+" is "+articles.articlize(decamelize(superC, " ").capitalize(true)));
  }
}

module.exports = simpleEnglish;
