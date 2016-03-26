'use strict';

let articles = require('articles');
const decamelize = require('decamelize');
var natural = require('natural'),
nounInflector = new natural.NounInflector();
nounInflector.attach();

//list of past tense verbs
var pastTense = {
  drinks: "nwewang",
}

//http://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

let Tswana = {
  classText: function () {
    return "Classes";
  },
  subClassOf: function (subC, superC) {
    return ((decamelize(subC, " ")).capitalize(true)+" ke "+(decamelize(superC, " ").capitalize(true)));
  },
  subClassText: function (){
    return "Is A";
  },
  //object restrictions
  someValuesFrom: function (subC, superC, rel) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" nako tse dingwe "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)
  },
  allValuesFrom: function (subC, superC, rel) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" e nna e "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)
  },
  exactCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)+" e le "+card
  },
  minCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)+" bonnye , di le "+card
  },
  maxCardinality: function (subC, superC, rel, card) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)+" tse di sa feteng "+card+" "
  },
  equivalentClassesText: function () {
    return "Is Also";
  },
  equivalentClasses: function (subC, superC) {
    return (decamelize(subC, " ")).capitalize(true)+" e ka bitswa "+superC
  },
  disjointWithText: function () {
    return "Different Classes";
  },
  disjointWith: function (classes){
    var return_string = articles.articlize(decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ")).capitalize(true)+" e farologane le ";
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
    return "<img src='img/individ.png'></img>"+articles.articlize(decamelize(subC, " ")).capitalize(true)+" ke "+(decamelize(superC, " ").capitalize(true));
  },
  objectPropertyText: function () {
    return "Object Properties";
  },
  subPropertyOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" ke karolo ya "+(decamelize(superR, " ").capitalize(true)));
  },
  subPropertyText: function (){
    return "Is A";
  },
  equivalentRelationsText: function () {
    return "Is Also"
  },
  equivalentRelations: function (subR, superR){
    return decamelize(subR, " ").capitalize(true)+" e tshwana le "+decamelize(superR, " ").capitalize(true)
  },
  inverseOfText: function () {
    return "Opposites";
  },
  inverseOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" e kgatlhanong le  "+decamelize(superR, " ").capitalize(true));
  },
  characteristicsText: function () {
    return "Characteristics";
  },
  characteristicsFunctional: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" Class or Object e le 1";
  },
  characteristicsInverseFunctional: function (rel) {
    return "Class or Object ngwe le ngwe e e "+pastTense[rel]+", e "+rel+" ke bonnye Class or Object e le 1";
  },
  characteristicsTransitive: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" Class or Object e le 1";
  },
  characteristicsSymmetric: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" Class or Object e le 1";
  },
  characteristicsAsymmetric: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" Class or Object e le 1";
  },
  characteristicsReflexive: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" Class or Object e le 1";
  },
  characteristicsIrreflexive: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" Class or Object e le 1";
  },
  namedEntitiesText: function () {
    return "Named Entities";
  },
  subObjectText: function () {
    return "Parent";
  },
  subObjectOf: function (subC, superC) {
    return decamelize(subC, " ").capitalize(true) + " ke mofuta wa " + decamelize(superC, " ").capitalize(true);
  }
}

module.exports = Tswana;
