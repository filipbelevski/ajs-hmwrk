
let assignment = () => {
    let studentsHigherThan3 = [];
    let femalesAverage5 = [];
    let malesSkopje18 = [];
    let maleNameStartsWithB = [];
    fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json")
    .then(response => response.json())
    .then(data => data.filter((data)=> {
            if(data.averageGrade >= 3){
                studentsHigherThan3.push(data)
            }
            if(data.averageGrade === 5 && data.gender === "Female"){
                femalesAverage5.push(data.firstName)
            }
            if(data.gender === "Male" && data.city === "Skopje" && data.age >= 18){
                malesSkopje18.push(`${data.firstName} ${data.lastName}`)
            }
            if(data.age >= 24 && data.gender === "Female"){
                console.log(`${data.firstName}who is ${data.age}, average grade is ${data.averageGrade}`)
            }
            if(data.gender === "Male" && data.firstName[0] === "B" && data.averageGrade >=2 ){
                maleNameStartsWithB.push(data.firstName)
        }
        }))

    .catch(err => console.error(err))

console.log(studentsHigherThan3)
console.log(femalesAverage5)
console.log(malesSkopje18)
console.log(maleNameStartsWithB)

}   
assignment()

// * All students with an average grade higher than 3 -- -- - -
// * All female student names with an average grade of 5
// * All male student full names who live in Skopje and are over 18 years old
// * The average grades of all female students over the age  of 24
// * All male students with a name starting with B and average grade over 2