import store from "./Store.js";

export class ItemToDo {
  li = null;
  spanDelete = null;
  spanText = null;
  labelForCheckbox = null;
  inputCheckbox = null;
  inputEdit = null;

  constructor(render) {
    this.inputEdit = document.createElement("input");
    this.inputEdit.classList.add("set-value-li");

    this.spanDelete = document.createElement("span");
    this.spanDelete.innerText = "×";
    this.spanDelete.classList.add("delete");

    this.spanText = document.createElement("span");
    this.spanText.classList.add("text-li");

    this.inputCheckbox = document.createElement("input");
    this.inputCheckbox.type = "checkbox";
    this.inputCheckbox.classList.add("item-checkbox");

    this.labelForCheckbox = document.createElement("label");
    this.labelForCheckbox.classList.add("check");

    this.li = document.createElement("li");
    this.li.classList.add("item-text");

    // don`t like it
    this.labelForCheckbox.addEventListener("click", (event) => {
      if (event.target.className === "check") {
        this.checkbox();
        render();
      }
    });

    this.spanText.addEventListener("dblclick", (event) => {
      this.dblclick(event);
    });

    this.inputEdit.addEventListener("input", () => {
      this.edit();
    });

    this.inputEdit.addEventListener("focusout", () => {
      this.focusOut(render);
    });

    this.spanDelete.addEventListener("click", (event) => {
      this.deleteItem(render);
    });
  }

  checkbox() {
    store.setArray(
      store.getData().map((item) =>
        item.id.toString() === this.labelForCheckbox.parentElement.id
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );
  }

  dblclick(event) {
    this.inputEdit.value = event.target.textContent;
    let parent = event.target.parentElement;
    parent.innerHTML = "";
    parent.classList.remove("list-item-li-done");
    parent.classList.add("list-item");
    parent.appendChild(this.inputEdit);
    this.inputEdit.focus();
  }

  edit() {
    store.getData().forEach((item) => {
      if (
        item.id.toString() === this.inputEdit.parentElement.id &&
        item.value.trim() !== ""
      ) {
        item.value = this.inputEdit.value;
      }
    });
  }

  focusOut(showElements) {
    showElements();
  }

  deleteItem(render) {
      const arr = store.getData().filter(
        (item) => item.id.toString() !== this.spanDelete.parentElement.id
      );
      store.setArray(arr);
      render();
  }
}
