const getListFromStorage = () => {
  if (localStorage.toDoList) {
    return JSON.parse(localStorage.toDoList);
  }
  return [];
};

const setListToStorage = (newArr) => {
  localStorage.toDoList = JSON.stringify(newArr);
};
