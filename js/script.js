const title = document.querySelector('.title');
const content = document.querySelector('.content');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.row');



// Sidebar 
let sidebar = document.querySelector('.sidebar');
let btn = document.querySelector('.btn');
btn.onclick = () => {
   sidebar.classList.toggle('active');
};


let fixedNav = document.querySelector('.fixedNav');

let nav = document.querySelector('.nav');
window.onscroll = () => {
    fixedNav.classList.toggle('sticky' , window.scrollY > 0);
    nav.classList.toggle('fixed' , window.scrollY > 0);
}




// Когда страница загружается
window.addEventListener('load' , () => {
    const isTodos = localStorage.getItem('todos');
    if(!isTodos){
        localStorage.setItem('todos' ,  JSON.stringify([]));
    }else{
        const todos = JSON.parse(localStorage.getItem('todos'));
        const newTodos = todos.map((item, index) => {
            return { ...item, id: index }
        })
        localStorage.setItem('todos' ,  JSON.stringify(newTodos));     
        
        const template = newTodos.reverse().reduce((prev, {title, content, completed, date, id}) => {
            if(completed){
               return prev +  `<div class="col-lg-4 mb-4 completed">${cardTemplate(title, content, date, id)}</div>`
            }else{
                return prev +  `<div class="col-lg-4 mb-4 ">${cardTemplate(title, content, date, id)}</div>`
            }
        }, '')

        container.innerHTML = template;
    }
})


//ADD new task
submitBtn.addEventListener('click', e => {
    e.preventDefault();

    if(title.value === "" && content.value === "") alert('Плоля  не должны быть пустимы!');
    if(title.value !== "" && content.value !== ""){
        const todos = JSON.parse(localStorage.getItem('todos'));

        localStorage.setItem('todos' , JSON.stringify([...todos, {
            title: title.value,
            content: content.value,
            date: currentTime(),
            completed: false
            
        }]));
        
        window.location.reload();
    }
    
})

// Шаблон карточки

function cardTemplate(title, content, time, id) {
    if(content.length >= 350){
        return`
            <div class="card">
                <div class="card-header">
                    <h4 class="card title mb-0">${title}</h4>
                </div>
                <div class="card-body content shorted">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                    <button onclick="deleteTask(${id})" class="btn btn-danger" >Delete</button>
                    <button onclick="complateTask(${id})" class="btn btn-primary">Complate</button>
                    <button onclick="editTask(${id})" class="btn btn-info">Edit</button>
                </div>
            </div>
        `
    }else{
        return`
            <div class="card">
                <div class="card-header">
                    <h4 class="card title mb-0">${title}</h4>
                </div>
                <div class="card-body content">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                    <button  onclick="deleteTask(${id})" class="btn btn-danger">Delete</button>
                    <button onclick="complateTask(${id})" class="btn btn-primary">Complate</button>
                    <button onclick="editTask(${id})"  class="btn btn-info">Edit</button>
                </div>
            </div>

        `
    }
}



// Our current time

function currentTime(){
    return `${moment().format('L')}  ${moment().format('LTS')}`;

}



// Change theme

const body = document.body;
const selector = document.querySelector('.theme-selector');

selector.addEventListener('change' , e => {
    const value = e.target.value;

    if(value === "light"){
        body.style.background = "#efefef"; 
        localStorage.setItem('bgColor', '#efefef');
        localStorage.setItem('themeValue' , 'light')
    }else if(value === "dark"){
        body.style.background = "#212529";
        localStorage.setItem('bgColor', '#212529');
        localStorage.setItem('themeValue' , 'dark')
    }else if(value === "custom"){
        const  ascColor = prompt('Your custom color');
        body.style.background = ascColor;
        localStorage.setItem('bgColor', ascColor);
        localStorage.setItem('themeValue' , 'custom')
    }
})

window.addEventListener('load', () => {
    body.style.background = localStorage.getItem('bgColor');
    selector.value = localStorage.getItem('themeValue')
})






// Buttons

function deleteTask(id){
    const askDelete = confirm('Are yuo sure?');

    if(!askDelete) return;
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.filter(item => item.id !== id);
    
    localStorage.setItem('todos' , JSON.stringify(newTodos));
    window.location.reload();   
}



function complateTask(id) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id === id){
            return{
                ...item,
                completed: !item.completed
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos', JSON.stringify(newTodos));
    window.location.reload();
}



function editTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id === id){
            return{
                ...item,
                title: `${prompt('New title', item.title)} `,
                content: `${prompt('New content', item.content)}`,
                date: `${currentTime()}  (ред.)`
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos' , JSON.stringify(newTodos));
    window.location.reload();
}



// check is auth

window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth');

    if(isAuth === 'true'){
        return
    }else{
        window.open('auth.html' , '_self');
    }
    
});



// Sign out

const signOutBtn = document.querySelector('.signOutBtn');

signOutBtn.addEventListener('click' , e => {
    e.preventDefault();

    localStorage.setItem('isAuth', 'false');
    window.location.reload();
})