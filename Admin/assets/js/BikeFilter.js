let deleteAllBikeButton = document.getElementById("isDeleteBike");
deleteAllBikeButton.addEventListener('click', () => {
    if (confirm("are you sure want to delete all bike?")) {
        $.ajax({
            type: 'DELETE',
            url: "http://192.168.29.130:3000/admin/bike/",
            success: function (resultData) { alert(resultData) }
        });
    }
});
