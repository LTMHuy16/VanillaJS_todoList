const inputBox = document.querySelector(".inputField input"),
addBtn = document.querySelector(".inputField button"),
todoList = document.querySelector(".todoList"),
numbTask = document.querySelector(".footer .number"),
clearAllBtn = document.querySelector(".footer .clearAll");

inputBox.addEventListener("keyup", function () {
  let userData = inputBox.value;
  //active add todo button if user enter valid data
  if(userData.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");  
  }
});


addBtn.addEventListener("click", function () {
  showTask();
});

// show all tasks in store when it begin
showTask();

function showTask() {
  // localStorage methods
  let userData = inputBox.value;
  let getLocalStore = localStorage.getItem("New Todo");
  if (getLocalStore === null) {
    listArr = [];
  }
  else {
    listArr = JSON.parse(getLocalStore);
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));

  // show all tasks
  let newLiTag = '',
  pendingNumb = listArr.length;
  listArr.forEach((element, index) => {
    if (element != "") {
      newLiTag += `<li>${element}<span onclick="deleteTask(${index})";><i class='bx bxs-trash-alt' ></i></span></li>`;
    }
    // if localStore have empty element => remove
    else {
      let getLocalStore = localStorage.getItem("New Todo");
      listArr = JSON.parse(getLocalStore);
      listArr.splice(index, 1);
      localStorage.setItem("New Todo", JSON.stringify(listArr));
      pendingNumb--;
    }
  });

  // trigger clearAll button 
  if (pendingNumb > 0) {
    clearAllBtn.classList.add("active");
  } else {
    clearAllBtn.classList.remove("active");
  }

  todoList.innerHTML = newLiTag;
  numbTask.innerText = pendingNumb;
  inputBox.value = "";
}

// function delete
function deleteTask(index) {
  let getLocalStore = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStore);
  listArr.splice(index, 1); // remove arr element
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
}

clearAllBtn.addEventListener("click", function () {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
});
