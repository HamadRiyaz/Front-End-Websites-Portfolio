// ======================
// Calendar
// ======================

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let calendar = document.getElementById("calendar");
let monthYear = document.getElementById("monthYear");
let prevMonth = document.getElementById("prevMonth");
let nextMonth = document.getElementById("nextMonth");

function showCalendar(month, year){

    if(!calendar) return;

    calendar.innerHTML = "";

    let months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.innerHTML = months[month] + " " + year;

    let firstDay = new Date(year, month, 1).getDay();
    let totalDays = new Date(year, month + 1, 0).getDate();

    for(let i=0;i<firstDay;i++){

        let empty=document.createElement("div");
        calendar.appendChild(empty);

    }

    for(let day=1;day<=totalDays;day++){

        let box=document.createElement("div");
        box.innerHTML=day;
        calendar.appendChild(box);

    }

}

if(prevMonth){

    prevMonth.addEventListener("click",function(){

        currentMonth--;

        if(currentMonth<0){

            currentMonth=11;
            currentYear--;

        }

        showCalendar(currentMonth,currentYear);

    });

}

if(nextMonth){

    nextMonth.addEventListener("click",function(){

        currentMonth++;

        if(currentMonth>11){

            currentMonth=0;
            currentYear++;

        }

        showCalendar(currentMonth,currentYear);

    });

}

showCalendar(currentMonth,currentYear);

// ======================
// Local Storage
// ======================

let plans = JSON.parse(localStorage.getItem("plans")) || [];

// ======================
// Save Button
// ======================

let saveBtn=document.getElementById("savePlan");

if(saveBtn){

    saveBtn.addEventListener("click",addPlan);

}

// ======================
// Add Plan
// ======================

function addPlan(){

    let subject=document.getElementById("subject").value.trim();
    let date=document.getElementById("date").value;
    let time=document.getElementById("time").value;
    let priority=document.getElementById("priority").value;

    if(subject=="" || date=="" || time==""){

        alert("Please fill all fields.");
        return;

    }

    let plan={

        subject:subject,
        date:date,
        time:time,
        priority:priority

    };

    plans.push(plan);

    localStorage.setItem("plans",JSON.stringify(plans));

    document.getElementById("subject").value="";
    document.getElementById("date").value="";
    document.getElementById("time").value="";
    document.getElementById("priority").value="High";

    displayPlans();

    alert("Plan Saved Successfully");

}

// ======================
// Display Plans
// ======================

function displayPlans(){

    let planList=document.getElementById("planList");

    if(!planList) return;

    planList.innerHTML="";

    if(plans.length==0){

        planList.innerHTML="<p>No Study Plans Added.</p>";
        return;

    }

    for(let i=0;i<plans.length;i++){

        planList.innerHTML+=`

        <div class="plan-card">

            <h3>${plans[i].subject}</h3>

            <p><b>Date :</b> ${plans[i].date}</p>

            <p><b>Time :</b> ${plans[i].time}</p>

            <p><b>Priority :</b> ${plans[i].priority}</p>

            <button onclick="deletePlan(${i})">

                Delete

            </button>

        </div>

        `;

    }

}

// ======================
// Delete Plan
// ======================

function deletePlan(index){

    let check=confirm("Delete this Study Plan?");

    if(check){

        plans.splice(index,1);

        localStorage.setItem("plans",JSON.stringify(plans));

        displayPlans();

    }

}


// ======================
// Load Data
// ======================

displayPlans();
let addTaskBtn = document.getElementById("addTaskBtn");

if(addTaskBtn){

    addTaskBtn.addEventListener("click", function(){

        document.getElementById("subject").scrollIntoView({

            behavior: "smooth"

        });

        document.getElementById("subject").focus();

    });

}