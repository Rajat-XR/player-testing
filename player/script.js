const player = document.querySelector("#player")
const input = document.querySelector("#videoInput")
const intro_msg = document.querySelector(".intro-msg")
const msg = document.querySelector("#msg")
const upload = document.querySelector(".upload")
const title = document.querySelector("#title")
const controlButtons = document.querySelectorAll("button")
const speed = document.querySelector("select")
const volume_msg = document.querySelector("#volume")
const volumeBar = document.querySelector("#volumeBar")
const control_buttons = document.querySelector(".controls")
const heading = document.querySelector(".heading")
const letter = document.querySelectorAll("span")
const page_title = document.querySelector("title")
const formats = ["mp4", "x-matroska", "webm"]
let video, source, videoURL, support = false

function style(element, width = "", height = "", border = "", borderTop = "", boxShadow = "", transform = "", top = "", left = "", fontSize = "", fontFamily = "") {
    if (element == player) {
        element.style.width = width
        element.style.height = height
        element.style.border = border
        element.style.borderTop = element.style.borderBottom = borderTop
        element.style.boxShadow = boxShadow
    }
    else if (element == heading) {
        element.style.transform = transform
        element.style.top = top
        element.style.left = left
        element.style.fontSize = fontSize
        element.style.fontFamily = fontFamily
    }
}

input.onchange = () => {
    upload.style.display = intro_msg.style.display = "none"
    style(player, "70em", "40em", "5px solid", "1px solid", "0px 0px 20px grey")
    style(heading, "", "", "", "", "", "rotate(-90deg)", "38%", "-15%", "1.7em", "myfont3")
    letter.forEach(x => x.style.fontFamily = "myfont3")
    video = document.createElement("video");
    source = document.createElement("source");
    video.appendChild(source)
    player.appendChild(video)
    const videoFile = input.files[0]
    videoURL = URL.createObjectURL(videoFile)
    let videoExtension = videoFile.type.split("/")[1]
    if (videoExtension === "mp4") {
        source.setAttribute("type", "video/mp4");
    }
    else if (videoExtension === "x-matroska") {
        source.setAttribute("type", "video/webm");
    }
    source.setAttribute("src", videoURL)
    video.volume = 0.6
    video.load()
    video.play()
    title.innerHTML = page_title.innerHTML = videoFile.name
    control_buttons.style.display = "flex"

    support = formats.includes(videoExtension)
    if (support === false) {
        title.innerHTML = "Not Supported this file format"
        page_title.innerHTML = "Rajat Video Player"
    }
    video.addEventListener('contextmenu', event => event.preventDefault());
}

heading.onclick = () => {
    video.style.filter = "sepia(100%) contrast(100%)"
}

function wait(ms) {
    return new Promise(async resolve => {
        setTimeout(resolve, ms)
        await wait(2500)
        msg.innerHTML = ""
    });
}

function stop() {
    video.load()
    video.play()
    video.pause()
    controlButtons[4].setAttribute("data-state", "play")
}

function reload() {
    // let currentSpeed = video.playbackRate
    video.load()
    // video.playbackRate = currentSpeed
    video.play()
}

async function forward(amount = "") {
    if (amount == 5) {
        video.currentTime += 5
        msg.innerHTML = ">> 5s"
        await wait(2500)
    }
    else {
        video.currentTime += 10
        msg.innerHTML = ">> 10s"
        await wait(2500)
    }
}

async function backward(amount = "") {
    if (amount == 5) {
        video.currentTime -= 5
        msg.innerHTML = "<< 5s"
        await wait(2500)
    }
    else {
        video.currentTime -= 10
        msg.innerHTML = "<< 10s"
        await wait(2500)
    }
}

// async function mute() {
//     if (!video.muted) {
//         video.muted = true
//         msg.innerHTML = "🔇"
//         await wait(2500)
//     }
//     else if (video.muted) {
//         video.muted = false
//         msg.innerHTML = "Unmuted"
//         await wait(2500)
//     }
// }

// async function volumeUp() {
//     video.volume += 0.1
//     volume.innerHTML = `${(video.volume * 100).toFixed(0)}%`
//     msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
//     await wait(2500)
// }

// async function volumeDown() {
//     video.volume -= 0.1
//     volume.innerHTML = `${(video.volume * 100).toFixed(0)}%`
//     msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
//     await wait(2500)
// }

function volumeIcon(){
    if (Number(video.volume.toFixed(2)) >= 0.8){
        controlButtons[6].setAttribute("data-volume","high")
    }
    else if (Number(video.volume.toFixed(2)) >= 0.3){
        controlButtons[6].setAttribute("data-volume","medium")
    }
    else if (Number(video.volume.toFixed(2)) === 0){
        controlButtons[6].setAttribute("data-volume","mute")
    }
    else if (Number(video.volume.toFixed(2)) < 0.3){
        controlButtons[6].setAttribute("data-volume","low")
    }
}


