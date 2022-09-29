const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btn = document.querySelector("#btnDeleteAll");
const list = document.querySelector("#task-list");
let items;
//load items
loadItems();

// call event listeners (kayıt ettiğimiz bütün listenersları bu method ile çağırıyoruz)
eventListeners();

function eventListeners() {
  //submit event
  form.addEventListener("submit", addNewItem);

  //delete an item (girilen li yi yanındaki x işaretine basarak silme özelliği katıyoruz)
  list.addEventListener("click", deleteItem);

  //delete all item (girilen bütün li leri Delete All bytonu ile gilme)
  btn.addEventListener("click", deleteAll);
}

function loadItems() {
  items = getItemsFormLS();

  items.forEach(function (item) {
    creatItem(item);
  });
}
// get items from Local Storage
function getItemsFormLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//set items local storage
function setItemToLS(text) {
  items = getItemsFormLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}
//delete item from LS
function deleteItemFormLS(text) {
  items = getItemsFormLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
function creatItem(text) {
  //creat li (Li' yi oluşturduk)
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  //   console.log(li);
  li.appendChild(document.createTextNode(text));

  //creat a (a' yı oluşturduk)
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  //   console.log(a);
  a.setAttribute("herf", "#");
  a.innerHTML = '<i class="fas fa-times"> </i>';

  //add a to li (li ve a'yı ilişkilendirdik ekledik)
  li.appendChild(a);
  //   console.log(li);

  //add li to ul (ul ve li'yi ilişkilendirdik ekledik)
  list.appendChild(li);
}

//add new item (eleman ekleme işlemlerini burada gerçekleştirdik)
function addNewItem(e) {
  e.preventDefault();
  //   console.log("submit");
  console.log(input.value);

  if (input.value === "") {
    alert("Add new item..!");
  }

  //save to LS
  setItemToLS(input.value);
  //creatItem
  creatItem(input.value);

  //clear input (input kısmını yeni değer için temizledik)
  input.value = "";
}

//delete an item

function deleteItem(event) {
  //   console.log(event.target);

  if (event.target.className === "fas fa-times") {
    if (confirm("Are you sure ?")) {
      // console.log(event.target);
      event.target.parentElement.parentElement.remove();

      //delete item from LS
      deleteItemFormLS(event.target.parentElement.parentElement.textContent);
    }
  }

  event.preventDefault();
}

//delete all items
function deleteAll(event) {
  //   console.log(event.target);

  if (confirm("are you sure ?")) {
    // taskList.innerHTML='';
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    localStorage.clear();
  }
  event.preventDefault();
}
