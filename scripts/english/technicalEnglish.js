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
  //object restrictions
  someValuesFrom: function (subC, superC, rel) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" some "+decamelize(superC, " ").capitalize(true)
  },
  allValuesFrom: function (subC, superC, rel) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" only "+decamelize(superC, " ").capitalize(true)
  },
  exactCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" exactly "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  minCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" a minimum of "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  maxCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" a maximum of "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  equivalentClassesText: function () {
    return "Equivalent To";
  },
  equivalentClasses: function (subC, superC) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" is equivalent to "+articles.articlize(decamelize(superC, " ").capitalize(true))
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
  instancesText: function () {
    return "Instances";
  },
  instances: function (subC, superC) {
    return "<img src='img/individ.png'></img>"+articles.articlize(decamelize(subC, " ")).capitalize(true)+" is an instance of "+articles.articlize(decamelize(superC, " ").capitalize(true));
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
  characteristicsText: function () {
    return "Characteristics";
  },
  characteristicsFunctional: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Functional";
  },
  characteristicsInverseFunctional: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Inverse Functional";
  },
  characteristicsTransitive: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Transitive";
  },
  characteristicsSymmetric: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Symmetric";
  },
  characteristicsAsymmetric: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Asymmetric";
  },
  characteristicsReflexive: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Reflexive";
  },
  characteristicsIrreflexive: function (rel) {
    return "The relation "+decamelize(rel, " ").capitalize(true)+" is Irreflexive";
  },
  namedEntitiesText: function () {
    return "Named Entities";
  },
  subObjectText: function () {
    return "Parent";
  },
  subObjectOf: function (subC, superC) {
    return decamelize(subC, " ").capitalize(true) + " is an individual of "+decamelize(superC, " ").capitalize(true);
  }
}


module.exports = technicalEnglish;
