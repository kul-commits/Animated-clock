const strips = [...document.querySelectorAll('.strip')];
const numberSize = '8';

function highlight(strip, d) {
    strips[strip]
    .querySelector(`.number:nth-of-type(${d+1})`)
    .classList.add('pop');

    setTimeout(()=> {
        strips[strip]
        .querySelector(`.number:nth-of-type(${d+1})`)
        .classList.remove('pop');
    }, 950);
}

function stripSlider(strip, number){
    let d1 = Math.floor(number/10);
    let d2 = number % 10;

    // Add animation class to numbers when they change
    const numbers = strips[strip].querySelectorAll('.number');
    numbers.forEach((num, index) => {
        if (index === d1 || index === d2) {
            num.classList.add('change');
            setTimeout(() => {
                num.classList.remove('change');
            }, 500);
        }
    });

    strips[strip].style.transform =`translateY(${d1 * -numberSize}vmin)`;
    highlight(strip, d1);
    strips[strip + 1].style.transform =`translateY(${d2 * -numberSize}vmin)`;
    highlight(strip + 1, d2);
}

function updateTime() {
    const time = new Date();
    const hours = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();
    stripSlider(0, hours);
    stripSlider(2, mins);
    stripSlider(4, secs);

    // Add AM/PM indicator
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Format hours to 12-hour format
    const displayHours = hours % 12 || 12;

    document.getElementById('ampm').textContent = ampm;
    document.getElementById('hours').textContent = displayHours.toString().padStart(2, '0');
    document.getElementById('mins').textContent = mins.toString().padStart(2, '0');
    document.getElementById('secs').textContent = secs.toString().padStart(2, '0');

    // Display date
    const dateElement = document.getElementById('date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = time.toLocaleDateString('en-US', options);
}

setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately on page load
