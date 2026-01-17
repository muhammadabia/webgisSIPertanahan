const map = L.map('map')
map.setView([-6.82932, 108.72814], 13);
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});
const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
        subdomains:['mt0','mt1','mt2','mt3']});
// Pembuatan Fitur Fullscreen
map.addControl(new L.Control.Fullscreen());
const home = {
        lat: -6.82932,
        lng: 108.72814,
        zoom: 13
    };
// Pembuatan Fitur Home Button
L.easyButton('fa-home', function (btn, map) {
        map.setView([home.lat, home.lng], home.zoom);
    }, 'Zoom To Home').addTo(map)
// Pembuatan Fitur My Location
map.addControl(
        L.control.locate({
            locateOptions: {
                enableHighAccuracy: true
            }
        })
    );
// Pemanggilan Layer Data Jalan
const jalan = new L.LayerGroup();
        $.getJSON("asset/Jalan.geojson", function (OBJECTID) {
            L.geoJSON(OBJECTID, {
                style: {
                    color : "red",
                    weight : 1,
                    opacity : 1,
                    lineJoin: 'round'
                },
                // Menampilkan Popup Data Atribut
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(
                        '<b>Panjang Jalan: </b>' + feature.properties.panjang_m.toFixed(2) + ' m'
                    );
                }
            }).addTo(jalan);
        });
        jalan.addTo(map);
// Pemanggilan Layer Data Persil
const persil = new L.LayerGroup();
        $.getJSON("asset/Persil.geojson", function (OBJECTID) {
            L.geoJSON(OBJECTID, {
                style: {
                    fillColor : "yellow",
                    fillOpacity: 0.3,
                    weight : 1,
                    opacity : 0.5,
                    color : "black"
                },
                // Menampilkan Popup Data Atribut
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(
                        '<b>Nama Pemilik: </b>' + feature.properties.Pemilik + '<br>' +
                        '<b>NIB: </b>' + feature.properties.NIB + '<br>' +
                        '<b>Luas Tanah: </b>' + feature.properties.Luas__m_.toFixed(2) + ' m²' + '<br>' +
                        '<b>Desa: </b>' + feature.properties.Desa + '<br>' +
                        '<b>Kecamatan: </b>' + feature.properties.Kecamatan + '<br>' +
                        '<b>Kabupaten: </b>' + feature.properties.Kabupaten
                    );
                }
            }).addTo(persil);
        });
        persil.addTo(map);
// Pembuatan Grup Basemap
const baseMaps = {
        "Openstreetmap" : basemapOSM,
        "OSM HOT" : osmHOT,
        "Google" : baseMapGoogle
    };
const overlayMaps = {
        "Jaringan Jalan" : jalan,
        "Persil Tanah" : persil,
    };
L.control.layers(baseMaps,overlayMaps).addTo(map);

// Menambahkan Legend
let legend = L.control({ position: "topright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML =
            // Judul Legenda
            '<p style= "font-size: 18px; font-weight: bold; margin-bottom: 5px; margin-top: 10px">Legenda</p>' +
            // Legenda Layer Jalan
            '<div><svg><line x1="0" y1="11" x2="25" y2="11" style="stroke-width:2;stroke:rgb(255,0,0);"/></svg></div>Jaringan Jalan<br>'+
            // Legenda Layer Persil Tanah
            '<div style="background-color: #FFFF00; outline: 1px solid black"></div>Persil Tanah<br>'
            return div;
        };
        legend.addTo(map);




