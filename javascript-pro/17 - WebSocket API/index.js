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
// xxx
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
