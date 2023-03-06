const API = "http://192.168.29.130:3000/admin/recentBooking";

let tableBody = document.getElementById("tableBody");

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
            method: 'GET',
            headers: { Authentication: localStorage.getItem("authToken") }
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
}
async function dataResult(pgNumber) {

    try {

        const obj = await fetchData(API);

        tableStr = "";

        obj.forEach((data, index) => {

            console.log(data);
            tableStr += `<tr>
                        <th><a href="#">#2457</a></th>
                        <td>Devam Panchasara</td>
                        <td>Ninja Yamaha</td>
                        <td>5</td>
                        <td>₹269</td>
                        <td> <span class="badge bg-primary">4586</span>
                        </td>
                      </tr>
             `;

        })
        tableBody.innerHTML = tableStr;

    } catch (error) {
        tableBody.innerHTML = "<tr><td colspan='8'><b class='card-title'>Oops! Sorry Data not found!</b></td></tr>";
        console.log(error);
    }
}

dataResult();