const API = "http://192.168.29.130:3000/admin/bike";
var bikeListString = "";
let bikeCard = document.getElementById("bikeList");

let fetchData = async (url) => {

  try {

    const response = await fetch(url);

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
async function dataResult() {

  try {

    const obj = await fetchData(API);

    bikeListString = "";

    obj.forEach((data, index) => {

      console.log(data);
      const d = new Date(data.bPurchaseDate);
      const date = d.getDate() + " - " + d.toLocaleString('default', { month: 'short' }) + " - " + d.getFullYear();

      bikeListString += `
      <div class="col-xxl-3 col-md-12 card-deck">
          <div class="card info-card sales-card">
                    <h5 class="card-title text-center">${data.name}</h5>
                    <img class="card-img-top" src="./assets/img/KTM_DUKE_200_ABS.png" alt="Card image cap">
                    <hr>
                    <div class="card-body">
                      <h5 class="card-title">${data.bikenumber}</h5>
                      <p class="card-text">
                      <ul class="list-group m-3">
                        <li class="list-item">Bike Average - ${data.average}</li>
                        <li class="list-item">Bike Purchase Date - ${date}</li>
                        <li class="list-item">Bike Avialble Status - ${data.bRentStatus}</li>
                        <li class="list-item">Charges Per Day &#8377;-${data.chargeperday}</li>
                      </ul>
                      <p class="card-text"><button data-bs-toggle="modal"
                      data-bs-target="#verticalycentered" class="btn btn-warning col-12" onclick="bookNow('${data._id}')">Book
                      Now</button></p>
            </div>
          </div>
        </div>
      `;
      bikeCard.innerHTML = bikeListString;
    })

  } catch (error) {
    bikeCard.innerHTML = "<tr><td colspan='8'><b class='card-title'>Oops! Sorry Data not found!</b></td></tr>";
    console.log(error);
  }
}

dataResult();

let bikeID;
function bookNow(bikeId) { bikeID = bikeId; }

bookingForm.onsubmit = async (e) => {


  e.preventDefault();

  const formData = new FormData(bookingForm);

  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  let response = await fetch('http://192.168.29.130:3000/user/bookBike', {

    method: 'POST',
    headers: { "Content-Type": "application/json", Authentication: localStorage.getItem("authToken") },
    body: JSON.stringify({
      formData: formDataJsonString,
      bId: bikeID
    })
  });

  let result = await response.json();

  // window.location.href = "../Rider/index.html";

}