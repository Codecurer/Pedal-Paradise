let deleteAllBikeButton = document.getElementById("isDeleteBike");
deleteAllBikeButton.addEventListener('click',() => {
    if(confirm("are you sure want to delete all bike?")){
        alert("DElete");
    }
});
