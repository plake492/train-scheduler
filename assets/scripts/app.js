// ========================  Firebase configuration ======================== //
var firebaseConfig = {
    apiKey: "AIzaSyDOuODeg8SNCMNDdCZ2zv4eI6yl41p2lls",
    authDomain: "train-scheduler-3c06a.firebaseapp.com",
    databaseURL: "https://train-scheduler-3c06a.firebaseio.com",
    projectId: "train-scheduler-3c06a",
    storageBucket: "",
    messagingSenderId: "413174959670",
    appId: "1:413174959670:web:408c26be740e140d"
  };

  firebase.initializeApp(firebaseConfig);
// ========================  Firebase configuration ======================== //


// ========================  VARIABLES ======================== //
const database = firebase.database();
let clickCounter = 0;
let trainName = "new";
let destination = "new ";
let frequency = 0;
let nextArrival = 0;
let minutesAway = 0
// ========================  VARIABLES ======================== //


// ========================  SUBMITT DATA ======================== //
$("#click").on("click", function() {
  event.preventDefault();
  clickCounter++;

  trainName = $("#name-input").val()
  destination = $("#destination-input").val()
  nextArrival = $("#time-input").val()
  frequency = $("#frequency-input").val()

  database.ref().set({
    trainName,
    destination,
    frequency,
    nextArrival,
    minutesAway,
  });


  updateInfo()

});
// ========================  SUBMITT DATA ======================== //


updateInfo = () => $("#newTrain").append(`
<tr>
  <td id="name">${trainName}</td>
  <td id="destination">${destination}</td>
  <td id="frequency">${frequency}</td>
  <td id="nextArrival">${nextArrival}</td>
  <td id="minutesAway">${minutesAway}</td>
</tr> 
`);

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());   
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    frequency = snapshot.val().frequency;
    nextArrival = snapshot.val().nextArrival;
    minutesAway = snapshot.val().minutesAway;

    updateInfo()

    $("#click-value").text(clickCounter);
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
