import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/* ===== MODAL ===== */
function LeadModal({ open, onClose, title = 'Узнать цену' }: { open: boolean; onClose: () => void; title?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) { setSent(false); setName(''); setPhone(''); }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 900);
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,12,18,0.82)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn .2s ease'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#252b37',
          borderRadius: 8,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 420,
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          animation: 'slideUp .25s ease',
          fontFamily: "'Inter','Pragmatica',sans-serif"
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}
          aria-label="Закрыть"
        >×</button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Заявка принята!</h3>
            <p style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Наш менеджер свяжется с вами в ближайшее время
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#c0392b', textTransform: 'uppercase', marginBottom: 10 }}>
              Спецпредложение
            </p>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>{title}</h3>
            <p style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.50)', marginBottom: 28, lineHeight: 1.6 }}>
              Оставьте контакты — менеджер перезвонит и назовёт лучшую цену
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                placeholder="Ваше имя"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 4,
                  padding: '14px 16px',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 4,
                  padding: '14px 16px',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#c0392b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 3,
                  padding: '16px',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'wait' : 'pointer',
                  fontFamily: 'inherit',
                  marginTop: 4,
                  opacity: loading ? 0.7 : 1,
                  transition: 'opacity .2s'
                }}
              >
                {loading ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </form>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}

const bannerImages = [
  'https://cdn.poehali.dev/files/6ad9b5d5-f633-448d-8dc0-725ef751e0c2.png',
  'https://cdn.poehali.dev/files/086da4a9-d125-4cb5-aa1d-31490bc0bb1b.jpg',
  'https://cdn.poehali.dev/files/0aaeb6d4-deb7-4b8d-98a6-6702d654672a.jpg',
];

