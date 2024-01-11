(function() {

    const changeStatusBtn = document.querySelectorAll('.change-status');
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    changeStatusBtn.forEach(btn => {
        btn.addEventListener('click', changeStatusProperty)
    });

    async function changeStatusProperty(e) {
        const { propertyId: id } = e.target.dataset;

        try {
            const url = `/propiedades/${id}`;

            const result = await fetch(url, {
                method: 'PUT',
                headers: {
                    'CSRF-Token': token
                }
            });

            const { status } = await result.json()

            if (status) {
                if (e.target.classList.contains('bg-slate-100')) {
                    
                    e.target.classList.add('bg-green-100', 'hover:bg-green-200', 'text-green-800')
                    e.target.classList.remove('bg-slate-100', 'hover:bg-slate-200', 'text-red-800')
                    e.target.textContent = 'Publicado'
                } else {
                    e.target.classList.remove('bg-green-100', 'hover:bg-green-200', 'text-green-800')
                    e.target.classList.add('bg-slate-100', 'hover:bg-slate-200', 'text-red-800')
                    e.target.textContent = 'No publicado'
                }
            }

        } catch (error) {
            console.log(error);
        }

    }

})()