const buttonTheme = document.getElementById("theme");

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

buttonTheme.onclick = () => {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark") {
    setTheme("light");
    localStorage.theme = "light";
  } else {
    setTheme("dark");
    localStorage.theme = "dark";
  }
};
// ставим тему из local Storage
setTheme(localStorage.theme);
