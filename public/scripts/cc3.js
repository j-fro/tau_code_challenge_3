console.log('js');

$(document).ready(function() {
    console.log('JQ');
    getJokes();
    $('#addJokeButton').on('click', function() {
        console.log('addJokeButton on click');
        addNewJoke();
    }); // end addJokeButton on click
    $(document).on('click', '.remove-joke-button', removeJoke);
    $(document).on('click', '.joke-header', sortJokes);
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
        // Reset error classes and clear inputs
        $('#whoseJokeIn').removeClass('no-input').val('');
        $('#questionIn').removeClass('no-input').val('');
        $('#punchlineIn').removeClass('no-input').val('');
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

function removeJoke() {
    jokeIdToRemove = $(this).parent().data();
    console.log('removing joke', jokeIdToRemove);
    $.ajax({
        url: '/removeJoke',
        type: 'POST',
        data: jokeIdToRemove,
        success: function(response) {
            console.log('response from server', response);
            displayJokes(response.jokes);
        }
    });
}

function sortJokes() {
    var sortType = $(this).data();
    console.log('sorting jokes', sortType);
    $.ajax({
        url: '/sort',
        type: 'POST',
        data: sortType,
        success: function(response) {
            console.log('response from server', response);
            displayJokes(response.jokes);
        }
    });
}

function displayJokes(jokeArray) {
    var htmlString = '<div class="row">' +
    '<a><h5 class="col-xs-2 col-xs-offset-1 joke-header" data-sort="whoseJoke">Joke Author <span class="glyphicon glyphicon-sort-by-alphabet"></span></h5></a>' +
    '<a><h5 class="col-xs-3 joke-header" data-sort="jokeQuestion">Setup <span class="glyphicon glyphicon-sort-by-alphabet"></span></h5></a>' +
    '<a><h5 class="col-xs-4 joke-header" data-sort="punchLine">Punch Line <span class="glyphicon glyphicon-sort-by-alphabet"></span></h5></a>' +
    '<h5 class="col-xs-1">Remove</h5></div>';

    jokeArray.forEach(function(joke, index) {
        htmlString += '<div class="joke row" data-index="' + index + '">';
        htmlString += '<p class="col-xs-2 col-xs-offset-1">' + joke.whoseJoke + '</p>';
        htmlString += '<p class="col-xs-3">' + joke.jokeQuestion + '</p>';
        htmlString += '<p class="col-xs-4">' + joke.punchLine + '</p>';
        htmlString += '<button class="remove-joke-button btn btn-danger col-xs-1">X</button>';
        htmlString += '</div>';
    });
    $('#outputDiv').html(htmlString);
}
