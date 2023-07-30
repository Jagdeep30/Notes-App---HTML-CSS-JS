let countEle = 0;
let edit = false;
let val = "";
let index;
let divC;

// selecting elements from html
const add = document.getElementById("add");
const del = document.getElementById("delete");
const allnotes = document.getElementById("allNotes");
const starnotes = document.getElementById("starNotes");
const container = document.getElementById("container");

// functions

// function to add a note
const addNote = () => {
  divC = document.createElement("div");
  divC.setAttribute("class", "note");
  countEle++;
  divC.setAttribute("id", `note${countEle}`);

  // star button
  const starBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  starBtn.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  starBtn.setAttribute("width", "24");
  starBtn.setAttribute("height", "24");
  starBtn.setAttribute("viewbox", "0 0 24 24");
  starBtn.innerHTML =
    '<path class="star" fill="rgba(0,0,0,0)" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path>';
  starBtn.childNodes[0].addEventListener("click", star);

  //adding form where note data would be entered
  const data = document.createElement("form");
  data.setAttribute("action", "javascript:");
  data.setAttribute("onsubmit", "complete(this)");
  data.innerHTML = `<textarea id='title${countEle}' class="title" cols=30 rows=1 required placeholder='Title'></textarea>`;
  data.innerHTML += `<textarea id='singleNote${countEle}' class="singleNote" cols=30 rows=10 required placeholder='Enter your note here...'></textarea>`;
  data.innerHTML += `<input type = 'image' id = 'mark${countEle}' class="mark" src='./icons/tick.png'>`;

  //adding the span to show date
  const date = document.createElement("span");
  date.setAttribute("id", `date${countEle}`);
  date.setAttribute("class", `date`);
  let currDate = new Date();
  let month = currDate.toDateString().split(" ")[1];
  let today = currDate.getDate();
  let year = currDate.getFullYear();
  date.innerText = `${month} ${today}, ${year}`;

  //delete button
  const del = document.createElement("i");
  del.setAttribute("class", "uil uil-trash-alt deleteBtn");
  del.addEventListener("click", delNote);

  data.addEventListener("focusin", (event) => {
    if (
      event.target.id.includes("singleNote") &&
      event.target.value.length != 0
    ) {
      edit = true;
      val = event.target.value;
      titleVal = event.target.parentElement.firstChild.value;
      currArr = localStorage.getItem(titleVal);
      currArr = JSON.parse(currArr);
      currArr.forEach((ele, ind) => {
        if (ele.noteinfo === val) {
          index = ind;
        }
      });
    }

    event.target.parentElement.lastChild.style.display = "inline-block";
  });

  divC.appendChild(starBtn);
  divC.appendChild(data);
  divC.appendChild(date);
  divC.appendChild(del);

  allnotes.appendChild(divC);
  data.querySelector("textarea").focus();

  add.style.pointerEvents = "none";
  divC.getElementsByTagName("path")[0].style.pointerEvents = "none";
  divC.getElementsByTagName("svg")[0].style.pointerEvents = "none";
};

//function to delete a note
const delNote = (event) => {
  event.target.parentElement.classList.add("transit");

  const curr = event.target.parentElement;

  let key = curr.querySelector(".title").value;
  let val = curr.querySelector(".singleNote").value;
  let index = -1;
  let arr = JSON.parse(localStorage.getItem(key));
  arr.forEach((ele, ind) => {
    if (ele.noteinfo === val) {
      index = ind;
    }
  });
  arr.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(arr));

  curr.innerText = "";
  curr.style.paddingLeft = "0px";
  curr.style.paddingRight = "0px";
  curr.style.marginRight = "-30px";
  curr.classList.add("delAni");

  setTimeout(() => {
    allnotes.removeChild(curr);
  }, 1000);
};

