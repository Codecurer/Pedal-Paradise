const length = 0;

var tableStr = "";

const API = "http://192.168.29.130:3000/admin/getPageBikes";

let fetchData = async (url) => {

  tableBody.innerHTML = `<tr><td colspan="8">
  <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/eqfafivu.json"
    trigger="loop"
    style="width:250px;height:250px">
</lord-icon></td></tr>`;

  try {

    const response = await fetch(url);
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

    obj.forEach((data, index) => {

      const d = new Date(data.bPurchaseDate);
      const date = d.getDate() + " - " + d.toLocaleString('default', { month: 'short' }) + " - " + d.getFullYear();

      tableStr += `<tr>
    <th scope="row"><a href="#"><img src="../assets/img/KTM_DUKE_200_ABS.png"></a></th>
    <td class="fw-bold">${data.name}</td>
    <td class="fw-bold">${date}</td>
    <td class="fw-bold text-primary" style="text-transform: uppercase;">${data.bikenumber}</td>
    <td class="fw-bold">${data.chargeperday} / Day</td>
    <td>${data.bRentStatus}</td>
    <td><i class="bi bi-currency-rupee"></i>${data.chargeperday}</td>
    <td>
    <div  style="margin-left:25px;" class="form-check form-switch text-success">
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

isStatusUpdate = (id, status) => {
  $.ajax({
    type: 'POST',
    url: "http://192.168.29.130:3000/admin/changeStatus/",
    data: { id: id },
    success: function (resultData) { alert(resultData) }
  });
}



