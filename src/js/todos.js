const todo=document.querySelector(".todos");
const todoBar=document.querySelector(".todos>.mobileBar");
const todoForm=document.querySelector(".todos>.todoContent>.typeTodo");
const todoInput=document.querySelector(".todos>.todoContent>.typeTodo>#typeTodo")
const todoList=document.querySelector(".todos>.todoContent>.todoList");
const DELETE_ICON="delete_icon.png";
let todoArray=[];

// show and hide the to-do list box
function showTodo(){
    todo.classList.toggle("hidden_bar");
}

function deleteTodoItem(event){
    todoArray=todoArray.filter((item) => item.ID !== Number(event.path[2].id));
    saveTodoItem();
    event.path[2].remove();
}

function saveTodoItem(){
    localStorage.setItem("todos",JSON.stringify(todoArray));
}

function addTodoItem(itemObj){
    const todo_li = document.createElement("li");
    const todo_span=document.createElement("span");
    const todo_button=document.createElement("button");
    todo_li.id=itemObj.ID;
    todo_span.innerText=itemObj.text;
    todo_button.innerHTML=`<img src="./src/img/${DELETE_ICON}" alt="삭제 버튼">`;
    todo_button.addEventListener("click",deleteTodoItem);
    todo_li.appendChild(todo_span);
    todo_li.appendChild(todo_button);
    todoList.appendChild(todo_li);
}

// add item to to-do list and store it to localstorage
function handleTodoItem(event){
    event.preventDefault();
    const item=todoInput.value;
    todoInput.value='';
    const itemObj={
        text:item,
        ID:Date.now()
    };
    addTodoItem(itemObj);
    todoArray.push(itemObj);
    saveTodoItem(todoArray);
}

todoForm.addEventListener("submit",handleTodoItem);
todoBar.addEventListener("click",showTodo);

const savedTodoItems=localStorage.getItem("todos");

if(savedTodoItems!==null){
    const parsedTodoItems=JSON.parse(savedTodoItems);
    todoArray=parsedTodoItems;
    parsedTodoItems.forEach(addTodoItem);
}

// + moving todo Bar