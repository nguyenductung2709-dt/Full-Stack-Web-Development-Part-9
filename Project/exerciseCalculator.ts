interface exercisesReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (days: number[], target: number): exercisesReport => {
    const periodLength = days.length;
    const trainingDays = days.filter(d => d > 0).length;
    let totalHours = 0;
    for (let i = 0; i < days.length; i++) {
        totalHours += days[i];
    }
    const average = totalHours / periodLength;
    const success = average >= target;
    const rating = Math.floor((average / target) * 3);
    let ratingDescription;
    if (rating < 2) {
        ratingDescription = "You are too bad, try harder next time.";
    } else if (rating === 2) {
        ratingDescription = "It's a decent try, try harder next time.";
    } else {
        ratingDescription = "Good job! Keep improving next time.";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));