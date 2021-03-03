let navigationService = {
    // page buttons
    mainPageBtn: document.getElementById("mainPage"),
    beerButton: document.getElementById("getBeerButton"),
    randomBeerButton: document.getElementById("getRandomBeerButton"),
    nextBtn: document.getElementById("nextButton"),
    prevBtn: document.getElementById("previousButton"),
    searchBtn: document.getElementById("searchButton"),
    searchInput: document.getElementById("searchInput"),

    // sorting buttons
    sortNameAscending: document.getElementById("sortNameAscending"),
    sortNameDescending: document.getElementById("sortNameDescending"),
    sortAlcoholAscending: document.getElementById("sortAlcoholAscending"),
    sortAlcoholDescending: document.getElementById("sortAlcoholDescending"),
    sortBitternessAscending: document.getElementById("sortBitternessAscending"),
    sortBitternessDescending: document.getElementById("sortBitternessDescending"),
    sortProductionDateNewest: document.getElementById("sortDateNewest"),
    sortProductionDateOldest: document.getElementById("sortDateOldest"),

    // ui content
    cardDeck: document.getElementById("cardDeck"),
    pagination: document.getElementById("pageAndSort"),
    mainContentDiv: document.getElementById("mainContent"),

    pageType: "",
    page: 1,
    perPage: 5,
    sortType: "nameAscending",
    state: "",
    input: "",

    showFive: document.getElementById("showFive"),
    showTen: document.getElementById("showTen"),
    showTwenty: document.getElementById("showTwenty"),

    init: function() {
        this.searchBtn.addEventListener('click', () => {
                if (this.searchInput.value !== ""){
                    this.input = this.searchInput.value
                    this.pageType = "beer";
                    this.state = "searched"
                    beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
                    uiService.nextPreviousButtons()
                }
                else {
                    alert("Enter valid input")
                }
            
        })
        // sorting events
        this.sortNameAscending.addEventListener('click', () => {
            console.log("hellofromSortNameAscending");
            this.pageType = "beer";
            this.sortType = "nameAscending";
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })

        this.sortNameDescending.addEventListener('click', () => {
            console.log("hello from sort name desc")
            this.pageType = "beer"
            this.sortType = "nameDescending"
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })

        this.sortAlcoholAscending.addEventListener('click', () => {
            this.pageType = "beer"
            this.sortType = "alcoholAscending"
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })
        this.sortAlcoholDescending.addEventListener('click', () => {
            this.pageType = "beer";
            this.sortType = "alcoholDescending";
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input);
        })
        this.sortBitternessAscending.addEventListener('click', () => {
            this.pageType = "beer";
            this.sortType = "bitternessAscending";
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input);
        })
        this.sortBitternessDescending.addEventListener('click', () => {
            this.pageType = "beer";
            this.sortType = "bitternessDescending";
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input);
        })
        this.sortProductionDateNewest.addEventListener('click', () => {
            this.pageType = "beer";
            this.sortType = "productionDateNewest"
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })
        this.sortProductionDateOldest.addEventListener('click', () => {
            this.pageType = "beer"
            this.sortType = "productionDateOldest"
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })
        // main beer random events
        this.mainPageBtn.addEventListener('click', () => {
            this.pageType = "mainPage"
            uiService.mainContent();
        })
        this.beerButton.addEventListener('click', () => {
            this.pageType = "beer";
            this.state = "static"
            beerService.getBeers(this.page, this.perPage, this.sortType)
            uiService.nextPreviousButtons()
        })
        document.addEventListener('click', (e) => {
            if (e.target.innerText === "More details"){
                let id = e.target.id
                this.pageType = "singleBeer"
                beerService.getSingle(id)
            }
        })
        this.randomBeerButton.addEventListener('click', () => {
            this.pageType = "singleBeer"
            beerService.getRandomBeer()
        })

        // buttons and perPage events 
        this.nextBtn.addEventListener('click', ()=> {
            this.page += 1
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
            uiService.nextPreviousButtons()
            window.scrollTo(0, 0);
        })
        this.prevBtn.addEventListener('click', ()=> {
            this.page -= 1
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
            uiService.nextPreviousButtons()
            window.scrollTo(0, 0);
        })
        this.showFive.addEventListener('click', () => {
            this.perPage = 5;
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })
        this.showTen.addEventListener('click', () => {
            this.perPage = 10;
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input)
        })
        this.showTwenty.addEventListener('click', () => {
            this.perPage = 20;
            beerService.searchedOrStatic(this.state, this.page, this.perPage, this.sortType, this.input);
            
        })
    }
}

