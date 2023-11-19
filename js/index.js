const modal = document.querySelector(".modal");
const btnAdd = document.getElementById("btn_add");
const btnClose = document.getElementById("btn_close");
const btnSecondary = document.getElementById("btn_secondary");
const modalInput = document.getElementById("modalInput"); //del
const btnApply = document.getElementById("btnApply"); //del

if (localStorage.todo) {
  let localStorageItems = JSON.parse(localStorage.todo);
  const list = document.getElementById("list");

  for (let i = 0; i < localStorageItems.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      `<li id='${localStorageItems[i].id}'  class="note">
    <input type="checkbox" class="checkbox_note" />
    <h2 class="text_note">${localStorageItems[i].text}</h2>
    <span class="btns-note">
      <button class="btn_change"></button>
      <button class="btn_deleted" onclick="onDelete('${localStorageItems[i].id}')" ></button>
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
};

btnApply.onclick = function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const newId = getRandomInt(10000);
  const modalInputValue = modalInput.value;
  const list = document.getElementById("list");

  list.insertAdjacentHTML(
    "beforeend",
    `<li id='${newId}' class="note">
  <input type="checkbox" class="checkbox_note" />
  <h2 class="text_note">${modalInputValue}</h2>
  <span class="btns-note">
    <button class="btn_change"></button>
    <button class="btn_deleted" onclick="onDelete('${newId}')"></button>
  </span>
</li>`
  );

  modal.style.display = "none";
  modalInput.value = "";

  let localStorageItems = [];
  if (localStorageItems?.length) {
    localStorageItems.push({ id: newId, text: modalInputValue });
    localStorage.todo = JSON.stringify(localStorageItems);
  } else {
    localStorage.todo = JSON.stringify([{ id: newId, text: modalInputValue }]);
  }
};

btnAdd.addEventListener("click", openInput);

function openInput() {
  modalInput.focus();
}
