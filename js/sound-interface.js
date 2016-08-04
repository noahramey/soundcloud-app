var Playlist = require('./../js/sound.js').playlistModule;

$(document).ready(function() {
  var myPlaylist = new Playlist();
  for (var i = 0; i < 50; i++) {
    myPlaylist.findTracksForArray();
  }
  $('#start-stream').click(function() {
    $('#start-stream').hide();
    $('#skip-song').show();
    $('#widget').fadeIn();
    myPlaylist.loadTrack();
  });
  $('#skip-song').click(function() {
    $('#widget').removeClass("twelve columns").addClass("ten columns");
    $('#last-songs').text("");
    myPlaylist.loadTrack();
  });
});
