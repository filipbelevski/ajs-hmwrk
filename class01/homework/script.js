//Exercise #1
// Create a constructor function for Student objects with:
// Properties:
// firstName
// lastName
// birthYear
// academy
// grades - array of numbers
// Methods:
// getAge() - returns age of student
// getInfo() - returns "This is student firstName* lastName* from the academy academy*!"
// getGradesAverage() - returns the average of the student grades
// Create an array with 3 students

// Exercise #2
// Student signup
// Create a form with first name, last name, birth year and academy
// Create a button for signing up
// The button should create a new Student object and add it in the array of students

let allStudents =[]
function Student (firstName, lastName, birthYear, academy){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.academy = academy;
    this.grades = []
    this.getAge = function (){
        let date = new Date();
        let year = parseInt(date.getFullYear());
        return year - this.birthYear;
    }
    this.getInfo = function(firstName, lastName, academy){
        return `This is ${this.firstName} ${this.lastName} from the academy ${this.academy}`
    }
    this.getGradesAverage = function (){
        let sum = 0;
        for(let i of this.grades){
            sum += i
        }
        return sum / this.grades.length
    }
}

let filip = new Student ("Filip", "Belevski", 1994, "SEDC");
filip.grades.push(44, 55, 66)
let ana = new Student("Ana","Anevska", 1993, "SEDC");
ana.grades.push(5, 10, 15)
let bob = new Student("Bob","Bobski", 1898, "SEDC");
bob.grades.push(20, 30, 40)
allStudents.push(filip, ana, bob)
console.log(allStudents, allStudents[0].getGradesAverage(), allStudents[1].getInfo())


document.getElementById("signUpButton").addEventListener("click", function (){
    let userFirstName = document.getElementById("inputFirstName").value
    let userLastName = document.getElementById("inputLastName").value
    let userBirthYear = parseInt(document.getElementById("inputBirthYear").value)
    let userAcademy = document.getElementById("inputAcademy").value
    let paragraph = document.getElementById("signUpInfo");

    if(userFirstName !== undefined && userFirstName !== "" && userLastName !== undefined && userLastName !=="" &&  userBirthYear && userBirthYear !== Number() !== undefined && userBirthYear!== "" && userAcademy !== undefined && userAcademy !== ""){
        let newStudent = new Student (userFirstName, userLastName, userBirthYear, userAcademy)

        allStudents.push(newStudent)
        console.log(allStudents)
        paragraph.innerHTML = `Registration successful`
    }
    else{
        paragraph.innerHTML = `Please enter valid inputs`
    }

    
})