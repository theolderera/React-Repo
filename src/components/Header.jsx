import React, { useContext } from "react";
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="card px-4 py-2 rounded-full shadow font-bold text-sm hover:opacity-80 transition-all"
          style={{ border: "1px solid var(--card-border)" }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div className="banner-bg text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-[300px] py-2 md:py-[10px] px-4 md:px-0 font-bold text-[16px] sm:text-[18px] md:text-[25px] text-center">
        <div className="flex items-center gap-2 md:gap-[20px]">
          <img src={img1} alt="" className="w-5 h-5 md:w-auto md:h-auto" style={{ filter: "brightness(0) invert(1)" }} />
          <p>Скидка 20% на первый заказ</p>
        </div>
        <Link to="/page2">
          <p>Заказать--&gt;</p>
        </Link>
      </div>

      <div className="page-bg flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-[100px] py-2 md:py-[10px]" style={{ borderBottom: "1px solid var(--card-border)" }}>
        <Link to="/" className="shrink-0">
          <img src={img2} alt="" className="w-[160px] md:w-auto" />
        </Link>

        <ul className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-3 md:gap-[30px] list-none text-center text-default font-medium">
          <li><Link className="accent-text font-semibold" to="/">Подбор рациона</Link></li>
          <li><Link className="hover:opacity-70 transition-opacity" to="/">Программы питания</Link></li>
          <li><Link className="hover:opacity-70 transition-opacity" to="/">О нас</Link></li>
          <li><Link className="hover:opacity-70 transition-opacity" to="/">Доставка</Link></li>
          <li><Link className="hover:opacity-70 transition-opacity" to="/">Акции</Link></li>
          <li><Link className="hover:opacity-70 transition-opacity" to="/">FAQ</Link></li>
          <li><Link className="hover:opacity-70 transition-opacity" to="/">Отзывы</Link></li>
        </ul>

        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <p className="accent-text font-semibold text-sm">Перезвоните мне</p>
          <h3 className="font-extrabold text-[18px] md:text-[20px]">+7 988 500-1-700</h3>
          <p className="text-muted text-sm">c 09:00 до 21:00</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
