const form = document.querySelector('.form');
const fields = form.querySelectorAll('input')

form.addEventListener('submit', event => {
    const data = {};
    fields.forEach(field => data[field.name] = field.value);
    console.log(data);
    event.preventDefault();
});
