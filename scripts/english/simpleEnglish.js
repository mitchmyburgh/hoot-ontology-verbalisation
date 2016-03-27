'use strict';

let articles = require('articles');
const decamelize = require('decamelize');
var natural = require('natural'),
nounInflector = new natural.NounInflector();
nounInflector.attach();

//list of past tense verbs
var pastTense = {
  drinks: "drunk",
}

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
  equivalentClassesText: function () {
    return "Is Also";
  },
  equivalentClasses: function (subC, superC) {
    return articles.articlize(decamelize(subC, " ")).capitalize(true)+" is the same as "+articles.articlize(decamelize(superC, " ").capitalize(true))
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
  equivalentRelationsText: function () {
    return "Is Also"
  },
  equivalentRelations: function (subR, superR){
    return decamelize(subR, " ").capitalize(true)+" is the same as "+decamelize(superR, " ").capitalize(true)
  },
  inverseOfText: function () {
    return "Opposites";
  },
  inverseOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is the opposite of "+decamelize(superR, " ").capitalize(true));
  },
  characteristicsText: function () {
    return "Characteristics";
  },
  characteristicsFunctional: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" only 1 Class or Object";
  },
  characteristicsInverseFunctional: function (rel) {
    return "Every Class or Object that is "+pastTense[rel]+", is only "+pastTense[rel]+" by 1 Class or Object";
  },
  characteristicsTransitive: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" only 1 Class or Object";
  },
  characteristicsSymmetric: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" only 1 Class or Object";
  },
  characteristicsAsymmetric: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" only 1 Class or Object";
  },
  characteristicsReflexive: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" only 1 Class or Object";
  },
  characteristicsIrreflexive: function (rel) {
    return "Every Class or Object "+decamelize(rel, " ").capitalize(true)+" only 1 Class or Object";
  },
  namedEntitiesText: function () {
    return "Named Entities";
  },
  subObjectText: function () {
    return "Parent";
  },
  subObjectOf: function (subC, superC) {
    return decamelize(subC, " ").capitalize(true) + " is a type of " + decamelize(superC, " ").capitalize(true);
  },
  // new stuff
  domainAndRangeText: function () {
    return "Domain and Range";
  },
  domainPre: function (rel) {
    return "An object that ";
  },
  domain: function (superC) {
    return "is "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  domainSome: function (subR, superC) {
    return "sometimes "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  domainAll: function (subR, superC) {
    return "always "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  domainMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" at least "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  domainMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" at most "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  domainExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" exactly "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  domainTrim: function(text){
    return text.substring(0, text.length-4);
  },
  domainPost: function (text, subR){
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)
  },
  domainPostNoR: function (text, subR){
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)+" an Object";
  },
  rangePreNoD: function (text, rel) {
    return "A class "+rel+" an object that is "+text.substring(19, text.length-4);
  },
  rangePre: function (rel) {
    return " an object that ";
  },
  range: function (superC) {
    return "is "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  rangeSome: function (subR, superC) {
    return "sometimes "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  rangeAll: function (subR, superC) {
    return "always "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  rangeMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" at least "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  rangeMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" at most "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  rangeExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" exactly "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  rangeTrim: function(text){
    return text.substring(0, text.length-4);
  },
  rangePost: function (text, subR){
    return this.rangeTrim(text)
  },
  disjointWithOPText: function () {
    return "Different From";
  },
  disjointWithOP: function (classes){
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" is different from ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
}

module.exports = simpleEnglish;
