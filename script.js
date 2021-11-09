//Sacar cita de API
async function getQuote() {
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
    } catch(error){
        console.log('error,no hay cita', error);
    }

}

//Llamada a funcion

getQuote();