let beerService = {
    beersUrl: "https://api.punkapi.com/v2/beers",

    searchedOrStatic: function (state, page, limit, sortType, input){
        switch(state){
            case "searched":
                this.getSearchedResult(page, limit, sortType, input)
                break;
            case "static":
                this.getBeers(page, limit, sortType)
                break;
        }
    },
    getSearchedResult: function (page, limit, sortType, input){
        fetch(`https://api.punkapi.com/v2/beers?page=${page}&beer_name=${input}&per_page=${limit}`)
            .then (response => response.json())
            .then (data => {
                console.log("from searchedbeer")
                uiService.cardDeck.innerHTML = "";
                uiService.showContent(data, sortType);
                uiService.multipleBeerUi()
                console.log(data)
            })
            .catch(error => console.error(error))
    },
    getBeers: function (page, limit, sortType){
        fetch(`${this.beersUrl}?page=${page}&per_page=${limit}`)
            .then(response => response.json())
            .then(data => {
                uiService.cardDeck.innerHTML = "";
                uiService.showContent(data, sortType)
                uiService.multipleBeerUi()
                console.log("from getBeers")
                console.log(data)
            })
            .catch(error => console.error(error))
    },
    getRandomBeer: function () {
        fetch("https://api.punkapi.com/v2/beers/random")
            .then(response => response.json())
            .then(data => {
                uiService.showRandomBeer(data)
                console.log(data)
            })
            .catch(error => console.error(error))
    },
    getSingle: function (id) {
        fetch(`https://api.punkapi.com/v2/beers/${id}`)
        .then(response => response.json())
        .then(data => {
            uiService.showRandomBeer(data)
            console.log(data)
        })
        .catch(error => console.error(error))
    },
    
}


