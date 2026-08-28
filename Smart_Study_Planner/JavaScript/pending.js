// =====================================
// Local Storage
// =====================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// =====================================
// HTML Elements
// =====================================

let saveTask = document.getElementById("saveTask");

let taskList = document.getElementById("taskList");

let searchTask = document.getElementById("searchTask");


// =====================================
// Save Button
// =====================================

saveTask.addEventListener("click", addTask);


// =====================================
// Add Task
// =====================================

function addTask(){

    let taskName = document.getElementById("taskName").value.trim();

    let dueDate = document.getElementById("dueDate").value;

    let priority = document.getElementById("priority").value;

    if(taskName=="" || dueDate==""){

        alert("Please fill all fields.");

        return;

    }

    let task={

        name:taskName,

        date:dueDate,

        priority:priority,

        completed:false

    };

    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    document.getElementById("taskName").value="";

    document.getElementById("dueDate").value="";

    document.getElementById("priority").value="High";

    displayTasks();

    alert("Task Added Successfully");

}


// =====================================
// Display Tasks
// =====================================

function displayTasks(){

    taskList.innerHTML="";

    if(tasks.length==0){

        taskList.innerHTML="<p>No Pending Tasks.</p>";

        return;

    }

    for(let i=0;i<tasks.length;i++){

        taskList.innerHTML+=`

        <div class="task-card">

            <div class="task-info ${tasks[i].completed ? 'completed' : ''}">

                <h3>${tasks[i].name}</h3>

                <p><strong>Due :</strong> ${tasks[i].date}</p>

                <p><strong>Priority :</strong> ${tasks[i].priority}</p>

            </div>

            <div class="task-actions">

                <input
                    type="checkbox"
                    ${tasks[i].completed ? "checked" : ""}
                    onchange="completeTask(${i})">

                <button onclick="deleteTask(${i})">

                    Delete

                </button>

            </div>

        </div>

        `;

    }

}


// =====================================
// Complete Task
// =====================================

function completeTask(index){

    tasks[index].completed=!tasks[index].completed;

    localStorage.setItem("tasks",JSON.stringify(tasks));

    displayTasks();

}
let addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function(){

    document.getElementById("taskName").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("taskName").focus();

});


// =====================================
// Delete Task
// =====================================

function deleteTask(index){

    let check=confirm("Delete this Task?");

    if(check){

        tasks.splice(index,1);

        localStorage.setItem("tasks",JSON.stringify(tasks));

        displayTasks();

    }

}


// =====================================
// Search Task
// =====================================

searchTask.addEventListener("keyup",function(){

    let value=this.value.toLowerCase();

    let cards=document.querySelectorAll(".task-card");

    cards.forEach(function(card){

        let text=card.innerText.toLowerCase();

        if(text.includes(value)){

            card.style.display="flex";

        }

        else{

            card.style.display="none";

        }

    });

});


// =====================================
// Load Tasks
// =====================================

displayTasks();