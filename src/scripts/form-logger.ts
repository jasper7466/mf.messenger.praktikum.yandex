const form = document.querySelector('.form');

if (form) {
    const fields = form.querySelectorAll('input')

    form.addEventListener('submit', event => {
        let data = {};
        fields.forEach(field => Object.defineProperty(data, field.name, field.value));
        console.log(data);
        event.preventDefault();
    });
}
