//Données de l'observatoire de l'accessibilité numérique (RGAA) pour les sites publics en France
let dataURL = "./data/ObservatoireRGAA.json";

function getAverageErrors(data) {
    /**
     * Fonction qui renvoie la moyenne des erreurs d'accessibilité des sites
     * @param {string} dataURL - URL du fichier JSON contenant les données
     * @returns {number} - Moyenne des erreurs d'accessibilité
     */
    fetch(data).then(response => {
        response.json().then(function (data) {
            console.log(data);

            let countErrors = 0;
            let countSites = 0;

            data.array.forEach(element => {
                countSites += 1;
                countErrors += element.Erreurs;
            });
            return countErrors / countSites;
        })
    })
}

//function getAsqatasunNotes() {
//    fetch(dataURL).then(response => {
//        response.json().then(function (data) {
//            console.log(data);
//            let noteArray = {};
//            let countSites = 0;
//                data.array.forEach(element => {
//                    if noteArray.entries
//                    element["Note Asqatasun"]
//
//                })
//        })
//    })
//}

getAverageErrors(dataURL);