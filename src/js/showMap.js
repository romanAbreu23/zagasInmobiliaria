(function() {
    const lat = document.querySelector('#lat').textContent;
    const lng = document.querySelector('#lng').textContent;
    const title = document.querySelector('#title').textContent;
    const price = document.querySelector('#price').textContent;
    const map = L.map('map').setView([lat, lng], 16);

    // IMPORTANTE para mostrar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar el Pin
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(title)

})()