import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import {
  Award,
  Battery,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileCheck,
  Gauge,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Shield,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

/* ─── Business constants ─────────────────────────────── */
const phone = '02 4421 6090';
const phoneRaw = '0244216090';
const address = 'Unit 3/175 Princes Highway, South Nowra, NSW 2541';
const mapsUrl =
  'https://maps.google.com/?q=Unit+3+175+Princes+Highway+South+Nowra+NSW+2541';
const email = 'mjnautomotive@hotmail.com';

/* ─── Nav ────────────────────────────────────────────── */
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#expertise' },
  { name: 'Contact', href: '#contact' },
];

/* ─── Trust strip ────────────────────────────────────── */
const trustItems = [
  {
    icon: Star,
    title: 'Trusted Local Workshop',
    text: 'Honest advice and reliable repairs for Nowra drivers.',
    accent: 'text-[#FFCC1B]',
  },
  {
    icon: Shield,
    title: 'Licensed Motor Vehicle Repairer',
    text: 'All work completed by qualified, licensed mechanics.',
    accent: 'text-[#EF1D2A]',
  },
  {
    icon: Car,
    title: 'All Makes & Models',
    text: 'Cars, SUVs, utes, 4x4s, and vans — we work on them all.',
    accent: 'text-[#FFCC1B]',
  },
  {
    icon: Clock,
    title: 'Monday to Friday',
    text: 'Open 8am-5pm. Call the workshop or send a service request online.',
    accent: 'text-[#EF1D2A]',
  },
];

/* ─── Services ───────────────────────────────────────── */
const services = [
  {
    icon: CalendarDays,
    title: 'Logbook Servicing',
    text: 'Manufacturer-spec servicing to maintain your new car warranty and long-term reliability.',
  },
  {
    icon: FileCheck,
    title: 'Rego Checks & Pink Slips',
    text: 'Pink slip inspections and roadworthy checks to get your vehicle back on the road legally.',
  },
  {
    icon: Wrench,
    title: 'Brake & Clutch Repairs',
    text: 'Brake pads, rotors, clutch faults, hydraulic systems, and safety-critical repairs.',
  },
  {
    icon: Car,
    title: 'Suspension & Steering',
    text: 'Component replacement, steering repairs, and handling improvements for safer driving.',
  },
  {
    icon: Zap,
    title: 'Engine Repairs',
    text: 'Cooling, timing, fuel, ignition, and general mechanical repairs on all engine types.',
  },
  {
    icon: Search,
    title: 'Diagnostics',
    text: 'Computer scanning and fault tracing for modern engine, electrical, and drivability issues.',
  },
  {
    icon: ShieldCheck,
    title: 'Pre-Purchase Inspections',
    text: "Know exactly what you're buying. Thorough mechanical assessment before you commit.",
  },
  {
    icon: Battery,
    title: 'Battery Replacement',
    text: 'Battery testing and same-day replacement for cars, SUVs, 4x4s, and commercial vehicles.',
  },
  {
    icon: Truck,
    title: '4x4, Ute & Van Servicing',
    text: 'Specialist servicing and repairs for 4x4s, utes, vans, and commercial work vehicles.',
  },
];

/* ─── About benefits ─────────────────────────────────── */
const benefits = [
  'Honest advice before any work begins',
  'Clear communication — no confusing jargon',
  'Quality parts from trusted suppliers',
  'Modern diagnostic scanning equipment',
  'Efficient turnaround — get back on the road faster',
  'Practical, experienced local mechanics',
];

