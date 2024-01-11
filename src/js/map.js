(function() {

    const lat = document.querySelector('#lat').value || 16.178867;
    const lng = document.querySelector('#lng').value || -95.1919363;
    const map = L.map('map').setView([lat, lng ], 14);
    let marker;

    // Utilizar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    // IMPORTANTE para mostrar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // El Pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(map)

    // Detectar el movimiento del pin
    marker.on('moveend', function(e) {
        marker = e.target
        const position = marker.getLatLng();
        map.panTo(new L.LatLng(position.lat, position.lng))

        // Obtener la información de las calles al soltar el Pin
        geocodeService.reverse().latlng(position, 14).run(function(error, result) {
            console.log(result)
            const address = result.address.LongLabel;
            const city = result.address.Subregion;
            marker.bindPopup(address)

            // Mostrar la dirección
            document.querySelector('.address').textContent = address ?? '';
            // Llenar los campos
            document.querySelector('#address').value = address ?? '';
            document.querySelector('#city').value = city ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        })
    })

})()