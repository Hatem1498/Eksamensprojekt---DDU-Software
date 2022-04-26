

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


//When "Scan Ost QR" button is pressed the button class changes to on, if it was off and video is displayed.
//If it was on, it is turned off. 
button.addEventListener("click", event => {

    if(button.className == "off"){
        button.className = "on";
        video.style.display = "block";
    }
    else{
        button.className = "off";
        video.style.display = "none";
    }

});



//When the second button is pressed "Scan hylde QR", if button was "Off", it is switched to "on" and the video is displayed.
//The reverse is true for when the button is "on", and is pressed.
button_2.addEventListener("click", event => {
    if(button_2.className == "off"){
        button_2.className = "on";
        video_2.style.display = "block";
        video_2.style.width = "273.599px";
        video_2.style.height = "486.396px";
    }
    else{
        button_2.className = "off";
        video_2.style.display = "none";
    }
});

window.onload = function() {
    button_2.click();
    button_2.click();
}
