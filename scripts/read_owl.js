'use strict';

let fs = require('fs');
let xml2js = require('xml2js');


//load the language translations
let language = "simpleEnglish";
let languages = {};
languages["simpleEnglish"] = require('./english/simpleEnglish');
languages["technicalEnglish"] = require('./english/technicalEnglish');
languages["Afrikaans"] = require('./afrikaans/Afrikaans');
languages["Tswana"] = require('./tswana/Tswana');


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
            icon: "",
            state: {opened: false, disabled: false, selected: false},
            children: [],
            li_attr: {},
            a_attr: {href: clas+"_describe"},
            displayOutput: {},
            used: false
          };
          !classTree[clas.replace("#", "")].displayOutput.subClassOf ? classTree[clas.replace("#", "")].displayOutput.subClassOf = [languages[language].subClassText()] : null;
        }
      }
      //list all relations
      for (let i = 0; i < result["Ontology"]["Declaration"].length; i++){
        if (result["Ontology"]["Declaration"][i]["ObjectProperty"]){
          let rel = result["Ontology"]["Declaration"][i]["ObjectProperty"][0]["$"]["IRI"];
          relTree[rel.replace("#", "")] = {
            id: rel.replace("#", "rel_"),
            text: rel.replace("#", ""),
            icon: "",
            state: {opened: false, disabled: false, selected: false},
            children: [],
            li_attr: {},
            a_attr: {href: rel+"_describe"},
            displayOutput: {},
            used: false
          };
          !relTree[rel.replace("#", "")].displayOutput.subPropertyOf ? relTree[rel.replace("#", "")].displayOutput.subPropertyOf = [languages[language].subPropertyText()] : null;
        }
      }
      //create text entries for sub classes + build tree structure
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        let superC = result["Ontology"]["SubClassOf"][i]["Class"][1]["$"]["IRI"].replace("#", "");
        classTree[subC].displayOutput.subClassOf.push(languages[language].subClassOf(subC, superC));
        classTree[superC].children.push(classTree[subC]);
        classTree[subC].used = true;
      }
      //create text entries for sub relations + build tree structure
      for (let i = 0; i < result["Ontology"]["SubObjectPropertyOf"].length; i++){
        let subC = result["Ontology"]["SubObjectPropertyOf"][i]["ObjectProperty"][0]["$"]["IRI"].replace("#", "");
        let superC = result["Ontology"]["SubObjectPropertyOf"][i]["ObjectProperty"][1]["$"]["IRI"].replace("#", "");
        relTree[subC].displayOutput.subPropertyOf.push(languages[language].subPropertyOf(subC, superC));
        relTree[superC].children.push(relTree[subC]);
        relTree[subC].used = true;
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
      console.log(JSON.stringify(classTree));
      console.log('Done');
      write_file(filename+".js", [intText, outClassTree, outRelTree], function (path){
        cb(path);
      });
    });
  });
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
