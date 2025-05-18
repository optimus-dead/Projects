// Get a reference to the HTML element with the ID "result"
const resultElement = document.getElementById("result");
let recognition;

// Function to start speech recognition
function startConverting() {
    // Check if the browser supports webkitSpeechRecognition
    if ('webkitSpeechRecognition' in window) {
        // Create a new instance of webkitSpeechRecognition
        recognition = new webkitSpeechRecognition();
        // Set up recognition options
        setupRecognition(recognition);
        // Start the recognition process
        recognition.start();
    }
}

// Function to configure recognition options
function setupRecognition(recognition) {
    // Enable continuous recognition (keep listening)
    recognition.continuous = true;
    // Enable interim results (partial transcripts during ongoing speech)
    recognition.interimResults = true;
    // Set the language for recognition (English, United States)
    recognition.lang = 'en-US';

    // Event handler for recognition results
    recognition.onresult = function (event) {
        // Process the results using the processResult function
        const { finalTranscript, interTranscript } = processResult(event.results);
        // Display the combined transcript (final + interim) in the resultElement
        resultElement.innerHTML = finalTranscript + interTranscript;
    };
}

// Function to process recognition results
function processResult(results) {
    let finalTranscript = '';
    let interTranscript = '';

    // Loop through each result
    for (let i = 0; i < results.length; i++) {
        // Extract the transcript from the first alternative in the result
        let transcript = results[i][0].transcript;
        // Replace newline characters with HTML line breaks
        transcript = transcript.replace("\n", "<br>");

        // Check if the result is final or interim
        if (results[i].isFinal) {
            // If final, add to finalTranscript
            finalTranscript += transcript;
        } else {
            // If interim, add to interTranscript
            interTranscript += transcript;
        }
    }

    // Return both final and interim transcripts
    return { finalTranscript, interTranscript };
}

// Function to stop speech recognition
function stopConverting() {
    if (recognition) {
        recognition.stop();
    }
}
