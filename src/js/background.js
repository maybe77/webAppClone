const wrap=document.querySelector(".wrap");

const imgs=["main_02.jpg","main_03.jpg","main_04.jpg","main_06.jpg","main_07.jpg"];

function randomImg(){
    const selectedImg=imgs[Math.floor(Math.random()*imgs.length)];
    wrap.style.backgroundImage=`URL("./src/img/${selectedImg}")`;
}

randomImg();