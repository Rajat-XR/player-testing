const videoPlayer = document.getElementById('video-player');
let isPause = false;

document.getElementById('video-upload').addEventListener('change', function (event) {
    const videoFile = event.target.files[0];
    const videoSource = document.getElementById('video-source');

    if (!videoFile) return;

    const videoURL = URL.createObjectURL(videoFile);    
    const fileExtension = videoFile.name.split('.').pop().toLowerCase();

    if (fileExtension === 'mp4') {
        videoSource.setAttribute('type', 'video/mp4');
    } else if (fileExtension === 'mkv') {
        videoSource.setAttribute('type', 'video/webm');
    }
    
    videoSource.setAttribute('src', videoURL);
    videoPlayer.load();  
    videoPlayer.play();
});

document.getElementById('Pausebtn').onclick = () => {
   if(videoPlayer.paused){
     videoPlayer.play();
     document.getElementById('Pausebtn').innerHTML = "Pause";
   }
   else {
     videoPlayer.pause();
     document.getElementById('Pausebtn').innerHTML = "Play";
   }
}

 document.addEventListener("keydown",
            function (event) {
                if (!isPause && event.key === " ") {
                    event.preventDefault();
                    videoPlayer.pause();
                    isPause = !isPause;
                    document.getElementById('Pausebtn').innerHTML = "Play";
                }
                else if(isPause && event.key === " "){
                    event.preventDefault();
                    videoPlayer.play();
                    isPause = !isPause;
                    document.getElementById('Pausebtn').innerHTML = "Pause";
                }
            });


