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
let isPeeing
/*------------------------ Cached Element References ------------------------*/
// cached buttons
const feedBtn = document.querySelector("#feed-btn")
const playBtn = document.querySelector("#play-btn")
const napBtn = document.querySelector("#nap-btn")
const resetBtn = document.querySelector("#reset-btn")
const nameSubmitBtn = document.querySelector("#submit-name")
const peeBtn = document.querySelector("#pee-btn")
// user input
const nameInput = document.querySelector("#name-input")
// used to control animation renders
const animationImg = document.querySelector("#animation")
const healthProgressBar = document.querySelector(".health-progress-bar-fill")
const hungerProgressBar = document.querySelector(".hunger-progress-bar-fill")
const bladderProgressBar = document.querySelector(".bladder-progress-bar-fill")
const sleepyProgressBar = document.querySelector(".sleepy-progress-bar-fill")
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
const gameOverImage = "../assets/game-over.png"
const peeAnimation = "../assets/pee-animation.gif"
const gettingSleepingAnimation = "../assets/getting-sleepy-animation.gif"
/*----------------------------- Event Listeners -----------------------------*/
feedBtn.addEventListener('click', feedPet)
playBtn.addEventListener('click', playPet)
napBtn.addEventListener('click', takeNap)
nameSubmitBtn.addEventListener('click', submitName)
resetBtn.addEventListener('click', reset)
peeBtn.addEventListener('click', goPee)
/*-------------------------------- Functions --------------------------------*/
init()


function init(){
  healthMeter = 1
  healthProgressBar.setAttribute("style", "width: 10%;")
  hungerProgressBar.setAttribute("style", "width: 10%;")
  bladderProgressBar.setAttribute("style", "width: 10%;")
  sleepyProgressBar.setAttribute("style", "width: 10%;")
  petWeight = 1
  isNapping = false
  isPlaying = false
  gameOver = false
  setInitialFoodQuantity()
  updateHealthMeter()
  // uncomment out if pet weight functionality is added
  // updatePetWeight()
  // need to add initial animation with id of #animation
}

function setInitialFoodQuantity(){
  foodSupply = 1
  foodSupplyEl.textContent = ("Food Supply: " + foodSupply)
}

function render(){
  updateHealthMeter()
  updateFoodSupply()
  // updatePetWeight()
}

function updateHealthMeter(){
  if(healthMeter >= 10){
    alertsPanelEl.textContent = (petName + " has Been Successfully Raised")
    confetti.start(1500)
    healthProgressBar.setAttribute(`style`, `width: ${healthMeter}0%;`)
    updateAnimation(happyAnimation)
    gameOver = true
    clearInterval(hungerTimer)
    clearInterval(bladderTimer)
    clearInterval(sleepyTimer)
  } else {
    console.log('health meter: ' + healthMeter)
    healthProgressBar.setAttribute(`style`, `width: ${healthMeter}0%;`)
  }
  
}
function updateFoodSupply(){
  foodSupplyEl.textContent = ("Food Supply: " + foodSupply)
}
// if pet weight tracking is needed uncomment this out
// function updatePetWeight(){
//   petWeightEl.textContent = ("Pet Weight: " + petWeight)
// }

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
  // hunger timer  
  let hungerTimeLeft = 10 // time in seconds of how long between each hunger meter increase // if you change this variable, you must change it in the timer function below
  let hungerInterval = 10 // percentage points to increase hunger meter when timer expires
  let hungerTimer = setInterval(() => {
    console.log("hungerTimeLeft " + hungerTimeLeft)
    hungerTimeLeft -= 1
    if(hungerInterval === 100){
      gameOver = true 
      updateAnimation(gameOverImage)
      alertsPanelEl.textContent = petName + " is Playing Dead - Please Reset"
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    if(hungerTimeLeft === -1){
      hungerTimeLeft = 10
      hungerInterval += 10
      hungerProgressBar.setAttribute("style", `width: ${hungerInterval}%;`)
    }
    if(hungerInterval === 90 && hungerTimeLeft === 10){
      actionOccuring == true
      healthMeter--
      render()
      alertsPanelEl.textContent = petName + " is Hungry"
      updateAnimation(hungryAnimation)
    }
  }, 1000);
  // bladder meter  
  let bladderTimeLeft = 10 // time in seconds of how long between each bladder meter increase // if you change this variable, you must change it in the timer function below
  let bladderInterval = 10 // percentage points to increase bladder meter when timer expires
  let bladderTimer = setInterval(() => {
    console.log("bladderTimeLeft: " + bladderTimeLeft)
    bladderTimeLeft -= 1
    if(bladderInterval === 100){
      gameOver = true 
      updateAnimation(peeAnimation)
      alertsPanelEl.textContent = petName + " Had an Accident - Please Reset"
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    if(bladderTimeLeft === -1){
      bladderTimeLeft = 10
      bladderInterval += 10
      bladderProgressBar.setAttribute("style", `width: ${bladderInterval}%;`)
    }
    if(bladderInterval === 80 && bladderTimeLeft === 10){
      healthMeter--
      render()
      actionOccuring == true // probably need to add a timer to set this as false
      alertsPanelEl.textContent = petName + " needs to go #1"
    }
  }, 1000);
  // sleepy meter 
  let sleepyTimeLeft = 10 // time in seconds of how long between each sleepy meter increase // if you change this variable, you must change it in the timer function below
  let sleepyInterval = 10 // percentage points to increase bladder meter when timer expires
  let sleepyTimer = setInterval(() => {
    console.log("sleepyTimeLeft: " + sleepyTimeLeft)
    sleepyTimeLeft -= 1
    if(sleepyInterval === 100){
      gameOver = true 
      updateAnimation(gameOverImage)
      alertsPanelEl.textContent = petName + " is Playing Dead - Please Reset"
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    if(sleepyTimeLeft === -1){
      sleepyTimeLeft = 10
      sleepyInterval += 10
      sleepyProgressBar.setAttribute("style", `width: ${sleepyInterval}%;`)
    }
    if(sleepyInterval === 70 && sleepyTimeLeft === 10){
      actionOccuring == true // probably need to add a timer to set this as false
      console.log("Sleepy time left: " + sleepyTimeLeft)
      healthMeter--
      render()
      alertsPanelEl.textContent = petName + " is Getting Sleepy"
      updateAnimation(gettingSleepingAnimation)
    }
  }, 1000);
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
        alertsPanelEl.textContent = petName + " is Done Eating"
      }, 5600)
      setTimeout(() => {
        alertsPanelEl.textContent = ""
      }, 7600)
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
    sleepyInterval = 0
    sleepyProgressBar.setAttribute("style", `width: ${sleepyInterval}%;`)
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
    }, 7000)
    // add play animation
  }
}

function goPee(){
  if(isPeeing === true){
    alertsPanelEl.textContent = (petName + " is Already Peeing")
  } else if(gameOver === true){
    alertsPanelEl.textContent = ("Game Over: Please Reset")
  } else if(actionOccuring === true){
    alertsPanelEl.textContent = ("Please Wait")
  } else {
    actionOccuring = true
    healthMeter++
    bladderInterval = 0
    bladderProgressBar.setAttribute("style", `width: ${bladderInterval}%;`)
    isPeeing = true
    alertsPanelEl.textContent = (petName + " went #1")
    render()
    updateAnimation(peeAnimation)
    setTimeout(() => {
      updateAnimation(leftFacingAnimation)
      isPeeing = false
      actionOccuring = false
    }, 1200)
    setTimeout(() => {
      alertsPanelEl.textContent = ""
    }, 3200)
  }
}

