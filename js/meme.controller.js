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
    _setLinesChanges()
    renderLines()

}

function renderLines() {

    const meme = getMeme()
    const lines = meme.lines


    lines.forEach(line => {

        let y = lines[lines.indexOf(line)].boxCenter.y
        let x = lines[lines.indexOf(line)].boxCenter.x

        const lineIdx = lines.indexOf(line)
        const selectedLineIdx = meme.selectedLineIdx

        //Check if we dont have overflow on y axice when moving down the lign 
        if ((y + line.boxSize.height) >= gElCanvas.height) {
            y -= 10
        }

        //New line always added to the center (and centered line)
        if (lineIdx === selectedLineIdx && line.isNewLine) {
            y = 45 + lines.indexOf(line) * 40
            x = gElCanvas.width / 2
            line.isNewLine = false

            //when align to the right I dont have the canvas width on the service
        } else if (line.boxLocation.x === -1) {
            x = gElCanvas.width - line.boxSize.width / 2

            //when align to the Center I dont have the canvas width on the service
        } else if (line.boxLocation.x === -10) {
            x = gElCanvas.width / 2
        }

        drawText(line.fontFamily, line.size, line.color, line.txt, x, y, lines.indexOf(line), meme.selectedLineIdx)
    })

}

function drawText(fontFamily, size, color, text, x, y, lineIdx, selectedLineIdx) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${size}px ${fontFamily}`
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
    if (document.querySelector('.menue-open')) {
       const elMenue = document.body.classList.toggle('menue-open')
       const elBtnMenue = document.querySelector('.btn-toggle-menue')
       elBtnMenue.innerText = elMenue ? 'X' : '\u2630'
    }
}

function downloadCanvas(elLink) {
    elLink.download = 'canvas-image'

    const dataUel = gElCanvas.toDataURL()
    elLink.href = dataUel
}

function onChangeColor(elColor) {
    console.log(elColor.value);

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
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}
function _switchTextBoxInput() {
    const elTextBox = document.getElementById('text-box')
    const meme = getMeme()

    elTextBox.value = meme.lines[meme.selectedLineIdx].txt
}

function onDown(ev) {
    const { offsetX, offsetY } = ev
    switchLineByClick(offsetX, offsetY)
    renderMeme()
}

function onChangeFontFemily(elFontFamily) {
    setFontFamily(elFontFamily.value)
    renderMeme()
}

function _changeFontFamilyInput() {
    const elTextColor = document.getElementById('font-family')
    const meme = getMeme()

    elTextColor.value = meme.lines[meme.selectedLineIdx].fontFamily
}

function _setLinesChanges() {
    _switchTextBoxInput()
    _changeFontFamilyInput()
}

function onTextAlign(location) {
    setNewXLocation(location)
    renderMeme()

}

function onLineUpDown(direction) {
    moveLine(direction)
    renderMeme()

}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}
