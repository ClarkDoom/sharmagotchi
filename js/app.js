/*-------------------------------- Constants --------------------------------*/

// not sure if this should be a constantr

/*---------------------------- Variables (state) ----------------------------*/
let petName
let foodSupply
let healthMeter
let petWeight
let isSleeping
let isPlaying
let isEating
let actionOccuring
/*------------------------ Cached Element References ------------------------*/
// cached buttons
const feedBtn = document.querySelector("#feed-btn")
const playBtn = document.querySelector("#play-btn")
const napBtn = document.querySelector("#nap-btn")
const resetBtn = document.querySelector("#reset-btn")
const nameSubmitBtn = document.querySelector("#submit-name")
// user input
const nameInput = document.querySelector("#name-input")
// used to control animation renders
const animationImg = document.querySelector("#animation")
const healthProgressBar = document.querySelector(".health-progress-bar-fill")
const hungerProgressBar = document.querySelector(".hunger-progress-bar-fill")
// primary ui elements
const nameEl = document.querySelector("#name")
const statsPanelEl = document.querySelector(".stats-panel")
const foodSupplyEl = document.querySelector("#food-supply")
const alertsPanelEl = document.querySelector("#alerts-panel")
const healthMeterEl = document.querySelector("#health-meter")
const petWeightEl = document.querySelector("#pet-weight")
const mainDisplayEl = document.querySelector(".main-display")
// cached animations
const leftFacingAnimation = "../assets/left-facing.png"
const happyAnimation = "../assets/happy-animation.gif"
const eatingAnimation = "../assets/eating-animation.gif"
const sleepingAnimation = "../assets/sleeping-animation.gif"
const playingAnimation = "../assets/playing-animation.gif"
const hungryAnimation = "../assets/hungry-animation.gif"
/*----------------------------- Event Listeners -----------------------------*/
feedBtn.addEventListener('click', feedPet)
playBtn.addEventListener('click', playPet)
napBtn.addEventListener('click', takeNap)
nameSubmitBtn.addEventListener('click', submitName)
resetBtn.addEventListener('click', reset)
/*-------------------------------- Functions --------------------------------*/
init()


function init(){
  healthMeter = 1
  healthProgressBar.setAttribute("style", "width: 10%;")
  hungerProgressBar.setAttribute("style", "width: 10%;")
  petWeight = 1
  isNapping = false
  isPlaying = false
  gameOver = false
  setInitialFoodQuantity()
  updateHealthMeter()
  updatePetWeight()
  // need to add initial animation with id of #animation
}

function setInitialFoodQuantity(){
  foodSupply = 1
  foodSupplyEl.textContent = ("Food Supply: " + foodSupply)
}

function render(){
  updateHealthMeter()
  updateFoodSupply()
  updatePetWeight()
}

function updateHealthMeter(){
  healthMeterEl.textContent = ("Health Meter:")
  healthProgressBar.setAttribute(`style`, `width: ${healthMeter}0%;`)
  
}
function updateFoodSupply(){
  foodSupplyEl.textContent = ("Food Supply: " + foodSupply)
}
function updatePetWeight(){
  petWeightEl.textContent = ("Pet Weight: " + petWeight)
}

function updateAnimation(animationName){
  document.querySelector(".main-display").removeChild(document.querySelector("#animation"))
  let updatedAnimation = document.createElement("img")
  updatedAnimation.setAttribute("src", animationName)
  updatedAnimation.setAttribute('width', "40%")
  updatedAnimation.setAttribute("id","animation")
  mainDisplayEl.appendChild(updatedAnimation)
}

function reset(){
  location.reload();
  return false;
}

function submitName(){
  petName = nameInput.value
  nameEl.textContent = ("Name: "+ petName)
  statsPanelEl.removeChild(nameInput)
  statsPanelEl.removeChild(nameSubmitBtn)
  confetti.start(1500)
  updateAnimation(happyAnimation)
  setTimeout(() => {
    updateAnimation(leftFacingAnimation)
  }, 3000)
  alertsPanelEl.textContent = ("You Named your Pet " + petName)
  setTimeout(() => {
    alertsPanelEl.textContent = ""
  }, 5000)
}

