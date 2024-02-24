////////////////////////////////////////////////////////////////////////////////
// CLASSES
////////////////////////////////////////////////////////////////////////////////
class SearchView {
    _parentElement = document.querySelector('.search');

    // PUBLIC METHODS

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        // Clear input after submitting search
        this._clearInput();
        return query;
    }

    addHandlerSearch(handler) {
        // TODO: why a handler???
        // "Publisher" function listening for events in the view
        // Receives handler function we want to execute as soon as the event happens

        // Listen for submit event on whole form
        // No matter if button clicked or enter pressed
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler(); // call handler (controlSearchResults) in controller
        });
    }

    // PRIVATE METHODS

    _clearInput() {
        // Clear input after search
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView();
