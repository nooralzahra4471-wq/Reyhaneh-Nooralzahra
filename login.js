/* =====================================
   ریحانة نورالزهرا
   Login System Final
===================================== */



const loginForm =
document.getElementById("loginForm");



const loginMessage =
document.getElementById("loginMessage");





function showLoginMessage(text){


loginMessage.innerText=text;


loginMessage.classList.add("show");



setTimeout(()=>{


loginMessage.classList.remove("show");


},3000);


}







loginForm.addEventListener(
"submit",
async function(e){


e.preventDefault();



const email =
document.getElementById("username").value;



const password =
document.getElementById("password").value;






try{



// ورود از Firebase


const result =
await firebaseAuth
.signInWithEmailAndPassword(
email,
password
);



const uid =
result.user.uid;





// بررسی نقش کاربر


const userDoc =
await firebaseDB
.collection("users")
.doc(uid)
.get();






if(!userDoc.exists){



showLoginMessage(
"اطلاعات کاربر ثبت نشده است"
);



return;


}





const user =
userDoc.data();






// مدیر


if(user.role==="admin"){


localStorage.setItem(
"userRole",
"admin"
);



window.location.href =
"admin.html";



}






// همکار


else if(user.role==="partner"){



localStorage.setItem(
"userRole",
"partner"
);



window.location.href =
"partner.html";



}






else{


showLoginMessage(
"سطح دسترسی مشخص نیست"
);



}




}



catch(error){


console.log(error);



showLoginMessage(
"ایمیل یا رمز عبور اشتباه است"
);



}



});