function useCountdown(targetDate: Date) {
  const getTime = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; title: string }>({ open: false, title: 'Узнать цену' });
  const countdown = useCountdown(target);

  const openModal = (title = 'Узнать цену') => setModal({ open: true, title });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'Pragmatica', -apple-system, sans-serif" }}>
      <LeadModal open={modal.open} onClose={closeModal} title={modal.title} />
      {/* ===== HEADER ===== */}
      <header
        style={{ background: 'rgba(37,43,55,0.97)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img
            src="https://cdn.poehali.dev/files/62eafc2a-cb33-45f7-bed9-b705e1b3679d.png"
            alt="LADA"
            className="h-8 w-auto"
          />
          <nav className="hidden md:flex items-center gap-10">
            {['Модели', 'Преимущества', 'GRANTA'].map((item, i) => (
              <a
                key={item}
                href={['#hero', '#advantages', '#granta'][i]}
                style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', textDecoration: 'none', transition: 'color .2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="tel:+78001234567"
            style={{ background: '#c0392b', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', padding: '10px 22px', borderRadius: 2, color: '#fff', textDecoration: 'none', transition: 'opacity .2s' }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          >
            8 800 123-45-67
          </a>
        </div>
      </header>

      {/* ===== HERO BANNER ===== */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          {bannerImages.map((src, index) => (
            <div
              key={src}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000 ease-in-out',
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(20,24,32,0.94) 0%, rgba(20,24,32,0.72) 50%, rgba(20,24,32,0.15) 100%)' }}
        />

        <div className="relative z-10 flex h-full items-end" style={{ paddingBottom: 96, paddingTop: 80 }}>
          <div className="container mx-auto px-6 md:px-14">
            <div
              className={cn(
                'max-w-2xl transform transition-all duration-1000 ease-out',
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
            >
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', background: '#c0392b', padding: '5px 14px', borderRadius: 2, marginBottom: 22 }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: '#fff', textTransform: 'uppercase' }}>
                  Только 3 дня
                </span>
              </div>

              {/* H1 */}
              <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', color: '#fff', marginBottom: 14 }}>
                СПЕЦ. ЦЕНА<br />
                <span style={{ color: '#c0392b' }}>НА ВСЕ МОДЕЛИ</span> LADA
              </h1>

              {/* Sub */}
              <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 300, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.01em', marginBottom: 36 }}>
                Выгода для Вас до{' '}
                <span style={{ fontWeight: 800, color: '#f6c90e' }}>500 000 ₽</span>
              </p>

              {/* Countdown */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
                {[
                  { label: 'Дней', value: countdown.days },
                  { label: 'Часов', value: countdown.hours },
                  { label: 'Минут', value: countdown.minutes },
                  { label: 'Секунд', value: countdown.seconds },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 4,
                      padding: '10px 16px',
                      minWidth: 66,
                      backdropFilter: 'blur(8px)'
                    }}>
                      <span style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
                        {String(value).padStart(2, '0')}
                      </span>
                    </div>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.40)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openModal('Узнать цену на LADA')}
                style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 3, padding: '17px 52px', fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .2s' }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.86')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                Узнать цену
              </button>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                height: 2,
                width: currentIndex === index ? 40 : 20,
                background: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.30)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all .3s',
                borderRadius: 1,
                padding: 0
              }}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section id="advantages" style={{ background: '#252b37', padding: '96px 0' }}>
        <div className="container mx-auto px-6">
          <div className="text-center" style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#c0392b', textTransform: 'uppercase', marginBottom: 12 }}>
              Наши преимущества
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Почему выбирают LADA
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            style={{ gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}
          >
            {[
              { num: '01', title: 'Гарантия до 6 лет', desc: 'или до 180 000 км пробега', icon: '🛡️' },
              { num: '02', title: 'Взнос от 0%', desc: 'Первоначальный взнос от нуля', icon: '💳' },
              { num: '03', title: 'Технологии Volvo', desc: 'Разработаны по мировым стандартам', icon: '⚙️' },
              { num: '04', title: 'Выгода Trade-in', desc: 'Сдайте старый — получите скидку', icon: '🔄' },
            ].map((item) => (
              <div
                key={item.num}
                style={{ background: '#252b37', padding: '40px 28px', transition: 'background .25s', cursor: 'default' }}
                onMouseOver={e => (e.currentTarget.style.background = '#2e3546')}
                onMouseOut={e => (e.currentTarget.style.background = '#252b37')}
              >
                <p style={{ fontSize: 11, fontWeight: 700, color: '#c0392b', letterSpacing: '0.1em', marginBottom: 18 }}>{item.num}</p>
                <div style={{ fontSize: 30, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.46)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GRANTA CARD ===== */}
      <section id="granta" style={{ background: '#1e2330', padding: '96px 0' }}>
        <div className="container mx-auto px-6">
          <div className="text-center" style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#c0392b', textTransform: 'uppercase', marginBottom: 12 }}>
              Спецпредложение
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>
              LADA GRANTA
            </h2>
          </div>

          <div
            className="max-w-5xl mx-auto grid md:grid-cols-2"
            style={{ background: '#252b37', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <GrantaGallery />

            {/* UTP + Buttons */}
            <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 22 }}>
                Условия акции
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {[
                  { label: 'Выгода', value: 'до 500 000 ₽', accent: true },
                  { label: 'Первоначальный взнос', value: 'от 0%', accent: false },
                  { label: 'Подарок', value: '4 ТО в подарок', accent: false },
                  { label: 'Кредит', value: 'под 4,7% годовых', accent: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '13px 16px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: 4,
                      borderLeft: item.accent ? '3px solid #c0392b' : '3px solid rgba(255,255,255,0.10)'
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.52)' }}>{item.label}</span>
                    <span style={{ fontSize: 15, fontWeight: item.accent ? 800 : 600, color: item.accent ? '#f6c90e' : '#fff' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { text: 'Записаться на пробную поездку', bg: '#c0392b', color: '#fff', weight: 700, modal: 'Запись на тест-драйв LADA GRANTA' },
                  { text: 'Подобрать комплектацию', bg: 'transparent', color: '#fff', weight: 600, border: '1px solid rgba(255,255,255,0.25)', modal: 'Подобрать комплектацию LADA GRANTA' },
                  { text: 'Узнать цену по акции', bg: '#f6c90e', color: '#1a1a1a', weight: 800, modal: 'Узнать цену по акции' },
                ].map((btn) => (
                  <button
                    key={btn.text}
                    onClick={() => openModal(btn.modal)}
                    style={{
                      background: btn.bg,
                      color: btn.color,
                      border: btn.border || 'none',
                      borderRadius: 3,
                      padding: '15px 20px',
                      fontSize: 12,
                      fontWeight: btn.weight,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'opacity .2s'
                    }}
                    onMouseOver={e => (e.currentTarget.style.opacity = '0.82')}
                    onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#141820', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '28px 0' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://cdn.poehali.dev/files/f0fa596a-18a9-4fac-a9b2-96c2632b67a4.png"
            alt="LADA"
            style={{ height: 28, width: 'auto', opacity: 0.55 }}
          />
          <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>
            © 2024 LADA / АВТОВАЗ. Официальный дилер. Все права защищены.
          </p>
          <a
            href="https://www.lada.ru"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.28)', textDecoration: 'none', transition: 'color .2s' }}
            onMouseOver={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.60)')}
            onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
          >
            lada.ru
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ===== GRANTA GALLERY ===== */
const carColors = [
  { name: 'Красный', hex: '#c0392b', img: 'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/7dc81f6c-b1a4-41fb-af00-802b118c9c05.jpg' },
  { name: 'Белый', hex: '#d8dde6', img: 'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/bfbaca38-cd17-47d1-83ec-3cdbfc5ed514.jpg' },
  { name: 'Синий', hex: '#2a5fa8', img: 'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/5be70090-8941-45ff-8678-7217bd3ced7e.jpg' },
];

function GrantaGallery() {
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div style={{ background: '#1a2030', padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Main image */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 6, background: '#141820', height: 220 }}>
        {carColors.map((c, i) => (
          <img
            key={i}
            src={c.img}
            alt={`LADA Granta ${c.name}`}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: activeColor === i ? 1 : 0,
              transition: 'opacity .5s ease'
            }}
          />
        ))}
      </div>

      {/* Color picker */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', marginBottom: 10 }}>
          Выберите цвет
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {carColors.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveColor(i)}
              title={c.name}
              style={{
                width: 24, height: 24,
                borderRadius: '50%',
                background: c.hex,
                border: activeColor === i ? '2px solid #fff' : '2px solid rgba(255,255,255,0.12)',
                transform: activeColor === i ? 'scale(1.22)' : 'scale(1)',
                transition: 'all .2s',
                cursor: 'pointer',
                outline: 'none'
              }}
            />
          ))}
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.50)', marginLeft: 8 }}>
            {carColors[activeColor].name}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', marginBottom: 10 }}>
          Фото
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          {carColors.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveColor(i)}
              style={{
                flex: 1, height: 58,
                borderRadius: 4,
                overflow: 'hidden',
                border: activeColor === i ? '2px solid #c0392b' : '2px solid rgba(255,255,255,0.07)',
                transition: 'border-color .2s',
                padding: 0,
                cursor: 'pointer',
                background: 'none'
              }}
            >
              <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}