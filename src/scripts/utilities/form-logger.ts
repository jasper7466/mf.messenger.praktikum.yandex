const form = document.querySelector('.form');

if (form) {
    const fields = form.querySelectorAll('input');

    form.addEventListener('submit', event => {
        let data: any = {};
        fields.forEach(field => data[field.name] =  field.value);
        console.log(data);
        event.preventDefault();
    });
}
