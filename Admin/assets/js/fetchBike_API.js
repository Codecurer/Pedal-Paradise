var tableBody = document.getElementById("bikeTable");
var pageFirst = document.getElementById("pgF");
let pageSecond = document.getElementById("pgS");
const length = 0;

var tableStr = "";

const API = "http://192.168.29.130:3000/admin/getPageBikes";
const ALLBIKEAPI = "http://192.168.29.130:3000/admin/bike";
var pageLength = 0;
let limit = 2;
async function responses(ALLBIKEAPIs) {
  let fet = await fetch(ALLBIKEAPIs);
  let responseObj = await fet.json();
  pageLength = Math.ceil(responseObj.length / limit);
  if (pageLength <= 0) {
    document.getElementById("dltButton").style.display = "none";
  }
  if (pageLength < limit) {
    document.getElementById("pagination").style.display = "none";
  } else {
    document.getElementById("pagination").style.display = "inline";

  }
  document.getElementById("pageLength").value = Math.ceil(responseObj.length / limit);
}
responses(ALLBIKEAPI)


let fetchData = async (url) => {

  tableBody.innerHTML = `<tr><td colspan="8">
  <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
  <lord-icon
    src="https://cdn.lordicon.com/eqfafivu.json"
    trigger="loop"
    style="width:250px;height:250px">
    </lord-icon></td></tr>`;

  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authentication: 'Bearer ' },
    });
    // const response = await fetch(url, { signal });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const obj = await response.json();
    return obj;

  } catch (error) {
    console.log(error);
  }
}
async function dataResult(pgNumber) {

  try {

    const obj = await fetchData(API + `/${pgNumber}`);


    tableStr = "";

    // console.log(obj);
    obj.sort().forEach((data, index) => {

      const d = new Date(data.bPurchaseDate);
      const date = d.getDate() + " - " + d.toLocaleString('default', { month: 'short' }) + " - " + d.getFullYear();

      tableStr += `<tr>
      <th scope="row"><a onclick="modalImage('')" data-bs-toggle="modal"
      data-bs-target="#verticalycentered"><img class="im" style="transition: .5s ease;" src="./assets/img/KTM_DUKE_200_ABS.png"></a></th>
      <td class="fw-bold">${data.name}</td>
      <td class="fw-bold">${date}</td>
      <td class="fw-bold text-primary" style="text-transform: uppercase;">${data.bikenumber}</td>
      <td class="fw-bold">${data.chargeperday} / Day</td>
      <td>${data.bRentStatus}</td>
      <td><i class="bi bi-currency-rupee"></i>${data.revenueOnBike}</td>
      <td>
      <div class="form-check form-switch text-success" style="margin-left:25px;">
    ${data.status ? `<input onchange="isStatusUpdate('${data._id}','${data.status}')" style="width:35px;" class="form-check-input" type="checkbox" id="bikeStatus" checked>` : `<input onchange="isStatusUpdate('${data._id}','${data.status}')" style="width:35px;" class="form-check-input" type="checkbox" id="bikeStatus">`}
    </div>
    </td>
    </tr>`;

    })
    tableBody.innerHTML = tableStr;

  } catch (error) {
    tableBody.innerHTML = "<tr><td colspan='8'><b class='card-title'>Oops! Sorry Data not found!</b></td></tr>";
    console.log(error);
  }
}

var global = 1;

nextPage = () => { global++; return global; }; prevPage = () => { global--; return global; };

let nextButton = document.getElementById("nextPage");

nextButton.addEventListener('click', () => {
  if (global >= pageLength) {
    nextButton.disabled = true;
  } else {

    dataResult(nextPage());
    pageSecond.value = global;
    document.getElementById("pgS").classList.add("active");
    document.getElementById("pgF").classList.remove("active");
    pageFirst.value = global - 1;
  }
});


let prevButton = document.getElementById("previousPage");

prevButton.addEventListener('click', () => {
  if (global <= 1) {
    prevButton.disabled = true;
  } else {
    dataResult(Number.parseInt(prevPage()));
    pageFirst.value = global;
    document.getElementById("pgS").classList.remove("active");
    document.getElementById("pgF").classList.add("active");
    pageSecond.value = global + 1;
  }
});


window.addEventListener("load", dataResult(1));

document.getElementById("pgF").classList.add("active");

function num(e) {
  if (pageFirst.value == e) {
    global = e;
    dataResult(global);
    document.getElementById("pgS").classList.remove("active");
    document.getElementById("pgF").classList.add("active");
  } else {
    global = e;
    dataResult(global);
    document.getElementById("pgS").classList.add("active");
    document.getElementById("pgF").classList.remove("active");
  }
}

isStatusUpdate = async (id) => {

  let response = await fetch('http://192.168.29.130:3000/admin/changeStatus/', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', Authentication: localStorage.getItem("authToken") },
    body: JSON.stringify({ id: id }),
  }).then(function (response) {
    console.log(response);
  })
}

modalImage = () => {
  document.getElementById('imageAppend').innerHTML = '<img class="img-fluid" src="./assets/img/KTM_DUKE_200_ABS.png" alt="">';
}