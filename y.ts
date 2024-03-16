const { Subject } = require('rxjs');
const { takeUntil } = require('rxjs/operators');

// Subject to handle incoming messages
const chatSubject = new Subject();

// Observable for user input
const userInputObservable = new Subject();

// Observable for exit event
const exitObservable = new Subject();

// Function to simulate receiving a message
function receiveMessage(message) {
    chatSubject.next(message);
}

// Function to start the chat
function startChat() {
    console.log('Welcome to the chat room!\n');
    userInputObservable.pipe(
        takeUntil(exitObservable)
    ).subscribe(message => {
        if (message.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            exitObservable.next();
            exitObservable.complete();
            return;
        }
        receiveMessage(message);
    });

    // Subscribe to chat messages
    chatSubject.subscribe(message => {
        console.log('New message:', message);
    });

    // Prompt for user input
    promptUserInput();
}

// Function to prompt user for input
function promptUserInput() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Type your message (Press ENTER to send, or type EXIT to leave): ', (message) => {
        userInputObservable.next(message);
        readline.close();
        promptUserInput();
    });
}

// Start the chat
startChat();

