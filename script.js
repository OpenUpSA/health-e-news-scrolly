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
var tween1 = TweenMax.fromTo('.slide-2', { opacity: 0 }, { opacity: 1 });

timeline
    .add(tween1);

new ScrollMagic.Scene({
    triggerElement: '.caption-box-2',
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
                data: [1, 0, 0, 0], 
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

var tween1 = TweenMax.fromTo('.slide-3', { opacity: 0 }, { opacity: 1 });


timeline
    .add(tween1);

new ScrollMagic.Scene({
    triggerElement: '.caption-box-2',
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
                display: false  
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
                display: false  
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



timeline
    .add(tween1);

new ScrollMagic.Scene({
    triggerElement: '.caption-box-3',
})
.setTween(timeline)
.addTo(controller);