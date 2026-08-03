/* ============================================================
   إعدادات موقع مواد كلية الهندسة — نسخة الزوّار
   سجل الأقسام الثابت فقط (من غير أي حسابات أو باسوردات).
   لو عايز تغيّر اسم قسم أو أيقونته: غيّره هنا وفي
   admin/js/config.js بنفس الشكل.
   ============================================================ */

// أسماء الفرق (بتظهر في الشريط اللي فوق صفحة كل قسم)
const YEAR_NAMES = { '1': 'الفرقة الأولى', '2': 'الفرقة الثانية', '3': 'الفرقة الثالثة', '4': 'الفرقة الرابعة' };
const YEAR_ORDER = ['1', '2', '3', '4'];

// group: 'general' = الأقسام العامة | 'special' = البرامج النوعية
// noYears: true = قسم من غير شريط فرق (اعدادي — سنة واحدة بس)
const DEPARTMENTS = [
  { id: 'prep',     name: 'اعدادي هندسة',        group: 'general', icon: 'grad',  color: 'from-indigo-500 to-purple-600', noYears: true,  desc: 'مواد السنة الإعدادية لكل الطلبة' },
  { id: 'comm',     name: 'اتصالات وإلكترونيات',  group: 'general', icon: 'antenna', color: 'from-cyan-500 to-blue-600',                       desc: 'Communications & Electronics' },
  { id: 'power',    name: 'قوى وآلات كهربية',     group: 'general', icon: 'bolt',            color: 'from-amber-500 to-orange-600',                      desc: 'Electrical Power & Machines' },
  { id: 'mech',     name: 'ميكانيكا قوى',         group: 'general', icon: 'fan',           color: 'from-emerald-500 to-teal-600',                      desc: 'Mechanical Power Engineering' },
  { id: 'prod',     name: 'إنتاج وتصميم ميكانيكي', group: 'general', icon: 'factory',        color: 'from-orange-500 to-red-500',                        desc: 'Production & Mechanical Design' },
  { id: 'arch',     name: 'عمارة',               group: 'general', icon: 'landmark', color: 'from-violet-500 to-purple-700',                     desc: 'Architecture Engineering' },
  { id: 'civil',    name: 'مدني',                group: 'general', icon: 'road',            color: 'from-sky-500 to-indigo-600',                         desc: 'Civil Engineering' },
  { id: 'commcomp', name: 'اتصالات وحاسبات',      group: 'special', icon: 'cpu',       color: 'from-pink-500 to-rose-600',                         desc: 'Communications & Computers Program' },
  { id: 'mechat',   name: 'ميكاترونكس',          group: 'special', icon: 'bot',           color: 'from-green-500 to-emerald-600',                      desc: 'Mechatronics Program' },
  { id: 'ai',       name: 'ذكاء اصطناعي',        group: 'special', icon: 'sparkles',           color: 'from-red-500 to-pink-600',                           desc: 'Artificial Intelligence Program' },
];

const GROUP_NAMES = { general: 'الأقسام العامة', special: 'البرامج النوعية' };

/* ------------------------------------------------------------
   نظام أيقونات SVG مودرن 🎯 — خطوط ستروك خفيفة مشحونة inline
   (مفيش خطوط أيقونات = تحميل أسرع + شكل حديث ثابت على كل الأجهزة)
   iconSVG(x) بيرجّع SVG جاهز، وبيفهم تلقائياً كل الصيغ القديمة:
   أسماء الأيقونات الجديدة + أكواد fa-* المحفوظة في بياناتك
   + أي إيموجي اتحفّظ قبل كده — مفيش مادة أو قسم هيبوظ أبداً ✔
   ------------------------------------------------------------ */
