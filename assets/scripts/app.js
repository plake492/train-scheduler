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
let nextArrival = 0;
let minutesAway = 0;

const format = "MMMM Do YYYY HH:mm"
const currentTime = moment().format(format)

$('#time').text(currentTime)


// ========================  VARIABLES ======================== //
// ========================  SUBMITT DATA ======================== //
$("#click").on("click", function() {
  event.preventDefault();

  trainName = $("#name-input").val().trim()
  destination = $("#destination-input").val().trim()
  nextArrival = $("#time-input").val()
  frequency = $("#frequency-input").val().trim()

  let newTrain = {
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival
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
  let nextArrival = snap.nextArrival;


  nextArrival = moment(nextArrival, "HH:mm")

  let diffTime = nextArrival.diff(moment(), 'minutes')
  console.log(diffTime)

  if (diffTime < nextArrival) {
    diffTime = diffTime + 1440 //number of min in a day
  }

  let minutesAway = diffTime

  nextArrival.format("HH:mm")
 
  
  $("#newTrain").append(`
  <tr>
    <td id="name">${trainName}</td>
    <td id="destination">${destination}</td>
    <td id="frequency">${frequency}</td>
    <td id="nextArrival">${nextArrival}</td>
    <td id="minutesAway">${minutesAway}</td>
  </tr> 
  `);
}), function(errorObject) {
  console.log("The read failed: " + errorObject.code);

};
// ======================== LOAD/ADD DATABASE ======================== //
 

// const testTime = moment()

//   $("#TIMETEST").on('click', function() {
//     event.preventDefault()

//     TEST = $("#TEST").val().trim()

//     TEST = moment(TEST, "HH:mm")
//     console.log(TEST)
//     // $("#test").append(testTime.toString() + "      " + TEST + "        ")

//     let diffTime = TEST.diff(moment(), 'minutes')

//     if (diffTime < TEST) {
//       diffTime = diffTime + 1440 //number of min in a day
//     }
//     // diffTime = Math.abs(diffTime)
//     // let newTime = testTime + diffTime
//     // newTime = moment(newTime, "X").format("HH:mm")

//     $("#fuck").append(diffTime)
//   });