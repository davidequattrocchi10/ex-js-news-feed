// Struttura dati delle news
const newsData = [
    { 
        type: ["geo", "tech"],
        title: "Scoperta di una nuova specie di papera di gomma",
        author: "Diana Rossi",
        date: "2023-02-11",
        content: [
            "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima."
                ],
        image: "images/rubber-duck.jpg"
    },  
    
    {
        type: ["travel", "geo"],
        title: "Esplorando le profondità marine: il mistero degli abissi",
        author: "Fabio Mari",
        date: "2023-03-14",
        content: [
            "Un viaggio nelle profondità dell'oceano alla scoperta di creature misteriore e inesplorate."
                ],
        image: "images/deep-sea.jpg"

    },
    
    {
        type: ["cuisine"],
        title: "Viaggio culinario: alla ricerca dei sapori perduti",
        author: "Marta Bianchi",
        date: "2023-04-20",
        content: [
            "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici."
                ],
        image: "images/kitchen-food.jpg"

    }, 

    {
        type: ["art", "tech"],
        title: "Arte moderna: oltre i confini convenzionali",
        author: "Gabriele Neri",
        date: "2023-05-29",
        content: [
            "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti."
                ],
        image: "images/modern-art.jpg"

    }
    // Aggiungere successivamente qualche altra news a piacimento
];


// Funzione per generare e visualizzare le news sulla pagina
function showNews(selectedType) {
    const newsSection = document.getElementById("news-section");

    // Pulisci la sezione delle news
    newsSection.innerHTML = "";

    // Filtra le news in base al tipo selezionato
    const filteredNews = selectedType === "all" ? newsData : newsData.filter(news => news.type.includes(selectedType));

    // Genera e aggiungi le news alla pagina
    filteredNews.forEach(news => {
        const newsElement = document.createElement("div");
        newsElement.classList.add("news-item");

        newsElement.innerHTML = `
            <h2>${news.title}</h2>
            <p>pubblicato da: ${news.author}</p>
            <p>in data ${news.date}</p>
            <p>${news.content[0]}</p>
            <img src="${news.image}" alt="${news.title}">
            <div class="buttons">
                ${news.type.map(label => `<button class="label-button ${label}">${label}</button>`).join('')}
            </div>
        `;

        newsSection.appendChild(newsElement);
    });
}


// Gestisci il cambio della selezione nel menù a tendina
document.getElementById("news-type").addEventListener("change", function() {
    const selectedType = this.value;
    showNews(selectedType);
});

// Mostra tutte le news inizialmente
showNews("all");
