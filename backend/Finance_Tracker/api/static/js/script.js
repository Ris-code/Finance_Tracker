// Initialize charts
let descriptionChart;
let dailyTransactionChart;
let incomeDeductionChart;


// Function to handle form submission and add/update a transaction
function addTransaction(event, rowIndex = -1) {
  event.preventDefault();

  // Get form values
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");
  const dateInput = document.getElementById("date");

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;
  const date = dateInput.value.split("-").reverse().join("/");

  // Perform validation
  if (!description || isNaN(amount) || !isFinite(amount) || !type || !date) {
    // alert("Please fill in all fields and ensure the amount is a valid number.");
    return;
  }

  // // Clear form values
  // descriptionInput.value = "";
  // amountInput.value = "";
  // typeInput.value = "";
  // dateInput.value = "";

  // // Create or update transaction row
  // const transactionList = document.getElementById("transaction-list");
  // const row =
  //   rowIndex === -1
  //     ? transactionList.insertRow(1)
  //     : transactionList.rows[rowIndex];
  // const descriptionCell = row.insertCell(0);
  // const amountCell = row.insertCell(1);
  // const typeCell = row.insertCell(2);
  // const dateCell = row.insertCell(3);
  // const editCell = row.insertCell(4);
  // const deleteCell = row.insertCell(5);

  // descriptionCell.textContent = description;
  // amountCell.textContent = amount.toFixed(2);
  // typeCell.textContent = type;
  // dateCell.textContent = date;

  // const deleteButton = document.createElement("button");
  // deleteButton.textContent = "Delete";
  // deleteButton.classList.add("delete-button");
  // deleteButton.addEventListener(
  //   "click",
  //   deleteTransaction.bind(null, row, description, amount, type, date)
  // );
  // deleteCell.appendChild(deleteButton);

  // const editButton = document.createElement("button");
  // editButton.textContent = "Edit";
  // editButton.classList.add("edit-button");
  // editButton.addEventListener("click", editTransaction.bind(null, row));
  // editCell.appendChild(editButton);

  // if (transactionList.rows.length === "Income") {
  //   row.classList.add("odd-row");
  // } else if (type === "Deduction") {
  //   row.classList.add("even-row");
  // }
  if (rowIndex === -1) {
    // Add a new row for the transaction
    const transactionList = document.getElementById("transaction-list");
    const row = transactionList.insertRow(1);
    const descriptionCell = row.insertCell(0);
    const amountCell = row.insertCell(1);
    const typeCell = row.insertCell(2);
    const dateCell = row.insertCell(3);
    const editCell = row.insertCell(4);
    const deleteCell = row.insertCell(5);

    descriptionCell.textContent = description;
    amountCell.textContent = amount.toFixed(2);
    typeCell.textContent = type;
    dateCell.textContent = date;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener(
      "click",
      deleteTransaction.bind(null, row, description, amount, type, date)
    );
    deleteCell.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", editTransaction.bind(null, row));
    editCell.appendChild(editButton);
  } else {
    // If rowIndex is provided, update the transaction at the given index
    const transactionList = document.getElementById("transaction-list");
    const row = transactionList.rows[rowIndex];

    row.cells[0].textContent = description;
    row.cells[1].textContent = amount.toFixed(2);
    row.cells[2].textContent = type;
    row.cells[3].textContent = date;
  }

  // Update charts
  updateCharts();

  // Reset form fields
  descriptionInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
  dateInput.value = "";
  // console.log(type);
  // // Update charts
  // updateCharts();

  // Update total income and total deduction
  if (type === "Income") {
    // updateTotalDeduction();
    updateTotalIncome(amount);
  } 
  else if (type === "Deduction") {
    // updateTotalIncome();
    updateTotalDeduction(amount);
  }
 
}

// Function to delete a transaction
function deleteTransaction(row, description, amount, type, date) {
  const transactionList = document.getElementById("transaction-list");
  transactionList.deleteRow(row.rowIndex);

  // Update charts
  updateCharts();

  // Update total income and total deduction
  if(type==="Income"){
    updateTotalIncome(-amount);
  }
  else if(type==="Deduction"){
    updateTotalDeduction(-amount);
  }
}

