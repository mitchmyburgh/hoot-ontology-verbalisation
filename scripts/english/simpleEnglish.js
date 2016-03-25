'use strict';

let articles = require('articles');
const decamelize = require('decamelize');
var natural = require('natural'),
nounInflector = new natural.NounInflector();
nounInflector.attach();

//http://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

let simpleEnglish = {
  classText: function () {
    return "Classes";
  },
  subClassOf: function (subC, superC) {
    return (articles.articlize(decamelize(subC, " ")).capitalize(true)+" is "+articles.articlize(decamelize(superC, " ").capitalize(true)));
  },
  subClassText: function (){
    return "Is A";
  },
  //object restrictions
  someValuesFrom: function (subC, superC, rel) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" sometimes "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)
  },
  allValuesFrom: function (subC, superC, rel) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" always "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)
  },
  exactCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" exactly "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  minCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" at least "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  maxCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" at most "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  disjointWithText: function () {
    return "Different Classes";
  },
  disjointWith: function (classes){
    var return_string = articles.articlize(decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ")).capitalize(true)+" is different from ";
    for (var i = 1; i < classes.length; i++){
      return_string += articles.articlize(decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true))
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
  instancesText: function () {
    return "Instances";
  },
  instances: function (subC, superC) {
    return "<img src='img/individ.png'></img>"+articles.articlize(decamelize(subC, " ")).capitalize(true)+" is "+articles.articlize(decamelize(superC, " ").capitalize(true));
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
    return decamelize(subC, " ").capitalize(true) + " is a type of " + decamelize(superC, " ").capitalize(true);
  }
}

module.exports = simpleEnglish;
