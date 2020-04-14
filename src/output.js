import covid19ImpactEstimator from './estimator.js';

const regionData = {
    region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.71
    }
};

const submitBtn = document.querySelector('#submitBtn');

function serialize(nodes) {

    return {
        periodType: nodes[4].dataset.periodType,
        timeToElapse: nodes[3].dataset.timeToElapse,
        reportedCases: nodes[2].dataset.reportedCases,
        population: nodes[0].dataset.population,
        totalHospitalBeds: nodes[1].dataset.totalHospitalBeds
    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const inputNodes = document.querySelectorAll('.control');

    const formData = serialize(inputNodes);

    const validEntries = Object.entries(formData).filter(entry => {

        return entry[1];
    })
    
    const data = { ...regionData, ...formData }

    if (validEntries.length === 5) {
        const output = covid19ImpactEstimator(data);
    }
});

document.addEventListener('change', (e) => {
    e.preventDefault();

    e.target.dataset[e.target.name] = e.target.value
})