// Function to edit a transaction
function editTransaction(row) {
  popup.classList.add("show"); // Show popup

  const descriptionCell = row.cells[0];
  const amountCell = row.cells[1];
  const typeCell = row.cells[2];
  const dateCell = row.cells[3];

  // Fill form with existing transaction data
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");
  const dateInput = document.getElementById("date");

  // descriptionInput.value = descriptionCell.textContent;
  // amountInput.value = parseFloat(amountCell.textContent);
  // typeInput.value = typeCell.textContent;
  // dateInput.value = dateCell.textContent;

  const cancelButton = document.getElementById("closePopup");
  cancelButton.disabled = true;

   // Create variables to store the initial values
   const initialDescription = descriptionCell.textContent;
   const initialAmount = parseFloat(amountCell.textContent);
   const initialType = typeCell.textContent;
   const initialDate = dateCell.textContent;
 
   descriptionInput.value = initialDescription;
   amountInput.value = initialAmount;
   typeInput.value = initialType;
   dateInput.value = initialDate;
 
   // Get the cancel button
  //  const cancelButton = document.getElementById("closePopup");
 
  //  // Enable the cancel button
  //  cancelButton.disabled = false;
 
  //  // Add an event listener to the cancel button to handle the cancel action
  //  cancelButton.addEventListener("click", function cancelEdit() {
  //    // Restore initial values on cancel
  //    descriptionInput.value = initialDescription;
  //    amountInput.value = initialAmount;
  //    typeInput.value = initialType;
  //    dateInput.value = initialDate;
 
  //    // Remove the event listener to avoid multiple bindings
  //    cancelButton.removeEventListener("click", cancelEdit);
 
  //    // Hide the popup
  //    popup.classList.remove("show");
 
  //    // Revert the disabled state of the cancel button
  //    cancelButton.disabled = false;
  //  });
  // Delete existing transaction row
  const transactionList = document.getElementById("transaction-list");
  console.log(parseFloat(amountCell.textContent));
  console.log(typeCell.textContent);

  // if(typeCell.textContent==="Income"){
  //   console.log(1);
  //   updateTotalIncome(-parseFloat(amountCell.textContent));
  // }
  // else if(typeCell.textContent==="Deduction"){
  //   updateTotalDeduction(-parseFloat(amountCell.textContent));
  // }
  transactionList.deleteRow(row.rowIndex);
  
  if(typeCell.textContent==="Income"){
    updateTotalIncome(-1*parseFloat(amountCell.textContent));
  }
  else if(typeCell.textContent==="Deduction"){
    updateTotalDeduction(-1*parseFloat(amountCell.textContent));
  }
  // Update charts without adding a new row
  updateCharts();

  // Scroll to the top of the form
  document
    .getElementById("transaction-form")
    .scrollIntoView({ behavior: "smooth" });
  
  cancelButton.disabled = false;
  // Update total income and total deduction
  // if(typeInput.value==="Income"){
  //   updateTotalIncome(parseFloat(amountInput.value)-parseFloat(amountCell.textContent));
  // }
  // else if(typeInput.value==="Deduction"){
  //   updateTotalDeduction(parseFloat(amountInput.value)-parseFloat(amountCell.textContent));
  // }
}

