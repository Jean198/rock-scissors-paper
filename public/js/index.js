


const pickComputerHand=()=>{
    let hands=["Rock", "Paper", "Scissors"];
    let computerPlay= hands[Math.floor(Math.random()*hands.length)]
    return computerPlay
}



let score= 0;
let computerScore=0;
let round=0;





const pickPlayerChoice = (hand) => {

round++

document.getElementById("round").innerHTML=round
    
let computerHand=pickComputerHand()
// hide the current page
//let hands=document.querySelector(".hands");
//hands.style.display="none";


document.getElementById("decision").classList.add("win")
document.getElementById("decision").classList.remove("tie")
document.getElementById("decision").classList.remove("lose")
document.getElementById("decision").classList.remove("win")
document.getElementById("decision").innerHTML="waiting...";


setTimeout(() => {


//show the contest page
let contest=document.querySelector(".contest")
contest.style.display="flex"

//show the player choice
let playerChoice=document.getElementById("userPickImage")
playerChoice.src= "images/"+hand+".png"

//Show the computer choice
let computerChoice= document.getElementById("computerPickImage")
computerChoice.src="images/"+computerHand+".png";

referee(hand,computerHand)
console.log(computerHand)
    
}, 1000);






}






const referee = (userHand,computerHand)=>{
     if(userHand =="Paper" && computerHand =="Scissors"){
        document.getElementById("decision").classList.remove("win")
        document.getElementById("decision").classList.remove("tie")
        document.getElementById("decision").classList.add("lose")
        document.getElementById("decisionImg").src= 'images/lost.png'
         setDecision("YOU LOSE!")
         setComputerScore(computerScore + 1)
     } else if(userHand=="Paper" && computerHand=="Rock"){
         setDecision("YOU WIN !")
         document.getElementById("decision").classList.add("win")
         document.getElementById("decision").classList.remove("tie")
         document.getElementById("decision").classList.remove("lose")
         document.getElementById("decisionImg").src= 'images/win.png'
         setScore(score + 1);
    }

    if (userHand == "Paper" && computerHand == "Paper") {
        setDecision("It's a tie!");
        document.getElementById("decision").classList.add("tie")
        document.getElementById("decision").classList.remove("lose")
        document.getElementById("decision").classList.remove("win")
        document.getElementById("decisionImg").src= 'images/draw.png'
      }
      if (userHand == "Rock" && computerHand == "Scissors") {
        setDecision("YOU WIN!");
        document.getElementById("decision").classList.add("win")
        document.getElementById("decision").classList.remove("tie")
        document.getElementById("decision").classList.remove("lose")
        document.getElementById("decisionImg").src= 'images/win.png'
        setScore(score + 1);
      }
      if (userHand == "Rock" && computerHand == "Paper") {
        setDecision("YOU LOSE!");
        setComputerScore(computerScore + 1)
        document.getElementById("decision").classList.add("lose")
        document.getElementById("decision").classList.remove("tie")
        document.getElementById("decision").classList.remove("win")
        document.getElementById("decisionImg").src= 'images/lost.png'
      }
      if (userHand == "Rock" && computerHand == "Rock") {
        setDecision("It's a tie!");
        document.getElementById("decision").classList.add("tie")
        document.getElementById("decision").classList.remove("lose")
        document.getElementById("decision").classList.remove("win")
        document.getElementById("decisionImg").src= 'images/draw.png'
      }
      if (userHand == "Scissors" && computerHand == "Scissors") {
        setDecision("It's a tie!");
        document.getElementById("decision").classList.add("tie")
        document.getElementById("decision").classList.remove("lose")
        document.getElementById("decision").classList.remove("win")
        document.getElementById("decisionImg").src= 'images/draw.png'
      }
      if (userHand == "Scissors" && computerHand == "Rock") {
        setDecision("YOU LOSE!");
        setComputerScore(computerScore + 1)
        document.getElementById("decision").classList.add("lose")
        document.getElementById("decision").classList.remove("tie")
        document.getElementById("decision").classList.remove("win")
        document.getElementById("decisionImg").src= 'images/lost.png'
      }
      if (userHand == "Scissors" && computerHand == "Paper") {
        setDecision("YOU WIN!");
        document.getElementById("decision").classList.add("win")
        document.getElementById("decision").classList.remove("tie")
        document.getElementById("decision").classList.remove("lose")
        document.getElementById("decisionImg").src= 'images/win.png'
        setScore(score + 1);
      }

      
    
};




const setDecision=(decision) =>{
    console.log(decision)
    document.getElementById("decision").innerHTML=decision;
}

const setScore=(newscore) =>{
    score=newscore
    document.getElementById("score").innerHTML=score
    
}

const setComputerScore=(newComputerScore)=>{
    computerScore=newComputerScore
    document.getElementById("tietokone").innerHTML=computerScore;
}

const replay=() =>{
    document.querySelector(".hands").style.display="flex";
    
}

const resetGame = () =>{
      location.reload()
}



