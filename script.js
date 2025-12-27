function openFeature() {
  let allElems = document.querySelectorAll(".elem");
  let fullElems = document.querySelectorAll(".fullElem");
  let fullElemBack = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem, idx) {
    elem.addEventListener("click", function () {
      fullElems[idx].style.display = "block";
    })
  });

  fullElemBack.forEach(function (btn, idx) {
    btn.addEventListener("click", function () {
      fullElems[idx].style.display = "none";
    })
  })

}

// let arr=[
//   {
//     task:"20min English Speech",
//     detail:"With correct grammer ",
//     imp:"true"
//   },
//   {
//     task:"Leetcode Practice",
//     detail:"Atleast one Question perDay ",
//     imp:"true"
//   },
//   {
//     task:"1 Landing Pageh",
//     detail:" Made By EveryDay Learning ",
//     imp:"false"
//   },
//   {
//     task:"Responsive Layout",
//     detail:"Make it user Friendly",
//     imp:"false"
//   }
// ]
openFeature();

function todoList() {

  var arr = JSON.parse(localStorage.getItem('arr')) || [];

  function renderTask() {

    let right = document.querySelector(".right");
    let sum = "";
    arr.forEach(function (e, idx) {
      sum += ` <div class="diff-tasks">
                  <h3>${e.task}<span class=${e.imp}>imp</span></h3>
                  <button id=${idx}>Mark as Complete</button>
            </div>`
    })
    right.innerHTML = sum;
    localStorage.setItem('arr', JSON.stringify(arr));

     document.querySelectorAll(".diff-tasks button").forEach(function (btn) {
    btn.addEventListener('click', function () {
      arr.splice(btn.id, 1);
      renderTask();
      location.reload();
    })
  })
  }
  renderTask();
  var form = document.querySelector(".addTask form");
  let taskInp = document.querySelector(".addTask form #task-inp");
  let taskDetInp = document.querySelector(".addTask form textarea");
  let taskCheck = document.querySelector(".addTask form #check");


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    arr.push(
      {

        task: taskInp.value,
        detail: taskDetInp.value,
        imp: taskCheck.checked
      }
    )



   
    renderTask();
    taskInp.value = "";
    taskDetInp.value = "";
    taskCheck.checked = false;

  })

  
}
todoList();

function dailyPlanar(){
  let dayPlanarData=JSON.parse(localStorage.getItem('dayPlanarData')) || {};

var dayPlanar=document.querySelector(".daily-palner-box");
let hours=Array.from({length:18},(ele,idx)=>{ return `${6+idx}:00 - ${7+idx}:00`});
let wholeDaySum='';
hours.forEach(function(ele,idx){
  let savedData = dayPlanarData[idx] || '';
  
    wholeDaySum+=`<div class="daily-planer-timer">
                    <p>${ele}</p>
                    <input id=${idx} type="text"  value="${savedData}" placeholder="...">
                </div>`
})
dayPlanar.innerHTML=wholeDaySum;
let dayplanarInp=document.querySelectorAll(".daily-palner-box input");
 dayplanarInp.forEach(function(ele){
ele.addEventListener("input",function(){
dayPlanarData[ele.id]=ele.value;
localStorage.setItem('dayPlanarData',JSON.stringify(dayPlanarData))

})
 })
}
dailyPlanar();

function motivationQuote(){
  var motivationQuote =document.querySelector(".motivation-2 h1");
var motivationAuthor =document.querySelector(".motivation-3 h2");

// let a=fetch('https://api.quotable.io/quotes/random');
async function fetchQuote(){
  let response= await fetch('https://api.quotable.io/random');
  let data = await response.json();

motivationQuote.innerHTML=data.content;
motivationAuthor.innerHTML=data.author;
}
fetchQuote();

}
motivationQuote();

