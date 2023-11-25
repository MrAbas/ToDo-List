const modal = document.querySelector(".modal");
const btnAdd = document.getElementById("btn_add");
const btnClose = document.getElementById("btn_close");
const btnSecondary = document.getElementById("btn_secondary");
const modalInput = document.getElementById("modalInput");
const btnApply = document.getElementById("btnApply");
const list = document.getElementById("list");
const inputSearch = document.getElementById("input_search");

if (localStorage.toDoList) {
  let localStorageItems = JSON.parse(localStorage.toDoList);
  for (let i = 0; i < localStorageItems.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      `<li id=${localStorageItems[i].id} class="note">
    <input type="checkbox" class="checkbox_note" />
    <h2 class="text_note">${localStorageItems[i].value}</h2>
    <span class="btns-note">
      <button class="btn_change"></button>
      <button class="btn_deleted" onclick = "onDelete(${localStorageItems[i].id})"></button>
    </span>
  </li>`
    );
  }
}

btnAdd.onclick = function () {
  modal.style.display = "block";
};

btnClose.onclick = function () {
  modal.style.display = "none";
};

btnSecondary.onclick = function () {
  modal.style.display = "none";
};

const onDelete = (id) => {
  const itemRemove = document.getElementById(id);
  itemRemove.remove();
  const newItems = JSON.parse(localStorage.toDoList).filter((a) => {
    return a.id !== Number(id);
  });
  localStorage.toDoList = JSON.stringify(newItems);
};

btnApply.onclick = function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const newId = getRandomInt(10000);
  const modalInputValue = modalInput.value;

  list.insertAdjacentHTML(
    "beforeend",
    `<li id=${newId} class="note">
  <input type="checkbox" class="checkbox_note" />
  <h2 class="text_note">${modalInputValue}</h2>
  <span class="btns-note">
    <button class="btn_change"></button>
    <button class="btn_deleted" onclick = "onDelete(${newId})"></button>
  </span>
</li>`
  );

  modal.style.display = "none";
  modalInput.value = "";

  if (localStorage.toDoList) {
    let toDo = JSON.parse(localStorage.toDoList);
    toDo.push({ id: newId, value: modalInputValue });
    localStorage.toDoList = JSON.stringify(toDo);
  } else {
    localStorage.toDoList = JSON.stringify([
      { id: newId, value: modalInputValue },
    ]);
  }
};

btnAdd.addEventListener("click", openInput);

function openInput() {
  modalInput.focus();
}

inputSearch.addEventListener("input", function (e) {
  console.log(e);
  inputSearchValue = inputSearch.value;
  const toDoList = JSON.parse(localStorage.toDoList); //[{},{}]
  const filterList = toDoList.filter((toDoList) => {
    return toDoList === toDoList.value;
  });
  console.log(filterList);
});