let uiService = {
    cardDeck: document.getElementById("cardDeck"),
    singleBeerResult: document.getElementById("singleBeerResult"),
    
    showContent: function (data, sortType) {
        switch(sortType) {
            case "nameAscending":
                this.showSortedByNameAscending(data)
                break;
            case "nameDescending":
                this.showSortedByNameDescending(data)
                break;
            case "alcoholAscending":
                this.showSortedByAlcoholAscending(data)
                break;
            case "alcoholDescending":
                this.showSortedByAlcoholDescending(data)
                break;
            case "bitternessAscending": 
                this.showSortedByBitternessAscending(data)
            case "bitternessDescending":
                this.showSortedByBiternessDescending(data)
                break;
            case "productionDateNewest":
                this.showSortedByProductionDateNewest(data)
                break;
            case "productionDateOldest":
                this.showSortedByProductionDateOldest(data)
                break;
            default:
                    console.error("ERROR")
                break;
        }
    },
    nextPreviousButtons: function (){
        if (navigationService.page === 1 ){
            navigationService.prevBtn.style.display = "none"
            navigationService.nextBtn.style.display = "flex"
        }
        else{
            navigationService.prevBtn.style.display = "flex";
        }
    },
    mainContent: function (){
        if(navigationService.pageType === "mainPage"){
            navigationService.mainContentDiv.style.display = "block";
            this.singleBeerResult.style.display = "none"
            navigationService.nextBtn.style.display = "none";
            navigationService.prevBtn.style.display = "none";
            navigationService.pagination.style.display = "none";
            this.cardDeck.style.display ="none"
        }

    },
    beerCard: function (array){
        this.cardDeck.innerHTML = ""
        for (let beer of array){
            let content = `
                <div class="col mb-4">
                    <div class="card h-100">
                    <img src=${beer.img} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${beer.name}</h5>
                            <p class="card-text">${beer.description}</p>
                            <button type="button" id=${beer.id} class="btn btn-primary">More details</button>
                        </div>
                    </div>
                </div>
                `
            this.cardDeck.innerHTML += content
        }
    },
    showSingleBeerCard: function (data){
        for (beer of data){
            this.singleBeerResult.innerHTML = 
            `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <img src="${beer.img}" width="200rem" "class="card-img" alt="${beer.name} image">
                    <div class="card" style="width: 50rem;">
                        <div class="card-header">
                        <b>${beer.name}</b> ${beer.tag}
                        </div>
                        <p>${beer.description}</p
                        <p>Brewed: ${beer.brewed}</p>
                        <p>Alcohol:${beer.alcohol}</p>
                        <p>Bitterness: ${beer.ibu}</p>
                        <ul id ="foodPairing" class="list-group list-group-flush">
                            <h5>Food pairing</h5>
                        </ul>
                    </div>
                </div>
            </div>
            `
            for (foodPairing of beer.food){
                let ul = document.getElementById("foodPairing")
                ul.innerHTML += `<li class="list-group-item">${foodPairing}</li>`
            }
        }
        
    },
    multipleBeerUi: function (){    
        navigationService.mainContentDiv.style.display = "none";
        navigationService.pagination.style.display = "flex";
        this.singleBeerResult.style.display = "none";
        this.cardDeck.style.display = "flex";
    },
    showBeer: function(data){
        if(navigationService.pageType === "beer"){
            let parsedBeers = data.map((beer)=> {
                return {
                    name: beer.name,
                    description: beer.description,
                    id: beer.id,
                    img: beer.image_url
                }
            })
            this.beerCard(parsedBeers)
        }
    },
    showSortedByNameAscending: function (data){
        let parsedBeers = data.map((beer) => {
            return {
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a, b) =>{
            let nameA = a.name
            let nameB = b.name
            if(nameA < nameB){
                return -1;
            }
            if(nameA > nameB){
                return 1
            }
            return 0;
        })
        this.beerCard(parsedBeers)
        
    },

    showSortedByNameDescending: function (data) {

        let parsedBeers = data.map((beer) => {
            return {
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a, b) =>{
            let nameA = a.name
            let nameB = b.name
            if(nameA > nameB){
                return -1;
            }
            if(nameA < nameB){
                return 1
            }
            return 0;
        })
        this.beerCard(parsedBeers)
    },
    showSortedByAlcoholAscending: function (data){

        let parsedBeers = data.map((beer) => {
            return {
                alcohol: beer.abv,
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a, b) => a.alcohol - b.alcohol
        )
        this.beerCard(parsedBeers)
    },
    showSortedByAlcoholDescending: function (data){

        let parsedBeers = data.map((beer) => {
            return {
                alcohol: beer.abv,
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a, b) => b.alcohol - a.alcohol
        )
        this.beerCard(parsedBeers)
    },
    showSortedByBitternessAscending: function (data) {

        let parsedBeers = data.map((beer) => {
            return {
                bitterness: beer.ibu,
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a, b) => a.bitterness - b.bitterness
        )
        this.beerCard(parsedBeers)
    },
    showSortedByBiternessDescending: function (data) {

        let parsedBeers = data.map((beer) => {
            return {
                bitterness: beer.ibu,
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a, b) => b.bitterness - a.bitterness
        )
        this.beerCard(parsedBeers)
    },
    showSortedByProductionDateOldest: function (data) {
     
        let parsedBeers = data.map((beer) => {
            return {
                production: beer.first_brewed,
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a,b) => {
            let beerA = `01/${a.production}`;
            let brewedA = new Date(beerA)
            let brewMonthA = brewedA.getMonth()+1;
            let brewYearA = brewedA.getFullYear();
            
            let beerB = `01/${b.production}`;
            let brewedB = new Date (beerB);
            let brewMonthB = brewedB.getMonth() +1;
            let brewYearB = brewedB.getFullYear();

            if (brewYearA < brewYearB){
                return -1 
            
            } 
            else if (brewMonthA < brewMonthB){
                return -1 
            }

            if (brewYearA > brewYearB){
                return 1
            }
            else if(brewMonthA > brewMonthB){
                return 1
            }
            else {
                return 0
            }
        })
        this.beerCard(parsedBeers)
    },
    showSortedByProductionDateNewest: function (data) {

        let parsedBeers = data.map((beer) => {
            return {
                production: beer.first_brewed,
                name: beer.name,
                description: beer.description,
                id: beer.id,
                img: beer.image_url
            }
        })
        parsedBeers.sort((a,b) => {
            let beerA = `01/${a.production}`;
            let brewedA = new Date(beerA)
            let brewMonthA = brewedA.getMonth()+1;
            let brewYearA = brewedA.getFullYear();
            
            let beerB = `01/${b.production}`;
            let brewedB = new Date (beerB);
            let brewMonthB = brewedB.getMonth() +1;
            let brewYearB = brewedB.getFullYear();

            if (brewYearA > brewYearB){
                return -1 
            
            } 
            else if (brewMonthA > brewMonthB){
                return -1 
            }

            if (brewYearA < brewYearB){
                return 1
            }
            else if(brewMonthA < brewMonthB){
                return 1
            }
            else {
                return 0
            }
        })
        this.beerCard(parsedBeers)
    },
    showRandomBeer: function(data){
        if(navigationService.pageType === "singleBeer"){
            this.singleBeerResult.style.display = "flex"
            this.cardDeck.style.display = "none";
            navigationService.mainContentDiv.style.display = "none";
            navigationService.prevBtn.style.display = "none";
            navigationService.nextBtn.style.display = "none";
            navigationService.pagination.style.display = "none";
        }
        let singleBeer = data.map((beer) => {
            return {
                name: beer.name,
                img: beer.image_url,
                description: beer.description,
                brewed: beer.first_brewed,
                alcohol: beer.abv,
                ibu: beer.ibu,
                food: beer.food_pairing,
                tag: beer.tagline
            }
        })
        this.showSingleBeerCard(singleBeer)
    }
}

navigationService.init()