function feedPet(){
  if(isEating === true){
    alertsPanelEl.textContent = (petName + " is Already Eating")
  } else if(gameOver === true){
    alertsPanelEl.textContent = ("Game Over: Please Reset")
  } else if(actionOccuring === true){
    alertsPanelEl.textContent = ("Please Wait")
  } else {
    if(foodSupply >=1){
      actionOccuring = true
      foodSupply--
      healthMeter++
      petWeight++
      hungerInterval = 0
      hungerProgressBar.setAttribute("style", `width: ${hungerInterval}%;`)
      isEating = true
      alertsPanelEl.textContent = ("You Fed " + petName)
      render()
      updateAnimation(eatingAnimation)
      setTimeout(() => {
        updateAnimation(leftFacingAnimation)
        isEating = false
        actionOccuring = false
      }, 1550)
      setTimeout(() => {
        alertsPanelEl.textContent = ""
      }, 5600)
    } else {
      // if time, put a sad dog animation
      alertsPanelEl.textContent = " not enough food"
    }
  }
}

// level up by having a sleepy meter to indicate when your pet needs sleep
function takeNap(){
  // use timer to increment a sleep bar, if sleep bar is filled you lose, taking naps erases sleep bar
  // add sleepy meter
  if(isNapping === true){
    alertsPanelEl.textContent = (petName + " is Already Napping")
  } else if(gameOver === true){
    alertsPanelEl.textContent = ("Game Over: Please Reset")
  } else if(actionOccuring === true){
    alertsPanelEl.textContent = ("Please Wait")
  } else {
    actionOccuring = true
    healthMeter++
    foodSupply++
    isNapping = true
    render()
    updateAnimation(sleepingAnimation)
    alertsPanelEl.textContent = (petName + " is Napping")
    setTimeout(() => {
      updateAnimation(leftFacingAnimation)
      alertsPanelEl.textContent = (petName +" is Done Napping")
      isNapping = false
      actionOccuring = false
    }, 6800)
    setTimeout(() => {
      alertsPanelEl.textContent = ""
    }, 8800)
  }
}

//* create a function that will allow user to play with their pet, incrementing health meter, triggering a play animation ('shar-ing' aka zoomies)

function playPet(){
  if(isPlaying === true){
    alertsPanelEl.textContent = (petName + " is Already Playing")
  }else if(gameOver === true){
    alertsPanelEl.textContent = ("Game Over: Please Reset")
  } else if(actionOccuring === true){
    alertsPanelEl.textContent = ("Please Wait")
  } else {
    actionOccuring = true
    foodSupply++
    healthMeter++
    isPlaying = true
    updateAnimation(playingAnimation)
    alertsPanelEl.textContent = (petName + " is Playing")
    render()
    setTimeout(() => {
      isPlaying = false
      actionOccuring = false
      updateAnimation(leftFacingAnimation)
      alertsPanelEl.textContent = (petName + " is Done Playing")
    }, 5000)
    setTimeout(() => {
      alertsPanelEl.textContent = ""
    }, 10000)
    // add play animation
  }
}

// hunger timer experiment 


let timeLeft = 15
let hungerInterval = 40

// i'd like this timer to not start until the name submit button has been hit
let hungerTimer = setInterval(() => {
  console.log(timeLeft)
  timeLeft -= 1
  if(hungerInterval === 100){
    gameOver = true 
    alertsPanelEl.textContent = petName + " Has Starved - Please Reset"
  }
  if(timeLeft === -1){
    timeLeft = 15
    hungerInterval += 10
    hungerProgressBar.setAttribute("style", `width: ${hungerInterval}%;`)
  }
  if(hungerInterval === 50 || hungerInterval === 70 || hungerInterval === 90){
    actionOccuring == true
    alertsPanelEl.textContent = petName + " is Hungry"
    updateAnimation(hungryAnimation)
  }
}, 1000);