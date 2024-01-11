(function() {

    const sendBtn = document.querySelectorAll('.send-message');
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    sendBtn.forEach(btn => {
        btn.addEventListener('click', contactMessage)
    });

    async function contactMessage(e) {

        const { errors } = e.target.dataset;

        try {
            const url = '/contacto';

                if (!errors) {

                    window.location = url;

                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'CSRF-Token': token
                        }
                    });

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "¡Gracias por contactarnos!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

        } catch (error) {
            console.log(error);
        }

    }

})()