const paginationList = document.getElementById("pagination_list");

//                                 PAGINATION

if (localValue.length) {
  //                                 ВЫВОД PAGINATION ИЗ TODO В LOCAL STORAGE
  for (let i = 0; i < localValue.length / pagination; i++) {
    paginationList.insertAdjacentHTML(
      "beforeend",
      `<li id="${i}-page" class="page-item ${
        i === 0 ? "active" : ""
      }" aria-current="page" onclick = "onPaginationChange(${i})">
    <span class="page-link">${i + 1}</span>
  </li>`
    );
  }

  function onPaginationChange(id) {
    let page = id;
    if (id > 0) {
      page = id * pagination;
    }
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    for (let i = page; i < page + pagination; i++) {
      addChildToList(
        localValue[i].id,
        localValue[i].value,
        localValue[i].checked
      );
    }
  }
}
