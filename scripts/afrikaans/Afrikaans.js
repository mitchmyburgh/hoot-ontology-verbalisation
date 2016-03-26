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
    return "Opposites";
  },
  inverseOf: function (subR, superR) {
    return (decamelize(subR, " ").capitalize(true)+" is the opposite of "+decamelize(superR, " ").capitalize(true));
  },
}

module.exports = simpleEnglish;
