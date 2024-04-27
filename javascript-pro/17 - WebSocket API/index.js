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
