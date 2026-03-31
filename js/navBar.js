const monthData = [
  {
    month: 'Month 1 · Genesis 1 to Joshua 21',
    days: [
      'Genesis 1–7','Genesis 8–14','Genesis 15–21','Genesis 22–28','Genesis 29–35','Genesis 36–42','Genesis 43–50','Exodus 1–7','Exodus 8–14','Exodus 15–21','Exodus 22–28','Exodus 29–35','Exodus 36–40, Leviticus 1–2','Leviticus 3–9','Leviticus 10–16','Leviticus 17–23','Leviticus 24–27','Numbers 1–7','Numbers 8–14','Numbers 15–21','Numbers 22–28','Numbers 29–35','Numbers 36, Deuteronomy 1–6','Deuteronomy 7–13','Deuteronomy 14–20','Deuteronomy 21–27','Deuteronomy 28–34','Joshua 1–7','Joshua 8–14','Joshua 15–21'
    ]
  },
  {
    month: 'Month 2 · Joshua 22 to Nehemiah 3',
    days: [
      'Joshua 22–24, Judges 1–4','Judges 5–11','Judges 12–18','Judges 19–21, Ruth 1–4','1 Samuel 1–7','1 Samuel 8–14','1 Samuel 15–21','1 Samuel 22–28','1 Samuel 29–31, 2 Samuel 1–5','2 Samuel 6–12','2 Samuel 13–19','2 Samuel 20–24, 1 Kings 1–3','1 Kings 4–10','1 Kings 11–17','1 Kings 18–22','2 Kings 1–7','2 Kings 8–14','2 Kings 15–21','2 Kings 22–25, 1 Chronicles 1–2','1 Chronicles 3–9','1 Chronicles 10–16','1 Chronicles 17–23','1 Chronicles 24–29','2 Chronicles 1–7','2 Chronicles 8–14','2 Chronicles 15–21','2 Chronicles 22–28','2 Chronicles 29–35','2 Chronicles 36, Ezra 1–6','Ezra 7–10, Nehemiah 1–3'
    ]
  },
  {
    month: 'Month 3 · Nehemiah 4 to Proverbs 3',
    days: [
      'Nehemiah 4–10','Nehemiah 11–13, Esther 1–5','Esther 6–10, Job 1–4','Job 5–11','Job 12–18','Job 19–25','Job 26–32','Job 33–39','Job 40–42, Psalms 1–5','Psalms 6–12','Psalms 13–19','Psalms 20–26','Psalms 27–33','Psalms 34–40','Psalms 41–47','Psalms 48–54','Psalms 55–61','Psalms 62–68','Psalms 69–75','Psalms 76–82','Psalms 83–89','Psalms 90–96','Psalms 97–103','Psalms 104–110','Psalms 111–117','Psalms 118–124','Psalms 125–131','Psalms 132–138','Psalms 139–145','Psalms 146–150, Proverbs 1–3'
    ]
  },
  {
    month: 'Month 4 · Proverbs 4 to Ezekiel 37',
    days: [
      'Proverbs 4–10','Proverbs 11–17','Proverbs 18–24','Proverbs 25–31','Ecclesiastes 1–7','Ecclesiastes 8–12, Song of Solomon 1–4','Song of Solomon 5–8, Isaiah 1–3','Isaiah 4–10','Isaiah 11–17','Isaiah 18–24','Isaiah 25–31','Isaiah 32–38','Isaiah 39–45','Isaiah 46–52','Isaiah 53–59','Isaiah 60–66','Jeremiah 1–7','Jeremiah 8–14','Jeremiah 15–21','Jeremiah 22–28','Jeremiah 29–35','Jeremiah 36–42','Jeremiah 43–49','Jeremiah 50–52, Lamentations 1–2','Lamentations 3–5, Ezekiel 1–2','Ezekiel 3–9','Ezekiel 10–16','Ezekiel 17–23','Ezekiel 24–30','Ezekiel 31–37'
    ]
  },
  {
    month: 'Month 5 · Ezekiel 38 to John 9',
    days: [
      'Ezekiel 38–44','Ezekiel 45–48, Daniel 1–2','Daniel 3–9','Daniel 10–12, Hosea 1–5','Hosea 6–14','Joel 1–3, Amos 1–3','Amos 4–9, Obadiah','Jonah 1–4, Micah 1–3','Micah 4–7, Nahum 1–3','Habakkuk 1–3, Zephaniah 1–3','Haggai 1–2, Zechariah 1–5','Zechariah 6–14','Malachi 1–4, Matthew 1–3','Matthew 4–10','Matthew 11–17','Matthew 18–24','Matthew 25–28, Mark 1–2','Mark 3–9','Mark 10–16','Luke 1–6','Luke 7–13','Luke 14–20','Luke 21–24, John 1–2','John 3–9'
    ]
  },
  {
    month: 'Month 6 · John 10 to Revelation 22',
    days: [
      'John 10–16','John 17–21, Acts 1–2','Acts 3–9','Acts 10–16','Acts 17–23','Acts 24–28, Romans 1–2','Romans 3–9','Romans 10–16, 1 Corinthians 1–2','1 Corinthians 3–9','1 Corinthians 10–16','2 Corinthians 1–7','2 Corinthians 8–13, Galatians 1–2','Galatians 3–6, Ephesians 1–3','Ephesians 4–6, Philippians 1–4','Colossians 1–4, 1 Thessalonians 1–5','2 Thessalonians 1–3, 1 Timothy 1–6','2 Timothy 1–4, Titus 1–3','Philemon, Hebrews 1–5','Hebrews 6–13','James 1–5, 1 Peter 1–3','1 Peter 4–5, 2 Peter 1–3','1 John 1–5, 2 John, 3 John, Jude','Revelation 1–7','Revelation 8–14','Revelation 15–22'
    ]
  }
];

