/* eslint-disable react/prop-types */
import { createContext} from "react"
import { useState } from "react"
export const BookContext = createContext()
// ME FALTA AGREGAR LIBRO 8 9 Y 10
function BookProvider({children}){
    const [books, setBooks] = useState([{
        id: 1,
        titulo: 'Cuentos de Animales',
        autor: 'Alba Castro',
        descripcion: 'Una entrañable colección de cuentos que explora la vida y los desafíos de diferentes animales. A través de estas historias, los lectores jóvenes descubrirán temas importantes como la amistad, el coraje y las lecciones que la naturaleza nos ofrece. Alba Castro utiliza un lenguaje sencillo pero profundo que capta la atención tanto de los niños como de los adultos, invitando a reflexionar sobre el papel de los animales en nuestras vidas y en el mundo. Este libro es perfecto para quienes buscan lecturas educativas y a la vez entretenidas para los más pequeños.',
        genero: 'Infantil',
        img: '/animales.png',
        stock: 5,
    },
    {
        id: 2,
        titulo: 'El Bosque Mágico',
        autor: 'Naira Gamboa',
        descripcion: 'En las profundidades de un bosque encantado, se esconde un mundo lleno de criaturas mágicas y antiguos misterios que esperan ser descubiertos. "El Bosque Mágico" sigue a Naira Gamboa en su mágica travesía, enfrentándose a desafíos impredecibles mientras encuentra aliados en los lugares más inesperados. Este libro mezcla aventura, emoción y enseñanzas profundas sobre la naturaleza y la magia que la rodea, invitando a los lectores a adentrarse en un mundo de fantasía que promete mantenerles en vilo hasta la última página.',
        genero: 'Fantasía',
        img: '/bosque-magico.png',
        stock: 10,
    },
    {
        id: 3,
        titulo: 'Cruce de Caminos',
        autor: 'Niara Gamboa',
        descripcion: 'Esta fascinante novela de Niara Gamboa narra la historia de dos personas cuyas vidas están a punto de cambiar para siempre. A través de encuentros fortuitos y decisiones difíciles, los personajes se enfrentan a los dilemas universales del amor, la pérdida y el destino. "Cruce de Caminos" es una obra que explora cómo nuestras elecciones y los caminos que tomamos pueden alterar radicalmente nuestro futuro. Con una prosa conmovedora y un desarrollo emocional profundo, esta novela captura la esencia de la vida moderna y las conexiones humanas que nos transforman.',
        genero: 'Ficción contemporánea',
        img: '/cruce-de-caminos.png',
        stock: 8,
    },
    {
        id: 4,
        titulo: 'Eclipse Solar',
        autor: 'José Antonio Cotrina',
        descripcion: 'En "Eclipse Solar", José Antonio Cotrina entrelaza la ciencia ficción con la fantasía en un mundo donde un eclipse trae consigo misterios y secretos. Los protagonistas se ven envueltos en una trama de intriga que los lleva a cuestionar la realidad y su lugar en ella. Con giros inesperados y un desarrollo fascinante, este libro desafía la percepción del tiempo y la existencia misma, invitando a los lectores a explorar conceptos filosóficos en un marco de aventura y acción. Una obra que promete mantener a los lectores al borde de sus asientos.',
        genero: 'Ciencia ficción',
        img: '/eclipse.png',
        stock: 5,
    },
    {
        id: 5,
        titulo: 'Cuentos de Otoño',
        autor: 'Ray Bradbury',
        descripcion: 'Una serie de relatos que evocan la melancolía y la belleza del otoño, capturando momentos de la vida y la naturaleza. Ray Bradbury teje historias que reflejan el paso del tiempo y las emociones humanas en un entorno cambiante. Cada cuento es una ventana a experiencias que resuenan en el corazón de los lectores, recordándonos la fragilidad de la vida y la profundidad de nuestras conexiones con el mundo que nos rodea. Este libro es ideal para quienes buscan reflexionar sobre la vida a través de la literatura.',
        genero: 'Cuentos',
        img: '/otoño.png',
        stock: 20,
    },
    {
        id: 6,
        titulo: 'El Quinto Infierno',
        autor: 'Fernando Oliveiro',
        descripcion: 'Una novela oscura que explora el misterio y el horror en una Barcelona sumida en sombras y secretos. "El Quinto Infierno" lleva a los lectores a través de un laberinto de intrigas y revelaciones escalofriantes, donde los personajes deben enfrentar sus propios demonios en un entorno que desafía la realidad. A través de una narrativa inquietante y una prosa rica, Fernando Oliveiro crea un mundo donde lo desconocido acecha en cada esquina, atrapando a los lectores en su atmósfera oscura y envolvente.',
        genero: 'Ficción',
        img: '/quinto-infierno.png',
        stock: 6,
    },
    {
        id: 7,
        titulo: 'Reyes Caídos',
        autor: 'Julián Alonoso',
        descripcion: 'Una saga épica sobre el ascenso y la caída de imperios, donde los reyes deben enfrentar sus propios demonios. "Reyes Caídos" es un relato grandioso que combina historia y fantasía, ofreciendo a los lectores una visión profunda de la lucha por el poder y sus consecuencias. Con personajes complejos y tramas entrelazadas, esta obra captura la esencia de la ambición humana y el costo que conlleva. Ideal para quienes disfrutan de las narrativas ricas en historia y acción.',
        genero: 'Fantasía',
        img: '/reyes-caidos.png',
        stock: 12,
    },
    {
        id: 8,
        titulo: 'Sable Mío',
        autor: 'Julián Alonoso',
        descripcion: 'En "Sable Mío", Julián Alonoso narra la vida de un espadachín en el contexto de las aventuras y desventuras de la guerra. Esta novela llena de acción y emoción sumerge a los lectores en un mundo donde la valentía y la traición van de la mano. A través de descripciones vívidas y un ritmo trepidante, la historia explora temas de honor, sacrificio y la búsqueda de la identidad en tiempos de conflicto. Una lectura apasionante para quienes aman las historias de aventuras épicas.',
        genero: 'Aventura',
        img: '/sable-mio.png',
        stock: 9,
    },
    {
        id: 9,
        titulo: 'Viajando en Invierno',
        autor: 'Josep Lopez',
        descripcion: 'Una fascinante historia que sigue a un grupo de viajeros en su odisea a través de paisajes invernales y desafiantes. "Viajando en Invierno" es un relato conmovedor que trata sobre la amistad y la superación en condiciones extremas. A medida que los personajes enfrentan adversidades, descubren no solo la belleza del paisaje invernal, sino también la fortaleza que reside en su interior. Este libro invita a los lectores a reflexionar sobre el viaje de la vida y las lecciones que aprenden en el camino.',
        genero: 'Aventura',
        img: '/viajando-en-invierno.png',
        stock: 11,
    },
    {
        id: 10,
        titulo: 'Vidas Paralelas',
        autor: 'Naira Gamboa',
        descripcion: 'Una serie de biografías que comparan la vida de personajes históricos, explorando sus virtudes y defectos. "Vidas Paralelas" ofrece una mirada íntima a las luchas y triunfos de figuras que han marcado la historia, revelando conexiones sorprendentes entre sus vidas. A través de una prosa evocadora, Naira Gamboa invita a los lectores a considerar cómo las decisiones de estas figuras influyeron en el mundo que conocemos hoy. Ideal para aquellos interesados en la historia y el impacto de las personas en su contexto.',
        genero: 'Biografía',
        img: '/vidas-paralelas.png',
        stock: 4,
    }
])

    return(
        <BookContext.Provider value={{books}}>
            {children}
        </BookContext.Provider>
    )
}

export default BookProvider