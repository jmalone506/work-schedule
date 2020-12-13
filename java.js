$(document).ready(function(){
    var events = [];
//function that listens for click on save icon
    $(".saveBtn").on("click", function(){

        var value = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");
        var dateAdded = moment().format("dddd,MM Do");
    
        events.push({description: value, time: time, date: dateAdded});

        localStorage.setItem("events", JSON.stringify(events));
    });

function timeUpdater(){
//gets current time and keeps time updated
    var currentHour = moment().hour();

    $("time-block").each(function(){
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        if(currentHour > blockHour){
        $(this).addClass("past");
        }
        else if(currentHour === blockHour){
            $(this).removeClass("past");
            $(this).addClass("present");
        }

        else{
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });

}

timeUpdater();

var timeLeft = 15;
function setTime() {
    setInterval(function(){
        timeLeft--;

        if(timeLeft === 0){
            timeUpdater();
            timeLeft = 15;
        }

    }, 1000);
}
setTime();
    //blank schedule on a new day

var currentDay = moment().format("dddd, MMMM Do");
for(var i = 0; i < events.length; i++){
    if(currentDay.isAfter(events[i].date)) {
        events[i].description = "",
        events[i].time ="",
        events[i].date = "",
        events.length = 0;
    } 
}
    //saved descriptions
var storedEvents = JSON.parse(localStorage.getItem("events"));

if( storedEvents !== null){
    events = storedEvents;
}

for(var i = 0; i < events.length; i++) {
    var userDescription = events[i].description;
    $("#" + events[i].time).children(".description").text(userDescription);
}
//shows the current date

});$("#currentDay").text(moment().format("dddd, MMMM Do"));