function pomodotimer(){
var isWorkSession=true;
let timerinterval=null;
let totalSeconds=1490;
let session=document.querySelector(".pomodoro-fullpage .session");
let timer=document.querySelector(".pomo-timer h1");
let start =document.querySelector(".pomo-timer .start-timer ")
let pause =document.querySelector(".pomo-timer .pause-timer ")
let reset =document.querySelector(".pomo-timer .reset-timer ")
function upDateTime(){
  let minutes=Math.floor(totalSeconds/60);
  let seconds=totalSeconds%60;
  timer.innerHTML=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
function startTimer(){
  clearInterval(timerinterval);
 if(isWorkSession){
  session.innerHTML="Work Session";
 session.style.backgroundColor='#E3E3E3';
  session.style.color='#456882'
  totalSeconds=25*60;
  timerinterval=setInterval(()=>{
     if(totalSeconds>0){
     totalSeconds--;
     upDateTime();
     }else{
      isWorkSession=false;
  clearInterval(timerinterval);
  timer.innerHTML='05:00'
}
  },1000);
 }
 else{
  totalSeconds=5*60;
  session.innerHTML="Break Time"
  session.style.backgroundColor='red'
  session.style.color='white'
  timerinterval=setInterval(()=>{
     if(totalSeconds>0){
     totalSeconds--;
     upDateTime();
     }else{
      isWorkSession=true
  clearInterval(timerinterval);
  timer.innerHTML='25:00'
}
  },1000);
 }
}
function pauseTimer(){
  clearInterval(timerinterval);
}
function resetTimer(){
   totalSeconds=25*60;
  clearInterval(timerinterval);
 
  upDateTime();
}
start.addEventListener("click",startTimer);
pause.addEventListener("click",pauseTimer);
reset.addEventListener("click", resetTimer)

}
pomodotimer();

function wheatherFunctionality(){
  let apikey="b482114c69be47dcb17113341252712";
let city='Bhopal'
var data=null;
let header1Time =document.querySelector(".header1 h1");
let header1Date=document.querySelector(".header1 h2");
let header2Temp=document.querySelector(".header2 h2");
let header2Condition=document.querySelector(".header2 h4");
let humidity=document.querySelector('.header2 .Humidity');
let preciption=document.querySelector('.header2 .Precipitation');
let wind=document.querySelector('.header2 .Wind');

async function weatherApiCall(){
  var response= await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
   data=await response.json(); 
   header2Temp.innerHTML=`${data.current.temp_c}°C`
  //  console.log(data.current.condition.text);
    header2Condition.innerHTML=`${data.current.condition.text}`
    wind.innerHTML=`Wind: ${data.current.wind_kph}km/h`;
    humidity.innerHTML=`Humidity: ${data.current.humidity}%`
    preciption.innerHTML=`Heat Index:${data.current.heatindex_c}%`
}
weatherApiCall();

function timeDate(){
  const totaldaysOfWeek=['Sunday','Monday','Tuesday','Weadnesday','Thursday','Friday','Saturday']
   const totalMonthYear= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var date=new Date();
   var hours=date.getHours();
   var minutes= date.getMinutes();
   var seconds=date.getSeconds()
   var sdate=date.getDate();
   var month=totalMonthYear[date.getMonth()];
   var year=date.getFullYear();
   var dayOfWeek= totaldaysOfWeek[date.getDay()]

   header1Date.innerHTML=`${sdate} ${month} ${year}`
   if(hours>12){
    header1Time.innerHTML=`${dayOfWeek}, ${hours-12}:${minutes}:${String(seconds).padStart("2","0")}pm`}
    else{
       header1Time.innerHTML=`${dayOfWeek}, ${hours}:${minutes}:${String(seconds).padStart("2","0")}am`
    }
}
setInterval(()=>{
  timeDate();
},1000);
}
wheatherFunctionality();
// --pri: #E3E3E3;
//     --lig:#4d7995;
//     --tri2: #456882;
//     --tri1: #234C6A;
//     --sec: #1B3C53;
//    --lig2:#053657;

var rootElement=document.documentElement;
 let theme=document.querySelector("button");
 var flag=0;
 theme.addEventListener("click",function(){
  console.log("hello")
  if(flag==0){
    rootElement.style.setProperty('--pri','#FEEAC9');
    rootElement.style.setProperty('--lig','#FFCDC9');
    rootElement.style.setProperty('--tri2','#FDACAC');
    rootElement.style.setProperty('--tri1','#FD7979');
    rootElement.style.setProperty('--sec','#BF124D');
    rootElement.style.setProperty('--lig2','#76153C');
    flag=1;
  }
  else if(flag==1){
     rootElement.style.setProperty('--pri','#FCF8DD');
    rootElement.style.setProperty('--lig','#FFD700');
    rootElement.style.setProperty('--tri2','#D3AF37');
    rootElement.style.setProperty('--tri1','#EB5B00');
    rootElement.style.setProperty('--sec','#B12C00');
    rootElement.style.setProperty('--lig2','#00809D');
    flag=2;
  }else if(flag==2){
    rootElement.style.setProperty('--pri','#E3E3E3');
    rootElement.style.setProperty('--lig','#4d7995');
    rootElement.style.setProperty('--tri2','#456882');
    rootElement.style.setProperty('--tri1','#234C6A');
    rootElement.style.setProperty('--sec','#1B3C53');
    rootElement.style.setProperty('--lig2','#053657');
    flag=0;
  }
})

