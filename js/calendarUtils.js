let increment = 0;

function getDays(days) {
    const firstDay = this.setFirstDay(days);

    const lastDay = this.setLastDay(days);

    printDays = [];
    firstDay.setDate(this.completeMonth(firstDay, -1, 'first').getDate());
    lastDay.setDate(this.completeMonth(lastDay, 1, 'last').getDate());

    while (firstDay <= lastDay) {
        let dateMove = new Date(firstDay);

        printDays.push(dateMove);
        firstDay.setDate(firstDay.getDate() + 1);
    }
}

function setFirstDay(days) {
    const currentDay = new Date();

    return new Date(currentDay.getFullYear(), currentDay.getMonth() + days, 1);
}

function setLastDay(days) {
    const currentDay = new Date();
    return new Date(currentDay.getFullYear(), currentDay.getMonth() + 1 + days, 0);
}

function changeDate(direction) {
    if (direction === 'today') {
        increment = 0;
        return buildCalendar();
    }
    let number = 1;

    increment = direction === '+' ? number + increment : increment - number;
    buildCalendar(increment);
}

function completeMonth(date, i, type) {
    while ((date.getDay() !== 1 || type !== 'first') && (date.getDay() !== 0 || type !== 'last')) {
        date = new Date(date.setDate((date.getDate() + i)));
    }

    return date;
}

function showDays(date) {
    const current = new Date();
    const aux = new Date(current.getFullYear(), current.getMonth() + increment, 1);
    if (date.getDate() === current.getDate() && date.getMonth() === current.getMonth() && date.getFullYear() === current.getFullYear()) return 'day-number--today'

    if (date.getMonth() === aux.getMonth()) return 'day-number'

    if (date.getMonth() !== aux.getMonth()) return 'day-number--other'
}

function openCreateEvent(day) {
    const date = new Date(day.getAttribute('data-value'));
    modalContainer.classList.add('active');
    modalContainer.classList.remove('notActive');
    modalDate.value = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    modalName.value = '';
    modalHour.value = '';
    modalMinute.value = '';
}

function saveEvent() {
    const date = new Date(modalDate.value);
    const name = modalName.value;
    const hour = modalHour.value;
    const minute = modalMinute.value;

    date.setHours(hour ?? '');
    date.setMinutes(minute ?? '');
    if (!name) return;
    const event = {
        name: name,
        date: date
    }
    events.push(event);
    setAlarm(event.date);
    localStorage.setItem('events', JSON.stringify(events));
    modalContainer.classList.add('notActive');
    modalContainer.classList.remove('active');
    buildCalendar(increment);
}

function closeModal() {
    modalContainer.classList.add('notActive');
    modalContainer.classList.remove('active');
}