async function volume(x = "") {
    if (x === "") {
        video.volume = volumeBar.value / 100
        volumeIcon()
        volume_msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
        msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
        await wait(2500)
        console.log(video.volume)
    }
    else if (x === "up") {
        if (video.volume === 1) {
            msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
            await wait(2500)
        }
        else if (Number(video.volume.toFixed(2)) > 0.95) {
            video.volume = 1
            volumeIcon()
            volume_msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
            msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
            await wait(2500)
        }
        else {
            let a = Number(video.volume.toFixed(2))
            video.volume = a + 0.05
            volumeBar.value = (video.volume * 100).toFixed(0)
            volumeIcon()
            volume_msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
            msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
            await wait(2500)
        }

    }
    else if (x === "down") {
        if (video.volume === 0) {
            msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
            await wait(2500)
        }
        else if (Number(video.volume.toFixed(2)) < 0.05) {
            video.volume = 0
            volume_msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
            volumeIcon()
            msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
            await wait(2500)
        }
        else {
            let a = Number(video.volume.toFixed(2))
            video.volume = a - 0.05
            volumeBar.value = (video.volume * 100).toFixed(0)
            volumeIcon()
            volume_msg.innerHTML = `${(video.volume * 100).toFixed(0)}%`
            msg.innerHTML = `Volume ${(video.volume * 100).toFixed(0)}%`
            await wait(2500)
        }
    }
}

volumeBar.onchange = () => {
    volume()
}

async function playbackSpeed(x) {
    if (x == "up" && video.playbackRate < 3) {
        video.playbackRate += 0.1
        msg.innerHTML = `${video.playbackRate.toFixed(1)}x`
        await wait(2500)
    }
    else if (x == "down" && video.playbackRate > 0) {
        video.playbackRate -= 0.1
        msg.innerHTML = `${video.playbackRate.toFixed(1)}x`
        await wait(2500)
    }
}

function loop() {
    if (controlButtons[2].dataset.loop === "false") {
        video.setAttribute("loop", true)
        controlButtons[2].setAttribute("data-loop", "true")
    }
    else if (controlButtons[2].dataset.loop === "true") {
        video.removeAttribute("loop")
        controlButtons[2].setAttribute("data-loop", "false")
    }
}

function pause() {
    if (video.paused) {
        video.play()
        controlButtons[4].setAttribute("data-state", "pause")
    }
    else {
        video.pause()
        controlButtons[4].setAttribute("data-state", "play")
    }
}

function pip() {
    if (controlButtons[9].dataset.pip === "false") {
        video.requestPictureInPicture()
        controlButtons[9].setAttribute("data-pip", "true")
    }
    else if (controlButtons[9].dataset.pip === "true") {
        document.exitPictureInPicture()
        controlButtons[9].setAttribute("data-pip", "false")
    }
}

function reset() {
    video.pause()
    URL.revokeObjectURL(videoURL)
    source.setAttribute("src", "")
    input.value = ""
    document.exitPictureInPicture()
    video.remove()
    upload.style.display = intro_msg.style.display = "flex"
    style(player, "50em", "25em", "5px dashed", "", "")
    style(heading, "", "", "", "", "", "rotate(0deg)", "1%", "30.5%", "2em", "myfont1")
    letter.forEach(x => x.style.fontFamily = "myfont2")
    volume_msg.innerHTML = "60%"
    control_buttons.style.display = "none"
    controlButtons[2].setAttribute("data-loop", "false")
    controlButtons[4].setAttribute("data-state", "pause")
    controlButtons[9].setAttribute("data-pip", "false")
    speed.value = "Normal"
    title.innerHTML = msg.innerHTML = ""
    page_title.innerHTML = "Rajat Video Player"
}

const controls = [stop, reload, loop, backward, pause, forward, pip, reset]

controlButtons.forEach(button => {
    button.onclick = () => {
        controls[button.dataset.control]()
    }
})

speed.onchange = () => {
    video.playbackRate = speed.value
    msg.innerHTML = `${speed.value}x`
}


document.addEventListener("keydown", event => {
    event.preventDefault()

    if (control_buttons.style.display == "flex") {
        switch (event.key.toLowerCase()) {
            case " ":
                pause();
                break;
            case "arrowright":
                forward(5)
                break;
            case "arrowleft":
                backward(5)
                break;
            case "arrowup":
                volume("up")
                break;
            case "arrowdown":
                volume("down");
                break;
            case "j":
                backward();
                break;
            case "k":
                forward();
                break;
            case "p":
                pip()
                break;
            case "l":
                loop()
                break;
            case "]":
                playbackSpeed("up")
                break;
            case "[":
                playbackSpeed("down")
                break;
            case "=":
                video.playbackRate = 1.0
                break;
            case "r":
                reload();
                break;
            case "m":
                mute();
                break;
        }
    }
})