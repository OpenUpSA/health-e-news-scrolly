DEBUG = false;

let chart_colors = {
    gender_male: '#ff3d3b',
    gender_female: '#ffd06c',

    prov_both: '#999999',
    prov_inside: '#ffd06c',
    prov_outside: '#ff3d3b',

  
    safety_yes: '#ffd06c',
    safety_no: '#ff3d3b',

    women_safety_yes: '#FFD06C',
    women_safety_no: '#FF3D3B',

    unhygenic_seat: '#FFD06C',
    unhygenic_bowl: '#FF3D3B',
    unhygenic_wall: '#999999',

    return_visits_yes: '#ff3d3b',
    return_visits_no: '#FFD06C',

    queues_over_20: '#ff3d3b',
    queues_under_20: '#FFD06C'




}

let responsive_settings = {
    gender_age_labels: 10,
    dirty_toilets_labels: 10

}




document.addEventListener('DOMContentLoaded', function () {

    // MEDIA QUERIES

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMediaQueryChange(e) {
        if (e.matches) {
            console.log('Screen is small (<=768px)');

        } else {
            console.log('Screen is large (>768px)');
            responsive_settings.gender_age_labels = 16;
            responsive_settings.dirty_toilets_labels = 16;
        }
    }

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);





    gsap.registerPlugin(ScrollTrigger);

    const background = document.querySelector('.scrolly-background');

    const offsetInPixels = window.innerHeight * 0.1;

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

    let sections_count = document.querySelectorAll('.scrolly-section').length;

    console.log(sections_count);

    // THE SCROLLY

    document.querySelectorAll('.scrolly-section').forEach((section, index) => {

        // DEBUG

        const section_label = section.getAttribute('data-section-label');

        if (DEBUG == true) {
            let label = section.appendChild(document.createElement('div'));
            label.classList.add('scrolly-section-label');
            label.textContent = index+1 + ': ' + section_label;
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

                // BACKGROUND TO BLACK

                // if (section_label == 'start') {
                //     document.body.classList.add('scrolly-showing');
                // }

                // if (section_label == 'conclusion') {
                //     document.body.classList.remove('scrolly-showing');
                // }

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

    document.querySelectorAll('.scrolly-section[data-unpin-section]').forEach((section, index) => {

        let section_label = section.getAttribute('data-section-label');
        let endTrigger = section.getAttribute('data-unpin-section');

        pinSection(section_label, section_label, endTrigger);

    });

    
    
   

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

    // zoomAndPan('start', 'they-visited', 1, 0, 0, 1.1, 0, 0);
    // zoomAndPan('they-visited', '313-users', 1, 0, 0, 1.4, -100, 0);
    // zoomAndPan('gender-breakdown', 'outdoor-facilities', 1.4, 0, 0, 1, 0, 0);
    // zoomAndPan('outdoor-facilities', 'disabled-access', 1.2, 0, 0, 1, 0, 0);


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
   

    function annotationFadeIn(label, timeIn, offset, speed) {

        let selector = `.scrolly-slide-annotation[data-annotation-label='${label}']`;

        let timeInSlide = document.querySelector(`.scrolly-section[data-section-label='${timeIn}']`);

        if(timeInSlide == null) {
            console.log('Slide not found: ' + timeIn);
        }
        
        let timeInOffset = timeInSlide.getBoundingClientRect().top;

        const backgroundRect = background.getBoundingClientRect();

        gsap.fromTo(
            selector,
            { opacity: 0 },
            {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    start: `${timeInOffset + offset} ${offsetInPixels + backgroundRect.height}`, 
                    end: `${timeInOffset + offset + speed} ${offsetInPixels}`,  
                }
            }
        );

    }

    function annotationFadeOut(label, timeOut, offset, speed) {

        let selector = `.scrolly-slide-annotation[data-annotation-label='${label}']`;

        let timeOutSlide = document.querySelector(`.scrolly-section[data-section-label='${timeOut}']`);

        if(timeOutSlide == null) {
            console.log('Slide not found: ' + timeOut);
        }

        let timeOutOffset = timeOutSlide.getBoundingClientRect().top;

        const backgroundRect = background.getBoundingClientRect();

        // Fade out
        gsap.fromTo(
            selector,
            { opacity: 1 }, 
            {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    start: `${timeOutOffset + offset} ${offsetInPixels + backgroundRect.height}`, 
                    end: `${timeOutOffset + offset + speed} ${offsetInPixels}`,  
                },
                immediateRender: false 
            }
        );

    }

    document.querySelectorAll('.scrolly-slide-annotation[data-annotation-in]').forEach((annotation, index) => {

        let annotation_label = annotation.getAttribute('data-annotation-label');
        let annotation_time_in = annotation.getAttribute('data-annotation-in');
        let annotation_offset = annotation.getAttribute('data-annotation-offset') ? parseFloat(annotation.getAttribute('data-annotation-offset')) : 0;
        let annotation_speed = annotation.getAttribute('data-annotation-speed') ? parseFloat(annotation.getAttribute('data-annotation-speed')) : 0;

        annotationFadeIn(annotation_label, annotation_time_in, annotation_offset, annotation_speed);

    });

    document.querySelectorAll('.scrolly-slide-annotation[data-annotation-in]').forEach((annotation, index) => {

        let annotation_label = annotation.getAttribute('data-annotation-label');
        let annotation_time_out = annotation.getAttribute('data-annotation-out');
        let annotation_offset_out = annotation.getAttribute('data-annotation-offset-out') ? parseFloat(annotation.getAttribute('data-annotation-offset-out')) : 0;
        let annotation_speed_out = annotation.getAttribute('data-annotation-speed-out') ? parseFloat(annotation.getAttribute('data-annotation-speed-out')) : 0;

        annotationFadeOut(annotation_label, annotation_time_out, annotation_offset_out, annotation_speed_out);

    });
        






    // CHARTS

    Chart.defaults.animation.duration = 300;

    

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
                            size: responsive_settings.gender_age_labels
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
                            size: responsive_settings.gender_age_labels
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
                            size: responsive_settings.gender_age_labels
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
                            size: responsive_settings.gender_age_labels
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


    // UNHYGENIC TOILETS

    

    const unhygenic_toilets = new Chart('unhygenic-toilets-chart', {
        type: 'bar',
        data: {
            labels: ['FS', 'KZN', 'LP'],
            datasets: [
                {
                    label: 'Seat',
                    data: [0, 0, 0],
                    backgroundColor: chart_colors.unhygenic_seat
                },
                {
                    label: 'Toilet bowl',
                    data: [0, 0, 0],
                    backgroundColor: chart_colors.unhygenic_bowl
                },
                {
                    label: 'Wall',
                    data: [0, 0, 0],
                    backgroundColor: chart_colors.unhygenic_wall
                }
            ]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    display: false
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                        font: {
                            size: responsive_settings.dirty_toilets_labels,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });


    

    


    // DOUGHNUT CHARTS

    const doughnut_chart_options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
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

    const doughnut_chart_safety_init = {
        type: 'doughnut',
        options: doughnut_chart_options,
        data: {
            labels: ['No', 'Yes'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [chart_colors.safety_no, chart_colors.safety_yes]
            }]
        }
    }

    const doughnut_chart_return_visits_init = {
        type: 'doughnut',
        options: doughnut_chart_options,
        data: {
            labels: ['No', 'Yes'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [chart_colors.return_visits_no, chart_colors.return_visits_yes]
            }]
        }
    }

    const doughnut_chart_waiting_time_init = {
        type: 'doughnut',
        options: doughnut_chart_options,
        data: {
            labels: ['Under 20 minutes', 'Over 20 minutes'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [chart_colors.queues_under_20, chart_colors.queues_over_20]
            }]
        }
    }


    const fs = new Chart('fs', doughnut_chart_init);
    const lp = new Chart('lp', doughnut_chart_init);
    const kzn = new Chart('kzn', doughnut_chart_init);

    const safety_male = new Chart('safety-chart-male', doughnut_chart_safety_init);
    const safety_female = new Chart('safety-chart-female', doughnut_chart_safety_init);

    const return_visits_chart_fs = new Chart('return-visits-chart-fs', doughnut_chart_return_visits_init);
    const return_visits_chart_lp = new Chart('return-visits-chart-lp', doughnut_chart_return_visits_init);
    const return_visits_chart_kzn = new Chart('return-visits-chart-kzn', doughnut_chart_return_visits_init);

    const queues_chart_21_50 = new Chart('queues-chart-21-50', doughnut_chart_waiting_time_init);
    const queues_chart_51_70 = new Chart('queues-chart-51-70', doughnut_chart_waiting_time_init);
    const queues_chart_71_100 = new Chart('queues-chart-71-100', doughnut_chart_waiting_time_init);
    const queues_chart_100 = new Chart('queues-chart-100', doughnut_chart_waiting_time_init);
    

    // WOMEN SAFETY CHART

    const women_safety_chart = new Chart('women-safety-chart', {
        type: 'bar',
        data: {
            labels: ['18-25', '26-40', '41-60', '60+'],
            datasets: [
                {
                    label: 'Yes',
                    data: [0, 0, 0, 0],
                    backgroundColor: chart_colors.women_safety_yes,
                    borderColor: chart_colors.women_safety_yes,
                    borderWidth: 0
                },
                {
                    label: 'No',
                    data: [0, 0, 0, 0],
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
                        display: false,
                    },
                    border: {
                        display: false,
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                    }
                },
                x: {
                    title: {
                        display: false,
                    },
                    border: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: 'rgba(255,255,255,1)',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false
                },
                datalabels: {
                    color: '#fff',
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => parseInt(value) 
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    // RETURN VISIT

    

    


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

    const unhygenic_toilets_seat = [2, 2, 9];
    const unhygenic_toilets_bowl = [3, 4, 8];
    const unhygenic_toilets_wall = [0, 2, 3];  

    const queues_21_50 = [7, 2];
    const queues_51_70 = [11, 3];
    const queues_71_100 = [11, 3];
    const queues_100 = [11, 12];

    const safety_chart_female = [78, 69];
    const safety_chart_male = [67, 98];

    const women_safety_yes = [13, 46, 27, 36];
    const women_safety_no = [24, 29, 32, 26];

    const return_visits_fs = [72, 37];
    const return_visits_lp = [64, 37];
    const return_visits_kzn = [13, 10];
    

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


    fadeOutChart('scrolly-chart-2', 'gender-breakdown4');

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


    fadeOutChart('scrolly-chart-1', 'not-stocked2');   

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
        .fromTo(
            ".scrolly-chart-7",
            { opacity: 0 },
            { opacity: 1, ease: "none" }
        )
        .to(unhygenic_toilets.data.datasets[0].data, { endArray: unhygenic_toilets_seat, ease: "none", onUpdate: function () { unhygenic_toilets.update(); } }, 0)
        .to(unhygenic_toilets.data.datasets[1].data, { endArray: unhygenic_toilets_bowl, ease: "none", onUpdate: function () { unhygenic_toilets.update(); } }, 0)
        .to(unhygenic_toilets.data.datasets[2].data, { endArray: unhygenic_toilets_wall, ease: "none", onUpdate: function () { unhygenic_toilets.update(); } }, 0);
       

    // FADE OUT PROVINCE CHART

    
    fadeOutChart('scrolly-chart-7', 'unhygenic-toilets4');

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
        )
        .to(queues_chart_21_50.data.datasets[0].data, { endArray: queues_21_50, ease: "none", onUpdate: function () { queues_chart_21_50.update(); } }, 0)
        .to(queues_chart_51_70.data.datasets[0].data, { endArray: queues_51_70, ease: "none", onUpdate: function () { queues_chart_51_70.update(); } }, 0)
        .to(queues_chart_71_100.data.datasets[0].data, { endArray: queues_71_100, ease: "none", onUpdate: function () { queues_chart_71_100.update(); } }, 0)
        .to(queues_chart_100.data.datasets[0].data, { endArray: queues_100, ease: "none", onUpdate: function () { queues_chart_100.update(); } }, 0);

    fadeOutChart('scrolly-chart-3', 'queues4');

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
        )
        .to(safety_male.data.datasets[0].data, { endArray: safety_chart_male, ease: "none", onUpdate: function () { safety_male.update(); } }, 0)
        .to(safety_female.data.datasets[0].data, { endArray: safety_chart_female, ease: "none", onUpdate: function () { safety_female.update(); } }, 0);

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
        )
        .to(women_safety_chart.data.datasets[0].data, { endArray: women_safety_yes, ease: "none", onUpdate: function () { women_safety_chart.update(); } }, 0)
        .to(women_safety_chart.data.datasets[1].data, { endArray: women_safety_no, ease: "none", onUpdate: function () { women_safety_chart.update(); } }, 0);

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
        )
        .to(return_visits_chart_fs.data.datasets[0].data, { endArray: return_visits_fs, ease: "none", onUpdate: function () { return_visits_chart_fs.update(); } }, 0)
        .to(return_visits_chart_lp.data.datasets[0].data, { endArray: return_visits_lp, ease: "none", onUpdate: function () { return_visits_chart_lp.update(); } }, 0)
        .to(return_visits_chart_kzn.data.datasets[0].data, { endArray: return_visits_kzn, ease: "none", onUpdate: function () { return_visits_chart_kzn.update(); } }, 0);

    fadeOutChart('scrolly-chart-6', 'conclusion');

})
