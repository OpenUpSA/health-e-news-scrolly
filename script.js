const controller = new ScrollMagic.Controller({
    // show indicators
    addIndicators: true
});

// Set the background images
document.querySelector('.slide-1').style.backgroundImage = "url('img/toilets2.jpg')";
document.querySelector('.slide-2').style.backgroundImage = "url('img/map-base.jpg')";
document.querySelector('.slide-3').style.backgroundImage = "url('img/map.jpg')";
// document.querySelector('.slide-4').style.backgroundImage = "url('img/pit-latrine1.jpg')";
// document.querySelector('.slide-5').style.backgroundImage = "url('img/toilets1.jpg')";


// INIT
window.onload = () => {

    gsap.from(".slide-1", {
        opacity: 0,
        y: 20,
        duration: 1,
    });
    gsap.from(".panel-1", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 1
    });
};

// SLIDE 2

var timeline = new TimelineMax();
var tween1 = TweenMax.fromTo('.slide-2', { opacity: 0 }, { opacity: 1, duration: 0.2 });

timeline
    .add(tween1);

new ScrollMagic.Scene({
    triggerElement: '.panel-2',
    duration: document.querySelector('.panel-4').offsetTop - document.querySelector('.panel-2').offsetTop,
})
    .setTween(timeline)
    .setPin('.panel-2')
    .addTo(controller);



// SLIDE 3

var timeline = new TimelineMax();
var tween1 = TweenMax.fromTo('.slide-3', { opacity: 0 }, { opacity: 1, duration: 0.2 });

timeline
    .add(tween1);

new ScrollMagic.Scene({
    triggerElement: '.panel-3',
    
})
    .setTween(timeline)
    .addTo(controller);

// SLIDE 4

var timeline = new TimelineMax();
var tween1 = TweenMax.fromTo('.slide-4', { opacity: 0 }, { opacity: 1, duration: 0.2 });

timeline
    .add(tween1);

new ScrollMagic.Scene({
    triggerElement: '.panel-3',
    
})
    .setTween(timeline)
    .addTo(controller);

// CHARTS

// AGE AND GENDER BREAKDOWN

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
        },
        plugins: {
            legend: {
                display: false  
            }
        }
    }
});

// INSIDE AND OUTSIDE BREAKDOWN

const ctx2 = document.getElementById('inside-outside-fs').getContext('2d');
const inside_outside_fs = new Chart(ctx2, {
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
        labels: ['Both', 'Inside', 'Outside'],
        datasets: [{
            data: [0, 20, 0],  
            backgroundColor: ['#999999','#ffd06c', '#ff3d3b']
        }]
    }
});

const ctx3 = document.getElementById('inside-outside-kzn').getContext('2d');
const inside_outside_kzn = new Chart(ctx3, {
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
        labels: ['Both', 'Inside', 'Outside'],
        datasets: [{
            data: [9, 7, 4],  
            backgroundColor: ['#999999','#ffd06c', '#ff3d3b']
        }]
    }
});

const ctx4 = document.getElementById('inside-outside-lp').getContext('2d');
const inside_outside_lp = new Chart(ctx4, {
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
        labels: ['Both', 'Inside', 'Outside'],
        datasets: [{
            data: [8, 0, 12],  
            backgroundColor: ['#999999','#ffd06c', '#ff3d3b']
        }]
    }
});

// DISABLED ACCESS BREAKDOWN

const ctx5 = document.getElementById('disabled-access-fs').getContext('2d');
const disabled_access_fs = new Chart(ctx5, {
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
            data: [16, 4],  // FS values for No and Yes
            backgroundColor: ['#ffd06c', '#ff3d3b']
        }]
    }
});

const ctx6 = document.getElementById('disabled-access-kzn').getContext('2d');
const disabled_access_kzn = new Chart(ctx6, {
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
            data: [4, 16],  // KZN values for No and Yes
            backgroundColor: ['#ffd06c', '#ff3d3b']
        }]
    }
});

const ctx7 = document.getElementById('disabled-access-lp').getContext('2d');
const disabled_access_lp = new Chart(ctx7, {
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
            data: [6, 14],  // LP values for No and Yes
            backgroundColor: ['#ffd06c', '#ff3d3b']
        }]
    }
});


// UNUSABLE TOILETS BREAKDOWN

const ctx8 = document.getElementById('unusable-fs').getContext('2d');
const unusable_fs = new Chart(ctx8, {
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

const ctx9 = document.getElementById('unusable-kzn').getContext('2d');
const unusable_kzn = new Chart(ctx9, {
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

const ctx10 = document.getElementById('unusable-lp').getContext('2d');
const unusable_lp = new Chart(ctx10, {
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

// TOILET PAPER BREAKDOWN

const ctx11 = document.getElementById('toilet-paper-fs').getContext('2d');
const toilet_paper_fs = new Chart(ctx11, {
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
            data: [7, 3],  
            backgroundColor: ['#ff3d3b', '#ffd06c']
        }]
    }
});

const ctx12 = document.getElementById('toilet-paper-kzn').getContext('2d');
const toilet_paper_kzn = new Chart(ctx12, {
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
            data: [7, 3],  
            backgroundColor: ['#ff3d3b','#ffd06c']
        }]
    }
});

