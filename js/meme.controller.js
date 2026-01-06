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
        const hight = 45 + lines.indexOf(line) * 40
        drawText(line.size, line.color, line.txt, gElCanvas.width / 2, hight, lines.indexOf(line), meme.selectedLineIdx)
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

        drawRectangle(textHight, textWidth, color, x, y, padding)
    }



}

function drawRectangle(hight, width, color, x, y, padding) {
    gCtx.beginPath()
    gCtx.strokeStyle = color
    gCtx.lineWidth = 2

    const rectX = x - (width + padding * 4) / 2
    const rectY = y - (hight + padding * 2) / 2

    gCtx.strokeRect(rectX, rectY, width + padding * 4, hight + padding * 2)

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
    switchTextBoxInput()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    switchTextBoxInput()
    renderMeme()
}
function switchTextBoxInput() {
    const elTextBox = document.getElementById('text-box')
    const meme = getMeme()

    elTextBox.value = meme.lines[meme.selectedLineIdx].txt
}