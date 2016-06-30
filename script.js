var results;

function start(){
  $('#search-input').on('keyup', function (key){
    if (key.which == 13) {
      getResults();
    }
  });
};

function getResults() {
  var searchQuery = $('#search-input').val();
  var API = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=4&exlimit=max&gsrsearch=';
      API += searchQuery;
      API += "&callback=?";

  $.getJSON(API, function (data){
    console.log(data);
    if (data.query !== undefined) {
      results = data.query.pages;
      showResults();
    } else {
      $('#results').html('<div class="col-sm-12 result"> <h3>Error!</h3>');
    }
  });
};

function showResults() {
$('#results').html('');
  $.map(results, function(obj) {
    $('#results').append(
      '<a href="http://en.wikipedia.org/?curid='
       + obj.pageid + '" target="__blank"><div class="col-md-12 result animated fadeInUp">' +
        '<h3>' + obj.title + '</h3>' +
        '<p>' + obj.extract + '</p>' +
      '</div></a>'
    );
  });
};

start();
