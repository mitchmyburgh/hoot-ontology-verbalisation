'use strict';

let fs = require('fs');
let xml2js = require('xml2js');


//load the language translations
let language = "simpleEnglish";
let languages = {};
languages["simpleEnglish"] = require('./english/simpleEnglish');
languages["technicalEnglish"] = require('./english/technicalEnglish');


let read_file = function(filename, filepath, cb){
  var parser = new xml2js.Parser();
  fs.readFile(filepath, function(err, data) {
    parser.parseString(data, function (err, result) {
      let classTree = {};
      let outClassTree = [];
      console.log(JSON.stringify(result["Ontology"]));
      //list all clases
      for (let i = 0; i < result["Ontology"]["Declaration"].length; i++){
        if (result["Ontology"]["Declaration"][i]["Class"]){
          classTree[result["Ontology"]["Declaration"][i]["Class"][0]["$"]["IRI"].replace("#", "")] = {
            id: result["Ontology"]["Declaration"][i]["Class"][0]["$"]["IRI"].replace("#", "class_"),
            text: result["Ontology"]["Declaration"][i]["Class"][0]["$"]["IRI"].replace("#", ""),
            icon: "",
            state: {opened: false, disabled: false, selected: false},
            children: [],
            li_attr: {},
            a_attr: {href: result["Ontology"]["Declaration"][i]["Class"][0]["$"]["IRI"]+"_describe"},
            displayOutput: {},
            used: false
          };
        }
      }
      //create text entries for sub classes
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        let superC = result["Ontology"]["SubClassOf"][i]["Class"][1]["$"]["IRI"].replace("#", "");
        !classTree[subC].displayOutput.subClassOf ? classTree[subC].displayOutput.subClassOf = [] : null;
        classTree[subC].displayOutput.subClassOf.push(languages[language].subClassOf(subC, superC));
        classTree[superC].children.push(classTree[subC]);
        classTree[subC].used = true;
      }
      //remove root nodes that are used elsewhere in the tree
      for (let i = 0; i < result["Ontology"]["SubClassOf"].length; i++){
        let subC = result["Ontology"]["SubClassOf"][i]["Class"][0]["$"]["IRI"].replace("#", "");
        if (classTree[subC] && classTree[subC].used) {
          classTree[subC] = null;
        }
      }
      //make into list
      for (var key in classTree) {
        if (classTree.hasOwnProperty(key)) {
          classTree[key] ? outClassTree.push(classTree[key]) : null;
        }
      }
      console.log(JSON.stringify(classTree));
      console.log('Done');
      write_file(filename+".js", [outClassTree], function (path){
        cb(path);
      });
    });
  });
}

let write_file = function (filename, trees, cb){
  var string = "var tree = "+JSON.stringify(trees);
  console.log("../"+filename)
  fs.writeFile("./public/rendered/"+filename, string, function(err) {
    if(err) {
      return console.log(err);
    }

    cb("rendered/"+filename);
  });
}

module.exports = {read_file};
