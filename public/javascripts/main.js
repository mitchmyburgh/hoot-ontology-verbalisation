$(function () {
  //Language Dropdown
  $(".dropdown-menu li a").click(function(){
    $("#dropdownMenu1").html($(this).text()+' <span class="caret"></span>');
    $("#dropdownMenu1").val($(this).attr("value"));
    $("#language_select").val($(this).attr("value"));
  });
  $("#classParDisp").hide();
  $("#relParDisp").hide();
  $("#neParDisp").hide();
  $('#toggle-par-class').bootstrapToggle('off')
  $('#toggle-par-rel').bootstrapToggle('off')
  $('#toggle-par-ne').bootstrapToggle('off')
  $('#toggle-par-class').change(function() {
    if ($(this).prop('checked')){
      $("#classParDisp").show();
      $("#classDisp").hide();
    } else {
      $("#classParDisp").hide();
      $("#classDisp").show();
    }
  })
  $('#toggle-par-rel').change(function() {
    if ($(this).prop('checked')){
      $("#relParDisp").show();
      $("#relDisp").hide();
    } else {
      $("#relParDisp").hide();
      $("#relDisp").show();
    }
  })
  $('#toggle-par-ne').change(function() {
    if ($(this).prop('checked')){
      $("#neParDisp").show();
      $("#neDisp").hide();
    } else {
      $("#neParDisp").hide();
      $("#neDisp").show();
    }
  })
  if (typeof tree !== 'undefined'){
    $("#classPanel").show();
    $("#relPanel").show();
    $("#nePanel").show();
    //set interface text
    $('#classText').html(tree[0].classText);
    $('#objectPropertyText').html(tree[0].objectPropertyText);
    $('#namedEntitiesText').html(tree[0].namedEntitiesText);
    $('#classTree').jstree({core: {data: tree[1]}});
    $('#relTree').jstree({core: {data: tree[2]}});
    $('#neTree').jstree({core: {data: tree[3]}});
  } else {
    $("#classPanel").hide();
    $("#relPanel").hide();
    $("#nePanel").hide();
  }
  //classes
  $('#classTree').on("changed.jstree", function (e, data) {
    //clear the content
    $("#classDisp").html("");
    $("#classParDisp").html("");
    $("#classParDisp").append("<h3>"+data.node.original.text+"</h3>");
    $("#classParDisp").append("<p>");
    //equivalentClasses
    if (data.node.original.displayOutput.equivalentClasses.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.equivalentClasses[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.equivalentClasses.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.equivalentClasses[i]+"</p>");
      $("#classParDisp").append(data.node.original.displayOutput.equivalentClasses[i]+". ");
    }
    //subClassOf
    if (data.node.original.displayOutput.subClassOf.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.subClassOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subClassOf.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.subClassOf[i]+"</p>");
      $("#classParDisp").append(data.node.original.displayOutput.subClassOf[i]+". ");
    }
    //disjointWith
    if (data.node.original.displayOutput.disjointWith.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.disjointWith[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.disjointWith.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.disjointWith[i]+"</p>");
      $("#classParDisp").append(data.node.original.displayOutput.disjointWith[i]+". ");
    }
    //instances
    if (data.node.original.displayOutput.instances.length > 1){
      $("#classDisp").append("<h3>"+data.node.original.displayOutput.instances[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.instances.length; i++){
      $("#classDisp").append("<p>"+data.node.original.displayOutput.instances[i]+"</p>");
      $("#classParDisp").append(data.node.original.displayOutput.instances[i]+". ");
    }
    $("#classParDisp").append("</p>");
  });

  $('#relTree').on("changed.jstree", function (e, data) {
    //cleat the content
    $("#relDisp").html("");
    $("#relParDisp").html("");
    $("#relParDisp").append("<h3>"+data.node.original.text+"</h3>");
    $("#relParDisp").append("<p>");
    //equivalent relations
    if (data.node.original.displayOutput.equivalentRelations.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.equivalentRelations[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.equivalentRelations.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.equivalentRelations[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.equivalentRelations[i]+". ");
    }
    //subPropertyOf
    if (data.node.original.displayOutput.subPropertyOf.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.subPropertyOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subPropertyOf.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.subPropertyOf[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.subPropertyOf[i]+". ");
    }
    //inverse of
    if (data.node.original.displayOutput.inverseOf.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.inverseOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.inverseOf.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.inverseOf[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.inverseOf[i]+". ");
    }
    // characteristics
    if (data.node.original.displayOutput.characteristics.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.characteristics[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.characteristics.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.characteristics[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.characteristics[i]+". ");
    }
    // domain and range
    if (data.node.original.displayOutput.domainAndRange.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.domainAndRange[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.domainAndRange.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.domainAndRange[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.domainAndRange[i]+". ");
    }
    // disjoint
    if (data.node.original.displayOutput.disjointWithOP.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.disjointWithOP[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.disjointWithOP.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.disjointWithOP[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.disjointWithOP[i]+". ");
    }
    // sub property chaining
    if (data.node.original.displayOutput.subPropertyOfChaining.length > 1){
      $("#relDisp").append("<h3>"+data.node.original.displayOutput.subPropertyOfChaining[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subPropertyOfChaining.length; i++){
      $("#relDisp").append("<p>"+data.node.original.displayOutput.subPropertyOfChaining[i]+"</p>");
      $("#relParDisp").append(data.node.original.displayOutput.subPropertyOfChaining[i]+". ");
    }
    $("#relParDisp").append("</p>");
  });
  $('#neTree').on("changed.jstree", function (e, data) {
    $("#neDisp").html("");
    $("#neParDisp").html("");
    $("#neParDisp").append("<h3>"+data.node.original.text+"</h3>");
    $("#neParDisp").append("<p>");
    // sub object of
    if (data.node.original.displayOutput.subObjectOf.length > 1){
      $("#neDisp").append("<h3>"+data.node.original.displayOutput.subObjectOf[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.subObjectOf.length; i++){
      $("#neDisp").append("<p>"+data.node.original.displayOutput.subObjectOf[i]+"</p>");
      $("#neParDisp").append(data.node.original.displayOutput.subObjectOf[i]+". ");
    }
    // same individual
    if (data.node.original.displayOutput.sameIndividual.length > 1){
      $("#neDisp").append("<h3>"+data.node.original.displayOutput.sameIndividual[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.sameIndividual.length; i++){
      $("#neDisp").append("<p>"+data.node.original.displayOutput.sameIndividual[i]+"</p>");
      $("#neParDisp").append(data.node.original.displayOutput.sameIndividual[i]+". ");
    }
    // different individual
    if (data.node.original.displayOutput.differentIndividuals.length > 1){
      $("#neDisp").append("<h3>"+data.node.original.displayOutput.differentIndividuals[0]+"</h3>");
    }
    for (var i = 1; i < data.node.original.displayOutput.differentIndividuals.length; i++){
      $("#neDisp").append("<p>"+data.node.original.displayOutput.differentIndividuals[i]+"</p>");
      $("#neParDisp").append(data.node.original.displayOutput.differentIndividuals[i]+". ");
    }
    $("#neParDisp").append("</p>");
  });
});
