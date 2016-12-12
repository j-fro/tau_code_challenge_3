console.log('js');

$(document).ready(function() {
    console.log('JQ');
    getJokes();
    $('#addJokeButton').on('click', function() {
        console.log('addJokeButton on click');
        addNewJoke();
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

function addNewJoke() {
    // Reset error classes
    $('#whoseJokeIn').removeClass('no-input');
    $('#questionIn').removeClass('no-input');
    $('#punchlineIn').removeClass('no-input');
    var author = $('#whoseJokeIn').val();
    var setup = $('#questionIn').val();
    var punchLine = $('#punchlineIn').val();
    if (author.length < 1) {
        $('#whoseJokeIn').addClass('no-input');
    } else if (setup.length < 1) {
        $('#questionIn').addClass('no-input');
    } else if (punchLine.length < 1) {
        $('#punchlineIn').addClass('no-input');
    } else {
        $('#whoseJokeIn').removeClass('no-input');
        $('#questionIn').removeClass('no-input');
        $('#punchlineIn').removeClass('no-input');
        var jokeToSend = {
            whoseJoke: author,
            jokeQuestion: setup,
            punchLine: punchLine
        };
        $.ajax({
            url: '/',
            type: 'POST',
            data: jokeToSend,
            success: function(response) {
                console.log('response from server', response);
                displayJokes(response.jokes);
            }
        });
    }
}

function displayJokes(jokeArray) {
    var htmlString = '<div class="joke-header row"><h5 class="col-xs-1 col-xs-offset-1">Joke Author</h5><h5 class="col-xs-4">Setup</h5><h5 class="col-xs-4">Punch Line</h5><h5 class="col-xs-1">Remove</h5></div>';
    jokeArray.forEach(function(joke) {
        htmlString += '<div class="joke row">';
        htmlString += '<p class="col-xs-1 col-xs-offset-1">' + joke.whoseJoke + '</p>';
        htmlString += '<p class="col-xs-4">' + joke.jokeQuestion + '</p>';
        htmlString += '<p class="col-xs-4">' + joke.punchLine + '</p>';
        htmlString += '<button class="delete-joke btn col-xs-1">X</button>';
        htmlString += '</div>';
    });
    $('#outputDiv').html(htmlString);
}
