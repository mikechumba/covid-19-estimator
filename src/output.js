

export default class Impact {

    constructor(data) {
        this.data = data;
    }

    get impact() {
        return this.calculateImpact(10);
    }

    get severeImpact() {
        return this.calculateImpact(50);
    }

    calculateImpact(x) {
        const { reportedCases, periodType, timeToElapse, totalHospitalBeds } = this.data;
        const days = this.getDays(timeToElapse, periodType);
        const currentlyInfected = reportedCases * x;
        const setsOfThree = Math.floor(days/3);
        const infectionsByRequestedTime = currentlyInfected * (2 ** setsOfThree);
        const severeCasesByRequestedTime = Math.floor(currentlyInfected * 0.15)
        const hospitalBedsByRequestedTime = totalHospitalBeds - this.availableHospitalBeds();
        return {
            currentlyInfected: currentlyInfected,
            infectionsByRequestedTime: infectionsByRequestedTime,
            severeCasesByRequestedTime: severeCasesByRequestedTime,
            hospitalBedsByRequestedTime: hospitalBedsByRequestedTime,
            casesForICUByRequestedTime: this.casesForICUByRequestedTime(infectionsByRequestedTime),
            casesForVentilatorsByRequestedTime: this.casesForVentilatorsByRequestedTime(infectionsByRequestedTime),
            dollarsInFlight: this.dollarsInFlight(infectionsByRequestedTime, days)
        }
    }

    availableHospitalBeds() {
        const { availableHospitalBeds } = this.data;
        return Math.floor(availableHospitalBeds * 0.35);
    }

    casesForICUByRequestedTime(infectionsByRequestedTime) {
        return infectionsByRequestedTime * 0.05;
    }

    casesForVentilatorsByRequestedTime(infectionsByRequestedTime) {
        return infectionsByRequestedTime * 0.02;
    }

    dollarsInFlight(infectionsByRequestedTime, timeToElapse) {
        const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = this.data.region;
        return infectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation * timeToElapse
    }

    getDays(time, periodType) {
        if (periodType === 'days') {
            return time;
        } else if (periodType === 'weeks') {
            return time * 7;
        } else if (periodType === 'months') {
            return time * 30;
        }
    }
}