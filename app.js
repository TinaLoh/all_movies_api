var result;
var movies;
var movieTitles;
var title = $('')


function clear() {
  $('li').remove();
  $('#title').text('');
  $('#imdbID').text('');
  $('#year').text('');
}

$(document).ready(function(){

  $("button").click(function() {
    $.ajax("http://www.omdbapi.com/?s=" + document.getElementById('movieQuery').value, { type: 'get' }).done(function(data) {

      result = JSON.parse(data);
      movies = result.Search;
      movieTitles = _.pluck(movies, 'Title');

      // clear previous titles
      clear();

      // build list of titles
      var titles = $('#titles');

      _.each(movieTitles, function(title){
        var li = $('<li/>')
          .appendTo(titles);
        var a = $("<a href='#'/>")
          .text(title)
          .appendTo(li)
          .click(function(event){
            var movieTitle = event.currentTarget.innerHTML;
            var movieDetail = _.findWhere(movies, {Title: movieTitle});
            $('#title').text(movieDetail.Title);
            $('#year').text(movieDetail.Year);
            $('#imdbID').text(movieDetail.imdbID);
          });
      })
     });
  });
});
