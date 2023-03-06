const API = "http://192.168.29.130:3000/admin/recentBooking";
const TOTALBOOKING_API = "http://192.168.29.130:3000/admin/getTotalBooking";
const TOTAL_REVENUE_API = "http://192.168.29.130:3000/admin/getTotalRevenue";
const TOTAL_USER = "http://192.168.29.130:3000/admin/getTotalUser";

let tableBody = document.getElementById("tableBody");
let tableStr = "";

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

    const totalBook = await fetch(TOTALBOOKING_API, {
      method: "GET",
      headers: { Authentication: localStorage.getItem("authToken") },
    })
      .then((res) => {
        return res.json();
      })
      .then((value) => {
        document.getElementById("numberOfBooking").innerHTML = value;
      });

    const totalRevenue = await fetch(TOTAL_REVENUE_API, {
      method: "GET",
      headers: { Authentication: localStorage.getItem("authToken") },
    })
      .then((res) => {
        return res.json();
      })
      .then((value) => {
        document.getElementById("totalRevenue").innerHTML = value;
      });

    const totalUser = await fetch(TOTAL_USER, {
      method: "GET",
      headers: { Authentication: localStorage.getItem("authToken") },
    })
      .then((res) => {
        return res.json();
      })
      .then((value) => {
        document.getElementById("totalNumberOfUser").innerHTML = value;
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
async function dataResult() {
  try {
    const obj = await fetchData(API);

    tableStr = "";

    obj.forEach((data, index) => {
      // console.log(data);
      tableStr += `<tr>
                        <th><a href="#">${index + 1}</a></th>
                        <td>${data.fullName}</td>
                        <td>${data.bikeName}</td>
                        <td>${data.daysBooked}</td>
                        <td>₹${data.chargeperday}</td>
                        <td> <span style="padding:10px;font-weight:bold;font-size:1em;" class="badge bg-primary">₹${
                          data.revenueOnBike
                        } </span>
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

dataResult();
