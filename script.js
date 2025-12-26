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