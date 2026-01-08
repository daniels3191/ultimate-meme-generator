'use strict'


var gImgs
var gMeme
// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
function seGalleryImg() {
    gImgs = [
        { id: 1, url: 'img/gallery/1.jpg', keywords: ['funny', 'humman'] },
        { id: 2, url: 'img/gallery/2.jpg', keywords: ['funny', 'humman'] },
        { id: 3, url: 'img/gallery/3.jpg', keywords: ['funny', 'humman'] },
        { id: 4, url: 'img/gallery/4.jpg', keywords: ['funny', 'humman'] },
        { id: 5, url: 'img/gallery/5.jpg', keywords: ['funny', 'humman'] },
        { id: 6, url: 'img/gallery/6.jpg', keywords: ['funny', 'humman'] },
        { id: 7, url: 'img/gallery/7.jpg', keywords: ['funny', 'humman'] },
        { id: 8, url: 'img/gallery/8.jpg', keywords: ['funny', 'humman'] },
        { id: 9, url: 'img/gallery/9.jpg', keywords: ['funny', 'humman'] },
        { id: 10, url: 'img/gallery/10.jpg', keywords: ['funny', 'humman'] },
        { id: 11, url: 'img/gallery/11.jpg', keywords: ['funny', 'humman'] },
        { id: 12, url: 'img/gallery/12.jpg', keywords: ['funny', 'humman'] },
        { id: 13, url: 'img/gallery/13.jpg', keywords: ['funny', 'humman'] },
        { id: 14, url: 'img/gallery/14.jpg', keywords: ['funny', 'humman'] },
        { id: 15, url: 'img/gallery/15.jpg', keywords: ['funny', 'humman'] },
        { id: 16, url: 'img/gallery/16.jpg', keywords: ['funny', 'humman'] },
        { id: 17, url: 'img/gallery/17.jpg', keywords: ['funny', 'humman'] },
        { id: 18, url: 'img/gallery/18.jpg', keywords: ['funny', 'humman'] },
        { id: 19, url: 'img/gallery/19.jpg', keywords: ['funny', 'humman'] },
    ]
}

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


function switchLineByClick(offsetX, offsetY) {

    const lineIdx = gMeme.lines.findIndex(line => isLineClicked(offsetX, offsetY, line))
    if (lineIdx >= 0) gMeme.selectedLineIdx = lineIdx



}

function isLineClicked(offsetX, offsetY, line) {

    if (offsetX > line.boxLocation.x &&
        offsetX < (line.boxLocation.x + line.boxSize.width) &&
        offsetY > line.boxLocation.y &&
        offsetY < (line.boxLocation.y + line.boxSize.hight)
    ) return true
    else return false


}

function resetLines() {
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