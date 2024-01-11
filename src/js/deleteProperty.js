(function() {

    const deleteBtn = document.querySelectorAll('.delete-property');
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', deleteProperty)
    });

    async function deleteProperty(e) {
        const { propertyId: id } = e.target.dataset;

        try {
            const url = `/propiedades/eliminar/${id}`;

            Swal.fire({
                title: "¿Eliminar propiedad?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1e40af",
                cancelButtonColor: "#dc2626",
                confirmButtonText: "¡Confirmar!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {

                    window.location = url;

                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'CSRF-Token': token
                        }
                    });

                    Swal.fire({
                        title: "!Eliminada!",
                        text: "La propiedad ha sido eliminada.",
                        icon: "success"
                    });
                }
            });

        } catch (error) {
            console.log(error);
        }

    }

})()