// ===============================
// Local Storage
// ===============================

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

const quotes = [
    "Success is the sum of small efforts repeated every day.",
    "Believe in yourself and all that you are.",
    "Study now, shine later.",
    "Every expert was once a beginner.",
    "Consistency beats talent.",
    "Dream big, work hard, stay focused.",
    "Small progress is still progress.",
    "Your future is created by what you do today."
];

// ===============================
// Add Subject
// ===============================

document.getElementById("addSubject").addEventListener("click", addSubject);

function addSubject(){

    const name = document.getElementById("subjectName").value.trim();
    const credit = Number(document.getElementById("creditHours").value);
    const gradePoint = Number(document.getElementById("grade").value);
    const gradeLetter = document.getElementById("grade").options[
        document.getElementById("grade").selectedIndex
    ].text;

    if(name===""){
        alert("Please enter subject name.");
        return;
    }

    subjects.push({
        name,
        credit,
        gradePoint,
        gradeLetter
    });

    saveData();

    document.getElementById("subjectName").value="";

    renderTable();
}

// ===============================
// Save
// ===============================

function saveData(){

    localStorage.setItem("subjects",JSON.stringify(subjects));

}

// ===============================
// Render Table
// ===============================

function renderTable(){

    const table=document.getElementById("subjectTable");

    table.innerHTML="";

    subjects.forEach((sub,index)=>{

        let statusClass="";
        let statusText="";

        if(sub.gradePoint>=3.3){

            statusClass="good";
            statusText="Excellent";

        }
        else if(sub.gradePoint>=2){

            statusClass="average";
            statusText="Average";

        }
        else{

            statusClass="poor";
            statusText="Need Improve";

        }

        table.innerHTML+=`

        <tr>

        <td>${sub.name}</td>

        <td>${sub.credit}</td>

        <td>${sub.gradeLetter}</td>

        <td>${sub.gradePoint.toFixed(2)}</td>

        <td class="${statusClass}">
        ${statusText}
        </td>

        <td>

        <button class="delete-btn" onclick="deleteSubject(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    updateSummary();

}

// ===============================
// Delete
// ===============================

function deleteSubject(index){

    subjects.splice(index,1);

    saveData();

    renderTable();

}

// ===============================
// Calculate Button
// ===============================

document.getElementById("calculateCGPA").addEventListener("click",calculateCGPA);

function calculateCGPA(){

    let totalCredits=0;
    let totalGradePoints=0;

    subjects.forEach(sub=>{

        totalCredits+=sub.credit;

        totalGradePoints+=sub.credit*sub.gradePoint;

    });

    let cgpa=0;

    if(totalCredits>0){

        cgpa=totalGradePoints/totalCredits;

    }

    document.getElementById("creditResult").innerText=totalCredits;

    document.getElementById("gradePointResult").innerText=totalGradePoints.toFixed(2);

    document.getElementById("finalCGPA").innerText=cgpa.toFixed(2);

    document.getElementById("cgpaValue").innerText=cgpa.toFixed(2);

    document.getElementById("progressCGPA").innerText=cgpa.toFixed(2);

    document.getElementById("totalCredits").innerText=totalCredits;

    document.getElementById("totalSubjects").innerText=subjects.length;

    const percent=(cgpa/4)*100;

    document.getElementById("progressFill").style.width=percent+"%";

    suggestion(cgpa);

}

// ===============================
// Summary
// ===============================

function updateSummary(){

    calculateCGPA();

}

// ===============================
// Suggestion
// ===============================

function suggestion(cgpa){

    const box=document.getElementById("suggestionBox");

    if(subjects.length===0){

        box.innerHTML="<p>Add subjects to receive suggestions.</p>";

        return;

    }

    let lowest=subjects[0];

    for(let i=1;i<subjects.length;i++){

        if(subjects[i].gradePoint<lowest.gradePoint){

            lowest=subjects[i];

        }

    }

    if(cgpa>=3.5){

        box.innerHTML=
        `<p>🎉 Excellent work! Keep maintaining your performance.</p>`;

    }

    else if(cgpa>=2.5){

        box.innerHTML=
        `<p>📚 Improve <strong>${lowest.name}</strong>. It currently has the lowest grade (${lowest.gradeLetter}).</p>`;

    }

    else{

        box.innerHTML=
        `<p>⚠️ Focus on <strong>${lowest.name}</strong>. Improving this subject can significantly increase your CGPA.</p>`;

    }

}

// ===============================
// Quotes
// ===============================

document.getElementById("newQuote").addEventListener("click",function(){

    let random=Math.floor(Math.random()*quotes.length);

    document.getElementById("quote").innerText=quotes[random];

});



renderTable();