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
  const leftOverElm = document.querySelector(".left-over p");
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
    leftOverElm.textContent = totalExpense;
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
        itemInputText.value = "";
        itemInputText.placeholder = "Budget not sufficient";
      } else {
        const NewAmount = catSpent + Number(itemInputAmount.value);
        elm.textContent = NewAmount;
        addItem(thisOptionText, itemInputAmount, itemInputText);
        deleteItem(elm, NewAmount);
        setCurrentExpense();
      }
    }
  });
}

function addItem(option, amount, desc) {
  const expenseContainer = document.querySelector(".expense-container");
  const currentDate = getDate();
  // Create all your elements
  const addDiv = document.createElement("div");
  const addP1 = document.createElement("p");
  const addP2 = document.createElement("p");
  const addP3 = document.createElement("p");
  const addP4 = document.createElement("p");
  const addBtn1 = document.createElement("button");
  const addBtn2 = document.createElement("button");

  // add any class names to the elements we created
  addDiv.classList.add("expense-data");
  addP1.classList.add(`category-header`);
  addP2.classList.add(`amount-header`, `${option}`);
  addP3.classList.add("desc-header");
  addP4.classList.add("date-header");
  addBtn1.classList.add("deleteBtn");
  addBtn2.classList.add("modifyBtn");

  // add any text that is needed in any elements
  addP1.textContent = `CAT: ${option}`;
  addP2.textContent = `AMT: ${amount.value}`;
  addP3.textContent = `DES: ${desc.value}`;
  addP4.textContent = `DoT: ${currentDate}`;
  addBtn1.textContent = "DEL";
  addBtn2.textContent = "MOD";

  // created the nested structure of the HTML
  const newItem = expenseContainer.appendChild(addDiv);
  newItem.appendChild(addBtn1);
  newItem.appendChild(addBtn2);
  newItem.appendChild(addP1);
  newItem.appendChild(addP2);
  newItem.appendChild(addP3);
  newItem.appendChild(addP4);
  amount.value = "";
  desc.value = "";
  desc.placeholder = "Add a descreption";
}

function getOptionText() {
  const itemCategoryText = document.getElementById("category-selector");
  const opt = itemCategoryText.options[itemCategoryText.selectedIndex];
  return opt.value;
}

function deleteItem(elm, oldAmount) {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((expense) => {
    expense.addEventListener("click", (e) => {
      const item = e.target;
      const div = item.parentElement;
      const rAmountElm = div.childNodes[3].textContent;
      const rAmountReg = rAmountElm.match(/(\d+)/);
      const rAmount = Number(rAmountReg[0]);
      elm.textContent = oldAmount - rAmount;
      div.remove();
    });
  });
}
