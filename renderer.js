// ===============================
// AUTOCUT STUDIO RENDERER
// Version 1
// ===============================

const Renderer = (() => {

let isRendering = false;

function start(){

    isRendering = true;

    console.log("Renderer Started");

}

function stop(){

    isRendering = false;

    console.log("Renderer Finished");

}

function getStatus(){

    return isRendering;

}

return{

    start,
    stop,
    getStatus

};

})();
