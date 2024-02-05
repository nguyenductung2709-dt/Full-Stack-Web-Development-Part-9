const calculateBmi = (height: number, weight: number): String => {
    const BMI = weight / ((height/100)*(height/100));
    let Condition;
    if (BMI < 18.5) {
        Condition = "Underweight";
    } 
    else if (18.5 <= BMI && BMI <= 25) {
        Condition = "Normal";
    }
    else if (25 <= BMI && BMI <= 30) {
        Condition = "Overweight";
    }
    else if (30 <= BMI && BMI <= 35) {
        Condition = "Obesity 1 degree";
    }
    else {
        Condition = "Obesity 2 degree";
    }
    return `${Condition} (${BMI})`;
}

console.log(calculateBmi(171, 63))