const clockContainer=document.querySelector(".clock");

function displayClock(){
    const currentTime=new Date();
    const time=document.querySelector(".clock > .time");
    const date=document.querySelector(".clock > .date");

    time.innerText=`${String(currentTime.getHours()).padStart(2,"0")} : ${String(currentTime.getMinutes()).padStart(2,"0")} : ${String(currentTime.getSeconds()).padStart(2,"0")}`;
    date.innerText=`${currentTime.toDateString()}`;
}

displayClock();
setInterval(displayClock,1000);