/* Variables */
var sessionLength = 25; /*Default length of a session: 25 minutes */
var breakLength = 5; /* Default length of a break: 5 minutes*/
var tu;
var clockRunning;
var breakRunning;
var secsorig = 60 * sessionLength;
var breaksecsorig = 60 * breakLength;
var fillpercsession;
var fillsession;
var fillpercbreak;
var fillbreak;
$('.minutes').html(sessionLength);
//$('#seconds').html(seconds);
$('.breakminutes').html(breakLength);
$('.adminutes').html(sessionLength);
$('.adbreakminutes').html(breakLength);
$('.breakseconds').html('00');
$('.seconds').html('00');
//$('#breakseconds').html(breakseconds);
var seconds = sessionLength * 60;
var breakseconds = breakLength * 60;
var currentbreakseconds = breakseconds % 60;
var currentbreakminutes = Math.floor(breakseconds / 60);

function resetTimer() { /*Reset the timer and the settings to the original values */
  sessionLength = 25;
  breakLength=5;
  clearTimeout(tu);
  clockRunning = false;
  breakRunning=false;
  seconds = sessionLength * 60;
  breakseconds = breakLength * 60;
  secsorig = 60 * sessionLength;
  breaksecsorig = 60 * breakLength;         
  $('.minutes').html(sessionLength);
  $('.seconds').html('00');
  $('.adminutes').html(sessionLength);
  $('.adbreakminutes').html(breakLength);
  $('.breakminutes').html(breakLength);
  $('.breakseconds').html('');
  fillperc = 0;
  fill = fillperc + '%';
  $('#progresspercent').html(fill);
  $('#progressbarinner').css({"width": fill, "background-color": "#989898"});
  $('#clockinner').css({'border': 'none'});
  $('#clockinner').css({'background': '#eeeeee'});
}
function custom_session_inc() { /* Increase the session time*/
  if (!clockRunning) {
    sessionLength++;
    console.log(sessionLength);
    seconds = sessionLength * 60;
    secsorig = 60 * sessionLength;
    $('.minutes').html(sessionLength);
    $('.adminutes').html(sessionLength);
  }
}

function custom_session_dec() { /* Decrease the session time */
  if (!clockRunning && sessionLength > 1) {
    sessionLength--;
    seconds = sessionLength * 60;
    secsorig = 60 * sessionLength;
    $('.minutes').html(sessionLength);
    $('.adminutes').html(sessionLength);

  }
}

function custom_break_inc() { /*Increase the break time */
  if (!clockRunning) {
    breakLength++;
    breakseconds = breakLength * 60;
    breaksecsorig = breakLength * 60;
    $('.breakminutes').html(breakLength);
    $('.adbreakminutes').html(breakLength);
  }
}

function custom_break_dec() { /*Decrease the break time */
  if (!clockRunning && breakLength > 1) {
    breakLength--;
    breakseconds = breakLength * 60;
    breaksecsorig = breakLength * 60;
    $('.breakminutes').html(breakLength);
    $('.adbreakminutes').html(breakLength);
  }
}

function updatebreak() { /* This function will be executed after the session has ended */
  breakRunning = true;
  if (breakseconds > 0) {
    breakseconds--;
    tu = setTimeout(updatebreak, 1000);
    currentbreakseconds = breakseconds % 60;
    currentbreakminutes = Math.floor(breakseconds / 60);
    fillpercbreak = Math.floor(Math.abs((breakseconds / breaksecsorig) * 100 - 100)); /*Calculate percentage of current seconds to total, original seconds */
    fillbreak = fillpercbreak + '%';
    console.log(breaksecsorig);
    $('#progressbarinner').css({"width": fillbreak, "background-color": "#34495e"});
    $('#progresspercent').html(fillbreak);
    $('.minutes').html(currentbreakminutes);
    $('.seconds').html(currentbreakseconds);
    if (currentbreakseconds < 10) {
      $('.seconds').html('0' + currentbreakseconds);

    }
    if (currentbreakminutes === 0) {
      $('.minutes').html('0' + currentbreakminutes);

    }
  } else{ /*After both session and break have ended, reset all settings to default*/
   resetTimer();
  fillperc = 0;
  fill = fillperc + '%';
  $('#progresspercent').html(fill);
  $('#progressbarinner').css({"width": fill, "background-color": "#989898"});
  $('#clockinner').css({'border': 'none'});
  $('#clockinner').css({'background': '#eeeeee'});
    
  }
}

function updatetimer() { /* This function runs the session timer */
  clockRunning = true;
  if (seconds > 0) {
    seconds--;
    tu = setTimeout(updatetimer, 1000);
    var currentseconds = seconds % 60;
    var currentminutes = Math.floor(seconds / 60);
    $('.minutes').html(currentminutes);
    $('.seconds').html(currentseconds);
    fillpercsession = Math.floor(Math.abs((seconds / secsorig) * 100 - 100)); /*Calculate percentage of current seconds to total, original seconds */
    fillsession = fillpercsession + '%';
    $('#progressbarinner').css({"width": fillsession, "background-color": "#34495e"});
    $('#progresspercent').html(fillsession);
    if (currentminutes < 1) { 
      $('.minutes').html('0' + currentminutes);
      $('#clockinner').css({'border-color': '#e67e22','border-width':'1px','border-style':'solid'});

    }
    if (currentminutes < 1 && currentseconds < 10) {
      $('.seconds').html('0' + currentseconds);
      $('#clockinner').css({'border-color': '#e74c3c','border-width':'1px','border-style':'solid'});
    }
    
  } else { /*If session has ended*/
  
     $('#clockinner').css({'border': 'none'}); 
     $('#clockinner').css({'background': '#2ecc71'});
    var sound = 'https://dl.dropboxusercontent.com/u/2783623/sounds-882-solemn.mp3';
    var audio = new Audio(sound);
    audio.play();
    //break
    updatebreak(); /*Start the break*/
  }

}
/*Start of binding of the functions to the buttons*/
$('#stop').click(function() {
  clockRunning = false;
  breakRunning =false;
  console.log('alarm');
  clearTimeout(tu);

});
$('#start').click(function() {
  if (!clockRunning && !breakRunning) {
    $('.minutes').html(sessionLength);
    $("#progressbar").show();
    updatetimer();
  }

});
$('#plussession').click(function() {
  custom_session_inc();


});
$('#minussession').click(function() {
  custom_session_dec();

});
$('#plusbreak').click(function() {
  custom_break_inc();


});
$('#minusbreak').click(function() {
  custom_break_dec();

});
$('#reset').click(function() {
if(!clockRunning && !breakRunning){
  resetTimer();
  }
});
$("#adsettings").click(function() {
  $('#adjustsettings').fadeToggle("slow");
});
$("#adsession").click(function() {
  $("#adjustsession").fadeToggle();
});
$(document).ready(function() {
  $("#adjustsettings").hide();
});

$(document).ready(function() {
  $("#progressbar").hide();
});

