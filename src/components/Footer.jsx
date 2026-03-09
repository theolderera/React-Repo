import React from "react";
import img24 from "../assets/img24.svg";

const Footer = () => {
  return (
    <footer className="page-bg px-4 md:px-[100px] py-8 md:py-[60px]" style={{ borderTop: "1px solid var(--card-border)" }}>

      <div className="banner-bg rounded-[24px] px-4 sm:px-6 md:px-[60px] py-6 md:py-[40px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 mb-8 md:mb-[50px]">
        <div className="flex flex-col gap-[16px]">
          <h2 className="text-white font-bold text-[24px] sm:text-[30px] md:text-[36px] leading-tight">
            Будьте всегда в курсе!
          </h2>
          <div className="flex items-start sm:items-center gap-[12px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="3" stroke="white" strokeWidth="1.8" />
              <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className="text-white text-[14px] sm:text-[15px]">
              Подпишитесь на рассылку и будьте всегда в курсе новинок, акций и новостей!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[12px] w-full md:w-auto">
          <input
            type="email"
            placeholder="Укажите вашу почту"
            className="card px-[24px] py-[14px] rounded-full text-[15px] outline-none w-full sm:w-[280px]"
            style={{ border: "1px solid var(--card-border)" }}
          />
          <button className="btn-accent px-[28px] py-[14px] rounded-full text-[15px] whitespace-nowrap w-full sm:w-auto">
            Подписаться
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex flex-col gap-[16px] w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[60px]">
            <div>
              <p className="font-bold text-[18px]">+7 988 500-1-700</p>
              <p className="text-muted text-[13px]">Ежедневно с 09:00 до 21:00</p>
            </div>
            <p className="font-bold text-[18px] break-all sm:break-normal">hello@pora-poest.com</p>
          </div>

          <p className="text-muted text-[14px]">
            ООО «ПораПоесть», г. Краснодар, ул. Кубанская Набережная улица, дом 5, офис 4
          </p>
          <p className="text-muted text-[14px]">
            © 2021 ПораПоесть — сервис доставки прогрессивного питания.
          </p>

          <div className="flex flex-col gap-[4px]">
            <p className="text-[12px] text-muted">
              Фотографии блюд на сайте являются вариантом сервировки блюда. Внешний вид блюда может
              отличаться от фотографии на сайте.
            </p>
            <p className="text-[12px] text-muted">
              Указывая электронную почту и номер телефона на сайте, вы соглашаетесь с условиями{" "}
              <span className="accent-text cursor-pointer">Публичной оферты</span> и{" "}
              <span className="accent-text cursor-pointer">Политикой конфиденциальности</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-[24px] w-full md:w-auto">
          <div className="flex gap-[12px]">
            {[
              <path key="fb" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
              <path key="vk" d="M21 5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h4.5v-7H7v-3h2.5V9a3.5 3.5 0 013.5-3.5h2v3h-2a.5.5 0 00-.5.5v2H15l-.5 3H12.5v7H19a2 2 0 002-2V5z" />,
            ].map((icon, i) => (
              <div key={i} className="btn-accent w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">{icon}</svg>
              </div>
            ))}
            <div className="btn-accent w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" />
              </svg>
            </div>
          </div>

          <img src={img24} alt="" className="w-[180px] sm:w-[220px] md:w-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
