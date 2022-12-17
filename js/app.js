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
  petWeight = 1
  isNapping = false
  isPlaying = false
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
  healthMeterEl.textContent = ("Health Meter: " + healthMeter)
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
  }else {
    if(foodSupply >=1){
      foodSupply--
      healthMeter++
      petWeight++
      isEating = true
      alertsPanelEl.textContent = ("You Fed " + petName)
      render()
      updateAnimation(eatingAnimation)
      setTimeout(() => {
        updateAnimation(leftFacingAnimation)
      }, 5600)
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
  // maybe setup a timer that says you can't take a nap but x times every x minutes
  // add sleepy meter
  if(isNapping === true){
    alertsPanelEl.textContent = (petName + " is Already Napping")
  } else {
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
  } else {
    foodSupply++
    healthMeter++
    isPlaying = true
    alertsPanelEl.textContent = (petName + " is Playing")
    render()
    setTimeout(() => {
      isPlaying = false
      alertsPanelEl.textContent = (petName + " is Done Playing")
    }, 5000)
    setTimeout(() => {
      alertsPanelEl.textContent = ""
    }, 10000)
    // add play animation
  }
}


// create a function that increases pet's age every x interval

// create a function that checks to see if a certain health meter treshold is reached and if it is render a celebration on the main-display (petName as reached doggo Nirvana - have image of meditating pei)

// LEVEL UP IDEA: Create a function that triggers a 'chew bone' animation and increments pet's health, separate animation from the standard eating animation 

// LEVEL UP IDEA: Create a function that allows a pet to go to the bathroom, must include functionality that raises pet's bladder level and displays onscreen, health meter decrements by x amount during a specific time frequency if bladder is full and the pet hasn't relieved themselves, trigger animation for using restroom or animation of 'having an accident' if the bladder is left full for too long

// LEVEL UP IDEA: Create an intial crawl animation of text that tells the store of sharmagotchi being adopted, give him a name, and make sure theyre the happiest pup in the world

// use age to have the width of the dog grow over time

// setup audio snippets for actions in the game

// setup other audio files to not play if isPlaying is true
  // for mute, set audio level to 0 with audiofile.volume = .05
  //audioFile.pause() works

  // LEVEL UP create a function that will decrement the pet's health meter if neglected (left for a certain period of time without activity), update health meter in UI, trigger a sad pet animation

function neglectedPet(){

}