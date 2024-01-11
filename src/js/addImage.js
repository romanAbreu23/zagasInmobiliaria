import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let arrayFiles = [];

Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus imagenes aquí',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 2,
    maxFiles: 6,
    parallelUploads: 6,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar archivo',
    dictMaxFilesExceeded: 'El limite son 6 imagenes',
    headers: {
        'CSRF-Token': token
    },
    paramName: 'image',
    init: function() {
        // Función para subir las imagenes
        const dropzone = this;

        // dropzone.on('addedfile', function(file) {
        //     arrayFiles.push(file);
        //     console.log(arrayFiles)
        // });

        const btnPublish = document.querySelector('#publish');

        btnPublish.addEventListener('click', function() {
            dropzone.processQueue()
        });

        dropzone.on('queuecomplete', function() {
            if (dropzone.getActiveFiles().length === 0) {
                window.location.href = '/mis-propiedades'
            }
        });
    }
}