/* ─── Suppliers ──────────────────────────────────────── */
const suppliers: { name: string; logo: string; href: string; imgClass?: string }[] = [
  { name: 'Bosch',   logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg',       href: 'https://www.bosch.com.au' },
  { name: 'Ryco',    logo: 'https://www.rycofilters.com.au/img/footer-logo.svg',                        href: 'https://www.rycofilters.com.au' },
  { name: 'Bendix',  logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Bendix_small_curve_logo.svg', href: 'https://www.bendix.com.au' },
  { name: 'Penrite', logo: '/logos/penrite.svg',                                                        href: 'https://www.penriteoil.com.au' },
  { name: 'Castrol', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Castrol_logo_2023.svg', href: 'https://www.castrol.com/en_au/australia.html' },
  { name: 'NGK',     logo: '/logos/ngk.svg',                                                            href: 'https://www.ngk.com.au' },
];

/* ─── Reviews ────────────────────────────────────────── */
const reviews = [
  {
    name: 'Sarah M.',
    location: 'Nowra',
    text: 'Clear communication, honest advice, and excellent workmanship. Took my car in for a service and they explained everything before starting. Highly recommended.',
    stars: 5,
  },
  {
    name: 'Brett L.',
    location: 'South Nowra',
    text: 'Professional from first call to pickup. The team explained exactly what was needed, no surprises on the bill. Will definitely be back.',
    stars: 5,
  },
  {
    name: 'Karen D.',
    location: 'Shoalhaven',
    text: 'Reliable workshop, fair advice, and quality repairs. Exactly what you want from a local mechanic. Fixed my brake issue quickly and at a fair price.',
    stars: 5,
  },
];

/* ─── FAQs ───────────────────────────────────────────── */
const faqs = [
  {
    category: 'Service Requests',
    q: 'Can I request a service online?',
    a: 'Yes. You can send a service request through the website and MJN Automotive will contact you to confirm availability, timing and any required details. Online requests are not confirmed bookings until the workshop confirms the appointment.',
  },
  {
    category: 'Servicing & Repairs',
    q: 'Do you provide logbook servicing in South Nowra?',
    a: 'Yes. MJN Automotive provides logbook servicing for many makes and models. The workshop can follow the required service schedule and advise what is due before work begins.',
  },
  {
    category: 'Servicing & Repairs',
    q: 'Can an independent mechanic service my car without affecting warranty?',
    a: 'In many cases, a qualified independent mechanic can complete scheduled servicing using suitable parts and procedures. If your vehicle is under warranty, MJN Automotive can discuss the service requirements before proceeding.',
  },
  {
    category: 'Diagnostics & Safety',
    q: 'What are signs my brakes need attention?',
    a: 'Common signs include squealing, grinding, vibration when braking, a soft brake pedal, the vehicle pulling to one side, or a brake warning light. If you notice these symptoms, the vehicle should be inspected before the issue worsens.',
  },
  {
    category: 'Diagnostics & Safety',
    q: 'Do you diagnose warning lights and fault codes?',
    a: 'Yes. MJN Automotive can inspect warning lights, scan for fault codes and carry out further fault finding where required. A scan code is only a starting point, so the workshop may need to test related components before recommending repairs.',
  },
  {
    category: 'Local Workshop',
    q: 'Do you service customers outside South Nowra?',
    a: 'Yes. MJN Automotive is based in South Nowra and also helps customers from Nowra, Bomaderry, Worrigee, West Nowra, North Nowra and the wider Shoalhaven area.',
  },
  {
    category: 'Servicing & Repairs',
    q: 'Will you contact me before doing extra repair work?',
    a: 'Yes. If additional work is identified, MJN Automotive will explain the issue and seek approval before carrying out extra repairs.',
  },
  {
    category: 'Service Requests',
    q: 'What information should I include in a service request?',
    a: 'Include your name, contact details, vehicle make and model, registration if available, the issue or service required, and preferred timing. This helps the workshop respond with the right information.',
  },
];

/* ─── Shared components ──────────────────────────────── */
function Logo() {
  return (
    <a href="#home" className="flex items-center interactive-lift">
      <img
        src="/images/mjn-automotive-logo.webp"
        alt="MJN Automotive"
        width={420}
        height={210}
        className="h-12 w-auto object-contain"
      />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#EF1D2A]/40 bg-[#EF1D2A]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#EF1D2A]">
          <span className="h-2 w-2 rounded-full bg-[#EF1D2A]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-5 text-lg leading-8 text-slate-400">{text}</p>
      )}
    </div>
  );
}

function ImageCard({
  src,
  alt,
  label,
  width = 1200,
  height = 800,
  loading = 'lazy',
  fetchPriority,
}: {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  return (
    <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50 image-card-lift">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,10,14,0.25)_35%,rgba(8,10,14,0.95)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/70" />
      {label && (
        <div className="absolute bottom-5 left-5 rounded-sm border border-[#EF1D2A]/40 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#EF1D2A] backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`overflow-hidden rounded-xl border transition duration-200 ${
        open
          ? 'border-[#EF1D2A]/40 bg-[#0D1118]'
          : 'border-white/10 bg-white/[0.02] card-lift'
      }`}
    >
      <button
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left interactive-lift"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-base font-bold leading-snug text-white">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 text-[#EF1D2A] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>
      {open && (
        <div className="border-t border-white/10 px-6 pb-6 pt-5">
          <p className="max-w-2xl leading-7 text-slate-400">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Contact form ───────────────────────────────────── */
type FormState = 'idle' | 'submitting' | 'success' | 'error';

function ContactForm() {
  const [fields, setFields] = useState({
    name: '', phone: '', email: '', vehicle: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormState>('idle');
  const [serverError, setServerError] = useState('');

  function validate() {
    const e: Record<string, string> = {};
    if (!fields.name.trim() || fields.name.trim().length < 2)
      e.name = 'Please enter your full name.';
    if (!fields.phone.trim() || !/^[\d\s+\-()\\.]{6,20}$/.test(fields.phone.trim()))
      e.phone = 'Please enter a valid phone number.';
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      e.email = 'Please enter a valid email address.';
    if (!fields.message.trim() || fields.message.trim().length < 10)
      e.message = 'Please describe the service or issue (at least 10 characters).';
    return e;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('submitting');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setFields({ name: '', phone: '', email: '', vehicle: '', message: '' });
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus('error');
        setServerError(data.error || 'Something went wrong. Please try again or call us directly.');
      }
    } catch {
      setStatus('error');
      setServerError('Could not send your message. Please call us on 02 4421 6090.');
    }
  }

  const inputBase =
    'w-full rounded-lg border bg-black/40 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:ring-1 focus-visible:ring-2 focus-visible:ring-[#FFCC1B]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1118]';
  const inputOk = 'border-white/10 focus:border-[#EF1D2A]/60 focus:ring-[#EF1D2A]/30';
  const inputErr = 'border-[#EF1D2A]/70 focus:border-[#EF1D2A] focus:ring-[#EF1D2A]/30';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-[#FFCC1B]/30 bg-[#0D1118] p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFCC1B]/10">
          <CheckCircle2 size={32} className="text-[#FFCC1B]" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Request Sent!</h3>
          <p className="mt-2 text-slate-400">
            Your request has been sent. MJN Automotive will contact you to confirm availability.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="btn-base btn-outline px-6 py-3 text-sm"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-[#0D1118] p-8 md:p-10"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <input
            className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
            placeholder="Your name *"
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-[#EF1D2A]">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <input
            className={`${inputBase} ${errors.phone ? inputErr : inputOk}`}
            placeholder="Phone number *"
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-[#EF1D2A]">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <input
            className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
            placeholder="Email address *"
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-[#EF1D2A]">{errors.email}</p>}
        </div>

        {/* Vehicle — optional */}
        <div className="flex flex-col gap-1">
          <input
            className={`${inputBase} ${inputOk}`}
            placeholder="Vehicle make & model (optional)"
            type="text"
            name="vehicle"
            value={fields.vehicle}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-4 flex flex-col gap-1">
        <textarea
          className={`${inputBase} min-h-[150px] ${errors.message ? inputErr : inputOk}`}
          placeholder="Describe the service or issue *"
          name="message"
          value={fields.message}
          onChange={handleChange}
        />
        {errors.message && <p className="text-xs text-[#EF1D2A]">{errors.message}</p>}
      </div>

      {/* Server error */}
      {serverError && (
        <p className="mt-4 rounded-lg border border-[#EF1D2A]/40 bg-[#EF1D2A]/10 px-4 py-3 text-sm text-[#EF1D2A]">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-base btn-red mt-4 w-full rounded-lg px-8 py-4 text-sm uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Service Request'}
        {status !== 'submitting' && <ChevronRight size={18} />}
      </button>

      <p className="mt-3 text-xs leading-6 text-slate-500">
        Submitting this form sends a service request only. Your booking is not confirmed until MJN Automotive contacts you and confirms a suitable time.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {['Fast response', 'Transparent quoting', 'Local workshop support'].map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-slate-400"
          >
            <CheckCircle2 size={12} className="shrink-0 text-[#FFCC1B]" />
            {label}
          </div>
        ))}
      </div>

      {/* Icon stat strip */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
        {[
          { icon: Phone, label: 'Phone-first service', sub: 'Call for faster service' },
          { icon: Clock, label: 'Mon–Fri 8am–5pm', sub: 'Closed weekends' },
          { icon: Shield, label: 'Licensed Repairer', sub: 'All makes & models' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center card-lift hover:bg-white/[0.04]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EF1D2A]/10">
              <Icon size={17} className="text-[#EF1D2A]" />
            </div>
            <p className="text-xs font-black text-white leading-snug">{label}</p>
            <p className="text-[11px] text-slate-500 leading-snug">{sub}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070A0F] text-white selection:bg-[#EF1D2A] selection:text-white">

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#EF1D2A]/30 bg-[#070A0F]/95 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#FFCC1B]/40 after:to-transparent'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-400 transition hover:text-white interactive-lift"
              >
                {link.name}
              </a>
            ))}
            <a
              href={`tel:${phoneRaw}`}
              className="btn-base border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 hover:border-white/20 hover:text-white"
            >
              <Phone size={14} className="text-[#EF1D2A]" />
              {phone}
            </a>
            <a
              href={`tel:${phoneRaw}`}
              className="btn-base btn-yellow px-5 py-2.5 text-sm"
            >
              Call Workshop
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="interactive-lift flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 md:hidden hover:border-white/25"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#070A0F]/98 px-6 py-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 pb-4 text-base font-bold text-slate-300 hover:text-white interactive-lift"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={`tel:${phoneRaw}`}
                onClick={() => setMenuOpen(false)}
                className="btn-base btn-yellow mt-2 rounded-lg px-6 py-4 text-base"
              >
                <Phone size={18} />
                Call {phone}
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-base btn-outline rounded-lg px-6 py-4 text-base"
              >
                Request a Service
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section
          id="home"
          className="relative min-h-screen overflow-hidden px-6 pb-24 pt-28"
        >
          <div className="absolute inset-0 bg-[#070A0F]" />
          <div className="absolute right-0 top-0 h-full w-[58%]">
            <img
              src="/images/mjn-automotive-south-nowra-workshop-hero.webp"
              alt="MJN Automotive workshop in South Nowra"
              width={1400}
              height={1050}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover grayscale opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F] via-[#070A0F]/55 to-[#070A0F]/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(239,29,42,0.08),transparent_28%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="mb-7 inline-flex items-center gap-3 rounded-sm border border-[#EF1D2A]/40 bg-[#EF1D2A]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#EF1D2A]">
                <span className="h-2 w-2 rounded-full bg-[#EF1D2A]" />
                South Nowra's Trusted Mechanic
              </div>

              {/* Headline */}
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
                Reliable
                <br />
                Mechanical
                <br />
                <span className="italic text-[#FFCC1B]">
                  Repairs &
                  <br />
                  Servicing
                </span>
              </h1>

              {/* Sub copy */}
              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
                Honest advice, quality workmanship, and fair pricing for South
                Nowra drivers. Servicing all makes and models — cars, SUVs,
                utes, 4x4s, and vans.
              </p>

              {/* Trust badges */}
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  { icon: MapPin, text: 'South Nowra NSW' },
                  { icon: Clock, text: 'Mon–Fri 8am–5pm' },
                  { icon: Award, text: 'Licensed Repairer' },
                  { icon: Car, text: 'All Makes & Models' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-sm font-medium text-slate-300"
                  >
                    <Icon size={13} className="text-[#EF1D2A]" />
                    {text}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`tel:${phoneRaw}`}
                  className="btn-base btn-yellow px-8 py-5 text-base"
                >
                  <Phone size={20} />
                  Call {phone}
                </a>
                <a
                  href="#contact"
                  className="btn-base btn-outline px-8 py-5 text-base"
                >
                  Request a Service
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ──────────────────────────────── */}
        <section className="border-y border-white/10 bg-[#080C12] px-6 py-12">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 card-lift hover:bg-white/[0.04]"
                >
                  <Icon
                    className={`${item.accent} transition group-hover:scale-110`}
                    size={28}
                  />
                  <h3 className="mt-5 text-base font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────── */}
        <section id="services" className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Services"
              title="Automotive Services You Can Rely On"
              text="From logbook servicing and rego checks to diagnostics and engine repairs — MJN Automotive covers it all for South Nowra drivers."
              centered
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group flex flex-col rounded-xl border border-white/10 bg-[#0D1118] p-7 shadow-lg shadow-black/20 card-lift hover:bg-[#111722]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#EF1D2A]/25 bg-[#EF1D2A]/10 text-[#EF1D2A]">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-6 text-lg font-black uppercase tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
                      {service.text}
                    </p>
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#FFCC1B] transition-opacity hover:opacity-75 interactive-lift"
                    >
                      Enquire
                      <ChevronRight
                        className="transition-transform group-hover:translate-x-1"
                        size={15}
                      />
                    </a>
                  </article>
                );
              })}
            </div>

            {/* Services CTA */}
            <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-[#0D1118] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-black text-white">
                  Not sure what service you need?
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Call us and we'll help diagnose the problem.
                </p>
              </div>
              <a
                href={`tel:${phoneRaw}`}
                className="btn-base btn-yellow shrink-0 px-6 py-3 text-sm"
              >
                <Phone size={16} />
                Call {phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── ABOUT / EXPERTISE ────────────────────────── */}
        <section id="expertise" className="bg-[#080C12] px-6 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <ImageCard
              src="/images/mjn-automotive-south-nowra-workshop.webp"
              alt="MJN Automotive workshop in South Nowra"
              label="South Nowra Workshop"
              width={1200}
              height={675}
            />

            <div>
              <SectionHeading
                eyebrow="About"
                title="Why Nowra Drivers Choose MJN Automotive"
                text="A practical, no-nonsense local workshop with the diagnostic equipment, experience, and communication to get the job done right."
              />

              <div className="mt-10 space-y-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-4 card-lift"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#FFCC1B]"
                    />
                    <p className="text-base font-semibold text-slate-200">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${phoneRaw}`}
                  className="btn-base btn-yellow px-6 py-3 text-sm"
                >
                  <Phone size={16} />
                  Call the Workshop
                </a>
                <a
                  href="#contact"
                  className="btn-base btn-outline px-6 py-3 text-sm"
                >
                  Send Service Request
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────── */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Process"
              title="Simple, Straightforward Service"
              text="We keep things clear from the moment you call to the moment you pick up your keys."
              centered
            />

            <div className="mt-14 grid gap-5 md:grid-cols-4">
              {[
                ['01', 'Call or Send a Request', 'Phone us on 02 4421 6090 or send a service request through the contact form.'],
                ['02', 'Inspect & Diagnose', 'We assess the vehicle thoroughly and identify the issue.'],
                ["03", "Explain the Work", "We tell you exactly what's needed and the cost — before we start."],
                ["04", "Complete the Repair", "Quality work, quality parts, and you're back on the road."],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  className="rounded-xl border border-white/10 bg-[#0D1118] p-6 card-lift"
                >
                  <div className="mb-6 text-4xl font-black text-[#EF1D2A]/40">
                    {number}
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUPPLIER LOGOS ────────────────────────────── */}
        <section className="border-y border-white/10 bg-[#080C12] px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              Trusted Parts · Trusted Suppliers · Trusted Workmanship
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {suppliers.map(({ name, logo, href, imgClass }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${name} website`}
                  className="supplier-logo-tile group flex h-16 w-40 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 card-lift hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <img
                    src={logo}
                    alt={name}
                    className={imgClass ?? ''}
                    loading="lazy"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = name;
                      span.className = 'text-xs font-black uppercase tracking-widest text-slate-400';
                      t.parentElement?.appendChild(span);
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ──────────────────────────────────── */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Reviews"
              title="Trusted by Local Drivers"
              text="Straightforward communication, reliable repairs, and honest workmanship."
              centered
            />

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="flex flex-col rounded-xl border border-white/10 bg-[#0D1118] p-7 card-lift"
                >
                  {/* Stars */}
                  <div className="flex gap-1 text-[#FFCC1B]">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-5 flex-1 text-base leading-7 text-slate-300">
                    "{review.text}"
                  </p>

                  {/* Attribution */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-sm font-black text-white">
                        {review.name}
                      </p>
                      <p className="text-xs text-slate-500">{review.location}</p>
                    </div>
                    <div className="rounded-full border border-[#FFCC1B]/20 bg-[#FFCC1B]/5 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#FFCC1B]">
                      Google
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <section id="faq" className="bg-[#080C12] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Common Questions"
              text="Answers to what Nowra drivers ask us most often."
              centered
            />

            <div className="mt-14 space-y-2">
              {faqs.map((faq, i) => (
                <div key={faq.q}>
                  <FAQItem question={faq.q} answer={faq.a} />
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <p className="text-base font-bold text-white">
                Have a different question?
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Give us a call — we're happy to help.
              </p>
              <a
                href={`tel:${phoneRaw}`}
                className="mt-5 btn-base btn-yellow px-6 py-3 text-sm"
              >
                <Phone size={16} />
                Call {phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1118] p-8 shadow-2xl shadow-black/40 md:grid-cols-2 md:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,rgba(239,29,42,0.15),transparent_40%)]" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#EF1D2A]/40 bg-[#EF1D2A]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#EF1D2A]">
                <span className="h-2 w-2 rounded-full bg-[#EF1D2A]" />
                Request Service
              </div>
              <h2 className="text-4xl font-black uppercase leading-tight text-white md:text-5xl">
                Need a Service,
                <br />
                Rego Check
                <br />
                or Repair?
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                Call MJN Automotive today. Honest advice, quality workmanship,
                and a local workshop you can trust.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`tel:${phoneRaw}`}
                  className="btn-base btn-yellow px-8 py-5 text-base"
                >
                  <Phone size={20} />
                  Call {phone}
                </a>
                <a
                  href="#contact"
                  className="btn-base btn-outline px-8 py-5 text-base"
                >
                  Request Online
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>

            <ImageCard
              src="/images/classic-car-servicing-south-nowra.webp"
              alt="Classic car serviced by MJN Automotive in South Nowra"
              label="South Nowra HQ"
              width={1200}
              height={800}
            />
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────── */}
        <section id="contact" className="bg-[#080C12] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Contact"
              title="Service Requests & Enquiries"
              text="Send your service request and the workshop will contact you to confirm availability, timing and any required details."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Contact form */}
              <ContactForm />

              {/* Contact info */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-[#0D1118] p-8">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Workshop Operations
                  </h3>

                  <div className="mt-7 space-y-6">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 transition hover:opacity-80 interactive-lift"
                    >
                      <MapPin
                        className="mt-0.5 shrink-0 text-[#EF1D2A]"
                        size={18}
                      />
                      <p className="text-sm leading-6 text-slate-400 underline-offset-2 hover:underline">
                        {address}
                      </p>
                    </a>

                    <a
                      href={`tel:${phoneRaw}`}
                      className="flex items-center gap-4 transition hover:opacity-80 interactive-lift"
                    >
                      <Phone className="shrink-0 text-[#EF1D2A]" size={18} />
                      <p className="text-sm font-bold text-slate-300">
                        {phone}
                      </p>
                    </a>

                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-4 transition hover:opacity-80 interactive-lift"
                    >
                      <Mail className="shrink-0 text-[#EF1D2A]" size={18} />
                      <p className="text-sm text-slate-400 underline-offset-2 hover:underline">
                        {email}
                      </p>
                    </a>

                    <div className="flex items-start gap-4">
                      <Clock
                        className="mt-0.5 shrink-0 text-[#EF1D2A]"
                        size={18}
                      />
                      <div className="text-sm leading-7 text-slate-400">
                        <p>
                          <span className="font-semibold text-slate-300">
                            Mon – Fri:
                          </span>{' '}
                          8:00 AM – 5:00 PM
                        </p>
                        <p>
                          <span className="font-semibold text-slate-300">
                            Sat – Sun:
                          </span>{' '}
                          Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${phoneRaw}`}
                    className="btn-base btn-yellow mt-8 w-full rounded-lg py-3.5 text-sm"
                  >
                    <Phone size={16} />
                    Call the Workshop - {phone}
                  </a>
                </div>

                <ImageCard
                  src="/images/mjn-automotive-workshop-interior.webp"
                  alt="Mechanic servicing a vehicle at MJN Automotive"
                  label="South Nowra HQ"
                  width={1000}
                  height={774}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#040608] px-6 pt-16 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand col */}
            <div className="md:col-span-1">
              <Logo />
              <p className="mt-5 text-sm leading-7 text-slate-500">
                Practical, honest automotive repairs and servicing for South
                Nowra and the Shoalhaven region.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-500">
                  Licensed Motor Vehicle Repairer
                </div>
              </div>
            </div>

            {/* Nav col */}
            <div>
              <h4 className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-[#EF1D2A]">
                Navigation
              </h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="footer-link block text-sm text-slate-500"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#faq"
                  className="footer-link block text-sm text-slate-500"
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Services col */}
            <div>
              <h4 className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-[#EF1D2A]">
                Services
              </h4>
              <div className="space-y-3 text-sm text-slate-500">
                <p>Logbook Servicing</p>
                <p>Rego Checks & Pink Slips</p>
                <p>Brake & Clutch Repairs</p>
                <p>Diagnostics</p>
                <p>Pre-Purchase Inspections</p>
                <p>4x4, Ute & Van Servicing</p>
              </div>
            </div>

            {/* Contact col */}
            <div>
              <h4 className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-[#EF1D2A]">
                Contact
              </h4>
              <div className="space-y-3 text-sm">
                <a
                  href={`tel:${phoneRaw}`}
                  className="footer-link block font-bold text-slate-300"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="footer-link block text-slate-500"
                >
                  {email}
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link block text-slate-500"
                >
                  {address}
                </a>
                <p className="text-slate-500">Mon–Fri, 8am–5pm</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} MJN Automotive. All rights reserved.
              South Nowra, NSW.
            </p>
            <p className="text-xs text-slate-600">
              Website by{' '}
              <a
                href="https://fixedit.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-subtle underline-offset-4 hover:text-slate-400 hover:underline"
              >
                FixedIT
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
