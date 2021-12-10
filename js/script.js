let input = document.querySelector(".input-goal");
let list = document.querySelector("ul");
let dotoApp = document.querySelector(".dotoApp");
// let label = document.querySelector("input.input-goal > label");

let allComplete = document.querySelector("i");
let countItems = document.querySelector(".number-items-left");
let footer = document.querySelector(".footer");


let text = document.createElement("input");

let dataArray = [];

let filter = "All";

let isAllCompleted;

function setArray(array) {
  dataArray = array;
  showElements();
  isAllCompleted = dataArray.every((item)=>item.isChecked)
}

function showCountItems() {
  let arr = dataArray.filter((item) => item.isChecked !== true);
  countItems.innerText = arr.length + " items left";
}

list.addEventListener("click", (event) => {
  if (event.target.className === "item-checkbox") {
    setIsChecked(event);
    showCountItems();
  }
});

function setIsChecked(event) {
  let elem = dataArray.find((item) => item.id == event.target.parentElement.id);
  elem.isChecked = event.target.checked;
  showElements();
}

// render
function showElements() {
  list.innerHTML = "";

  filteredArray().forEach((element) => {
    let li = document.createElement("li");
    let checkBox = document.createElement("input");
    let deleteItem = document.createElement("span");
    let label = document.createElement("label");

    if (element.isChecked == true) {
      checkBox.setAttribute("checked", "true");
      label.setAttribute("class", "list-item-label-done");
      li.classList.add("list-item-li-done");
    }

    checkBox.type = "checkbox";
    checkBox.setAttribute("class", "item-checkbox");
    li.classList.add("item-text");

    li.setAttribute("id", element.id);

    label.innerText = element.value;
    label.classList.add("text-li");

    deleteItem.innerText = "×";
    deleteItem.setAttribute("class", "delete");

    li.appendChild(label);
    li.insertAdjacentElement("afterbegin", checkBox);
    li.insertAdjacentElement("beforeend", deleteItem);

    list.appendChild(li);
  });

  showCountItems();

  if (dataArray.length) {
    footer.classList.remove("hidden");
    allComplete.classList.remove("hidden");
  } else {
    footer.classList.add("hidden");
    allComplete.classList.add("hidden");
  }
}

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && e.target.value.trim() !== "") {
    setArray([
      ...dataArray,
      {
        isChecked: false,
        value: e.target.value,
        id: Date.now(),
      },
    ]);

    e.target.value = "";
  }
});

list.addEventListener("click", (event) => {
  if (event.target.className === "delete") {
    const arr = dataArray.filter(
      (item) => item.id != event.target.parentElement.id
    );
    setArray(arr);
  }
});

footer.addEventListener("click", (event) => {
  filter = event.target.className;
  showElements();
});

const filteredArray = () => {
  switch (filter) {
    case "active-button":
      return dataArray.filter((item) => item.isChecked == false);
    case "completed-button":
      return dataArray.filter((item) => item.isChecked == true);
    case "clear-completed-button":
      return (dataArray = dataArray.filter((item) => item.isChecked == false));
    default:
      return dataArray;
  }
};

allComplete.addEventListener("click", (event) => {
  if(isAllCompleted){
    setArray(dataArray.map((item) => {return {...item, isChecked: false}}));
    allComplete.classList.remove("checked");
  }else{
    setArray(dataArray.map((item) => {return {...item, isChecked: true}}));
    allComplete.classList.add("checked");
  }
});

list.addEventListener("dblclick", (event) => {
  if (event.target.className === "text-li") {
    text.setAttribute("class", "set-value-li");
    text.value = event.target.textContent;
    let parent = event.target.parentElement;
    parent.innerHTML = "";
    parent.appendChild(text);
  }
});

text.addEventListener("onchange", () => {
  dataArray.forEach((item) => {
    if (item.id == parent.id && item.value.trim() !== "") {
      item.value = text.value;
    }
  });
});

list.addEventListener("onclick", (event) => {
  if (event.target !== text) {
    showElements();
  }
});


