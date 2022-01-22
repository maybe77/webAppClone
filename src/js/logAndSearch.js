const form=document.querySelector(".container > .typePlace");
const input=document.querySelector(".container > .typePlace > #input");
const nameSpace=document.querySelector(".name");
const searchIcon=document.querySelector(".container>.typePlace>button");
let isName=1;
const CLASSNAME_HIDDEN="hidden";

// transform login mode to search mode by manipulating node's attributes
// this form performs both login mode and search mode
function logOnMode(){
    nameSpace.classList.toggle(CLASSNAME_HIDDEN);
    if(localStorage.getItem("username")===null) localStorage.setItem("username",input.value);
    form.setAttribute("data-search","true");
    input.setAttribute("placeholder","");
    input.value="";
    searchIcon.classList.toggle(CLASSNAME_HIDDEN);
    nameSpace.innerText=localStorage.getItem("username");
}

const searchedContainer=document.querySelector(".container>.searchedList");
let searchedList=[];
let head=0, tail=0;

// make search list by queue concept using array.
// search list shows 4 searched words.
function showList(){
    while (searchedContainer.hasChildNodes()){
        searchedContainer.removeChild( searchedContainer.firstChild ); 
    }
    for(let i=head;i<tail;i++){
        const search_li=document.createElement("li");
        search_li.innerText=searchedList[i];
        searchedContainer.appendChild(search_li);
    }
}

function saveSearchedList(){
    localStorage.setItem("searchedList",JSON.stringify(searchedList));
}

function addSearchList(){
  searchedList.push(input.value);
  input.value='';
  tail++;
  if(tail-head>4) head++;
  showList()
  saveSearchedList();
}

function receiveData(event){
    event.preventDefault();
    if(isName){
        isName=!isName;
        logOnMode();
    }else{
        console.log("received...");
        addSearchList();
    }
    
}

// check if storage have "username" when refresh page
if(localStorage.getItem("username")!==null){
    isName=0;
    logOnMode();
}

form.addEventListener('submit',receiveData);

//
// side menu including log out
//

const sideMenu=document.querySelector(".menuWrap");
const logoutBtn=document.querySelector(".menuWrap>.logout");

function showMenu(){
    sideMenu.classList.toggle("hidden_sideMenu");
    nameSpace.classList.toggle("clicked");
}

function logout(){
    isName=1;
    localStorage.removeItem("username");
    nameSpace.classList.toggle(CLASSNAME_HIDDEN);
    sideMenu.classList.toggle("hidden_sideMenu");
    form.removeAttribute("data-search");
    input.setAttribute("placeholder","Enter your name");
    searchIcon.classList.toggle(CLASSNAME_HIDDEN);
    nameSpace.classList.remove("clicked");
    nameSpace.innerText='';
}

nameSpace.addEventListener("click",showMenu);
logoutBtn.addEventListener("click",logout);
