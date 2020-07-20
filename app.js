window.addEventListener("load", () => {
  const categorySetBtn = document.querySelector(".category-set");
  categorySetBtn.addEventListener("click", () => checkBudget());

  const budgetAddBtn = document.querySelector(".budget-add");
  budgetAddBtn.addEventListener("click", () => addBudget());

  const itemAddBtn = document.querySelector(".item-add");
  itemAddBtn.addEventListener("click", () => setCategorySpent());

  const currentDate = getDate();
  const dateElm = document.querySelector("#current-date");
  dateElm.textContent = currentDate;
});

function getDate() {
  const date = new Date().toISOString().slice(0, 10);
  return date;
}

function addBudget() {
  const budgetAmountInputElm = document.querySelector(".budget-input");
  const budgetAmountInput = Number(budgetAmountInputElm.value);

  const budgetElm = document.querySelector("#total-budget");
  const budgetAmount = Number(budgetElm.textContent);
  const total = budgetAmount + budgetAmountInput;
  budgetElm.textContent = `${total}`;
  budgetAmountInputElm.value = "";
  // we call the function here so that our savings update as soon as we have a budget set
  calcSavings(total);
}

function checkBudget() {
  const budgetElm = document.querySelector("#allowance");
  const budgetAmount = Number(budgetElm.textContent);
  const categoryTextInput = document.querySelector(".category-input-text");
  const newCategoryAmount = document.querySelector(".category-input-amount");

  const totalBudgetElm = document.querySelector("#total-budget");
  const totalBudgetAmount = Number(totalBudgetElm.textContent);

  if (totalBudgetAmount) {
    const budgetInput = Number(newCategoryAmount.value);
    if (budgetInput > budgetAmount) {
      categoryTextInput.value = "";
      categoryTextInput.placeholder = "Budget not sufficient";
    } else {
      validateCategory(totalBudgetAmount, budgetInput);
      categoryTextInput.value = "";
      newCategoryAmount.value = "";
    }
  }
}

function validateCategory(totalBudget, categoryValue) {
  const categoryTextInput = document.querySelector(".category-input-text");
  const categoryNames = document.querySelectorAll(".category-name");
  const categoryNamesArray = Array.from(categoryNames);

  const duplicate = categoryNamesArray.filter(
    (category) => categoryTextInput.value === category.textContent
  );
  if (duplicate.length > 0) {
    // display duplicate message
    categoryTextInput.value = "";
    categoryTextInput.placeholder = "Category Already Exists";
  } else {
    // call addCategory function
    addOption(categoryTextInput.value);
    addCategory(categoryTextInput.value, categoryValue);

    // we call the function here so that our savings update every time we add a new category (limit)
    const totalExpense = calcSavings(totalBudget);
    setTotalExpense(totalExpense);
  }
}

function addOption(text) {
  // <option value="food">food</option>
  const categorySelector = document.querySelector("#category-selector");
  const itemInputText = document.querySelector(".item-input-text");
  const itemInputAmount = document.querySelector(".item-input-amount");
  const addItemBtn = document.querySelector(".item-add");

  if (categorySelector.disabled) categorySelector.disabled = false;
  if (itemInputText.disabled) itemInputText.disabled = false;
  if (itemInputAmount.disabled) itemInputAmount.disabled = false;
  if (addItemBtn.disabled) addItemBtn.disabled = false;

  const newOption = document.createElement("option");
  newOption.textContent = text;
  newOption.value = text;
  categorySelector.appendChild(newOption);
}

function addCategory(name, limit) {
  const categoryContainer = document.querySelector(".category-container");
  // Create all your elements
  const addDiv = document.createElement("div");
  const addH4 = document.createElement("h5");
  const addP1 = document.createElement("p");
  const addP2 = document.createElement("p");

  // add any class names to the elements we created
  addDiv.classList.add("category");
  addH4.classList.add("category-name");
  addP1.classList.add(`limit`, `${name}`);
  addP2.classList.add(`spent`, `${name}`);

  // add any text that is needed in any elements
  addH4.textContent = name;
  addP1.textContent = limit;
  addP2.textContent = 0000;

  // created the nested structure of the HTML
  const newCategory = categoryContainer.appendChild(addDiv);
  newCategory.appendChild(addH4);
  newCategory.appendChild(addP1);
  newCategory.appendChild(addP2);
}