const ICON_PATHS = {
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  bookopen: '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2V4Z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7V4Z"/>',
  grad: '<path d="M21.4 10.9a1 1 0 0 0 0-1.8l-9-4.4a1 1 0 0 0-.8 0l-9 4.4a1 1 0 0 0 0 1.8l9 4.4a1 1 0 0 0 .8 0l9-4.4Z"/><path d="M22 10v6"/><path d="M6 12.4V16a6 3 0 0 0 12 0v-3.6"/>',
  antenna: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2a5.5 5.5 0 0 1 0-8.5"/><path d="M16.2 7.7a5.5 5.5 0 0 1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/><circle cx="12" cy="12" r="2"/><path d="M13.3 13.5 16 22"/><path d="M10.7 13.5 8 22"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  gear: '<circle cx="12" cy="12" r="3.1"/><circle cx="12" cy="12" r="8.4" stroke-dasharray="3.2 3.9"/>',
  fan: '<path d="M10.83 16.38a6.08 6.08 0 0 1-8.62-7l5.41 1.45a6.08 6.08 0 0 1 7-8.62l-1.45 5.41a6.08 6.08 0 0 1 8.62 7l-5.41-1.45a6.08 6.08 0 0 1-7 8.62l1.45-5.41Z"/><circle cx="12" cy="12" r="1.1"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="m12 2 8 5H4l8-5Z"/>',
  road: '<path d="M9.5 3 4.5 21"/><path d="M14.5 3l5 18"/><path d="M12 6.5v1.8M12 11.5v1.8M12 16.5v1.8"/>',
  cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  bot: '<path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  sparkles: '<path d="M12 2.4 14 8.6 20.2 10.6 14 12.6 12 18.8 10 12.6 3.8 10.6 10 8.6 12 2.4Z"/><path d="M19 15l.85 2.15L22 18l-2.15.85L19 21l-.85-2.15L16 18l2.15-.85L19 15Z"/><path d="M5.5 16.5l.65 1.6 1.6.65-1.6.65-.65 1.6-.65-1.6-1.6-.65 1.6-.65.65-1.6Z"/>',
  flask: '<path d="M10 2v6.3a2 2 0 0 1-.1.64L4.4 18.5A2 2 0 0 0 6.3 21.4h11.5a2 2 0 0 0 1.8-2.9L14.1 8.94a2 2 0 0 1-.1-.63V2"/><path d="M8.5 2h7"/><path d="M7 15h10"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6.5h8"/><path d="M16 11.5h.01M12 11.5h.01M8 11.5h.01M16 15h.01M12 15h.01M8 15h.01M16 18.5h.01M12 18.5h.01M8 18.5h.01"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.3 7.7-2.1 6.5-6.5 2.1 2.1-6.5 6.5-2.1Z"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  atom: '<circle cx="12" cy="12" r="1.4"/><path d="M20.2 20.2c2-2 .1-7.3-4.5-11.9C11.2 3.8 5.9 1.8 3.9 3.8c-2 2-.1 7.3 4.4 11.9 4.5 4.5 9.9 6.5 11.9 4.5Z"/><path d="M15.7 15.7c4.5-4.6 6.5-9.9 4.5-11.9-2-2-7.4-.1-11.9 4.4-4.6 4.6-6.5 9.9-4.5 11.9 2 2 7.4.1 11.9-4.4Z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 0 0 18 8a6 6 0 0 0-12 0c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 21.5h4"/>',
  chart: '<path d="M3 3v18h18"/><path d="M8 17v-5.5"/><path d="M13 17V8"/><path d="M18 17V5.5"/>',
  images: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.2"/>',
  film: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 8.5h5M2 15.5h5M17 8.5h5M17 15.5h5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 16-5-5L5 22"/>',
  drive: '<path d="M22 12H2"/><path d="M5.5 5.2 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.8A2 2 0 0 0 16.8 3.5H7.2a2 2 0 0 0-1.7 1.7Z"/><path d="M6 16h.01M10 16h.01"/>',
  feather: '<path d="M20.2 12.2a6 6 0 0 0-8.4-8.4L5 10.5V19h8.5l6.7-6.8Z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8l-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2Z"/>',
  ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0l12.6 12.6Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
  scope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-8 8l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 8-8l-3.8 3.8Z"/>',
  plug: '<path d="M9 2v5"/><path d="M15 2v5"/><path d="M7 7h10v3.5a5 5 0 0 1-10 0V7Z"/><path d="M12 15.5V22"/>',
  car: '<path d="M19 17h2a1 1 0 0 0 1-1v-3a3 3 0 0 0-3-3h-2l-2-3H9L7 10H5a3 3 0 0 0-3 3v3a1 1 0 0 0 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  plane: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  satellite: '<path d="m13 7-4-4-5 5 4 4"/><path d="m17 11 4 4-5 5-4-4"/><path d="m8 12 4 4 4-4-4-4-4 4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/>',
  crane: '<path d="M6 21h8"/><path d="M10 21V4"/><path d="M10 4h11"/><path d="m21 4-5 4"/><path d="m15 4-3 4"/><path d="M20 4v4"/><path d="M19.2 8h1.6l-.8 1.6-.8-1.6Z"/>',
  dna: '<path d="M2 15c6.7-6 13.3 0 20-6"/><path d="M2 9c6.7 6 13.3 0 20 6"/><path d="m17 6-2.2-2.2"/><path d="m7 18 2.2 2.2"/><path d="m9.5 16.5 1.8 1.8"/><path d="m14.5 7.5-1.8-1.8"/>'
};
/* تحويل أكواد Font Awesome القديمة (المحفوظة في بياناتك) لمفاتيح SVG */
const FA2ICON = {
  'fa-book': 'book', 'fa-flask': 'flask', 'fa-calculator': 'calc', 'fa-drafting-compass': 'compass',
  'fa-compass-drafting': 'landmark', 'fa-code': 'code', 'fa-cogs': 'gear', 'fa-atom': 'atom',
  'fa-globe': 'globe', 'fa-lightbulb': 'bulb', 'fa-graduation-cap': 'grad', 'fa-brain': 'sparkles',
  'fa-chart-bar': 'chart', 'fa-images': 'images', 'fa-camera': 'camera', 'fa-photo-film': 'film',
  'fa-panorama': 'image', 'fa-image': 'image', 'fa-mountain-sun': 'image', 'fa-industry': 'factory',
  'fa-hard-drive': 'drive', 'fa-feather': 'feather', 'fa-star': 'star', 'fa-book-open': 'bookopen',
  'fa-tower-broadcast': 'antenna', 'fa-bolt': 'bolt', 'fa-gears': 'gear', 'fa-road': 'road',
  'fa-microchip': 'cpu', 'fa-robot': 'bot'
};
/* تحويل أي إيموجي ممكن تكون اتحفّظت في جولة الإيموجي لمفاتيح SVG */
const EMOJI2ICON = {
  '📘': 'book', '🧪': 'flask', '🧮': 'calc', '📐': 'ruler', '💻': 'cpu', '⚙️': 'gear',
  '⚛️': 'atom', '🌍': 'globe', '💡': 'bulb', '🎓': 'grad', '🧠': 'sparkles', '📊': 'chart',
  '🖼️': 'images', '📸': 'camera', '🎞️': 'film', '🏞️': 'image', '🌄': 'image', '🏔️': 'image',
  '🏭': 'factory', '💾': 'drive', '🪶': 'feather', '⭐': 'star', '📖': 'bookopen', '📡': 'antenna',
  '⚡': 'bolt', '🛣️': 'road', '🤖': 'bot', '🏛️': 'landmark', '🏗️': 'crane', '🔬': 'scope',
  '🛠️': 'wrench', '🔌': 'plug', '🚗': 'car', '✈️': 'plane', '🛰️': 'satellite', '🧬': 'dna',
  '🌉': 'landmark'
};
// اسم المفتاح لأي صيغة أيقونة جاية (جديد/قديم/إيموجي)
function iconKey(x) {
  if (!x) return 'book';
  const s = String(x).trim();
  if (!s) return 'book';
  if (ICON_PATHS[s]) return s;
  if (s.indexOf('fa-') === 0) return FA2ICON[s] || 'book';
  if (EMOJI2ICON[s]) return EMOJI2ICON[s];
  return 'book';
}
// بيرجّع SVG جاهز للعرض (لونه currentColor — بياخد لون التايل أوتوماتيك)
// data-ic بيسمّي الأيقونة عشان الاختبارات والديباج
function iconSVG(x) {
  const k = iconKey(x);
  return '<svg class="bp-ic" data-ic="' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON_PATHS[k] + '</svg>';
}
// مفاتيح منتقي أيقونات المادة (فورم الإضافة/التعديل)
const COURSE_ICON_KEYS = ['book', 'flask', 'calc', 'compass', 'code', 'gear', 'atom', 'globe', 'bulb', 'grad', 'sparkles', 'chart', 'images', 'camera', 'film', 'image', 'factory', 'drive', 'feather', 'star', 'bookopen', 'ruler', 'crane'];
// توافقية مع الاسم القديم — COURSE_GLYPHS كان بيتستخدم في جولة الإيموجي
const COURSE_GLYPHS = COURSE_ICON_KEYS;

