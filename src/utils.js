export function getTimeOfTheDay() {
  const timeOfTheDay = ["night", "morning", "afternoon", "evening"];
  const quarterOfDay = 6;
  const hours = new Date().getHours();

  return timeOfTheDay[Math.floor(hours / quarterOfDay)];
}
