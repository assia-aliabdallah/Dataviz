document.addEventListener('DOMContentLoaded', function () {
    let averageErrors = document.getElementById('average_errors');

    let noAccessSites = document.getElementById('no_access_sites');

    let perception = document.getElementById('perception');
    let population = document.getElementById('population');
    let goodEffect = document.getElementById('good_effect');
    let normalEffect = document.getElementById('normal_effect');
    let badEffect = document.getElementById('bad_effect');

    let accessibilityUsers = document.getElementById('accessibility_users');

    let percentAbandon = document.getElementById('percent-abandon');

    fetch('data/data-minify.json')
        .then(response => response.json())
        .then(data => {
            //Afficher la moyenne des erreurs d'accessibilité
            averageErrors.innerHTML = data.data_processing.average_errors;

            //Afficher le pourcentage des sites non accessibles
            noAccessSites.innerHTML = data.data_processing.no_access_sites;

            //Afficher les effets de l'internet sur la vie quotidienne
            nbFrançais = 68373433;
            perception.innerHTML = Math.ceil(data.data_processing.internet_perception[1]["Complique votre vie quotidienne"]);
            population.innerHTML = Math.ceil((data.data_processing.internet_perception[1]["Complique votre vie quotidienne"] / 100) * nbFrançais);

            goodEffect.innerHTML = data.data_processing.internet_perception[0]["Facilite votre vie quotidienne"];
            normalEffect.innerHTML = data.data_processing.internet_perception[2]["N’a pas d’effet sur votre vie quotidienne"];
            badEffect.innerHTML = data.data_processing.internet_perception[1]["Complique votre vie quotidienne"];

            //Afficher le nombre d'utilisateurs utilisant des technologies d'assistance
            accessibilityUsers.innerHTML = data.data_processing.accessibility_users[0]["Oui"];

            //Afficher le pourcentage d'abandon
            percentAbandon.innerHTML = data.data_processing.difficulty[3]["Vous arrêtez votre utilisation, vous abandonnez"]

            //Dessiner l'histogramme des effets de l'internet sur la vie quotidienne
            let goodValue = parseFloat(data.data_processing.internet_perception[0]["Facilite votre vie quotidienne"]);
            let badValue = parseFloat(data.data_processing.internet_perception[1]["Complique votre vie quotidienne"]);
            let normalValue = parseFloat(data.data_processing.internet_perception[2]["N’a pas d’effet sur votre vie quotidienne"]);

            let goodBar = document.getElementById("goodBar");
            let normalBar = document.getElementById("normalBar");
            let badBar = document.getElementById("badBar");

            goodBar.style.height = goodValue + "%";
            normalBar.style.height = normalValue + "%";
            badBar.style.height = badValue + "%";

            //Dessiner le nuage de mot de la raison de l'abandon
            function adjustCanvasForDPR(canvas) {
                let dpr = window.devicePixelRatio || 1;
                let parent = canvas.parentNode;
                let rect = parent.getBoundingClientRect();

                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;

                return dpr;
            }

            function generateWordCloudList(year) {
                let wordCloudList = [];
                data.data_processing.world_cloud.forEach(years => {
                    if (years.year === year) {
                        years.percentages.forEach(entry => {
                            console.log(entry);
                            const word = entry.limit;
                            const ouiPercentage = parseFloat(entry.oui);

                            if (ouiPercentage > 0) {
                                const weight = Math.round(ouiPercentage * 2);
                                wordCloudList.push([word, weight]);
                            }
                        });
                    }
                });
                return wordCloudList;
            };

            function createWordCloud(year) {
                let wordcloud = document.getElementById('wc-container');
                let dpr = adjustCanvasForDPR(wordcloud);
                let wordCloudList = generateWordCloudList(year);
                let customColors = ['#231E78', '#FFC540', '#27CCBC', '#584DFF', '#F58CC8'];

                WordCloud(wordcloud, {
                    list: wordCloudList,
                    gridSize: Math.round(15 * dpr),
                    weightFactor: (size) => size * dpr,
                    fontFamily: 'Ubuntu',
                    color: () => customColors[Math.floor(Math.random() * customColors.length)],
                    backgroundColor: '#f8f6f9',
                    rotateRatio: 0,
                    rotationSteps: 0,
                    drawOutOfBound: false,
                });
            }

            function WordCloudYears() {
                let prevYear = document.getElementById('prev-year');
                let nextYear = document.getElementById('next-year');
                let yearDisplay = document.getElementById('year-display');

                const years = ["2020", "2022", "2023"];

                let currentYear = yearDisplay.textContent;

                createWordCloud(currentYear);

                prevYear.addEventListener('click', () => {
                    let prevIndex = years.indexOf(currentYear) - 1;
                    if (prevIndex >= 0) {
                        currentYear = years[prevIndex];
                        yearDisplay.textContent = currentYear;
                        createWordCloud(currentYear);
                    }
                });

                nextYear.addEventListener('click', () => {
                    let nextIndex = years.indexOf(currentYear) + 1;
                    if (nextIndex < years.length) {
                        currentYear = years[nextIndex];
                        yearDisplay.textContent = currentYear;
                        createWordCloud(currentYear);
                    }
                });
            }

            WordCloudYears();

        }
        )

        .catch(error => {
            console.error('Error fetching data: ', error);
        });
});
