// ===================================
// AUTOCUT LITE
// SCRIPT.JS
// PART 1
// ===================================

// Buttons
const addPhotoBtn = document.getElementById("addPhotoBtn");
const addMusicBtn = document.getElementById("addMusicBtn");
const previewBtn = document.getElementById("previewBtn");
const saveBtn = document.getElementById("saveBtn");

// Inputs
const imageInput = document.getElementById("imageInput");
const musicInput = document.getElementById("musicInput");

// UI
const gallery = document.getElementById("gallery");
const preview = document.getElementById("preview");
const photoCount = document.getElementById("photoCount");
const musicName = document.getElementById("musicName");
const status = document.getElementById("status");
const progress = document.getElementById("progress");
const duration = document.getElementById("duration");

// Data
let photos = [];
let music = null;

let current = 0;
let timer = null;

// Open Pickers
addPhotoBtn.onclick = () => imageInput.click();
addMusicBtn.onclick = () => musicInput.click();

// Load Photos
imageInput.onchange = function () {

    const files = Array.from(this.files);

    files.forEach(file => {

        const url = URL.createObjectURL(file);

        photos.push(url);

    });

    updateGallery();

};

// Load Music
musicInput.onchange = function () {

    if (!this.files.length) return;

    music = this.files[0];

    musicName.textContent = music.name;

};

// Gallery
function updateGallery() {

    gallery.innerHTML = "";

    photoCount.textContent =
        "Selected Photos: " + photos.length;

    photos.forEach((src, index) => {

        const box = document.createElement("div");

        box.className = "photo";

        const img = document.createElement("img");

        img.src = src;

        const remove = document.createElement("button");

        remove.className = "removeBtn";

        remove.textContent = "✕";

        remove.onclick = () => {

            photos.splice(index,1);

            updateGallery();

        };

        box.appendChild(img);

        box.appendChild(remove);

        gallery.appendChild(box);

    });
    // ===================================
// PREVIEW ENGINE
// PART 2
// ===================================

let audioPlayer = new Audio();

// Preview Button
previewBtn.onclick = function () {

    if (photos.length === 0) {

        alert("Please add some photos.");

        return;

    }

    current = 0;

    progress.style.width = "0%";

    status.textContent = "Playing Preview...";

    if (music) {

        audioPlayer.pause();

        audioPlayer = new Audio(URL.createObjectURL(music));

        audioPlayer.play();

    }

    showNextPhoto();

};

// Show Photos
function showNextPhoto() {

    if (current >= photos.length) {

        clearTimeout(timer);

        if (music) {

            audioPlayer.pause();

            audioPlayer.currentTime = 0;

        }

        status.textContent = "Preview Finished ✔";

        progress.style.width = "100%";

        return;

    }

    preview.innerHTML = "";

    const img = document.createElement("img");

    img.src = photos[current];

    img.style.opacity = "0";

    img.style.transform = "scale(1)";

    preview.appendChild(img);

    // Fade In

    setTimeout(() => {

        img.style.opacity = "1";

    },100);

    // Gentle Zoom
    // Keeps whole image visible

    setTimeout(() => {

        img.style.transform = "scale(1.03)";

    },200);

    progress.style.width =
        ((current + 1) / photos.length) * 100 + "%";

    current++;

    timer = setTimeout(

        showNextPhoto,

        Number(duration.value) * 1000

    );

}

// Stop preview if page changes

window.addEventListener("beforeunload",()=>{

    clearTimeout(timer);

    audioPlayer.pause();

});
    

}
// ======================================
// AUTOCUT LITE
// CANVAS ENGINE
// PART 3
// ======================================

const canvas = document.getElementById("videoCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1920;

let recorder = null;
let recordedChunks = [];

function drawFrame(image){

    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const scale = Math.min(
        canvas.width / image.width,
        canvas.height / image.height
    );

    const w = image.width * scale;
    const h = image.height * scale;

    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    // White frame
    ctx.fillStyle = "white";
    ctx.fillRect(x-20,y-20,w+40,h+40);

    // Draw image
    ctx.drawImage(image,x,y,w,h);

}
// ======================================
// AUTOCUT LITE
// MEDIA RECORDER
// PART 4
// ======================================

let recording = false;

function startRecording() {

    recordedChunks = [];

    const stream = canvas.captureStream(30);

    recorder = new MediaRecorder(stream, {
        mimeType: "video/webm"
    });

    recorder.ondataavailable = function(e) {

        if (e.data.size > 0) {

            recordedChunks.push(e.data);

        }

    };

    recorder.onstop = function() {

        const blob = new Blob(recordedChunks, {
            type: "video/mp4"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "AutoCut-Video.mp4";

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        status.textContent = "Video Saved ✔";

        progress.style.width = "100%";

        recording = false;

    };

    recorder.start();

}

function stopRecording() {

    if (recorder && recorder.state === "recording") {

        recorder.stop();

    }

}

saveBtn.onclick = function() {

    if (photos.length === 0) {

        alert("Please add some photos first.");

        return;

    }

    status.textContent = "Rendering Video...";

    progress.style.width = "0%";

    recording = true;

    startRecording();

    renderVideo();

};
// ======================================
// AUTOCUT LITE
// VIDEO RENDERER
// PART 5
// ======================================

async function renderVideo() {

    const seconds = Number(duration.value);

    const fps = 30;

    const framesPerPhoto = seconds * fps;

    for (let i = 0; i < photos.length; i++) {

        const image = new Image();

        image.src = photos[i];

        await new Promise(resolve => {

            image.onload = resolve;

        });

        for (let frame = 0; frame < framesPerPhoto; frame++) {

            const zoom = 1 + (frame / framesPerPhoto) * 0.03;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // White Frame
            ctx.fillStyle = "#fff";
            ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);

            const scale = Math.min(
                (canvas.width - 100) / image.width,
                (canvas.height - 100) / image.height
            );

            const w = image.width * scale * zoom;
            const h = image.height * scale * zoom;

            const x = (canvas.width - w) / 2;
            const y = (canvas.height - h) / 2;

            ctx.drawImage(image, x, y, w, h);

            progress.style.width =
                (((i * framesPerPhoto) + frame + 1) /
                (photos.length * framesPerPhoto)) * 100 + "%";

            await new Promise(resolve =>
                setTimeout(resolve, 1000 / fps)
            );
        }
    }

    stopRecording();

}
