let input = document.querySelector(".input-goal");
let list = document.querySelector("ul");
let dotoApp = document.querySelector('.dotoApp');
let countItems = document.querySelector('.number-items-left');
let allButton = document.querySelector('.all-button');
let activeButton = document.querySelector('.active-button');
let completedButton = document.querySelector('.completed-button');
let clearCompletedButton = document.querySelector('.clear-completed-button');

let dataArray = [];

function setArray(array=null, element = null) {
  if(element == null && array !== null) {
    dataArray=array;
    showElements();
    showCountItems();
  }
    // dataArray=array;
    showElements(array);
    showCountItems(array);
};

function showCountItems(array = null){
  if(array){
    dataArray=array;
  }
      countItems.innerText = dataArray.length +' items left';
}

list.addEventListener("click", (event) => {
  if (event.target.className === "item-checkbox") {
      isChecked(event); 
  }
});

function isChecked(event) {
  let elem = dataArray.find((item) => item.id == event.target.parentElement.id);
  elem.checked = event.target.checked;
  console.log(event, dataArray);
  event.target.checked
    ? event.target.parentElement.children[1].classList.add("list-item-done")
    : event.target.parentElement.children[1].classList.remove("list-item-done");
}

// render
function showElements(array=null) {
  console.log('array: ', array);
    list.innerHTML ='';
    if(array){
      dataArray=array;
    }
    dataArray.forEach((element) => {
    let li = document.createElement('li');
    let checkBox = document.createElement('input');
    let deleteItem = document.createElement('span');
    let label = document.createElement('label');

    if(element.checked == true){
      label.setAttribute("class", "list-item-done")
    }

    checkBox.type = 'checkbox';
    checkBox.setAttribute("class", "item-checkbox");
    li.setAttribute("class", 'item-text');
    li.setAttribute("id", element.id);

    label.innerText = element.value;

    deleteItem.innerText = 'X';
    deleteItem.setAttribute('class', 'delete');

    li.appendChild(label);
    li.insertAdjacentElement('afterbegin', checkBox);
    li.insertAdjacentElement('beforeend', deleteItem);

    list.appendChild(li);
  });
};

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && e.target.value.trim() !== "") {

   setArray([...dataArray, {
      checked: false,
      value: e.target.value,
      id: Date.now()
    }]);

    console.log(dataArray);

    e.target.value = "";
  }
});

list.addEventListener("click", (event) => {
    if (event.target.className === "delete") {
        const arr = dataArray.filter(item => item.id != event.target.parentElement.id);
        console.log(arr)
        setArray(arr)
    }
  });


  activeButton.addEventListener('click', (event) => {
    activeTasks(event.target);
  });

  function activeTasks(element) {
      let array = dataArray.filter((item) => item.checked == false);
      setArray(array, element);
  }

  allButton.addEventListener('click', (event) => {
    allTascks(event.target);
  })

  function allTascks(element) {
    setArray(array = null, element);
  }
// dotoApp.addEventListener("click", (event) => {
//     if(event.target.className === "delete") {

//     }
// });

// function onHandleEvent(event) {
//   if (event.target.className === "delete") {
//       showElements(dataArray);
//     dataArray.splice(event.target.parentElement.id, 1);


//   } 
//   else if (event.target.className === "item-checkbox") {
//     dataArray[event.target.parentElement.id].checked = event.target.checked
//       ? true
//       : false;
//     event.target.checked
//       ? event.target.parentElement.classList.add("list-item-done")
//       : event.target.parentElement.classList.remove("list-item-done");

//   } 
//   else if (event.target.className === "item-text") {
//     console.log(event);
//     console.log(event.target.textContent);

//     // console.log(dataArray[event.target.parentElement.id].value);

//     let reducting = document.createElement("input");

//     event.target.addEventListener("onclick", (event) => {
        
//       event.target.parentElement.appendChild(reducting);
//     //   event.target.parentElement.removeChild(event.target);

//     //   reducting.addEventListener('onchange', (event) => {
//     //     reducting.value = event.target.value; 
//     //     dataArray[event.target.id].value = event.target.value; 
//     //   })
//     });
//     // event.target.removeChild(reducting);

//     event.target.parentElement.removeChild(reducting);
//     // event.target.parentElement.appendChild(event.target);

//     showElements(dataArray);
//   }
// }
// function changeValue(index){
//     console.log(index);
// }

// list.addEventListener("click", (event) => {
//   console.log(event.target.className);
//   onHandleEvent(event);
//   event.target.className === "item-text"? changeText(event) : null;
// });




list.addEventListener("dbclick", (event) => {
    console.log(event.target.className);
    changeText(event);
});

function changeText(event) {
    console.log(event);
    console.log(event.target.textContent);

    // console.log(dataArray[event.target.parentElement.id].value);

    let reducting = document.createElement("input");
        
    event.target.parentElement.appendChild(reducting);
    reducting.classList.add('visible');
    event.target.classList.add('hidden');


    //   event.target.parentElement.removeChild(event.target);

    //   reducting.addEventListener('onchange', (event) => {
    //     reducting.value = event.target.value; 
    //     dataArray[event.target.id].value = event.target.value; 
    //   })
    // event.target.removeChild(reducting);

    reducting.classList.remove('visible');
    event.target.classList.add('visible');

    // event.target.parentElement.appendChild(event.target);

    showElements(dataArray);
}