//Données de l'observatoire de l'accessibilité numérique (RGAA) pour les sites publics en France
let dataOBSERV = "../data/ObservatoireRGAA.json";
let dataBAROM = "../data/Barometre du numerique (2007-2023).json";


async function getAverageErrors(data) {
    /**
     * Récupère les données de l'URL et retourne la moyenne des erreurs par site
     * @param {string} data - URL du fichier JSON
     * @return {number} - Moyenne des erreurs par site
     */
    try {
        const response = await fetch(data);
        const jsonData = await response.json();

        let countErrors = 0;
        let countSites = 0;

        jsonData.forEach(element => {
            countSites += 1;
            countErrors += Number(element.Erreurs);
        });
        return Math.round(countErrors / countSites);
    } catch (error) {
        console.error(error);
    }
}

async function getAsqatasunNotes(data) {
    /**
     * Récupère les données de l'URL et retourne le nombre de sites ayant une note Asqatasun donnée
     * @param {string} data - URL du fichier JSON
     * @return {Array} - Tableau d'objets avec la note Asqatasun en clé et le nombre de sites en valeur
    */

    try {

        const response = await fetch(data);
        const jsonData = await response.json();

        let noteArray = [];

        jsonData.forEach(element => {
            if (!noteArray.some(obj => obj.hasOwnProperty(element["Note Asqatasun"])) && element["Note Asqatasun"] !== "") {
                noteArray.push({ [element["Note Asqatasun"]]: 1 });
            }
            else {
                noteArray.forEach(obj => {
                    if (obj.hasOwnProperty(element["Note Asqatasun"])) {
                        obj[element["Note Asqatasun"]] += 1;
                    }
                });
            }

        });
        return noteArray
    }
    catch (error) {
        console.error(error);
    }
}

async function nbSites() {
    /**
     * Fonction qui retourne le nombre de sites publics en France
     * @return {number} - Nombre de sites publics en France
     */
    try {
        const response = await fetch(dataOBSERV);
        const jsonData = await response.json();

        return jsonData.length;
    } catch (error) {
        console.error(error);
    }
}

async function noAccessSites() {
    /**
     * Fonction qui retourne le nombre de sites ayant échoué à l'audit Asqatasun
     * @return {number} - Pourcentage de sites ayant échoué à l'audit Asqatasun
     */
    const notes = await getAsqatasunNotes(dataOBSERV);
    const sites = await nbSites();
    let percent = 0;
    let count = 0;

    if (notes && nbSites) {
        notes.forEach(element => {
            if (element["D"]) count += element["D"];
            if (element["E"]) count += element["E"];
            if (element["F"]) count += element["F"];
        });
        percent = (count / sites) * 100;
    }
    return percent.toFixed(2);
}

async function internetPerception(years) {
    /**
     * Fonction qui retourne la perception de l'internet pour une année donnée
     * @param {number} année - Année de la perception
     * @return {Array} - Tableau d'objets avec la perception en clé et le pourcentage en valeur
     */

    try {
        const response = await fetch(dataBAROM);
        const jsonData = await response.json();

        let perception = [];
        let totalWeighted = 0;

        jsonData.forEach(element => {
            const weight = element.POND || 1;
            if (element.ANNEENQ === years && element.INTERNEFFET !== "Non réponse") {
                if (!perception.some(obj => obj.hasOwnProperty(element.INTERNEFFET))) {
                    perception.push({ [element.INTERNEFFET]: parseFloat(weight) });
                }
                else {
                    perception.forEach(obj => {
                        if (obj.hasOwnProperty(element.INTERNEFFET)) {
                            obj[element.INTERNEFFET] += parseFloat(weight);
                        }
                    });
                }
                totalWeighted += parseFloat(weight);
            }
        });

        perception.forEach(element => {
            for (const key in element) {
                element[key] = ((element[key] / totalWeighted) * 100).toFixed(2);
            }
        });

        return perception;
    }
    catch (error) {
        console.error(error);
    }
}

async function accessibilityUsers(years) {
    /**
        * Fonction qui retourne l'accessibilité des utilisateurs pour une année donnée
        * @param {number} année - Année de l'interview
        * @param {string} handicap - Handicap de l'utilisateur
        * @return {Array} - Tableau d'objets avec l'accessibilité en clé et le pourcentage en valeur
     */

    try {
        const response = await fetch(dataBAROM);
        const jsonData = await response.json();

        const handicaps = ["ACCESSNOW1", "ACCESSNOW2", "ACCESSNOW3", "ACCESSNOW4", "ACCESSNOW5", "ACCESSNOW6", "ACCESSNOW7", "ACCESSNOW8", "ACCESSNOW9"];

        let accessibility = [{ "Oui": 0 }, { "Non": 0 }];
        let totalWeighted = 0;

        jsonData.forEach(element => {
            const weight = element.POND || 1;
            if (element.ANNEENQ === years) {

                let hasAccessibility = false;

                handicaps.forEach(handicap => {
                    const response = element[handicap];

                    if (response && response.substring(0, 3).toLowerCase() === "oui") {
                        hasAccessibility = true;
                    }
                });

                if (hasAccessibility) {
                    accessibility[0]["Oui"] += parseFloat(weight);
                } else {
                    accessibility[1]["Non"] += parseFloat(weight);
                }

                totalWeighted += parseFloat(weight);
            }
        });


        accessibility.forEach(element => {
            for (const key in element) {
                element[key] = ((element[key] / totalWeighted) * 100).toFixed(2);
            }
        });

        return accessibility;
    }
    catch (error) {
        console.error(error);
    }
}


