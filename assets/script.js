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

    
    // Elementi del DOM
    const newsSection = document.getElementById("news-section");
    const savedNewsIndicator = document.querySelector(".saved-news-indicator");
    const newsTypeSelect = document.getElementById("news-type");

    // Array per tenere traccia delle notizie salvate
    let savedNews = [];

    // Funzione per visualizzare le notizie sulla pagina
    function displayNews(selectedType, newsToDisplay = newsData) {
        newsSection.innerHTML = "";

    // Filtra le news in base al tipo selezionato
    const filteredNews = selectedType === "all" ? newsToDisplay : newsToDisplay.filter(news => news.type.includes(selectedType));

    // Se il check-mark è attivo e ci sono notizie salvate, mostra solo le notizie salvate in base al tipo
    if (savedNewsIndicator.classList.contains("saved") && savedNews.length > 0) {
        const savedNewsToRender = newsData.filter(news => savedNews.includes(news.title) && (selectedType === "all" || news.type.includes(selectedType)));

        if (savedNewsToRender.length > 0) {
            savedNewsToRender.forEach(news => {  
                const newsElement = createNewsElement(news);
                newsSection.appendChild(newsElement);
            });
        } else {
            // Nessuna news salvata disponibile in base al tipo
            const noSavedNewsMessage = document.createElement("h1");
            noSavedNewsMessage.classList.add("no-news-message");
            noSavedNewsMessage.textContent = "No saved news available";
            newsSection.appendChild(noSavedNewsMessage);
        }
    // Se il check-mark è attivo e non ci sono notizie salvate, mostra che nessuna news è stata salvata
    } else if (savedNewsIndicator.classList.contains("saved") && savedNews.length == 0) {
        const noSavedNewsMessage = document.createElement("h1");
        noSavedNewsMessage.classList.add("no-news-message");
        noSavedNewsMessage.textContent = "No news has been saved";
        newsSection.appendChild(noSavedNewsMessage);

    } else {

        if (filteredNews.length > 0) {
            // Altrimenti, mostra le notizie filtrate tramite type
            filteredNews.forEach(news => {
                const newsElement = createNewsElement(news);
                newsSection.appendChild(newsElement);
            });
        } else {
            // Nessuna news disponibile in base al tipo
            const noNewsMessage = document.createElement("h1");
            noNewsMessage.classList.add("no-news-message");
            noNewsMessage.textContent = "No news available";
            newsSection.appendChild(noNewsMessage);
        }
    }
}

    // Funzione per creare un elemento news
    function createNewsElement(news) {
        const newsElement = document.createElement("div");
        newsElement.classList.add("news-item");

    // Contenuto dell'elemento news
    newsElement.innerHTML = `
            <div class="news-header">
                <h2>${news.title}</h2>
                <i class="fa-regular fa-bookmark save-bookmark"></i>
            </div>
            <p>pubblicato da: ${news.author}</p>
            <p>in data ${news.date}</p>
            <p>${news.content[0]}</p>
            <img src="${news.image}" alt="${news.title}">
            <div class="buttons">
                ${news.type.map(label => `<button class="label-button ${label}">${label}</button>`).join('')}
            </div>
        `;

        // Aggiunta dell'evento di click per gestire il bookmark
        const bookmarkIcon = newsElement.querySelector('.save-bookmark');
        updateBookmarkIcon(bookmarkIcon, savedNews.includes(news.title));

        bookmarkIcon.addEventListener('click', () => {
            toggleSavedNews(news.title);
            updateBookmarkIcon(bookmarkIcon, savedNews.includes(news.title));

            // Aggiornamento delle notizie visualizzate in base al filtro corrente
            const selectedType = newsTypeSelect.value;
            displayNews(selectedType);

        });

        return newsElement;
    }

    // Funzione per aggiornare l'icona del bookmark
    function updateBookmarkIcon(iconElement, isSaved) {
        if (isSaved) {
            iconElement.classList.remove('fa-regular');
            iconElement.classList.add('fa-solid');
        } 

    }

    // Funzione per gestire il salvataggio di una notizia
    function toggleSavedNews(title) {
        const index = savedNews.indexOf(title);

        if (index === -1) {
            savedNews.push(title);
            
        }
        
        // Aggiornamento delle notizie visualizzate in base al filtro corrente
        const selectedType = newsTypeSelect.value;
        displayNews(selectedType);

    }

    // Funzione per aggiornare l'indicatore di news salvate
    function updateSavedNewsIndicator() {
        const hasCheckMark = savedNewsIndicator.classList.contains("saved");

        if (!hasCheckMark) {
            // Se il check-mark non c'è, lo aggiunge
            savedNewsIndicator.classList.add("saved");
            savedNewsIndicator.innerHTML = '&#10004;';
            console.log(savedNewsIndicator.classList.contains("saved"));
            
        } else {
            // Se il check-mark c'è, lo rimuove
            savedNewsIndicator.classList.remove("saved");
            savedNewsIndicator.innerHTML = '';
            console.log(savedNewsIndicator.classList.contains("saved"));
        }
    }

    // Aggiunta di un ascoltatore per il cambio del tipo di news
    newsTypeSelect.addEventListener("change", function () {
        const selectedType = newsTypeSelect.value;
        displayNews(selectedType);
    });

    // Aggiunta di un ascoltatore per il click sull'indicatore di news salvate
    savedNewsIndicator.addEventListener("click", function () {
        // Aggiorna dinamicamente la presenza del check-mark
        updateSavedNewsIndicator();

        // Aggiornamento delle notizie visualizzate in base al filtro corrente
        const selectedType = newsTypeSelect.value;
        displayNews(selectedType);

    });

    // Chiamata iniziale per caricare tutte le news
    displayNews("all");