const STORAGE_KEY = 'brp-6-month-progress-v2';
const START_KEY = 'brp-6-month-start-date';

function flattenDays() {
  const out = [];
  monthData.forEach((monthObj, monthIndex) => {
    monthObj.days.forEach((reading, dayInMonth) => {
      out.push({ monthIndex, dayInMonth, reading, globalIndex: out.length });
    });
  });
  return out;
}

function loadProgress(total) {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return new Array(total).fill(false);
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Array(total).fill(false);
    return parsed.slice(0, total).concat(new Array(Math.max(0, total - parsed.length)).fill(false));
  } catch {
    return new Array(total).fill(false);
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateKpis(progress) {
  const completed = progress.filter(Boolean).length;
  const remaining = progress.length - completed;
  const percent = Math.round((completed / progress.length) * 100);

  document.getElementById('kpiCompleted').textContent = completed;
  document.getElementById('kpiRemaining').textContent = remaining;
  document.getElementById('kpiPercent').textContent = `${percent}%`;
  document.getElementById('progressBar').style.width = `${percent}%`;
}

function ensureStartDate() {
  let startDate = localStorage.getItem(START_KEY);
  if (!startDate) {
    startDate = new Date().toISOString().slice(0, 10);
    localStorage.setItem(START_KEY, startDate);
  }
  return startDate;
}

function todayTargetIndex(totalDays) {
  const start = new Date(ensureStartDate());
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff, 0), totalDays - 1);
}

document.addEventListener('DOMContentLoaded', () => {
  const monthGrid = document.getElementById('monthGrid');
  const allDays = flattenDays();
  const progress = loadProgress(allDays.length);

  monthData.forEach((monthObj, monthIndex) => {
    const card = document.createElement('section');
    card.className = 'month';
    card.innerHTML = `<h3>${monthObj.month}</h3><ol></ol>`;
    const list = card.querySelector('ol');

    monthObj.days.forEach((reading, dayInMonth) => {
      const globalIndex = allDays.findIndex(d => d.monthIndex === monthIndex && d.dayInMonth === dayInMonth);
      const id = `day-${globalIndex}`;

      const li = document.createElement('li');
      li.className = `day-row${progress[globalIndex] ? ' done' : ''}`;
      li.dataset.reading = reading.toLowerCase();
      li.dataset.globalIndex = String(globalIndex);

      li.innerHTML = `
        <input id="${id}" type="checkbox" ${progress[globalIndex] ? 'checked' : ''} />
        <label for="${id}">${reading}</label>
      `;

      li.querySelector('input').addEventListener('change', (event) => {
        progress[globalIndex] = event.target.checked;
        li.classList.toggle('done', event.target.checked);
        saveProgress(progress);
        updateKpis(progress);
      });

      list.appendChild(li);
    });

    monthGrid.appendChild(card);
  });

  updateKpis(progress);

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.day-row').forEach((row) => {
      row.classList.toggle('hidden', query && !row.dataset.reading.includes(query));
    });
  });

  document.getElementById('resetProgress').addEventListener('click', () => {
    if (!window.confirm('Reset all completed days? This cannot be undone.')) return;
    progress.fill(false);
    saveProgress(progress);
    document.querySelectorAll('.day-row').forEach((row) => {
      row.classList.remove('done');
      row.querySelector('input').checked = false;
    });
    updateKpis(progress);
  });

  document.getElementById('jumpToTodayBtn').addEventListener('click', () => {
    const target = todayTargetIndex(allDays.length);
    const row = document.querySelector(`.day-row[data-global-index="${target}"]`);
    if (!row) return;
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row.classList.add('done');
    setTimeout(() => row.classList.remove('done'), 900);
  });
});
