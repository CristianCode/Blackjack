/**
 * 2C - TREBOL 
 * 2D - DIAMANTE
 * 2H - CORAZONES
 * 2S - ESPADAS
 */

 let deck                   = [];
 const tipos                = ['C', 'D', 'H', 'S'];
 const especiales           = ['A', 'J', 'Q', 'K'];
 let    puntosJugador       = 0,
        puntosComputador    = 0;
let mensaje                 = '';

//Referencias para el HTML
const btnPedir              = document.querySelector('#btnPedir');
const btnDetener            = document.querySelector('#btnDetener');
const btnNuevo            = document.querySelector('#btnNuevo');
const puntosHTML            = document.querySelectorAll('small'); 
const divCartasJugador      = document.querySelector('#jugar-cartas');
const divCartasComputadora  = document.querySelector('#computadora-cartas');

 //Función para crear una baraja

 const crearDeck = () => {

     for( let i = 2 ; i <= 10 ; i++){
         for( let tipo of tipos){
             deck.push(i + tipo);
         }
     }

     for( let tipo of tipos){
         for(let esp of especiales){
             deck.push(esp + tipo);
         }
     }

     deck = _.shuffle(deck); //Este metodo me permite desordenar el arreglo de cartas
     console.log(deck);
     return deck;
 }


 //Función para pedir una carta

 const pedirCarta = () => {
    
    if( deck.length === 0 ){
      throw 'Ya no hay cartas en la baraja' ;
      //Luego del trhow, ya no se va a ejecutar nada
    }
     const carta = deck.pop();

    return carta;
 }

 //Función para saber el valor de la carta

 const valorCarta = ( carta ) => {
     const valor = carta.substring(0, carta.length - 1);
     return ( isNaN(valor) ) ? 
            ( valor === 'A') ? 11 : 10
            : valor * 1;
     
 }

 crearDeck();                                                                                                                                                                                           
//  const valor = valorCarta(pedirCarta());   
//  console.log({valor});

//Turno del computador
const turnoComputadora = ( puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputador = puntosComputador + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputador;
        //Creamos el tab img
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //Añadimos el src
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if( puntosMinimos > 21 ){
            break;
        }
        
    } while ( (puntosComputador < puntosMinimos) && (puntosMinimos <= 21)  );

    setTimeout(() => {
        mensaje = ( puntosComputador === puntosMinimos) ? 'El juego quedó empatado' : ( puntosMinimos > 21 ) ? 'Ganó el computador' : (puntosComputador > 21) ? 'Ganó el jugador' : 'Ganó el computador';
        alert( mensaje );  
    }, 1000);

    
    
}

/** Eventos */
btnPedir.addEventListener('click' , () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    //Creamos el tab img
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; //Añadimos el src
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if( puntosJugador > 21 ){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if( puntosJugador === 21 ){
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    
});

btnNuevo.addEventListener('click' , () => {
    console.clear();
    deck = [];
    deck = crearDeck(); //Crear un nuevo deck
    puntosJugador                   = 0 ;
    puntosComputador                = 0 ;
    puntosHTML[0].innerText         = 0 ;
    puntosHTML[1].innerText         = 0 ;
    divCartasJugador.innerHTML      = '';
    divCartasComputadora.innerHTML  = '';
    btnPedir.disabled   = false;
    btnDetener.disabled = false;

})




