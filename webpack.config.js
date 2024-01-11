import path from 'path';

export default {
    mode: 'development',
    entry: {
        map: './src/js/map.js',
        addImage: './src/js/addImage.js',
        showMap: './src/js/showMap.js',
        mapHome: './src/js/mapHome.js',
        filtersHome: './src/js/filtersHome.js',
        changeStatus: './src/js/changeStatus.js',
        deleteProperty: './src/js/deleteProperty.js',
        swiper: './src/js/swiper.js',
        sendMessage: './src/js/sendMessage.js',
        // lightboxPlusJquery: './src/js/lightbox-plus-jquery.min.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}