
window.addEventListener("load", () => {

    const categorySetBtn = document.querySelector(".category-set")
    categorySetBtn.addEventListener("click", () => checkBudget())
    
    const budgetAddBtn = document.querySelector(".budget-add")
    budgetAddBtn.addEventListener("click", () => addBudget())

})

function addBudget(){
    
    const budgetAmountInputElm = document.querySelector(".budget-input")
    const budgetAmountInput = Number(budgetAmountInputElm.value)
    
    const budgetElm = document.querySelector("#monthly-budget")
    const budgetAmount = Number(budgetElm.textContent)
    const total = budgetAmount + budgetAmountInput
    budgetElm.textContent = `${total}`
    budgetAmountInputElm.value = ""
}

function checkBudget(){
    
    const budgetElm = document.querySelector("#monthly-budget")
    const budgetAmount = Number(budgetElm.textContent)

    const categoryTextInput = document.querySelector(".category-input-text")
    const budgetInputElm = document.querySelector(".category-input-amount")

    if(budgetInputElm.value){
        const budgetInput = Number(budgetInputElm.value)
        if(budgetInput >= budgetAmount) {
            categoryTextInput.value = ""
            categoryTextInput.placeholder = "Budget not sufficient"
        } else {
            // call addCategory function
            addOption(categoryTextInput.value)
            addCategory(categoryTextInput.value, budgetInput)
        }
    }

}

function addOption(text){
    // <option value="food">food</option>
    const categorySelector = document.querySelector("#category-selector")
    const itemInput = document.querySelector(".item-input")
    const addItemBtn = document.querySelector(".item-add") 
    
    if(categorySelector.disabled) categorySelector.disabled = false;
    if(itemInput.disabled) itemInput.disabled = false;
    if(addItemBtn.disabled) addItemBtn.disabled = false;

    const newOption = document.createElement("option")
    newOption.textContent = text
    newOption.value = text
    categorySelector.appendChild(newOption)
}

function addCategory(name, limit) {
    // <div class="category">
    //     <h4>Category1</h4>
    //     <p class="limit">0000</p>
    //     <p class="spent">0000</p>
    // </div>
    const categoryContainer = document.querySelector(".category-container")
    // Create all your elements
    const addDiv = document.createElement("div")
    const addH4 = document.createElement("h4")
    const addP1 = document.createElement("p")
    const addP2 = document.createElement("p")

    // add any class names to the elements we created
    addDiv.classList.add("category")
    addP1.classList.add("limit")
    addP2.classList.add("spent")

    // add any text that is needed in any elements
    addH4.textContent = name
    addP1.textContent = limit
    addP2.textContent = 0000

    // created the nested structure of the HTML
    const newCategory = categoryContainer.appendChild(addDiv)
    newCategory.appendChild(addH4)
    newCategory.appendChild(addP1)
    newCategory.appendChild(addP2)
}