async function difficulty(years) {
    /**
     * Fonction qui retourne les difficultés rencontrées par les utilisateurs pour une année donnée
     * @param {number} année - Année de l'interview
     * @return {Array} - Tableau d'objets avec la difficulté en clé et le pourcentage en valeur
     */

    try {
        const response = await fetch(dataBAROM);
        const jsonData = await response.json();

        let diffArray = [];
        let totalWeighted = 0;

        jsonData.forEach(element => {
            const weight = element.POND || 1;
            if (element.ANNEENQ === years && element.DIFFINF2 !== "Non réponse") {
                if (!diffArray.some(obj => obj.hasOwnProperty(element.DIFFINF2))) {
                    diffArray.push({ [element.DIFFINF2]: parseFloat(weight) });
                }
                else {
                    diffArray.forEach(obj => {
                        if (obj.hasOwnProperty(element.DIFFINF2)) {
                            obj[element.DIFFINF2] += parseFloat(weight);
                        }
                    });
                }
                totalWeighted += parseFloat(weight);
            }
        });

        diffArray.forEach(element => {
            for (const key in element) {
                element[key] = ((element[key] / totalWeighted) * 100).toFixed(2);
            }
        });

        return diffArray;
    }
    catch (error) {
        console.error(error);
    }
}


async function worldCloud(years, limit) {
    /**
        * Fonction qui retourne le pourcentage de personnes répondant "oui à une limite donnée pour une année donnée
        * @param {number} année - Année de l'interview
        * @param {string} limit - Limite de l'internet
        * @return {number} - Pourcentage de personnes ayant une perception positive de l'internet
     */

    try {
        const response = await fetch(dataBAROM);
        const jsonData = await response.json();

        let count = 0;
        let percent = 0;
        let totalWeighted = 0;

        jsonData.forEach(element => {
            const weight = element.POND || 1;
            if (element.ANNEENQ === years) {
                if (element[limit].substring(0, 3).toLowerCase() === "oui") {
                    count += parseFloat(weight);
                }
                totalWeighted += parseFloat(weight);
            }
        });

        percent = ((count / totalWeighted) * 100).toFixed(2);
        return percent;

    } catch (error) {
        console.error(error);
    }
}

async function getPercentageByYearAndLimit() {
    const years = ["2020", "2022", "2023"];

    const limits = [
        { id: 'FREINWEB1', alias: "Pas d'équipement" },
        { id: 'FREINWEB2', alias: "Pas ou peu d'accès internet" },
        { id: 'FREINWEB3', alias: "Équipement obsolète" },
        { id: 'FREINWEB4', alias: "Manque de maîtrise des outils" },
        { id: 'FREINWEB5', alias: "Aucun frein" },
        { id: 'NUMLIMIT_1', alias: "Pas utile pour moi" },
        { id: 'NUMLIMIT_3', alias: "Coût trop élevé" },
        { id: 'NUMLIMIT_4', alias: "Rejet du numérique" }
    ];

    let results = [];

    for (let year of years) {
        let yearData = { year: year, percentages: [] };

        for (let limit of limits) {

            const ouiPercent = await worldCloud(year, limit.id);
            const nonPercent = (100 - parseFloat(ouiPercent)).toFixed(2);

            yearData.percentages.push({
                limit: limit.alias,
                oui: ouiPercent,
                non: nonPercent
            });
        }

        results.push(yearData);
    }

    return results;
}

document.addEventListener("DOMContentLoaded", function () {
async function toJson(){

    json = { "data_processing": {} };

    json.data_processing["average_errors"] = await getAverageErrors(dataOBSERV);
    json.data_processing["no_access_sites"] = await noAccessSites();
    json.data_processing["internet_perception"] = await internetPerception("2023");
    json.data_processing["accessibility_users"] = await accessibilityUsers("2023");
    json.data_processing["difficulty"] = await difficulty("2023");
    json.data_processing["world_cloud"] = await getPercentageByYearAndLimit();

    document.getElementById("jsonOutput").textContent = JSON.stringify(json, null, 2);
}

toJson();
}   );
