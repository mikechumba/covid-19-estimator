import covid19ImpactEstimator from './estimator.js';

class Data {
    region = {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.71
    }

    constructor(periodType, timeToElapse, reportedCases, totalHospitalBeds) {
        this.periodType = periodType;
        this.timeToElapse = timeToElapse;
        this.reportedCases = reportedCases;
        this.totalHospitalBeds = totalHospitalBeds;
    }
};

const submitBtn = document.querySelector('#submitBtn');

function serialize(nodes) {

    return {
        periodType: nodes[4].dataset.periodType,
        timeToElapse: nodes[1].dataset.timeToElapse,
        reportedCases: nodes[2].dataset.reportedCases,
        population: nodes[0].dataset.population,
        totalHospitalBeds: nodes[3].dataset.totalHospitalBeds
    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const data = {
        region: {
            name: 'Africa',
            avgAge: 19.7,
            avgDailyIncomeInUSD: 4,
            avgDailyIncomePopulation: 0.71
        },
        periodType: 'days',
        timeToElapse: 38,
        reportedCases: 2747,
        population: 92931687,
        totalHospitalBeds: 678874
    };

    const inputNodes = document.querySelectorAll('.form-control');

    const formData = serialize(inputNodes);
    console.log('FORM DATA', formData);

    const output = covid19ImpactEstimator(data);
});

document.addEventListener('change', (e) => {
    e.preventDefault();

    e.target.dataset[e.target.name] = e.target.value
})


