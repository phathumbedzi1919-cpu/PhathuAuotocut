// =============================
// AUTOCUT STUDIO
// MAIN SCRIPT
// =============================

const imageInput = document.getElementById("imageInput");
const addPhotoBtn = document.getElementById("addPhotoBtn");

const musicInput = document.getElementById("musicInput");
const addMusicBtn = document.getElementById("addMusicBtn");

const voiceInput = document.getElementById("voiceInput");
const addVoiceBtn = document.getElementById("addVoiceBtn");

const gallery = document.getElementById("gallery");
const preview = document.getElementById("preview");

const previewBtn = document.getElementById("previewBtn");
const saveBtn = document.getElementById("saveBtn");

const photoCount = document.getElementById("photoCount");
const status = document.getElementById("status");

const motionMode = document.getElementById("motionMode");

let photos = [];

let current = 0;

let slideshow = null;

// =========================
// PHOTO BUTTON
// =========================

addPhotoBtn.onclick = () => {

    imageInput.click();

};

// =========================
// MUSIC BUTTON
// =========================

addMusicBtn.onclick = () => {

    musicInput.click();

};

// =========================
// VOICE BUTTON
// =========================

addVoiceBtn.onclick = () => {

    voiceInput.click();

};

// =========================
// LOAD PHOTO
// =========================

imageInput.onchange = e => {

    const file = e.target.files[0];

    if (!file) return;

    photos.push(URL.createObjectURL(file));

    renderGallery();

};

// =========================
// LOAD MUSIC
// =========================

musicInput.onchange = e => {

    const file = e.target.files[0];

    AudioEngine.loadMusic(file);

};

// =========================
// LOAD VOICE
// =========================

voiceInput.onchange = e => {

    const file = e.target.files[0];

    AudioEngine.loadVoice(file);

};

// =========================
// GALLERY
// =========================

function renderGallery() {

    gallery.innerHTML = "";

    photoCount.innerHTML =
        "Selected Photos : " + photos.length;

    photos.forEach((photo, index) => {

        const div = document.createElement("div");

        div.className = "photo";

        const img = document.createElement("img");

        img.src = photo;

        const remove = document.createElement("button");

        remove.innerHTML = "✕";

        remove.className = "removeBtn";

        remove.onclick = () => {

            photos.splice(index, 1);

            renderGallery();

        };

        div.appendChild(img);

        div.appendChild(remove);

        gallery.appendChild(div);

    });

}

// =========================
// PREVIEW
// =========================

previewBtn.onclick = () => {

    if (photos.length == 0) {

        alert("Please add some photos.");

        return;

    }

    AudioEngine.stopAll();

    AudioEngine.playMusic();

    current = 0;

    playSlide();

};

// =========================
// PLAY
// =========================

function playSlide() {

    preview.innerHTML = "";

    const img = document.createElement("img");

    img.src = photos[current];

    preview.appendChild(img);

    MotionEngine.animate(
        img,
        motionMode.value
    );

    current++;

    if (current >= photos.length) {

        AudioEngine.stopMusic();

        status.innerHTML =
            "Preview Finished ✔";

        return;

    }

    slideshow = setTimeout(playSlide, 5000);

}

// =========================
// SAVE
// =========================

saveBtn.onclick = () => {

    status.innerHTML =
        "Video Export coming in Renderer.js...";

};
