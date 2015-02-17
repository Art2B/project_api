$('#js-delete').click(function(event) {
	console.log('salut');
  var id = $(this).data('id').substring(1).slice(0,-1);
  var weburl = "reviews/delete/"+id;
  console.log(weburl);
  var request = new XMLHttpRequest();
  request.open("DELETE", weburl, true);
  request.send();
  location.reload();
});