// ===============================
// Local Storage
// ===============================

let activities = JSON.parse(localStorage.getItem("activities")) || [];


// ===============================
// HTML Elements
// ===============================

let saveActivity = document.getElementById("saveActivity");

let activityList = document.getElementById("activityList");


// ===============================
// Save Button
// ===============================

saveActivity.addEventListener("click", addActivity);


// ===============================
// Add Activity
// ===============================

function addActivity(){

    let activityName = document.getElementById("activityName").value.trim();

    let activityPlace = document.getElementById("activityPlace").value.trim();

    let startTime = document.getElementById("startTime").value;

    let endTime = document.getElementById("endTime").value;


    if(activityName=="" || activityPlace=="" || startTime=="" || endTime==""){

        alert("Please fill all fields.");

        return;

    }


    let activity={

        name:activityName,

        place:activityPlace,

        start:startTime,

        end:endTime

    };


    activities.push(activity);


    localStorage.setItem("activities",JSON.stringify(activities));


    document.getElementById("activityName").value="";

    document.getElementById("activityPlace").value="";

    document.getElementById("startTime").value="";

    document.getElementById("endTime").value="";


    displayActivities();

    alert("Activity Added Successfully");

}


// ===============================
// Display Activities
// ===============================

function displayActivities(){

    let timeline = document.getElementById("timeline");

    timeline.innerHTML = "";

    if(activities.length == 0){

        timeline.innerHTML = "<p>No Activities Added.</p>";

        return;

    }

    // Start Time ke hisaab se sort
    activities.sort(function(a,b){

        return a.start.localeCompare(b.start);

    });

    for(let i=0; i<activities.length; i++){

        timeline.innerHTML += `

        <div class="timeline-item">

            <div class="time">

                ${activities[i].start}

            </div>

            <div class="activity blue">

                <h3>${activities[i].name}</h3>

                <p>${activities[i].place}</p>

                <span>${activities[i].start} - ${activities[i].end}</span>

                <br><br>

                <button onclick="deleteActivity(${i})">

                    Delete

                </button>

            </div>

        </div>

        `;

    }

}
let addActivityBtn = document.getElementById("addActivityBtn");

addActivityBtn.addEventListener("click", function(){

    document.getElementById("activityName").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("activityName").focus();

});

// ===============================
// Delete Activity
// ===============================

function deleteActivity(index){

    let check=confirm("Delete this Activity?");

    if(check){

        activities.splice(index,1);

        localStorage.setItem("activities",JSON.stringify(activities));

        displayActivities();

    }

}


// ===============================
// Load Activities
// ===============================

displayActivities();