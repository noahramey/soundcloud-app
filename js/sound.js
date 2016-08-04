var SC = require('soundcloud');

SC.initialize({
  client_id: '8418c9c411768d55ad2b573b274b1de8'
});

function Playlist() {
  this.tracksUrlArray = [];
  this.tracksArtArray = [];
  this.playedTracksUrlArray = [];
  this.playedTracksArtArray = [];
  this.counter = 0;
}

Playlist.prototype.findTracksForArray = function() {
  var self = this;
  var random = (Math.floor((Math.random() * 300000000) + 10000000));
  SC.get('/tracks/' + random).then(function(track){
    if (track.playback_count > 0) {
      self.tracksUrlArray.push(track.permalink_url);
      if (track.artwork_url) {
        self.tracksArtArray.push(track.artwork_url);
      } else {
        self.tracksArtArray.push(track.user.avatar_url);
      }
    } else {
      self.findTracksForArray();
    }
  }).catch(function(error) {
    self.findTracksForArray();
  });
};

Playlist.prototype.loadTrack = function() {
  var self = this;
  SC.oEmbed(self.tracksUrlArray[self.counter], { auto_play: true }).then(function(result) {
    $('#widget').html(result.html);
  });

  for (var i = 0; i < self.playedTracksUrlArray.length; i++) {
    $('#last-songs').prepend('<div class="row"><a target="_blank" href="' + self.playedTracksUrlArray[i] + '"><img src="' + self.playedTracksArtArray[i] + '" class="thumb"></a></div>');
  }

  self.playedTracksUrlArray.push(self.tracksUrlArray[self.counter]);
  self.playedTracksArtArray.push(self.tracksArtArray[self.counter]);
  self.counter += 1;
};

exports.soundCloudModule = SC;
exports.playlistModule = Playlist;