function calcSavings(totalBudget) {
  //query the savings element
  const savingsElm = document.querySelector(".savings p");
  //query every p element with the class of limit
  const limitElm = document.querySelectorAll(".limit"); // type NodeList -> Array.proto.forEach()
  const totalSavingsAmount = [];
  limitElm.forEach((elm) => {
    // loop  though each limitElm and convert it's textContent to a number
    const limitAmount = Number(elm.textContent);
    // push that number to the array TotalCategoryAmount
    totalSavingsAmount.push(limitAmount);
  });

  // set the savings element textContent to the totalBudget (which we will get from
  // the checkBudget and the addBudget functions) + the sum of the totalCategoryAmount array
  const total = totalSavingsAmount.reduce((a, b) => a + b, 0);
  savingsElm.textContent = totalBudget - total;

  return total;
}

function setTotalExpense(TotalExpense) {
  const totalExpenseElm = document.querySelector(".total-expense p");

  const total = TotalExpense;
  totalExpenseElm.textContent = total;
}

function setCurrentExpense() {
  const currentExpenseElm = document.querySelector(".current-expense p");
  //query every p element with the class of spent
  const spnetElm = document.querySelectorAll(".spent");
  const totalSpentAmount = [];
  spnetElm.forEach((elm) => {
    const spentAmount = Number(elm.textContent);
    totalSpentAmount.push(spentAmount);
  });
  const total = totalSpentAmount.reduce((a, b) => a + b, 0);
  currentExpenseElm.textContent = total;
  setLeftOver(total);
}

function setLeftOver(CurrentExpense) {
  const leftOverElm = document.querySelector(".left-over p");
  const totalExpenseElm = document.querySelectorAll(".limit");
  const totalExpenseArr = [];

  totalExpenseElm.forEach((elm) => {
    const item = Number(elm.textContent);
    totalExpenseArr.push(item);
    const totalExpense = totalExpenseArr.reduce((a, b) => a + b, 0);
    const total = totalExpense - CurrentExpense;
    leftOverElm.textContent = total;
  });
}

function setCategorySpent() {
  const itemInputText = document.querySelector(".item-input-text");
  const itemInputAmount = document.querySelector(".item-input-amount");
  const thisOptionText = getOptionText();

  const catLimitElm = document.querySelectorAll(".limit");
  let catLimit = 0;
  const catSpentElm = document.querySelectorAll(".spent");
  let catSpent = 0;

  catLimitElm.forEach((elm) => {
    if (elm.classList.contains(thisOptionText)) {
      const item = Number(elm.textContent);
      catLimit = item;
    }
  });
  catSpentElm.forEach((elm) => {
    if (elm.classList.contains(thisOptionText)) {
      const item = Number(elm.textContent);
      catSpent = item;
      const remain = catLimit - catSpent;
      if (Number(itemInputAmount.value) > remain) {
        itemInputText.value = "No no";
      } else {
        elm.textContent = catSpent + Number(itemInputAmount.value);
        addItem(thisOptionText, itemInputAmount, itemInputText);
        setCurrentExpense();
      }
    }
  });
}

function addItem(option, amount, desc) {
  const expenseContainer = document.querySelector(".expense-table");
  const currentDate = getDate();
  // Create all your elements
  const addTr = document.createElement("tr");
  const addTh1 = document.createElement("th");
  const addTh2 = document.createElement("th");
  const addTh3 = document.createElement("th");
  const addTh4 = document.createElement("th");

  // add any class names to the elements we created
  addTr.classList.add("expense-data");
  addTh1.classList.add(`category-header`);
  addTh2.classList.add(`amount-header`, `${option}`);
  addTh3.classList.add("desk-header");
  addTh4.classList.add("date-header");

  // add any text that is needed in any elements
  addTh1.textContent = option;
  addTh2.textContent = `$ ${amount.value}`;
  addTh3.textContent = desc.value;
  addTh4.textContent = currentDate;

  // created the nested structure of the HTML
  const newItem = expenseContainer.appendChild(addTr);
  newItem.appendChild(addTh1);
  newItem.appendChild(addTh2);
  newItem.appendChild(addTh3);
  newItem.appendChild(addTh4);
  amount.value = "";
  desc.value = "";
}

function getOptionText() {
  const itemCategoryText = document.getElementById("category-selector");
  const opt = itemCategoryText.options[itemCategoryText.selectedIndex];
  return opt.value;
}
