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

btnApply.onclick = function () {
  const modalInputValue = document.getElementById("modalInput").value;
  console.log(modalInputValue);

  modal.style.display = "none";
  document.getElementById("modalInput").value = "";
};
