// ## Exercise 1
// Create a button
// When the button is clicked, get the data from a given url with an AJAX call. \
// Print the name of the academy in an **h1** tag. \
// Print all student names in an **unordered list**. \
// **URL:** https://raw.githubusercontent.com/Drakso/AJS2019/master/Class1/students.json \
// **NOTE:** You need to parse this data before using it.

// ## Exercise 2
// Create a button
// When the button is clicked, call the StarWars api for the first person. \
// Print the person name in an **h1** tag. \
// Print the person stats in a **table**:
// * Height
// * Weight
// * Eye color
// * Hair color

// **URL:** https://swapi.dev/api/people/1 \
// **NOTE:** JQuery will autmatically parse this call (js will not).

$(document).ready(function (){
    $("#getStudentsButton").click(function(){
        $.ajax({
            url:"https://raw.githubusercontent.com/Drakso/AJS2019/master/Class1/students.json",
            success: function (response){
                let data = JSON.parse(response);
                console.log(data)
                $("#printAcademy").html(data.academy)
                $("#studentList").html('')
                for (let student of data.students){
                    $("#studentList").append(`<li>${student}</li>`)
                }    
            },
            error: function (response){
                console.log(`Error: Bad request`, response)
            }
            
        })
    })

    $("#starWarsButton").click(function(){
        $.ajax({
            url:"https://swapi.dev/api/people/1",
            success: function(response){
                $("#swapiCharacter").html(response.name);
                $("#swapiTable").html('')
                for (property in response){
                    if(property === "height" || property === "mass" || property === "eye_color" || property === "hair_color")
                    {
                        $("#swapiTable").append(
                        `
                            <tr>
                                <td>${property}:</td>
                                <td>${response[property]}</td>
                            </tr>
                        `
                        )
                    }
                }$("td").css("border","1px solid black")
                // for (const property in response){
                //     $("#swapiTable").append(
                //         `
                //             <tr>
                //                 <td>${property}:</td>
                //                 <td>${response[property]}</td>
                //             </tr>
                            
                //         `
                //     ).css('margin','1px')
                // }$("td").css("border","1px solid black")


            },
            error: function (response){
                console.error(`Error: Bad request`, response)
            }
        })
    })
});
