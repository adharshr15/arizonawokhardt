// TIME TOGETHER

// Variables
const timeTogether = document.getElementById('time-together');
const startDate = new Date("August 10, 2024 04:10:00");

// // Functions
function updateTimeTogether() {
  const now = new Date();
  let diff = now - startDate;

  let seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const years = Math.floor(days / 365.25);
  const months = Math.floor((days % 365.25) / 30.44);
  const remDays = Math.floor((days % 365.25) % 30.44);

  const remHours = hours % 24;
  const remMinutes = minutes % 60;
  const remSeconds = seconds % 60;

  timeTogether.textContent = 
    `${years} Year${years !== 1 ? 's' : ''}, ` +
    `${months} Month${months !== 1 ? 's' : ''}, ` +
    `${remDays} Day${remDays !== 1 ? 's' : ''}, ` +
    `${remHours} Hour${remHours !== 1 ? 's' : ''}, ` +
    `${remMinutes} Minute${remMinutes !== 1 ? 's' : ''}, ` +
    `${remSeconds} Second${remSeconds !== 1 ? 's' : ''} Together`;
}

updateTimeTogether();

// Update every second
setInterval(updateTimeTogether, 1000);

