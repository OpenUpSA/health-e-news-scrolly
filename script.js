const controller = new ScrollMagic.Controller({
    // show indicators
    addIndicators: true
});

// Set the background images
document.querySelector('.slide-1').style.backgroundImage = "url('img/toilets2.jpg')";
document.querySelector('.slide-2').style.backgroundImage = "url('img/map-base.jpg')";
document.querySelector('.slide-3').style.backgroundImage = "url('img/map.jpg')";
document.querySelector('.slide-4').style.backgroundImage = "url('img/pit-latrine1.jpg')";

// INIT
window.onload = () => {

    gsap.from(".slide-1", {
        opacity: 0,
        y: 20,
        duration: 1,
    });
    gsap.from(".slide-1 .caption-box-1", {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power3.out",
        delay: 1
    });
};

// SLIDE 2

var timeline = new TimelineMax();
var tween1 = TweenMax.to('.slide-1 .caption-box-1', { opacity: 0, y: -200, duration: 2, ease: "power3.out", delay: 0.5 });
var tween2 = TweenMax.fromTo('.slide-2', { opacity: 0 }, { opacity: 1 });
var tween3 = TweenMax.fromTo('.slide-2 .caption-box-1', { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 2, ease: "power3.out" });

timeline
    .add(tween1)
    .add(tween2)
    .add(tween3);

new ScrollMagic.Scene({
    offset: 100,
    duration: 1000
})
    .setTween(timeline)
    .addTo(controller);

// SLIDE 3

const ctx1 = document.getElementById('age-gender').getContext('2d');
const ageGenderChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['18-25 y/o', '26-40 y/o', '41-60 y/o', '60+ y/o'],
        datasets: [
            {
                label: 'Female',
                data: [21, 57, 36, 33],
                backgroundColor: '#ff3d3b',
                borderColor: '#ff3d3b',
                borderWidth: 1
            },
            {
                label: 'Male',
                data: [27, 55, 45, 38],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Other',
                data: [1, 0, 0, 0], // Adjusted for missing data
                backgroundColor: '#ffd06c',
                borderColor: '#ffd06c',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: false,
                title: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: false
                }
            }
        }
    }
});

var timeline = new TimelineMax();

var tween2 = TweenMax.fromTo('.slide-3', { opacity: 0 }, { opacity: 1, duration: 1 });

var tween3 = TweenMax.fromTo('.slide-3', { backgroundSize: "100%" }, {
    backgroundSize: "160%",
    backgroundPosition: "100% 60%",
    duration: "40%",
    delay: "10%"
    
});


// Labels come in one after the other
var tween4 = TweenMax.fromTo('.slide-3 .chart-label-1', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
var tween5 = TweenMax.fromTo('.slide-3 .chart-label-2', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: "10%" });
var tween6 = TweenMax.fromTo('.slide-3 .chart-label-3', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1 });

// Caption-box animations
var tween7 = TweenMax.to('.slide-3 .caption-box-1', { opacity: 0, y: -200, duration: 2, ease: "power3.out", delay: 2 });
var tween8 = TweenMax.fromTo('.slide-3 .caption-box-2', { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 2.5 });
var tween9 = TweenMax.to('.slide-3 .caption-box-2', { opacity: 0, y: -200, duration: 2, ease: "power3.out", delay: 2.5 });
var tween10 = TweenMax.fromTo('.slide-3 .caption-box-3', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 15 });

// Add tweens to timeline in sequence
timeline
    .add(tween2)
    .add(tween3)
    .add(tween4)
    .add(tween5)
    .add(tween6)
    .add(tween7)
    .add(tween8)
    .add(tween9)
    .add(tween10);


new ScrollMagic.Scene({
    offset: 1000,
    duration: 2000
})
    .setTween(timeline)
    .addTo(controller);


// SLIDE 4

const ctx = document.getElementById('unusable-fs').getContext('2d');
const unusable_fs = new Chart(ctx, {
    type: 'doughnut',
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false 
            },
            tooltip: {
                enabled: true 
            }
        }
    },
    data: {
        labels: ['No', 'Yes'],
        datasets: [{
            data: [44, 65],
            backgroundColor: ['#ffd06c', '#ff3d3b']
        }]
    }
});

const ctx2 = document.getElementById('unusable-kzn').getContext('2d');
const unusable_kzn = new Chart(ctx2, {
    type: 'doughnut',
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false  // Hide the legend
            }
        }
    },
    data: {
        labels: ['No', 'Yes'],
        datasets: [{
            data: [27, 76],
            backgroundColor: ['#ffd06c', '#ff3d3b']
        }]
    }
});

const ctx3 = document.getElementById('unusable-lp').getContext('2d');
const unusable_lp = new Chart(ctx3, {
    type: 'doughnut',
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false  // Hide the legend
            }
        }
    },
    data: {
        labels: ['No', 'Yes'],
        datasets: [{
            data: [6, 95],
            backgroundColor: ['#ffd06c', '#ff3d3b']
        }]
    }
});

var timeline = new TimelineMax();

var tween1 = TweenMax.fromTo('.slide-4', { opacity: 0 }, { opacity: 1, duration: 1, delay: 2 });
var tween2 = TweenMax.to('.slide-4 .caption-box-1', { opacity: 0, y: -200, duration: 2, ease: "power3.out", delay: 10 });
var tween3 = TweenMax.fromTo('.slide-4 .caption-box-2', { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 5, delay: 10, ease: "power3.out" });


timeline
    .add(tween1)
    .add(tween2)
    .add(tween3);

new ScrollMagic.Scene({
    offset: 2000,
    duration: 3000
})
.on("enter", () => {
    unusable_fs.update();
    unusable_kzn.update();
})
.setTween(timeline)
.addTo(controller);