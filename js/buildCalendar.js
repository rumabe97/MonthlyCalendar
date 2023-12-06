let p_date;
let d_calendar;
let printDays = [];
let events;

let modalDate;
let modalContainer;
let modalName;
let modalHour;
let modalMinute;

window.onload = function () {
    p_date = document.getElementById('showDate');
    d_calendar = document.getElementById('calendar');
    events = JSON.parse(localStorage.getItem('events')) ?? [];
    modalDate = document.getElementById('modalDate');
    modalContainer = document.getElementById('modal-container');
    modalName = document.getElementById('modalName');
    modalHour = document.getElementById('modalHour');
    modalMinute = document.getElementById('modalMinute');

    startReloj();
    buildCalendar();
    events.forEach(event => {
        setAlarm(event.date);
    })
}

function buildCalendar(increment = 0) {
    const current = new Date();
    const date = new Date(current.getFullYear(), current.getMonth() + increment, 1);
    d_calendar.innerHTML = '';
    p_date.innerHTML = getDate(date.getMonth(), date.getFullYear());
    buildDays();
    getDays(increment);
    buildAllDays();
}


function getDate(mes, año) {
    const m = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    return `${m[mes]} ${año}`;
}

function buildDays() {
    const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    week.forEach(day => {
        d_calendar.innerHTML +=
            `<div class="row__header">
                <p class="header__text">${day}</p>
        </div>`;
    })
}


function buildAllDays() {
    printDays.forEach(day => {
        d_calendar.innerHTML +=
            `<div class="row__cell" onclick="openCreateEvent(this)" data-value="${day}">
                <div class="cell__top">
                    <div class=${showDays(day)}>
                        <p>${day.getDate()}</p>
                    </div>
                </div>
                <div class="cell__content" id="content-${day.getDate()}-${day.getMonth()}" data-value="${day}">
                </div>
            </div>`;
        printEvents('content-' + day.getDate() + '-' + day.getMonth());
    });
}

function printEvents(id) {
    let d_content = document.getElementById(id);
    const eventsOfDay = getEventsDay(d_content.getAttribute('data-value'));

    eventsOfDay.forEach((eventValue, index) => {
        if (index > 3) return;
        d_content.innerHTML += `
        <div class="event event-me" onclick="event.stopPropagation();openEvent(this)">
            ${getP(index, eventValue, eventsOfDay.length)}
        </div>`;
    })
}

function getP(cont, value, maxValue) {
    const date = new Date(value.date);

    if (cont < 3) return `<p class="dayText">${value.name} / ${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}   ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}</p>`;
    if (cont === 3) return `<p class="dayText">+${maxValue - cont} events ...</p>`
    return 0;
}

function getEventsDay(day) {
    const date = new Date(day);
    return events.filter(d => new Date(d.date).getDate() === date.getDate()
        && new Date(d.date).getMonth() === date.getMonth()
        && new Date(d.date).getFullYear() === date.getFullYear());
}

function openEvent(eventValue) {
    const values = eventValue.getElementsByClassName("dayText")[0].innerHTML;
    const split1 = values.split("/");
    const name = split1[0].trim();
    const split2 = split1[1].split("  ");
    const date = split2[0].trim();
    const split3 = split2[1].split(":");
    const hour = split3[0].trim();
    const minutes = split3[1].trim();
    this.viewEvent(name,date,hour,minutes);
}