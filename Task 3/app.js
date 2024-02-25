const inputTask = document.querySelector('#inputTask');
let allCompletedTask = document.getElementById('allCompletedTask');
let completedNumber = document.getElementById('completedNumber');
let close = document.querySelector('.close');
let open = document.querySelector('.completed');

open.addEventListener('click', () => {
    document.querySelector('.taskC').classList.add('open')
})
close.addEventListener('click', () => {
    document.querySelector('.taskC').classList.add('hide')
    document.querySelector('.taskC').classList.remove('open')
})


funcy();
inputTask.addEventListener('click', () => {
    let addNote = document.getElementById('addNote');
    let localData = localStorage.getItem('taskSame');

    localData == null ? alltask = [] : alltask = JSON.parse(localData);

    if (addNote.value) {
        alltask.push(addNote.value);
    }
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    addNote.value = "";
    funcy();
});



function funcy() {
    let localData = localStorage.getItem('taskSame');
    let complTa = localStorage.getItem('completedTask');
    let completedTask = localStorage.getItem('completedTask');

    if (complTa == null) {
        completedNumber.innerText = 0;
        completedNumber.style.color = "red"
        complete = [];
    }
    else {
        complete = JSON.parse(complTa);
        completedNumber.innerText = JSON.parse(completedTask).length;
    }

    localData == null ? alltask = [] : alltask = JSON.parse(localData);

    let cpTask = JSON.parse(completedTask)
    let html = '';
    let comp = '';
    alltask.forEach((e, index) => {
        html += `
        <div id="tskbox">
        <div class="col d-flex justify-content-between align-items-center todoCard my-2 mx-3 p-4">
            <h5 class="card-number">${index + 1}</h5>
            <p class="card-text ncTask editTask">${e}</p>
            <div class="d-flex gap">
                <i id="${index}" onclick="editTask(this.id)" class="btn btn-outline-success fa fa-pen d-flex align-items-center"></i>
                <i id="${index}" onclick="deleteTask(this.id)" class="btn btn-outline-danger fa fa-close d-flex align-items-center"></i>
                <i id="${index}" onclick="completedTaskFunc(this.id)" class="btn btn-outline-success fa fa-check d-flex align-items-center"></i>
            </div>
        </div>
        </div>
        `
    });

    let pushNote = document.getElementById('pushNote');

    alltask.length != 0 ? pushNote.innerHTML = html : pushNote.innerHTML = `List is empty📃`;

    if (cpTask) {
        cpTask.forEach((e, index) => {
            comp += `
            <div id="tskbox">
        <div class="col d-flex justify-content-between todoCard my-2 mx-3 p-4 py-5">
        <h5 class="card-number mb-0 mr-2">${index + 1}</h5>
        <p class="card-text mb-0">${e}</p>
        <i id="${index}" onclick="deleteCoomplete(this.id)" class="btn btn-outline-danger fa fa-close d-flex align-items-center"></i>
        </div>
        </div>
        `
        });
    }

    let compTask = document.getElementById('pushComplete');

    cpTask != 0 ? compTask.innerHTML = comp : compTask.innerHTML = "<h3 style='color:blue'>Ops, No task Completed📃</h3>";

}

function deleteTask(index) {
    let localData = localStorage.getItem('taskSame');
    if (localData == null) {
        alltask = [];
    }
    else {
        alltask = JSON.parse(localData);
    }
    alltask.splice(index, 1);
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    funcy();
};

function completedTaskFunc(index) {
    let localData = localStorage.getItem('taskSame');
    let complTa = localStorage.getItem('completedTask');
    if (localData == null) {
        alltask = [];
    }
    else {
        alltask = JSON.parse(localData);
    }
    if (complTa == null) {
        complete = [];
    }
    else {
        complTa = JSON.parse(complTa);
    }
    if (complTa) {
        complete.push(alltask.splice(index, 1))

    }
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    localStorage.setItem('completedTask', JSON.stringify(complete));
    funcy();
};
function deleteCoomplete(index) {
    let complTa = localStorage.getItem('completedTask');
    if (complTa == null) {
        complete = [];
    }
    else {
        complete = JSON.parse(complTa);
    }
    complete.splice(index, 1);
    localStorage.setItem('completedTask', JSON.stringify(complete));
    funcy();
};

function editTask(index) {
    let edit = prompt("Edit your task", alltask[index]);
    let editTask = document.getElementsByClassName('editTask')[index];
    editTask.innerHTML = edit;
    alltask.splice(index, 1, edit);
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    funcy();
}
