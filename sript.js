const boxes = document.querySelectorAll(".box");

const three = document.getElementById("3-colores");
const six = document.getElementById("6-colores");
const nine = document.getElementById("9-colores");

three.addEventListener("click",function(){
    showBox(3)
})
six.addEventListener("click", function(){
    showBox(6)
})
nine.addEventListener("click",function(){
    showBox(9)
})

function showBox (number){
for(i=0;i<boxes.length;i++){
    if(i<number){
        boxes[i].style.display = "block";
        
    }
    else{
        boxes[i].style.display = "none";
    
    }
}
}
 showBox(3)