// Function to update the charts
function updateCharts() {
  // Clear existing charts
  if (descriptionChart) {
    descriptionChart.destroy();
    descriptionChart = null;
  }
  if (dailyTransactionChart) {
    dailyTransactionChart.destroy();
    dailyTransactionChart = null;
  }
  if (incomeDeductionChart) {
    incomeDeductionChart.destroy();
    incomeDeductionChart = null;
  }

  // Get data from transaction table
  const transactionList = document.getElementById("transaction-list");
  const rows = transactionList.getElementsByTagName("tr");

  // Sort rows based on date in descending order
  const sortedRows = Array.from(rows)
    .slice(1)
    .sort((a, b) => {
      const dateA = new Date(a.cells[3].textContent);
      const dateB = new Date(b.cells[3].textContent);
      return dateB - dateA;
    });

  // Clear transaction list
  while (transactionList.rows.length > 1) {
    transactionList.deleteRow(1);
  }

  // Add sorted rows back to the transaction list
  for (const row of sortedRows) {
    transactionList.appendChild(row);
  }

  const descriptionLabels = [];
  const descriptionAmounts = [];

  const dailyTransactionLabels = [];
  const dailyTransactionAmounts = [];
  const dailyIncomeAmounts = [];
  const dailyDeductionAmounts = [];

  let totalIncome = 0;
  let totalDeduction = 0;

  // Loop through table rows and extract data
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const description = cells[0].textContent;
    const amount = parseFloat(cells[1].textContent);
    const type = cells[2].textContent;
    const date = cells[3].textContent;

    // Update description chart data
    const descriptionIndex = descriptionLabels.indexOf(description);
    if (descriptionIndex !== -1) {
      descriptionAmounts[descriptionIndex] += amount;
    } else {
      descriptionLabels.push(description);
      descriptionAmounts.push(amount);
    }

    // Update daily transaction chart data
    if (dailyTransactionLabels.includes(date)) {
      const index = dailyTransactionLabels.indexOf(date);
      if (type === "Income") {
        dailyIncomeAmounts[index] += amount;
      } else if (type === "Deduction") {
        dailyDeductionAmounts[index] += amount;
      }
    } else {
      dailyTransactionLabels.push(date);
      if (type === "Income") {
        dailyIncomeAmounts.push(amount);
        dailyDeductionAmounts.push(0);
      } else if (type === "Deduction") {
        dailyDeductionAmounts.push(amount);
        dailyIncomeAmounts.push(0);
      }
    }

    // Loop through sorted rows and calculate totals
    for (const row of sortedRows) {
      const amount = parseFloat(row.cells[1].textContent);
      const type = row.cells[2].textContent;

      if (type === "Income") {
        totalIncome += amount;
      } else if (type === "Deduction") {
        totalDeduction += amount;
      }
    }
  }

  // Show/hide loading message based on transaction data
  const loadingMessage = document.getElementById("loading-message");
  const graphSection = document.querySelector(".graph-section");

  if (rows.length <= 1) {
    loadingMessage.style.display = "block";
    graphSection.style.display = "none";
  } else {
    loadingMessage.style.display = "none";
    graphSection.style.display = "block";
  }

  // Create description chart
  const descriptionChartElement = document.getElementById("description-chart");
  const descriptionLabelsDiv = document.getElementById("description-labels");

  descriptionChart = new Chart(descriptionChartElement, {
    type: "doughnut",
    data: {
      labels: descriptionLabels,
      datasets: [
        {
          data: descriptionAmounts,
          backgroundColor: getRandomColors(descriptionLabels.length),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Transaction Description Breakdown",
        },
        legend: {
          display: false, // Hide legend labels
        },
      },
      animation: {
        onComplete: function () {
          // Generate label text and percentages
          const chartData = this.data.datasets[0].data;
          const total = chartData.reduce((acc, val) => acc + val, 0);
          const labelPercentages = chartData.map(
            (value) => ((value / total) * 100).toFixed(2) + "%"
          );

          // Generate labels and percentages in the inline div
          descriptionLabelsDiv.innerHTML = "";
          for (let i = 0; i < descriptionLabels.length; i++) {
            const label = descriptionLabels[i];
            const percentage = labelPercentages[i];
            const color = this.data.datasets[0].backgroundColor[i];

            const labelContainer = document.createElement("div");
            labelContainer.classList.add("label-container");

            const colorIndicator = document.createElement("span");
            colorIndicator.classList.add("color-indicator");
            colorIndicator.style.backgroundColor = color;

            const labelText = document.createElement("span");
            labelText.classList.add("label-text");
            labelText.textContent = label;

            const labelPercentage = document.createElement("span");
            labelPercentage.classList.add("label-percentage");
            labelPercentage.textContent = percentage;

            labelContainer.appendChild(colorIndicator);
            labelContainer.appendChild(labelText);
            labelContainer.appendChild(labelPercentage);
            descriptionLabelsDiv.appendChild(labelContainer);
          }
        },
      },
    },
  });

  // Create income and deduction v/s day chart
  const dailyTransactionChartElement = document.getElementById(
    "daily-transaction-chart"
  );
  dailyTransactionChartElement.width = 800; // Set the width of the chart
  dailyTransactionChartElement.height = 400; // Set the height of the chart
  dailyTransactionChart = new Chart(dailyTransactionChartElement, {
    type: "bar",
    data: {
      labels: dailyTransactionLabels,
      datasets: [
        {
          label: "Income",
          data: dailyIncomeAmounts,
          backgroundColor: "rgb(133,253,158)", // Green color for income
        },
        {
          label: "Deduction",
          data: dailyDeductionAmounts,
          backgroundColor: "rgba(253, 140, 140, 1)", // Red color for deduction
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Income and Deduction vs Day",
        },
        legend: {
          position: "right",
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  // Create income and deduction chart
  const incomeDeductionChartElement = document.getElementById(
    "income-deduction-chart"
  );
  incomeDeductionChart = new Chart(incomeDeductionChartElement, {
    type: "pie",
    data: {
      labels: ["Income", "Deduction"],
      datasets: [
        {
          data: [totalIncome, totalDeduction],
          backgroundColor: ["rgb(133,253,158)", "rgba(253, 140, 140, 1)"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Total Income and Deduction",
        },
      },
    },
  });
}

// Function to generate random colors for chart elements
function getRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `rgba(${getRandomNumber(0, 255)}, ${getRandomNumber(
      0,
      255
    )}, ${getRandomNumber(0, 255)}, 0.8)`;
    colors.push(color);
  }
  return colors;
}

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initial chart update
updateCharts();

// Get the form element
const formElement = document.getElementById("transaction-form");

// Add event listener to the form submit event
formElement.addEventListener("submit", addTransaction);

// Add event listener to the Edit buttons
const editButtons = document.getElementsByClassName("edit-button");
Array.from(editButtons).forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.parentNode.parentNode;
    editTransaction(row);
  });
});

