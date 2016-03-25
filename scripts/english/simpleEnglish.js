'use strict';

let articles = require('articles');
const decamelize = require('decamelize');

//http://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

let simpleEnglish = {
  classText: function () {
    return "Classes";
  },
  subClassOf: function (subC, superC) {
    return (decamelize(subC, " ").capitalize(true)+" is "+articles.articlize(decamelize(superC, " ").capitalize(true)));
  },
  subClassText: function (){
    return "Is A";
  },
  objectPropertyText: function () {
    return "Object Properties";
  },
  subPropertyOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is "+articles.articlize(decamelize(superR, " ").capitalize(true)));
  },
  subPropertyText: function (){
    return "Is A";
  },
  namedEntitiesText: function () {
    return "Named Entities";
  },
  subObjectText: function () {
    return "Parent";
  },
  subObjectOf: function (subC, superC) {
    return subC + " is a type of "+superC;
  }
}

module.exports = simpleEnglish;
