var SC = require('soundcloud');

SC.initialize({
  client_id: '8418c9c411768d55ad2b573b274b1de8'
});

var random;
var tracksUrlArray = [];
var tracksArtArray = [];
var playedTracksUrlArray = [];
var playedTracksArtArray = [];


var findTracksForArray = function() {
  random = (Math.floor((Math.random() * 300000000) + 10000000));
  SC.get('/tracks/' + random).then(function(track){
    if (track.playback_count > 100) {
      tracksUrlArray.push(track.permalink_url);
      if (track.artwork_url) {
        tracksArtArray.push(track.artwork_url);
      } else {
        tracksArtArray.push(track.user.avatar_url);
      }
    } else {
      findTracksForArray();
    }
  }).catch(function(error) {
    findTracksForArray();
  });
};

var counter = 0;
var loadTrack = function() {
  SC.oEmbed(tracksUrlArray[counter], { auto_play: true }).then(function(result) {
    $('#widget').html(result.html);
  });

  // $('#last-songs').prepend('<div class="row"><a target="_blank" href="' + playedTracksUrlArray[counter - 1] + '"><img src="' + playedTracksArtArray[counter - 1] + '" class="thumb"></a></div>');

  playedTracksUrlArray.push(tracksUrlArray[counter]);
  playedTracksArtArray.push(tracksArtArray[counter]);
  counter += 1;
};


// FRONTEND
$(document).ready(function() {
  for (var i = 0; i < 10; i++) {
    findTracksForArray();
  }

  $('#skip-song').click(function() {
    $('#widget').removeClass("twelve columns").addClass("ten columns");
    $('#last-songs').text("");
    loadTrack(counter);
  });
});
