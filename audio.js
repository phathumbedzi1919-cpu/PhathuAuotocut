// ==========================
// PHATHU AUDIO ENGINE
// ==========================

const AudioEngine = (() => {

let musicFile = null;
let voiceFile = null;

let musicAudio = new Audio();
let voiceAudio = new Audio();

function loadMusic(file){

    if(!file) return;

    musicFile = file;

    musicAudio.src = URL.createObjectURL(file);

    document.getElementById("musicName").textContent =
        file.name;

}

function loadVoice(file){

    if(!file) return;

    voiceFile = file;

    voiceAudio.src = URL.createObjectURL(file);

    document.getElementById("voiceName").textContent =
        file.name;

}

function playMusic(){

    if(musicFile){

        musicAudio.currentTime = 0;
        musicAudio.play();

    }

}

function stopMusic(){

    musicAudio.pause();
    musicAudio.currentTime = 0;

}

function playVoice(){

    if(voiceFile){

        voiceAudio.currentTime = 0;
        voiceAudio.play();

    }

}

function stopVoice(){

    voiceAudio.pause();
    voiceAudio.currentTime = 0;

}

function stopAll(){

    stopMusic();
    stopVoice();

}

function setMusicVolume(value){

    musicAudio.volume = value;

}

function setVoiceVolume(value){

    voiceAudio.volume = value;

}

return{

    loadMusic,
    loadVoice,
    playMusic,
    stopMusic,
    playVoice,
    stopVoice,
    stopAll,
    setMusicVolume,
    setVoiceVolume

};

})();
