// let tableContent = document.getElementsByClassName("table");
let row = document.getElementById("row");

let pagination = document.querySelector(".pagination");

const rowsperPage = 6;
let totalPages;
let currentPage = 1;
let lastpage, pagelink, pageLi;
let index = 1;
async function fetchURL() {
  let res = await fetch("https://api.openaq.org/v2/latest");
  const res1 = await res.json();
  console.log(res1);
  totalPages = res1.results.length / rowsperPage;

  for (let i = 1; i <= totalPages; i++) {
    const lio = document.createElement("li");
    lio.classList.add("page-item", "dynamic");
    const ao = document.createElement("a");
    ao.className = "page-link";
    ao.href = "#";
    ao.innerHTML = i;
    ao.setAttribute("data-page", i);
    lio.appendChild(ao);
    lio.className = "mb-5";
    pagination.insertBefore(lio, pagination.querySelector(".next"));
  }
  init(res1);
  pagelink = pagination.querySelectorAll("a");
  lastpage = pagelink.length - 2;
  pageLi = pagination.querySelectorAll("li");
  pageLi[1].classList.add("active");

  pageRunner(pagelink, 6, lastpage, pageLi, res1);
}
fetchURL();
async function init(res1) {
  index = 1;
  for (let i = 0; i < 6; i++) {
    row.innerHTML += `<div class="col-md-4">
    <div class="card" style="width: 18rem; box-shadow:0 2px 8px #000; margin:20px 20px; padding:15px;">

  <div class="card-body">
  <h3 class="card-title">Country :   ${res1.results[i].country}</h3>
  <h6 class="card-title"><b>Location : </b>  ${res1.results[i].location}</h6>
  <p class="card-text"><b>${res1.results[i].measurements[0].parameter}</b> : ${res1.results[i].measurements[0].value} ${res1.results[i].measurements[0].unit}</p>
    <p class="card-text"><b>${res1.results[i].measurements[1].parameter}</b> : ${res1.results[i].measurements[1].value} ${res1.results[i].measurements[1].unit}</p>
    <p class="card-text"><b>${res1.results[i].measurements[2].parameter}</b> : ${res1.results[i].measurements[2].value} ${res1.results[i].measurements[2].unit}</p>
    <p class="card-text"><b>${res1.results[i].measurements[3].parameter}</b> : ${res1.results[i].measurements[3].value} ${res1.results[i].measurements[3].unit}</p>
  </div>
</div></div>`;
  }
}

function pageRunner(page, items, lastPage, active, res1) {
  for (let button of page) {
    button.onclick = (e) => {
      const page_num = e.target.getAttribute("data-page");
      const page_mover = e.target.getAttribute("id");
      if (page_num != null) {
        index = page_num;
      } else {
        if (page_mover === "next") {
          index++;
          if (index >= lastPage) index = lastPage;
        } else {
          index--;
          if (index <= 1) index = 1;
        }
      }
      row.innerHTML = "";
      pageMaker(index, items, active, res1);
    };
  }
}
function pageMaker(index, items, activePage, res1, lios) {
  activePage.forEach((n) => n.classList.remove("active"));
  activePage[index].classList.add("active");

  if (index > 1) {
    activePage[0].classList.remove("disabled");
    activePage[0].style.cursor = "pointer";
  }
  if (index === 1) activePage[0].classList.add("disabled");
  if (index === lastpage)
    activePage[activePage.length - 1].classList.add("disabled");
  if (index < lastpage)
    activePage[activePage.length - 1].classList.remove("disabled");
  const start = items * index;
  const end = start + items;

  const currentPageDisplay = res1.results.slice(start - items, end - items);
  for (let i = 0; i < currentPageDisplay.length; i++) {
    let item = currentPageDisplay[i];
    console.log(item);
    console.log(item);
    row.innerHTML += `<div class="col-md-4">
    <div class="card" style="width: 18rem; box-shadow:0 2px 8px #000; margin:20px 20px; padding:15px;">

  <div class="card-body">
  <h3 class="card-title">Country :   ${item.country}</h3>
  <h6 class="card-title"><b>Location : </b>  ${item.location}</h6>
  <p class="card-text"><b>${item.measurements[0].parameter}</b> : ${item.measurements[0].value} ${item.measurements[0].unit}</p>
    <p class="card-text"><b>${item.measurements[1].parameter}</b> : ${item.measurements[1].value} ${item.measurements[1].unit}</p>
    <p class="card-text"><b>${item.measurements[2].parameter}</b> : ${item.measurements[2].value} ${item.measurements[2].unit}</p>
    <p class="card-text"><b>${item.measurements[3].parameter}</b> : ${item.measurements[3].value} ${item.measurements[3].unit}</p>
  </div>
</div></div>`;
  }
}
