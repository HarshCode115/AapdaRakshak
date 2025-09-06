// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 26.922070, lng: 75.778885 },
//     zoom: 10,
//     // mapTypeId:"satellite"
//   });

//   let tourplan=new google.maps.Circle({
//     center:new google.maps.LatLng(26.922070,75.778885),
//     radius:15600,
//     strokeColor:"#FF0000",
//     fillColor:"#FF0000",
//     fillOpacity:0.4
//   });
//   tourplan.setMap(map);

//   new google.maps.Marker({
//     position:{lat:26.922070, lng:75.778885},
//     map:map,
//     label:"",
//     title:"Jaipur",
//     animation:google.maps.Animation.BOUNCE,
//     // icon:"map.png"
//   })
// }

// window.initMap = initMap;