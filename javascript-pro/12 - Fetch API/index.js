// -----------------------------------------------------------------------------
// BASICS
// -----------------------------------------------------------------------------

const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function getPokemon() {
    try {
        const response = await fetch(POKE_URL);
        if (!response.ok)
            throw new Error(`Failed to data. Status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// -----------------------------------------------------------------------------
// SENDING REQUEST HEADERS
// -----------------------------------------------------------------------------

async function showHeaders() {
    const response = await fetch(POKE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 1234567890',
        },
        body: JSON.stringify({}),
    });
    if (!response.ok)
        throw new Error(`Failed to data. Status: ${response.status}`);
    const data = await response.json();
}

async function postData() {
    try {
        const response = await fetch('https://api.example.com/data', {
            method: 'POST', // this is the request method
            headers: {
                // this is the request headers
                'Content-Type': 'application/json',
                Authorization: 'Bearer your_token_here',
            },
            body: JSON.stringify({
                // this is the data you want to send
                key: 'value',
            }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// -----------------------------------------------------------------------------
// UPLOADING FILES WITH FETCH
// -----------------------------------------------------------------------------

async function uploadFile(file) {
    const formData = new FormData(); // create a new FormData object
    formData.append('file', file); // 'file' is the name of the field that the server expects

    try {
        const response = await fetch('https://api.example.com/upload', {
            method: 'POST', // this is the request method
            body: formData, // pass the FormData object as the request body
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// assuming there is an input element with type="file" and id="myFile"
// const fileInput = document.getElementById('myFile');
// fileInput.addEventListener('change', event => {
//     const file = event.target.files[0]; // get the first file
//     uploadFile(file);
// });

// -----------------------------------------------------------------------------
// JSONPlaceholder Web Application
// -----------------------------------------------------------------------------

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const postBlock = document.querySelector('.posts');
const submitBtn = document.querySelector('#submit');

async function getPosts() {
    try {
        const response = await fetch(POSTS_URL);
        if (!response.ok)
            throw new Error(`Failed to data. Status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function addPost(data) {
    try {
        const response = await fetch(POSTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok)
            throw new Error(`Failed to data. Status: ${response.status}`);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

function renderMarkup(data) {
    return `
            <div class="post">
                <h2>${data.title}</h2>
                <p>${data.body}</p>
            </div>
        `;
}

function displayPosts() {
    getPosts()
        .then(data => {
            const postsMarkup = data.map(post => renderMarkup(post)).join('');
            postBlock.innerHTML = postsMarkup; // Need safer way to update the DOM using textContent
        })
        .catch(error => {
            console.error('Error displaying posts:', error);
        });
}

displayPosts(); // Display posts when the page loads

submitBtn.addEventListener('click', async event => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    try {
        const responseData = await addPost({ title, body });
        console.log(title, body, responseData);
        if (responseData) {
            // Update the DOM with the new post
            postBlock.insertAdjacentHTML(
                'afterbegin',
                renderMarkup(responseData)
            );
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
});
