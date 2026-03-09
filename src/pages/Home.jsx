import React from "react";
import img3 from "../assets/img3.svg";
import img4 from "../assets/img4.svg";
import img5 from "../assets/img5.svg";
import img6 from "../assets/img6.svg";
import img7 from "../assets/img7.svg";
import img8 from "../assets/img8.svg";
import img9 from "../assets/img9.svg";
import img10 from "../assets/img10.svg";
import img11 from "../assets/img11.svg";
import img12 from "../assets/img12.svg";
import img13 from "../assets/img13.svg";
import img14 from "../assets/img14.svg";
import img15 from "../assets/img15.svg";
import img16 from "../assets/img16.svg";
import img17 from "../assets/img17.svg";
import img18 from "../assets/img18.svg";
import img19 from "../assets/img19.svg";
import img21 from "../assets/img21.svg";
import Ratsion from "../components/Ratsion";

const Home = () => {
  return (
    <div className="page-bg">

      {/* Hero */}
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-[100px] py-8 md:py-[80px]">
        <div className="flex flex-col gap-10 md:gap-[60px]">
          <h1 className="font-bold text-[28px] md:text-[50px] text-center md:text-left leading-tight">
            Доставка прогрессивного<br /> питания для гурманов
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-[20px]">
            <button className="btn-accent py-[12px] px-[28px] rounded-[35px] font-semibold">
              Подобрать питание
            </button>
            <button className="btn-accent-outline py-[12px] px-[28px] rounded-[35px] font-semibold">
              Получить консультацию
            </button>
          </div>
        </div>
        <img src={img3} alt="" className="max-w-[400px] md:max-w-none mt-6 md:mt-0" />
      </section>

      {/* About */}
      <section className="px-4 md:px-[100px] py-[40px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center pb-[40px] gap-6 md:gap-0">
          <img src={img4} alt="" className="w-[300px] md:w-[400px]" />
          <div className="w-full md:w-[700px]">
            <h2 className="font-bold text-[26px] md:text-[40px] mb-4">Еда, которая сделает тебя лучше!</h2>
            <p className="text-[16px] md:text-[20px] text-muted leading-relaxed">
              Мы помогаем создавать новое качество жизни для наших клиентов, чтоб каждый человек был счастливым, здоровым и не отвлекался на рутинные процессы.
              Для этого мы создали новый уникальный продукт на рынке доставки еды и приглашаем вас окунуться в гастрономический шик уже сегодня.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6 md:gap-0">
          <img src={img5} alt="" className="w-[300px] md:w-[400px]" />
          <div className="w-full md:w-[700px]">
            <h2 className="font-bold text-[26px] md:text-[40px] mb-4">Изысканное меню высокой кухни</h2>
            <p className="text-[16px] md:text-[20px] text-muted leading-relaxed">
              В наших блюдах мы продумали каждую деталь, все ингредиенты тщательно подобраны и создают неповторимый вкус.
              Качественные продукты, деликатесы и суперфуды, которые помогают поддерживать здоровье и обмен веществ.
            </p>
          </div>
        </div>
      </section>

      {/* Ratsion Calculator */}
      <Ratsion />

      {/* Premium Bowl */}
      <section className="px-4 md:px-[100px] py-[60px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-[20px]">
          <h2 className="text-[28px] md:text-[40px] font-bold">Программа ПремиумБоул</h2>
          <div className="flex items-center gap-[12px] card px-4 py-2 rounded-full" style={{ border: "1px solid var(--card-border)" }}>
            <img src={img6} alt="" className="w-[24px] h-[24px]" />
            <p className="text-sm">Каждый день новое меню</p>
          </div>
        </div>

        <p className="py-[16px] font-semibold text-muted">Калорийность</p>
        <div className="flex flex-wrap gap-3 md:justify-between pb-[40px]">
          {[
            { label: "900 ккал", sub: "3 блюда" },
            { label: "1 250 ккал", sub: "4 блюда", active: true },
            { label: "1 600 ккал", sub: "5 блюд" },
            { label: "2 050 ккал", sub: "6 блюд" },
            { label: "индивидуально", sub: "подобрать" },
          ].map((item) => (
            <div
              key={item.label}
              className={`py-[20px] px-[30px] md:px-[70px] w-fit rounded-2xl flex flex-col items-center ${item.active ? "accent-light-bg" : "card"}`}
              style={!item.active ? { border: "1px solid var(--card-border)" } : {}}
            >
              <p className="font-bold text-[20px]">{item.label}</p>
              <p className="text-muted text-sm">{item.sub}</p>
            </div>
          ))}
        </div>

        <p className="pb-[16px] font-semibold text-muted">Продолжительность</p>
        <div className="flex flex-wrap gap-3 md:justify-between pb-[40px]">
          {[
            { label: "Пробные 2 дня", sub: "за 2 900 ₽" },
            { label: "1 неделя", sub: "1 700 ₽ в день" },
            { label: "2 недели", sub: "1 600 ₽ в день", active: true },
            { label: "3 недели", sub: "1 520 ₽ в день" },
            { label: "4 недели", sub: "1 450 ₽ в день" },
          ].map((item) => (
            <div
              key={item.label}
              className={`py-[20px] px-[25px] md:px-[50px] w-fit rounded-2xl flex flex-col items-center ${item.active ? "accent-light-bg" : "card"}`}
              style={!item.active ? { border: "1px solid var(--card-border)" } : {}}
            >
              <p className="font-bold text-[20px]">{item.label}</p>
              <p className="text-muted text-sm">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[30px] pb-[40px]">
          <p className="text-[14px] text-muted max-w-[160px]">Выберите, сколько дней в неделю вы хотите питаться</p>
          <div className="flex gap-[10px]">
            <button className="w-[38px] h-[38px] rounded-full accent-light-bg text-[15px] font-medium">5</button>
            <button className="card w-[38px] h-[38px] rounded-full text-[15px]" style={{ border: "1px solid var(--card-border)" }}>6</button>
            <button className="card w-[38px] h-[38px] rounded-full text-[15px]" style={{ border: "1px solid var(--card-border)" }}>7</button>
          </div>
        </div>

        <p className="font-bold text-[24px] pb-[8px]">Пример дневного рациона</p>
        <p className="accent-text text-[14px] pb-[20px]">
          6 блюд. Калорийность — 1 235 ккал. Белки — 103 г; жиры — 37 г; углеводы — 120 г
        </p>

        <div className="flex flex-wrap gap-[10px] pb-[32px]">
          {["понедельник", "вторник", "четверг", "пятница", "суббота", "воскресенье"].map((day) => (
            <button
              key={day}
              className={`px-[20px] py-[10px] rounded-full text-[15px] ${day === "пятница" ? "accent-light-bg font-semibold" : "card"}`}
              style={{ border: day === "пятница" ? "none" : "1px solid var(--card-border)" }}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-[24px] pb-[40px]">
          {[
            { img: img7, time: "Завтрак • 230/250 гр", desc: "Утренний боул с перепелиным яйцом, киноа и лососем" },
            { img: img8, time: "Обед • 320/30 гр", desc: "Боул с куриными фрикадельками в кунжуте, брокколи и миндальным соусом" },
            { img: img9, time: "Полдник • 50/30 гр", desc: "Кукурузные блинчики с кокосовым припеком и фруктовым тар-таром" },
            { img: img10, time: "Ужин • 100/100 гр", desc: "Морепродукты в соусе Гарсиа со стручковой фасолью" },
          ].map((meal) => (
            <div key={meal.time} className="flex flex-col gap-[10px] flex-1">
              <img src={meal.img} alt="" className="w-full rounded-2xl" />
              <p className="text-[12px] accent-text font-semibold">{meal.time}</p>
              <p className="text-[15px]">{meal.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-[20px] px-[20px] md:px-[32px] py-[28px] gap-6 md:gap-0" style={{ backgroundColor: "#8FAF8A" }}>
          <div className="flex flex-col gap-[10px]">
            <button className="card accent-text font-semibold text-[15px] px-[24px] py-[14px] rounded-full w-fit">
              Заказать 10 дней питания за 16 000 ₽
            </button>
            <p className="text-white text-[13px] opacity-90">1 250 ккал за 1 600 ₽ в день</p>
          </div>
          <div className="flex items-center gap-[24px]">
            <img src={img11} alt="" className="w-[64px] h-[64px] rounded-xl" />
            <div className="text-white w-full md:w-[600px]">
              <p className="font-semibold text-[16px] mb-[6px]">Будем доставлять наборы каждый день.</p>
              <p className="text-[13px] opacity-80">Доставка осуществляется каждый день с 06:00 до 12:00. Выбор интервала — 2 часа.</p>
              <p className="text-[13px] opacity-80">Заявки принимаются не позднее, чем за день до предполагаемой доставки.</p>
            </div>
          </div>
        </div>
      </section>

      {/* О нашем сервисе */}
      <section className="px-4 md:px-[100px] py-[60px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <h2 className="font-bold text-[28px] md:text-[40px] mb-[50px]">О нашем сервисе</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[40px] gap-y-[50px]">
          {[
            { img: img12, title: "Деликатные технологии приготовления блюд", desc: "Сухой гриль без прямого контакта продукта с жарочной поверхностью, запекание, су-вид" },
            { img: img13, title: "Меню из 90 блюд на две недели без повтора", desc: "Сбалансированные блюда, содержащие в себе все необходимые элементы за счёт большого количества компонентов" },
            { img: img14, title: "Здоровые рецепты", desc: "Без молочки, белой муки, сахара, консервантов, усилителей вкуса и глубокой прожарки" },
            { img: img15, title: "Гарантия возврата", desc: "100%-ная гарантия возврата денежных средств за предоплаченные дни, если что-то не понравилось в течение первой недели" },
            { img: img16, title: "Контроль температуры", desc: "Все курьеры оснащены сумками-холодильниками, что позволяет сохранять температурный режим от 2°С до 4°С" },
            { img: img17, title: "Забота о природе", desc: "Все блюда доставляем в экоупаковке из крафтового картона со столовыми приборами из кукурузного крахмала" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-[14px]">
              <div className="card w-fit p-3 rounded-2xl" style={{ border: "1px solid var(--card-border)" }}>
                <img src={item.img} alt="" className="w-[44px] h-[44px]" />
              </div>
              <p className="font-bold text-[18px] leading-snug">{item.title}</p>
              <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Боулы */}
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-[100px] py-[60px] gap-[40px] md:gap-[60px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="flex flex-col gap-[20px] w-full md:w-[600px]">
          <h2 className="font-bold text-[20px] md:text-[24px] accent-text leading-snug">
            Попробуйте новый формат рационов — Боулы!<br />
            Это богатый набор полезных веществ и масса вкусовых впечатлений!
          </h2>
          <p className="text-[15px] text-muted leading-relaxed">
            Боулы — это сбалансированный вариант блюда, содержащего в себе все необходимые элементы за счёт большого количества компонентов. Ингредиенты блюда не смешиваются между собой, а не спеша поедаются по отдельности.
          </p>
          <p className="text-[15px] text-muted leading-relaxed">
            Мы готовим полноценное здоровое питание на день и ежедневно доставляем утром к вашим дверям.
          </p>
          <p className="text-[15px] text-muted leading-relaxed">
            Наш сервис помогает экономить время, поддерживать стройность, работоспособность и укреплять здоровье.
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <button className="card w-[44px] h-[44px] rounded-full flex items-center justify-center text-[18px]" style={{ border: "1px solid var(--card-border)" }}>←</button>
          <img src={img18} alt="" className="w-full max-w-[300px] md:max-w-none rounded-2xl" />
          <button className="card w-[44px] h-[44px] rounded-full flex items-center justify-center text-[18px]" style={{ border: "1px solid var(--card-border)" }}>→</button>
        </div>
      </section>

      {/* Карта доставки */}
      <section className="px-4 md:px-[100px] py-[60px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <h2 className="text-[28px] md:text-[40px] font-bold">Карта доставки</h2>
        <p className="text-[16px] md:text-[20px] text-muted leading-relaxed py-[15px]">
          Доставка осуществляется каждый день с 06:00 до 12:00.<br />Выбор интервала — 2 часа.
        </p>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="card p-4 rounded-[24px]" style={{ border: "1px solid var(--card-border)" }}>
            <img src={img19} alt="" className="w-full md:w-auto rounded-xl" />
          </div>
          <div className="flex flex-col gap-[20px] justify-center">
            <span className="px-[24px] py-[10px] rounded-[30px]" style={{ border: "2px solid #ef4444" }}>По городу бесплатно</span>
            <span className="px-[24px] py-[10px] rounded-[30px]" style={{ border: "2px solid #4ade80" }}>Пригород 25 км — 100 ₽</span>
            <span className="px-[24px] py-[10px] rounded-[30px]" style={{ border: "2px solid #2563eb" }}>Пригород 35 км — 300 ₽</span>
            <span className="px-[24px] py-[10px] rounded-[30px]" style={{ border: "2px solid #facc15" }}>Пригород 50 км — 500 ₽</span>
            <p className="text-muted text-[15px]">Уточните стоимость и время доставки</p>
            <h3 className="font-bold text-[25px]">+7 988 500-1-700</h3>
            <p className="text-muted text-[15px]">c 09:00 до 21:00</p>
            <button className="btn-accent py-[12px] px-[30px] rounded-[30px] hover:opacity-90 w-fit">Перезвоните мне</button>
          </div>
        </div>
      </section>

      {/* Частые вопросы */}
      <section className="px-4 md:px-[100px] py-[60px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <h2 className="text-[28px] md:text-[40px] font-bold mb-[28px]">Частые вопросы</h2>
        <div className="flex flex-wrap gap-[10px] mb-[32px]">
          {["Продукты", "Программы", "Оплата и доставка", "Хранение"].map((cat, i) => (
            <button
              key={cat}
              className={`px-[20px] py-[10px] rounded-full text-[15px] ${i === 2 ? "btn-accent" : "card"}`}
              style={i !== 2 ? { border: "1px solid var(--card-border)" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-[10px]">
          {[
            { q: "Как я могу оплатить заказ?", open: false },
            { q: "Могу ли я изменить адрес и время доставки?", open: true, ans: "Каждый вечер, в день доставки, с вами связывается курьер, ориентировочно с 19:00 до 20:00 для уточнения адреса и времени доставки. При необходимости, вы можете их изменить, сообщив об этом курьеру при звонке." },
            { q: "Могу ли я перенести день доставки?", open: false },
            { q: "Могу ли я приостановить доставку, на какой срок?", open: false },
          ].map((faq) => (
            <div key={faq.q} className="card rounded-[16px] px-[24px] py-[20px]" style={{ border: "1px solid var(--card-border)" }}>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[15px] md:text-[17px]">{faq.q}</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d={faq.open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {faq.ans && <p className="mt-[14px] text-[14px] text-muted leading-relaxed">{faq.ans}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Консультация */}
      <section className="px-4 md:px-[100px] py-[60px] relative" style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="rounded-[24px] px-[20px] md:px-[60px] flex flex-col md:flex-row justify-between items-center py-[50px] gap-8 md:gap-0" style={{ backgroundColor: "#8FAF8A" }}>
          <div className="flex flex-col gap-[28px] z-10 w-full md:w-auto">
            <h2 className="text-white font-bold text-[28px] md:text-[40px] leading-tight w-full md:w-[520px]">
              Бесплатная консультация<br />диетолога
            </h2>
            <div className="flex flex-col sm:flex-row gap-[14px]">
              <input type="text" placeholder="Ваше имя" className="card px-[20px] py-[14px] rounded-full text-[15px] outline-none w-full sm:w-[220px]" style={{ border: "1px solid var(--card-border)" }} />
              <input type="text" placeholder="Телефон" className="card px-[20px] py-[14px] rounded-full text-[15px] outline-none w-full sm:w-[220px]" style={{ border: "1px solid var(--card-border)" }} />
            </div>
            <div className="flex flex-col gap-[16px]">
              <button className="btn-accent px-[32px] py-[14px] rounded-full text-[15px] w-fit">Отправить заявку</button>
              <div className="flex items-center gap-[12px]">
                <div className="w-[42px] h-[42px] rounded-full border-2 border-white flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" />
                    <circle cx="17.5" cy="6.5" r="1" fill="white" />
                  </svg>
                </div>
                <div className="text-white">
                  <p className="text-[14px] font-semibold">Нутрициолог Вероника</p>
                  <p className="text-[13px] opacity-80">vnk_fitness</p>
                </div>
              </div>
            </div>
          </div>
          <img className="hidden md:block md:absolute right-[200px] top-2" src={img21} alt="" />
        </div>
      </section>

      {/* Пробный рацион */}
      <section className="px-4 md:px-[100px] py-[50px] flex flex-col gap-[20px]" style={{ borderTop: "1px solid var(--card-border)" }}>
        <h2 className="text-[28px] md:text-[40px] font-bold">Пробный рацион</h2>
        <p className="text-muted">
          Сомневаетесь? Протестируйте наш сервис и еду.<br />
          Начните с пробного меню на два дня со скидкой 20% за 2 800 ₽ (1 200 ккал)
        </p>
        <button className="btn-accent px-[32px] py-[14px] rounded-full text-[15px] w-fit">
          Попробовать
        </button>
      </section>

    </div>
  );
};

export default Home;