// function to mark a note as starred or pinned(we can say)
const star = (event) => {
  event.target.classList.toggle("marked-yellow");
  event.target.classList.toggle("star");

  if (event.target.parentElement.parentElement.parentElement == starnotes) {
    allnotes.prepend(event.target.parentElement.parentElement);
    let key =
      event.target.parentElement.parentElement.querySelector("textarea").value;
    let value =
      event.target.parentElement.parentElement.querySelectorAll("textarea")[1]
        .value;

    let arr = localStorage.getItem("star--" + key);
    arr = JSON.parse(arr);
    let tempObj;
    let ind = -1;
    for (let obj of arr) {
      if (obj.noteinfo === value) {
        tempObj = obj;
        ind = arr.indexOf(obj);
        break;
      }
    }

    arr.splice(ind, 1);
    if (arr.length === 0) {
      localStorage.removeItem("star--" + key);
    } else {
      localStorage.setItem("star--" + key, JSON.stringify(arr));
    }

    //adding the note to allnotes section
    if (localStorage.hasOwnProperty(key)) {
      arr = localStorage.getItem(key);
      arr = JSON.parse(arr);
      arr.push(tempObj);
      localStorage.setItem(key, JSON.stringify(arr));
    } else {
      localStorage.setItem(key, JSON.stringify([tempObj]));
    }
    // localStorage.removeItem("star--" + key);

    // if (localStorage.hasOwnProperty(key)) {
    //   let arr = localStorage.getItem(key);
    //   arr = JSON.parse(arr);
    //   // if (edit) {
    //   //   arr[index].noteinfo = noteinfo;
    //   //   edit = false;
    //   // } else {
    //   //   arr.push(value);
    //   // }

    //   arr = JSON.stringify(arr);
    //   localStorage.setItem(key, arr);
    // }

    // else {
    //   let arr = [value];
    //   arr = JSON.stringify(arr);
    //   localStorage.setItem(title, arr);
    // }
  } else {
    let child = event.target.parentElement.parentElement;
    starnotes.appendChild(child);

    // let key =
    //   event.target.parentElement.parentElement.querySelector("textarea").value;
    // let value =
    //   event.target.parentElement.parentElement.querySelector(
    //     ".singleNote"
    //   ).value;

    // let indexx = key;
    // let currArr = localStorage.getItem(indexx);
    // currArr = JSON.parse(currArr);

    // currArr.forEach((ele,ind)=>{
    //   if(ele.noteinfo === value){
    //     indexx = ind;
    //   }
    // })

    // let newVal = localStorage.getItem(key);
    // newVal = JSON.parse(newVal);
    // newVal.splice(indexx, 1);
    // newVal = JSON.stringify(newVal);
    // localStorage.setItem(key, newVal);

    // if (!localStorage.hasOwnProperty("star--" + key)) {
    //   localStorage.setItem("star--" + key, `["${value}"]`); //change this
    // }
    // else {
    //   let arr = localStorage.getItem("star--" + key);
    //   arr = JSON.parse(arr);
    //   arr.push(value);
    //   localStorage.setItem("star--" + key, JSON.stringify(arr));
    // }

    let key =
      event.target.parentElement.parentElement.querySelector("textarea").value;
    let value =
      event.target.parentElement.parentElement.querySelectorAll("textarea")[1]
        .value;

    let arr = localStorage.getItem(key);
    arr = JSON.parse(arr);
    let tempObj;
    let ind = -1;
    for (let obj of arr) {
      if (obj.noteinfo === value) {
        tempObj = obj;
        ind = arr.indexOf(obj);
        break;
      }
    }

    arr.splice(ind, 1);
    if (arr.length === 0) {
        localStorage.removeItem(key);
    }
    else {
        localStorage.setItem(key, JSON.stringify(arr));
    }

    //adding the note to starnotes section
    if (localStorage.hasOwnProperty("star--" + key)) {
      arr = localStorage.getItem("star--" + key);
      arr = JSON.parse(arr);
      arr.push(tempObj);
      localStorage.setItem("star--" + key, JSON.stringify(arr));
    } else {
      localStorage.setItem("star--" + key, JSON.stringify([tempObj]));
    }
  }
};

//function to mark note as complete and store it in local storage
const complete = (event) => {
  //store note in local storage
  let title = event.childNodes[0].value;
  let noteinfo = event.childNodes[1].value;
  let date = event.parentElement.querySelector(".date").innerText;
  if (event.parentElement.parentElement.id === "starNotes") {
    let arr = localStorage.getItem("star--" + title);
    arr = JSON.parse(arr);
    let index = -1;
    for (item of arr) {
      if (noteinfo.includes(item.noteinfo)) {
        index = arr.indexOf(item);
        break;
      }
    }
    arr[index].noteinfo = noteinfo;
    arr = JSON.stringify(arr);
    localStorage.setItem("star--" + title, arr);
  }
  if (localStorage.hasOwnProperty(title)) {
    let arr = localStorage.getItem(title);
    arr = JSON.parse(arr);
    if (edit) {
      arr[index].noteinfo = noteinfo;
      edit = false;
    } else {
      let obj = { date: date, noteinfo: noteinfo };
      arr.push(obj);
    }
    arr = JSON.stringify(arr);
    localStorage.setItem(title, arr);
  } else {
    //this if first time when note is created
    let arr = [{ date: date, noteinfo: noteinfo }];
    arr = JSON.stringify(arr);
    localStorage.setItem(title, arr);
  }

  //remove the tick button
  event.lastChild.style.display = "none";

  add.style.pointerEvents = "auto";
  event.parentElement.getElementsByTagName("path")[0].style.pointerEvents =
    "auto";
  event.parentElement.getElementsByTagName("svg")[0].style.pointerEvents =
    "auto";

  event.querySelector(".title").setAttribute("readonly", "true");
};

// Event listeners

add.addEventListener("click", addNote);

// load all notes from local storage while opening
document.body.onload = () => {
  let arr = Object.entries(localStorage);
  arr.forEach((ele) => {
    if (ele[0].startsWith("star--")) {
      ele[0] = ele[0].slice(6);

      let values = ele[1];
      values = JSON.parse(values);
      console.log(values);
      for (val of values) {
        addNote();
        divC.querySelector("textarea").value = ele[0];
        divC.querySelector(".title").setAttribute("readonly", "true");
        divC.querySelectorAll("textarea")[1].value = val.noteinfo;
        divC.querySelector("form input").style.display = "none";
        divC.getElementsByTagName("path")[0].style.pointerEvents = "auto";
        divC.getElementsByTagName("svg")[0].style.pointerEvents = "auto";
        divC.querySelector(".date").innerText = val.date;

        divC.childNodes[0].firstChild.classList.toggle("marked-yellow");
        divC.childNodes[0].firstChild.classList.remove("star");
        starnotes.appendChild(divC);
      }
    } else {
      let temp = ele[1];
      temp = JSON.parse(temp);
      for (let i of temp) {
        addNote();
        divC.childNodes[1].querySelector("textarea").value = ele[0];
        divC.querySelector(".title").setAttribute("readonly", "true");
        divC.childNodes[1].querySelectorAll("textarea")[1].value = i.noteinfo;
        divC.querySelector("form input").style.display = "none";
        divC.getElementsByTagName("path")[0].style.pointerEvents = "auto";
        divC.getElementsByTagName("svg")[0].style.pointerEvents = "auto";
        divC.querySelector(".date").innerText = i.date;
      }
    }
  });
  if (divC !== undefined) {
    divC.querySelector("textarea").blur();
  }
  add.style.pointerEvents = "auto";
};
