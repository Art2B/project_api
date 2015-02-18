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

$('#js-create').click(function(event) {
  var newItem = {};

  if($('#name').val() != '' && $('#placetype').val() != '' && $('#stars').val() != ''){
    var params = 'name='+$('#name').val()+'&placeType='+$('#placetype').val()+'&stars='+$('#stars').val();
    var weburl = "/reviews/new?"+params;
    var request = new XMLHttpRequest();
    request.open("POST", weburl, true);
    request.send(params);
    document.location.href = "/reviews";
  } else {
    $('#message').text('Error, please fill the input')
  }
});

$('#js-search').click(function(event) {
  var paramToSearch = $('select').val();
  var query = $('#query').val();
  if(query !== ''){
    var weburl = '/reviews/search?'+paramToSearch+'='+query;
    var request = new XMLHttpRequest();
    request.open('GET', weburl, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var response = JSON.parse(request.responseText);
        var responseHTML = '';
        $.each(response, function(index, val) {
          responseHTML += '<div><strong>'+val.name+'</strong></br><p>'+val.placeType+'</p>';
          for(var i=1; i<=val.stars; i++){
            responseHTML += '<i class="icon star"></i>';
          }
          responseHTML += '</div></br></br>';
        });
        $('#response').html(responseHTML);
      }
    }
  }
});