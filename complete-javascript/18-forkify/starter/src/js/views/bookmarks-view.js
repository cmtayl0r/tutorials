_generateMarkupPreview(result) {
    // Get id to determine selected search result, and apply class below
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="preview__link preview ${
            result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
        </div>
        </a>
    </li>
`;
}