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
    return "Class kgotsa Object Ngwe le ngwe"+decamelize(rel, " ").capitalize(true)+" Class kgotsa Object e le 1";
  },
  characteristicsInverseFunctional: function (rel) {
    return "Class kgotsa Object ngwe le ngwe e e "+pastTense[rel]+", e "+rel+" ke bonnye Class kgotsa Object e le 1";
  },
  characteristicsTransitive: function (rel) {
    return "Class kgotsa Object Ngwe le ngwe "+decamelize(rel, " ").capitalize(true)+" Class kgotsa Object e le 1";
  },
  characteristicsSymmetric: function (rel) {
    return "Class kgotsa Object Ngwe le ngwe "+decamelize(rel, " ").capitalize(true)+" Class kgotsa Object e le 1";
  },
  characteristicsAsymmetric: function (rel) {
    return "Class kgotsa Object Ngwe le ngwe "+decamelize(rel, " ").capitalize(true)+" Class kgotsa Object e le 1";
  },
  characteristicsReflexive: function (rel) {
    return "Class kgotsa Object Ngwe le ngwe "+decamelize(rel, " ").capitalize(true)+" Class kgotsa Object e le 1";
  },
  characteristicsIrreflexive: function (rel) {
    return "Class kgotsa Object Ngwe le ngwe "+decamelize(rel, " ").capitalize(true)+" Class kgotsa Object e le 1";
  },
  namedEntitiesText: function () {
    return "Named Entities";
  },
  subObjectText: function () {
    return "Parent";
  },
  subObjectOf: function (subC, superC) {
    return decamelize(subC, " ").capitalize(true) + " ke mofuta wa " + decamelize(superC, " ").capitalize(true);
  },
  
  // new stuff
  domainAndRangeText: function () {
    return "Bonno le Motlhamo";
  },
  domainPre: function (rel) {
    return "Selo se se ";
  },
  domain: function (superC) {
    return "ke "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  domainSome: function (subR, superC) {
    return "nako tse dingwe "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  domainAll: function (subR, superC) {
    return "E nna "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  domainMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" bonnye "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  domainMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" at most "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  domainExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" ke "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  domainTrim: function(text){
    return text.substring(0, text.length-4);
  },
  domainPost: function (text, subR){
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)
  },
  domainPostNoR: function (text, subR){
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)+" Selo";
  },
  rangePreNoD: function (text, rel) {
    return "Mophato "+rel+" selo se se "+text.substring(19, text.length-4);
  },
  rangePre: function (rel) {
    return " selo se ";
  },
  range: function (superC) {
    return " ke "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  rangeSome: function (subR, superC) {
    return "nako tse dingwe "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  rangeAll: function (subR, superC) {
    return "e nna "+decamelize(subR, " ").capitalize(true)+" "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  rangeMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" bonnye "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  rangeMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" at most "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  rangeExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" ke "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  rangeTrim: function(text){
    return text.substring(0, text.length-4);
  },
  rangePost: function (text, subR){
    return this.rangeTrim(text)
  },
  disjointWithOPText: function () {
    return "E farologane le";
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
  subPropertyOfChainingText: function () {
    return "Sub Property (Chaining)";
  },
  subPropertyOfChaining: function (subC, classes){
    var return_string = "";
    for (var i = 0; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return_string += " is contained in "+decamelize(subC, " ").capitalize(true);
    return return_string;
  },
  sameIndividualText: function () {
    return "The same as"
  },
  sameIndividual: function (classes) {
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" is the same as ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
  differentIndividualsText: function () {
    return "Different From"
  },
  differentIndividuals: function (classes) {
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" is different from ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
  negativeObjectPropertyAssertionText: function (){
    return "Does Not";
  },
  negativeObjectPropertyAssertion: function (subC, superC, rel) {
    return decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)
  },
  objectPropertyAssertionText: function (){
    return "Does";
  },
  objectPropertyAssertion: function (subC, superC, rel) {
    return decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)
  }
}

module.exports = Tswana;
