import React from "react";

const Ratsion = () => {
  return (
    <div className="page-bg px-4 md:px-[100px] py-8 md:py-[60px]">
      <section className="rounded-[24px] px-4 sm:px-6 md:px-[40px] py-6 md:py-[36px]" style={{ backgroundColor: "var(--accent-light)", color: "var(--text-default)" }}>
        <h2 className="font-bold text-[20px] sm:text-[24px] md:text-[28px] mb-5 md:mb-[28px]">
          Подберите рацион для своих целей
        </h2>

        <div className="flex items-end gap-3 md:gap-[16px] flex-wrap">
          <div className="flex flex-col gap-[4px] w-full sm:w-auto">
            <span className="text-[12px] text-muted ml-[4px]">Пол</span>
            <div className="flex gap-[6px]">
              <button className="w-[40px] h-[40px] rounded-full text-[14px] font-medium btn-accent">Ж</button>
              <button className="w-[40px] h-[40px] rounded-full text-[14px] font-medium card" style={{ border: "1px solid var(--card-border)" }}>М</button>
            </div>
          </div>

          <input type="number" placeholder="Ваш вес"
            className="card h-[40px] px-[20px] rounded-full text-[14px] outline-none w-full sm:w-[120px]"
            style={{ border: "1px solid var(--card-border)" }} />

          <input type="number" placeholder="Ваш рост"
            className="card h-[40px] px-[20px] rounded-full text-[14px] outline-none w-full sm:w-[120px]"
            style={{ border: "1px solid var(--card-border)" }} />

          <input type="number" placeholder="Ваш возраст"
            className="card h-[40px] px-[20px] rounded-full text-[14px] outline-none w-full sm:w-[130px]"
            style={{ border: "1px solid var(--card-border)" }} />

          <select className="card h-[40px] px-[20px] rounded-full text-[14px] outline-none appearance-none cursor-pointer w-full sm:w-[160px]"
            style={{ border: "1px solid var(--card-border)" }}>
            <option value="">Активность</option>
          </select>

          <select className="card h-[40px] px-[20px] rounded-full text-[14px] outline-none appearance-none cursor-pointer w-full sm:w-[180px]"
            style={{ border: "1px solid var(--card-border)" }}>
            <option value="">Выберите цель</option>
          </select>

          <button className="btn-accent h-[40px] px-[28px] text-[14px] font-medium rounded-full whitespace-nowrap w-full sm:w-auto sm:ml-auto">
            Рассчитать рацион
          </button>
        </div>
      </section>
    </div>
  );
};

export default Ratsion;
