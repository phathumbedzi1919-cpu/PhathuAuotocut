const imageInput = document.getElementById("imageInput");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const gallery = document.getElementById("gallery");
const preview = document.getElementById("preview");
const previewBtn = document.getElementById("previewBtn");
const photoCount = document.getElementById("photoCount");

let photos = [];
let lastMotion = -1;
let musicFile = null;

const addMusicBtn = document.getElementById("addMusicBtn");
const musicInput = document.getElementById("musicInput");
const saveVideoBtn = document.getElementById("saveVideoBtn");

// Motion presets (safe for quotes)
const motions = [

    {
        start: "scale(1)",
        end: "scale(1.02)"
    },

    {
        start: "scale(1.02)",
        end: "scale(1)"
    },

    {
        start: "translateX(0px)",
        end: "translateX(-6px)"
    },

    {
        start: "translateX(0px)",
        end: "translateX(6px)"
    },

    {
        start: "translateY(0px)",
        end: "translateY(-6px)"
    },

    {
        start: "translateY(0px)",
        end: "translateY(6px)"
    },

    {
        start: "scale(1)",
        end: "scale(1.01) translateX(4px)"
    },

    {
        start: "scale(1)",
        end: "scale(1.01) translateY(-4px)"
    }

];

// Open picker
addPhotoBtn.onclick = () => {

    imageInput.click();

};

// Add image
imageInput.onchange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    photos.push(URL.createObjectURL(file));

    imageInput.value = "";

    renderGallery();
    addMusicBtn.onclick = () => {
    musicInput.click();
};

musicInput.onchange = (e) => {
    musicFile = e.target.files[0];

    if (musicFile) {
        alert("Music added: " + musicFile.name);
    

};

// Gallery
function renderGallery() {

    gallery.innerHTML = "";

    photoCount.innerHTML = "Selected Photos: " + photos.length;

    photos.forEach((photo, index) => {

        const div = document.createElement("div");
        div.className = "photo";

        const img = document.createElement("img");
        img.src = photo;

        const remove = document.createElement("button");
        remove.className = "removeBtn";
        remove.innerHTML = "✕";

        remove.onclick = () => {

            photos.splice(index, 1);

            renderGallery();

        };

        div.appendChild(img);
        div.appendChild(remove);

        gallery.appendChild(div);

    });

}

// Preview slideshow
previewBtn.onclick = () => {

    if (photos.length === 0) {

        alert("Please add some photos.");

        return;

    }

    let current = 0;

    play();

    function play() {

        preview.innerHTML = "";

        const img = document.createElement("img");

        img.src = photos[current];

        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";

        img.style.transition =
            "transform 5s ease-in-out, opacity .8s";

        img.style.opacity = "0";

        preview.appendChild(img);

        setTimeout(() => {

            img.style.opacity = "1";

        }, 50);

        let random;

        do {

            random = Math.floor(Math.random() * motions.length);

        } while (random === lastMotion);

        lastMotion = random;

        const motion = motions[random];

        img.style.transform = motion.start;

        setTimeout(() => {

            img.style.transform = motion.end;

        }, 100);

        current++;

        if (current < photos.length) {

            setTimeout(play, 5000);

        }

    }


    }
