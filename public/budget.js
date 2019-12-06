
// --- ListFrom Reference
const selected = document.getElementById('selected');
const description = document.getElementById('inputDescrption');
const amount = document.getElementById('inputNumber');
const checkButtn = document.querySelector('.fa-check-circle');

// --- List Reference 
const ulIncomesList = document.getElementById('incomeul');
const ulExpList = document.getElementById('expensesul');

// --- Header Reference 
const incomeValue = document.getElementById('h_incom');
const expenseValue = document.getElementById('h_expenses');
const balanceValue = document.getElementById('h_balannce')
const percentegeForExp = document.getElementById('percentage');

// --- varibles 
let sumIncome = 0
let sumexpenses = 0;
let sumtotal = 0;
// --- create date

let date = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("dateheder").innerHTML += months[date.getMonth()];
document.getElementById("dateheder").innerHTML += date.getFullYear();

// --- post function
function createBalance() {
    const description = document.getElementById('inputDescrption').value;
    const amount = Number(document.getElementById('inputNumber').value);
    let url;
    if (isNaN(description) & amount > 0) {
        url = (selected.value == '+') ? "incomes" : "expenses";
    }
    axios.post(`/${url}`, {
        description: description,
        amount: amount
    })
        .then(function (response) {
            // --- todo check status code is 201.
            if (response.status === 201) {
                createAndShowElements(url, response.data);
            }
            // --- if yes -> add to dom ,else issue error
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(`/${url}`);
}
// --- delete function
function deleteById(url, id, thisObject) {
    axios.delete(`/${url}/${id}`)
        .then(function (response) {
            // handle success
            // --- todo check status code is 200 .
            // --- if yes -> delete from dom , else issue error
            if (response.status == 200) {
                let li = thisObject.closest('li');
                if (url == "incomes") {
                    const parent = li.parentElement;
                    let incomeNum = li.children[1].innerText;
                    sumIncome -= Number(incomeNum);
                    incomeValue.innerText = `INCOME +${sumIncome}.00`;
                    // --- remove from dom
                    parent.removeChild(li);
                    percentageCalculator();
                } else {
                    const parent = li.parentElement;
                    let expensesNum = li.children[1].innerText;
                    sumexpenses -= Number(expensesNum);
                    expenseValue.innerText = `EXPENSES -${sumexpenses}.00`;
                    parent.removeChild(li);
                    percentageCalculator();
                }
                updateTotalBalance();
            }
            else {
                console.log(`got error code from server : ${response.status}`);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
// --- create function use for create and show 
function createAndShowElements(url, element) {
    let ulIncomesList = document.getElementById('incomeul');
    let ulExpList = document.getElementById('expensesul');
    // --- create li
    let itemElement = document.createElement('li');
    // --- create span
    const description = document.createElement('span');
    description.innerText = element.description;
    itemElement.appendChild(description);
    const amount = document.createElement('span');
    amount.innerText = element.amount;
    itemElement.appendChild(amount);
    const icon = document.createElement('i');
    icon.classList.add("far");
    icon.classList.add("fa-times-circle");
    icon.classList.add("delete");
    itemElement.appendChild(icon);
    // --- create classList for use with them in css
    itemElement.classList.add('itemElement');
    amount.classList.add('amount');
    description.classList.add('description');

    if (url == "incomes") {
        ulIncomesList.appendChild(itemElement);
        sumIncome += Number(element.amount);
        incomeValue.innerText = `INCOME +${sumIncome}.00`;
        percentageCalculator();
    }
    else {
        ulExpList.appendChild(itemElement);
        sumexpenses += Number(element.amount);
        expenseValue.innerText = `EXPENSES -${sumexpenses}.00`;
        percentageCalculator()
    }
    icon.onclick = function () {
        deleteById(url, element.id, this);
    }
    updateTotalBalance();
}
// --- get function
function get(url) {
    axios.get(`/${url}`)
        .then(function (response) {
            // handle success
            // --- todo check status code is 200 .
            if (response.status === 200) {
                // --- if yes -> show incomes or outcome 
                let array = response.data;
                console.log(response);
                array.forEach(element => {
                    createAndShowElements(url, element);
                });
            }
        })
        .catch(function (error) {
            // handle error else issue error
            console.log(error);
        })
    updateTotalBalance();
}
// ---  invocing the get function
get('incomes');
get('expenses');
// --- add update to total Balance
function updateTotalBalance() {
    sumtotal = sumIncome - sumexpenses;
    if (sumtotal > 0) {
        balanceValue.innerText = `+${sumtotal}.00`;
    }
    else {
        balanceValue.innerText = `${sumtotal}.00`;
    }
};
// --- add percentage
function percentageCalculator() {
    let percentage = 0;
    percentage = `${Math.floor(( 100 * Number(sumexpenses)) / Number(sumIncome))}`;
    if (isNaN(percentage) || percentage == Infinity) {
        percentegeForExp.innerText = "0%"
    } else {    
        percentegeForExp.innerText = `${percentage}%`;
    }
}
// --- change frame color for input
function addColore(e) {
    if (e.type == 'focus') {
        if (selected.value == '+') {
            e.target.style.border = "3px solid green";
        }
        else {
            e.target.style.border = "3px solid red";

        }
    }
    else if (e.type == 'focusout') {
        e.target.style.border = '';
    }

    checkButtn.style.color = "black";
}
description.addEventListener('focus', function (e) {
    addColore(e);
})
amount.addEventListener('focus', function (e) {
    addColore(e);
})
amount.addEventListener('focusout', function (e) {
    addColore(e);
})
description.addEventListener('focusout', function (e) {
    addColore(e);
})
checkButtn.addEventListener('click', function () {

    if (selected.value == '+') {
        this.style.color = "green";
    }
    else{
        this.style.color = "red";
    }

})

