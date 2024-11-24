// To send a http request we use a in-built class of js

const xhr = new XMLHttpRequest();

/*
    we are waiting for the response cause after sendign the request it takes sometime to send the response from the server.
*/
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/products');
xhr.send();
