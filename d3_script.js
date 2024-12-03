webflow.script.ready(() => {

    

    

        DEBUG = true;



        let chart_colors = {
            gender_male: '#ff3d3b',
            gender_female: '#ffd06c',

            prov_both: '#999999',
            prov_inside: '#ffd06c',
            prov_outside: '#ff3d3b',

            donut1: '#999999',
            donut2: '#ffd06c',
            donut3: '#ff3d3b',

        
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

        

            

        

            
            
            

            // END SCROLLY. UNSTICK

            // ScrollTrigger.create({
            //     trigger: '.scrolly-section[data-section-label="end"]',
            //     start: () => {
            //         const backgroundRect = background.getBoundingClientRect();
            //         return `top ${offsetInPixels}px`;
            //     },
            //     onEnter: () => {

            //         gsap.to('.scrolly-background', {
            //             position: 'relative',
            //             duration: 0.5,
            //             ease: 'power1.inOut'
            //         });
            //     },
            //     onLeaveBack: () => {

            //         gsap.to('.scrolly-background', {
            //             position: 'sticky',
            //             duration: 0.5,
            //             ease: 'power1.inOut'
            //         });
            //     }
            // });

            // SCROLLY CAPTIONS FADE INS

            // gsap.utils.toArray('.scrolly-section .scrolly-caption-box').forEach((caption) => {
            //     gsap.to(caption, {
            //         opacity: 1,
            //         duration: 0.2,
            //         scrollTrigger: {
            //             trigger: caption,
            //             start: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `top ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             end: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `top ${offsetInPixels + backgroundRect.height / 2}px`;
            //             },
            //             scrub: true
            //         }
            //     });
            // });



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

            // document.querySelectorAll('.scrolly-slide-annotation[data-annotation-in]').forEach((annotation, index) => {

            //     let annotation_label = annotation.getAttribute('data-annotation-label');
            //     let annotation_time_in = annotation.getAttribute('data-annotation-in');
            //     let annotation_offset = annotation.getAttribute('data-annotation-offset') ? parseFloat(annotation.getAttribute('data-annotation-offset')) : 0;
            //     let annotation_speed = annotation.getAttribute('data-annotation-speed') ? parseFloat(annotation.getAttribute('data-annotation-speed')) : 0;

            //     annotationFadeIn(annotation_label, annotation_time_in, annotation_offset, annotation_speed);

            // });

            // document.querySelectorAll('.scrolly-slide-annotation[data-annotation-in]').forEach((annotation, index) => {

            //     let annotation_label = annotation.getAttribute('data-annotation-label');
            //     let annotation_time_out = annotation.getAttribute('data-annotation-out');
            //     let annotation_offset_out = annotation.getAttribute('data-annotation-offset-out') ? parseFloat(annotation.getAttribute('data-annotation-offset-out')) : 0;
            //     let annotation_speed_out = annotation.getAttribute('data-annotation-speed-out') ? parseFloat(annotation.getAttribute('data-annotation-speed-out')) : 0;

            //     annotationFadeOut(annotation_label, annotation_time_out, annotation_offset_out, annotation_speed_out);

            // });
                






            // CHARTS

            // CHART DATA

            const female_age_distribution = [21, 57, 36, 33].map((k) => -k);
            const male_age_distribution = [27, 55, 45, 38];

        

            const inside_outside_blank = [
                {
                    label: '1',
                    value: 0
                },
                {
                    label: '2',
                    value: 0
                },
                {
                    label: '3',
                    value: 0
                }
            ]

            const fs_inside_outside = [
                {
                    label: '1',
                    value: 0
                }, {
                    label: '2',
                    value: 20, 
                },{
                    label: '3',
                    value: 0
                }
            ];

            const lp_inside_outside = [
                {
                    label: '1',
                    value: 8
                }, {
                    label: '2',
                    value: 0, 
                },{
                    label: '3',
                    value: 12
                }
            ];

            const kzn_inside_outside = [
                {
                    label: '1',
                    value: 9
                }, {
                    label: '2',
                    value: 7, 
                },{
                    label: '3',
                    value: 4
                }
            ];

            const fs_disabled_access = [
                {
                    label: '1',
                    value: 0
                }, {
                    label: '2',
                    value: 4, 
                },{
                    label: '3',
                    value: 16
                }
            ];

            const lp_disabled_access = [
                {
                    label: '1',
                    value: 0
                }, {
                    label: '2',
                    value: 16,
                },{
                    label: '3',
                    value: 6
                }
            ];

            const kzn_disabled_access = [
                {
                    label: '1',
                    value: 0
                }, {
                    label: '2',
                    value: 16,
                },{
                    label: '3',
                    value: 4
                }
            ];

            const fs_unusable_toilets = [
                {
                    label: '1',
                    value: 0
                }, {
                    label: '2',
                    value: 44,
                },{
                    label: '3',
                    value: 65
                }
            ];

            const lp_unusable_toilets = [
                {
                    label: '1',
                    value: 0
                }, {
                    label: '2',
                    value: 6,
                },{
                    label: '3',
                    value: 95
                }
            ];

            const kzn_unusable_toilets = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 27,
                },{
                    label: 'No',
                    value: 76
                }
            ];

            const fs_toilet_paper = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 3,
                },{
                    label: 'No',
                    value: 7
                }
            ];

            const lp_toilet_paper = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 0,
                },{
                    label: 'No',
                    value: 10
                }
            ];

            const kzn_toilet_paper = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 3,
                },{
                    label: 'No',
                    value: 7
                }
            ];

            const fs_no_sanitiser = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 6,
                },{
                    label: 'No',
                    value: 14
                }
            ];

            const lp_no_sanitiser = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 2,
                },{
                    label: 'No',
                    value: 18
                }
            ];

            const kzn_no_sanitiser = [
                {
                    label: '',
                    value: 0
                }, {
                    label: 'Yes',
                    value: 7,
                },{
                    label: 'No',
                    value: 13
                }
            ];


        

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

            let activeData = {
                fs: fs_inside_outside,
                lp: lp_inside_outside,
                kzn: kzn_inside_outside
            };
            

            // POPULATION CHART
            
            
            function drawChart(id, data, title, colors = [chart_colors.donut1, chart_colors.donut2, chart_colors.donut3]) {


                const container = d3.select(`#${id}`);
                const rect = container.node().getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const margin = { top: 0, right: 0, bottom: 0, left: 0 };
                const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right);

                console.log('drawing', rect, width, height, radius);

            
                // Set color scale
                let color = d3.scaleOrdinal()
                    .domain(data.map(d => d.label))
                    .range(colors);
            
                // Check if SVG exists
                let svg = container.select('svg');
                if (svg.empty()) {
                    // Create SVG element
                    svg = container
                        .append('svg')
                        .attr('width', '100%')
                        .attr('height', '100%')
                        .attr('viewBox', `0 0 ${width} ${height}`)
                        .attr('preserveAspectRatio', 'xMinYMin meet')
                        .append('g')
                        .attr('transform', `translate(${width / 2}, ${height / 2})`);
            
                    // Add title
                    svg.append('text')
                        .attr('class', 'chart-title')
                        .attr('text-anchor', 'middle')
                        .attr('fill', '#fff')
                        .attr('font-size', '0.9em')
                        .attr('dy', '0.5em')
                        .attr('font-weight', 'bold')
                        .text(title);
                } else {
                    svg = svg.select('g');
                    svg.attr('transform', `translate(${width / 2}, ${height / 2})`);
                }
            
                // Generate the pie and arcs
                const pie = d3.pie()
                    .value(d => d.value)
                    .sort(null);
            
                const arc = d3.arc()
                    .innerRadius(radius * 0.5)
                    .outerRadius(radius);
            
                // Bind data to arcs
                const arcs = svg.selectAll('.arc')
                    .data(pie(data), d => d.data.label);
            
                // Exit
                arcs.exit()
                    .remove();
            
                // Enter
                const arcsEnter = arcs.enter()
                    .append('g')
                    .attr('class', 'arc');
            
                arcsEnter.append('path')
                    .attr('fill', d => color(d.data.label))
                    .each(function (d) { this._current = d; });
            
                // Update
                arcsEnter.merge(arcs).select('path')
                    .transition()
                    .duration(750)
                    .attrTween('d', function (d) {
                        const interpolate = d3.interpolate(this._current, d);
                        this._current = interpolate(1);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });
            
                // Add and update points
                arcsEnter.merge(arcs).each(function (d) {
                    const numPoints = 5;
            
                    const pointsData = [];
                    for (let i = 1; i <= numPoints; i++) {
                        const t = i / (numPoints + 1);
                        const angle = d.startAngle + t * (d.endAngle - d.startAngle);
                        const innerRadius = arc.innerRadius()(d);
                        const outerRadius = arc.outerRadius()(d);
                        const middleRadius = (innerRadius + outerRadius) / 2;
                        const x = middleRadius * Math.cos(angle - Math.PI / 2);
                        const y = middleRadius * Math.sin(angle - Math.PI / 2);
                        pointsData.push({ x, y });
                    }
            
                    let pointsGroup = d3.select(this).select('.points-group');
                    if (pointsGroup.empty()) {
                        pointsGroup = d3.select(this).append('g').attr('class', 'points-group');
                    }
            
                    const circles = pointsGroup.selectAll('circle')
                        .data(pointsData);
            
                    circles.exit().remove();
            
                    circles.enter()
                        .append('circle')
                        .attr('class', (d, i) => `point-${i}`)
                        .attr('r', 1)
                        .attr('fill', '#000')
                        .attr('cx', d => d.x)
                        .attr('cy', d => d.y);
            
                    circles.transition()
                        .duration(750)
                        .attr('cx', d => d.x)
                        .attr('cy', d => d.y);
                });
            }
            
            
            function updateChart(id, newData, radius, colors = [chart_colors.donut1, chart_colors.donut2, chart_colors.donut3]) {
                const container = d3.select(`#${id}`);
                const svg = container.select('svg').select('g');
            
                // Set color scale
                const color = d3.scaleOrdinal()
                    .domain(newData.map(d => d.label))
                    .range(colors);
            
                // Generate the pie
                const pie = d3.pie()
                    .value(d => d.value)
                    .sort(null);
            
                // Generate the arcs
                const arc = d3.arc()
                    .innerRadius(radius * 0.5)
                    .outerRadius(radius);
            
                // Bind data
                const arcs = svg.selectAll('.arc')
                    .data(pie(newData), d => d.data.label);
            
                // Exit
                arcs.exit().remove();
            
                // Enter
                const arcsEnter = arcs.enter()
                    .append('g')
                    .attr('class', 'arc');
            
                arcsEnter.append('path')
                    .attr('fill', d => color(d.data.label))
                    .each(function (d) {
                        this._current = { startAngle: d.startAngle, endAngle: d.startAngle };
                    });
            
                // Update
                arcsEnter.merge(arcs).select('path')
                    .transition()
                    .duration(750)
                    .attrTween('d', function (d) {
                        const interpolate = d3.interpolate(this._current, d);
                        this._current = interpolate(1);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });
            
                // Add and update points
                arcsEnter.merge(arcs).each(function (d) {
                    const numPoints = 5;
            
                    const pointsData = [];
                    for (let i = 1; i <= numPoints; i++) {
                        const t = i / (numPoints + 1);
                        const angle = d.startAngle + t * (d.endAngle - d.startAngle);
                        const innerRadius = arc.innerRadius()(d);
                        const outerRadius = arc.outerRadius()(d);
                        const middleRadius = (innerRadius + outerRadius) / 2;
                        const x = middleRadius * Math.cos(angle - Math.PI / 2);
                        const y = middleRadius * Math.sin(angle - Math.PI / 2);
                        pointsData.push({ x, y });
                    }
            
                    let pointsGroup = d3.select(this).select('.points-group');
                    if (pointsGroup.empty()) {
                        pointsGroup = d3.select(this).append('g').attr('class', 'points-group');
                    }
            
                    const circles = pointsGroup.selectAll('circle')
                        .data(pointsData);
            
                    circles.exit().remove();
            
                    circles.enter()
                        .append('circle')
                        .attr('class', (d, i) => `point-${i}`)
                        .attr('r', 1)
                        .attr('fill', '#000')
                        .attr('cx', d => d.x)
                        .attr('cy', d => d.y);
            
                    circles.transition()
                        .duration(750)
                        .attr('cx', d => d.x)
                        .attr('cy', d => d.y);
                });
            }
            
            
            
            
            
            
            function updateAllCharts() {
                const rect = d3.select('#fs').node().getBoundingClientRect();
                const radius = Math.min(rect.width, rect.height) / 2;
            
                updateChart('fs', activeData.fs, radius);
                updateChart('lp', activeData.lp, radius);
                updateChart('kzn', activeData.kzn, radius);
            }

            // on pressing a keyboard key (for debugging)
            document.addEventListener('keydown', function (event) {
                if (event.key === 'ArrowRight') {
                    console.log('hey');
                    const rect = d3.select('#fs').node().getBoundingClientRect();
                    const radius = Math.min(rect.width, rect.height) / 2;

                    console.log(fs_inside_outside);

                    updateChart('fs', fs_inside_outside, radius);
                    updateChart('lp', lp_inside_outside, radius);
                    updateChart('kzn', kzn_inside_outside, radius);
                }
            });

            
            

        

            function add_label(chart, slice_id, point_id, hour, anchor, text, line_config = {}, text_config = {}) {

                let line_config_set = {
                    class_name: line_config.class_name || '', 
                    length: line_config.length || 80,
                    color: line_config.color || 'black',
                    thickness: line_config.thickness || 1
                }
            
                let text_config_set = {
                    class_name: text_config.class_name || '',
                    color: text_config.color || 'black',
                    align: text_config.align || 'left'
                }
                
                // Get the point element
                let point = d3.select(`#${chart} .${slice_id} .point-${point_id}`);
            
                // Get the bounding box of the point relative to the chart container
                let chartNode = d3.select(`#${chart}`).node();
                let chartRect = chartNode.getBoundingClientRect();
                let pointRect = point.node().getBoundingClientRect();
            
                // Calculate the position relative to the chart container
                let relativeX = pointRect.left - chartRect.left;
                let relativeY = pointRect.top - chartRect.top;
            
                // Existing line code
                let angleDeg = (hour * 30) - 90; 
                let length = line_config_set.length; 
                let angleRad = angleDeg * (Math.PI / 180); 
                let dx = length * Math.cos(angleRad);
                let dy = length * Math.sin(angleRad);
                let endX = relativeX + dx;
                let endY = relativeY + dy;
            
                let anchors = {
                    'tl': '0%, 0%',
                    'tc': '-50%, 0%',
                    'tr': '-100%, 0%',
                    'bl': '0%, -100%',
                    'bc': '-50%, -100%',
                    'br': '-100%, -100%'
                }; 
            
                // Append the line to the chart container
                d3.select(`#${chart}`).append('div')
                    .attr('class', `scrolly-annotation-line ${line_config_set.class_name}`)
                    .style('top', `${relativeY}px`)
                    .style('left', `${relativeX}px`)
                    .style('width', `${line_config_set.length}px`)
                    .style('height', `${line_config_set.thickness}px`)
                    .style('background-color', line_config_set.color)
                    .style('position', 'absolute')
                    .style('transform-origin', 'top left')
                    .style('transform', `rotate(${angleDeg}deg)`);
            
                // Calculate text position with offset
                let textOffset = 5; 
                let textX = endX + textOffset * Math.cos(angleRad);
                let textY = endY + textOffset * Math.sin(angleRad);
            
                // Append the text to the chart container
                d3.select(`#${chart}`).append('div')
                    .attr('class', `scrolly-annotation-text ${text_config_set.class_name}`)
                    .style('position', 'absolute')
                    .style('left', `${textX}px`)
                    .style('top', `${textY}px`)
                    .style('color', text_config_set.color)
                    .style('transform', `translate(${anchors[anchor]})`)
                    .style('text-align', text_config_set.align)
                    .html(text);
            }
            
            
            

            drawChart('fs', inside_outside_blank, 'FS');
        
            drawChart('lp', inside_outside_blank, 'LP');
        
            drawChart('kzn', inside_outside_blank, 'KZN');

            


            // add_label('kzn', 'category-a', 3, 4, 'tl', 'text here<br/>how are you?', {color: '#fff'}, {align: 'left', color: '#fff'});


            // UNHYGENIC TOILETS

            
            const toilet_data = [
                {label: 'FS', Seat: 0, "Toilet bowl": 0, Wall: 0},
                {label: 'KZN', Seat: 0, "Toilet bowl": 0, Wall: 0},
                {label: 'LP', Seat: 0, "Toilet bowl": 0, Wall: 0}
            ];

            const colors = {
                Seat: '#ff5733', // Replace with scrolly_chart_colors.unhygenic_seat
                "Toilet bowl": '#33cfff', // Replace with scrolly_chart_colors.unhygenic_bowl
                Wall: '#bada55' // Replace with scrolly_chart_colors.unhygenic_wall
            };

            const margin = {top: 20, right: 20, bottom: 20, left: 100};
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const svg = d3.select('#unhygenic-toilets-chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const yScale = d3.scaleBand()
                .domain(toilet_data.map(d => d.label))
                .range([0, height])
                .padding(0.1);

            const xScale = d3.scaleLinear()
                .domain([0, d3.max(toilet_data, d => d.Seat + d["Toilet bowl"] + d.Wall)])
                .range([0, width]);

            const stack = d3.stack()
                .keys(['Seat', 'Toilet bowl', 'Wall'])
                .order(d3.stackOrderNone)
                .offset(d3.stackOffsetNone);

            const stackedData = stack(toilet_data);

            const groups = svg.selectAll('.group')
                .data(stackedData)
                .enter()
                .append('g')
                .attr('fill', d => colors[d.key]);

            groups.selectAll('rect')
                .data(d => d)
                .enter()
                .append('rect')
                .attr('y', d => yScale(d.data.label))
                .attr('x', d => xScale(d[0]))
                .attr('width', d => xScale(d[1]) - xScale(d[0]))
                .attr('height', yScale.bandwidth());

            svg.append('g')
                .call(d3.axisLeft(yScale))
                .selectAll('text')
                .style('font-size', '14px');

            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale))
                .selectAll('text')
                .style('display', 'none');
            

            

            


            // DOUGHNUT CHARTS

            
            

            // WOMEN SAFETY CHART

            
            // RETURN VISIT

            

            


            
            

            // PROVINCE BREAKDOWN CHART ANIMATION

            function fadeChart(chartId, opacity) {
                d3.select(`${chartId}`)
                    .transition()
                    .duration(500)
                    .style('opacity', opacity);
            }


            // Inside/Outside Dataset
            ScrollTrigger.create({
                trigger: ".scrolly-section[data-section-label='outdoor-facilities']",
                start: "center center",
                end: "bottom center",
                scrub: false,
                onEnter: () => {
                    fadeChart('.province-chart', 1);
                    activeData.fs = fs_inside_outside;
                    activeData.lp = lp_inside_outside;
                    activeData.kzn = kzn_inside_outside;
                    updateAllCharts();
                
                },
                onLeaveBack: () => {
                    console.log('onLeaveBack triggered');
                    fadeChart('.province-chart', 0);
                    activeData.fs = fs_inside_outside;
                    activeData.lp = lp_inside_outside;
                    activeData.kzn = kzn_inside_outside;
                    updateAllCharts();
                    
                }
            });

            
            ScrollTrigger.create({
                trigger: ".scrolly-section[data-section-label='disabled-access']",
                start: "center center",
                end: "bottom center",
                scrub: false,
                onEnter: () => {
                    activeData.fs = fs_disabled_access;
                    activeData.lp = lp_disabled_access;
                    activeData.kzn = kzn_disabled_access;
                    updateAllCharts();
                    

                },
                onLeaveBack: () => {
                    console.log('onLeaveBack triggered');
                    activeData.fs = fs_inside_outside;
                    activeData.lp = lp_inside_outside;
                    activeData.kzn = kzn_inside_outside;
                    updateAllCharts();
                    

                }
            });

            // ScrollTrigger.create({
            //     trigger: ".scrolly-section[data-section-label='broken-toilets']",
            //     start: "center center",
            //     end: "bottom center",
            //     scrub: false,
            //     onEnter: () => {
            //         activeData.fs = fs_unusable_toilets;
            //         activeData.lp = lp_unusable_toilets;
            //         activeData.kzn = kzn_unusable_toilets;
            //         updateAllCharts();
                    

            //     },
            //     onLeaveBack: () => {
            //         console.log('onLeaveBack triggered');
            //         activeData.fs = fs_disabled_access;
            //         activeData.lp = lp_disabled_access;
            //         activeData.kzn = kzn_disabled_access;
            //         updateAllCharts();
                    

            //     }
            // });

            // ScrollTrigger.create({
            //     trigger: ".scrolly-section[data-section-label='no-toilet-paper']",
            //     start: "center center",
            //     end: "bottom center",
            //     scrub: false,
            //     onEnter: () => {
            //         activeData.fs = fs_toilet_paper;
            //         activeData.lp = lp_toilet_paper;
            //         activeData.kzn = kzn_toilet_paper;
            //         updateAllCharts();
                    

            //     },
            //     onLeaveBack: () => {
            //         console.log('onLeaveBack triggered');
            //         activeData.fs = fs_unusable_toilets;
            //         activeData.lp = lp_unusable_toilets;
            //         activeData.kzn = kzn_unusable_toilets;
            //         updateAllCharts();
                    

            //     }
            // });

            // ScrollTrigger.create({
            //     trigger: ".scrolly-section[data-section-label='no-sanitiser']",
            //     start: "center center",
            //     end: "bottom center",
            //     scrub: false,
            //     onEnter: () => {
            //         activeData.fs = fs_no_sanitiser;
            //         activeData.lp = lp_no_sanitiser;
            //         activeData.kzn = kzn_no_sanitiser;
            //         updateAllCharts();
                    

            //     },
            //     onLeaveBack: () => {
            //         console.log('onLeaveBack triggered');
            //         activeData.fs = fs_toilet_paper;
            //         activeData.lp = lp_toilet_paper;
            //         activeData.kzn = kzn_toilet_paper;
            //         updateAllCharts();
                    

            //     }
            // });


            // fadeOutChart('province-chart', 'not-stocked2');   

            

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
                    ".unhygenic-chart",
                    { opacity: 0 },
                    { opacity: 1, ease: "none" }
                );       

            // FADE OUT PROVINCE CHART

            
            // fadeOutChart('unhygenic-chart', 'unhygenic-toilets4');

            // QUEUES CHART

            // gsap
            //     .timeline({
            //         scrollTrigger: {
            //             trigger: ".scrolly-section[data-section-label='queues']",
            //             start: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `center ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             end: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `bottom ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             scrub: true
            //         }
            //     })
            //     .fromTo(
            //         ".queues-charts",
            //         { opacity: 0 },
            //         { opacity: 1, ease: "none" }
            //     )
            //     .to(queues_chart_21_50.data.datasets[0].data, { endArray: queues_21_50, ease: "none", onUpdate: function () { queues_chart_21_50.update(); } }, 0)
            //     .to(queues_chart_51_70.data.datasets[0].data, { endArray: queues_51_70, ease: "none", onUpdate: function () { queues_chart_51_70.update(); } }, 0)
            //     .to(queues_chart_71_100.data.datasets[0].data, { endArray: queues_71_100, ease: "none", onUpdate: function () { queues_chart_71_100.update(); } }, 0)
            //     .to(queues_chart_100.data.datasets[0].data, { endArray: queues_100, ease: "none", onUpdate: function () { queues_chart_100.update(); } }, 0);

            // fadeOutChart('queues-charts', 'queues4');

            // SAFETY

            // gsap
            //     .timeline({
            //         scrollTrigger: {
            //             trigger: ".scrolly-section[data-section-label='unsafe']",
            //             start: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `center ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             end: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `bottom ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             scrub: true
            //         }
            //     })
            //     .fromTo(
            //         ".safety-chart",
            //         { opacity: 0 },
            //         { opacity: 1, ease: "none" }
            //     )
            //     .to(safety_male.data.datasets[0].data, { endArray: safety_chart_male, ease: "none", onUpdate: function () { safety_male.update(); } }, 0)
            //     .to(safety_female.data.datasets[0].data, { endArray: safety_chart_female, ease: "none", onUpdate: function () { safety_female.update(); } }, 0);

            // fadeOutChart('safety-chart', 'women-unsafe');

            // WOMEN SAFETY

            // gsap
            //     .timeline({
            //         scrollTrigger: {
            //             trigger: ".scrolly-section[data-section-label='women-unsafe']",
            //             start: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `center ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             end: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `bottom ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             scrub: true
            //         }
            //     })
            //     .fromTo(
            //         ".women-safety-chart",
            //         { opacity: 0 },
            //         { opacity: 1, ease: "none" }
            //     )
            //     .to(women_safety_chart.data.datasets[0].data, { endArray: women_safety_yes, ease: "none", onUpdate: function () { women_safety_chart.update(); } }, 0)
            //     .to(women_safety_chart.data.datasets[1].data, { endArray: women_safety_no, ease: "none", onUpdate: function () { women_safety_chart.update(); } }, 0);

            // fadeOutChart('women-safety-chart', 'return-visits');


            // RETURN VISITS

            // gsap
            //     .timeline({
            //         scrollTrigger: {
            //             trigger: ".scrolly-section[data-section-label='return-visits']",
            //             start: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `center ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             end: () => {
            //                 const backgroundRect = background.getBoundingClientRect();
            //                 return `bottom ${backgroundRect.height + offsetInPixels}px`;
            //             },
            //             scrub: true
            //         }
            //     })
            //     .fromTo(
            //         ".return-visits-chart",
            //         { opacity: 0 },
            //         { opacity: 1, ease: "none" }
            //     )
            //     .to(return_visits_chart_fs.data.datasets[0].data, { endArray: return_visits_fs, ease: "none", onUpdate: function () { return_visits_chart_fs.update(); } }, 0)
            //     .to(return_visits_chart_lp.data.datasets[0].data, { endArray: return_visits_lp, ease: "none", onUpdate: function () { return_visits_chart_lp.update(); } }, 0)
            //     .to(return_visits_chart_kzn.data.datasets[0].data, { endArray: return_visits_kzn, ease: "none", onUpdate: function () { return_visits_chart_kzn.update(); } }, 0);

            // fadeOutChart('return-visits-chart', 'conclusion');



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


                        if (section_label == 'outdoor-facilities') {

                            console.log(section_label);
                            
                            fadeChart('.province-chart', 1);
                            activeData.fs = fs_inside_outside;
                            activeData.lp = lp_inside_outside;
                            activeData.kzn = kzn_inside_outside;
                            updateAllCharts();
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

        
    });
