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
let minutesAway = 0;

    // =============== DISPLAY CURRENT TIME ===============//
    const format = "MMMM Do YYYY HH:mm"
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
    firstTrainTime = moment(firstTrainTime, "HH:mm")
    frequency = moment(frequency, "mm")  

    let minutesAway = parseInt(firstTrainTime.diff(moment(), 'minutes'))
      console.log("FREQUENCY_____________" +frequency)
      console.log("FirstTrain Time _______" + firstTrainTime)
      // if (diffTime <=  0) {
      //   firstTrainTime = firstTrainTime + frequency
      // }
      
      firstTrainTime.format("HH:mm")
    // =============== TIME ===============//

  $("#newTrain").append(`
  <tr>
    <td id="name">${trainName}</td>
    <td id="destination">${destination}</td>
    <td id="frequency">${frequency.format("mm")}</td>
    // <td id="firstTrainTime">${firstTrainTime.format("HH:mm A")}</td>
    <td id="minutesAway">${minutesAway}</td>
  </tr> 
  `);
}), function(errorObject) {
  console.log("The read failed: " + errorObject.code);

};
// ======================== LOAD/ADD DATABASE ======================== //
 