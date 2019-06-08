$(function () {

  var temp = $.trim($('#meteo-template').html());
  function getMeteo() {

    $.getJSON("http://localhost:3000/api/meteo/").done((data) => {
      $("#meteo").empty();
      $.each( data, function( i, item ) {

        var x = temp.replace("{{ city.cityname }}", item.city.cityname);
        console.log(x);
        $("#meteo").append(x);
      });
    }).fail(function() {
      console.log( "error" );
    });
  };

  getMeteo();
  setInterval(getMeteo, 5000);
});
