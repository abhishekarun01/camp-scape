mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: campground.geometry.coordinates,
    zoom: 10
});

new mapboxgl.Marker().setLngLat(campground.geometry.coordinates).setPopup(new mapboxgl.Popup({
    offset: 25
}).setHTML(`<h5>${campground.title}</h5>`)).addTo(map)