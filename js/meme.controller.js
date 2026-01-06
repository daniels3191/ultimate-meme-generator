'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    console.log(gElCanvas);

    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()

    window.addEventListener('resize', () => resizeCanvas())
    renderGallery()
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth


}


// function renderMeme(elImg) {

//     gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
//     drawText('Hello', gElCanvas.width/2, 45)
// }
function renderMeme() {
    
    const meme = getMeme()
    const imgIdx = meme.selectedImgId
    const text = meme.lines[0].txt
    
    const elImg = new Image()
    elImg.src = `img/gallery/${imgIdx}.jpg`
    

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(text, gElCanvas.width / 2, 45)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'

    gCtx.fillStyle = 'white'

    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onChangeLineText(elText){
    setLineTxt(elText.value)
    renderMeme()

    
}

function onChangeToGallery(){
     const elditor = document.querySelector('.editor-main-layout')
    elditor.classList.add('hide')

    const elgallery = document.querySelector('.gallery-container')
    elgallery.classList.remove('hide')

}