$(document).ready(function () {
  // Handler for .ready() called.
  $("#currentDay").text(moment().format("dddd, MMM Do"));
});
