'use strict'


function renderGallery(){
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
        <img src="img/gallery/${img.id}.jpg" onclick="onSelectImg(this)" alt="">`)
    
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML =   strHTMLs.join('')  
}