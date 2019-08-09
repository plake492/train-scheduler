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
      console.log("convereted" + convertTrainTime)
      //time between firstTrain and Current Time
      let newTime = moment().diff(moment(convertTrainTime), "minutes");

      let remainder = newTime % frequency;
      console.log("New Time:  " + newTime)
      console.log("Frequency:  " + frequency)
      console.log("======")
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



// ======================== Connect TO Live Trian API ======================== //
// let station = $(this).attr("data-name"); 
// const queryURL = "http://transportapi.com/v3/uk/places.json?query=" + station + "&type=train_station&app_id=810f327a&app_key=7648ed95a840fc22d49f0237259e2df9";


// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .then(function(response) {

//   console.log(response)
//   console.log(response.member[0].name)
//   console.log(response.member[0].latitude)
//   console.log(response.member[0].longitude)

//   $("#clickStation").on("click", function() {
//     event.preventDefault()
//     station = $("#stationInput").val().trim()
//     console.log(station)

//     $("#realTrain").append(`
//     <tr>
//       <td id="name">${response.member[0].name}</td>
//       <td id="latitude">${response.member[0].latitude}</td>
//       <td id="longitude">${response.member[0].longitude}</td>
//     </tr> 
//     `);

//   });
// });
// ======================== Connect TO Live Trian API ======================== //



// ======================== Train GIF ======================== //
let queryURL2 ="https://api.giphy.com/v1/gifs/search?api_key=7h1vvQHXMixjDPQUyFAyvM6d9E60ANw4&q=train&limit=100&rating=g";
       
  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response) {
  console.log(response)
  

  $('#click').on('click', displayGif);

   
    function displayGif () {
      $('#gif').empty()
      
      for (let i =0; i < 4; i++) {
      let random = Math.floor(Math.random() *100)
      console.log(random)
    
      $('#gif').append(`
      <div>
       <img id="gifImg"src="${response.data[random].images.fixed_width.url}">
      </div>   
      `)
      }
      console.log(response.data[random].images.fixed_width.url)
    
  };
});
// ======================== Train GIF ======================== //

