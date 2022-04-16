export function generateAnswer(level: number) {
  const answer = [...Array(level)];

  // At least 1 bit should be true so we don't automatically have the correct answer
  const forcePositiveBit = Math.floor(Math.random() * answer.length);

  return answer.map((value, index) => {
    if (index === forcePositiveBit) {
      return true;
    }
    return Math.random() > 0.5;
  });
}

export function checkAnswer(answer: Array<boolean>, input: Array<boolean>) {
  return answer.every((value, index) => input[index] === value);
}
