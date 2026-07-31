/* ============================================================
   مكتبة مواد كلية هندسة — نسخة الزوّار (viewer.js)
   ------------------------------------------------------------
   عرض فقط: مفيش هنا أي تعديل أو تسجيل دخول.
   المحتوى بيتقرا من data/sites.json (اللي بينزل من زر "تصدير"
   في نسخة الأدمن وبيترفع مكانه).
   يعتمد على: config.js (سجل الأقسام الثابت)
   ============================================================ */

// ---------------- أدوات مساعدة ----------------
const $ = (id) => document.getElementById(id);
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function getLinkIcon(u) {
  if (!u) return 'fa-link';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'fa-brands fa-youtube';
  if (u.includes('drive.google.com')) return 'fa-brands fa-google-drive';
  if (u.includes('sharepoint.com') || u.includes('onedrive')) return 'fa-brands fa-microsoft';
  return 'fa-link';
}
function getLinkColor(u) {
  if (!u) return 'text-gray-500';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'text-red-500';
  if (u.includes('drive.google.com')) return 'text-green-500';
  if (u.includes('sharepoint.com') || u.includes('onedrive')) return 'text-blue-500';
  return 'text-indigo-500';
}
const NOTE_COLORS_LIGHT = [
  { bg: 'linear-gradient(135deg,#fef9c3,#fef08a)', color: '#713f12' },
  { bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1e3a8a' },
  { bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#166534' },
  { bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#9d174d' },
  { bg: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)', color: '#5b21b6' }
];
const NOTE_COLORS_DARK = [
  { bg: 'linear-gradient(135deg,#78350f,#92400e)', color: '#fef3c7' },
  { bg: 'linear-gradient(135deg,#1e3a8a,#1e40af)', color: '#dbeafe' },
  { bg: 'linear-gradient(135deg,#14532d,#166534)', color: '#d1fae5' },
  { bg: 'linear-gradient(135deg,#831843,#9d174d)', color: '#fce7f3' },
  { bg: 'linear-gradient(135deg,#4c1d95,#6d28d9)', color: '#ede9fe' }
];
const COURSE_ICONS = ['fa-book','fa-flask','fa-calculator','fa-drafting-compass','fa-code','fa-cogs','fa-atom','fa-globe','fa-lightbulb','fa-graduation-cap','fa-brain','fa-chart-bar','fa-images','fa-camera','fa-photo-film','fa-panorama','fa-image','fa-mountain-sun','fa-industry','fa-hard-drive','fa-feather','fa-star','fa-book-open'];
const COURSE_COLORS = ['from-indigo-500 to-purple-600','from-cyan-500 to-blue-600','from-emerald-500 to-teal-600','from-orange-500 to-red-500','from-pink-500 to-rose-600','from-violet-500 to-purple-700','from-sky-500 to-indigo-600','from-amber-500 to-orange-600','from-green-500 to-emerald-600','from-red-500 to-pink-600'];

// ---------------- التوست (عرض رسائل بس) ----------------
function showToast(msg, type) {
  type = type || 'info';
  const root = $('toasts');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'toast toast-in ' + type;
  el.innerHTML = '<i class="fa ' + (type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle') + ' text-lg"></i><span>' + esc(msg) + '</span>';
  el.onclick = () => el.remove();
  root.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 3500);
}

// ---------------- الحالة: هيكلة + تحميل من sites.json ----------------
function defaultState() {
  const departments = {};
  DEPARTMENTS.forEach(d => {
    const years = {};
    if (d.noYears) years['1'] = [];
    else YEAR_ORDER.forEach(y => { years[y] = []; });
    departments[d.id] = { years: years };
  });
  return { departments: departments };
}
function normalizeState(s) {
  const base = defaultState();
  if (!s || typeof s !== 'object') return base;
  const deps = s.departments && typeof s.departments === 'object' ? s.departments : {};
  DEPARTMENTS.forEach(d => {
    const cur = deps[d.id];
    if (cur && cur.years && typeof cur.years === 'object') {
      const outYears = {};
      Object.keys(base.departments[d.id].years).forEach(y => {
        outYears[y] = Array.isArray(cur.years[y]) ? cur.years[y] : [];
      });
      base.departments[d.id] = { years: outYears };
    }
  });
  return base;
}
let state = defaultState();
let dataReady = false;
async function loadState() {
  try {
    const res = await fetch('data/sites.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    state = normalizeState(data);
  } catch (e) {
    console.warn('تعذّر تحميل data/sites.json:', e);
    showToast('تعذّر تحميل ملف المحتوى data/sites.json — شغّل الموقع من سيرفر محلي مش من الملف مباشرة', 'error');
  } finally {
    dataReady = true;
  }
}
function deptOf(id) { return DEPARTMENTS.find(d => d.id === id); }
function getYearCourses(deptId, year) {
  const d = state.departments[deptId];
  if (!d || !d.years) return [];
  return d.years[year] || [];
}
function findCourse(deptId, year, courseId) {
  return getYearCourses(deptId, year).find(c => c.id === courseId);
}
function deptCounts(deptId) {
  let courses = 0, links = 0;
  const dep = state.departments[deptId];
  if (dep && dep.years) Object.keys(dep.years).forEach(y => {
    (dep.years[y] || []).forEach(c => {
      courses++;
      links += (c.sections || []).reduce((a, s) => a + (s.links || []).length, 0);
    });
  });
  return { courses: courses, links: links };
}

// ---------------- الراوتنج (الهاش) ----------------
function parseRoute() {
  const hash = (window.location.hash || '').replace(/^#/, '');
  const parts = hash.split('/').filter(Boolean);
  const route = { dept: null, year: '1', course: null };
  if (parts.length && deptOf(parts[0])) {
    route.dept = parts[0];
    const d = deptOf(route.dept);
    if (d.noYears) {
      route.course = parts[1] || null;
    } else {
      if (YEAR_ORDER.includes(parts[1])) { route.year = parts[1]; route.course = parts[2] || null; }
      else if (parts[1]) { route.course = parts[1]; }
    }
  }
  return route;
}
function goHome() { window.location.hash = ''; }
function openDept(id) { window.location.hash = id; }
function openYear(deptId, year) { window.location.hash = deptId + '/' + year; }
function openCourse(dept, year, courseId) {
  const d = deptOf(dept);
  window.location.hash = d.noYears ? (dept + '/' + courseId) : (dept + '/' + year + '/' + courseId);
}
function closeCourseView(dept, year) {
  const d = deptOf(dept);
  window.location.hash = d.noYears ? dept : (dept + '/' + year);
}
window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });

// ---------------- الوضع الليلي ----------------
let darkMode = false;
try { darkMode = localStorage.getItem('darkMode_v2') === 'true'; } catch (e) {}
function applyDark() {
  if (darkMode) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}
function toggleDark() {
  darkMode = !darkMode;
  try { localStorage.setItem('darkMode_v2', darkMode); } catch (e) {}
  applyDark(); render();
}

// ---------------- أجزاء مشتركة ----------------
let courseTitleCache = '';
function headerHTML(route) {
  const dept = route.dept ? deptOf(route.dept) : null;
  const title = route.course && dept ? courseTitleCache : (dept ? dept.name : 'مكتبة مواد كلية هندسة');
  return '' +
  '<header class="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80">' +
    '<div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">' +
      '<div class="flex items-center gap-2 min-w-0">' +
        (dept ? '<button onclick="goHome()" title="كل الأقسام" class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"><i class="fa fa-arrow-right"></i></button>' : '') +
        '<div class="flex items-center gap-2 min-w-0">' +
          '<div class="w-9 h-9 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white"><i class="fa ' + (dept ? dept.icon : 'fa-graduation-cap') + ' text-sm"></i></div>' +
          '<div class="min-w-0"><h1 class="text-sm sm:text-base font-bold text-gray-800 dark:text-white leading-tight truncate">' + esc(title) + '</h1>' +
          '<p class="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">مواد كل الأقسام — عام وبرامج نوعية 🎓</p></div>' +
        '</div>' +
      '</div>' +
      '<button onclick="toggleDark()" title="الوضع الليلي" class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700"><i class="fa ' + (darkMode ? 'fa-sun' : 'fa-moon') + '"></i></button>' +
    '</div>' +
  '</header>';
}
function footerHTML() {
  return '<footer class="mt-auto text-center py-4 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 glass"><span>made by abdallah elmohammady</span></footer>';
}
function deptCardHTML(d, counts) {
  return '' +
  '<div class="card-hover cursor-pointer group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl" onclick="openDept(\'' + d.id + '\')">' +
    '<div class="h-2 bg-gradient-to-r ' + d.color + '"></div>' +
    '<div class="p-5">' +
      '<div class="flex items-start justify-between mb-4">' +
        '<div class="w-12 h-12 bg-gradient-to-br ' + d.color + ' rounded-2xl flex items-center justify-center text-white text-xl shadow-md"><i class="fa ' + d.icon + '"></i></div>' +
        (d.noYears ? '<span class="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">سنة إعدادية</span>' : '') +
      '</div>' +
      '<h3 class="font-bold text-gray-800 dark:text-white text-base leading-tight mb-1">' + esc(d.name) + '</h3>' +
      '<p class="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">' + esc(d.desc || '') + '</p>' +
      '<div class="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3">' +
        '<span class="flex items-center gap-1"><i class="fa fa-book text-indigo-400"></i><span>' + counts.courses + ' مادة</span></span>' +
        '<span class="flex items-center gap-1"><i class="fa fa-link text-cyan-400"></i><span>' + counts.links + ' رابط</span></span>' +
        (counts.courses === 0 ? '<span class="mr-auto text-amber-500 font-semibold">قريباً…</span>' : '') +
      '</div>' +
    '</div>' +
  '</div>';
}

// ---------------- الرئيسية: كروت الأقسام ----------------
function renderHome() {
  const groups = ['general', 'special'];
  let html =
    '<div class="min-h-screen flex flex-col transition-colors duration-300 ' + (darkMode ? 'dark bg-gray-950' : 'bg-gray-50') + ' dot-pattern">' +
      headerHTML({ dept: null }) +
      '<main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8">' +
        '<div class="text-center mb-10 fade-in">' +
          '<h1 class="site-title text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-3">مكتبة مواد كلية هندسة</h1>' +
          '<p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">اختار القسم من البارتيشنز اللي تحت — كل اللينكات والملخصات والملاحظات اللي الأدمنز رافعينها هتلاقيها جوا البارتيشن</p>' +
        '</div>';
  groups.forEach(g => {
    const depts = DEPARTMENTS.filter(d => d.group === g);
    html +=
      '<div class="mb-10 fade-in">' +
        '<div class="flex items-center gap-3 mb-5">' +
          '<div class="w-9 h-9 bg-gradient-to-br ' + (g === 'general' ? 'from-indigo-500 to-purple-600' : 'from-pink-500 to-rose-600') + ' rounded-xl flex items-center justify-center text-white"><i class="fa ' + (g === 'general' ? 'fa-building-columns' : 'fa-certificate') + ' text-sm"></i></div>' +
          '<h2 class="text-xl font-black text-gray-800 dark:text-white">' + GROUP_NAMES[g] + '</h2>' +
          '<span class="text-xs text-gray-400 font-semibold">' + depts.length + ' قسم</span>' +
        '</div>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">' +
          depts.map(d => deptCardHTML(d, deptCounts(d.id))).join('') +
        '</div>' +
      '</div>';
  });
  html += '</main>' + footerHTML() + '</div>';
  $('root').innerHTML = html;
}

// ---------------- صفحة القسم: شريط الفرق + المواد ----------------
let searchQuery = '';
function onSearchInput(v) {
  searchQuery = v;
  renderDeptGrid();
  const si = $('search-input');
  if (si) { si.focus(); try { si.setSelectionRange(si.value.length, si.value.length); } catch (e) {} }
}
function renderDept(deptId, year) {
  const d = deptOf(deptId);
  if (d.noYears) year = '1';
  const years = d.noYears ? ['1'] : YEAR_ORDER;
  let yearBar = '';
  if (!d.noYears) {
    yearBar =
      '<div class="year-bar mb-6 sticky" style="top:74px;z-index:40">' +
        years.map(y => {
          const n = getYearCourses(deptId, y).length;
          return '<button class="year-tab ' + (y === year ? 'active' : '') + '" onclick="openYear(\'' + deptId + '\',\'' + y + '\')">' +
            '<i class="fa ' + (y === '1' ? 'fa-1' : y === '2' ? 'fa-2' : y === '3' ? 'fa-3' : 'fa-4') + '"></i>' +
            YEAR_NAMES[y] +
            '<span class="count">' + n + '</span>' +
          '</button>';
        }).join('') +
      '</div>';
  }
  const html =
    '<div class="min-h-screen flex flex-col transition-colors duration-300 ' + (darkMode ? 'dark bg-gray-950' : 'bg-gray-50') + ' dot-pattern">' +
      headerHTML({ dept: deptId }) +
      '<main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6">' +
        '<div class="rounded-3xl p-6 mb-6 bg-gradient-to-r ' + d.color + ' text-white shadow-lg fade-in">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"><i class="fa ' + d.icon + '"></i></div>' +
            '<div>' +
              '<h1 class="text-xl sm:text-2xl font-black">' + esc(d.name) + '</h1>' +
              '<p class="text-white/80 text-sm mt-1">' + esc(d.desc || '') + (d.noYears ? ' • محتوى السنة الإعدادية كلها هنا' : 'اختار الفرقة من الشريط اللي تحت.') + '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        yearBar +
        '<div id="dept-grid-area"></div>' +
      '</main>' +
      footerHTML() +
    '</div>';
  $('root').innerHTML = html;
  renderDeptGrid();
}
function renderDeptGrid() {
  const area = $('dept-grid-area');
  if (!area) return;
  const route = parseRoute();
  const deptId = route.dept;
  const d = deptOf(deptId);
  const year = d.noYears ? '1' : route.year;
  const all = getYearCourses(deptId, year);
  const q = (searchQuery || '').trim().toLowerCase();
  const filtered = q ? all.filter(c => (c.title || '').toLowerCase().includes(q) || (c.doc || '').toLowerCase().includes(q)) : all;
  const totalLinks = all.reduce((a, c) => a + (c.sections || []).reduce((b, s) => b + (s.links || []).length, 0), 0);
  const galleries = all.filter(c => c.type === 'gallery').length;

  area.innerHTML =
    '<div class="fade-in">' +
      '<div class="flex flex-col sm:flex-row gap-3 mb-6">' +
        '<div class="relative flex-1">' +
          '<i class="fa fa-search absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 text-sm"></i>' +
          '<input id="search-input" value="' + esc(searchQuery) + '" oninput="onSearchInput(this.value)" placeholder="🔍 ابحث عن مادة أو معرض في ' + esc(d.noYears ? d.name : YEAR_NAMES[year]) + '..." class="w-full pr-11 pl-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-3 gap-3 mb-8">' +
        [{ label: 'المواد', value: all.length - galleries, icon: 'fa-book', color: 'from-indigo-500 to-purple-600' },
         { label: 'المعارض', value: galleries, icon: 'fa-images', color: 'from-pink-500 to-rose-600' },
         { label: 'الروابط', value: totalLinks, icon: 'fa-link', color: 'from-emerald-500 to-teal-600' }]
        .map(s => '<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"><div class="w-9 h-9 bg-gradient-to-br ' + s.color + ' rounded-xl flex items-center justify-center text-white mb-2"><i class="fa ' + s.icon + ' text-sm"></i></div><div class="text-2xl font-bold text-gray-800 dark:text-white">' + s.value + '</div><div class="text-xs text-gray-500 dark:text-gray-400 font-medium">' + s.label + '</div></div>').join('') +
      '</div>' +
      (filtered.length === 0 ?
        '<div class="text-center py-20"><div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-gray-300"><i class="fa ' + (q ? 'fa-search' : 'fa-graduation-cap') + '"></i></div>' +
        '<p class="text-gray-400 font-semibold text-lg">' + (q ? '❌ لا توجد نتائج' : '📚 لسه مفيش محتوى في ' + esc(d.noYears ? 'القسم' : YEAR_NAMES[year])) + '</p>' +
        (!q ? '<p class="text-gray-400 text-sm mt-2">أدمن القسم لسه مارفعش حاجة هنا — ارجع له تاني قريب</p>' : '') +
        '</div>'
      :
        '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">' +
          filtered.map((c, i) => courseCardHTML(deptId, year, c, all.findIndex(x => x.id === c.id))).join('') +
        '</div>'
      ) +
    '</div>';
}
function courseCardHTML(deptId, year, c, index) {
  const isGallery = c.type === 'gallery';
  const links = (c.sections || []).reduce((a, s) => a + (s.links || []).length, 0);
  const color = c.color || COURSE_COLORS[index % COURSE_COLORS.length];
  return '' +
  '<div class="card-hover cursor-pointer group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl" onclick="openCourse(\'' + deptId + '\',\'' + year + '\',\'' + c.id + '\')">' +
    '<div class="h-2 bg-gradient-to-r ' + color + '"></div>' +
    '<div class="p-5">' +
      '<div class="flex items-start justify-between mb-4">' +
        '<div class="w-12 h-12 bg-gradient-to-br ' + color + ' rounded-2xl flex items-center justify-center text-white text-xl shadow-md overflow-hidden">' +
          (c.image ? '<img src="' + esc(c.image) + '" alt="" class="w-full h-full object-cover">' : '<i class="fa ' + (c.icon || COURSE_ICONS[index % COURSE_ICONS.length]) + '"></i>') +
        '</div>' +
      '</div>' +
      '<div class="flex items-center gap-2 mb-1">' + (isGallery ? '<span class="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded-full font-medium">معرض صور</span>' : '') +
      '<h3 class="font-bold text-gray-800 dark:text-white text-base leading-tight">' + esc(c.title) + '</h3></div>' +
      '<p class="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(c.doc || '') + '</p>' +
      '<div class="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3">' +
        (isGallery ?
          '<span class="flex items-center gap-1"><i class="fa fa-images text-pink-400"></i><span>' + ((c.images || []).length) + ' صورة</span></span>'
        :
          '<span class="flex items-center gap-1"><i class="fa fa-layer-group text-indigo-400"></i><span>' + ((c.sections || []).length) + ' قسم</span></span>' +
          '<span class="flex items-center gap-1"><i class="fa fa-link text-cyan-400"></i><span>' + links + ' رابط</span></span>' +
          ((c.notes || []).length ? '<span class="flex items-center gap-1 mr-auto"><i class="fa fa-sticky-note text-amber-400"></i><span>' + c.notes.length + '</span></span>' : '')
        ) +
      '</div>' +
    '</div>' +
  '</div>';
}

// ---------------- صفحة المادة: محتوى/ملاحظات ----------------
let activeCourseTab = 'content';
const collapsedSections = {};
function setCourseTab(t) { activeCourseTab = t; render(); }
function toggleSectionCollapse(sid) { collapsedSections[sid] = !collapsedSections[sid]; render(); }
function renderCourse(deptId, year, courseId) {
  const c = findCourse(deptId, year, courseId);
  if (!c) { closeCourseView(deptId, year); return; }
  if (c.type === 'gallery') { renderGallery(deptId, year, c); return; }
  courseTitleCache = c.title;
  const isContent = activeCourseTab !== 'notes';
  const totalLinks = (c.sections || []).reduce((a, s) => a + (s.links || []).length, 0);
  const color = c.color || COURSE_COLORS[0];

  const sectionsHTML = (c.sections || []).map(s => {
    const collapsed = !!collapsedSections[s.id];
    return '' +
    '<div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">' +
      '<div class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 select-none" onclick="toggleSectionCollapse(\'' + s.id + '\')">' +
        '<i class="fa fa-chevron-' + (collapsed ? 'down' : 'up') + ' text-gray-400 text-xs"></i>' +
        '<span class="font-bold text-gray-800 dark:text-white text-sm flex-1 truncate">' + esc(s.name) + '</span>' +
        (s.badge ? '<span class="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">' + esc(s.badge) + '</span>' : '') +
        '<span class="text-xs text-gray-400">' + ((s.links || []).length) + ' رابط</span>' +
      '</div>' +
      (collapsed ? '' :
        '<div class="px-3 pb-3">' +
          (s.links || []).map(l =>
            '<div class="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">' +
              '<i class="' + getLinkIcon(l.url) + ' ' + getLinkColor(l.url) + ' text-sm w-4 flex-shrink-0"></i>' +
              '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer" class="flex-1 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 truncate">' + esc(l.name) + '</a>' +
            '</div>'
          ).join('') +
          ((s.links || []).length === 0 ? '<p class="text-xs text-gray-400 text-center py-2">لسه مفيش لينكات هنا</p>' : '') +
        '</div>'
      ) +
    '</div>';
  }).join('');

  const notesHTML =
    ((c.notes || []).length === 0 ?
      '<div class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"><div class="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-amber-300"><i class="fa fa-sticky-note"></i></div><p class="text-gray-400 font-medium">لا توجد ملاحظات</p></div>'
    :
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">' +
        c.notes.map((n, i) => {
          const ns = (darkMode ? NOTE_COLORS_DARK : NOTE_COLORS_LIGHT)[i % NOTE_COLORS_LIGHT.length];
          const dt = new Date(n.updatedAt || n.createdAt || Date.now());
          return '<div class="rounded-2xl p-4 shadow-md" style="background:' + ns.bg + ';color:' + ns.color + '">' +
            '<p class="whitespace-pre-wrap text-sm font-medium leading-relaxed mb-3">' + esc(n.content) + '</p>' +
            '<span class="text-xs opacity-70">' + dt.toLocaleDateString('ar-EG') + '</span>' +
          '</div>';
        }).join('') +
      '</div>'
    );

  const html =
    '<div class="min-h-screen flex flex-col transition-colors duration-300 ' + (darkMode ? 'dark bg-gray-950' : 'bg-gray-50') + ' dot-pattern">' +
      headerHTML({ dept: deptId, course: courseId }) +
      '<main class="flex-1 max-w-5xl w-full mx-auto px-4 py-6">' +
        '<button onclick="closeCourseView(\'' + deptId + '\',\'' + year + '\')" class="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-500 mb-4"><i class="fa fa-arrow-right"></i> رجوع لـ ' + esc((deptOf(deptId) || {}).name || '') + '</button>' +
        '<div class="rounded-3xl p-6 mb-6 bg-gradient-to-r ' + color + ' text-white shadow-lg fade-in">' +
          '<div class="flex items-center gap-4 min-w-0">' +
            '<div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl overflow-hidden flex-shrink-0">' + (c.image ? '<img src="' + esc(c.image) + '" class="w-full h-full object-cover" alt="">' : '<i class="fa ' + (c.icon || 'fa-book') + '"></i>') + '</div>' +
            '<div class="min-w-0"><h1 class="text-xl sm:text-2xl font-bold truncate">' + esc(c.title) + '</h1>' +
              '<p class="text-white/80 text-sm mt-1 truncate">' + esc(c.doc || '') + '</p>' +
              '<div class="flex gap-4 mt-2 text-sm text-white/70"><span><i class="fa fa-layer-group ml-1"></i>' + ((c.sections || []).length) + ' قسم</span><span><i class="fa fa-link ml-1"></i>' + totalLinks + ' رابط</span><span><i class="fa fa-sticky-note ml-1"></i>' + ((c.notes || []).length) + ' ملاحظة</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex gap-2 mb-6">' +
          '<button onclick="setCourseTab(\'content\')" class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm ' + (isContent ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700') + '"><i class="fa fa-link"></i> المحتوى (' + totalLinks + ')</button>' +
          '<button onclick="setCourseTab(\'notes\')" class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm ' + (!isContent ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700') + '"><i class="fa fa-sticky-note"></i> الملاحظات (' + ((c.notes || []).length) + ')</button>' +
        '</div>' +
        (isContent ?
          '<div class="fade-in">' +
            ((c.sections || []).length === 0 ? '<div class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"><div class="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-indigo-300"><i class="fa fa-folder-open"></i></div><p class="text-gray-400 font-medium">لسه مفيش محتوى في المادة دي</p></div>' : sectionsHTML) +
          '</div>'
        : '<div class="fade-in">' + notesHTML + '</div>') +
      '</main>' +
      footerHTML() +
    '</div>';
  $('root').innerHTML = html;
}

// ---------------- المعرض ----------------
function renderGallery(deptId, year, c) {
  courseTitleCache = c.title;
  const color = c.color || 'from-pink-500 to-rose-600';
  const imgs = c.images || [];
  const html =
    '<div class="min-h-screen flex flex-col transition-colors duration-300 ' + (darkMode ? 'dark bg-gray-950' : 'bg-gray-50') + ' dot-pattern">' +
      headerHTML({ dept: deptId, course: c.id }) +
      '<main class="flex-1 max-w-5xl w-full mx-auto px-4 py-6">' +
        '<button onclick="closeCourseView(\'' + deptId + '\',\'' + year + '\')" class="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-500 mb-4"><i class="fa fa-arrow-right"></i> رجوع</button>' +
        '<div class="rounded-3xl p-6 mb-6 bg-gradient-to-r ' + color + ' text-white shadow-lg fade-in">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl overflow-hidden flex-shrink-0">' + (c.image ? '<img src="' + esc(c.image) + '" class="w-full h-full object-cover" alt="">' : '<i class="fa fa-images"></i>') + '</div>' +
            '<div><h1 class="text-xl sm:text-2xl font-bold">' + esc(c.title) + '</h1><p class="text-white/80 text-sm mt-1">' + esc(c.doc || '') + '</p>' +
            '<div class="flex gap-4 mt-2 text-sm text-white/70"><span><i class="fa fa-image ml-1"></i>' + imgs.length + ' صورة</span></div></div>' +
          '</div>' +
        '</div>' +
        (imgs.length === 0 ?
          '<div class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"><div class="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-pink-300"><i class="fa fa-images"></i></div><p class="text-gray-400 font-medium">لا توجد صور في المعرض</p></div>'
        :
          '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gallery-grid">' +
            imgs.map((im, i) =>
              '<div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">' +
                '<img src="' + esc(im.url) + '" alt="' + esc(im.title || '') + '" class="w-full h-40 object-cover" onclick="openLightbox(' + i + ',\'' + c.id + '\')">' +
                '<div class="p-3"><p class="text-sm font-semibold text-gray-800 dark:text-white truncate">' + esc(im.title || 'صورة') + '</p>' +
                (im.description ? '<p class="text-xs text-gray-400 truncate">' + esc(im.description) + '</p>' : '') + '</div>' +
              '</div>'
            ).join('') +
          '</div>'
        ) +
      '</main>' +
      footerHTML() +
    '</div>';
  $('root').innerHTML = html;
}
function openLightbox(idx, courseId) {
  const route = parseRoute();
  const d = deptOf(route.dept);
  const year = d.noYears ? '1' : route.year;
  const c = findCourse(route.dept, year, courseId);
  const im = ((c || {}).images || [])[idx];
  if (!im) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img src="' + esc(im.url) + '" alt="">';
  lb.onclick = () => lb.remove();
  document.body.appendChild(lb);
}

// ---------------- العرض الرئيسي ----------------
function render() {
  if (!dataReady) {
    $('root').innerHTML =
      '<div class="min-h-screen flex items-center justify-center ' + (darkMode ? 'dark bg-gray-950' : 'bg-gray-50') + ' dot-pattern">' +
        '<div class="text-center"><div class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-gray-400">جاري تحميل المحتوى...</p></div>' +
      '</div>';
    return;
  }
  const route = parseRoute();
  if (!route.dept) { renderHome(); return; }
  const d = deptOf(route.dept);
  const year = d.noYears ? '1' : route.year;
  if (route.course) {
    const c = findCourse(route.dept, year, route.course);
    if (!c) { closeCourseView(route.dept, year); return; }
    renderCourse(route.dept, year, route.course);
  } else {
    renderDept(route.dept, year);
  }
}

// ---------------- إقلاع ----------------
applyDark();
render(); // شاشة تحميل الأول
loadState().then(() => { render(); });
