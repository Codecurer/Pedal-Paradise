var tableBody = document.getElementById("bikeTable");
var pageFirst = document.getElementById("pgF");
let pageSecond = document.getElementById("pgS");

const length = 0;

var tableStr = "";

let riderFiler;
let API = "http://192.168.29.130:3000/user/getPageUsers";

filterRiders = async () => {
  document.getElementById("pagination").style.display = "none";
  const riderFilterInput = document.getElementById("riderMobNumber").value;
  tableBody.innerHTML = '';
  const APIss = "http://192.168.29.130:3000/admin/findUserByName";

  let fet = await fetch(APIss, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: localStorage.getItem("authToken"),
    },
    body: JSON.stringify({ name: riderFilterInput }),
  });
  let responseObj = await fet.json();

  tableBody.innerHTML = `<tr>
    <td class="fw-bold text-primary">#1</td>
    <td scope="row"><img class="im" style="transition: .5s ease;" src="./assets/img/KTM_DUKE_200_ABS.png"></td>
    <td class="fw-bold">${responseObj.fullName}</td>
    <td class="fw-bold">${responseObj.mobileNumber}</td>
    <td class="fw-bold">${responseObj.licenceNumber}</td>
    <td class="fw-bold" style="text-transform: uppercase;">${
      responseObj.noOfBookings
    }</td>
    <td class="fw-bold text-primary">${responseObj.revenueOnUser}</td>
    <td>
    <h3><label onclick="isStatusUpdate('${responseObj._id}')">${
    responseObj.status
      ? '<i class="bi bi-unlock text-success"></i>'
      : '<i class="bi bi-lock text-danger"></i>'
  }</label></h3>
    </td>
    </tr>`;
};

const ALLAPI = "http://192.168.29.130:3000/user/users";
var pageLength = 0;
let limit = 2;

async function responses(ALLAPIs) {
  const fet = await fetch(ALLAPIs, {
    method: "GET",
    headers: { Authentication: localStorage.getItem("authToken") },
  });

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
  document.getElementById("pageLength").value = Math.ceil(
    responseObj.length / limit
  );
}
responses(ALLAPI);

let fetchData = async (url) => {
  tableBody.innerHTML = `<tr><td colspan="8">
    <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
    <lord-icon
        src="https://cdn.lordicon.com/eqfafivu.json"
        trigger="loop"
        style="width:250px;height:250px">
    </lord-icon>
    </td></tr>`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authentication: localStorage.getItem("authToken") },
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const obj = await response.json();
    return obj;
  } catch (error) {
    console.log(error);
  }
};
async function dataResult(pgNumber) {
  try {
    const obj = await fetchData(API + `/${pgNumber}`);

    tableStr = "";

    obj.forEach((data, index) => {
      tableStr += `<tr>
            <td class="fw-bold text-primary">#${index + 1}</td>
            <td scope="row"><img class="im" style="transition: .5s ease;" src="./assets/img/KTM_DUKE_200_ABS.png"></td>
            <td class="fw-bold">${data.fullName}</td>
            <td class="fw-bold">${data.mobileNumber}</td>
            <td class="fw-bold">${data.licenceNumber}</td>
            <td class="fw-bold" style="text-transform: uppercase;">${
              data.noOfBookings
            }</td>
            <td class="fw-bold text-primary">${data.revenueOnUser}</td>
            <td>
            <h3><label onclick="isStatusUpdate('${data._id}')">${
        data.status
          ? '<i class="bi bi-unlock text-success"></i>'
          : '<i class="bi bi-lock text-danger"></i>'
      }</label></h3>
            </td>
            </tr>
            `;
    });
    tableBody.innerHTML = tableStr;
  } catch (error) {
    tableBody.innerHTML =
      "<tr><td colspan='8'><b class='card-title'>Oops! Sorry Data not found!</b></td></tr>";
    console.log(error);
  }
}

var global = 1;

nextPage = () => {
  global++;
  return global;
};
prevPage = () => {
  global--;
  return global;
};

let nextButton = document.getElementById("nextPage");

nextButton.addEventListener("click", () => {
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

prevButton.addEventListener("click", () => {
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
let dataStatus = "";
isStatusUpdate = async (id) => {
  let response = await fetch(
    "http://192.168.29.130:3000/admin/changeUserStatus/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ id: id }),
    }
  ).then(function (response) {
    console.log(response);
    // window.location.href = "http://127.0.0.1:5500/Admin/enrollment-list.html";
  });
};
