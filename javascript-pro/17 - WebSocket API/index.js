// -----------------------------------------------------------------------------
// CHAT APP
// -----------------------------------------------------------------------------

const btnNotification = document.querySelector('#btnNotification');

// Notification API is promise based

async function showNotification() {
    try {
        // Awaits a promise
        const permission = await Notification.requestPermission();
        // Resolved with a string value of 'granted', 'denied', or 'default'
        if (permission === 'granted') {
            // Notification constructor
            const notification = new Notification('Hello, world!', {
                body: 'This is a notification',
                icon: 'https://via.placeholder.com/64',
                data: {
                    // Custom data to be sent to the notification object
                    // Can be used to open a specific URL when notification is clicked
                    url: 'https://www.google.com',
                },
            });

            // Notification events
            notification.addEventListener('click', () => {
                console.log('Notification clicked');
                window.focus(); // Focus on the window that created the notification
                notification.close(); // Close the notification
            });
            notification.addEventListener('close', () => {
                console.log('Notification closed');
            });
        } else {
            console.log('Notification permission denied');
        }
    } catch (error) {
        console.error('Failed to request notification permission:', error);
    }
}
btnNotification.addEventListener('click', showNotification);

// -----------------------------------------------------------------------------
// Observer Pattern
// -----------------------------------------------------------------------------

// Class to define a subject, specifically a blog that manages subscribers
class Blog {
    constructor() {
        // Initialise an Array to hold subscribers
        this.subscribers = [];
    }

    subscribe(subscriber) {
        // Adds the subscriber to the subscribers array
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        // Removes the subscriber from the subscribers array ...
        // by filtering out the subscriber that is passed in, keeping only those not equal to the given subscriber
        this.subscribers = this.subscribers.filter(subs => subs !== subscriber);
    }

    publish(post) {
        // Loops through all subscribers ...
        // and calls their notify method, passing in the post object
        this.subscribers.forEach(subscriber => subscriber.notify(post));
    }
}

// Class to define a subscriber
class Subscriber {
    constructor(name) {
        this.name = name;
    }
    // method to notify the subscriber of a new post
    notify(post) {
        console.log(`${this.name}, a new post published: ${post.title}`);
    }
}

// Create new subscriber instances
const chris = new Subscriber('Chris');
const john = new Subscriber('John');
const lily = new Subscriber('Lily');

// Create a new blog instance
const puppyBlog = new Blog();

// Adding subscribers to the new blog
puppyBlog.subscribe(chris);
puppyBlog.subscribe(lily);

// Publishing a new post to the blog; subscribers Chris and Lily are notified
puppyBlog.publish({
    title: 'Poopy Pops 🐶 is too tired to walk in the Sun ☀️',
});
// Output: Chris, a new post published: Poopy Pops 🐶 is too tired to walk in the Sun ☀️
// Output: Lily, a new post published: Poopy Pops 🐶 is too tired to walk in the Sun ☀ ️

// -----------------------------------------------------------------------------
// Observer Pattern = Event Manager
// -----------------------------------------------------------------------------
// 1 - Event Manager class to manage events and listeners
class EventManager {
    constructor() {
        this.listeners = {};
    }

    // 1 - Subscribe a listener to a specific event type
    subscribe(eventType, listener) {
        // If no listeners for the event type, initialize an empty array
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        // Add the listener to the array of listeners for the specified event type.
        this.listeners[eventType].push(listener);
    }

    // 2 - Unsubscribe a listener from a specific event type
    unsubscribe(eventType, listener) {
        // if there are listeners for the event type
        if (this.listeners[eventType]) {
            // Filter out the listener to unsubscribe, keeping only those not equal to the provided listener.
            this.listeners[eventType] = this.listeners[eventType].filter(
                l => l !== listener
            );
        }
    }

    // 3 - Notify all listeners subscribed to a specific event type
    notify(eventType, data) {
        // if there are listeners for the event type
        if (this.listeners[eventType]) {
            // Loop through all listeners for the event type and call each listener with the provided data
            this.listeners[eventType].forEach(listener => listener(data));
        }
    }
}

// 2 - Create a new EventManager instance
const eventManager = new EventManager();

// 3 - Define listeners
// Define a listener that logs received data.
const logData = data => console.log('Data:', data);
// Define a listener that shows an alert with the data.
const alertData = data => alert(`Data: ${data}`, data);

// 4 - Subscribe listeners to event types
// Subscribe the logData listener to the 'update' event type
eventManager.subscribe('update', logData);
// Subscribe the alertData listener to the 'update' event type
eventManager.subscribe('update', alertData);

// 5 - Notify all listeners subscribed to the 'update' event type
eventManager.notify('update', { message: 'Important update' });

// -----------------------------------------------------------------------------
// Observer Pattern = MVC
// -----------------------------------------------------------------------------

class Model {
    constructor() {
        this.data = ''; // Data to be observed
        this.observers = []; // Array to hold observers
    }

    subscribe(observer) {
        // Add the observer to the observers array
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        // Remove the observer from the observers array
        this.observers = this.observers.filter(sub => sub !== observer);
    }

    notifyObservers() {
        // Loop through all observers and call each observer with the data
        this.observers.forEach(observer => observer(this.data));
    }

    setData(newData) {
        // Set the new data
        this.data = newData;
        // Notify all observers about the data change
        this.notifyObservers(); // Notify all observers about the data change
    }

    getData() {
        // Return the current data
        return this.data;
    }
}

class View {
    constructor(controller) {
        this.controller = controller; // Reference to the controller
        this.init(); // Initialize the view
    }

    // Initialize the view
    init() {
        // Create an input element for data input and a label
        // Input will be used to update the model
        this.input = document.createElement('input');
        this.input.id = 'input-data';
        this.label = document.createElement('label');
        this.label.htmlFor = 'input-data';
        this.label.textContent = 'Input Data:';
        document.body.appendChild(this.label);
        document.body.appendChild(this.input);
        this.display = document.createElement('div');
        document.body.appendChild(this.display);
    }
    // Setup event listeners
    setupEventListeners(controller) {
        this.input.addEventListener('input', () => {
            controller.updateModel(this.input.value);
        });
    }

    update(data) {
        // Update the view with the new data
        this.display.textContent = `Current Data: ${data}`;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model; // Reference to the model
        this.view = view; // Reference to the view

        // The view subscribes to the model
        // use bind to set the context of the update method to the view
        this.model.subscribe(this.view.update.bind(this.view));
        // The controller sets up event listeners on the view
        this.view.setupEventListeners(this);
    }

    updateModel(data) {
        // The controller updates the model with new data
        // data comes from the input field in the view
        // new data is passed to the model
        this.model.setData(data);
    }
}

const appModel = new Model();
const appView = new View();
const appController = new Controller(appModel, appView);

// Set new data on the model
// appModel.setData('🐶 has had a 💩 and a 🫛');
