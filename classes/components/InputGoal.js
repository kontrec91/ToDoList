import { ToDoList } from "./ToDoList.js";

import store from "./Store.js";

export class InputGoal {
  inputGoal = null;
  allComplete = null;
  list = null;

  constructor() {
    this.inputGoal = document.querySelector(".input-goal");
    this.allComplete = document.querySelector("i");

    this.list = new ToDoList(this.allComplete);

    this.inputGoal.addEventListener("keypress", (event) => {
      this.addData(store, event);
      this.list.render();
    });

    this.allComplete.addEventListener("click", (event) => {
        this.checkAll(store);
        this.list.render();
      // }
    });
  }

  addData(store, event) {
    if (event.keyCode === 13 && event.target.value.trim() !== "") {
      store.setArray([
        ...store.getData(),
        {
          isChecked: false,
          value: event.target.value,
          id: Date.now(),
        },
      ]);
      event.target.value = "";
    }
  }

  checkAll(store, event) {
    if (store.isAllCompleted) {
      store.setArray(
        store.getData().map((item) => {
          return { ...item, isChecked: false };
        })
      );
      this.allComplete.classList.remove("checked");
    } else {
      store.setArray(
        store.getData().map((item) => {
          return { ...item, isChecked: true };
        })
      );
      this.allComplete.classList.add("checked");
    }
  }
}