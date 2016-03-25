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
  $('#classTree').on("changed.jstree", function (e, data) {
    $("#classDisp").html("");
    if (data.node.original.displayOutput.subClassOf.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.subClassOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subClassOf.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.subClassOf[i]+"</p>");
    }
    if (data.node.original.displayOutput.disjointWith.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.disjointWith[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.disjointWith.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.disjointWith[i]+"</p>");
    }
  });

  $('#relTree').on("changed.jstree", function (e, data) {
    $("#relDisp").html("");
    if (data.node.original.displayOutput.subPropertyOf.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.subPropertyOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subPropertyOf.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.subPropertyOf[i]+"</p>");
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
