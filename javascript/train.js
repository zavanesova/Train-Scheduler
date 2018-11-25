//initialize firebase
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

//create variables for form inputs
var trainName = "";
var destination = "";
var frequency = "";
var trainTime = "";


$('#submit').on("click", function (event) {
    event.preventDefault();

    //grabs the values the user input
    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    frequency = $('#frequency').val().trim();

    trainTime = $('#train-time').val().trim();

    //pushes those values and stores in firebase under new-trains folder
    database.ref('/new-trains').push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        trainTime: trainTime,
    });

    //clears input box 
    $('#train-name').val('');
    $('#destination').val('');
    $('#frequency').val('');
    $('#train-time').val('');
    
  });

database.ref('/new-trains').on("child_added", function(snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName, sv.destination, sv.trainTime, sv.frequency);

    //variables for when a new train is added
    var newName = sv.trainName;
    var newDestination = sv.destination;
    var newFrequency = parseInt(sv.frequency);
    var firstTime = sv.trainTime;

    //using moment.js for time 
    //subtract 1 year to avoid negatives
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "year");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % newFrequency;
    var minutesAway = newFrequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");

    //add the new train to the current table by adding a new table row
    var newRow = $('<tr>').append(
        $('<td>').text(newName),
        $('<td>').text(newDestination),
        $('<td>').text(newFrequency),
        $('<td>').text(nextTrain),
        $('<td>').text(minutesAway)
    );
    $('#table-body').append(newRow);
    
});

