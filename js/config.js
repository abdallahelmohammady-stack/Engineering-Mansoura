/* ============================================================
   إعدادات موقع مواد كلية هندسة — نسخة الزوّار
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
  { id: 'prep',     name: 'اعدادي هندسة',        group: 'general', icon: 'fa-graduation-cap',  color: 'from-indigo-500 to-purple-600', noYears: true,  desc: 'مواد السنة الإعدادية لكل الطلبة' },
  { id: 'comm',     name: 'اتصالات وإلكترونيات',  group: 'general', icon: 'fa-tower-broadcast', color: 'from-cyan-500 to-blue-600',                       desc: 'Communications & Electronics' },
  { id: 'power',    name: 'قوى وآلات كهربية',     group: 'general', icon: 'fa-bolt',            color: 'from-amber-500 to-orange-600',                      desc: 'Electrical Power & Machines' },
  { id: 'mech',     name: 'ميكانيكا قوى',         group: 'general', icon: 'fa-gears',           color: 'from-emerald-500 to-teal-600',                      desc: 'Mechanical Power Engineering' },
  { id: 'prod',     name: 'إنتاج وتصميم ميكانيكي', group: 'general', icon: 'fa-industry',        color: 'from-orange-500 to-red-500',                        desc: 'Production & Mechanical Design' },
  { id: 'arch',     name: 'عمارة',               group: 'general', icon: 'fa-compass-drafting', color: 'from-violet-500 to-purple-700',                     desc: 'Architecture Engineering' },
  { id: 'civil',    name: 'مدني',                group: 'general', icon: 'fa-road',            color: 'from-sky-500 to-indigo-600',                         desc: 'Civil Engineering' },
  { id: 'commcomp', name: 'اتصالات وحاسبات',      group: 'special', icon: 'fa-microchip',       color: 'from-pink-500 to-rose-600',                         desc: 'Communications & Computers Program' },
  { id: 'mechat',   name: 'ميكاترونكس',          group: 'special', icon: 'fa-robot',           color: 'from-green-500 to-emerald-600',                      desc: 'Mechatronics Program' },
  { id: 'ai',       name: 'ذكاء اصطناعي',        group: 'special', icon: 'fa-brain',           color: 'from-red-500 to-pink-600',                           desc: 'Artificial Intelligence Program' },
];

const GROUP_NAMES = { general: 'الأقسام العامة', special: 'البرامج النوعية' };
