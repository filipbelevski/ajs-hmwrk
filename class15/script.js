navService = {
    searchBtn: document.getElementById('searchButton'),
    searchInput: document.getElementById('searchInput'),
    sortByName: document.getElementById('sortByNameToggle'),
    baseUrl: "https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json",

    sortedByName: false,
    sortedByAlb: false,

    init: () => {
        apiService.getBands(navService.baseUrl)
        navService.searchBtn.addEventListener('click', () => {
            console.log("Hello from search")
        }),
        document.addEventListener('click', (e)=> {
            if(e.target.id === "sortByNameToggle"){
                navService.sortedByName = !navService.sortByName
                apiService.getSortedByName(navService.baseUrl, navService.sortedByName);
            }
        })
    }
}

apiService = {
    getBands: (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => uiService.showBands(data ))
        .catch(error => console.log(error));
    },
    getSortedByName: (url, boolean)=> {
        fetch(url)
            .then(response => response.json())
            .then(data => uiService.showBands(uiService.sortByName(data, boolean)))
            .catch(error => console.log(error));
    }
}

uiService = {
    result: document.getElementById('results'),

    showBands: (data) => {
        uiService.result.innerHTML = "";
        let counter = 0;
        for(let band of data){
            counter++;
            uiService.result.innerHTML += (
                `
                <div class="col-2">${counter}</div>
                <div class="col-2">${band.name}</div>
                <div class="col-2">${band.active === true? "Active": "Inactive"}</div>
                <div class="col-2">${band.tags.map(tag=> `${tag} `)}</div>
                <div class="col-2">${band.members.map((member)=> {
                    if(member.former){
                        return
                    }else {
                        return (`${member.name} <br>`)
                    }
                }).join("")}</div>
                <div class="col-2">${band.albums.length}</div>
                `
            ) 
        }
    },
    sortByName: (data, bool) => {
        return bool? data.sort((a, b) => a.name.localeCompare(b.name)) : data.sort((a, b) => b.name.localeCompare(a.name))
    },
    sortByNumberOfalbums: (data) => {
        return data.sort((a, b)=> {
            if(a.albums.length < b.albums.length){
                return -1
            }
            if( a > b){
                return 1
            }
            return 0
        })
    }
}
navService.init();
