/*-------------------------------- Constants --------------------------------*/

// not sure if this should be a constantr
const journal = []

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

// timer variables
let hungerTimeLeft = 5 // time in seconds of how long between each hunger meter increase // if you change this variable, you must change it in the timer function below
let hungerInterval = 10 // percentage points to increase hunger meter when timer expires
let bladderTimeLeft = 5 // time in seconds of how long between each bladder meter increase // if you change this variable, you must change it in the timer function below
let bladderInterval = 10 // percentage points to increase bladder meter when timer expires
let sleepyTimeLeft = 5 // time in seconds of how long between each sleepy meter increase // if you change this variable, you must change it in the timer function below
let sleepyInterval = 10 // percentage points to increase bladder meter when timer expires
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
const namePanel = document.querySelector("#name-panel")
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
const journalEl = document.querySelector("#journal")
const journalItemsEl = document.querySelector("#journal-items")
// cached animations
const leftFacingAnimation = "../assets/left-facing.gif"
const happyAnimation = "../assets/happy-animation.gif"
const eatingAnimation = "../assets/eating-animation.gif"
const sleepingAnimation = "../assets/sleeping-animation.gif"
const playingAnimation = "../assets/playing-animation.gif"
const hungryAnimation = "../assets/hungry-animation.gif"
const gameOverImage = "../assets/game-over.png"
const peeAnimation = "../assets/pee-animation.gif"
const gettingSleepingAnimation = "../assets/getting-sleepy-animation.gif"
const sadPeiAnimation = "../assets/sad-pei.gif"
// cached audio
const nameSubmitSound = new Audio("../assets/name-submit.mp3")
const notificationUpSound = new Audio("../assets/notification-up.mp3")
const notificationDownSound = new Audio("../assets/notification-down.mp3")
const alertSound = new Audio("../assets/alert-sound.mp3")
const successSound = new Audio("../assets/success-sound.mp3")
const gameOverSound = new Audio("../assets/game-over.mp3")
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
    successSound.volume = .3
    successSound.play()
    alertsPanelEl.textContent = (petName + " has Been Successfully Cared For")
    confetti.start(3000)
    healthProgressBar.setAttribute(`style`, `width: ${healthMeter}0%;`)
    updateAnimation(happyAnimation)
    gameOver = true
    // the below clearIntervals are not working - i believe because the intervals are within the submit name function so there's some sort of scope issue occuring
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
  
  nameSubmitSound.volume = .30
  nameSubmitSound.play()
  petName = nameInput.value
  nameEl.textContent = ("Name: "+ petName)
  namePanel.removeChild(nameInput)
  namePanel.removeChild(nameSubmitBtn)
  confetti.start(1500)
  updateAnimation(happyAnimation)
  setTimeout(() => {
    updateAnimation(leftFacingAnimation)
  }, 3000)
  alertsPanelEl.textContent = ("Have Fun and Good Luck!")
  let li = document.createElement("li")
  let liContent = ("🎉🎊 You Named your Pet " + petName + "!")
  li.innerText = liContent
  journalItemsEl.appendChild(li)
  // setTimeout(() => {
  //   alertsPanelEl.textContent = ""
  // }, 5000)

  //* hunger timer  
  let hungerTimer = setInterval(() => {
    console.log("hungerInterval: " + hungerInterval)
      console.log("hungerTimeLeft: " + hungerTimeLeft)
    if(healthMeter === 10){
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    // console.log("hungerTimeLeft " + hungerTimeLeft)
    hungerTimeLeft -= 1
    if(hungerInterval === 100){
      gameOver = true 
      updateAnimation(gameOverImage)
      gameOverSound.volume = .1
      gameOverSound.play()
      // add game over sound
      alertsPanelEl.textContent = petName + " is Playing Dead - Please Reset"
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    if(hungerTimeLeft === -1){
      hungerTimeLeft = 5
      hungerInterval += 10
      console.log("hungerInterval: " + hungerInterval)
      console.log("healthMeter: " + healthMeter)
      hungerProgressBar.setAttribute("style", `width: ${hungerInterval}%;`)
    }
    if(hungerInterval === 60 && hungerTimeLeft === 5){
      actionOccuring == true
      healthMeter--
      render()
      alertSound.volume = .3
      alertSound.play()
      alertsPanelEl.textContent = petName + " is Hungry - Feed Soon"
      let li = document.createElement("li")
      let liContent = "⚠️⚠️ HUNGER ALERT: Feed Soon! ⚠️⚠️"
      li.innerText = liContent
      journalItemsEl.appendChild(li)
      updateAnimation(hungryAnimation)
    }
  }, 1000);


  // bladder meter  
  let bladderTimer = setInterval(() => {
    if(healthMeter === 10){
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    // console.log("bladderTimeLeft: " + bladderTimeLeft)
    bladderTimeLeft -= 1
    if(bladderInterval === 100){
      gameOver = true 
      gameOverSound.volume = .3
      gameOverSound.play()
      updateAnimation(peeAnimation)
      alertsPanelEl.textContent = petName + " Had an Accident - Please Reset"
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    if(bladderTimeLeft === -1){
      bladderTimeLeft = 5
      bladderInterval += 10
      bladderProgressBar.setAttribute("style", `width: ${bladderInterval}%;`)
    }
    if(bladderInterval === 60 && bladderTimeLeft === 5){
      healthMeter--
      render()
      actionOccuring == true // probably need to add a timer to set this as false
      alertSound.volume = .3
      alertSound.play()
      alertsPanelEl.textContent = petName + " needs to go #1"
      let li = document.createElement("li")
      let liContent = ("⚠️⚠️ BATHROOM ALERT: Go #1 Soon! ⚠️⚠️")
      li.innerText = liContent
      journalItemsEl.appendChild(li)
    }
  }, 1000);
  // sleepy meter 
  let sleepyTimer = setInterval(() => {
    if(healthMeter === 10){
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    // console.log("sleepyTimeLeft: " + sleepyTimeLeft)
    sleepyTimeLeft -= 1
    if(sleepyInterval === 100){
      gameOver = true 
      gameOverSound.volume = .3
      gameOverSound.play()
      updateAnimation(sadPeiAnimation)
      alertsPanelEl.textContent = petName + " is Playing Dead - Please Reset"
      clearInterval(hungerTimer)
      clearInterval(bladderTimer)
      clearInterval(sleepyTimer)
    }
    if(sleepyTimeLeft === -1){
      sleepyTimeLeft = 5
      sleepyInterval += 10
      sleepyProgressBar.setAttribute("style", `width: ${sleepyInterval}%;`)
    }
    if(sleepyInterval === 60 && sleepyTimeLeft === 5){
      actionOccuring == true // probably need to add a timer to set this as false
      console.log("Sleepy time left: " + sleepyTimeLeft)
      healthMeter--
      render()
      alertSound.volume = .3
      alertSound.play()
      alertsPanelEl.textContent = petName + " is Getting Sleepy - Nap Soon"
      let li = document.createElement("li")
      let liContent = ("⚠️⚠️ SLEEPY ALERT: Take a Nap Soon! ⚠️⚠️")
      li.innerText = liContent
      journalItemsEl.appendChild(li)
      updateAnimation(gettingSleepingAnimation)
    }
  }, 1000);
}

function feedPet(){
  if(petName === undefined){
    alertsPanelEl.textContent = ("Pleae Enter a Name to Start")
  } else 
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
      notificationUpSound.volume = .3
      notificationUpSound.play()
      alertsPanelEl.textContent = petName + " is Eating"
      // journal experiment
      let li = document.createElement("li")
      let liContent = ("🍖🍗 " + petName + " ate!")
      li.innerText = liContent
      journalItemsEl.appendChild(li)
      updateAnimation(eatingAnimation)
      render()
      setTimeout(() => {
        notificationDownSound.volume = .3
        notificationDownSound.play()
        updateAnimation(leftFacingAnimation)
        isEating = false
        actionOccuring = false
        alertsPanelEl.textContent = petName + " is Done Eating"
        
      }, 5600)
      // setTimeout(() => {
      //   alertsPanelEl.textContent = ""
      // }, 7600)
    } else {
      // if time, put a sad dog animation
      // add error sound
      alertsPanelEl.textContent = " not enough food"
    }
  }
}

// level up by having a sleepy meter to indicate when your pet needs sleep
function takeNap(){  
  if(petName === undefined){
    alertsPanelEl.textContent = ("Pleae Enter a Name to Start")
  } else if(isNapping === true){
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
    notificationUpSound.volume = .3
    notificationUpSound.play()
    alertsPanelEl.textContent = (petName + " is Napping")
    let li = document.createElement("li")
    let liContent = ("💤😴 " + petName + " Took a Nap!")
    li.innerText = liContent
    journalItemsEl.appendChild(li)
    setTimeout(() => {
      updateAnimation(leftFacingAnimation)
      notificationDownSound.volume = .3
      notificationDownSound.play()
      alertsPanelEl.textContent = (petName +" is Done Napping")
      isNapping = false
      actionOccuring = false
    }, 6800)
    // setTimeout(() => {
    //   alertsPanelEl.textContent = ""
    // }, 8800)
  }
}

function playPet(){
  if(petName === undefined){
    alertsPanelEl.textContent = ("Pleae Enter a Name to Start")
  } else if(isPlaying === true){
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
    notificationUpSound.volume = .3
    notificationUpSound.play()
    alertsPanelEl.textContent = (petName + " is Playing")
    let li = document.createElement("li")
    let liContent = ("🐾🛝 " + petName + " Played!")
    li.innerText = liContent
    journalItemsEl.appendChild(li)
    render()
    setTimeout(() => {
      isPlaying = false
      actionOccuring = false
      updateAnimation(leftFacingAnimation)
      notificationDownSound.volume = .3
      notificationDownSound.play()
      alertsPanelEl.textContent = (petName + " is Done Playing")
    }, 5000)
    // setTimeout(() => {
    //   alertsPanelEl.textContent = ""
    // }, 7000)
    // add play animation
  }
}

function goPee(){
  if(petName === undefined){
    alertsPanelEl.textContent = ("Pleae Enter a Name to Start")
  } else if(isPeeing === true){
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
    notificationUpSound.volume = .3
    notificationUpSound.play()
    alertsPanelEl.textContent = (petName + " is Going #1")
    let li = document.createElement("li")
    let liContent = ("🚽🧻 " + petName + " Went to the Bathroom!")
    li.innerText = liContent
    journalItemsEl.appendChild(li)
    render()
    updateAnimation(peeAnimation)
    setTimeout(() => {
      notificationDownSound.volume = .3
      notificationDownSound.play()
      alertsPanelEl.textContent = (petName + " is Done Going #1")
      updateAnimation(leftFacingAnimation)
      isPeeing = false
      actionOccuring = false
    }, 2400)
    // setTimeout(() => {
    //   alertsPanelEl.textContent = ""
    // }, 4400)
  }
}

