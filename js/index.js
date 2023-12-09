const modal = document.querySelector(".modal");
const btnAdd = document.getElementById("btn_add");
const btnClose = document.getElementById("btn_close");
const btnSecondary = document.getElementById("btn_secondary");
const modalInput = document.getElementById("modalInput");
const btnApply = document.getElementById("btnApply");
const list = document.getElementById("list");
const inputSearch = document.getElementById("input_search");
const backgroundList = document.querySelector(".background-list");

const getListFromStorage = () => {
  if (localStorage.toDoList) {
    return JSON.parse(localStorage.toDoList);
  }
  return [];
};

const setListToStorage = (newArr) => {
  localStorage.toDoList = JSON.stringify(newArr);
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const addChildToList = (id, text) => {
  list.insertAdjacentHTML(
    "beforeend",
    `<li id=${id} class="note">
  <input type="checkbox" class="checkbox_note" />
  <h2 id="${id}-text" class="text_note">${text}</h2>
  <span class="btns-note">
    <button onclick = "onBtnChange(${id}, ${text})" class="btn_change"></button>
    <button class="btn_deleted" onclick = "onDelete(${id})"></button>
  </span>
</li>`
  );
};

let localValue = getListFromStorage();
if (localValue.length) {
  let localStorageItems = getListFromStorage();

  /* for (let i = 0; i < localStorageItems.length; i++) {
    addChildToList(localStorageItems[i].id, localStorageItems[i].value);
  } */
  localStorageItems.forEach((e) => {
    addChildToList(e.id, e.value);
  });

  backgroundList.style.display = "none";
} else {
  backgroundList.style.display = "flex";
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

btnApply.onclick = function () {
  const modalInputValue = modalInput.value;
  const newId = getRandomInt(10000);
  addChildToList(newId, modalInputValue);

  modal.style.display = "none";
  modalInput.value = "";

  if (localStorage.toDoList) {
    let toDo = getListFromStorage();
    toDo.push({ id: newId, value: modalInputValue });
    setListToStorage(toDo);
  } else {
    setListToStorage([{ id: newId, value: modalInputValue }]);
  }
  //добавил фоновое изображение, если список дел пуст, то добавляется другая фоновое изображение.
  if (list.children.length > 0) {
    backgroundList.style.display = "none";
  }
};

btnAdd.addEventListener("click", openInput);

function openInput() {
  modalInput.focus();
}

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
    /* for (let i = 0; i < filterList.length; i++) {
      addChildToList(filterList[i].id, filterList[i].value);
    } */
    filterList.forEach((element) => {
      addChildToList(element.id, element.value);
    });
  } else {
    if (localStorage.toDoList && inputSearchValue.length === 0) {
      let localStorageItems = getListFromStorage();
      /* for (let i = 0; i < localStorageItems.length; i++) {
        addChildToList(localStorageItems[i].id, localStorageItems[i].value);
      } */
      localStorageItems.forEach((element) => {
        addChildToList(element.id, element.value);
      });
    }
  }
});

let inputOpen = false; // следим за нажатием

function onBtnChange(id, text) {
  if (inputOpen === false) {
    //проверка было ли нажатие
    const textValue = document.getElementById(id + "-text");
    const input = document.createElement("input");
    const listItem = document.getElementById(id);

    input.className = "input_change";
    input.placeholder = textValue.textContent;

    listItem.replaceChild(input, textValue); //меняем текст на input

    inputOpen = true; //запретили повторное нажатие

    input.addEventListener("keydown", (e) => {
      //отслеживаем нажатие
      if (e.key === "Enter") {
        openInput = false; //разрешили нажатие
        // если  Enter
        textValue.textContent = e.target.value;
        listItem.replaceChild(textValue, input); //меняем input на текст
        //1 записываем в переменную лк
        let localItems = getListFromStorage();
        //2 находим в нем объект по id
        /*        localItems = localItems.map((localItem) => {
          if (localItem.id === id) {
            localItem.value = e.target.value;
          }
          return localItem
        }); */

        input.focus();

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

// Fetch 1 способ
async function getResponse() {
  let response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );
  let content = await response.json();
  content = content.splice(0, 10);

  // for (let i = 0; i < content.length; i++) {
  //   console.log(content[i]);
  // }

  let key;
  for (key in content) {
    addChildToList(content[key].id, content[key].title);
  }
}

getResponse();

/* //2 cпособ

const getTodoFromPlaceHolder = async () => {
  let response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );

  if (response.ok) {
    let json = await response.json();
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}; */
