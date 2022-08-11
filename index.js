// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

var arr1 = [1, 2, 3, 4],
  arr2 = [2, 4],
  res = arr1.filter((item) => console.log(item), !arr2.includes(item));
console.log(res);
