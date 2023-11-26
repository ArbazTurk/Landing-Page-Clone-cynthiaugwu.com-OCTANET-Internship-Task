var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

window.addEventListener("hashchange", function() {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
});

document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
            scroll.scrollTo(target);
        }
    });
});

let time=document.getElementById("current-time");

setInterval(() =>{
    let d=new Date();
    time.innerHTML=d.toLocaleTimeString().concat("  EST");
},1000)

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y:"10",
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut,
    })
    .to(".boundingelem", {
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1.7,
        stagger:0.2,
    })
    .from("#herofooter", {
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1.3,
        ease:Expo.easeInOut
    })
}

function circleChaptaKaro(){
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        xscale=gsap.utils.clamp(/*.7*/0.8,1.2,dets.clientX - xprev);
        yscale=gsap.utils.clamp(/*.7*/0.8,1.2,dets.clientY - yprev);

        xprev=dets.clientX;
        yprev=dets.clientY;

        circleMouseFollower(xscale,yscale);
        
        timeout= setTimeout(function() {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate=0;
    var diffrot=0;
    
    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });

    elem.addEventListener("mousemove", function(dets) {
        // console.log(elem.getBoundingClientRect());

        var diff=dets.clientY-elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});


firstPageAnim();
circleMouseFollower();
circleChaptaKaro();
