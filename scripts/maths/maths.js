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
    return (subC+" &#8849; "+superC);
  },
  subClassText: function (){
    return "Sub Class Of";
  },
  disjointWithText: function () {
    return "Disjoint Classes";
  },
  disjointWith: function (classes){
    var return_string = "";
    for (var i = 0; i < classes.length; i++){
      return_string += classes[i]["$"]["IRI"].replace("#", "")
      if (i != classes.length-1){
        return_string += " &#8851; ";
      }
    }
    return_string += " =  &#8869;";
    return return_string;
  },
  objectPropertyText: function () {
    return "Object Properties";
  },
  subPropertyOf: function (subR, superR) {
    return (subR+" &#8849; "+superR);
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
    return subC + " &#8849; "+superC;
  }
}

module.exports = simpleEnglish;
