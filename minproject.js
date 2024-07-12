const inputslider=document.querySelector("[ data-LengthSlider]");
const lengthDisplay=document.querySelector("[data-LengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const Uppercheck=document.querySelector("#UpperCase");
const Lowercheck=document.querySelector("#LowerCase");
const Numbercheck=document.querySelector("#Numbers");
const symbolcheck=document.querySelector("#Symbol");
const indicator=document.querySelector("[data-indicator]");
const generatebutton=document.querySelector(".gernerateBtn");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const Symbol='`@#$%^&*(){}[]:;?><,/.';
let password="";
let passwordLength=10;
let checkCount=0;
handlerslider();
setIndicator('#ccc')
//set password
function handlerslider(){
    inputslider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%100"
}

//set indicator
function setIndicator(color){
indicator.style.backgroundColor=color;

}
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum=getRndInteger(0,Symbol.length);
    return Symbol.charAt(randNum);
}
function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(Uppercheck.checked) hasUpper=true;
    if(Lowercheck.checked) hasLower=true;
    if(Numbercheck.checked) hasNum=true;
    if(symbolcheck.checked) hasSym=true;
    if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength >=8){
        setIndicator('#0f0');

    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=8){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

async function copyContent(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
}
catch(e){
    copyMsg.innerText="failed";
}
copyMsg.classList.add("active");
setTimeout(()=>{
    copyMsg.classList.remove("active");

},2000);
}

function handleCheckbox(){
    checkCount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    if(passwordLength < checkCount)
    {
        passwordLength=checkCount;
        handlerslider();
    }

}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbox);
})


inputslider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handlerslider();
})

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})


generatebutton.addEventListener('click' ,()=>{
if(checkCount ==0){
    return;
}
if(passwordLength < checkCount ){
    passwordLength=checkCount;
    handlerslider();
}

//remove old password

password="";
console.log("Run the password");
//let's put the stuff mentioned by checkbox


// if(Uppercheck.checked){
//     password+=generateUpperCase();
// }
// if(Lowercheck.checked){
//     password+=generateLowerCase();
// }
// if(Numbercheck.checked){
//     password+=generateRandomNumber();
// }
// if(symbolcheck.checked){
//     password+=generateSymbol();
// }

let functarr=[];
if(Uppercheck.checked){
         functarr.push(generateUpperCase);
          }
if(Lowercheck.checked){
          functarr.push(generateLowerCase);
            }
if(Numbercheck.checked){
          functarr.push(generateRandomNumber);
        }
if(symbolcheck.checked){
            functarr.push(generateSymbol);
             }

for(let i=0;i<functarr.length;i++){
    password+=functarr[i]();
}
for(let i=0;i<passwordLength-functarr.length;i++){
    let randIndex=getRndInteger(0,functarr.length);
    console.log("randIndex"+randIndex);
    password+=functarr[randIndex]();
}
console.log("Ramianing addn done");


function shufflePassword(array){
//fisher yates meth
for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
}
let str="";
array.forEach((el)=>(str+=el));
return str;
}

//shuffle the password
password=shufflePassword(Array.from(password));

console.log("Shuffling done");
 //show in UI
 passwordDisplay.value=password;
 console.log("UI addn done");
 //cal strength

 calStrength();
});







 