// Access the user's data
// console.log(userData.username);
// console.log(userData.email);
// console.log(userData.name);
// console.log(userData.Current_balance);
// Use the data as needed in your JavaScript code
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


let nettotalIncome = userData.Total_income;
let nettotalDeduction = userData.Total_deduction;
let starting_balance = userData.Current_balance;

const totalBalanceElement = document.getElementById("total-balance");
const totalIncomeElement = document.getElementById("total-income");
const totalDeductionElement = document.getElementById("total-deduction");

// Update the "Total Balance" element in the HTML
totalBalanceElement.textContent = "Total Balance: " + starting_balance;
totalIncomeElement.textContent = "Total Income: " + nettotalIncome;
totalDeductionElement.textContent = "Total Deduction: " + nettotalDeduction;

let Current_balance = parseFloat(starting_balance);
let total_i=0;
let total_n = 0;

function updateTotalIncome(amount) {
  let totalIncome = total_i+amount;

  total_i=totalIncome;
  const totalIncomeElement = document.getElementById("total-income");
  totalIncomeElement.textContent = "Total Income: " + (parseFloat(nettotalIncome) + totalIncome).toFixed(2);

  const totalBalance1 = document.getElementById("total-balance");
  // Update total balance
  const cur_balance1 =  parseFloat(starting_balance)+totalIncome-total_n; // Update total balance
  totalBalance1.textContent = "Total Balance: " + cur_balance1.toFixed(2); // Update total balance element

  // Send an AJAX request to update the server with the new balance
  $.ajax({
    url: '/update-balance/',
    method: 'POST',
    headers: {
      'X-CSRFToken': getCookie('csrftoken')
    },
    data: {
      amount: (parseFloat(nettotalIncome) + totalIncome).toFixed(2),
      cur_balance: cur_balance1.toFixed(2),
      type: "Income"
    },
  });
}


