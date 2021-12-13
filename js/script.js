let input = document.querySelector(".input-goal");
let list = document.querySelector("ul");
let dotoApp = document.querySelector(".dotoApp");

let allComplete = document.querySelector("i");
let clearComleted = document.querySelector(".clear-completed-button");
let countItems = document.querySelector(".number-items-left");
let footer = document.querySelector(".footer");

let text = document.createElement("input");

let dataArray = [];

let filter = "All";

let isAllCompleted;

function setArray(array) {
  dataArray = array;
  showElements();
  isAllCompleted = dataArray.find((item) => item.isChecked);
}

function showCountItems() {
  let arr = dataArray.filter((item) => item.isChecked !== true);
  countItems.innerText = arr.length + " items left";
}

list.addEventListener("click", (event) => {
  // if (event.target.className === "item-checkbox") {
  if (event.target.className === "check") {
    setIsChecked(event);
    showCountItems();
  }
});

function setIsChecked(event) {
  let elem = dataArray.find((item) => item.id == event.target.parentElement.id);
  // elem.isChecked = event.target.checked;
  elem.isChecked = !elem.isChecked;

  showElements();
}

// render
function showElements() {
  list.innerHTML = "";

  filteredArray().forEach((element) => {
    let li = document.createElement("li");
    let checkBox = document.createElement("input");
    let deleteItem = document.createElement("span");
    let span = document.createElement("span");
  let labelForCheckbox = document.createElement("label");

    if (element.isChecked == true) {
      checkBox.setAttribute("checked", "true");
      span.setAttribute("class", "list-item-label-done");
      li.classList.add("list-item-li-done");
    }
    // label.htmlFor = 'some-input-id';

    labelForCheckbox.classList.add("check");
    // labelForCheckbox.setAttribute("htmlFor", element.id);
    labelForCheckbox.htmlFor = element.id;

    checkBox.type = "checkbox";
    checkBox.setAttribute("class", "item-checkbox");
    li.classList.add("item-text");

    li.setAttribute("id", element.id);

    span.innerText = element.value;
    span.classList.add("text-li");

    deleteItem.innerText = "×";
    deleteItem.setAttribute("class", "delete");

    li.appendChild(labelForCheckbox);
    li.appendChild(span);
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

  if (dataArray.length) {
    let isComplete = dataArray.some((item) => item.isChecked);
    if (isComplete) {
      clearComleted.classList.remove("hidden");
    } else {
      clearComleted.classList.add("hidden");
    }
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
  if (event.target.className !== "footer") {
    let children = Array.from(footer.children);
    children.forEach((item) => {
      item.classList.remove("active");
    });
    showElements();
    event.target.classList.add("active");
  }
});

clearComleted.addEventListener("click", (event) => {
  dataArray = dataArray.filter((item) => item.isChecked == false);
  showElements();
});

const filteredArray = () => {
  switch (filter) {
    case "active-button":
      return dataArray.filter((item) => item.isChecked == false);
    case "completed-button":
      return dataArray.filter((item) => item.isChecked == true);
    default:
      return dataArray;
  }
};

allComplete.addEventListener("click", (event) => {
  if (isAllCompleted) {
    setArray(
      dataArray.map((item) => {
        return { ...item, isChecked: false };
      })
    );
    allComplete.classList.remove("checked");
  } else {
    setArray(
      dataArray.map((item) => {
        return { ...item, isChecked: true };
      })
    );
    allComplete.classList.add("checked");
  }
});

list.addEventListener("dblclick", (event) => {
  if (event.target.className.includes("text-li")) {
    text.setAttribute("class", "set-value-li");
    text.value = event.target.textContent;
    let parent = event.target.parentElement;
    parent.innerHTML = "";
    parent.classList.remove("list-item-li-done");
    parent.classList.add("list-item");
    parent.appendChild(text);
    text.focus();
  }
});

text.addEventListener("input", () => {
  dataArray.forEach((item) => {
    if (item.id == text.parentElement.id && item.value.trim() !== "") {
      item.value = text.value;
    }
  });
});

text.addEventListener("focusout", () => {
  showElements();
});
