document.addEventListener('DOMContentLoaded', function() {
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const monthYear = document.getElementById('monthYear');
    const daysContainer = document.getElementById('days');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    renderCalendar(currentYear, currentMonth);

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    function renderCalendar(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        monthYear.textContent = `${getMonthName(month)} ${year}`;

        let html = '';

        // Fill in the days of the previous month if necessary
        for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
            html += `<div class="day prev-month">${getPrevMonthLastDays(year, month)[i - 1]}</div>`;
        }

        // Fill in the days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            let classList = 'day';
            if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
                classList += ' today';
            }
            html += `<div class="${classList}">${day}</div>`;
        }

        daysContainer.innerHTML = html;
    }

    function getPrevMonthLastDays(year, month) {
        const lastDayOfPrevMonth = new Date(year, month, 0);
        const lastDate = lastDayOfPrevMonth.getDate();
        const daysArray = [];

        for (let i = lastDate; daysArray.length < 6; i--) {
            daysArray.unshift(i);
        }

        return daysArray;
    }

    function getMonthName(monthIndex) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[monthIndex];
    }
});
