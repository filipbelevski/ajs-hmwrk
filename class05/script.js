let student = [
    {
        "id":1,
        "firstName":"Frasquito",
        "lastName":"Koop",
        "email":"fkoop0@ow.ly",
        "gender":"Male",
        "city":"Benzilan",
        "averageGrade":4,
        "age":33
    }
]

let url = "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
// fetch(url)
//     .then(response => response.json())
//     .then(data =>console.log(averageGradeGreaterThan(data, 3)))
//     .catch(error => console.error(error))

// let averageGradeGreaterThan = (arr, number) => {
//     return arr.filter(arr => arr.averageGrade >= number)
// }

// fetch(url)
//     .then(response => response.json())
//     .then(data => data.filter((females)=> {
//         if(females.averageGrade === 5 && females.gender === "Female"){
//             return console.log(females.firstName)
//         }
//     }))
//     .catch(error => console.error(error))

// fetch(url)
//     .then(response => response.json())
//     .then(data => data.filter((males)=> {
//         if(males.age >= 18 && males.city === "Skopje" && males.gender === "Male"){
//             return console.log(`${males.firstName} ${males.lastName}`)
//         }
//     }))
//     .catch(error => console.error(error))

// fetch(url)
//     .then(response => response.json())
//     .then(data => data.filter((someone)=> {
//         // the average grades of all female students over the age  of 24
//         if(someone.age >= 24 && someone.gender === "Female"){
//             document.body.innerHTML += `${someone.averageGrade}  `
//         }
//     }))
//     .catch(error => console.error(error))

// fetch(url)
//     .then(response => response.json())
//     .then(data => data.filter((male)=>{
//         // All male students with a name starting with B and average grade over 2
//         if(male.gender === "Male" && male.firstName[0] === "B" && male.averageGrade >=2 ){
//             return console.log(male)
//         }
//     }))


    // Drug nacin da se zemi so eden fetch (morav da koristam async zosto samo prvata funkcija bi se izvrsila, iako neznam pravilen nacin na koristenje)
fetch(url)
    .then(response => response.json())
    .then(data => data
        // All students with an average grade higher than 
        .filter(async(data)=> {
            if(data.averageGrade >= 3){
                console.log(`${data.firstName} with an average grade of ${data.averageGrade}`)
            }
        })
        // All female student names with an average grade of 5
        .filter(async(data)=> {
            if(data.averageGrade === 5 && data.gender === "Female"){
                console.log(`${data.firstName} is a female and has an average grade of 5`)
            }
        })
        // * All male student full names who live in Skopje and are over 18 years old
        .filter(async(data)=> {
            if(data.age >= 18 && data.city === "Skopje" && data.gender === "Male"){
                console.log(`${data.firstName} ${data.lastName} lives in Skopje and is over 18`)
            }
        })
        // * The average grades of all female students over the age  of 24
        .filter(async(data)=>{
            if(data.age >= 24 && data.gender === "Female"){
                console.log(`${data.firstName}who is ${data.age}, average grade is ${data.averageGrade}`)
            }
        })
        // * All male students with a name starting with B and average grade over 2
        .filter(async(data)=> {
            if(data.gender === "Male" && data.firstName[0] === "B" && data.averageGrade >=2 ){
                console.log(`${data.firstName} is male and his name starts with B, has a grade average of ${data.averageGrade}`)
        }
        })
        )
        .catch(error => console.error(error))
        // Dali ima drugi nacini da se povikaat funkcii vo ist fetch osven so await async, ili i 2ta  nacini sto gi iskoristiv se losa praksa?
   

        // PRASANJE -> Kako da namestam property na object da bidi vlezen atribut za funkcija
        // example :
        let dummyFunction = (arr, property, number)=> {
            arr.filter((arr, property)=> { 
                if (arr.property >= number){
                    return arr;
                }
            })
        }
        // dokolku sakam ovaa funkcija da ja iskoristam kako kaj prviot primer vnatre vo fetch so zadadeni parametri,
        // na primer da ja povikam dummyFunction(data, averageGrades, 3) -> bi trebalo da vrati sekoj "student" so averageGrades >= 3.
    