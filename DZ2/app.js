
const box = document.querySelector(".box") 
const block = document.querySelector(".block") 
 
let xPos = 0; 
let yPos = 0; 
 
function move() { 
  if(xPos < 340 && yPos == 0) { 
    xPos += 16; 
    block.style.left = `${xPos}px`; 
    setTimeout(() => { 
      move(); 
    }, 160); 
  }  else if (xPos >= 340 && yPos < 340 ) { 
    yPos += 16; 
    block.style.top = `${yPos}px`; 
    setTimeout(() => { 
      move(); 
    }, 160); 
  }  else if (xPos > 0 && yPos >= 340) { 
    xPos -= 16; 
    block.style.left = `${xPos}px`; 
    setTimeout(() => { 
      move(); 
    }, 160) 
  } else if (xPos == 0 && yPos > 0) { 
    yPos -= 16; 
    block.style.top = `${yPos}px`; 
    setTimeout(() => { 
      move(); 
    },160) 
  }  
} 
move() 
 
let num = 0; 
 
function interval(){ 
  num++; 
  console.log( num + " hours" + " later"); 
  if(num >= 30) { 
  clearInterval(ctop); 
  }}; 
 
  ctop = setInterval(interval,1000);