/* =====================================
   ریحانة نورالزهرا
   Partner Panel Final JavaScript
===================================== */



const db =
firebaseDB;



// ================================
// تغییر صفحات پنل
// ================================


document
.querySelectorAll(".nav-btn")
.forEach(button=>{


button.addEventListener(
"click",
()=>{


document
.querySelectorAll(".nav-btn")
.forEach(btn=>{

btn.classList.remove("active");

});



button.classList.add("active");




document
.querySelectorAll(".section")
.forEach(section=>{


section.classList.remove("active");


});




document
.getElementById(
button.dataset.section
)
.classList.add("active");



});


});








// ================================
// نمایش محصولات همکاری
// ================================



const partnerProductsTable =
document.getElementById(
"partnerProductsTable"
);





async function loadPartnerProducts(){



partnerProductsTable.innerHTML="";



try{



const snapshot =
await db
.collection("products")
.orderBy(
"createdAt",
"desc"
)
.get();






snapshot.forEach(doc=>{


const product =
doc.data();





partnerProductsTable.innerHTML +=`


<tr>


<td>


<img

class="product-image"

src="${product.image || 'images/no-image.png'}">


</td>




<td>

${product.name}

</td>




<td>

${product.partnerPrice || product.price}

</td>





<td>


<button

class="btn primary"

onclick="selectProduct('${product.name}')">


انتخاب


</button>



</td>



</tr>



`;



});




}

catch(error){


console.log(error);


}



}







function selectProduct(name){


document
.getElementById(
"orderProduct"
)
.value=name;



showMessage(
"محصول انتخاب شد"
);



}









// ================================
// ثبت سفارش همکار
// ================================



const partnerOrderForm =
document.getElementById(
"partnerOrderForm"
);




partnerOrderForm.addEventListener(
"submit",
async function(e){



e.preventDefault();





const order={



product:
document.getElementById(
"orderProduct"
).value,



count:
Number(
document.getElementById(
"orderCount"
).value
),




description:
document.getElementById(
"orderDescription"
).value,



status:
"جدید",



partner:
firebaseAuth.currentUser
?
firebaseAuth.currentUser.uid
:
"",



date:
new Date()




};






try{


await db
.collection("orders")
.add(order);




showMessage(
"سفارش با موفقیت ثبت شد"
);



partnerOrderForm.reset();



}



catch(error){


console.log(error);



showMessage(
"خطا در ثبت سفارش"
);



}



});









// ================================
// خروج همکار
// ================================


const partnerLogout =
document.getElementById(
"partnerLogout"
);



if(partnerLogout){


partnerLogout.addEventListener(
"click",
async()=>{


await firebaseAuth.signOut();



localStorage.removeItem(
"userRole"
);



window.location.href=
"login.html";



});


}






function showMessage(text){


const box =
document.getElementById(
"messageBox"
);



box.innerText=text;



box.classList.add("show");



setTimeout(()=>{


box.classList.remove("show");


},2500);


}







// اجرای اولیه


document.addEventListener(
"DOMContentLoaded",
()=>{


loadPartnerProducts();


});