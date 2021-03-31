export default `
    <button class="button {{#each this.classList}} {{this}}{{/each}}" type={{type}}>
        {{caption}}
    </button>
`;