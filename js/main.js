//when page is loading
window.onload = () => {
  document.querySelector(".load-page").classList.add("loaded");
};
window.onresize = () => {
  document.querySelector(".load-page").classList.remove("loaded");
  setTimeout(() => {
    document.querySelector(".load-page").classList.add("loaded");
  }, 500);
};
//start menu open close
let btnOpenMenu = document.querySelector(".menu");
let Menu = document.querySelector(".mainNav ul.link");
btnOpenMenu.onclick = function () {
  Menu.classList.toggle("open");
  btnOpenMenu.classList.toggle("fa-bars");
  btnOpenMenu.classList.toggle("fa-close");
};
// start header scroll
let header = document.querySelector("header");
window.addEventListener("scroll", (e) => {
  if (scrollY >= 100) {
    header.classList.add("Header2Active");
  } else {
    header.classList.remove("Header2Active");
  }
});
//start slider img
let isDragging, startX, startScrollLeft;
let checkDraggingStart;
let dragging = (p, e) => {
  if (!isDragging) return;
  p.scrollLeft = startScrollLeft - (e.pageX - startX);
};
let startDragging = (p, e) => {
  p.classList.add("dragging");
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = p.scrollLeft;
};
let stopDragging = (p) => {
  p.classList.remove("dragging");
  isDragging = false;
};
let scrollInfine = (p) => {
  if (p.scrollLeft <= 0) {
    p.classList.add("no-transmition");
    p.scrollLeft = p.scrollWidth;
    p.scrollLeft -= p.children[0].offsetWidth;
    p.classList.remove("no-transmition");
  } else if (Math.ceil(p.scrollLeft) == p.scrollWidth - p.offsetWidth) {
    p.classList.add("no-transmition");
    p.scrollLeft = p.children[0].offsetWidth;
    p.classList.remove("no-transmition");
  }
};
let changePlaseOfImg = function (p) {
  let imgsNum = p.childElementCount;
  let arrImg = [...p.children];
  arrImg
    .slice(-imgsNum)
    .reverse()
    .forEach((img) => {
      p.insertAdjacentHTML("afterbegin", img.outerHTML);
    });
  arrImg.slice(0, imgsNum).forEach((img) => {
    p.insertAdjacentHTML("beforeend", img.outerHTML);
  });
};
let AutoPlayDragging = (slider) => {
  setInterval(() => {
    if (!checkDraggingStart) {
      slider.scrollLeft += slider.children[0].clientWidth;
    }
  }, 2000);
};
let mouseleave = () => {
  checkDraggingStart = false;
};
let mouseenter = () => {
  checkDraggingStart = true;
};
// slider banner
function sliderMoveLeft(slider) {
  let e = document.querySelector(slider);
  e.scrollLeft -= e.children[0].clientWidth;
}
function sliderMoveRight(slider) {
  let e = document.querySelector(slider);
  e.scrollLeft += e.children[0].clientWidth;
}
// slider collection
let sliderImg = document.querySelectorAll("#sliderImg");
sliderImg.forEach((slider) => {
  slider.addEventListener("mousemove", (e) => dragging(slider, e));
  slider.addEventListener("mousedown", (e) => startDragging(slider, e));
  document.addEventListener("mouseup", () => stopDragging(slider));
  slider.addEventListener("scroll", () => scrollInfine(slider));
  changePlaseOfImg(slider);
  AutoPlayDragging(slider);
  slider.parentElement.addEventListener("mouseenter", () => mouseenter());
  slider.parentElement.addEventListener("mouseleave", () => mouseleave());
});
// start filters
btnfilter = document.querySelectorAll(".filters li");
boxfilter = document.querySelectorAll(".currently-market .boxs .box");
btnfilter.forEach((ele) => {
  ele.addEventListener("click", () => {
    btnfilter.forEach((ele) => {
      ele.classList.remove("active");
    });
    ele.classList.add("active");
    boxfilter.forEach((ele) => {
      ele.classList.add("filter");
    });
    setTimeout(() => {
      boxfilter.forEach((e) => {
        if (e.classList.contains(ele.dataset.filter)) {
          e.classList.remove("filter");
        }
        if (ele.dataset.filter == "*") {
          e.classList.remove("filter");
        }
      });
    }, 1);
  });
});