function updateTotalDeduction(amount) {
  let totalDeduction = total_n+amount;
  total_n=totalDeduction;

  const totalDeductionElement = document.getElementById("total-deduction");
  totalDeductionElement.textContent =
    "Total Deduction: " + (parseFloat(nettotalDeduction)+totalDeduction).toFixed(2);

  const totalBalance = document.getElementById("total-balance");
  // starting_balance = parseFloat(starting_balance) - totalDeduction;
  const cur_balance = parseFloat(starting_balance) + total_i - totalDeduction;
  totalBalance.textContent = "Total Balance: " + cur_balance.toFixed(2);

  $.ajax({
    url: '/update-balance/',
    method: 'POST',
    headers: {
      'X-CSRFToken': getCookie('csrftoken')
   },
    data: {
        amount: (parseFloat(nettotalDeduction)+totalDeduction).toFixed(2),
        cur_balance: cur_balance.toFixed(2),
        type: "Deduction"
    },
    });
}

// Slides JS
// Get references to DOM elements
const sliderContainer = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));

// Set the initial active slide
let activeSlide = 0;
slides[activeSlide].classList.add('active');

// Function to show the next slide
function showNextSlide() {
  slides[activeSlide].classList.remove('active');
  activeSlide = (activeSlide + 1) % slides.length;
  slides[activeSlide].classList.add('active');
}

// Function to show the previous slide
function showPrevSlide() {
  slides[activeSlide].classList.remove('active');
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  slides[activeSlide].classList.add('active');
}

// Add event listeners to navigation buttons
document.getElementById('next-button').addEventListener('click', showNextSlide);
document.getElementById('prev-button').addEventListener('click', showPrevSlide);

// function handleEditButtonClick() {
//   const row = this.parentNode.parentNode;
//   editTransaction(row);
// }

// // Function to remove event listeners from "Edit" buttons
// function removeEditButtonListeners() {
//   const editButtons = document.getElementsByClassName("edit-button");
//   Array.from(editButtons).forEach((button) => {
//     button.removeEventListener("click", handleEditButtonClick);
//   });
// }

// // Function to set event listeners for "Edit" buttons
// function setEditButtonListeners() {
//   const editButtons = document.getElementsByClassName("edit-button");
//   Array.from(editButtons).forEach((button) => {
//     button.addEventListener("click", handleEditButtonClick);
//   });
// }

// // Set initial event listeners for "Edit" buttons
// setEditButtonListeners();

// function editTransaction(row) {
//   const descriptionCell = row.cells[0];
//   const amountCell = row.cells[1];
//   const typeCell = row.cells[2];
//   const dateCell = row.cells[3];

//   // Fill form with existing transaction data
//   const descriptionInput = document.getElementById("description");
//   const amountInput = document.getElementById("amount");
//   const typeInput = document.getElementById("type");
//   const dateInput = document.getElementById("date");

//   descriptionInput.value = descriptionCell.textContent;
//   amountInput.value = parseFloat(amountCell.textContent).toFixed(2);
//   typeInput.value = typeCell.textContent;
//   dateInput.value = dateCell.textContent;
//   let old_type = typeInput.value;
//   // Temporarily hide the edit button
//   const editButton = row.querySelector(".edit-button");
//   editButton.style.display = "none";

//   // Store the original data in a data attribute for later restoration
//   row.dataset.originalValues = JSON.stringify({
//     description: descriptionCell.textContent,
//     amount: amountCell.textContent,
//     type: typeCell.textContent,
//     date: dateCell.textContent
//   });

//   // Show the form and enable the cancel and submit buttons
//   const popup = document.getElementById("myPopup");
//   popup.classList.add("show");
//   const cancelBtn = document.querySelector("#transaction-form .cancel-button");
//   const submitBtn = document.querySelector("#transaction-form .add-button");
//   cancelBtn.disabled = false;
//   submitBtn.disabled = false;

//   // On cancel, restore the original data and hide the form again
//   cancelBtn.addEventListener("click", function() {
//     const originalValues = JSON.parse(row.dataset.originalValues);
//     descriptionCell.textContent = originalValues.description;
//     amountCell.textContent = originalValues.amount;
//     typeCell.textContent = originalValues.type;
//     dateCell.textContent = originalValues.date;

//     // Re-show the edit button
//     editButton.style.display = "block";

//     // Hide the form and disable the cancel and submit buttons
//     popup.classList.remove("show");
//     cancelBtn.disabled = true;
//     submitBtn.disabled = true;
//   });

//   // On submit, update the row with the new values
//   submitBtn.addEventListener("click", function() {
//     const oldAmount = parseFloat(amountCell.textContent);
//     const newAmount = parseFloat(amountInput.value);
//     const type = typeInput.value;

