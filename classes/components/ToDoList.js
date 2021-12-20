import { ItemToDo } from "./ItemToDo.js";

import store from "./Store.js";

export class ToDoList {
  list = null;
  footer = null;
  clearComleted = null;
  allComplete = null;

  constructor(allComplete) {
    this.allComplete = allComplete;
    this.list = document.querySelector("ul");
    this.footer = document.querySelector(".footer");
    this.clearComleted = document.querySelector(".clear-completed-button");

    this.footer.addEventListener("click", (event) => {
      this.selecterFilter(event);
    });

    this.clearComleted.addEventListener("click", (event) => {
      this.clearAllComleted();
      this.render();
    });
  }

  render() {
    this.list.innerHTML = "";
    store.filteredArray().forEach((element) => {
      const itemList = new ItemToDo(this.render.bind(this));

      if (element.isChecked == true) {
        itemList.inputCheckbox.setAttribute("checked", "true");
        itemList.spanText.setAttribute("class", "list-item-label-done");
        itemList.li.classList.add("list-item-li-done");
      }

      itemList.labelForCheckbox.htmlFor = element.id;

      itemList.li.setAttribute("id", element.id);

      itemList.spanText.innerText = element.value;
      itemList.spanText.classList.add("text-li");

      itemList.li.appendChild(itemList.labelForCheckbox);
      itemList.li.appendChild(itemList.spanText);
      itemList.li.insertAdjacentElement("afterbegin", itemList.inputCheckbox);
      itemList.li.insertAdjacentElement("beforeend", itemList.spanDelete);

      this.list.appendChild(itemList.li);

    });

    store.showCountItems();

    if (store.dataArray.length) {
      this.footer.classList.remove("hidden");
      this.allComplete.classList.remove("hidden");
    } else {
      this.footer.classList.add("hidden");
      this.allComplete.classList.add("hidden");
    }
  }

  selecterFilter(event) {
    store.filter = event.target.className;
    if (event.target.className !== "footer" && event.target.className !=="number-items-left") {
      let children = Array.from(this.footer.children);
      children.forEach((item) => {
        item.classList.remove("active");
      });
      this.render();
      event.target.classList.add("active");
    }
  }

  clearAllComleted(){
    store.setArray(store.getData().filter((item) => item.isChecked === false));
  }
}
