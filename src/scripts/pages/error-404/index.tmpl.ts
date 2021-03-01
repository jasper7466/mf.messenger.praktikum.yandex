export const template =`
    <section class="side-container side-container_type_centered">
        <div class="error-banner">
            <p class="error-banner__caption">{{type}}</p>
            <p class="error-banner__description">{{description}}</p>
            <a class="link link_size_small" href="">Назад к чатам</a>
        </div>
    </section>
`;

export const data = {
    type: '404',
    description: 'Не туда попали'
}