import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const bannerImages = [
  'https://cdn.poehali.dev/files/6ad9b5d5-f633-448d-8dc0-725ef751e0c2.png',
  'https://cdn.poehali.dev/files/086da4a9-d125-4cb5-aa1d-31490bc0bb1b.jpg',
  'https://cdn.poehali.dev/files/0aaeb6d4-deb7-4b8d-98a6-6702d654672a.jpg',
];

const LADA_GRAY = '#4a5568';
const LADA_RED = '#e53e3e';

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
  const countdown = useCountdown(target);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2d3748]/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/files/f0fa596a-18a9-4fac-a9b2-96c2632b67a4.png"
              alt="LADA"
              className="h-10 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            <a href="#hero" className="hover:text-white transition-colors">Модели</a>
            <a href="#advantages" className="hover:text-white transition-colors">Преимущества</a>
            <a href="#granta" className="hover:text-white transition-colors">GRANTA</a>
          </nav>
          <a
            href="tel:+78001234567"
            className="text-white font-semibold text-sm bg-[#e53e3e] hover:bg-[#c53030] px-5 py-2 rounded transition-colors"
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

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

        <div className="relative z-10 flex h-full items-center pt-16">
          <div className="container mx-auto px-6 md:px-12">
            <div
              className={cn(
                'max-w-2xl transform transition-all duration-1000 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              )}
            >
              <div className="inline-block bg-[#e53e3e] text-white text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-widest">
                Только 3 дня
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                СПЕЦ. ЦЕНА<br />
                <span className="text-[#e53e3e]">на все модели</span> LADA!
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
                Выгода для Вас до <span className="text-yellow-400 font-bold">500 000 ₽</span>
              </p>

              {/* Countdown */}
              <div className="flex gap-4 mb-10">
                {[
                  { label: 'Дней', value: countdown.days },
                  { label: 'Часов', value: countdown.hours },
                  { label: 'Минут', value: countdown.minutes },
                  { label: 'Секунд', value: countdown.seconds },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 min-w-[64px]">
                      <span className="text-3xl font-bold text-white tabular-nums">
                        {String(value).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>

              <button className="bg-[#e53e3e] hover:bg-[#c53030] text-white font-bold text-lg px-10 py-4 rounded-lg transition-all hover:scale-105 shadow-2xl">
                Узнать цену
              </button>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-1 transition-all duration-300 rounded-full',
                currentIndex === index ? 'w-10 bg-white' : 'w-6 bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section id="advantages" className="py-20 bg-[#1a202c]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Почему выбирают LADA
          </h2>
          <p className="text-white/50 text-center mb-14 text-lg">Наши преимущества для вас</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🛡️',
                title: 'Гарантия до 6 лет',
                desc: 'или до 180 000 км пробега — выбирайте, что наступит позже',
              },
              {
                icon: '💳',
                title: 'Взнос от 0%',
                desc: 'Первоначальный взнос от нуля — садитесь за руль уже сегодня',
              },
              {
                icon: '🏎️',
                title: 'Технологии Volvo',
                desc: 'Автомобили разработаны с применением технологий мирового класса',
              },
              {
                icon: '🔄',
                title: 'Выгода по Trade-in',
                desc: 'Сдайте старый автомобиль и получите максимальную скидку на новый',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-[#2d3748] hover:bg-[#3a4a63] border border-white/10 hover:border-[#e53e3e]/40 rounded-2xl p-8 transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GRANTA CARD ===== */}
      <section id="granta" className="py-20 bg-[#232936]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            LADA GRANTA
          </h2>
          <p className="text-white/50 text-center mb-14 text-lg">Спецпредложение ограничено</p>

          <div className="max-w-5xl mx-auto bg-[#2d3748] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Car image + color switcher + slider */}
              <GrantaGallery />

              {/* Right: UTP + buttons */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="space-y-4 mb-8">
                  {[
                    { icon: '💰', text: 'Выгода до 500 000 ₽' },
                    { icon: '💳', text: 'Первоначальный взнос от 0%' },
                    { icon: '🎁', text: 'Подарки: 4 ТО в подарок' },
                    { icon: '📊', text: 'В кредит под 4,7% годовых' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#1a202c] rounded-xl px-5 py-4 border border-white/5">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-[#e53e3e] hover:bg-[#c53030] text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] text-sm">
                    Записаться на пробную поездку
                  </button>
                  <button className="w-full bg-transparent border-2 border-white/30 hover:border-white text-white font-semibold py-4 px-6 rounded-xl transition-all text-sm">
                    Подобрать комплектацию
                  </button>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] text-sm">
                    Узнать цену по акции
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a202c] border-t border-white/10 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://cdn.poehali.dev/files/f0fa596a-18a9-4fac-a9b2-96c2632b67a4.png"
            alt="LADA"
            className="h-8 w-auto opacity-70"
          />
          <p className="text-white/40 text-sm text-center">
            © 2024 LADA. Официальный дилер. Все права защищены.
          </p>
          <a href="https://www.lada.ru" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 text-sm transition-colors">
            lada.ru
          </a>
        </div>
      </footer>
    </>
  );
}

const carColors = [
  { name: 'Красный', hex: '#e53e3e', img: 'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/7dc81f6c-b1a4-41fb-af00-802b118c9c05.jpg' },
  { name: 'Белый', hex: '#e2e8f0', img: 'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/bfbaca38-cd17-47d1-83ec-3cdbfc5ed514.jpg' },
  { name: 'Синий', hex: '#3182ce', img: 'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/5be70090-8941-45ff-8678-7217bd3ced7e.jpg' },
];

const sliderImages = [
  'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/7dc81f6c-b1a4-41fb-af00-802b118c9c05.jpg',
  'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/bfbaca38-cd17-47d1-83ec-3cdbfc5ed514.jpg',
  'https://cdn.poehali.dev/projects/2b474f09-9a21-4d1a-911c-9a3e56e7256b/files/5be70090-8941-45ff-8678-7217bd3ced7e.jpg',
];

function GrantaGallery() {
  const [activeColor, setActiveColor] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleColor = (i: number) => {
    setActiveColor(i);
    setActiveSlide(i);
  };

  return (
    <div className="bg-[#1a202c] p-8 flex flex-col gap-6">
      {/* Main car image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#232936] h-56 flex items-center justify-center">
        {carColors.map((c, i) => (
          <img
            key={i}
            src={c.img}
            alt={`LADA Granta ${c.name}`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              activeColor === i ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </div>

      {/* Color switcher */}
      <div>
        <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Выберите цвет</p>
        <div className="flex gap-3">
          {carColors.map((c, i) => (
            <button
              key={i}
              onClick={() => handleColor(i)}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all duration-200',
                activeColor === i ? 'border-white scale-110' : 'border-white/20 hover:border-white/60'
              )}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
          <span className="text-white/60 text-sm self-center ml-2">{carColors[activeColor].name}</span>
        </div>
      </div>

      {/* Slider thumbnails */}
      <div>
        <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Фотографии</p>
        <div className="flex gap-2">
          {sliderImages.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActiveSlide(i); setActiveColor(i); }}
              className={cn(
                'flex-1 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200',
                activeSlide === i ? 'border-[#e53e3e]' : 'border-white/10 hover:border-white/30'
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
