'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')

    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()

    window.addEventListener('resize', () => resizeCanvas())
    seGalleryImg()
    renderGallery()
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth
}

function renderMeme() {
    
    const meme = getMeme()
    const imgIdx = meme.selectedImgId

    const elImg = new Image()
    elImg.src = `img/gallery/${imgIdx}.jpg`

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    renderLines()

}

function renderLines() {
    
    const meme = getMeme()
    const lines = meme.lines

    lines.forEach(line => {
        const y = 45 + lines.indexOf(line) * 40
        const x = gElCanvas.width / 2
        drawText(line.size, line.color, line.txt, x, y, lines.indexOf(line), meme.selectedLineIdx)
    })

}

function drawText(size, color, text, x, y, lineIdx, selectedLineIdx) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    if (lineIdx === selectedLineIdx) {

        //get text dimension
        const textSize = gCtx.measureText(text)
        const textWidth = textSize.width
        const textHight = size

        //add pedding
        const padding = size / 8

        drawRectangle(textWidth, textHight, color, x, y, padding, lineIdx)
    }
}

function drawRectangle(textWidth, textHight, color, x, y, padding, lineIdx) {
    gCtx.beginPath()
    gCtx.strokeStyle = color
    gCtx.lineWidth = 2

    const rectX = x - (textWidth + padding * 4) / 2
    const rectY = y - (textHight + padding * 2) / 2

    const rectWidth = textWidth + padding * 4
    const rectHight = textHight + padding * 2

    gCtx.strokeRect(rectX, rectY, rectWidth, rectHight)

    saveTextProp(lineIdx, rectX, rectY, rectWidth, rectHight)
    

}

function onChangeLineText(elText) {
    setLineTxt(elText.value)
    renderMeme()
}

function onChangeToGallery() {
    const elditor = document.querySelector('.editor-main-layout')
    elditor.classList.add('hide')
    const elgallery = document.querySelector('.gallery-container')
    elgallery.classList.remove('hide')
}

function downloadCanvas(elLink) {
    elLink.download = 'canvas-image'

    const dataUel = gElCanvas.toDataURL()
    elLink.href = dataUel
}

function onChangeColor(elColor) {
    setColor(elColor.value)
    renderMeme()
}

function onChangeFontSize(action) {
    const additionValue = action === 'increase' ? 2 : -2
    setFontSize(additionValue)
    renderMeme()
}

function onAddLine() {
    addLine()
    _switchTextBoxInput()
    _changeTextColorInput()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    _switchTextBoxInput()
    _changeTextColorInput()
    renderMeme()
}
function _switchTextBoxInput() {
    const elTextBox = document.getElementById('text-box')
    const meme = getMeme()

    elTextBox.value = meme.lines[meme.selectedLineIdx].txt
}

function onDown(ev){
    const { offsetX, offsetY } = ev
    switchLineByClick(offsetX, offsetY )
    _switchTextBoxInput()
    _changeTextColorInput()
    renderMeme()
}

 function _changeTextColorInput(){
    const elTextColor = document.getElementById('txt-color')
    const meme = getMeme()
    elTextColor.value = meme.lines[meme.selectedLineIdx].color
 }