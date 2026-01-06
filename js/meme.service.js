'use strict'


var gImgs = [
    { id: 1, url: 'img/gallery/1.jpg', keywords: ['funny', 'humman'] },
    { id: 2, url: 'img/gallery/2.jpg', keywords: ['funny', 'humman'] }
]
var gMeme
// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getImgs() {
    return gImgs
}

function setImg(id) {
    resetLines()
    gMeme.selectedImgId = id
    

}

function setColor(color) {

    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(additionValue) {
    gMeme.lines[gMeme.selectedLineIdx].size += additionValue

}

function addLine() {
    gMeme.lines.push({
        txt: 'Hello mate'
        ,
        size: 26,
        color: '#ffffff',
        boxLocation: { x: '', y: '' },
        boxSize: { width: '', hight: '' }
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1

    
    
}

function switchLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0

}

function saveTextProp(lineIdx, rectX, rectY, rectWidth, rectHight) {
    gMeme.lines[lineIdx].boxLocation.x = rectX
    gMeme.lines[lineIdx].boxLocation.y = rectY
    gMeme.lines[lineIdx].boxSize.width = rectWidth
    gMeme.lines[lineIdx].boxSize.hight = rectHight

}


function switchLineByClick(offsetX, offsetY){
     
    const lineIdx = gMeme.lines.findIndex(line => isLineClicked(offsetX, offsetY, line))
    if (lineIdx >= 0) gMeme.selectedLineIdx = lineIdx

    
    
}

function isLineClicked(offsetX, offsetY, line){

    if (offsetX > line.boxLocation.x && 
        offsetX < (line.boxLocation.x + line.boxSize.width) &&
        offsetY > line.boxLocation.y && 
        offsetY < (line.boxLocation.y + line.boxSize.hight)
        ) return true
        else return false
        

}

function resetLines(){
    gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '#ffffff',
            boxLocation: { x: '', y: '' },
            boxSize: { width: '', hight: '' }
        }
    ]
}

}