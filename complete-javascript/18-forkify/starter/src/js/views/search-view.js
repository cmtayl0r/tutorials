class SearchView {
    #parentElement = document.querySelector('.search');

    // PUBLIC METHODS

    getQuery() {
        const query = this.#parentElement.querySelector('.search__field').value;
        // Clear input after submitting search
        this.#clearInput();
        return query;
    }

    // TODO: why a handler???
    addHandlerSearch(handler) {
        // Listen for events in the view

        // Listen for submit event on whole form
        // No matter if button clicked or enter pressed
        this.#parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

    // PRIVATE METHODS

    #clearInput() {
        // Clear input after search
        this.#parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView();
