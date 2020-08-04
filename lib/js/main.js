// get references using the dom
const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let db = firebase.database().ref(); // getting the reference point for my database


/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    // emptying out the textbox after we press the button
    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    // data schema (structure) the way you want to organize your data
    // added new data into our database
    let value = {
        // 2 columns  within each row
        name: username,
        message: message,
    };

    db.push(value); // making the rows

}

// Set database "child_added" event listener here
db.on("child_added",addMessageToBoard);
let messageContainer = document.querySelector(".allMessages")

function addMessageToBoard(rowData) {
    //extract the row data
    let row = rowData.val(); // return an object just like the object we pushed for value
    console.log(row)

    // this is the point where you can start using the information from the database
    let say_name = row.name;
    let sentence = row.message;

    let newP = document.createElement("p")
    newP.innerText = say_name + ": " + sentence
    messageContainer.appendChild(newP)


}