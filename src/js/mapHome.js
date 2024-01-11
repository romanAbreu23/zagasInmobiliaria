import { propertyPrice } from "../../helpers/priceFormat.js";

(function() {

    const lat = 18.6034212;
    const lng = -96.5625503;
    const map = L.map('map-home').setView([lat, lng ], 7);

    let markers = new L.FeatureGroup().addTo(map);
    let properties = [];

    // Filtros
    const filters = {
        category: '',
        price: '',
        sellRent: '',
        bedrooms: '',
        wc: '',
        garage: '',
        pets: '',
        pool: '',
    };

    const categoriesSelect = document.querySelector('#categories');
    const pricesSelect = document.querySelector('#prices');
    const sellRentSelect = document.querySelector('#sellRent');
    const bedroomsSelect = document.querySelector('#bedrooms');
    const wcSelect = document.querySelector('#wc');
    const garageSelect = document.querySelector('#garage');
    const petsSelect = document.querySelector('#pets');
    const poolSelect = document.querySelector('#pool');

    // IMPORTANTE para mostrar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Filtrar las categorias y precios
    categoriesSelect.addEventListener('change', e => {
        filters.category = +e.target.value
        filterProperties();
    });
    pricesSelect.addEventListener('change', e => {
        filters.price = +e.target.value
        filterProperties();
    });
    sellRentSelect.addEventListener('change', e => {
        filters.sellRent = e.target.value
        filterProperties();
    });
    bedroomsSelect.addEventListener('change', e => {
        filters.bedrooms = +e.target.value
        filterProperties();
    });
    wcSelect.addEventListener('change', e => {
        filters.wc = +e.target.value
        filterProperties();
    });
    garageSelect.addEventListener('change', e => {
        filters.garage = +e.target.value
        filterProperties();
    });
    petsSelect.addEventListener('change', e => {
        filters.pets = e.target.value
        filterProperties();
    });
    poolSelect.addEventListener('change', e => {
        filters.pool = e.target.value
        filterProperties();
    });

    const getProperties = async () => {
        try {

            const url = '/api/propiedades';
            const result = await fetch(url);
            properties = await result.json();

            showProperties(properties);

        } catch (error) {
            console.log(error);
        }
    }

    const showProperties = properties => {

        // Limpiar los markers previos
        markers.clearLayers();

        properties.forEach(property => {
            // Agregar los pines
            const marker = new L.marker([property?.lat, property?.lng], {
                autoPan: true
            })
            .addTo(map)
            .bindPopup(`
                <a href="/propiedad/${property?.id}">
                    <div class="overflow-hidden cursor-pointer group">
                        <h1 class="text-xl font-semibold capitalize text-primary truncate">${property?.title}</h1>
                        <div class="relative overflow-hidden py-2">
                            <img 
                                src="/uploads/${property?.images[0].name}" 
                                alt="Imagen de la propiedad ${property?.title}" 
                                class="object-cover h-12 w-full group-hover:scale-110 transition-all duration-500"
                            >
                        </div>
                        <p class="text-accent font-bold text-base">${property?.category.name}</p>
                        <p class="text-hover text-right text-lg font-semibold px-4">${propertyPrice(property?.realPrice)}</p>
                    </div>
                </a>
            `)

            markers.addLayer(marker)
        })
    };

    const filterProperties = () => {
        const reult = properties.filter(filterCategory)
            .filter(filterPrice).filter(filterSellRent)
            .filter(filterBedroom).filter(filterWc)
            .filter(filterGarage).filter(filterPets)
            .filter(filterPool);

        showProperties(reult);
    };

    const filterCategory = property => filters.category ? property.categoryId === filters.category : property;
    const filterPrice = property => filters.price ? property.priceId === filters.price : property;
    const filterSellRent = property => filters.sellRent ? property.sellRent === filters.sellRent : property;
    const filterBedroom = property => filters.bedrooms ? property.bedrooms === filters.bedrooms : property;
    const filterWc = property => filters.wc ? property.wc === filters.wc : property;
    const filterGarage = property => filters.garage ? property.garage === filters.garage : property;
    const filterPets = property => filters.pets ? property.pets === filters.pets : property;
    const filterPool = property => filters.pool ? property.pool === filters.pool : property;

    getProperties();

})()