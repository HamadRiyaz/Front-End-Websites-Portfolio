let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser == null){

    alert("Please Login First");

    window.location.href = "index.html";

}

document.getElementById("welcome").innerHTML =
"Good Morning, " + currentUser.name + " 👋";

document.getElementById("studentName").innerHTML =
currentUser.name;

let firstLetter = currentUser.name.charAt(0).toUpperCase();

document.getElementById("avatar").innerHTML =
firstLetter;

function logout(){

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

}

let plans = JSON.parse(localStorage.getItem("plans")) || [];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let records = JSON.parse(localStorage.getItem("records")) || [];

let goals = JSON.parse(localStorage.getItem("goals")) || [];

let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
document.getElementById("todayTask").innerHTML = plans.length;

document.getElementById("pendingTask").innerHTML = tasks.length;

let quizCount = 0;
let assignmentCount = 0;

records.forEach(function(record){

    if(record.type == "Quiz"){

        quizCount++;

    }
    else if(record.type == "Assignment"){

        assignmentCount++;

    }

});

document.getElementById("quizCount").innerHTML = quizCount;

document.getElementById("assignmentCount").innerHTML = assignmentCount;

let taskList = document.getElementById("taskList");

taskList.innerHTML = "";

tasks.forEach(function(task){

    let div = document.createElement("div");

    div.className = "task";

    div.innerHTML = `
        <input type="checkbox">
        ${task.task}
        <span>${task.deadline}</span>
    `;

    taskList.appendChild(div);

});

let deadlineGrid = document.getElementById("deadlineGrid");

deadlineGrid.innerHTML = "";

plans.forEach(function(plan){

    let card = document.createElement("div");

    card.className = "deadline-card";

    card.innerHTML = `
        <h4>${plan.subject}</h4>
        <p>${plan.priority}</p>
        <span>${plan.date}</span>
    `;

    deadlineGrid.appendChild(card);

});

document.getElementById("todayCompleted").innerHTML = "0 Completed";

document.getElementById("highPriority").innerHTML =
tasks.length + " Pending";

document.getElementById("doneTask").innerHTML = 0;

document.getElementById("leftTask").innerHTML = tasks.length;

document.getElementById("streak").innerHTML =
Math.min(plans.length, 30);
let studyData = [];

for(let i = 0; i < 7; i++){

    if(i < plans.length){

        studyData.push(1);

    }else{

        studyData.push(0);

    }

}

const studyCanvas = document.getElementById("studyChart");

if(studyCanvas){

    new Chart(studyCanvas,{

        type:"line",

        data:{

            labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

            datasets:[{

                label:"Study Hours",

                data:studyData,

                borderColor:"#6670f8",

                backgroundColor:"rgba(102,112,248,0.15)",

                fill:true,

                tension:0.4,

                borderWidth:3,

                pointRadius:5,

                pointHoverRadius:7

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{

                    beginAtZero:true,

                    ticks:{
                        stepSize:1
                    }

                },

                x:{
                    grid:{
                        display:false
                    }
                }

            }

        }

    });

}

const progressCanvas = document.getElementById("progressChart");

if(progressCanvas){

    new Chart(progressCanvas,{

        type:"doughnut",

        data:{

            labels:["Completed","Remaining"],

            datasets:[{

                data:[plans.length,tasks.length],

                backgroundColor:[
                    "#6670f8",
                    "#e8ecff"
                ],

                borderWidth:0,

                hoverOffset:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            cutout:"72%",

            plugins:{

                legend:{
                    position:"bottom"
                }

            }

        }

    });

}
const cards = document.querySelectorAll(".card");

cards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        card.style.transform = "translateY(-6px)";
        card.style.transition = ".3s";

    });

    card.addEventListener("mouseleave",function(){

        card.style.transform = "translateY(0px)";

    });

});

const checkboxes = document.querySelectorAll(".task input");

checkboxes.forEach(function(box){

    box.addEventListener("change",function(){

        let task = box.parentElement;

        if(box.checked){

            task.style.opacity = "0.6";
            task.style.textDecoration = "line-through";

        }
        else{

            task.style.opacity = "1";
            task.style.textDecoration = "none";

        }

    });

});

window.addEventListener("storage",function(){

    location.reload();

});

setInterval(function(){

    document.getElementById("todayTask").innerHTML = plans.length;

    document.getElementById("pendingTask").innerHTML = tasks.length;

},1000);