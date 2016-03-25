'use strict';

let articles = require('articles');
const decamelize = require('decamelize');

//http://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

let technicalEnglish = {
  classText: function () {
    return "Classes";
  },
  subClassOf: function (subC, superC) {
    return (decamelize(subC, " ").capitalize(true)+" is a sub class of "+ decamelize(superC, " ").capitalize(true));
  },
  subClassText: function (){
    return "Sub Class Of";
  },
  disjointWithText: function () {
    return "Disjoint Classes";
  },
  disjointWith: function (classes){
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" is disjoint with ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true);
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
  objectPropertyText: function () {
    return "Object Properties";
  },
  subPropertyOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is a sub property of "+ decamelize(superR, " ").capitalize(true));
  },
  subPropertyText: function (){
    return "Sub Property Of";
  },
  namedEntitiesText: function () {
    return "Named Entities";
  },
  subObjectText: function () {
    return "Parent";
  },
  subObjectOf: function (subC, superC) {
    return subC + " is an individual of "+superC;
  }
}


module.exports = technicalEnglish;
