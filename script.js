const quoteContainer = document.getElementById('contenedor-citas');
const quoteText = document.getElementById('cita');
const authorText = document.getElementById('autor');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('nueva-cita');
const loader = document.getElementById('loader')


function showLoadingIcon(){
    loader.hidden= false;
    quoteContainer.hidden = true;
}

function removeLoadingIcon(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden =true;
    }
}

//Sacar cita de API -- Gettin quote from quote API
async function getQuote() {
    showLoadingIcon();

    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //Si el autor es un string vacio se le atribuye 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } 
        else{
            authorText.innerText = data.quoteAuthor;
        }

        //Se reduce el tamaño de la fuente para textos largos
        if(data.quoteText.length > 120 ){
            quoteText.classList.add('cita-larga');
        }
        else {
            quoteText.classList.remove('cita-larga');
        }
        
        quoteText.innerText = data.quoteText;
         removeLoadingIcon(); 

    } catch (error) {
        getQuote();
    }

}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl , '_blank');
}

//Event listeners

newQuoteButton.addEventListener('click' , getQuote);
twitterButton.addEventListener('click' , tweetQuote);

 
//Llamada a funcion

getQuote();
