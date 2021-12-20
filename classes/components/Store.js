class StoreClass {
  dataArray = null;
  filter = null;
  isAllCompleted = null;
  countItems = null;

  constructor() {
    this.dataArray = [];
    this.filter = "All";
    this.countItems = document.querySelector(".number-items-left");
  }

  getData() {
    return this.dataArray;
  }

  getFilter() {
    return this.filter;
  }

  setFilter(value) {
    this.filter = value;
  }

  setArray(array) {
    this.dataArray = array;
    this.isAllCompleted = !array.find((item) => !item.isChecked);
  }

  filteredArray() {
    const filteredArray = () => {
      switch (this.filter) {
        case "active-button":
          return this.dataArray.filter((item) => item.isChecked === false);
        case "completed-button":
          return this.dataArray.filter((item) => item.isChecked === true);
        default:
          return this.dataArray;
      }
    };
    return filteredArray();
  }

  showCountItems() {
    let arr = this.dataArray.filter((item) => item.isChecked !== true);
    this.countItems.innerText = arr.length + " items left";
  }
}

const store = new StoreClass();

export default store;
