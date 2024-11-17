DEBUG = false;

let chart_colors = {
    gender_male: '#ff3d3b',
    gender_female: '#ffd06c',

    prov_both: '#999999',
    prov_inside: '#ffd06c',
    prov_outside: '#ff3d3b',

    queue_0_10: '#FFF1DB',
    queue_10_20: '#D4BDAC',
    queue_20_40: '#536493',
    queue_40_60: '#EF5A6F',

    safety_yes: '#D4BDAC',
    safety_no: '#EF5A6F',

    women_safety_yes: '#D4BDAC',
    women_safety_no: '#EF5A6F',

    return_visits_female: '#D4BDAC',
    return_visits_male: '#EF5A6F'


}




document.addEventListener('DOMContentLoaded', function () {

    gsap.registerPlugin(ScrollTrigger);
    
    const background = document.querySelector('.scrolly-background');
    
    const offsetInPixels = window.innerHeight * 0.05;

    let currentBackgroundSrc = null; 
    let currentBackgroundColorClass = null; 
    let backgroundColorOverlay = document.querySelector('.scrolly-bg-color-overlay');

    function updateBackgroundImage(src) {
        
        if (!src || src === currentBackgroundSrc) {
            return;
        }

        const bgImage = document.querySelector('.scrolly-bg-image');

        const overlayImage = document.createElement('img');
        overlayImage.src = src;
        overlayImage.classList.add('scrolly-bg-image');
        overlayImage.style.position = 'absolute';
        overlayImage.style.top = '0';
        overlayImage.style.left = '0';
        overlayImage.style.width = '100%';
        overlayImage.style.height = '100%';
        overlayImage.style.objectFit = 'cover';
        overlayImage.style.zIndex = '-2';
        overlayImage.style.opacity = '0';

        bgImage.parentElement.appendChild(overlayImage);

        gsap.to(overlayImage, {
            opacity: 1,
            duration: 0.5,
            onComplete: () => {
                bgImage.remove();
                
                currentBackgroundSrc = src;
            }
        });
    }

    function updateBackgroundColorClass(newClass) {
        if (newClass === currentBackgroundColorClass) {
            return; 
        }

        if (currentBackgroundColorClass) {
            backgroundColorOverlay.classList.remove(currentBackgroundColorClass);
        }

        if (newClass) {
            backgroundColorOverlay.classList.add(newClass);
        }

        currentBackgroundColorClass = newClass;

    }

    document.querySelectorAll('.scrolly-section').forEach((section, index) => {
        // DEBUG
        const section_label = section.getAttribute('data-section-label');

        if (DEBUG == true) {
            let label = section.appendChild(document.createElement('div'));
            label.classList.add('scrolly-section-label');
            label.textContent = section_label;
            section.classList.add('debug');
        }

        const bg_src = section.getAttribute('data-background');
        const bg_color_class = section.getAttribute('data-section-color');

        ScrollTrigger.create({
            trigger: section,
            start: () => {
                const backgroundRect = background.getBoundingClientRect();
                return `top ${backgroundRect.height + offsetInPixels}px`;
            },
            end: () => {
                const backgroundRect = background.getBoundingClientRect();
                return `top ${offsetInPixels + backgroundRect.height / 2}px`;
            },

            onEnter: () => {
                if (section_label == 'start') {
                    document.body.classList.add('scrolly-showing');
                }

                if (section_label == 'conclusion') {
                    document.body.classList.remove('scrolly-showing');
                }

                if (bg_src) {
                    updateBackgroundImage(bg_src);
                }

                if (bg_color_class) {
                    updateBackgroundColorClass(bg_color_class);
                }
            },
            onLeaveBack: () => {
                if (section_label == 'start' || section_label == 'conclusion') {
                    if (section_label == 'start') {
                        document.body.classList.remove('scrolly-showing');
                    }
                }

                const prevSection = document.querySelectorAll('.scrolly-section')[index - 1];
                const prevBackground = prevSection ? prevSection.getAttribute('data-background') : null;
                const prevColorClass = prevSection ? prevSection.getAttribute('data-section-color') : null;

                if (prevBackground) {
                    updateBackgroundImage(prevBackground);
                }

                if (prevColorClass) {
                    updateBackgroundColorClass(prevColorClass);
                }
            }
        });
    });

    // END SCROLLY. UNSTICK

    ScrollTrigger.create({
        trigger: '.scrolly-section[data-section-label="end"]', 
        start: () => {
            const backgroundRect = background.getBoundingClientRect();
            return `top ${offsetInPixels}px`;
        },
        onEnter: () => {
            
            gsap.to('.scrolly-background', {
                position: 'relative',
                duration: 0.5,
                ease: 'power1.inOut'
            });
        },
        onLeaveBack: () => {
            
            gsap.to('.scrolly-background', {
                position: 'sticky',
                duration: 0.5,
                ease: 'power1.inOut'
            });
        }
    });

    // SCROLLY CAPTIONS FADE INS

    gsap.utils.toArray('.scrolly-section .scrolly-caption-box').forEach((caption) => {
        gsap.to(caption, {
            opacity: 1,
            duration: 0.2,
            scrollTrigger: {
                trigger: caption,
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `top ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `top ${offsetInPixels + backgroundRect.height / 2}px`;
                },
                scrub: true
            }
        });
    });



    /// CUSTOMISATION STARTS HERE

    /// PINS

    function pinSection(pinSection, startTrigger, endTrigger) {
        ScrollTrigger.create({
            trigger: `.scrolly-section[data-section-label="${startTrigger}"]`,
            start: () => {
                return `top ${offsetInPixels}px`;
            },
            endTrigger: `.scrolly-section[data-section-label="${endTrigger}"]`,
            end: 'top center',
            pin: `.scrolly-section[data-section-label="${pinSection}"]`,
            pinSpacing: false,
            scrub: true
        
        });
    }

    pinSection('start', 'start', 'they-visited');
    pinSection('they-visited', 'they-visited', '313-users');
    pinSection('313-users', '313-users', 'gender-breakdown');
    pinSection('gender-breakdown', 'gender-breakdown', 'outdoor-facilities');
    pinSection('outdoor-facilities', 'outdoor-facilities', 'disabled-access');
    pinSection('disabled-access', 'disabled-access', 'broken-toilets');
    pinSection('broken-toilets', 'broken-toilets', 'not-stocked');
    pinSection('not-stocked', 'not-stocked', 'unhygenic-toilets');
    pinSection('unhygenic-toilets', 'unhygenic-toilets', 'queues');
    pinSection('queues', 'queues', 'unsafe');
    pinSection('unsafe', 'unsafe', 'women-unsafe');
    pinSection('women-unsafe', 'women-unsafe', 'return-visits');
    pinSection('return-visits', 'return-visits', 'conclusion');

    ScrollTrigger.create({
        trigger: '.scrolly-section[data-section-label="conclusion"]',
        start: () => {
            const backgroundRect = background.getBoundingClientRect();
            return `top ${offsetInPixels}px`;
        },
        pin: '.scrolly-section[data-section-label="conclusion"]',
        pinSpacing: false,
        scrub: true,
    });


    /// ZOOMS AND PANS

    function zoomAndPan(startTrigger, endTrigger, startZoom, startX, startY, endZoom, endX, endY) {

        gsap.timeline({
            scrollTrigger: {
                trigger: `.scrolly-section[data-section-label='${startTrigger}']`,
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `top ${backgroundRect.height + offsetInPixels}px`;
                },
                endTrigger: `.scrolly-section[data-section-label='${endTrigger}']`,
                end: 'top center',
                scrub: true
            }
        })
            .from('.scrolly-bg-container', {
                scale: startZoom,
                x: startX,
                y: startY,
                duration: 0
            })
            .to('.scrolly-bg-container', {
                scale: endZoom,
                x: endX,
                y: endY,
                duration: 10
            });

    }

    zoomAndPan('start', 'they-visited', 1, 0, 0, 1.1, 0, 0);
    zoomAndPan('they-visited', '313-users', 1, 0, 0, 1.4, -100, 0);
    zoomAndPan('gender-breakdown', 'outdoor-facilities', 1.4, 0, 0, 1, 0, 0);


    /// ANNOTATIONS



    function fadeOutChart(label, trigger) {
        gsap.to(
            `.${label} .scrolly-annotation-inner`,
            {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: `.scrolly-section[data-section-label='${trigger}']`,
                    start: () => {
                        const backgroundRect = background.getBoundingClientRect();
                        return `top ${backgroundRect.height + offsetInPixels}px`;
                    },
                    end: () => {
                        const backgroundRect = background.getBoundingClientRect();
                        return `top ${offsetInPixels}px`;
                    }
                }
            });
    }


    function annotationFadeIn(label, trigger, isExtra = false) {

        let selector = !isExtra ? `.scrolly-slide-annotation[data-annotation-label='${label}']` : `.scrolly-annotation-element[data-annotation-label='${label}']`;

        gsap.fromTo(
            selector,
            { opacity: 0 },
            {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: `.scrolly-section[data-section-label='${trigger}']`,
                    start: () => {
                        const backgroundRect = background.getBoundingClientRect();
                        return `top ${backgroundRect.height + offsetInPixels}px`;
                    },
                    end: () => {
                        const backgroundRect = background.getBoundingClientRect();
                        return `top ${backgroundRect.height + offsetInPixels}px`;
                    }
                }
            }
        );
    }

    function annotationFadeOut(label, trigger, isExtra = false) {

        let selector = !isExtra ? `.scrolly-slide-annotation[data-annotation-label='${label}']` : `.scrolly-annotation-element[data-annotation-label='${label}']`;

        gsap.to(
            selector,
            {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: `.scrolly-section[data-section-label='${trigger}']`,
                    start: () => {
                        const backgroundRect = background.getBoundingClientRect();
                        return `top ${backgroundRect.height + offsetInPixels}px`;
                    },
                    end: () => {
                        const backgroundRect = background.getBoundingClientRect();
                        return `top ${backgroundRect.height + offsetInPixels}px`;
                    }
                }
            });
    }

    
    // TITLES INS AND OUTS



    // CHART ANNOTATIONS

    annotationFadeIn('fs', 'they-visited2');
    annotationFadeIn('kzn', 'they-visited3');
    annotationFadeIn('lp', 'they-visited4');
    annotationFadeOut('fs', 'gender-breakdown');
    annotationFadeOut('kzn', 'gender-breakdown');
    annotationFadeOut('lp', 'gender-breakdown');

    annotationFadeIn('male', 'gender-breakdown4');
    annotationFadeIn('female', 'gender-breakdown5');
    annotationFadeOut('male', 'outdoor-facilities');
    annotationFadeOut('female', 'outdoor-facilities');


    annotationFadeIn('inside', 'outdoor-facilities2');
    annotationFadeIn('outside', 'outdoor-facilities3');
    annotationFadeIn('both', 'outdoor-facilities4');
    annotationFadeOut('inside', 'disabled-access');
    annotationFadeOut('outside', 'disabled-access');
    annotationFadeOut('both', 'disabled-access');

    annotationFadeIn('pit-latrine', 'pit-latrine', true);
    annotationFadeOut('pit-latrine', 'disabled-access', true);

    annotationFadeIn('disabled-access-yes', 'disabled-access2');
    annotationFadeIn('disabled-access-no', 'disabled-access3');
    annotationFadeOut('disabled-access-yes', 'broken-toilets');
    annotationFadeOut('disabled-access-no', 'broken-toilets');
    annotationFadeIn('usable', 'broken-toilets2');
    annotationFadeIn('unusable', 'broken-toilets3');

    annotationFadeIn('broken-toilets-kzn-lp', 'broken-toilets-kzn-lp', true);
    annotationFadeOut('broken-toilets-kzn-lp', 'not-stocked', true);

    annotationFadeOut('usable', 'not-stocked');
    annotationFadeOut('unusable', 'not-stocked');
    annotationFadeIn('toilet-paper-yes', 'no-toilet-paper2');
    annotationFadeIn('toilet-paper-no', 'no-toilet-paper3');
    annotationFadeOut('toilet-paper-yes', 'no-sanitiser');
    annotationFadeOut('toilet-paper-no', 'no-sanitiser');
    annotationFadeIn('soap-yes', 'no-sanitiser2');
    annotationFadeIn('soap-no', 'no-sanitiser3');
    annotationFadeOut('soap-yes', 'unhygenic-toilets');
    annotationFadeOut('soap-no', 'unhygenic-toilets');
    annotationFadeIn('dirty-toilet', 'unhygenic-toilets2');
    annotationFadeIn('dirty-seat', 'unhygenic-toilets3');
    annotationFadeIn('dirty-wall', 'unhygenic-toilets4');
    annotationFadeOut('dirty-toilet', 'queues');
    annotationFadeOut('dirty-seat', 'queues');
    annotationFadeOut('dirty-wall', 'queues');

   


    

    // CHARTS

    // POPULATION CHART

    var data = {
        labels: ["18-25", "26-40", "41-60", "60+"],
        datasets: [
            {
                label: "Female",
                stack: "Stack 0",
                backgroundColor: chart_colors.gender_female,
                data: [0, 0, 0, 0].map((k) => -k),
            },
            {
                label: "Male",
                stack: "Stack 0",
                backgroundColor: chart_colors.gender_male,
                data: [0, 0, 0, 0],
            },
        ],
    };

    var options = {
        indexAxis: 'y',
        plugins: {
            tooltip: {
                callbacks: {
                    label: (c) => {
                        const value = Number(c.raw);
                        const positiveOnly = value < 0 ? -value : value;
                        return `${c.dataset.label}: ${positiveOnly.toString()}`;
                    },
                },
            },
            legend: false,
            annotation: {
                annotations: {
                    text_60: {
                        type: 'label',
                        xValue: 0,
                        yValue: '60+',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        borderRadius: 5,
                        content: ['60+'],
                        font: {
                            size: 12
                        }
                    },
                    text_41_60: {
                        type: 'label',
                        xValue: 0,
                        yValue: '41-60',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        borderRadius: 5,
                        content: ['41-60'],
                        font: {
                            size: 12
                        }
                    },
                    text_26_40: {
                        type: 'label',
                        xValue: 0,
                        yValue: '26-40',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        borderRadius: 5,
                        content: ['26-40'],
                        font: {
                            size: 12
                        }
                    },
                    text_18_25: {
                        type: 'label',
                        xValue: 0,
                        yValue: '18-25',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        borderRadius: 5,
                        content: ['18-25'],
                        font: {
                            size: 12
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                min: -60,
                max: 60,
                ticks: {
                    stepSize: 10,
                    callback: (v) => (v < 0 ? -v : v),
                    color: 'rgba(255,255,255,1)',
                },
                border: {
                    color: 'rgba(255,255,255,1)',
                    width: 2,
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)',
                    lineWidth: 1,
                    borderDash: [5, 5],
                },
                title: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                border: {
                    color: 'rgba(255,255,255,1)',
                    width: 0,
                },
                title: {
                    display: false,
                },
            },
        },
    };

    const population_chart = new Chart('population-chart', {
        type: 'bar',
        options: options,
        data: data,
    });


    // WAITING TIME CHART


    const queues_chart = new Chart('queues-chart', {
        type: 'bar',
        data: {
            labels: ['21-50', '51-70', '71-100', '100+'],
            datasets: [
                {
                    label: '0-10 mins',
                    data: [1, 1, 3, 0],
                    backgroundColor: chart_colors.queue_0_10,
                    borderColor: chart_colors.queue_0_10,
                    borderWidth: 0
                },
                {
                    label: '10-20 mins',
                    data: [6, 10, 8, 11],
                    backgroundColor: chart_colors.queue_10_20,
                    borderColor: chart_colors.queue_10_20,
                    borderWidth: 0
                },
                {
                    label: '20-40 mins',
                    data: [2, 2, 2, 10],
                    backgroundColor: chart_colors.queue_20_40,
                    borderColor: chart_colors.queue_20_40,
                    borderWidth: 0
                },
                {
                    label: '40-60 mins',
                    data: [0, 1, 1, 2],
                    backgroundColor: chart_colors.queue_40_60,
                    borderColor: chart_colors.queue_40_60,
                    borderWidth: 0
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People',
                        color: 'rgba(255,255,255,1)'
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'People Count Range',
                        color: 'rgba(255,255,255,1)',
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                title: {
                    display: false
                }
            }
        }
    });


    // PROVINCE CHARTS

    const doughnut_chart_options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            aannotation: {
                annotations: {
                    textAnnotation: {
                        type: 'label',
                        xValue: '50%',
                        yValue: '90%',
                        content: ['Important Segment'],
                        color: 'rgba(255, 255, 255, 0.9)',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                        padding: 6,
                        borderRadius: 4
                    }
                }
            }
        },
        borderWidth: 0
    };

    const doughnut_chart_init = {
        type: 'doughnut',
        options: doughnut_chart_options,
        data: {
            labels: ['Both', 'Inside', 'Outside'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [chart_colors.prov_both, chart_colors.prov_inside, chart_colors.prov_outside]
            }]
        }
    }

    const fs = new Chart('fs', doughnut_chart_init);
    const lp = new Chart('lp', doughnut_chart_init);
    const kzn = new Chart('kzn', doughnut_chart_init);

    

    // SAFETY CHART

    const safety_chart = new Chart('safety-chart', {
        type: 'bar',
        data: {
            labels: ['Yes', 'No'],
            datasets: [
                {
                    label: 'Male',
                    data: [1, 1, 3, 0],
                    backgroundColor: chart_colors.safety_yes,
                    borderColor: chart_colors.safety_yes,
                    borderWidth: 0
                },
                {
                    label: 'Female',
                    data: [6, 10, 8, 11],
                    backgroundColor: chart_colors.safety_no,
                    borderColor: chart_colors.safety_no,
                    borderWidth: 0
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People',
                        color: 'rgba(255,255,255,1)'
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'People Count Range',
                        color: 'rgba(255,255,255,1)',
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                title: {
                    display: false
                }
            }
        }
    });

    // WOMEN SAFETY CHART

    const women_safety_chart = new Chart('women-safety-chart', {
        type: 'bar',
        data: {
            labels: ['18-25', '26-40', '41-60', '60+'],
            datasets: [
                {
                    label: 'Yes',
                    data: [13, 46, 27, 36],
                    backgroundColor: chart_colors.women_safety_yes,
                    borderColor: chart_colors.women_safety_yes,
                    borderWidth: 0
                },
                {
                    label: 'No',
                    data: [24, 29, 32, 26],
                    backgroundColor: chart_colors.women_safety_no,
                    borderColor: chart_colors.women_safety_no,
                    borderWidth: 0
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People',
                        color: 'rgba(255,255,255,1)'
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Feels safe',
                        color: 'rgba(255,255,255,1)',
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                title: {
                    display: false
                }
            }
        }
    });

    // RETURN VISIT

    const return_visit_chart = new Chart('return-visit-chart', {
        type: 'bar',
        data: {
            labels: ['Yes', 'No'],
            datasets: [
                {
                    label: 'Female',
                    data: [73, 39],
                    backgroundColor: chart_colors.return_visits_female,
                },
                {
                    label: 'Male',
                    data: [76, 44],
                    backgroundColor: chart_colors.return_visits_male
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People',
                        color: 'rgba(255,255,255,1)'
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Feels safe',
                        color: 'rgba(255,255,255,1)',
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                        lineWidth: 1,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255,255,255,1)',
                    }
                },
                title: {
                    display: false
                }
            }
        }
    });


    // CHART DATA

    const female_age_distribution = [21, 57, 36, 33].map((k) => -k);
    const male_age_distribution = [27, 55, 45, 38];

    const fs_inside_outside = [0, 20, 0];
    const lp_inside_outside = [8, 0, 12];
    const kzn_inside_outside = [9, 7, 4];

    const fs_disabled_access = [0, 4, 16];
    const lp_disabled_access = [0, 16, 6];
    const kzn_disabled_access = [0, 16, 4];

    const fs_unusable_toilets = [0, 44, 65];
    const lp_unusable_toilets = [0, 6, 95];
    const kzn_unusable_toilets = [0, 27, 76];

    const fs_toilet_paper = [0, 3, 7];
    const lp_toilet_paper = [0, 0, 10];
    const kzn_toilet_paper = [0, 3, 7];

    const fs_no_sanitiser = [0, 6, 14];
    const lp_no_sanitiser = [0, 2, 18];
    const kzn_no_sanitiser = [0, 7, 13];

    const fs_dirty_toilets = [2, 3, 0];
    const lp_dirty_toilets = [9, 8, 3];
    const kzn_dirty_toilets = [2, 4, 2];

    // GENDER BREAKDOWN


    gsap.timeline({

        scrollTrigger: {
            trigger: ".scrolly-section[data-section-label='gender-breakdown']",
            start: () => {
                const backgroundRect = background.getBoundingClientRect();
                return `center ${backgroundRect.height + offsetInPixels}px`;
            },
            end: () => {
                const backgroundRect = background.getBoundingClientRect();
                return `bottom ${backgroundRect.height + offsetInPixels}px`;
            },
            scrub: true


        }
    })
        .fromTo(
            ".scrolly-chart-2",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        )
        .to(population_chart.data.datasets[0].data, { endArray: female_age_distribution, ease: "none", onUpdate: function () { population_chart.update(); } }, 0)
        .to(population_chart.data.datasets[1].data, { endArray: male_age_distribution, ease: "none", onUpdate: function () { population_chart.update(); } }, 0);
        

    fadeOutChart('scrolly-chart-2', 'outdoor-facilities');

    // PROVINCE BREAKDOWN CHART ANIMATION

    // INSIDE/OUTSIDE

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='outdoor-facilities']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .fromTo(
            ".scrolly-chart-1",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        )
        .to(fs.data.datasets[0].data, { endArray: fs_inside_outside, ease: "none", onUpdate: function () { fs.update(); } }, 0)
        .to(lp.data.datasets[0].data, { endArray: lp_inside_outside, ease: "none", onUpdate: function () { lp.update(); } }, 0)
        .to(kzn.data.datasets[0].data, { endArray: kzn_inside_outside, ease: "none", onUpdate: function () { kzn.update(); } }, 0);


    // DISABLED

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='disabled-access']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .to(fs.data.datasets[0].data, { endArray: fs_disabled_access, ease: "none", onUpdate: function () { fs.update(); } }, 0)
        .to(lp.data.datasets[0].data, { endArray: lp_disabled_access, ease: "none", onUpdate: function () { lp.update(); } }, 0)
        .to(kzn.data.datasets[0].data, { endArray: kzn_disabled_access, ease: "none", onUpdate: function () { kzn.update(); } }, 0);

    // UNUSABLE

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='broken-toilets']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .to(fs.data.datasets[0].data, { endArray: fs_unusable_toilets, ease: "none", onUpdate: function () { fs.update(); } }, 0)
        .to(lp.data.datasets[0].data, { endArray: lp_unusable_toilets, ease: "none", onUpdate: function () { lp.update(); } }, 0)
        .to(kzn.data.datasets[0].data, { endArray: kzn_unusable_toilets, ease: "none", onUpdate: function () { kzn.update(); } }, 0);

    // TOILET PAPER

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='no-toilet-paper']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .to(fs.data.datasets[0].data, { endArray: fs_toilet_paper, ease: "none", onUpdate: function () { fs.update(); } }, 0)
        .to(lp.data.datasets[0].data, { endArray: lp_toilet_paper, ease: "none", onUpdate: function () { lp.update(); } }, 0)
        .to(kzn.data.datasets[0].data, { endArray: kzn_toilet_paper, ease: "none", onUpdate: function () { kzn.update(); } }, 0);

    // SANITISER

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='no-sanitiser']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .to(fs.data.datasets[0].data, { endArray: fs_no_sanitiser, ease: "none", onUpdate: function () { fs.update(); } }, 0)
        .to(lp.data.datasets[0].data, { endArray: lp_no_sanitiser, ease: "none", onUpdate: function () { lp.update(); } }, 0)
        .to(kzn.data.datasets[0].data, { endArray: kzn_no_sanitiser, ease: "none", onUpdate: function () { kzn.update(); } }, 0);

    // DIRTY TOILETS

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='unhygenic-toilets']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .to(fs.data.datasets[0].data, { endArray: fs_dirty_toilets, ease: "none", onUpdate: function () { fs.update(); } }, 0)
        .to(lp.data.datasets[0].data, { endArray: lp_dirty_toilets, ease: "none", onUpdate: function () { lp.update(); } }, 0)
        .to(kzn.data.datasets[0].data, { endArray: kzn_dirty_toilets, ease: "none", onUpdate: function () { kzn.update(); } }, 0);

    // FADE OUT PROVINCE CHART

    fadeOutChart('scrolly-chart-1', 'queues');

    // QUEUES CHART

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='queues']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .fromTo(
            ".scrolly-chart-3",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        );

    fadeOutChart('scrolly-chart-3', 'unsafe');

    // SAFETY

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='unsafe']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .fromTo(
            ".scrolly-chart-4",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        );

    fadeOutChart('scrolly-chart-4', 'women-unsafe');

    // WOMEN SAFETY

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='women-unsafe']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .fromTo(
            ".scrolly-chart-5",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        );

    fadeOutChart('scrolly-chart-5', 'return-visits');


    // RETURN VISITS

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".scrolly-section[data-section-label='return-visits']",
                start: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `center ${backgroundRect.height + offsetInPixels}px`;
                },
                end: () => {
                    const backgroundRect = background.getBoundingClientRect();
                    return `bottom ${backgroundRect.height + offsetInPixels}px`;
                },
                scrub: true
            }
        })
        .fromTo(
            ".scrolly-chart-6",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        );

    fadeOutChart('scrolly-chart-6', 'conclusion');

})
