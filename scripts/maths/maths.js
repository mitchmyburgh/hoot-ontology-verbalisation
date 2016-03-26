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
  //object restrictions
  someValuesFrom: function (subC, superC, rel) {
    return subC+"  &#8849;  &#8707;"+rel+"."+superC;
  },
  allValuesFrom: function (subC, superC, rel) {
    return subC+"  &#8849;  &#8704;"+rel+"."+superC;
  },
  exactCardinality: function (subC, superC, rel, card) {
    return subC+"  &#8849;  ="+card+rel+"."+superC;
  },
  minCardinality: function (subC, superC, rel, card) {
    return subC+"  &#8849;  &#8805;"+card+rel+"."+superC;
  },
  maxCardinality: function (subC, superC, rel, card) {
    return subC+"  &#8849;  &#8804;"+card+rel+"."+superC;
  },
  equivalentClassesText: function () {
    return "Equivalent To";
  },
  equivalentClasses: function (subC, superC) {
    return subC+" &#8801; "+superC;
  },
  disjointWithText: function () {
    return "Disjoint Classes";
  },
  disjointWith: function (classes){
    var return_string = "";
    return_string += classes[0]["$"]["IRI"].replace("#", "")+" &#8851; (";
    for (var i = 1; i < classes.length; i++){
      return_string += classes[i]["$"]["IRI"].replace("#", "")
      if (i != classes.length-1){
        return_string += " &#8852; ";
      }
    }
    return_string += ") &#8849;  &#8869;";
    return return_string;
  },
  instancesText: function () {
    return "Instances";
  },
  instances: function (subC, superC) {
    return "<img src='img/individ.png'></img>"+subC+" &#8849; "+superC;
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
  equivalentRelationsText: function () {
    return "Equivalent To"
  },
  equivalentRelations: function (subR, superR){
    return subR+" &#8801; "+superR;
  },
  characteristicsText: function () {
    return "Characteristics";
  },
  characteristicsFunctional: function (rel) {
    return "&#8704;x &#8707;!y:"+rel+"(x,y)";
  },
  characteristicsInverseFunctional: function (rel) {
    return "&#8704;y &#8707;!x:"+rel+"(x,y)";
  },
  characteristicsTransitive: function (rel) {
    return "&#8704;x,y,z "+rel+"(x,y) &#8743; "+rel+"(y,z) &#8658; "+rel+"(x,z)";
  },
  characteristicsSymmetric: function (rel) {
    return "&#8704;x,y "+rel+"(x,y) &#8658; "+rel+"(y,x)";
  },
  characteristicsAsymmetric: function (rel) {
    return "&#8704;x,y "+rel+"(x,y) &#8658; &#172;"+rel+"(y,x)";
  },
  characteristicsReflexive: function (rel) {
    return "&#8704;x "+rel+"(x,x)";
  },
  characteristicsIrreflexive: function (rel) {
    return "&#8704;x &#172;"+rel+"(x,x)";
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