const ctx13 = document.getElementById('toilet-paper-lp').getContext('2d');
const toilet_paper_lp = new Chart(ctx13, {
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
            data: [10, 0],
            backgroundColor: ['#ff3d3b','#ffd06c']
        }]
    }
});

// TOILET PAPER BREAKDOWN BY GENDER

const ctx14 = document.getElementById('toilet-paper-female').getContext('2d');
const toilet_paper_female = new Chart(ctx14, {
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
            data: [25, 5],  
            backgroundColor: ['#ff3d3b','#ffd06c']
        }]
    }
});

const ctx15 = document.getElementById('toilet-paper-male').getContext('2d');
const toilet_paper_gender = new Chart(ctx15, {
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
            data: [24, 6], 
            backgroundColor: ['#ff3d3b', '#ffd06c']
        }]
    }
});

// HANDWASHING FACILITIES BREAKDOWN

const ctx16 = document.getElementById('hand-washing-fs').getContext('2d');
const hand_washing_fs = new Chart(ctx16, {
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
            data: [14, 6],  
            backgroundColor: ['#ff3d3b','#ffd06c']
        }]
    }
});

const ctx17 = document.getElementById('hand-washing-kzn').getContext('2d');
const hand_washing_kzn = new Chart(ctx17, {
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
            data: [13, 7],  
            backgroundColor: ['#ff3d3b','#ffd06c']
        }]
    }
});

const ctx18 = document.getElementById('hand-washing-lp').getContext('2d');
const hand_washing_lp = new Chart(ctx18, {
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
            data: [18, 2],  
            backgroundColor: ['#ff3d3b','#ffd06c']
        }]
    }
});


// DIRTY TOILETS


const ctx19 = document.getElementById('dirty-toilets-fs').getContext('2d');
const dirty_toilets_fs = new Chart(ctx19, {
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
        labels: ['Dirty Seat', 'Dirty Toilet Hole', 'Dirty Wall'],
        datasets: [{
            data: [2, 3, 0],  
            backgroundColor: ['#ffd06c', '#ff3d3b', '#940e0e']
        }]
    }
});

const ctx20 = document.getElementById('dirty-toilets-kzn').getContext('2d');
const dirty_toilets_kzn = new Chart(ctx20, {
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
        labels: ['Dirty Seat', 'Dirty Toilet Hole', 'Dirty Wall'],
        datasets: [{
            data: [2, 4, 2],  
            backgroundColor: ['#ffd06c', '#ff3d3b', '#940e0e']
        }]
    }
    
    
});

const ctx21 = document.getElementById('dirty-toilets-lp').getContext('2d');
const dirty_toilets_lp = new Chart(ctx21, {
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
        labels: ['Dirty Seat', 'Dirty Toilet Hole', 'Dirty Wall'],
        datasets: [{
            data: [9, 8, 3],  
            backgroundColor: ['#ffd06c', '#ff3d3b', '#940e0e']
        }]
    }
});


const ctx22 = document.getElementById('bathroom-usage').getContext('2d');
const bathroomUsageChart = new Chart(ctx22, {
    type: 'bar',
    data: {
        labels: ['100+', '21-50', '51-70', '71-100'],
        datasets: [
            {
                label: '0-10 mins',
                data: [11, 1, 1, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: '10-20 mins',
                data: [10, 6, 10, 8],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: '20-40 mins',
                data: [2, 2, 2, 2],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            },
            {
                label: '40-60 mins',
                data: [0, 0, 1, 1],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Number of People'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});

const ctx23 = document.getElementById('safety-gender').getContext('2d');
const genderChart = new Chart(ctx23, {
    type: 'bar',
    data: {
        labels: ['Female', 'Male'],
        datasets: [
            {
                label: 'No',
                data: [57, 53],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Yes',
                data: [55, 67],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        // indexAxis: 'y', 
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of People'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Gender'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});


const ctx24 = document.getElementById('safety-female-age').getContext('2d');
const ageChart = new Chart(ctx24, {
    type: 'bar',
    data: {
        labels: ['18-25 y/o', '26-40 y/o', '41-60 y/o', '60+ y/o'],
        datasets: [
            {
                label: 'No',
                data: [24, 29, 32, 26],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Yes',
                data: [13, 46, 27, 36],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Age Group'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of People'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});

const ctx25 = document.getElementById('clinic-visit').getContext('2d');
const genderColumnChart = new Chart(ctx25, {
    type: 'bar',
    data: {
        labels: ['Female', 'Male'],
        datasets: [
            {
                label: 'No',
                data: [73, 76],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Yes',
                data: [39, 44],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Gender'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of People'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});