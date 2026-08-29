// ===============================
// Load Data from LocalStorage
// ===============================

let students = JSON.parse(localStorage.getItem("students")) || [];
let plans = JSON.parse(localStorage.getItem("plans")) || [];
let activities = JSON.parse(localStorage.getItem("activities")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

// ===============================
// Dashboard
// ===============================

function loadDashboard(){

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("totalPlans").innerText = plans.length;
    document.getElementById("totalActivities").innerText = activities.length;
    document.getElementById("totalTasks").innerText = tasks.length;

    document.getElementById("totalSubjects").innerText = subjects.length;

    let completed = 0;
    let pending = 0;

    tasks.forEach(task=>{

        if(task.completed){

            completed++;

        }
        else{

            pending++;

        }

    });

    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;

    calculateAverageCGPA();

    loadStudents();

    loadRecentStudents();

}

// ===============================
// Average CGPA
// ===============================

function calculateAverageCGPA(){

    if(subjects.length===0){

        document.getElementById("averageCGPA").innerText="0.00";
        return;

    }

    let totalCredits=0;
    let totalGradePoints=0;

    subjects.forEach(subject=>{

        totalCredits += subject.credit;
        totalGradePoints += subject.credit * subject.gradePoint;

    });

    let cgpa = 0;

    if(totalCredits>0){

        cgpa = totalGradePoints/totalCredits;

    }

    document.getElementById("averageCGPA").innerText = cgpa.toFixed(2);

}

// ===============================
// Student Table
// ===============================

function loadStudents(){

    const table=document.getElementById("studentTable");

    table.innerHTML="";

    students.forEach((student,index)=>{

        table.innerHTML += `

        <tr>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>

                <button class="delete-btn" onclick="deleteStudent(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Recent Students
// ===============================

function loadRecentStudents(){

    const table=document.getElementById("recentStudents");

    table.innerHTML="";

    let recent=students.slice(-5).reverse();

    recent.forEach(student=>{

        table.innerHTML += `

        <tr>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>Registered</td>

        </tr>

        `;

    });

}

// ===============================
// Delete Student
// ===============================

function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        localStorage.setItem("students",JSON.stringify(students));

        loadDashboard();

    }

}

// ===============================
// Refresh
// ===============================

document.getElementById("refreshBtn").addEventListener("click",function(){

    students = JSON.parse(localStorage.getItem("students")) || [];
    plans = JSON.parse(localStorage.getItem("plans")) || [];
    activities = JSON.parse(localStorage.getItem("activities")) || [];
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    loadDashboard();

});

// ===============================
// Clear Students
// ===============================

document.getElementById("clearStudents").addEventListener("click",function(){

    if(confirm("Delete all students?")){

        localStorage.removeItem("students");

        students=[];

        loadDashboard();

    }

});

// ===============================
// Clear Plans
// ===============================

document.getElementById("clearPlans").addEventListener("click",function(){

    if(confirm("Delete all study plans?")){

        localStorage.removeItem("plans");

        plans=[];

        loadDashboard();

    }

});

// ===============================
// Initial Load
// ===============================

loadDashboard();