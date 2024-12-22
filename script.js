         // Get references to the DOM elements
         const recordButton = document.getElementById('recordButton');
         const stopButton = document.getElementById('stopButton');
         const audioPlayback = document.getElementById('audioPlayback');
 
         let mediaRecorder;
         let audioChunks = [];
 
         // Function to start recording
         recordButton.addEventListener('click', async () => {
             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
             mediaRecorder = new MediaRecorder(stream);
 
             mediaRecorder.ondataavailable = (event) => {
                 audioChunks.push(event.data);
             };
 
             mediaRecorder.onstop = () => {
                 const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                 const audioUrl = URL.createObjectURL(audioBlob);
                 audioPlayback.src = audioUrl;
             };
 
             mediaRecorder.start();
             recordButton.disabled = true;
             stopButton.disabled = false;
         });
 
         // Function to stop recording
         stopButton.addEventListener('click', () => {
             mediaRecorder.stop();
             recordButton.disabled = false;
             stopButton.disabled = true;
         });