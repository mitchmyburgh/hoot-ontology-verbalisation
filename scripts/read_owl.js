'use strict';

let fs = require('fs');
let xml2js = require('xml2js');
var shortid = require('shortid');

//load the language translations
let language = "technicalEnglish";
let languages = {};
languages["simpleEnglish"] = require('./english/simpleEnglish');
languages["technicalEnglish"] = require('./english/technicalEnglish');
languages["Afrikaans"] = require('./afrikaans/Afrikaans');
languages["Tswana"] = require('./tswana/Tswana');
languages["maths"] = require('./maths/maths');


let read_file = function(filename, filepath, cb){
  var parser = new xml2js.Parser();
  fs.readFile(filepath, function(err, data) {
    parser.parseString(data, function (err, result) {
      //interface text
      let intText = {}
      //class tree structure
      let classTree = {};
      let outClassTree = [];
      //relationship tree structure
      let relTree = {};
      let outRelTree = [];
      //named Entity tree structure
      let neTree = {};
      let outNeTree = [];
      //Write interface text translations
      intText.classText = languages[language].classText();
      intText.objectPropertyText = languages[language].objectPropertyText();
      intText.namedEntitiesText = languages[language].namedEntitiesText();
      //list all clases
      for (let i = 0; i < result["Ontology"]["Declaration"].length; i++){
        if (result["Ontology"]["Declaration"][i]["Class"]){
          let clas = result["Ontology"]["Declaration"][i]["Class"][0]["$"]["IRI"];
          classTree[clas.replace("#", "")] = {
            id: clas.replace("#", "class_"),
            text: clas.replace("#", ""),
            icon: "img/class.png",
            state: {opened: false, disabled: false, selected: false},
            children: [],
            li_attr: {},
            a_attr: {href: clas+"_describe"},
            displayOutput: {},
            used: false
          };
          !classTree[clas.replace("#", "")].displayOutput.subClassOf ? classTree[clas.replace("#", "")].displayOutput.subClassOf = [languages[language].subClassText()] : null;
          !classTree[clas.replace("#", "")].displayOutput.disjointWith ? classTree[clas.replace("#", "")].displayOutput.disjointWith = [languages[language].disjointWithText()] : null;
          !classTree[clas.replace("#", "")].displayOutput.instances ? classTree[clas.replace("#", "")].displayOutput.instances = [languages[language].instancesText()] : null;
          !classTree[clas.replace("#", "")].displayOutput.equivalentClasses ? classTree[clas.replace("#", "")].displayOutput.equivalentClasses = [languages[language].equivalentClassesText()] : null;
        }
      }
      //list all relations
      for (let i = 0; i < result["Ontology"]["Declaration"].length; i++){
        if (result["Ontology"]["Declaration"][i]["ObjectProperty"]){
          let rel = result["Ontology"]["Declaration"][i]["ObjectProperty"][0]["$"]["IRI"];
          relTree[rel.replace("#", "")] = {
            id: rel.replace("#", "rel_"),
            text: rel.replace("#", ""),
            icon: "img/relation.png",
            state: {opened: false, disabled: false, selected: false},
            children: [],
            li_attr: {},
            a_attr: {href: rel+"_describe"},
            displayOutput: {},
            used: false
          };
          !relTree[rel.replace("#", "")].displayOutput.subPropertyOf ? relTree[rel.replace("#", "")].displayOutput.subPropertyOf = [languages[language].subPropertyText()] : null;
          !relTree[rel.replace("#", "")].displayOutput.characteristics ? relTree[rel.replace("#", "")].displayOutput.characteristics = [languages[language].characteristicsText()] : null;
        }
      }

      //list all named entities
      for (let i = 0; i < result["Ontology"]["Declaration"].length; i++){
        if (result["Ontology"]["Declaration"][i]["NamedIndividual"]){
          let ne = result["Ontology"]["Declaration"][i]["NamedIndividual"][0]["$"]["IRI"];
          neTree[ne.replace("#", "")] = {
            id: ne.replace("#", "ne_"),
            text: ne.replace("#", ""),
            icon: "img/individ.png",
            state: {opened: false, disabled: false, selected: false},
            children: [],
            li_attr: {},
            a_attr: {href: ne+"_describe"},
            displayOutput: {},
            used: false
          };
          !neTree[ne.replace("#", "")].displayOutput.subObjectOf ? neTree[ne.replace("#", "")].displayOutput.subObjectOf = [languages[language].subObjectText()] : null;
        }
      }
      //create text entries for sub classes + build tree structure
      var classTree2 = JSON.parse(JSON.stringify(classTree));
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        if (result["Ontology"]["SubClassOf"][i]["Class"].length >1){
          let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
          let superC = result["Ontology"]["SubClassOf"][i]["Class"][1]["$"]["IRI"].replace("#", "");
          classTree[subC].displayOutput.subClassOf.push(languages[language].subClassOf(subC, superC));
          if (classTree[subC].used){
            classTree[subC].id+= shortid.generate();
          }
          classTree[superC].children.push(classTree[subC]);
          classTree[subC].used = true;
        }
      }
      //Equivalent Classes
      for (let i = 0; i < result["Ontology"]["EquivalentClasses"].length; i++){
        let subC = result["Ontology"]["EquivalentClasses"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        let superC = result["Ontology"]["EquivalentClasses"][i]["Class"][1]["$"]["IRI"].replace("#", "");
        classTree[subC].displayOutput.equivalentClasses.push(languages[language].equivalentClasses(subC, superC));
      }
      //Disjoint Classes
      for (let i = 0; i < result["Ontology"]["DisjointClasses"].length; i++){
        let subC = result["Ontology"]["DisjointClasses"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        classTree[subC].displayOutput.disjointWith.push(languages[language].disjointWith(result["Ontology"]["DisjointClasses"][i]["Class"]));
      }
      //object relation restrictions
      var classTree2 = JSON.parse(JSON.stringify(classTree));
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        if (result["Ontology"]["SubClassOf"][i]["ObjectSomeValuesFrom"]){
          let superC = result["Ontology"]["SubClassOf"][i]["ObjectSomeValuesFrom"][0]["Class"][0]["$"]["IRI"].replace("#", "");
          let rel = result["Ontology"]["SubClassOf"][i]["ObjectSomeValuesFrom"][0]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
          classTree[subC].displayOutput.subClassOf.push(languages[language].someValuesFrom(subC, superC, rel));
        } else if (result["Ontology"]["SubClassOf"][i]["ObjectAllValuesFrom"]){
          let superC = result["Ontology"]["SubClassOf"][i]["ObjectAllValuesFrom"][0]["Class"][0]["$"]["IRI"].replace("#", "");
          let rel = result["Ontology"]["SubClassOf"][i]["ObjectAllValuesFrom"][0]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
          classTree[subC].displayOutput.subClassOf.push(languages[language].allValuesFrom(subC, superC, rel));
        } else if (result["Ontology"]["SubClassOf"][i]["ObjectExactCardinality"]){
          let superC = result["Ontology"]["SubClassOf"][i]["ObjectExactCardinality"][0]["Class"][0]["$"]["IRI"].replace("#", "");
          let rel = result["Ontology"]["SubClassOf"][i]["ObjectExactCardinality"][0]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
          let card = result["Ontology"]["SubClassOf"][i]["ObjectExactCardinality"][0]["$"]["cardinality"];
          classTree[subC].displayOutput.subClassOf.push(languages[language].exactCardinality(subC, superC, rel, card));
        } else if (result["Ontology"]["SubClassOf"][i]["ObjectMinCardinality"]){
          let superC = result["Ontology"]["SubClassOf"][i]["ObjectMinCardinality"][0]["Class"][0]["$"]["IRI"].replace("#", "");
          let rel = result["Ontology"]["SubClassOf"][i]["ObjectMinCardinality"][0]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
          let card = result["Ontology"]["SubClassOf"][i]["ObjectMinCardinality"][0]["$"]["cardinality"];
          classTree[subC].displayOutput.subClassOf.push(languages[language].minCardinality(subC, superC, rel, card));
        } else if (result["Ontology"]["SubClassOf"][i]["ObjectMaxCardinality"]){
          let superC = result["Ontology"]["SubClassOf"][i]["ObjectMaxCardinality"][0]["Class"][0]["$"]["IRI"].replace("#", "");
          let rel = result["Ontology"]["SubClassOf"][i]["ObjectMaxCardinality"][0]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
          let card = result["Ontology"]["SubClassOf"][i]["ObjectMaxCardinality"][0]["$"]["cardinality"];
          classTree[subC].displayOutput.subClassOf.push(languages[language].maxCardinality(subC, superC, rel, card));
        }

      }
      //create text entries for sub relations + build tree structure
      for (let i = 0; i < result["Ontology"]["SubObjectPropertyOf"].length; i++){
        let subC = result["Ontology"]["SubObjectPropertyOf"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        let superC = result["Ontology"]["SubObjectPropertyOf"][i]["ObjectProperty"][1]["$"]["IRI"].replace("#", "");
        relTree[subC].displayOutput.subPropertyOf.push(languages[language].subPropertyOf(subC, superC));
        if (relTree[subC].used){
          relTree[subC].id+= shortid.generate();
        }
        relTree[superC].children.push(relTree[subC]);
        relTree[subC].used = true;
      }
      // Characteristics
      // Functional char
      for (let i = 0; i < result["Ontology"]["FunctionalObjectProperty"].length; i++){
        let rel = result["Ontology"]["FunctionalObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsFunctional(rel));
      }
      //inverse functional
      for (let i = 0; i < result["Ontology"]["InverseFunctionalObjectProperty"].length; i++){
        let rel = result["Ontology"]["InverseFunctionalObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsInverseFunctional(rel));
      }
      //symmetric
      for (let i = 0; i < result["Ontology"]["SymmetricObjectProperty"].length; i++){
        let rel = result["Ontology"]["SymmetricObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsSymmetric(rel));
      }
      //asymmetric
      for (let i = 0; i < result["Ontology"]["AsymmetricObjectProperty"].length; i++){
        let rel = result["Ontology"]["AsymmetricObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsAsymmetric(rel));
      }
      //Transitive
      for (let i = 0; i < result["Ontology"]["TransitiveObjectProperty"].length; i++){
        let rel = result["Ontology"]["TransitiveObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsTransitive(rel));
      }
      //Reflexive
      for (let i = 0; i < result["Ontology"]["ReflexiveObjectProperty"].length; i++){
        let rel = result["Ontology"]["ReflexiveObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsReflexive(rel));
      }
      //irreflexive
      for (let i = 0; i < result["Ontology"]["IrreflexiveObjectProperty"].length; i++){
        let rel = result["Ontology"]["IrreflexiveObjectProperty"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        relTree[rel].displayOutput.characteristics.push(languages[language].characteristicsIrreflexive(rel));
      }
      //create text entries for sub objects + build tree structure
      for (let i = 0; i < result["Ontology"]["ClassAssertion"].length; i++){
        let subC = result["Ontology"]["ClassAssertion"][i]["NamedIndividual"][0]["$"]["IRI"].replace("#", "");
        let superC = result["Ontology"]["ClassAssertion"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        neTree[subC].displayOutput.subObjectOf.push(languages[language].subObjectOf(subC, superC));
        classTree[superC].displayOutput.instances.push(languages[language].instances(subC, superC));
        classTree2[superC].children.push(neTree[subC]);
        neTree[subC].used = true;
      }
      //complete tree structure for ne tree
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        if (result["Ontology"]["SubClassOf"][i]["Class"].length >1){
          let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
          let superC = result["Ontology"]["SubClassOf"][i]["Class"][1]["$"]["IRI"].replace("#", "");
          classTree2[subC].displayOutput.subClassOf.push(languages[language].subClassOf(subC, superC));
          if (classTree2[subC].used){
            classTree2[subC].id+= shortid.generate();
          }
          classTree2[superC].children.push(classTree2[subC]);
          classTree2[subC].used = true;
        }
      }

      //remove class root nodes that are used elsewhere in the tree
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        if (classTree[subC] && classTree[subC].used) {
          classTree[subC] = null;
        }
      }
      //remove rel root nodes that are used elsewhere in the tree
      for (let i = 0; i < result["Ontology"]["SubObjectPropertyOf"].length; i++){
        let subC = result["Ontology"]["SubObjectPropertyOf"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        if (relTree[subC] && relTree[subC].used) {
          relTree[subC] = null;
        }
      }
      //remove named entities root nodes that are used elsewhere in the tree
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        if (classTree2[subC]) {
          classTree2[subC].id = classTree2[subC].id+'_ne';
        }
        if (classTree2[subC] && classTree2[subC].used) {
          classTree2[subC] = null;
        }
      }
      //make class tree into list
      for (var key in classTree) {
        if (classTree.hasOwnProperty(key)) {
          classTree[key] ? outClassTree.push(classTree[key]) : null;
        }
      }
      //make rel tree into list
      for (var key in relTree) {
        if (relTree.hasOwnProperty(key)) {
          relTree[key] ? outRelTree.push(relTree[key]) : null;
        }
      }
      //make named entity tree into list
      for (var key in classTree2) {
        if (classTree2.hasOwnProperty(key)) {
          classTree2[key] ? outNeTree.push(classTree2[key]) : null;
        }
      }
      console.log('Done');
      write_file(filename+".js", [intText, outClassTree, outRelTree, outNeTree], function (path){
        cb(path);
      });
    });
  });
}

function changeIds(obj)
{
  for (var k in obj)
  {
    if (!obj.hasOwnProperty(k))
        continue;
    if (typeof obj[k] == "object" && obj[k] !== null){
      console.log(obj[k].id)
      obj[k].id += shortid.generate();
      changeIds(obj[k]);
    } else {
      obj[k].id += shortid.generate();
    }
  }
}

let write_file = function (filename, trees, cb) {
  let string = "var tree = "+JSON.stringify(trees);
  console.log("../"+filename)
  fs.writeFile("./public/rendered/"+filename, string, function(err) {
    if(err) {
      return console.log(err);
    }

    cb("rendered/"+filename);
  });
}

module.exports = {read_file};
