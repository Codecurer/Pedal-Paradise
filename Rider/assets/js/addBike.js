const book = document.getElementById("book");

book.addEventListener('click',()=>{
 var GivenDate = document.getElementById("pdate");
var CurrentDate = new Date();
GivenDate = new Date(GivenDate.value);

if(GivenDate > CurrentDate){
    alert('Given date is not greater than the current date.');
}else{
    alert('Given date is greater than the current date.');
}

})