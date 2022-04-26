const { default: QrScanner } = require("qr-scanner");


//Video elements
const video = document.getElementById("video");
const video_2 = document.getElementById("video-2");
const video_container = document.getElementById("a");
const video_container_2 = document.getElementById("b");

//Button elements
const button = document.getElementById("QR-1");
const button_2 = document.getElementById("QR-2");

//Center the video and set autoplay to true.
video.style.left = String( (screen.width-(screen.width*0.9))/2 ) + "px";
video.autoplay = true;

video_2.style.left = String( (screen.width-(screen.width*0.9))/2 ) + "px";
video_2.autoplay = true;


/* Setting up the constraint */
var facingMode = "environment"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: {
   facingMode: facingMode
  }
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function success(stream) {
    video.srcObject = stream;
});



//When "Scan Ost QR" button is pressed the button class changes to on, if it was off and video is displayed.
//If it was on, it is turned off. 
button.addEventListener("click", event => {

    if(button.className == "off"){
        button.className = "on";
        video.style.display = "block";
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function success(stream) {
        video.srcObject = stream;
        });
        scan(video);
    }
    else{
        button.className = "off";
        video.style.display = "none";
        video.srcObject.getTracks().forEach(function(track){
            track.stop();
        });
    }

});



//When the second button is pressed "Scan hylde QR", if button was "Off", it is switched to "on" and the video is displayed.
//The reverse is true for when the button is "on", and is pressed.
button_2.addEventListener("click", event => {
    if(button_2.className == "off"){
        button_2.className = "on";
        video_2.style.display = "block";
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function success(stream) {
        video_2.srcObject = stream;
        });
        scan(video_2);
    }
    else{
        button_2.className = "off";
        video_2.style.display = "none";
        video_2.srcObject.getTracks().forEach(function(track){
            track.stop();
        });
    }
});

window.onload = function() {
    button_2.click();
    button_2.click();
}
