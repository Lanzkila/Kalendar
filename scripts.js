const months = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Memory Key yang unik
    const STORAGE_KEY = 'kirin_v64_event_data';
    let events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    function generateCalendar() {
      const container = document.getElementById('calendar-container');
      container.innerHTML = '';

      months.forEach((name, index) => {
        let monthDiv = document.createElement('div');
        monthDiv.className = 'month-box';
        monthDiv.innerHTML = `<div class='month-name'>${name}</div>`;
        
        let daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        
        ['S','M','T','W','T','F','S'].forEach(d => {
          daysGrid.innerHTML += `<div class='day-name'>${d}</div>`;
        });

        for (let d = 1; d <= daysInMonth[index]; d++) {
          let dateKey = `${d < 10 ? '0'+d : d}-${(index + 1) < 10 ? '0'+(index+1) : (index+1)}`;
          let eventTitle = events[dateKey];
          
          let dayDiv = document.createElement('div');
          dayDiv.className = eventTitle ? 'day has-event' : 'day';
          dayDiv.innerText = d;
          
          if(eventTitle) {
            dayDiv.setAttribute('data-title', eventTitle);
          }
          
          daysGrid.appendChild(dayDiv);
        }
        
        monthDiv.appendChild(daysGrid);
        container.appendChild(monthDiv);
      });
    }

    function addEvent() {
      let date = document.getElementById('event-date').value;
      let title = document.getElementById('event-title').value;

      if(date && title) {
        events[date] = title.toUpperCase();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        generateCalendar();
        document.getElementById('event-date').value = '';
        document.getElementById('event-title').value = '';
      } else {
        alert("Sila masukkan tarikh & nama event!");
      }
    }

    function clearAll() {
      if(confirm("Padam semua data dalam memori?")) {
        localStorage.removeItem(STORAGE_KEY);
        events = {};
        generateCalendar();
      }
    }

    generateCalendar();
  //]]>
