/*-------------------------------- Constants --------------------------------*/

// not sure if this should be a constantr
let petName


/*---------------------------- Variables (state) ----------------------------*/

let foodSupply
let healthMeter
let petWeight
let isSleeping
let isPlaying


/*------------------------ Cached Element References ------------------------*/

const feedBtn = document.querySelector("#feed-btn")
const playBtn = document.querySelector("#play-btn")
const napBtn = document.querySelector("#nap-btn")
const resetBtn = document.querySelector("#reset-btn")
const nameSubmitBtn = document.querySelector("#submit-name")
// just edited this, was looking at the wrong thing
const nameEl = document.querySelector("#name")
const statsPanel = document.querySelector(".stats-panel")
const nameInput = document.querySelector("#name-input")
const foodSupplyEl = document.querySelector("#food-supply")
const alertsPanelEl = document.querySelector("#alerts-panel")
const healthMeterEl = document.querySelector("#health-meter")
const petWeightEl = document.querySelector("#pet-weight")

/*----------------------------- Event Listeners -----------------------------*/

feedBtn.addEventListener('click', feedPet)
playBtn.addEventListener('click', playPet)
napBtn.addEventListener('click', takeNap)
nameSubmitBtn.addEventListener('click', submitName)
resetBtn.addEventListener('click', reset)

// quick tests to ensure buttons work
// function feedPet(){
//   console.log("button works")
// }
function playPet(){
  console.log("button works")
}
function takeNap(){
  console.log("button works")
}

/*-------------------------------- Functions --------------------------------*/
init()

// create a function to initialize the game

function init(){
  healthMeter = 1
  petWeight = 1
  isSleeping = false
  isPlaying = false
  setInitialFoodQuantity()
  updateHealthMeter()
  updatePetWeight()
}

//* create a function that sets an inital quantiy of food items, store this quantity in a variable, update the ui

function setInitialFoodQuantity(){
  foodSupply = 1
  foodSupplyEl.textContent = ("Food Supply: " + foodSupply)
}

// create a function to render game state

function render(){
  updateHealthMeter()
  updateFoodSupply()
  updatePetWeight()
}

function updateHealthMeter(){
  healthMeterEl.textContent = ("Health Meter: " + healthMeter)
}

function updateFoodSupply(){
  foodSupplyEl.textContent = ("Food Supply: " + foodSupply)
}

function updatePetWeight(){
  petWeightEl.textContent = ("Pet Weight: " + petWeight)
}

// create a function that prompts the user to input a name for their pet, store the name in a variable to display in UI, trigger confetti or another celebratory animation

function submitName(){
  console.log("button works")
  petName = nameInput.value
  console.log(petName)
  nameEl.textContent = ("Name: "+ petName)
  statsPanel.removeChild(nameInput)
  statsPanel.removeChild(nameSubmitBtn)
  confetti.start(1500)
  alertsPanelEl.textContent = "Pet Name Submitted"
  // add timer to remove alert
  // need to add happy animation
}

// create a function that will allow a user to feed their pet and increment the pet's health meter, increment the pets weight, and decrement the user's food supply, update health meter/pet weight/food supply in UI, trigger a happy pet animation

function feedPet(){
  if(foodSupply >=1){
    foodSupply--
    healthMeter++
    petWeight++
    render()
  } else {
    alertsPanelEl.textContent = " not enough food"
  }
}

// create a function that will decrement the pet's health meter if neglected (left for a certain period of time without activity), update health meter in UI, trigger a sad pet animation


// create a function that will allow your pet to take a nap, incrementing health meter, displaying in UI and triggering an animation // level up by having a sleepy meter to indicate when your pet needs sleep

function takeNap(){
  // maybe setup a timer that says you can't take a nap but x times every x minutes
  healthMeter++
  render()
  // add animation 
  // add sleepy meter
}

// create a function that will allow user to play with their pet, incrementing health meter, triggering a play animation ('shar-ing' aka zoomies)

function playPet(){
  // maybe setup a timer that says you can't take a nap but x times every x minutes
  healthMeter
}

// create a function to reset pet stats so that a user can start over, include a "are you sure?" prompt

function reset(){
  init()
}

// create a function that increases pet's age every x interval

// LEVEL UP IDEA: Create a function that triggers a 'chew bone' animation and increments pet's health, separate animation from the standard eating animation 

// LEVEL UP IDEA: Create a function that allows a pet to go to the bathroom, must include functionality that raises pet's bladder level and displays onscreen, health meter decrements by x amount during a specific time frequency if bladder is full and the pet hasn't relieved themselves, trigger animation for using restroom or animation of 'having an accident' if the bladder is left full for too long


