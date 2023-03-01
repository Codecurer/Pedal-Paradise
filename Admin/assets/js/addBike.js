const chooseFile = document.getElementById("choose-file");
const imgPreview = document.getElementById("formControl");
const bgImage = document.getElementById("bgImage");

chooseFile.addEventListener("change", function () {
  getImgData();
});

function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      bgImage.style.display = "block";
      bgImage.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url(' + this.result + ')';
    });
  }
}

isSaveBike = () => {
  document.getElementById("mainCoffeti").style = "display:inline;";
  document.getElementById("bikestatus").innerHTML = 'Congrtulations! you have successfully placed <b style="color:red;">New</b> Rental Bike';
  document.getElementById("bikestatus").style = 'text-align:center;';
  document.getElementById("formControl").style.display = "none";
  document.getElementById("path").style.display = "none";
  document.getElementById("closeBtn").style.display = "none";

  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/index.html";
  }, 4000);
}