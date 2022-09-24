const inputText = document.querySelector("#input-el");

const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn");
const deleteBtn = document.querySelector("#delete-btn");

const unList = document.querySelector("#un-list");

let costumers = [];

start(costumers, "costumers");

inputBtn.addEventListener("click", function saveInput() {
  if (inputText.value != "") {
    costumers.push(inputText.value);
    render(costumers, "costumers");
  }
});

// This Feature only works in Google Chrome

tabBtn.addEventListener("click", function saveab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    costumers.push(tabs[0].url);
  });

  render(costumers, "costumers");
});

deleteBtn.addEventListener("click", function deleteInput() {
  deleteAll(costumers);
  render(costumers, "costumers");
});

function render(array, name) {
  unList.innerHTML = "";
  inputText.value = "";

  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.setAttribute("href", array[i]);
    anchor.setAttribute("target", "_blank");
    anchor.textContent = array[i];

    li.append(anchor);
    unList.append(li);

    array = JSON.stringify(array);
    localStorage.setItem(name, array);
    array = JSON.parse(array);
  }
}

function deleteAll(array) {
  array = [];
  localStorage.clear();
}

function start(array, name) {
  if (localStorage.getItem("costumers")) {
    array = localStorage.getItem(name);
    array = JSON.parse(array);
    render(array, name);
  }
}
