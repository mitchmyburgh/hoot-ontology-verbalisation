$(function () {
  if (tree){
    //set interface text
    $('#classText').html(tree[0].classText);
    $('#objectPropertyText').html(tree[0].objectPropertyText);
    $('#namedEntitiesText').html(tree[0].namedEntitiesText);
    $('#classTree').jstree({core: {data: tree[1]}});
    $('#relTree').jstree({core: {data: tree[2]}});
  }
  $('#classTree').on("changed.jstree", function (e, data) {
    $("#classDisp").html("");
    if (data.node.original.displayOutput.subClassOf.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.subClassOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subClassOf.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.subClassOf[i]+"</p>");
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
});
