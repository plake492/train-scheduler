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
const database = firebase.database();
// ========================  Firebase configuration ======================== //


// ========================  VARIABLES ======================== //
let trainName = "new";
let destination = "new ";
let frequency = 0;
let firstTrainTime = 0;

    // =============== DISPLAY CURRENT TIME ===============//
    const format = "HH:mm A"
    const currentTime = moment().format(format)
    $('#time').text(currentTime)
    // =============== DISPLAY CURRENT TIME ===============//
// ========================  VARIABLES ======================== //


// ========================  SUBMITT DATA ======================== //
$("#click").on("click", function() {
  event.preventDefault();

  trainName = $("#name-input").val().trim()
  destination = $("#destination-input").val().trim()
  firstTrainTime = $("#time-input").val()
  frequency = $("#frequency-input").val().trim()

  let newTrain = {
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrainTime: firstTrainTime
  };
  


  database.ref().push(newTrain);

  $("#name-input").val("")
  $("#destination-input").val("")
  $("#time-input").val("")
  $("#frequency-input").val("")
});
// ========================  SUBMITT DATA ======================== //


// ========================  LOAD/ADD DATABASE ======================== //
database.ref().on("child_added", function(childSnapshot) {
  let snap = childSnapshot.val();
  
  console.log(childSnapshot.val());

  let trainName = snap.trainName;
  let destination = snap.destination;
  let frequency = snap.frequency;
  let firstTrainTime = snap.firstTrainTime;

    // =============== TIME ===============//
    let convertTrainTime = moment(firstTrainTime, "HH:mm").subtract(1, "days");

    //time between firstTrain and Current Time
    let newTime = moment().diff(moment(convertTrainTime), "minutes");
    console.log("new Time:  " + newTime)

    let remainder = newTime % frequency;
    console.log("REAMINDER:   " + remainder);

    let minutesAway = frequency - remainder
    let nextTrain = moment().add(minutesAway, "minutes");
    let nextArrival = moment(nextTrain).format("HH:mm");
    // =============== TIME ===============//

  $("#newTrain").append(`
  <tr>
    <td id="name">${trainName}</td>
    <td id="destination">${destination}</td>
    <td id="frequency">${frequency}</td>
    // <td id="firstTrainTime">${nextArrival}</td>
    <td id="minutesAway">${minutesAway}</td>
  </tr> 
  `);
}), function(errorObject) {
  console.log("The read failed: " + errorObject.code);

};
// ======================== LOAD/ADD DATABASE ======================== //


// if the first trian arrives at 12 noon, and comes every 60 minutes, 
//train would come at 1, 2, 3, 4, 5, 6, 7, etc
// at 12:15am, the train would be 45 minutes away