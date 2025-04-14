const form = document.getElementById("surveyForm");
const resultDiv = document.getElementById("result");
const savePdfBtn = document.getElementById("savePdfBtn");

let surveyData = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const surveyNo = document.getElementById("surveyNo").value.trim();
  const aadharNo = document.getElementById("aadharNo").value.trim();
  const samagraNo = document.getElementById("samagraNo").value.trim();
  const name = document.getElementById("name").value.trim();
  const mobileNo = document.getElementById("mobileNo").value.trim();

  if (!surveyNo || !aadharNo || !samagraNo || !name || !mobileNo) {
    alert("Please fill all fields!");
    return;
  }

  const entry = {
    SurveyNo: surveyNo,
    AadharNo: aadharNo,
    SamagraNo: samagraNo,
    Name: name,
    MobileNo: mobileNo
  };

  surveyData.push(entry);

  const div = document.createElement("div");
  div.innerText =
    `Survey No: ${surveyNo} | Aadhar No: ${aadharNo} | Samagra: ${samagraNo} | Name: ${name} | Mobile: ${mobileNo}`;
  div.style.marginBottom = "8px";
  resultDiv.appendChild(div);

  form.reset();

  if (surveyData.length === 10) {
    savePdfBtn.style.display = "block";
  }
});

savePdfBtn.addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Survey Data Report (Vertical Format)", 20, 20);

  let y = 35;
  surveyData.forEach((entry, index) => {
    doc.text(`${index + 1}.`, 20, y); y += 10;
    doc.text(`Survey No: ${entry.SurveyNo}`, 30, y); y += 10;
    doc.text(`Aadhar No: ${entry.AadharNo}`, 30, y); y += 10;
    doc.text(`Samagra No: ${entry.SamagraNo}`, 30, y); y += 10;
    doc.text(`Name: ${entry.Name}`, 30, y); y += 10;
    doc.text(`Mobile No: ${entry.MobileNo}`, 30, y); y += 15;
  });

  doc.save("Survey_Report_Vertical.pdf");

  surveyData = [];
  resultDiv.innerHTML = "";
  savePdfBtn.style.display = "none";
});
