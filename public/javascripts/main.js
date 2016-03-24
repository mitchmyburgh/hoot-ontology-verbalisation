$(function () {
  if (tree){
    console.log(tree[0]);
    $('#classTree').jstree({core: {data: tree[0]}});
  }
  $('#jstree_demo_div').on("changed.jstree", function (e, data) {
    console.log(data.selected);
  });
});