//     descriptionCell.textContent = descriptionInput.value;
//     amountCell.textContent = newAmount.toFixed(2);
//     typeCell.textContent = type;
//     dateCell.textContent = dateInput.value.split("-").reverse().join("/");
    
//     let new_type = typeCell.textContent;
//     // Re-show the edit button
//     editButton.style.display = "block";

//     // Hide the form and disable the cancel and submit buttons
//     popup.classList.remove("show");
//     cancelBtn.disabled = true;
//     submitBtn.disabled = true;
//     console.log(old_type)
//     console.log(new_type)
//     console.log(oldAmount)
//     console.log(newAmount)  
//     // Update the charts and totals
//     updateCharts();
//     // const diffAmount = newAmount ;
//     if (old_type === "Income" ) {
//       updateTotalIncome(-1*oldAmount);
//     } else if (old_type === "Deduction") {
//       updateTotalDeduction(-1*oldAmount);
//     }
//     if (new_type === "Income" ) {
//       updateTotalIncome(newAmount);
//     } else if (new_type === "Deduction") {
//       updateTotalDeduction(newAmount);
//     }
//     old_type="";
//     new_type="";
//   });
// }


// // Function to update total income
// function updateTotalIncome() {
//   const transactionList = document.getElementById("transaction-list");
//   let totalIncome = 0;

//   for (let i = 1; i < transactionList.rows.length; i++) {
//     const row = transactionList.rows[i];
//     const amountCell = row.cells[1];
//     const typeCell = row.cells[2];

//     if (typeCell.textContent === "Income") {
//       totalIncome += parseFloat(amountCell.textContent);
//       // Current_balance = Current_balance + parseFloat(amountCell.textContent);
//     }
//   }

//   const totalIncomeElement = document.getElementById("total-income");
//   totalIncomeElement.textContent = "Total Income: " + (parseFloat(nettotalIncome) + totalIncome).toFixed(2);
//   total_i=totalIncome;
//   const totalBalance1 = document.getElementById("total-balance");
//   // Update total balance
//   const cur_balance1 =  parseFloat(starting_balance)+totalIncome-total_n; // Update total balance
//   totalBalance1.textContent = "Total Balance: " + cur_balance1.toFixed(2); // Update total balance element

//   // Send an AJAX request to update the server with the new balance
//   $.ajax({
//     url: '/update-balance/',
//     method: 'POST',
//     headers: {
//       'X-CSRFToken': getCookie('csrftoken')
//     },
//     data: {
//       amount: totalIncome.toFixed(2),
//       type: "Income"
//     },
//   });
// }



// // Function to update total deduction
// function updateTotalDeduction() {
//   const transactionList = document.getElementById("transaction-list");
//   let totalDeduction = 0 ;

//   for (let i = 1; i < transactionList.rows.length; i++) {
//     const row = transactionList.rows[i];
//     const amountCell = row.cells[1];
//     const typeCell = row.cells[2];

//     if (typeCell.textContent === "Deduction") {
//       totalDeduction += parseFloat(amountCell.textContent);
//       // Current_balance = Current_balance - parseFloat(amountCell.textContent);
//     }
//   }

//   // nettotalDeduction = nettotalDeduction+totalDeduction;

//   const totalDeductionElement = document.getElementById("total-deduction");
//   totalDeductionElement.textContent =
//     "Total Deduction: " + (parseFloat(nettotalDeduction)+totalDeduction).toFixed(2);
//   total_n=totalDeduction;
//   const totalBalance = document.getElementById("total-balance");
//   // starting_balance = parseFloat(starting_balance) - totalDeduction;
//   const cur_balance = parseFloat(starting_balance) + total_i - totalDeduction;
//   totalBalance.textContent = "Total Balance: " + cur_balance.toFixed(2);

//   $.ajax({
//     url: '/update-balance/',
//     method: 'POST',
//     headers: {
//       'X-CSRFToken': getCookie('csrftoken')
//    },
//     data: {
//         amount: totalDeduction.toFixed(2),
//         type: "Deduction"
//     },
//     });
// }



