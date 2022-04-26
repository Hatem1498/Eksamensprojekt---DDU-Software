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

window.onload(function(){
    button_2.click();
    button_2.click();
})


