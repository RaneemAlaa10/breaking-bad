allEpisods = [];
var xmr = new XMLHttpRequest();
var checkMode = true;

/*---------------------------FUNCTION TO GET DATA FROM API---------------------------*/
async function getData() {
  var data=await fetch('https://breakingbadapi.com/api/episodes')
  var converted=await data.json()
  allEpisods=converted
}

getData(); //CALL OF getData FUNCTION
/*-------------------------FUNCTION TO GET DISPLAY ALL EPISODS-------------------------*/
function display() {
  var box = ``;
  for (i = 0; i < allEpisods.length; i++) {
    box += `<div class="col-s-6 col-md-6 col-lg-4">
        <div class="item card p-3 mt-3">
            <h3>Title: ${allEpisods[i].title}</h3>
            <p>Episode: ${allEpisods[i].episode}</p>
            <p>Season:${allEpisods[i].season}</p>
            <p>Characters: ${allEpisods[i].characters}</p>
        </div>
    </div>`;
  }
  document.getElementById("data").innerHTML = box;
}

ClickBtn.addEventListener("click", function () {  //SHOW ALL EPISODS BY CLICK BUTTON
  display();
});
/*-----------------FUNCTION TO GET DISPLAY ALL EPISODS OF SPECIFIC SEASON-----------------*/
function displaySeason() {
  var index = document.getElementById("Seasons").selectedIndex;
  var box = ``;

  for (i = 0; i < allEpisods.length; i++) {
    if (index == allEpisods[i].season) {
      box += `<div class="col-md-4">
        <div class="item card p-3 mt-3">
            <h3>Title: ${allEpisods[i].title}</h3>
            <p>Episode: ${allEpisods[i].episode}</p>
            <p>Season:${allEpisods[i].season}</p>
            <p>Characters: ${allEpisods[i].characters}</p>
        </div>
    </div>`;
    }
  }
  document.getElementById("data").innerHTML = box;
}

ClickSeason.addEventListener("click", function () {//SHOW SPECIFIC SEASON EPISODS BY CLICK BUTTON
  displaySeason();
});

/***************CHANGE MODE BUTTON ***************/
mode.addEventListener("click", function () {
  console.log("done");
  if (checkMode == true) { //CHECK WHICH MODE IS APPLIED (DARK=>FALSE,LIGHT=>TRUE)
    darkMode();
  } else {
    lightMode();
  }
});
/*-----------------FUNCTION TO CHANGE TO LIGHT MODE-----------------*/
function lightMode() {
  checkMode = true;
  changeItem2();
  var styleElem = document.head.appendChild(document.createElement("style"));
  document.getElementById("body").style.backgroundColor = "white";
  document.getElementById("Seasons").style.cssText =
    "background-color:#f8f9fa;color:black";
  document.getElementById("select").style.cssText = "background-color:#5c6664";
  styleElem.innerHTML = "#select:after{background: #c6c7c8;}";
  document.getElementById("searchInput").style.cssText="background-color:white;color:black"
  const buttons = document.querySelectorAll(".bt");
  buttons.forEach((bt) => {
    bt.style.cssText =
      "color:black;background-color: #f8f9fa;border-color: #343a40;";
  });
  document.getElementById("logoText").style.color = "black";
  document.getElementById("mode").style.color = "black";
  mode.onmouseover = function () {
    changeColorOver();
  };
  mode.onmouseout = function () {
    changeColorOut("black");
  };
}
/*-----------------FUNCTION TO CHANGE TO DARK MODE-----------------*/
function darkMode() {
  checkMode = false;
  changeItem();
  var styleElem = document.head.appendChild(document.createElement("style"));
  document.getElementById("body").style.backgroundColor = "#121212";
  document.getElementById("Seasons").style.cssText =
    "background-color:#5c6664;color:white";
  document.getElementById("select").style.cssText = "background-color:#5c6664";
  document.getElementById("searchInput").style.cssText="background-color:rgb(92, 102, 100);color:white"
  styleElem.innerHTML = "#select:after{background: #2b2e2e;}";
  const buttons = document.querySelectorAll(".bt");
  buttons.forEach((bt) => {
    bt.style.cssText =
      "color:#fff;background-color: #343a40;border-color: #343a40;";
  });
  document.getElementById("logoText").style.color = "white";
  document.getElementById("mode").style.color = "white";
  mode.onmouseover = function () {
    changeColorOver();
  };
  mode.onmouseout = function () {
    changeColorOut("white");
  };
}
/*--------------CHANGE COLOR OF CARDS---------------*/
var root = document.querySelector(":root");
function changeItem() {
  root.style.setProperty("--white", "rgb(48, 48, 48)");
  root.style.setProperty("--black", "rgb(215, 215, 215)");
}

function changeItem2() {
  root.style.setProperty("--white", "--black");
  root.style.setProperty("--black", "--white");
}
/*--------------CHANGE COLOR OF MODE DURING HOVER---------------*/
function changeColorOver() {
  document.getElementById("mode").style.color = "#1F6032";
}
/*--------------RETURN COLOR OF MODE DURING NOT HOVER---------------*/
function changeColorOut(color) {
  document.getElementById("mode").style.color = color;
}
/*--------------FUNCTION FOR SEARCH---------------*/
function Search(searchInput) {
  var box2 = ``;
  for (var i = 0; i < allEpisods.length; i++) {
    sepisode = allEpisods[i];
    console.log(sepisode);
    for (const [key, value] of Object.entries(sepisode)) {
      if (
        key == "title" ||
        key == "episode" ||
        key == "season" ||
        key == "characters"
      ) {
        if (value.toString().toLowerCase().includes(searchInput.toLowerCase())) {
          console.log(typeof value);
          console.log(typeof(sepisode.title))
          box2 += `<div class="col-md-4">
                <div class="item card p-3 mt-3">
                    <h3>Title: ${sepisode.title.toString().replace(searchInput,'<span>'+searchInput+'</span>')}</h3>
                    <p>Episode: ${sepisode.episode.toString().replace(searchInput,'<span>'+searchInput+'</span>')}</p>
                    <p>Season:${sepisode.season.toString().replace(searchInput,'<span>'+searchInput+'</span>')}</p>
                    <p>Characters: ${sepisode.characters.toString().replace(searchInput,'<span>'+searchInput+'</span>')}</p>
                </div>
            </div>`;
          break;
        }
      }
      else
      continue
    }
  }
  document.getElementById("data").innerHTML = box2;
}
