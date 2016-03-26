$(function () {
  if (tree){
    //set interface text
    $('#classText').html(tree[0].classText);
    $('#objectPropertyText').html(tree[0].objectPropertyText);
    $('#namedEntitiesText').html(tree[0].namedEntitiesText);
    $('#classTree').jstree({core: {data: tree[1]}});
    $('#relTree').jstree({core: {data: tree[2]}});
    $('#neTree').jstree({core: {data: tree[3]}});
  }
  //classes
  $('#classTree').on("changed.jstree", function (e, data) {
    //clear the content
    $("#classDisp").html("");
    //equivalentClasses
    if (data.node.original.displayOutput.equivalentClasses.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.equivalentClasses[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.equivalentClasses.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.equivalentClasses[i]+"</p>");
    }
    //subClassOf
    if (data.node.original.displayOutput.subClassOf.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.subClassOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subClassOf.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.subClassOf[i]+"</p>");
    }
    //disjointWith
    if (data.node.original.displayOutput.disjointWith.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.disjointWith[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.disjointWith.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.disjointWith[i]+"</p>");
    }
    //instances
    if (data.node.original.displayOutput.instances.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.instances[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.instances.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.instances[i]+"</p>");
    }
  });

  $('#relTree').on("changed.jstree", function (e, data) {
    //cleat the content
    $("#relDisp").html("");
    //equivalent relations
    if (data.node.original.displayOutput.equivalentRelations.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.equivalentRelations[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.equivalentRelations.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.equivalentRelations[i]+"</p>");
    }
    //subPropertyOf
    if (data.node.original.displayOutput.subPropertyOf.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.subPropertyOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subPropertyOf.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.subPropertyOf[i]+"</p>");
    }
    // characteristics
    if (data.node.original.displayOutput.characteristics.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.characteristics[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.characteristics.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.characteristics[i]+"</p>");
    }
  });
  $('#neTree').on("changed.jstree", function (e, data) {
    $("#neDisp").html("");
    if (data.node.original.displayOutput.subObjectOf.length > 1){
      $("#neDisp").append("<h3>"+data.node.original.displayOutput.subObjectOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subObjectOf.length; i++){
      $("#neDisp").append("<p>"+data.node.original.displayOutput.subObjectOf[i]+"</p>");
    }
  });
});
