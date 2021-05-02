var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.onresult = function (event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  document.querySelector('#textbox').value += transcript
  //tts
  var msg = new SpeechSynthesisUtterance(transcript);
  msg.lang = 'es-ES'
  window.speechSynthesis.speak(msg);
};

var instructions = document.querySelector('#instructions');

recognition.onstart = function () {
  instructions.textContent = 'Voice recognition is ON.';
}

recognition.onspeechend = function () {
  instructions.textContent = 'No activity.';
  flag = false
  document.querySelector('#start-btn').innerText = "Start"
}

recognition.onerror = function (event) {
  if (event.error == 'no-speech') {
    instructions.textContent = 'Try again.';
  }
}

let flag = false
document.querySelector('#start-btn').addEventListener('click', function (e) {
   if (flag) {
    recognition.stop();
    e.target.innerText = "Start"
  } else {
    recognition.start()
    e.target.innerText = "Stop"
  }
  flag = !flag
});
