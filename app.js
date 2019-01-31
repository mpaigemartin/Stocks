const stockList = ['AAPL','TSLA','AMZN'];


const displayStockInfo = function(){
    const stock = $(this).attr('data-name');
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,news&range=10m`;


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

const stockDiv = $('<div>').addClass('stock');
const companyName = response.quote.companyName;
const stockName = $('<p>').text(`Company Name: ${companyName}`);
stockDiv.append(stockName);

stockDiv.append(`<img class="logo" src="${response.logo.url}"/>`)

const price = response.quote.latestPrice;
const priceTag = $('<p>').text(`Stock Price: ${price}`);
stockDiv.append(priceTag);


$('#stocks-view').prepend(stockDiv);


for (i=0; i<10; i++) {
    let newsHeadline = response.news[i].headline;
    let newsSummary = response.news[i].summary;
stockDiv.append(
    `<div id="news">
    <h3 class="headline">${newsHeadline}</h3>
    <p>${newsSummary}</p>
    </div>`);

}})}




const render = function () {
    $('#buttons-view').empty();
for (let i = 0; i < stockList.length; i++) {
const newButton = $('<button>');
    newButton.addClass('stock-btn');
    newButton.attr('data-name', stockList[i]);
    newButton.text(stockList[i]);
$('#buttons-view').append(newButton);
    }
}

const addButton = function(e) {
    e.preventDefault();
    const stock = $('#stock-input').val().trim();
    stockList.push(stock);
    $('#stock-input').val('');

    render();
}


$('#add-stock').on('click', addButton);
$('#buttons-view').on('click', '.stock-btn', displayStockInfo);

render()