// mobile nav
const mobileNav = document.querySelector('.mnav');
const closeBtn = document.querySelector('.mnav__close-btn');
const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');

const navOpenedClass = 'left-0';
const navClosedClass = '-left-[300px]';
const arrowLeftClass = 'ri-arrow-left-s-line';
const arrowRightClass = 'ri-menu-2-line';

closeBtn.addEventListener('click', () => {
    if(mobileNav.classList.contains(navClosedClass)) {
        mobileNav.classList.remove(navClosedClass);
        mobileNav.classList.add(navOpenedClass);

        closeBtnIcn.classList.toggle(arrowLeftClass);
        closeBtnIcn.classList.toggle(arrowRightClass);
    } else {
        mobileNav.classList.add(navClosedClass);
        mobileNav.classList.remove(navOpenedClass);

        closeBtnIcn.classList.toggle(arrowLeftClass);
        closeBtnIcn.classList.toggle(arrowRightClass);
    }
});

// faq
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
    const faqBtn = item.querySelector('.faq__btn');

    item.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        const iconClass = isOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line';
        const iconElement = faqBtn.querySelector('i');

        iconElement.classList = `${iconClass} text-2xl`;
    });
});

// Search
document.addEventListener('keyup', (e) => {

    if (e.target.matches('#search')) {
        document.querySelectorAll(".result").forEach(property => {
            property.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? property.classList.remove("filter") : property.classList.add("filter")
        })
    }
});

// const sendMessage = document.querySelector('.send-message');
// const error = document.querySelector('.error');

// sendMessage.addEventListener('click', () => {

//     if (!error) {
//         Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "¡Gracias por contactarnos!",
//             showConfirmButton: false,
//             timer: 2000
//         });
//     }
// });