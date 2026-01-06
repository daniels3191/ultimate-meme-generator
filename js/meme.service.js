'use strict'


var gImgs = [
    { id: 1, url: 'img/gallery/1.jpg', keywords: ['funny', 'humman'] },
    { id: 2, url: 'img/gallery/2.jpg', keywords: ['funny', 'humman'] }
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel'
            ,
            size: 20,
            color: 'white'
        }
    ]
}
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
    gMeme.selectedImgId = id

}

function setColor(color) {

    gMeme.lines[0].color = color
}

function setFontSize(additionValue) {
    gMeme.lines[gMeme.selectedLineIdx].size += additionValue

}

function addLine() {
    gMeme.lines.push({
        txt: 'Hello mate'
        ,
        size: 26,
        color: 'white'
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0

}