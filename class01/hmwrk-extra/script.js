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
// Student signup
// Create a form with first name, last name, birth year and academy
// Create a button for signing up
// The button should create a new Student object and add it in the array of students

let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let dateOfBirth = document.getElementById("inputDate");
let academy = document.getElementById("inputAcademy");

let signUpBtn = document.getElementById("signUpBtn");

let allStudents = []
function Student(fName, lName, dateOfBirth, academy){
    this.firstName = fName.value;
    this.lastName = lName.value;
    this.dateOfBirth = dateOfBirth.value;
    this.academy = academy.value;
    this.grades = [];
    this.getAge = () => {

        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth()+1;
        let year = currentDate.getFullYear();
        
        let dob = new Date(this.dateOfBirth);
        let studentDay = dob.getDate();
        let studentMonth = dob.getMonth()+1;
        let studentYear = dob.getFullYear();
        
        let calculateYears = year - studentYear;
        if (studentMonth > month){
            calculateYears -= 1;
        }
        else if (studentDay > day){
            calculateYears -= 1;
        }
        
        return calculateYears;
    }
    this.getInfo = () => {
        return (`This is ${this.firstName} ${this.lastName} from the academy ${this.academy}`)
    }
    this.getGradesAverage = () => {
        let sum = 0;
        for (let i = 0; i < this.grades.length; i++){
            sum += this.grades[i];
        }
        return sum / this.grades.length
    }
}
signUpBtn.addEventListener("click", ()=> {
    if (fName.value && fName.value.length > 2 && lName.value && lName.value.length > 2 && dateOfBirth.value && academy.value && academy.value.length > 2){
        let student = new Student (fName, lName, dateOfBirth, academy);
        allStudents.push(student);
        console.log(allStudents)
        document.getElementById("signUpMsg").innerHTML = (`Registration successful`);
    } else{
        document.getElementById("signUpMsg").innerHTML = (`Please enter valid inputs`);
    }
})

let userName = document.getElementById("profUser");
let password = document.getElementById("profPassword");
let profLogin = document.getElementById("loginBtn");

let professors = [];

function Professor (username, password){
    this.userName = username;
    this.password = password;
}

let admin = new Professor ("admin", "admin");
professors.push(admin);
console.log(professors);
let newGrades = "";
profLogin.addEventListener("click", () => {
    for (let check of professors){
        if (userName.value === check.userName && password.value === check.password){
            let newBtn = 0;
            let newInput = 0;
            let key = 0;
            document.getElementById("studentForm").style.display = "none";
            document.getElementById("professorForm").style.display = "none";

            document.addEventListener("click", (e)=> { 
                if (e.target.matches("button")){
                    allStudents.map()
                }
            
            })
            document.addEventListener("input", (b) => {
                if (b.target.matches("input")){
                    newGrades = b.target.value
                }
            })
            let studentUl = document.getElementById("studentList");
            studentUl.innerHTML += (
                `
                    ${allStudents.map((student)=> {
                        return (
                            
                            `
                            <li key="${student.firstName}">
                            First Name: ${student.firstName}</br>
                            Last Name: ${student.lastName}</br>
                            DOB: ${student.dateOfBirth}</br>
                            Academy: ${student.academy}</br>
                            Grades: ${student.grades}</br>
                            <input type="text" id="gradesInput${newInput += 1}" placeholder="Grades">
                            <button type="button" id="gradesButton${newBtn += 1}
                            ">Submit</button> <br />
                            Age: ${student.getAge()} </ br>
                            Info: <b>${student.getInfo()} </b> <br/>
                            Average: ${student.getGradesAverage()} </br>
                            <br>
                            <br>
                            </li>
                            `
                        )
                        
                    }).join("")}
                      
                `
            )
            // zemi key za da go zemis studentot so loop
            
                
        
            
            
            // document.getElementById("studentList").innerHTML += (
            // `
            //         ${allStudents.map((student) => {
                        
            //             return (
            //                 `
            //                     <li id="key${key += 1}">
            //                         First Name: ${student.firstName}</br>
            //                         Last Name: ${student.lastName}</br>
            //                         DOB: ${student.dateOfBirth}</br>
            //                         Academy: ${student.academy}</br>
            //                         Grades: ${student.grades}</br>
            //                         <input type="text" id="gradesInput${newInput += 1}" placeholder="Grades">
            //                         <button type="button" id="gradesButton${newBtn += 1}
            //                         ">Submit</button> <br />
            //                         Age: ${student.getAge()} </ br>
            //                         Info: <b>${student.getInfo()} </b> <br/>
            //                         Average: ${student.getGradesAverage()} </br>
            //                     </li>
            //                     <br>
            //                     <br>
            //                 `
                            
            //             )
            //         }).join("")}
            // `
            // )
        }
            
        else{
            document.getElementById("profMsg").innerHTML = (`Wrong username or password`)
        }
    }
})