const video = document.querySelector("video")
const msg = document.querySelector("#msg")
const input = document.querySelector("input")
const source = document.querySelector("source")

input.onchange = () => {
    const videoFile = input.files[0]
    const videoURL = URL.createObjectURL(videoFile)
    const videoExtension = videoFile.type.split("/").pop()
    source.setAttribute("src", videoURL)
    switch (videoExtension) {
        case "mp4": source.setAttribute("type", "video/mp4");
        case "mkv": source.setAttribute("type", "video/webm");
    }
    video.load()
    video.play()
    msg.innerHTML = videoFile.name.split(".")[0]
}
