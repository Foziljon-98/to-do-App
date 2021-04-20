const username = document.querySelector('.username');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');

btn.addEventListener('click' , e => {
    e.preventDefault();

    if(username.value === "" && password.value === "") alert('Поля пустые!');
    if(username.value !== "" && password.value !== ""){
        if(username.value === "admin" && password.value === "admin"){
            alert('Welcome');
            window.open('index.html' , '_self');
            localStorage.setItem('isAuth', 'true');
        }else{
            alert('Wrong login or password');
            localStorage.setItem('isAuth', 'false');
            username.value = "";
            password.value = "";
        }
    }
})

// check is auth

window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth');

    if(!isAuth)return;

    if(isAuth === "true"){
        window.open('index.html' , '_self');
    }
})