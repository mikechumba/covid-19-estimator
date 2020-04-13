import Impact from "./output";

const covid19ImpactEstimator = (data) => {
    const impact = new Impact(data);

    return impact;
};

export default covid19ImpactEstimator;
