/* i need to add the multiple states...*/

let base_url = 'https://developer.nps.gov/api/v1/parks'
let api_key = 'F9Ba0rhkkg9k8ybEjblnHenIACyHAu3KHOQI3N4K'



function printToScreen(json) {
    $('.parks-list').empty();
    console.log(json);
    console.log(json.data.length);
    for (i=0; i < json.data.length; i++) {
        $('.parks-list').append(
            `<h3 class='park-name'>${json.data[i].fullName}</h3>
            <p class='park-desription'>${json.data[i].description}</p>
            <br><a class='park-location' href='${json.data[i].url}'>visit the parks site</a>
            <br><br><br>
            `
        );
    };
    $('.results-page').removeClass('hidden');
};

function formatRequest(api_key, choiceOfState, maxNumResults) {
    let params = {
        api_key: api_key,
        stateCode: '[' + choiceOfState + ']',
        limit: maxNumResults
    };
    console.log(params);
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    console.log(queryItems.join('&'));
    return queryItems.join('&');

}

function fetchParks(choiceOfState, maxNumResults) {
    let searchQuery = formatRequest(api_key, choiceOfState, maxNumResults);
    const url = base_url + '?' + searchQuery;
    console.log(url);
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(json => printToScreen(json))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm() {
    $('.state-choice').on('submit', function(event) {
        event.preventDefault();
        const choiceOfState = $('#state').val();
        const maxNumResults = $('#number-results').val();
        console.log('users choice of state is:', choiceOfState);
        fetchParks(choiceOfState, maxNumResults);
    });

};

$(watchForm(), console.log('program running smoothly'));
