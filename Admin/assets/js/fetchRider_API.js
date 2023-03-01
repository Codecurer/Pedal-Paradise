// var tableBody = document.getElementById("bikeTable");
// var pageFirst = document.getElementById("pgF");
// let pageSecond = document.getElementById("pgS");

// const length = 0;

// var tableStr = "";

// const API = "http://192.168.29.130:3000/admin/getPageBikes";

// let fetchData = async (url) => {

//     tableBody.innerHTML = `<tr><td colspan="8">
//   <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
// <lord-icon
//     src="https://cdn.lordicon.com/eqfafivu.json"
//     trigger="loop"
//     style="width:250px;height:250px">
// </lord-icon></td></tr>`;

//     try {

//         const response = await fetch(url);

//         if (!response.ok) {
//             const message = `An error has occured: ${response.status}`;
//             throw new Error(message);
//         }

//         const obj = await response.json();
//         return obj;

//     } catch (error) {
//         console.log(error);
//     }
// }
// async function dataResult(pgNumber) {

//     try {

//         const obj = await fetchData(API + `/${pgNumber}`);

//         tableStr = "";

//         // console.log(obj);
//         obj.forEach((data, index) => {

//             const d = new Date(data.bPurchaseDate);
//             const date = d.getDate() + " - " + d.toLocaleString('default', { month: 'short' }) + " - " + d.getFullYear();

//             tableStr += `
//             <tr>
//                 <th scope="row"><a href="#"><img src="../assets/img/KTM_DUKE_200_ABS.png"></a></th>
//                 <td class="fw-bold">${data.name}</td>
//                 <td class="fw-bold">${date}</td>
//                 <td class="fw-bold text-primary" style="text-transform: uppercase;">${data.bikenumber}</td>
//                 <td class="fw-bold">${data.chargeperday} / Day</td>
//                 <td>${data.bRentStatus}</td>
//                 <td><i class="bi bi-currency-rupee"></i>${data.chargeperday}</td>
//                 <td>
//                 <div  style="margin-left:25px;" class="form-check form-switch text-success">
//                 ${data.status ? `<input onchange="isStatusUpdate('${data._id}','${data.status}')" style="width:35px;" class="form-check-input" type="checkbox" id="bikeStatus" checked>` : `<input onchange="isStatusUpdate('${data._id}','${data.status}')" style="width:35px;" class="form-check-input" type="checkbox" id="bikeStatus">`}
//                 </div>
//                 </td>
//             </tr>
//             `;

//         })
//         tableBody.innerHTML = tableStr;

//     } catch (error) {
//         tableBody.innerHTML = "<tr><td colspan='8'><b class='card-title'>Oops! Sorry Data not found!</b></td></tr>";
//         console.log(error);
//     }
// }

// var global = 1;

// nextPage = () => { global++; return global; }; prevPage = () => { global--; return global; };

// let nextButton = document.getElementById("nextPage");

// nextButton.addEventListener('click', () => {
//     if (global >= 3) {
//         nextButton.disabled = true;
//     } else {

//         dataResult(nextPage());
//         pageSecond.value = global;
//         document.getElementById("pgS").classList.add("active");
//         document.getElementById("pgF").classList.remove("active");
//         pageFirst.value = global - 1;
//     }
// });


// let prevButton = document.getElementById("previousPage");

// prevButton.addEventListener('click', () => {
//     if (global <= 1) {
//         prevButton.disabled = true;
//     } else {
//         dataResult(Number.parseInt(prevPage()));
//         pageFirst.value = global;
//         document.getElementById("pgS").classList.remove("active");
//         document.getElementById("pgF").classList.add("active");
//         pageSecond.value = global + 1;
//     }
// });


// window.addEventListener("load", dataResult(1));
// document.getElementById("pgF").classList.add("active");

// function num(e) {
//     if (pageFirst.value == e) {
//         global = e;
//         dataResult(global);
//         document.getElementById("pgS").classList.remove("active");
//         document.getElementById("pgF").classList.add("active");
//     } else {
//         global = e;
//         dataResult(global);
//         document.getElementById("pgS").classList.add("active");
//         document.getElementById("pgF").classList.remove("active");
//     }
// }

// isStatusUpdate = (id, status) => {
//     $.ajax({
//         type: 'POST',
//         url: "http://192.168.29.130:3000/admin/changeStatus/",
//         data: { id: id },
//         success: function (resultData) { alert(resultData) }
//     });
// }

const profiles = document.getElementById("profile");
let i = 4;
profiles.addEventListener('click', () => {

    if (profiles.checked) {

        const timers = setInterval(()=>{
            if(i <= 0){
                document.getElementById("txt").innerHTML = "";
                clearInterval(timers);
            }
            document.getElementById("txt").innerHTML = 'Requesting...';
            i -= 1;
        },1000)

        profiles.disabled = true;

        setTimeout(() => {
            document.getElementById("i").innerHTML = `<i class="bi bi-unlock text-success"></i>`;
            document.getElementById("txt").innerHTML = profiles.checked ? "Unblock" : "Block";
            document.getElementById("txt").classList.add('text-success');
            document.getElementById("txt").classList.remove('text-danger');
            profiles.checked = true;
            profiles.disabled = false;
        }, 5000);

    } else {

        const timers = setInterval(()=>{
            if(i <= 0){
                document.getElementById("txt").innerHTML = "";
                clearInterval(timers);
            }
            document.getElementById("txt").innerHTML = 'Requesting..';
            i -= 1;
        },1000)
        profiles.disabled = true;

        setTimeout(() => {
            document.getElementById("i").innerHTML = `<i class="bi bi-lock text-danger"></i>`;
            document.getElementById("txt").innerHTML = profiles.checked ? "Unblock" : "Block";
            document.getElementById("txt").classList.add('text-danger');
            document.getElementById("txt").classList.remove('text-success');

            profiles.checked = false;
            profiles.disabled = false;
        }, 5000)
    }

})

document.getElementById("i").innerHTML = `<i class="bi bi-unlock text-success"></i>`;
document.getElementById("txt").innerHTML = "<b class='text-success'>Unblock</b>";
profiles.checked = true;
