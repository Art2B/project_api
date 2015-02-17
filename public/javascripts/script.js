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

$('#js-edit').click(function(event) {
  var params = 'name='+$('#name').val()+'&placeType='+$('#placetype').val()+'&stars='+$('#stars').val();
  var id = $('#form').data('id').substring(1).slice(0,-1);
  var weburl = "/reviews/edit/"+id+'?'+params;
  var request = new XMLHttpRequest();
  request.open("PUT", weburl, true);
  request.send(params);
  document.location.href = "/reviews";
});