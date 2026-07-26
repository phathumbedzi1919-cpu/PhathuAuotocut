// ===============================
// AUTOCUT STUDIO PRO
// SCRIPT.JS (PART 1)
// ===============================

// Elements
const imageInput = document.getElementById("imageInput");
const musicInput = document.getElementById("musicInput");
const voiceInput = document.getElementById("voiceInput");

const addPhotoBtn = document.getElementById("addPhotoBtn");
const addMusicBtn = document.getElementById("addMusicBtn");
const addVoiceBtn = document.getElementById("addVoiceBtn");

const gallery = document.getElementById("gallery");

const photoCount = document.getElementById("photoCount");
const musicName = document.getElementById("musicName");
const voiceName = document.getElementById("voiceName");

const preview = document.getElementById("preview");
const previewBtn = document.getElementById("previewBtn");
const pauseBtn = document.getElementById("pauseBtn");

const progress = document.getElementById("progress");
const status = document.getElementById("status");

const motionMode = document.getElementById("motionMode");
const frameStyle = document.getElementById("frameStyle");
const duration = document.getElementById("duration");

const saveBtn = document.getElementById("saveBtn");

// ===============================
// DATA
// ===============================

let photos = [];

let musicFile = null;

let voiceFile = null;

let currentSlide = 0;

let slideshow = null;

// ===============================
// BUTTONS
// ===============================

addPhotoBtn.onclick = () => imageInput.click();

addMusicBtn.onclick = () => musicInput.click();

addVoiceBtn.onclick = () => voiceInput.click();

// ===============================
// LOAD PHOTOS
// ===============================

imageInput.onchange = function () {

    const files = Array.from(this.files);

    files.forEach(file => {

        const url = URL.createObjectURL(file);

        photos.push(url);

    });

    renderGallery();

};

// ===============================
// LOAD MUSIC
// ===============================

musicInput.onchange = function () {

    if (!this.files.length) return;

    musicFile = this.files[0];

    musicName.textContent = musicFile.name;

};

// ===============================
// LOAD VOICE
// ===============================

voiceInput.onchange = function () {

    if (!this.files.length) return;

    voiceFile = this.files[0];

    voiceName.textContent = voiceFile.name;

};

// ===============================
// PHOTO GALLERY
// ===============================

function renderGallery() {

    gallery.innerHTML = "";

    photoCount.textContent =
        "Selected Photos : " + photos.length;

    photos.forEach((photo, index) => {

        const box = document.createElement("div");

        box.className = "photo";

        const img = document.createElement("img");

        img.src = photo;

        const remove = document.createElement("button");

        remove.className = "removeBtn";

        remove.innerHTML = "✕";

        remove.onclick = () => {

            photos.splice(index, 1);

            renderGallery();

        };

        box.appendChild(img);

        box.appendChild(remove);

        gallery.appendChild(box);

    });

            }
// ===============================
// PREVIEW ENGINE
// ===============================

function playPreview() {

    if (photos.length === 0) {

        alert("Please add some photos.");

        return;

    }

    currentSlide = 0;

    progress.style.width = "0%";

    status.textContent = "Playing Preview...";

    showSlide();

}

function showSlide() {

    if (currentSlide >= photos.length) {

        clearTimeout(slideshow);

        status.textContent = "Preview Finished ✔";

        progress.style.width = "100%";

        return;

    }

    preview.innerHTML = "";

    const img = document.createElement("img");

    img.src = photos[currentSlide];

    img.style.objectFit = "contain";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.transition = "transform 5s linear";

    preview.appendChild(img);

    // Motion
    if (motionMode.value === "cinematic") {

        const motions = [

            "scale(1.08)",
            "scale(1.06) translateX(8px)",
            "scale(1.06) translateX(-8px)",
            "scale(1.06) translateY(8px)",
            "scale(1.06) translateY(-8px)"

        ];

        const motion =
            motions[Math.floor(Math.random() * motions.length)];

        setTimeout(() => {

            img.style.transform = motion;

        }, 100);

    } else {

        const motions = [

            "scale(1.02)",
            "scale(1.01) translateX(3px)",
            "scale(1.01) translateX(-3px)",
            "scale(1.01) translateY(3px)",
            "scale(1.01) translateY(-3px)"

        ];

        const motion =
            motions[Math.floor(Math.random() * motions.length)];

        setTimeout(() => {

            img.style.transform = motion;

        }, 100);

    }

    progress.style.width =
        ((currentSlide + 1) / photos.length) * 100 + "%";

    currentSlide++;

    slideshow = setTimeout(
        showSlide,
        Number(duration.value) * 1000
    );

}

// ===============================
// BUTTON EVENTS
// ===============================

previewBtn.onclick = playPreview;

pauseBtn.onclick = function () {

    clearTimeout(slideshow);

    status.textContent = "Preview Paused";

};

// ===============================
// SAVE BUTTON
// ===============================

saveBtn.onclick = function () {

    if (photos.length === 0) {

        alert("Please add photos first.");

        return;

    }

    status.textContent = "Preparing video project...";

    const project = {

        photos: photos,

        music: musicFile,

        voice: voiceFile,

        frame: frameStyle.value,

        motion: motionMode.value,

        duration: Number(duration.value)

    };

    if (typeof Renderer !== "undefined") {

        Renderer.load(project);

        Renderer.start();

        status.textContent =
            "Renderer Ready ✔";

    } else {

        status.textContent =
            "Renderer not found.";

    }

};
