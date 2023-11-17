const modal = document.querySelector(".modal");
const btnAdd = document.getElementById("btn_add");
const btnClose = document.getElementById("btn_close");
const btnSecondary = document.getElementById("btn_secondary");
const btnApply = document.getElementById("btnApply");

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
  const list_item = document.getElementById(id);
  list_item.remove();
};

btnApply.onclick = function () {
  /* function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const newId = getRandomInt(10000); */

  const modalInputValue = document.getElementById("modalInput").value;
  const list = document.getElementById("list");

  list.insertAdjacentHTML(
    "beforeend",
    `<li id=list_item class="note">
    <input type="checkbox" class="checkbox_note" />
    <h2 class="text_note">${modalInputValue}</h2>
    <span class="btns-note">
      <button class="btn_change"></button>
      <button class="btn_deleted" onclick="onDelete('list_item')"></button>
    </span>
  </li> `
  );

  modal.style.display = "none";
  document.getElementById("modalInput").value = "";
};
