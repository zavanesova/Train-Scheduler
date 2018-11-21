var config = {
    apiKey: "AIzaSyCbethiZRUaewa7ZWkaAPQ5OoS54MxrDKg",
    authDomain: "train-scheduler-ad0ff.firebaseapp.com",
    databaseURL: "https://train-scheduler-ad0ff.firebaseio.com",
    projectId: "train-scheduler-ad0ff",
    storageBucket: "train-scheduler-ad0ff.appspot.com",
    messagingSenderId: "180641271730"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = "";
var trainTime = "";

$('#submit').on("click", function (event) {
    event.preventDefault();

    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    frequency = $('#frequency').val().trim();

    trainTime = $('#train-time').val().trim();

    database.ref('/new-trains').push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        trainTime: trainTime,
    });
  });

database.ref('/new-trains').on("child_added", function(snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName, sv.destination, sv.trainTime, sv.frequency);

    var newName = sv.trainName;
    var newDestination = sv.destination;
    var newFrequency = sv.frequency;
    var newTime = sv.trainTime;

    // var minutesAway = moment().diff(moment(newTime, "HH:mm"), "minutes");
    var minutesAway = moment(newTime, "HH:mm").diff(moment(), "minutes");

    var newRow = $('<tr>').append(
        $('<td>').text(newName),
        $('<td>').text(newDestination),
        $('<td>').text(newFrequency),
        $('<td>').text(newTime),
        $('<td>').text(minutesAway)
    );
    $('#table-body').append(newRow);


});