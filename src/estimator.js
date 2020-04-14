class Impact {
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
    const { reportedCases } = this.data;
    const days = this.getDays();
    const currentlyInfected = reportedCases * x;
    const setsOfThree = Math.floor(days / 3);
    const infectionsByRequestedTime = currentlyInfected * 2 ** setsOfThree;
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
    const hospitalBedsByRequestedTime = Math.ceil(
      this.availableHospitalBeds() - severeCasesByRequestedTime
    );
    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: this.casesForICUByRequestedTime(
        infectionsByRequestedTime
      ),
      casesForVentilatorsByRequestedTime: this.casesForVentilatorsByRequestedTime(
        infectionsByRequestedTime
      ),
      dollarsInFlight: this.dollarsInFlight(infectionsByRequestedTime, days)
    };
  }

  availableHospitalBeds() {
    const { totalHospitalBeds } = this.data;
    return totalHospitalBeds * 0.35;
  }

  casesForICUByRequestedTime(infectionsByRequestedTime) {
    return infectionsByRequestedTime * 0.05;
  }

  casesForVentilatorsByRequestedTime(infectionsByRequestedTime) {
    return Math.ceil(infectionsByRequestedTime * 0.02);
  }

  dollarsInFlight(infectionsByRequestedTime, timeToElapse) {
    const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = this.data.region;
    return (
      infectionsByRequestedTime *
      avgDailyIncomeInUSD *
      avgDailyIncomePopulation *
      timeToElapse
    );
  }

  getDays() {
    const { time, periodType } = this.data;
    if (periodType === 'weeks') {
      return time * 7;
    } else if (periodType === 'months') {
      return time * 30;
    }

    return time;
  }
}

const covid19ImpactEstimator = (data) => {
  const impact = new Impact(data);

  return impact;
};

export default covid19ImpactEstimator;
