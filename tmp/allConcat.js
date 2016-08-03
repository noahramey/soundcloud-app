var SC = require('soundcloud');

$(document).ready(function() {
  SC.initialize({
    client_id: '8418c9c411768d55ad2b573b274b1de8'
  });
  SC.get('/tracks/' + (Math.floor((Math.random() * 300000000) + 10000000))).then(function(track){
    SC.oEmbed(track.permalink_url, { auto_play: true }).then(function(oEmbed) {
      $('#widget').html(oEmbed.html);
    });
    console.log(track);
  });
});
// $(document).ready(function() {
//   // initialization
//   SC.initialize({
//     client_id: "15c5a12b5d640af73b16bd240753ffbb"
//   });
//
//   // Play audio
//   // $("#embedTrack").click(function() {
//     var player = $("#player");
//     SC.oEmbed('https://soundcloud.com/mureed-abbas-shah/sami-meri-waar-by-qb-umair', {
//       maxheight: 200
//     }, function(res) {
//       $("#player").html(res.html);
//     });
//
// });
