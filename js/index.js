const modal = document.querySelector(".modal");
const btnAdd = document.getElementById("btn_add");
const btnClose = document.getElementById("btn_close");
const btnCancel = document.getElementById("btn_secondary");
const modalInput = document.getElementById("modalInput");
const btnApply = document.getElementById("btnApply");
const list = document.getElementById("list");
const inputSearch = document.getElementById("input_search");
const backgroundList = document.querySelector(".background-list");
const dropDown = document.getElementById("dropdown");
dayjs.locale("ru"); // use locale globally

let localValue = getListFromStorage();

const addChildToList = (id, text, checked, now) => {
  list.insertAdjacentHTML(
    "beforeend",
    `<li id=${id} class="note">
  <input ${
    checked ? "checked" : ""
  } onclick = "doneNote(${id})" id="${id}-checkbox" type="checkbox" class="checkbox_note" />
  <h2 data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="left" data-bs-title="${now}" id="${id}-text" class="text_note ${
      checked ? "text_checked" : ""
    }">${text} </h2>
  <span class="btns-note">
    <button onclick = "onBtnChange(${id})" class="btn_change"></button>
    <button class="btn_deleted" onclick = "onDelete(${id})"></button>
    <button  id="${id}-time" class="time_btn"></button>
  </span>
</li>`
  );

  $(`#${id}-time`)
    .datepicker({
      autoclose: true,
    })
    .on("changeDate", function (e) {
      const myData = $(`#${id}-time`).datepicker("getFormattedDate");

      document
        .getElementById(`${id}-text`)
        .setAttribute("data-bs-title", myData);

      resetTooltip();

      setListToStorage(
        localValue.map((item) => {
          if (item.id === id) {
            item.now = myData;
          }
          return item;
        })
      );
      //новый массив записать в локал setListToStorage
    });
};

//                                 ВЫВОД С TODO ИЗ LOCAL STORAGE

if (localValue.length) {
  for (let i = 0; i < (localValue.length === 1 ? 1 : pagination); i++) {
    addChildToList(
      localValue[i].id,
      localValue[i].value,
      localValue[i].checked,
      localValue[i].now
    );
  }
}
resetTooltip();

//                                 ВЫВОД КАРТИНКИ, ЕСЛИ НЕТ TODO
if (localValue.length) {
  backgroundList.style.display = "none";
} else {
  backgroundList.style.display = "flex";
}

//                                 ЗАКРЫТИЕ МОДАЛКИ
btnClose.onclick = function () {
  modal.style.display = "none";
};

btnCancel.onclick = function () {
  modal.style.display = "none";
};

//                                 ОТКРЫТИЕ МОДАЛКИ
btnAdd.addEventListener("click", openInput);

function openInput() {
  modal.style.display = "block";
  modalInput.focus();
}

//                                 CHECKBOX
const doneNote = function (id) {
  const checkboxNote = document.getElementById(id + "-checkbox");
  const localToDo = getListFromStorage().map((toDo) => {
    if (toDo.id === id) {
      toDo.checked = !toDo.checked;
    }
    return toDo;
  });
  setListToStorage(localToDo);
  const noteId = document.getElementById(id + "-text");
  if (checkboxNote.checked) {
    noteId.classList.add("text_checked");
  } else {
    noteId.classList.remove("text_checked");
  }
};

const onDelete = function (id) {
  const itemRemove = document.getElementById(id);
  itemRemove.remove();
  const newArr = getListFromStorage().filter((localObj) => {
    return localObj.id !== Number(id);
  });

  setListToStorage(newArr);

  // если список пуст добавить флекс к диву
  if (list.children.length === 1) {
    backgroundList.style.display = "flex";
  }
};

//                                 ДОБАВЛЕНИЕ TODO
btnApply.onclick = function () {
  const modalInputValue = modalInput.value;
  const newId = getRandomInt(10000);
  addChildToList(newId, modalInputValue);

  modal.style.display = "none";
  modalInput.value = "";

  if (localStorage.toDoList) {
    let toDo = getListFromStorage();
    toDo.push({ id: newId, value: modalInputValue, checked: false });
    setListToStorage(toDo);
  } else {
    setListToStorage([{ id: newId, value: modalInputValue, checked: false }]);
  }
  //добавил фоновое изображение, если список дел пуст, то добавляется другая фоновое изображение.
  if (list.children.length > 0) {
    backgroundList.style.display = "none";
  }
};

//                                 ФИЛЬТР TODO
inputSearch.addEventListener("input", function (e) {
  const inputSearchValue = e.target.value;
  const filterList = getListFromStorage().filter((toDoListItem) => {
    return toDoListItem.value.includes(inputSearchValue);
  });
  //удалить детей листа
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  if (filterList.length) {
    filterList.forEach((element) => {
      addChildToList(element.id, element.value);
    });
  } else {
    if (localStorage.toDoList && inputSearchValue.length === 0) {
      let localStorageItems = getListFromStorage();
      localStorageItems.forEach((element) => {
        addChildToList(element.id, element.value);
      });
    }
  }
});

//                                 РЕДАКТИРОВАНИЕ TODO
let inputOpen = false; // следим за нажатием
function onBtnChange(id) {
  if (inputOpen === false) {
    //проверка было ли нажатие
    const textValue = document.getElementById(id + "-text");
    const input = document.createElement("input");
    const listItem = document.getElementById(id);

    input.className = "input_change";
    input.placeholder = textValue.textContent;

    listItem.replaceChild(input, textValue); //меняем текст на input
    input.focus();

    inputOpen = true; //запретили повторное нажатие

    input.addEventListener("keydown", (e) => {
      //отслеживаем нажатие
      if (e.key === "Enter") {
        inputOpen = false; //разрешили нажатие
        // если  Enter
        textValue.textContent = e.target.value;
        listItem.replaceChild(textValue, input); //меняем input на текст
        //1 записываем в переменную лк
        let localItems = getListFromStorage();
        //2 находим в нем объект по id

        localItems.forEach((localItem) => {
          if (localItem.id === id) {
            localItem.value = e.target.value;
          }
        });

        //3 меняем в нем текст на новый
        setListToStorage(localItems);
        //4 записываем в лк новый массив
      }
    });
  }
}

//                                 ФИЛЬТР ЧЕКНУТЫХ TODO
dropDown.addEventListener("change", function (e) {
  let toDoList = getListFromStorage();
  switch (e.target.value) {
    case "Complete":
      toDoList = toDoList.filter((toDo) => toDo.checked);
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      toDoList.forEach((element) => {
        addChildToList(element.id, element.value, element.checked);
      });
      break;
    case "Incomplete":
      toDoList = toDoList.filter((toDo) => !toDo.checked);
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      toDoList.forEach((element) => {
        addChildToList(element.id, element.value, element.checked);
      });
      break;
    default:
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      toDoList.forEach((element) => {
        addChildToList(element.id, element.value, element.checked);
      });
      break;
  }
});
