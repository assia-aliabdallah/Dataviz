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
            //let goodValue = parseFloat(data.data_processing.internet_perception[0]["Facilite votre vie quotidienne"]);
            //let badValue = parseFloat(data.data_processing.internet_perception[1]["Complique votre vie quotidienne"]);
            //let normalValue = parseFloat(data.data_processing.internet_perception[2]["N’a pas d’effet sur votre vie quotidienne"]);
            //
            //let goodBar = document.getElementById("goodBar");
            //let normalBar = document.getElementById("normalBar");
            //let badBar = document.getElementById("badBar");
            //
            //goodBar.style.height = goodValue + "%";
            //normalBar.style.height = normalValue + "%";
            //badBar.style.height = badValue + "%";
            //
            ////Dessiner le nuage de mot de la raison de l'abandon
            //let currentYearIndex = 0; // start with 2020
            //
            //// Fonction pour créer le nuage de mots
            //function createWordCloud(yearData) {
            //    const words = yearData.map(item => ({
            //        text: item.limit,
            //        weight: parseFloat(item.oui),
            //        link: "#"
            //    }));
            //    WordCloud(document.getElementById('wc-container'), {
            //        list: words,
            //        gridSize: 8,
            //        weightFactor: 20,
            //        fontFamily: 'Times, serif',
            //        color: 'random-dark'
            //    });
            //}
            //
            //// Fonction pour mettre à jour l'année et le nuage de mots
            //function changeYear(direction) {
            //    currentYearIndex += direction;
            //    if (currentYearIndex < 0) currentYearIndex = 0;
            //    if (currentYearIndex >= data.data_processing.world_cloud.length) currentYearIndex = data.data_processing.world_cloud.//length - 1;
            //
            //    const selectedYear = data.data_processing.world_cloud[currentYearIndex];
            //    document.getElementById('year-display').textContent = selectedYear.year;
            //
            //    // Appel à la fonction pour créer le nuage de mots pour l'année sélectionnée
            //    createWordCloud(selectedYear.percentages);
            //}
            //
            //// Initialiser le nuage de mots pour la première année (2020)
            //createWordCloud(data.data_processing.world_cloud[currentYearIndex].percentages);
            //
            //// Attacher les événements de navigation aux flèches après la définition de la fonction
            //document.getElementById('prev-year').addEventListener('click', function() {
            //    changeYear(-1);
            //});
            //document.getElementById('next-year').addEventListener('click', function() {
            //    changeYear(1);
            //});
        }
        )

        .catch(error => {
            console.error('Error fetching data: ', error);
        });
});
