const URL = "https://jsonplaceholder.typicode.com/posts";

const getRandomAnswer = () => {
  const setOfChoices = ["A", "B", "C", "D"];
  const randIndex = Math.floor(Math.random() * 4);
  return setOfChoices[randIndex];
}

export { getRandomAnswer, URL };