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
    return "Klasse";
  },
  subClassOf: function (subC, superC) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" is 'n "+decamelize(superC, " ").capitalize(true);
  },
  subClassText: function (){
    return "Is 'n";
  },
  //object restrictions
  someValuesFrom: function (subC, superC, rel) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ")+" soms "+decamelize(superC, " ").capitalize(true)
  },
  allValuesFrom: function (subC, superC, rel) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ")+" altyd "+decamelize(superC, " ").capitalize(true)
  },
  exactCardinality: function (subC, superC, rel, card) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ")+" presies "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  minCardinality: function (subC, superC, rel, card) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ")+" ten minste "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  maxCardinality: function (subC, superC, rel, card) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ")+" by die meeste "+card+" "+decamelize(superC, " ").capitalize(true)
  },
  equivalentClassesText: function () {
    return "Is ook ";
  },
  equivalentClasses: function (subC, superC) {
    return "'n "+decamelize(subC, " ").capitalize(true)+" is dieselfde as "+articles.articlize(decamelize(superC, " ").capitalize(true))
  },
  disjointWithText: function () {
    return "Verskillende Klasse";
  },
  disjointWith: function (classes){
    var return_string = "'n "+decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" verskil van ";
    for (var i = 1; i < classes.length; i++){
      return_string += "'n "+decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " en ";
      }
    }
    return return_string;
  },
  instancesText: function () {
    return "Gevalle";
  },
  instances: function (subC, superC) {
    return "<img src='img/individ.png'></img>"+"'n "+decamelize(subC, " ").capitalize(true)+" is n' "+decamelize(superC, " ").capitalize(true);
  },
  objectPropertyText: function () {
    return "Objek Eienskappe";
  },
  subPropertyOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is 'n "+decamelize(superR, " ").capitalize(true));
  },
  subPropertyText: function (){
    return "Is 'n";
  },
  equivalentRelationsText: function () {
    return "Is Ook"
  },
  equivalentRelations: function (subR, superR){
    return "'n "+decamelize(subR, " ").capitalize(true)+" is dieselfde as 'n"+decamelize(superR, " ").capitalize(true)
  },
  characteristicsText: function () {
    return "Eienskappe";
  },
  characteristicsFunctional: function (rel) {
    return "Elke Klas or Objek "+decamelize(rel, " ").capitalize(true)+" slegs 1 Klass of Objek";
  },
  characteristicsInverseFunctional: function (rel) {
    return "Elke Klas of Objek wat "+pastTense[rel]+", is slegs "+pastTense[rel]+" by 1 Klass of Objek";
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
    return "Vernoem Entiteite";
  },
  subObjectText: function () {
    return "Ouer";
  },
  subObjectOf: function (subC, superC) {
    return decamelize(subC, " ").capitalize(true) + " is 'n tipe " + decamelize(superC, " ").capitalize(true);
  },
  inverseOfText: function () {
    return "Teenoorgesteldes";
  },
  inverseOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is die teenoorgestelde van "+decamelize(superR, " ").capitalize(true));
  },

 domainAndRangeText: function () {
    return "Definisieversameling en Waardeversameling";
  },
  domainPre: function (rel) {
    return "'n objek wat ";
  },
  domain: function (superC) {
    return "is "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  domainSome: function (subR, superC) {
    return "soms "+decamelize(subR, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  domainAll: function (subR, superC) {
    return "altyd "+decamelize(subR, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  domainMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" ten minste "+card+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  domainMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" by die meeste "+card+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  domainExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" presies "+card+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  domainTrim: function(text){
    return text.substring(0, text.length-4);
  },
  domainPost: function (text, subR){
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)
  },
  domainPostNoR: function (text, subR){
    return this.domainTrim(text)+decamelize(subR, " ").capitalize(true)+" 'n Objek";
  },
  rangePreNoD: function (text, rel) {
    return "A klas "+rel+" 'n objek wat is "+text.substring(19, text.length-4);
  },
  rangePre: function (rel) {
    return " 'n objek wat ";
  },
  range: function (superC) {
    return "is "+articles.articlize(decamelize(superC, " ").capitalize(true))+ " en ";
  },
  rangeSome: function (subR, superC) {
    return "soms "+decamelize(subR, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  rangeAll: function (subR, superC) {
    return "altyd "+decamelize(subR, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  rangeMin: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" ten minste "+card+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  rangeMax: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" by die meeste "+card+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  rangeExactly: function (subR, superC, card) {
    return decamelize(subR, " ").capitalize(true)+" presies "+card+" "+decamelize(superC, " ").capitalize(true)+ " en ";
  },
  rangeTrim: function(text){
    return text.substring(0, text.length-4);
  },
  rangePost: function (text, subR){
    return this.rangeTrim(text)
  },
  disjointWithOPText: function () {
    return "Verskil Van";
  },
  disjointWithOP: function (classes){
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" verskil van ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " en ";
      }
    }
    return return_string;
  },
  subPropertyOfChainingText: function () {
    return "Sub Property (Anneenskakeling)";
  },
  subPropertyOfChaining: function (subC, classes){
    var return_string = "";
    for (var i = 0; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " en ";
      }
    }
    return_string += " is vervat in "+decamelize(subC, " ").capitalize(true);
    return return_string;
  },
  sameIndividualText: function () {
    return "Die selfde as"
  },
  sameIndividual: function (classes) {
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" is die selde as as ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " en ";
      }
    }
    return return_string;
  },
  differentIndividualsText: function () {
    return "Verskil Van"
  },
  differentIndividuals: function (classes) {
    var return_string = decamelize(classes[0]["$"]["IRI"].replace("#", ""), " ").capitalize(true)+" verskil van ";
    for (var i = 1; i < classes.length; i++){
      return_string += decamelize(classes[i]["$"]["IRI"].replace("#", ""), " ").capitalize(true)
      if (i != classes.length-1){
        return_string += " en ";
      }
    }
    return return_string;
  },
  negativeObjectPropertyAssertionText: function (){
    return "Doen Nie";
  },
  negativeObjectPropertyAssertion: function (subC, superC, rel) {
    return decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)
  },
  objectPropertyAssertionText: function (){
    return "Doen";
  },
  objectPropertyAssertion: function (subC, superC, rel) {
    return decamelize(subC, " ").capitalize(true)+" "+decamelize(rel, " ").capitalize(true)+" "+decamelize(superC, " ").capitalize(true)
  }
}

module.exports = simpleEnglish;
