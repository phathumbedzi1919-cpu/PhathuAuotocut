// ======================================
// AUTOCUT STUDIO RENDERER ENGINE
// Version 1.0
// ======================================

const Renderer = (() => {

let rendering = false;

let project = {};

let timeline = [];


// ==========================
// LOAD PROJECT
// ==========================

function load(data){

    project = data;

    timeline = [];

}


// ==========================
// BUILD TIMELINE
// ==========================

function buildTimeline(){

    timeline = [];

    let currentTime = 0;

    project.photos.forEach((photo,index)=>{

        timeline.push({

            index:index,

            image:photo,

            start:currentTime,

            end:currentTime+project.duration,

            motion:project.motion,

            frame:project.frame

        });

        currentTime += project.duration;

    });

}


// ==========================
// START
// ==========================

function start(){

    rendering = true;

    buildTimeline();

    console.log("===== AUTOCUT PROJECT =====");

    console.log(project);

    console.log("===== TIMELINE =====");

    console.table(timeline);

}


// ==========================
// STOP
// ==========================

function stop(){

    rendering = false;

}


// ==========================
// GET TIMELINE
// ==========================

function getTimeline(){

    return timeline;

}


// ==========================
// TOTAL DURATION
// ==========================

function totalDuration(){

    return timeline.length * project.duration;

}


// ==========================
// STATUS
// ==========================

function isRendering(){

    return rendering;

}


return{

    load,

    start,

    stop,

    getTimeline,

    totalDuration,

    isRendering

};

})();