/* ------------------------------------------------------------
   ⚡ خلفية الدائرة الإلكترونية الحيّة (لايت + دارك)
   لوحة PCB مكثّفة من غير شيب مركزي: زوايا 45° + فيا مزدوجة + سفوف SMD + السر محيطي + 14 نبضة أحادية اللون (SMIL على الجراديانت)
   خفيفة: عناصر قليلة ثابتة العدد، والحركة كلها على نفس نظام الإحداثيات
   ------------------------------------------------------------ */
function mountCircuitBg() {
  try {
    if (document.getElementById('bp-circuit-bg')) return;
    /* 🖼️ لوحة PCB مكثّفة (من غير شيب مركزي):
       مسارات أساسية + ثانوية كتير، زوايا 45°، فيا مزدوجة (حلقة + نقطة)،
       سفوف بادات SMD، السر المحيطي، مجمع فيا في النص —
       ونبضة واحدة أحادية اللون بتجري في 14 مسار (8 أساسية + 6 متساقطات). */

    const MAIN = [
      ['cir-1', 'M-30,150 H240 V360 H540 V280 H900 V360 H1120', 10, '#00e5ff'],
      ['cir-2', 'M-30,780 H200 V580 H480 V700 H820 V620 H1060', 13, '#4d8dff'],
      ['cir-3', 'M720,930 V720 H1000 V540 H1280 V640 H1480', 15, '#a855f7'],
      ['cir-4', 'M1470,190 H1200 V400 H940 V320 H660 V420 H480', 11, '#ff4dd8'],
      ['cir-5', 'M320,-30 V200 H580 V440 H860', 9,  '#ffb224'],
      ['cir-6', 'M1140,-30 V240 H960 V460 H1240 V600 H1390', 14, '#34e07a'],
      ['cir-7', 'M-30,470 H150 V320 H390 V470 H620', 12, '#ff6b81'],
      ['cir-8', 'M1470,840 H1300 V710 H1110 V820 H950', 16, '#2ee6c8']
    ];
    const mainTraces = MAIN.map(t => '<path id="' + t[0] + '" d="' + t[1] + '"/>').join('');
    const elbows = [
      [240,150],[240,360],[540,360],[540,280],[900,280],[900,360],
      [200,780],[200,580],[480,580],[480,700],[820,700],[820,620],
      [720,720],[1000,720],[1000,540],[1280,540],[1280,640],
      [1200,190],[1200,400],[940,400],[940,320],[660,320],[660,420],
      [320,200],[580,200],[580,440],
      [1140,240],[960,240],[960,460],[1240,460],[1240,600],
      [150,470],[150,320],[390,320],[390,470],
      [1300,840],[1300,710],[1110,710],[1110,820]
    ];
    const ends = [[1120,360],[1060,620],[480,420],[860,440],[1390,600],[620,470],[950,820]];
    const mainPads = elbows.map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>').join('') +
      ends.map(p => '<rect x="' + (p[0]-5) + '" y="' + (p[1]-5) + '" width="10" height="10" rx="2"/>').join('');

    function dFromPts(pts) {
      let d = 'M' + pts[0][0] + ',' + pts[0][1];
      for (let i = 1; i < pts.length; i++) {
        const px = pts[i][0] - pts[i-1][0], py = pts[i][1] - pts[i-1][1];
        if (px === 0) d += ' V' + pts[i][1];
        else if (py === 0) d += ' H' + pts[i][0];
        else d += ' L' + pts[i][0] + ',' + pts[i][1]; // زاوية 45° — توقيع الـ PCB
      }
      return d;
    }
    function secMarkup(ptsList) {
      return ptsList.map(function(pts, ix) {
        let m = '<path d="' + dFromPts(pts) + '"/>';
        for (let i = 1; i < pts.length - 1; i++) { // فيا مزدوجة: حلقة + نقطة
          m += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="5"/>' +
               '<circle class="viadot" cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="2"/>';
        }
        const lp = pts[pts.length - 1];
        m += (ix % 3 === 0)
          ? '<rect x="' + (lp[0]-5) + '" y="' + (lp[1]-5) + '" width="10" height="10" rx="2"/>'
          : '<circle cx="' + lp[0] + '" cy="' + lp[1] + '" r="5.5"/>';
        return m;
      }).join('');
    }
    function busMarkup(pts, n, gap, dx, dy) { // باص متوازي: نسخ مزاحة خطوة خطوة
      let m = '';
      for (let k = 1; k < n; k++) {
        m += secMarkup([pts.map(function(p){ return [p[0] + dx * k * gap, p[1] + dy * k * gap]; })]);
      }
      return m;
    }
    function smdRow(x, y, n, dx, dy) { // سف بادات SMD صغيرة
      let m = '';
      for (let i = 0; i < n; i++) {
        m += '<rect x="' + (x + dx * i) + '" y="' + (y + dy * i) + '" width="9" height="9" rx="1.5"/>';
      }
      return m;
    }

    const SEC = [
      [[-30,60],[200,60],[200,110],[360,110]],
      [[400,50],[620,50],[620,110],[760,110],[760,50]],
      [[820,70],[980,70],[980,150],[1090,150]],
      [[1170,60],[1380,60],[1380,120],[1470,120]],
      [[60,-30],[60,220],[120,220],[120,300]],
      [[1360,200],[1360,330],[1310,330]],
      [[90,620],[90,760],[170,760]],
      [[-30,240],[110,240],[110,330],[230,330]],
      [[1330,560],[1410,560],[1410,640],[1470,640]],
      [[1040,760],[1040,840],[1160,840]],
      [[420,620],[560,620],[560,700],[680,700]],
      [[760,700],[880,700],[880,790],[990,790]],
      [[70,840],[70,930]],
      [[1230,120],[1230,210],[1290,210],[1290,270],[1350,270],[1350,340],[1410,340]],
      [[180,430],[260,430],[260,510],[340,510]],
      [[1010,300],[1080,300],[1080,360],[1160,360],[1160,300]],
      [[250,-30],[250,90],[310,150]],
      [[560,640],[640,720],[760,720],[840,800],[840,860]],
      [[-30,430],[60,430],[140,510],[140,610]],
      [[1470,300],[1400,300],[1400,240],[1330,240],[1260,170]],
      [[1470,476],[1408,476],[1352,420],[1352,340]],
      [[955,206],[1015,206],[1060,161],[1060,116],[1120,60]],
      [[620,900],[740,900],[800,840],[920,840],[980,780]],
      [[344,530],[404,530],[450,484],[534,484]],
      [[-30,700],[60,700],[120,760],[120,830]],
      [[290,300],[290,240],[370,240],[440,170],[440,110]],
      [[1300,690],[1240,690],[1180,750],[1180,810]],
      [[60,360],[120,360],[160,400],[160,440]],
      [[1450,700],[1390,700],[1330,760],[1330,830]],
      [[840,30],[840,90],[900,150]],
      [[160,170],[220,170],[270,120]]
    ];
    const SEC_COMETS = [
      ['sec-1', [[320,-30],[320,72],[1140,72],[1140,-30]], 17, '#2ee6c8'],
      ['sec-2', [[494,-30],[494,14],[666,186],[666,286]], 21, '#ff6b81'],
      ['sec-3', [[1140,930],[1140,740]], 20, '#ffb224'],
      ['sec-4', [[1428,-30],[1428,108],[1332,204],[1332,252]], 19, '#4d8dff'],
      ['sec-5', [[-30,706],[54,706],[134,786],[134,900]], 22, '#00e5ff'],
      ['sec-6', [[392,930],[392,722],[492,622],[552,622]], 23, '#a855f7']
    ];
    const smd =
      smdRow(30, 316, 9, 0, 21) +
      smdRow(1260, 28, 10, 21, 0) +
      smdRow(1396, 420, 7, 0, 21) +
      smdRow(770, 852, 8, 21, 0);
    const centerVia =
      '<circle cx="720" cy="428" r="12"/>' +
      '<circle cx="720" cy="428" r="20"/>' +
      '<circle cx="720" cy="428" r="28"/>' +
      '<circle class="viadot" cx="720" cy="428" r="5"/>' +
      dFromPts([[720,428],[790,360],[832,360]]) +
      dFromPts([[720,428],[650,360],[608,360]]) +
      dFromPts([[720,428],[790,496],[832,496]]) +
      dFromPts([[720,428],[650,496],[608,496]]);
    const frame = dFromPts([[20,20],[1420,20],[1420,880],[20,880],[20,20]]);

    /* محور النبضة واتجاهها من شكل المسار (أوامر M/H/V) */
    function axisOf(dStr) {
      let x = 0, y = 0, x0 = null, y0 = null, hLen = 0, vLen = 0;
      (dStr.match(/[A-Za-z][-\d.,]*/g) || []).forEach(function(seg) {
        const cmd = seg[0], nums = seg.slice(1).split(',');
        if (cmd === 'M') { x = parseFloat(nums[0]); y = parseFloat(nums[1]); if (x0 === null) { x0 = x; y0 = y; } }
        else if (cmd === 'H') { const nx = parseFloat(nums[0]); hLen += Math.abs(nx - x); x = nx; }
        else if (cmd === 'V') { const ny = parseFloat(nums[0]); vLen += Math.abs(ny - y); y = ny; }
      });
      if (hLen >= vLen) return { ax: 'x', sgn: (x - (x0 === null ? 0 : x0)) < 0 ? -1 : 1 };
      return { ax: 'y', sgn: (y - (y0 === null ? 0 : y0)) < 0 ? -1 : 1 };
    }

    /* ⚡ نبضة واحدة لكل مسار — لون واحد ثابت (نافذة لامعة في دورة 2400 وحدة) */
    const PERIOD = 2400;
    function cometGrad(id, dStr, C, dur, ix) {
      const a = axisOf(dStr);
      const dx = a.ax === 'x' ? PERIOD * a.sgn : 0;
      const dy = a.ax === 'y' ? PERIOD * a.sgn : 0;
      const begin = '-' + (ix * 1.7).toFixed(1) + 's';
      return '<linearGradient id="comet-' + id + '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + dx + '" y2="' + dy + '" spreadMethod="repeat">' +
        '<stop offset="0" stop-color="' + C + '" stop-opacity="0"/>' +
        '<stop offset="0.78" stop-color="' + C + '" stop-opacity="0"/>' +
        '<stop offset="0.865" stop-color="' + C + '" stop-opacity="0.5"/>' +
        '<stop offset="0.935" stop-color="' + C + '"/>' +
        '<stop offset="0.96" stop-color="#ffffff"/>' +
        '<stop offset="1" stop-color="' + C + '" stop-opacity="0"/>' +
        '<animate attributeName="x1" from="0" to="' + dx + '" dur="' + dur + 's" begin="' + begin + '" repeatCount="indefinite"/>' +
        '<animate attributeName="y1" from="0" to="' + dy + '" dur="' + dur + 's" begin="' + begin + '" repeatCount="indefinite"/>' +
        '<animate attributeName="x2" from="' + dx + '" to="' + (dx * 2) + '" dur="' + dur + 's" begin="' + begin + '" repeatCount="indefinite"/>' +
        '<animate attributeName="y2" from="' + dy + '" to="' + (dy * 2) + '" dur="' + dur + 's" begin="' + begin + '" repeatCount="indefinite"/>' +
      '</linearGradient>';
    }
    const ALL_COMETS = MAIN.map(t => [t[0], t[1], t[2], t[3], 8, 2.6, 0.55, 1])
      .concat(SEC_COMETS.map(t => [t[0], dFromPts(t[1]), t[2], t[3], 5.5, 1.7, 0.4, 0.7]));
    const gradsHtml = ALL_COMETS.map(function(t, ix) { return cometGrad(t[0], t[1], t[3], t[2], ix); }).join('');
    const comets = ALL_COMETS.map(function(t) {
      return '<path class="bp-cometsoft" d="' + t[1] + '" fill="none" stroke="url(#comet-' + t[0] + ')" stroke-width="' + t[4] + '" stroke-opacity="' + t[6] + '" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path class="bp-comet" d="' + t[1] + '" fill="none" stroke="url(#comet-' + t[0] + ')" stroke-width="' + t[5] + '" stroke-opacity="' + t[7] + '" stroke-linecap="round" stroke-linejoin="round"/>';
    }).join('');

    const defs = '<defs>' +
      '<radialGradient id="cirBg" cx="50%" cy="42%" r="78%">' +
        '<stop offset="0" stop-color="#102a63"/><stop offset="0.55" stop-color="#081536"/><stop offset="1" stop-color="#030818"/>' +
      '</radialGradient>' +
      '<radialGradient id="cirBgLt" cx="50%" cy="42%" r="78%">' +
        '<stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#eef3fe"/><stop offset="1" stop-color="#dce6fa"/>' +
      '</radialGradient>' +
      gradsHtml +
    '</defs>';

    const d = document.createElement('div');
    d.className = 'bp-circuit';
    d.id = 'bp-circuit-bg';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML =
      '<svg class="bp-cirsvg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">' +
        defs +
        '<rect class="bp-cirbg" x="0" y="0" width="1440" height="900"/>' +
        '<g class="bp-cir-dim">' + frame + secMarkup(SEC) + busMarkup(SEC[6], 3, 24, 0, 1) + busMarkup(SEC[7], 3, 24, 0, 1) + smd + centerVia + '</g>' +
        '<g class="bp-cir-main">' + mainTraces + mainPads + '</g>' +
        '<g class="bp-comets">' + comets + '</g>' +
      '</svg>';
    document.body.insertBefore(d, document.body.firstChild);
  } catch (e) {}
}