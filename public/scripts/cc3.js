console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  getJokes();
  $( '#addJokeButton' ).on( 'click', function(){
    console.log( 'addJokeButton on click');
  }); // end addJokeButton on click
}); // end doc ready

function getJokes() {
    $.ajax({
        url: '/jokes',
        type: 'GET',
        success: function(response) {
            console.log('Got jokes', response);
            displayJokes(response.jokes);
        }
    });
}

function displayJokes(jokeArray) {
    var htmlString = '<div class="joke-header"><p>Joke Author</p><p>Setup</p><p>Punch Line</p></div>';
    jokeArray.forEach(function(joke) {
        htmlString += '<div class="joke">';
        htmlString += '<p>' + joke.whoseJoke + '</p>';
        htmlString += '<p>' + joke.jokeQuestion + '</p>';
        htmlString += '<p>' + joke.punchLine + '</p>';
        htmlString += '</div>';
    });
    $('#outputDiv').html(htmlString);
}
