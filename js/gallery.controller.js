'use strict'


function renderGallery(){
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
        <img id="${img.id}" src="img/gallery/${img.id}.jpg" onclick="onSelectImg(this)" alt="">`)
    
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML =   strHTMLs.join('')  
}

function onSelectImg(elImg) {
    setImg(elImg.id)
    chnageToEditor()
    resizeCanvas()
    renderMeme()
     
}

function chnageToEditor(){
    const elditor = document.querySelector('.editor-main-layout')
    elditor.classList.remove('hide')

    const elgallery = document.querySelector('.gallery-container')
    elgallery.classList.add('hide')
}