let input = document.querySelectorAll(".input-goal")[0];
let list = document.getElementsByTagName("ul")[0];

let dataArray = [];

function showElements(array, event) {
  let elemsNode = ``;

  array.forEach((element, index) => {
    elemsNode += `<li id=${index} class='list-item'>
                            <input type='checkbox' class='item-checkbox'>
                            <label class='item-text'>${element.value}</label>
                            <span class='delete'>X</span>
                        </li>`;
  });

  list.innerHTML = elemsNode;
}

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && e.target.value !== "") {
    dataArray.push({
      checked: false,
      delete: false,
      value: e.target.value,
    });

    showElements(dataArray, e);

    console.log(dataArray);

    e.target.value = "";
  }
});

function onHandleEvent(event) {
  if (event.target.className === "delete") {
    console.log(event.target.parentElement);
    console.log(event.target.parentElement.id);

    dataArray.splice(event.target.parentElement.id, 1);

    showElements(dataArray);
  } else if (event.target.className === "item-checkbox") {
    dataArray[event.target.parentElement.id].checked = event.target.checked
      ? true
      : false;
    event.target.checked
      ? event.target.parentElement.classList.add("list-item-done")
      : event.target.parentElement.classList.remove("list-item-done");
  } else if (event.target.className === "item-text") {
    console.log(event);
    console.log(event.target);

    console.log(dataArray[event.target.parentElement.id].value);

    let reducting = document.createElement("input");

    event.target.addEventListener("click", (event) => {
      event.target.appendChild(reducting);
      reducting.addEventListener('onchange', (event) => {
        dataArray[event.target.id].value = event.target.value; 
      })
    });
    event.target.removeChild(reducting);

    showElements(dataArray);
  }
}
// function changeValue(index){
//     console.log(index);
// }

list.addEventListener("click", (event) => {
  console.log(event.target.className);
  onHandleEvent(event);
});
