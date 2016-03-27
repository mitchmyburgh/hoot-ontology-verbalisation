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
  equivalentRelationsText: function () {
    return "Equivalent To"
  },
  equivalentRelations: function (subR, superR){
    return decamelize(subR, " ").capitalize(true)+" is equivalent to "+decamelize(superR, " ").capitalize(true)
  },
  inverseOfText: function () {
    return "Inverse Of";
  },
  inverseOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is the inverse of "+decamelize(superR, " ").capitalize(true));
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
  },
  // new stuff
  domainAndRangeText: function () {
    return "Domain and Range";
  },
  domainPre: function (rel) {
    return "The Domain of "+decamelize(rel, " ").capitalize(true)+" is the intersection of ";
  },
  domain: function (superC) {
    return articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  domainSome: function (subR, superC) {
    return "objects that "+decamelize(subR, " ").capitalize(true)+" some "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  domainAll: function (subR, superC) {
    return "objects that "+decamelize(subR, " ").capitalize(true)+" only "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  domainMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" minimum "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  domainMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" maximum "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  domainExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" exactly "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  domainTrim: function(text){
    return text.substring(0, text.length-4);
  },
  domainPost: function (text, subR){
    return this.domainTrim(text)+". "
  },
  domainPostNoR: function (text, subR){
    return this.domainTrim(text)+". ";
  },
  rangePreNoD: function (text, rel) {
    return this.rangeTrim(text);
  },
  rangePre: function (rel) {
    return "The Range of "+decamelize(rel, " ").capitalize(true)+" is the intersection of ";
  },
  range: function (superC) {
    return articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  rangeSome: function (subR, superC) {
    return "objects that "+decamelize(subR, " ").capitalize(true)+" some "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  rangeAll: function (subR, superC) {
    return "objects that "+decamelize(subR, " ").capitalize(true)+" only "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " and ";
  },
  rangeMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" minimum "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
  },
  rangeMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" maximum "+card+" "+decamelize(superC, " ").capitalize(true)+ " and ";
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
    return "Disjoint With";
  },
  disjointWithOP: function (classes){
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" is disjoint with ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true);
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
}


module.exports = technicalEnglish;
