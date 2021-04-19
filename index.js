// var todolistFormStorage =
//   localStorage.getItem("todo-list") === null
//     ? []
//     : JSON.parse(localStorage.getItem("todo-list"));
// for (var i = 0; i < todolistFormStorage.length; i++) {
//   renderTodoCard(
//     todolistFormStorage[i].message,
//     todolistFormStorage[i].createdTime,
//     todolistFormStorage[i].id 
//   );
// }

//Fetch data from backend!!
var http = new XMLHttpRequest();
http.open("GET","https://607c412c67e6530017573d5a.mockapi.io/todo", true);
http.onreadystatechange = function(){
  if(this.readyState === 4){
     var todoList = JSON.parse(this.responseText);
      for (var i = 0; i < todoList.length; i++) {
        renderTodoCard(
          todoList[i].message,
          todoList[i].createdTime,
          todoList[i].id 
        );
      }    
  }
}
http.send();

function removeFromLocalStroge(todoId){
  var todoList = localStorage.getItem("todo-list") === null ? [] : JSON.parse(localStorage.getItem("todo-list"));
  var elementAtPos = -1;
  for( pos=0; pos <todoList.length; pos++){
    if(todoList[pos].id === todoId){
      elementAtPos = pos;
    }
  }
  if(elementAtPos>=0){
    todoList.splice(elementAtPos, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  }
}

var todoInput = document.getElementById("todo-item");
var defultValue = document.getElementById("todo-form");
defultValue.onsubmit = function (e) {
  e.preventDefault();
};

function getCurrentTimeHourFormat() {
  var date = new Date();
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var seconds = date.getSeconds();
  seconds = seconds < 10 ? +seconds : seconds;
  var suffix = date.getHours() >= 12 ? "pm" : "Am";

  return hours + ":" + minutes + ":" + seconds + " " + suffix;
}

function renderTodoCard(message, createdTime, todoId) {
  var todoList = document.getElementById("todo-list");
  var Maincard = document.createElement("div");
  
  //<h3 class="todo-message">Todo Item One</h3>
  var messageWrapper = document.createElement("div");
  var todoMsg = document.createElement("h3");
  messageWrapper.appendChild(todoMsg);
  Maincard.id = todoId;
  Maincard.className = "todo-card";
  todoMsg.innerHTML = message;
  todoMsg.classList.add("todo-message");
  Maincard.appendChild(messageWrapper);
  
  /* <p class="todo-time">04:26:45pm< p/p> */
  var createTime = document.createElement("p");
  createTime.className = "todo-time";
  createTime.innerText = createdTime;
  messageWrapper.appendChild(createTime);
  
  //<i class="fas fa-trash"></i>
  //<i class="fas fa-pen"></i>
  var iconWrapper = document.createElement("div");
  var deletIcon = document.createElement("i");
  var editIcon = document.createElement("i");
  deletIcon.classList = "fas fa-trash remove-icon";
  editIcon.classList = "fas fa-pen remove-icon";
  editIcon.onclick = function(){
    alert("delete msg")
  }
  iconWrapper.appendChild(editIcon);
  deletIcon.onclick = function (){
    var todoCard = document.getElementById(todoId);
    todoList.removeChild(todoCard)
    removeFromLocalStroge(todoId)
  }
  iconWrapper.appendChild(deletIcon);
  Maincard.appendChild(iconWrapper);
  
  todoList.appendChild(Maincard);
  console.log(todoList);
}

// todoInput.onchange = function(){
//     console.log("Value Changed!!")
// }
// todoInput.oninput = function(){
//     console.log(todoInput.value);
// }
todoInput.onkeyup = function (eObj) {
  if (eObj.key === "Enter") {
    if (todoInput.value.length > 0) {
      var CurrentTime = getCurrentTimeHourFormat();
      var message = todoInput.value;
      var todoId =new Date().getTime();
      renderTodoCard(message, CurrentTime);
      todoInput.value = "";
      var obj = {
        id: todoId,
        message: message,
        createdTime: CurrentTime,
      };

      var http =new XMLHttpRequest();
      http.open("POST", "https://607c412c67e6530017573d5a.mockapi.io/todo", true);
      http.onreadystatechange = function(){
        if(this.readyState === 4){
          alert("Ready")
        }
      }
      http.send(JSON.stringify(obj));

      // var todolist =
      //   localStorage.getItem("todo-list") === null
      //     ? []
      //     : JSON.parse(localStorage.getItem("todo-list"));
      // todolist.push(obj);
      // localStorage.setItem("todo-list", JSON.stringify(todolist));
      console.log(obj);
    } else {
      alert("Please enter the message");
    }
  }
};
// var obj = {name: 'shibu', age:22}
// obj.toString()
// JSON.stringify(obj)
// localStorage.setItem("todo-list", JSON.stringify(obj))
// localStorage.getItem("data")
// var returnData = localStorage.getItem("data");
// returnData.name
// JSON.parse(returnData)
// JSON.parse(returnData).name
// JSON.parse(returnData).age
// console.log(obj)
