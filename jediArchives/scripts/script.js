let peopleStart = document.getElementById("peopleStartButton");
let shipStart = document.getElementById("shipStartButton");
let picContainer = document.getElementById("container");
let peopleTable = document.getElementById("peopleTable");
let navigationNextPrev = document.getElementById("navigationNextPrev");

let peopleUrl = "https://swapi.dev/api/people/"


let fetchAndPrintPeople = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => peopleTable.innerHTML += (
            `
                <table class="generatedTable">
                    <thead>
                        <td>Name</td>
                        <td>Height</td>
                        <td>Mass</td>
                        <td>Gender</td>
                        <td>Birth Year</td>
                        <td>Appearances</td>
                    </thead>
                        ${(data.results).map((people)=>{

                            return (`
                                <tr>
                                    <td>${people.name} </td>
                                    <td>${people.height}</td>
                                    <td>${people.mass}</td>
                                    <td>${people.gender}</td>
                                    <td>${people.birth_year}</td>
                                    <td>${people.films.length}</td>
                                </tr>
                            
                            `)
                        }).join("")}
                </table>    
            `
        )
        )
        .catch(error => console.log(error))
}

let shipCapacity = (ships)=>{
    let crew = parseInt(ships.crew)
    let passengers = parseInt(ships.passengers)
    let fullCrew = 0;
    if(!isNaN(crew)){
        fullCrew += crew
    }
    if(!isNaN(passengers)){
        fullCrew += passengers
    }
    return fullCrew
}

let fetchAndPrintShips = (url) => {
    fetch(url)
        .then (response => response.json())
        .then (data => peopleTable.innerHTML += (
            `
                <table class="generatedTable"> 
                    <thead>
                        <td>Name</td>
                        <td>Model</td>
                        <td>Manufacturer</td>
                        <td>Cost</td>
                        <td>Capacity</td>
                        <td>Class</td>
                    </thead>
                        ${(data.results).map((ships)=> {
                            return (
                                `
                                    <tr>
                                        <td>${ships.name}</td>
                                        <td>${ships.model}</td>
                                        <td>${ships.manufacturer}</td>
                                        <td>${ships.cost_in_credits}</td>
                                        <td>${shipCapacity(ships)}
                                        <td>${ships.starship_class}</td>
                                    </tr>
                                `
                            )
                        })}
                </table>
                        
            `
        ))
        .catch (error => console.error(error))
}

peopleStart.addEventListener("click", ()=> {
    let counter = 1;
    let page = `https://swapi.dev/api/people/?page=`;
    picContainer.style.display = "none";
    navigationNextPrev.innerHTML += `<button type="button" id="previousPeopleBtn">Previous</button>`
    navigationNextPrev.innerHTML += `<button type="button" id="nextPeopleBtn">Next</button>`
    let previousBtn = document.getElementById("previousPeopleBtn");
    let nextBtn = document.getElementById("nextPeopleBtn");

    counter < 2 ? previousBtn.style.display = "none" : previousBtn.style.display = "inline";
        fetchAndPrintPeople(`${page}${counter}`);
        document.addEventListener("click", (e)=>{
        if(e.target.matches("button") && e.target.id === "previousPeopleBtn"){
            counter --;
            peopleTable.innerHTML = "";
            fetchAndPrintPeople(`${page}${counter}`)
        }
        if(e.target.matches("button") && e.target.id === "nextPeopleBtn"){
            counter ++;

            peopleTable.innerHTML = "";
            fetchAndPrintPeople(`${page}${counter}`)
        }
        counter > 8 ? nextBtn.style.display = "none" : nextBtn.style.display = "inline"
        counter < 2 ? previousBtn.style.display = "none" : previousBtn.style.display = "inline";
    })
})
shipStart.addEventListener("click", ()=>{
    let counter = 1;
    let page = "http://swapi.dev/api/starships/?page="
    picContainer.style.display = "none"
    navigationNextPrev.innerHTML += `<button type="button" id="previousPeopleBtn">Previous</button>`
    navigationNextPrev.innerHTML += `<button type="button" id="nextPeopleBtn">Next</button>`
    let previousBtn = document.getElementById("previousPeopleBtn");
    let nextBtn = document.getElementById("nextPeopleBtn");
    counter < 2 ? previousBtn.style.display = "none" : previousBtn.style.display = "inline";
        fetchAndPrintShips(`${page}${counter}`);
        document.addEventListener("click", (e) => {
        if(e.target.matches("button") && e.target.id === "previousPeopleBtn"){
            counter --;
            peopleTable.innerHTML = ""
            fetchAndPrintShips(`${page}${counter}`)
        }
        if(e.target.matches("button") && e.target.id === "nextPeopleBtn"){
            counter ++;
            peopleTable.innerHTML = "";
            fetchAndPrintShips(`${page}${counter}`)
        }
        counter > 3? nextBtn.style.display = "none" : nextBtn.style.display = "inline"
        counter < 2 ? previousBtn.style.display = "none" : previousBtn.style.display = "inline";
    })


})
