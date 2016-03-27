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
    return (decamelize(subC, " ")).capitalize(true)+" nako tse dingwe "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)
  },
  allValuesFrom: function (subC, superC, rel) {
    return (decamelize(subC, " ")).capitalize(true)+" e nna e "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)
  },
  exactCardinality: function (subC, superC, rel, card) {
    return (decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)+" e le "+card
  },
  minCardinality: function (subC, superC, rel, card) {
    return (decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)+" bonnye , di le "+card
  },
  maxCardinality: function (subC, superC, rel, card) {
    return (decamelize(subC, " ")).capitalize(true)+" "+decamelize(rel, " ")+" "+decamelize(superC, " ").capitalize(true)+" tse di sa feteng "+card+" "
  },
  equivalentClassesText: function () {
    return "Ke gape";
  },
  equivalentClasses: function (subC, superC) {
    return (decamelize(subC, " ")).capitalize(true)+" e ka bitswa "+superC
  },
  disjointWithText: function () {
    return "Mephato e e farologaneng";
  },
  disjointWith: function (classes){
    var return_string = (decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ")).capitalize(true)+" e farologane le ";
    for (var i = 1; i < classes.length; i++){
      return_string += (decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true))
      if (i != classes.length-1){
        return_string += " and ";
      }
    }
    return return_string;
  },
  instancesText: function () {
    return "Karolo";
  },
  instances: function (subC, superC) {
    return "<img src='img/individ.png'></img>"+(decamelize(subC, " ")).capitalize(true)+" ke "+(decamelize(superC, " ").capitalize(true));
  },
  objectPropertyText: function () {
    return "Semelo sa selo";
  },
  subPropertyOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" ke karolo ya "+(decamelize(superR, " ").capitalize(true)));
  },
  subPropertyText: function (){
    return "Ke";
  },
  equivalentRelationsText: function () {
    return "Ke gape"
  },
  equivalentRelations: function (subR, superR){
    return decamelize(subR, " ").capitalize(true)+" e tshwana le "+decamelize(superR, " ").capitalize(true)
  },
  inverseOfText: function () {
    return "Pharologano ";
  },
  inverseOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" e kgatlhanong le  "+decamelize(superR, " ").capitalize(true));
  },
  characteristicsText: function () {
    return "Semelo";
  },
  characteristicsFunctional: function (rel) {
    return "Mophato kgotsa Selo ngwe le ngwe "+decamelize(rel, " ").capitalize(true)+" Mophato kgotsa Selo e le 1";
  },
  characteristicsInverseFunctional: function (rel) {
    return "Mophato kgotsa Selo ngwe le ngwe e e nwewang "+", e "+rel+" ke bonnye Mophato kgotsa Selo e le 1";
  },
  characteristicsTransitive: function (rel) {
    return "Ga A "+decamelize(rel, " ").capitalize(true)+" B le B "+decamelize(rel, " ").capitalize(true)+" C tla diragala gore A "+decamelize(rel, " ").capitalize(true)+" C";
  },
  characteristicsSymmetric: function (rel) {
    return "Ga A "+decamelize(rel, " ").capitalize(true)+" B go tla diragala gore B "+decamelize(rel, " ").capitalize(true)+" A";
  },
  characteristicsAsymmetric: function (rel) {
    return "Ga A "+decamelize(rel, " ").capitalize(true)+" B tla diragala gore B "+decamelize(rel, " ").capitalize(true)+" A ga se nnete";
  },
  characteristicsReflexive: function (rel) {
    return "A "+decamelize(rel, " ").capitalize(true)+" A";
  },
  characteristicsIrreflexive: function (rel) {
    return "A "+decamelize(rel, " ").capitalize(true)+" A ga se nnete";
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
    return "Bonno le Boleng";
  },
  domainPre: function (rel) {
    return "Selo se e leng ";
  },
  domain: function (superC) {
    return (decamelize(superC, " ").capitalize(true))+ " le ";
  },
  domainSome: function (subR, superC) {
    return "nako tse dingwe "+decamelize(subR, " ").capitalize(true)+" "+(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  domainAll: function (subR, superC) {
    return "e nna e "+decamelize(subR, " ").capitalize(true)+" "+(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  domainMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" bonnye "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  domainMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" ga e fete "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
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
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)+"  Selo";
  },
  rangePreNoD: function (text, rel) {
    return " Mophato "+rel+" selo se se "+text.substring(19, text.length-4);
  },
  rangePre: function (rel) {
    return "  selo se se ";
  },
  range: function (superC) {
    return "ke "+(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  rangeSome: function (subR, superC) {
    return "nako tse dingwe "+decamelize(subR, " ").capitalize(true)+" "+(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  rangeAll: function (subR, superC) {
    return "e nna e "+decamelize(subR, " ").capitalize(true)+" "+(decamelize(superC, " ").capitalize(true))+ " le ";
  },
  rangeMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" bonnye "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
  },
  rangeMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" ga e fete "+card+" "+decamelize(superC, " ").capitalize(true)+ " le ";
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
    return "E farologane le ";
  },
  disjointWithOP: function (classes){
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" e farologane le ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " le ";
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
        return_string += " le ";
      }
    }
    return_string += " e tsentswe mo "+decamelize(subC, " ").capitalize(true);
    return return_string;
  },
  sameIndividualText: function () {
    return "E tshwana le"
  },
  sameIndividual: function (classes) {
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" e tshwana le ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " le ";
      }
    }
    return return_string;
  },
  differentIndividualsText: function () {
    return "E farologane le"
  },
  differentIndividuals: function (classes) {
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" e farologane le ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " le ";
      }
    }
    return return_string;
  },
  negativeObjectPropertyAssertionText: function (){
    return "Ga e";
  },
  negativeObjectPropertyAssertion: function (subC, superC, rel) {
    return decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)
  },
  objectPropertyAssertionText: function (){
    return "E dira ";
  },
  objectPropertyAssertion: function (subC, superC, rel) {
    return decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)
  }
}

module.exports = Tswana;
