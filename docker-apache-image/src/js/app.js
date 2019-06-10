$(function () {

  var temp = $.trim($('#meteo-template').html());
  var temp2 = $.trim($('#meteo-day').html());
  function getMeteo() {

    $.getJSON("http://localhost:3000/api/meteo/").done((data) => {
      $("#meteo").empty();
      $.each( data, function( i, item ) {

        var x = temp.replace("{{ city.cityname }}", item.city.cityname);
        x = x.replace("{{ city.citylat }}", item.city.citylat);
        x = x.replace("{{ city.citylong }}", item.city.citylong);
        x = x.replace("{{ meteo.temperature }}", item.meteo.temperature);
        x =x.replace("{{ meteo.precipitation }}", item.meteo.precipitation);



        $("#meteo").append(x);
      });
    }).fail(function() {
      console.log( "error" );
    });
  };

  getMeteo();
  setInterval(getMeteo, 5000);
});
