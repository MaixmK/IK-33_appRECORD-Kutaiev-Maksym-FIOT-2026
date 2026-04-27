(function () {
      const tabs = Array.from(document.querySelectorAll('.top-nav .tab'));
      const sideMenuLab1 = document.getElementById('sideMenuLab1');
      const sideMenuLab2 = document.getElementById('sideMenuLab2');
      const sideMenuLab3 = document.getElementById('sideMenuLab3');
      const sideMenuLab4 = document.getElementById('sideMenuLab4');
      const sideMenuLab5 = document.getElementById('sideMenuLab5');
      const sideMenuLab6 = document.getElementById('sideMenuLab6');

      const content = document.getElementById('content');

      const codeBlock = (s) =>
        `<pre class="code">${String(s)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')}</pre>`;

      const lab1 = {
      theme: `
  <h2>1. ТЕМА, МЕТА, ПОСИЛАННЯ</h2>
  <p><b>1.1 Тема:</b> Розроблення адаптивного вебзастосунку та серверної частини (Backend) для онлайн-каталогу комп’ютерних комплектуючих.</p>
<p><b>1.2 Мета створення застосунку:</b> Розробка зручної платформи електронної комерції для швидкого підбору, фільтрації та замовлення ПК-запчастин. Головна ціль — забезпечити якісний користувацький досвід (UX) на будь-яких пристроях, а також автоматизувати бізнес-процеси інтернет-магазину (управління товарами, обробка кошика та замовлень) шляхом створення надійної серверної інфраструктури та REST API.</p>
  <h3 class="muted">1.3Посилання</h3>

  <div class="link-buttons">
    <a class="btn" href="https://github.com/MaixmK/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій застосунку</a>
    <a class="btn" href="https://maixmk.github.io/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026//" target="_blank" rel="noopener">Жива сторінка застосунку</a>
    <a class="btn" href="https://github.com/MaixmK/IK-33_appRECORD-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій звітів</a>
  </div>
  `,

 env: `
  <h2>2. АНАЛІЗ ПРЕДМЕТНОЇ ОБЛАСТІ</h2>
  <p><b>2.1 Актуальність теми:</b> Актуальність теми полягає у стабільно високому попиті на персональні комп'ютери для різних потреб (геймінг, професійна робота з графікою, програмування тощо). Користувачам необхідний зручний інструмент для самостійного підбору сумісних комп'ютерних комплектуючих з можливістю детальної фільтрації, порівняння цін та характеристик. Розробка такого вебзастосунку дозволяє автоматизувати процес вибору та купівлі, роблячи його більш інтуїтивно зрозумілим та швидким.</p>
  
  <p><b>2.2 Об'єкт і предмет роботи:</b><br>
  <b>Об'єкт роботи:</b> процес підбору, сортування та замовлення комп'ютерних комплектуючих в онлайн-середовищі.<br>
  <b>Предмет роботи:</b> проєктування та розроблення адаптивного вебзастосунку для реалізації функціоналу онлайн-каталогу ПК-запчастин.</p>
  
  <p><b>2.3 Практичне значення:</b> Створений застосунок є повноцінним клієнтським прототипом інтернет-магазину. Використання LocalStorage для імітації серверної взаємодії дозволяє протестувати користувацькі сценарії (авторизація, робота з кошиком), що є надійною базою для подальшої інтеграції з повноцінним Backend-сервером та базою даних.</p>
  
  <p><b>2.4 Завдання роботи:</b> Для досягнення поставленої мети необхідно виконати такі завдання:</p>
  <ul>
    <li>Проаналізувати предметну область та визначити вимоги до системи.</li>
    <li>Описати бізнес-логіку майбутньої Backend-частини застосунку.</li>
    <li>Побудувати UML-діаграму прецедентів (Use-case) та ER-модель бази даних.</li>
    <li>Розробити адаптивний користувацький інтерфейс (UI) з використанням HTML5 та CSS3 (Flexbox/Grid, Media Queries).</li>
    <li>Реалізувати клієнтську логіку (фільтрація, кошик, пагінація) за допомогою JavaScript (ES6+).</li>
    <li>Розмістити вихідний код у системі контролю версій Git/GitHub.</li>
  </ul>
  `,

  'modeling-actors': `
    <h3>3.1 Актори системи</h3>
  <ul>
    <li><b>Гість (Guest)</b> – неавторизований користувач. Може переглядати товари, користуватися пошуком/фільтрами та збирати тимчасовий кошик (який тримається на рівні сесії).</li>
    <li><b>Користувач (User)</b> – авторизований клієнт. Має всі права Гостя, але його кошик синхронізується з базою даних, він має доступ до історії замовлень і може оформлювати покупки.</li>
    <li><b>Адміністратор (Admin)</b> – співробітник магазину. Керує наповненням бази даних (CRUD операції з товарами), оновлює залишки на складі та змінює статуси замовлень.</li>
  </ul>
  `,
  'modeling-bl': `
    <h3>3.2 Бізнес-логіка інформаційної системи</h3>
  <p>Цей розділ описує сукупність правил, алгоритмів та обмежень, які визначають процеси предметної області онлайн-каталогу комп'ютерних комплектуючих.</p>
  
  <p><b>Бізнес-правила:</b></p>
  <ul>
    <li><b>Резервування товару:</b> додавання товару до кошика не гарантує його резервування на складі; фактичне списання залишків відбувається виключно після підтвердження замовлення.</li>
    <li><b>Програма лояльності:</b> авторизовані користувачі, сума успішних замовлень яких за весь час перевищила 50 000 грн, автоматично отримують статус «Постійний клієнт» та фіксовану знижку 5% на наступні покупки.</li>
    <li><b>Ціноутворення:</b> ціни на товари фіксуються в момент створення замовлення; якщо ціна на складі змінилася до моменту оплати створеного замовлення, для клієнта залишається дійсною стара ціна.</li>
  </ul>

  <p><b>Формули розрахунків:</b></p>
  <ul>
    <li><b>Загальна вартість кошика</b> обчислюється за формулою: сума вартості всіх обраних одиниць товару мінус застосована знижка клієнта (якщо є).</li>
    <li><b>Вартість доставки:</b> якщо загальна сума замовлення перевищує 15 000 грн, вартість доставки дорівнює 0 грн (оплачує компанія), в інших випадках розраховується за фіксованим тарифом 150 грн.</li>
  </ul>

  <p><b>Умови прийняття рішень:</b></p>
  <ul>
    <li><b>Статус товару:</b> якщо залишок конкретної комплектуючої на складі дорівнює нулю, система автоматично змінює статус товару на «Немає в наявності» та блокує можливість його додавання до кошика.</li>
    <li><b>Доступ до оформлення:</b> система дозволяє оформити замовлення лише за умови, що користувач пройшов процес авторизації.</li>
  </ul>

  <p><b>Обмеження:</b></p>
  <ul>
    <li><b>Антиспекулятивне обмеження:</b> один клієнт не може додати до одного замовлення більше ніж 3 відеокарти (GPU) однієї моделі.</li>
    <li><b>Мінімальний поріг:</b> мінімальна сума замовлення для можливості його оформлення становить 500 грн.</li>
  </ul>

  <p><b>Алгоритми обробки:</b></p>
  <ul>
    <li><b>Життєвий цикл замовлення:</b> створене замовлення, яке очікує на онлайн-оплату, зберігає статус «Очікує оплати» протягом 24 годин; якщо оплата не надходить, замовлення автоматично скасовується системою.</li>
    <li><b>Оновлення каталогу:</b> після успішної оплати замовлення, алгоритм автоматично зменшує кількість куплених запчастин у базі даних складу; якщо залишок стає критичним (менше 3 одиниць), система формує попередження для менеджера із закупівель.</li>
  </ul>
  `,
  'modeling-fr': `
<h3>3.3 Функціональні вимоги (FR)</h3>
  <p>Тут ми описуємо, що система повинна робити, спираючись на взаємодію з базою даних та бекендом.</p>
  <table class="component-table" border="1" style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th>ID</th>
        <th>Вимога</th>
        <th>Опис</th>
        <th>Актор</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><b>FR-01</b></td><td>Перегляд каталогу</td><td>Завантаження та відображення списку ПК-комплектуючих з бази даних.</td><td>Guest, User</td></tr>
      <tr><td><b>FR-02</b></td><td>Деталі товару</td><td>Отримання та відображення повної інформації про товар (характеристики, опис, відгуки) на основі ID товару.</td><td>Guest, User</td></tr>
      <tr><td><b>FR-03</b></td><td>Пошук та фільтрація</td><td>Фільтрація товарів (категорія, бренд, ціна) шляхом відправки параметрів запиту (query params) на сервер.</td><td>Guest, User</td></tr>
      <tr><td><b>FR-04</b></td><td>Сортування та пагінація</td><td>Серверне сортування (за ціною/рейтингом) та посторінкова видача результатів (limit/offset) для зменшення навантаження.</td><td>Guest, User</td></tr>
      <tr><td><b>FR-05</b></td><td>Керування кошиком</td><td>Додавання, зміна кількості та видалення товарів. Динамічний перерахунок суми.</td><td>Guest, User</td></tr>
      <tr><td><b>FR-06</b></td><td>Збереження кошика у БД</td><td>Збереження стану кошика авторизованого користувача в базі даних для доступу з різних пристроїв.</td><td>User</td></tr>
      <tr><td><b>FR-07</b></td><td>Авторизація / Реєстрація</td><td>Створення облікового запису та безпечний вхід (перевірка облікових даних на бекенді, видача токена або сесії).</td><td>Guest</td></tr>
      <tr><td><b>FR-08</b></td><td>Оформлення замовлення</td><td>Створення замовлення в системі, валідація наявності товарів та резервування їх кількості у базі даних складу.</td><td>User</td></tr>
      <tr><td><b>FR-09</b></td><td>Керування товарами</td><td>Додавання нових товарів, редагування існуючих та зміна складських залишків у базі.</td><td>Admin (план)</td></tr>
      <tr><td><b>FR-10</b></td><td>Обробка замовлень</td><td>Перегляд списку замовлень та зміна їх статусів (нове, оплачено, відправлено).</td><td>Admin (план)</td></tr>
    </tbody>
  </table>
  `,
  'modeling-nfr': `
    <h3>3.4 Нефункціональні вимоги (NFR)</h3>
  <p>Цей блок описує як добре система повинна виконувати свої функції (продуктивність, безпека, обмеження).</p>
  <table class="component-table" border="1" style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th>ID</th>
        <th>Вимога</th>
        <th>Опис</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><b>NFR-01</b></td><td>Адаптивність</td><td>Інтерфейс повинен коректно відображатися на пристроях з шириною екрана від 320px (смартфони) до 1920px (десктопи).</td></tr>
      <tr><td><b>NFR-02</b></td><td>Продуктивність</td><td>Час відповіді сервера та завантаження першої сторінки каталогу не повинен перевищувати 2 секунди.</td></tr>
      <tr><td><b>NFR-03</b></td><td>Безпека даних</td><td>Паролі користувачів повинні зберігатися в базі даних виключно у захешованому вигляді (наприклад, bcrypt); передача даних — через HTTPS.</td></tr>
      <tr><td><b>NFR-04</b></td><td>Масштабованість</td><td>Архітектура бази даних повинна підтримувати розширення асортименту до 100 000 позицій без суттєвої втрати швидкодії.</td></tr>
      <tr><td><b>NFR-05</b></td><td>Кросбраузерність</td><td>Застосунок має стабільно працювати в останніх версіях сучасних браузерів (Chrome, Safari, Firefox, Edge).</td></tr>
    </tbody>
  </table>
  `,
  'modeling-usecase': `
    <h3>3.5 UML: Use-case діаграма та її опис</h3>
  <p>Use-case діаграма (діаграма прецедентів) для онлайн-каталогу комп'ютерних комплектуючих відображає сценарії взаємодії між системою та її акторами. У системі виділено трьох основних акторів, кожен з яких має свій рівень доступу до функціоналу.</p>
  
  <p><b>1. Актори та їхні базові прецеденти (Use cases):</b></p>
  <ul>
    <li><b>Гість (Guest):</b> має доступ до базового функціоналу сайту. Може виконувати прецеденти: «Перегляд каталогу», «Пошук та фільтрація», «Робота з кошиком», «Авторизація / Реєстрація».</li>
    <li><b>Користувач (User):</b> успадковує всі можливості Гостя (зв'язок Generalization), але додатково отримує доступ до цільового прецеденту — «Оформлення замовлення».</li>
    <li><b>Адміністратор (Admin):</b> керує бекенд-частиною системи. Взаємодіє з прецедентами: «Керування товарами», «Обробка замовлень» та «Авторизація / Реєстрація».</li>
  </ul>
  
  <p><b>2. Специфічні зв'язки між прецедентами:</b></p>
  <ul>
    <li><b>Зв'язок &lt;&lt;include&gt;&gt; (Включення):</b> Прецедент «Оформлення замовлення» обов'язково включає &lt;&lt;include&gt;&gt; прецедент «Авторизація / Реєстрація», оскільки система не дозволяє купувати товари анонімно.</li>
  </ul>
  <img src="img/uml.png" alt="Use-case діаграма" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,
  'modeling-er': `
    <h3>3.6 ER-діаграма даних та її опис</h3>
  <p>ER-діаграма (Entity-Relationship) демонструє логічну структуру майбутньої реляційної бази даних вебзастосунку та визначає ключові сутності предметної області, їхні атрибути та зв'язки між ними.</p>
  
  <p><b>Основні сутності бази даних:</b></p>
  <ul>
    <li><b>Users (Користувачі):</b> зберігає інформацію про зареєстрованих клієнтів та адміністраторів. Атрибути: id (PK), name, email, password_hash, role (user/admin), created_at.</li>
    <li><b>Categories (Категорії):</b> довідник типів комплектуючих (процесори, відеокарти, материнські плати тощо). Атрибути: id (PK), name.</li>
    <li><b>Products (Товари):</b> містить каталог ПК-запчастин. Атрибути: id (PK), category_id (FK), name, description, price, stock_count (залишок на складі), rating.</li>
    <li><b>Orders (Замовлення):</b> інформація про оформлені покупки. Атрибути: id (PK), user_id (FK), total_price, status (нове, оплачено, скасовано), created_at.</li>
    <li><b>Order_Items (Позиції замовлення):</b> зв'язуюча таблиця, що деталізує, які саме товари та в якій кількості входять до конкретного замовлення. Атрибути: id (PK), order_id (FK), product_id (FK), quantity, unit_price (ціна на момент покупки).</li>
  </ul>
  
  <p><b>Типи зв'язків між сутностями:</b></p>
  <ul>
    <li><b>Categories -&gt; Products (1:N):</b> До однієї категорії може належати багато товарів, але кожен товар належить лише до однієї категорії.</li>
    <li><b>Users -&gt; Orders (1:N):</b> Один користувач може створити багато замовлень, але кожне замовлення належить лише одному користувачу.</li>
    <li><b>Orders -&gt; Order_Items (1:N):</b> Одне замовлення може складатися з декількох різних позицій (товарів).</li>
    <li><b>Products -&gt; Order_Items (1:N):</b> Один і той самий товар може фігурувати у багатьох різних замовленнях.</li>
  </ul>
  <img src="img/er.png" alt="ER-діаграма" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'realization-structure': `
    <h2>4.1 Організація файлової структури проєкту</h2>
    <p>Файлова структура вебзастосунку логічно організована відповідно до компонентного підходу: HTML-документи, стилі, скрипти та графічні ресурси зберігаються окремо відповідно до їх призначення. Це забезпечує зручність підтримки та подальшого масштабування проєкту.</p>
    <p><b>Коренева директорія</b> містить головні HTML-документи (<code>index.html</code>, <code>about.html</code>, <code>cart.html</code>) та файл <code>README.md</code>.</p>
    <p>Для логічного групування створено підкаталоги: <code>/assets</code> (графічні ресурси), <code>/authorization</code> (реєстрація/вхід), <code>/catalog</code> (картки товарів), <code>/css</code> (таблиці стилів), <code>/js</code> (скрипти з програмною логікою).</p>
    <img src="img/filestruct.png" alt="Файлова структура проєкту" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,


  'realization-header': `
    <h2>4.2 Структурні компоненти інтерфейсу: Header та адаптивна навігація</h2>
    <p>Шапка сайту (<code>&lt;header&gt;</code>) містить логотип, навігаційне меню та кнопки користувацьких дій (профіль, кошик). Для пристроїв із малою роздільною здатністю навігаційне меню трансформується у компактне «бургер-меню».</p>
    
    <p><i>Фрагмент HTML (Шапка сайту та навігація):</i></p>
    ${codeBlock(`
<header class="site-header">
  <div class="topbar container">
    <a class="logo" href="#">Комплектуючі</a>
    <nav id="nav" class="nav">
      <ul class="nav__list">
        <li><a href="#shop" class="nav__link">Каталог</a></li>
        <li><a href="#about" class="nav__link">Про нас</a></li>
        <li><a href="#contacts" class="nav__link">Контакти</a></li>
      </ul>
    </nav>
    <div class="actions">
      <a class="icon-btn" href="authorization/login.html" title="Профіль">👤</a>
      <a class="icon-btn" href="cart.html" title="Кошик">🛒</a><span id="cartCount">0</span>
    </div>
    <button class="burger" aria-label="Меню" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`)}

    <p><i>Фрагмент CSS (Приховування меню на мобільних пристроях):</i></p>
    ${codeBlock(`
@media (max-width: 768px) {
  .nav { 
    position: absolute; top: 100%; left: 0; width: 100%; 
    transform: translateY(-150%);
    opacity: 0; visibility: hidden;
    transition: all 0.3s ease-in-out; 
  }
  .nav[data-open="true"] { 
    transform: translateY(0); 
    opacity: 1; visibility: visible;
  }
}`)}

    <p><i>Фрагмент JS (Обробник для бургер-меню):</i></p>
    ${codeBlock(`
burger.addEventListener('click', () => {
  const isOpen = nav.getAttribute('data-open') === 'true';
  nav.setAttribute('data-open', String(!isOpen));
  burger.setAttribute('aria-expanded', String(!isOpen));
});`)}
    <p><i>Скріншот:</i></p>
    <img src="img/header.png" alt="Шапка сайту та навігація" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
    <p><i>Бургер-меню з'вився на екрані з маленький екраном:</i></p>
    <img src="img/burger.png" alt="Бургер-меню" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
    <img src="img/burger1.png" alt="Бургер-меню" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'realization-main': `
    <h2>4.3 Основний блок (Main) та адаптивна сітка контенту</h2>
    <p>Основний блок (<code>&lt;main&gt;</code>) містить секцію карток категорій. Для її побудови використано технологію <b>CSS Grid</b>. Сітка динамічно перебудовується залежно від ширини екрана за допомогою медіа-запитів.</p>
    <p><i>Фрагмент HTML:</i></p>
    ${codeBlock(`    <section class="home-section container">
      <header>
        <h2 class="section-title">Популярні категорії</h2>
      </header>
      <ul class="catalog">
        <li class="card"><a href="catalog/cpu.html" class="card__link"><img src="assets/icons/cpu.svg" class="card__icon"><div class="card__title">Процесори</div></a></li>
        <li class="card"><a href="catalog/mb.html" class="card__link"><img src="assets/icons/motherboard.svg" class="card__icon"><div class="card__title">Материнські плати</div></a></li>
        <li class="card"><a href="catalog/ram.html" class="card__link"><img src="assets/icons/ram.svg" class="card__icon"><div class="card__title">Оперативна пам’ять</div></a></li>
        <li class="card"><a href="catalog/gpu.html" class="card__link"><img src="assets/icons/gpu.svg" class="card__icon"><div class="card__title">Відеокарти</div></a></li>
        <li class="card"><a href="catalog/storage.html" class="card__link"><img src="assets/icons/harddrive.svg" class="card__icon"><div class="card__title">Накопичувачі</div></a></li>
        <li class="card"><a href="catalog/case.html" class="card__link"><img src="assets/icons/comp.svg" class="card__icon"><div class="card__title">Корпуси</div></a></li>
        <li class="card"><a href="catalog/psu.html" class="card__link"><img src="assets/icons/power-supply.png" class="card__icon"><div class="card__title">Блоки живлення</div></a></li>
        <li class="card"><a href="catalog/storage.html" class="card__link"><img src="assets/icons/snow.png" class="card__icon"><div class="card__title">Охолодження</div></a></li>
      </ul>
    </section>
`)}
    <p><i>Фрагмент CSS (Адаптивна Grid-сітка):</i></p>
    ${codeBlock(`
.catalog {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 колонки на ПК */
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .catalog { grid-template-columns: repeat(3, 1fr); } /* 3 колонки на планшеті */
}
@media (max-width: 768px) {
  .catalog { grid-template-columns: repeat(2, 1fr); } /* 2 колонки на смартфоні */
}
@media (max-width: 480px) {
  .catalog { grid-template-columns: 1fr; } /* 1 колонка на малих екранах */
}`)}

    <p>Для покращення користувацького досвіду реалізовано візуальні ефекти при наведенні курсора на картку:</p>
    ${codeBlock(`
.card { transition: transform .2s ease, box-shadow .2s ease; }
.card__link:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,.1); }`)}
<p><i>Скріншот:</i></p>
<img src="img/main.png" alt="Каталог категорій" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'realization-footer': `
    <h2>4.4 Нижній колонтитул (Footer)</h2>
    <p>Нижній колонтитул (<code>&lt;footer&gt;</code>) містить копірайт та довідкові посилання. Для того, щоб футер завжди був притиснутий до нижнього краю екрана, для тегу <code>&lt;body&gt;</code> застосовано Flexbox з мінімальною висотою екрана (<code>min-height: 100vh</code>).</p>
    
    <p><i>Фрагмент HTML (Footer):</i></p>
    ${codeBlock(`
<footer class="site-footer">
  <div class="container footer__grid">
    <small>© 2026 Комплектуючі для ПК</small>
    <ul class="footer__links">
      <li><a href="#">Політика конфіденційності</a></li>
      <li><a href="#">Умови користування</a></li>
    </ul>
  </div>
</footer>`)}
    <p><i>Фрагмент CSS (Footer):</i></p>
    ${codeBlock(`.site-footer { background: #111; color: #ddd; padding: 1.5rem 0; margin-top: 3rem; }
.footer__grid { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.footer__links { list-style: none; display: flex; gap: 1.5rem; margin: 0; padding: 0; }
.footer__links a { color: #aaa; text-decoration: none; }
.footer__links a:hover { color: #fff; }

@media (max-width: 480px) {
  .footer__grid { flex-direction: column; text-align: center; }
}`)}
    <p><i>Скріншот:</i></p>
    <img src="img/footer.png" alt="Нижній колонтитул" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'realization-catalog': `
    <h2>4.5 Логіка каталогу: Пошук, сортування та пагінація</h2>
    <p>Для зручної навігації великим списком комплектуючих реалізовано динамічний рендеринг каталогу за допомогою JavaScript. Функціонал включає пошук за назвою та характеристиками, сортування за ціною/популярністю, а також посторінкову навігацію (пагінацію).</p>
    
    <p><i>Фрагмент JS (Логіка фільтрації та сортування):</i></p>
    ${codeBlock(`
function applyFilters(list) {
  const q = ($('#q')?.value || '').trim().toLowerCase();
  const sort = $('#sort')?.value;
  let items = list.slice();

  // Пошук за ключовим словом
  if(q) {
    items = items.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) ||
      Object.values(p.specs||{}).some(v => String(v).toLowerCase().includes(q))
    );
  }

  // Сортування
  if (sort === 'price_asc') items.sort((a,b) => a.price - b.price);
  else if (sort === 'price_desc') items.sort((a,b) => b.price - a.price);
  else if (sort === 'rating_desc') items.sort((a,b) => b.rating - a.rating);

  return items;
}`)}

    <p><i>Фрагмент JS (Розрахунок сторінок для пагінації):</i></p>
    ${codeBlock(`
const PER_PAGE = 6; // кількість товарів на сторінці
let currentPage = 1;

function renderPagination(totalItems) {
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  // Рендеринг кнопок сторінок (1, 2, 3...) та обробка кліків
}`)}
    <p>Після застосування фільтрів та сортування, каталог оновлюється без перезавантаження сторінки, що забезпечує швидкий та плавний користувацький досвід.</p>
    <p><i>Каталог товарів з фільтрами та сортуванням. Пагінація:</i></p>
    <img src="img/catalog.png" alt="Каталог товарів з фільтрами та сортуванням" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'realization-cart': `
    <h2>4.6 Реалізація кошика товарів (LocalStorage)</h2>
    <p>Оскільки застосунок працює без бекенд-сервера, для збереження стану кошика користувача між вкладками та сесіями використано Web API <code>LocalStorage</code>. Це діє як заглушка бази даних.</p>
    
    <p><i>Фрагмент JS (Завантаження та збереження стану кошика):</i></p>
    ${codeBlock(`
const CART_KEY = 'pc_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || { items: [], updatedAt: Date.now() };
  } catch {
    return { items: [], updatedAt: Date.now() };
  }
}

function saveCart(cart) {
  cart.updatedAt = Date.now();
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}`)}

    <p><i>Фрагмент JS (Динамічний перерахунок підсумків):</i></p>
    ${codeBlock(`
function calcSummary(items) {
  const sumItems = items.length;
  const sumQty = items.reduce((s, it) => s + (it.qty || 0), 0);
  const sumTotal = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0);
  return { sumItems, sumQty, sumTotal };
}`)}
    <p>Кошик підтримує зміну кількості товарів кнопками «+ / -», ручне введення кількості та видалення окремих позицій із миттєвим перерахунком суми.</p>
    <p><i>Скріншот кошика з динамічним перерахунком:</i></p>
    <img src="img/cart.png" alt="Кошик товарів" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'conclusions': `
    <h2>5. ВИСНОВКИ</h2>
    <p>У результаті виконання комп'ютерного практикуму було успішно розв'язано завдання з аналізу, моделювання та розроблення клієнтської частини (Frontend) адаптивного вебзастосунку для онлайн-каталогу комп'ютерних комплектуючих.</p>
    
    <p><b>Узагальнення отриманих результатів:</b></p>
    <ul>
      <li>Проведено глибокий аналіз предметної області, сформовано бізнес-логіку, функціональні (FR) та нефункціональні (NFR) вимоги.</li>
      <li>Спроєктовано архітектуру майбутньої бази даних (ER-діаграма) та сценарії взаємодії користувачів із системою (Use-case діаграма).</li>
      <li>Розроблено семантичний користувацький інтерфейс з використанням сучасних підходів верстки. Застосунок повністю адаптивний і коректно відображається на десктопних, планшетних та мобільних пристроях.</li>
      <li>За допомогою JavaScript реалізовано складну клієнтську логіку: динамічний рендеринг товарів, пошук, фільтрацію, сортування та пагінацію.</li>
      <li>Створено повноцінно функціонуючий кошик товарів із підрахунком вартості та збереженням стану сесії через Web Storage API (LocalStorage), що імітує взаємодію з сервером.</li>
    </ul>


    <p><b>Шляхи вдосконалення:</b></p>
    <p>Оскільки поточна версія застосунку є клієнтським прототипом, головним напрямом подальшого вдосконалення є розробка повноцінної Backend-частини та підключення реальної реляційної бази даних згідно зі спроєктованою ER-діаграмою. Також доцільно реалізувати серверну автентифікацію користувачів та створити панель адміністратора для зручного керування каталогом і замовленнями.</p>
  `
  ,

  'backend-intro': `
    <h2>Частина 2. Основи роботи з Node.js та Express.js</h2>
    <p><b>Мета:</b> Ознайомитися з принципами роботи HTTP-серверів, вивчити основи створення вебсерверів на Node.js, ознайомитися з архітектурою REST API та навчитися створювати маршрути для обробки HTTP-запитів.</p>
    <p>Для виконання роботи було створено окрему директорію <code>lab1-rest-api</code>, ініціалізовано проєкт (<code>npm init -y</code>) та встановлено фреймворк Express.js (<code>npm install express</code>). Усю логіку REST API адаптовано під предметну область — каталог комп'ютерних комплектуючих.</p>
  `,

  'backend-task2-3': `
    <h2>Завдання 2 та 3: Базовий сервер і GET-запит</h2>
    <p>Реалізовано HTTP-сервер, який на кореневому маршруті повертає вітальне повідомлення "Hello from Node.js server" . Також створено маршрут <code>GET /products</code>, який повертає список комплектуючих у форматі JSON .</p>
    
    <p><i>Фрагмент коду (Ініціалізація та GET маршрути):</i></p>
    ${codeBlock(`
const express = require("express");
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "AMD Ryzen 5 5600", category: "CPU", price: 5000 },
  { id: 2, name: "NVIDIA GeForce RTX 4060", category: "GPU", price: 14000 }
];

// Завдання 2
app.get("/", (req, res) => {
  res.send("Hello from Node.js server");
});

// Завдання 3
app.get("/products", (req, res) => {
  res.json(products);
});`)}

<img src="img/node.png" alt="Результат GET-запиту" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
<img src="img/get.png" alt="Результат GET-запиту" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'backend-task4': `
    <h2>Завдання 4: POST-запит (Додавання товару)</h2>
    <p>Створено маршрут <code>POST /products</code> для додавання нового товару до масиву. Дані приймаються з тіла запиту (req.body) і містять поля: id, name, category, price (адаптовано замість студентів).</p>
    
    <p><i>Фрагмент коду (POST маршрут):</i></p>
    ${codeBlock(`
app.post("/products", (req, res) => {
  const newProduct = {
    id: req.body.id,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price
  };
  
  products.push(newProduct);
  res.status(201).json({ message: "Товар успішно додано", product: newProduct });
});`)}
<img src="img/post.png" alt="Результат POST-запиту" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,

  'backend-task5': `
    <h2>Завдання 5: PUT та DELETE-запити (Оновлення та видалення)</h2>
    <p>Для керування даними створено маршрути <code>PUT /products/:id</code> та <code>DELETE /products/:id</code> . Вони знаходять товар за переданим ідентифікатором у параметрах URL та відповідно оновлюють його властивості або видаляють з масиву.</p>
    
    <p><i>Фрагмент коду (PUT та DELETE маршрути):</i></p>
    ${codeBlock(`
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index !== -1) {
    products[index].name = req.body.name || products[index].name;
    products[index].category = req.body.category || products[index].category;
    products[index].price = req.body.price || products[index].price;
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Товар не знайдено" });
  }
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter(p => p.id !== productId);

  if (products.length < initialLength) {
    res.json({ message: "Товар успішно видалено" });
  } else {
    res.status(404).json({ message: "Товар не знайдено" });
  }
});`)}
<img src="img/put.png" alt="Результат PUT та DELETE запитів" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
<img src="img/delete.png" alt="Результат PUT та DELETE запитів" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">
  `,
};

      const lab2 = {
  'sel-tags': `
    <h2>1. ТЕМА, МЕТА, ПОСИЛАННЯ</h2>
    <p><b>1.1 Тема:</b> Створення бази даних у MySQL. Підключення Node.js до MySQL. Робота з ORM Sequelize.</p>

    <p><b>1.2 Мета:</b> Набути практичних навичок створення реляційної бази даних у MySQL для власного вебзастосунку онлайн-каталогу комп’ютерних комплектуючих, виконання основних SQL-запитів, підключення серверного застосунку на Node.js до бази даних та використання ORM Sequelize для опису моделей і зв’язків між ними.</p>

    <h3 class="muted">1.3 Посилання</h3>
    <div class="link-buttons">
      <a class="btn" href="https://github.com/MaixmK/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій застосунку</a>
      <a class="btn" href="https://maixmk.github.io/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026//" target="_blank" rel="noopener">Жива сторінка застосунку</a>
      <a class="btn" href="https://github.com/MaixmK/IK-33_appRECORD-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій звітів</a>
      <a class="btn" href="https://github.com/MaixmK/backend" target="_blank" rel="noopener">Репозиторій Backend - частини</a>
    </div>
  `,

  'theory': `
    <h2>2. КОРОТКІ ТЕОРЕТИЧНІ ВІДОМОСТІ</h2>

    <p><b>MySQL</b> є реляційною системою керування базами даних, у якій інформація зберігається у вигляді таблиць, пов’язаних між собою первинними та зовнішніми ключами. Для роботи з даними використовується мова SQL, яка дозволяє створювати структуру бази даних, додавати записи, змінювати їх, видаляти та виконувати вибірки.</p>

    <p><b>Node.js</b> є серверним середовищем виконання JavaScript. Воно дозволяє створювати backend-застосунки, які можуть працювати з API, мережею, файлами та базами даних. У цій лабораторній роботі Node.js використовується для підключення до MySQL і реалізації серверної логіки.</p>

    <p><b>mysql2</b> — це драйвер для прямого підключення Node.js до MySQL. Він дозволяє надсилати SQL-запити з коду JavaScript і отримувати результати їх виконання безпосередньо в програмі.</p>

    <p><b>Sequelize</b> є ORM-бібліотекою для Node.js. Вона дозволяє працювати з таблицями бази даних через JavaScript-моделі, що робить код більш читабельним, структурованим і зменшує кількість SQL-запитів, які треба писати вручну. Також Sequelize дозволяє описувати зв’язки між сутностями, наприклад один-до-багатьох.</p>

    <p><b>Express</b> використовується як серверний фреймворк для Node.js. За його допомогою було реалізовано маршрути API для роботи з категоріями, товарами, замовленнями та позиціями замовлення.</p>
  `,

  'task': `
    <h2>3. ПОСТАНОВКА ЗАДАЧІ</h2>

    <p>У межах лабораторної роботи було створено базу даних для вебзастосунку онлайн-каталогу комп’ютерних комплектуючих. Предметна область включає користувачів системи, категорії товарів, товари, замовлення та позиції замовлень.</p>

    <p>Користувач у системі може мати роль звичайного клієнта або адміністратора. Категорії використовуються для групування товарів за типом комплектуючих. Кожен товар належить до певної категорії, має назву, опис, ціну, кількість на складі та рейтинг. Користувач може створювати замовлення, а кожне замовлення складається з набору позицій, що містять конкретні товари та їх кількість.</p>

    <p>Для реалізації цієї логіки було спроєктовано такі таблиці: <code>users</code>, <code>categories</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>. Між ними реалізовано зв’язки таким чином: одна категорія може містити багато товарів, один користувач може мати багато замовлень, одне замовлення може складатися з багатьох позицій, а один товар може входити до багатьох різних замовлень.</p>
  `,

  'db-structure': `
    <h2>4. ОПИС СТРУКТУРИ БАЗИ ДАНИХ</h2>

    <p><b>Таблиця users</b> призначена для збереження інформації про користувачів системи. У ній містяться ім’я користувача, електронна пошта, хеш пароля, роль та дата створення запису.</p>

    <p><b>Таблиця categories</b> зберігає перелік категорій товарів, наприклад процесори, материнські плати, оперативна пам’ять, відеокарти, накопичувачі, корпуси, блоки живлення та охолодження.</p>

    <p><b>Таблиця products</b> містить відомості про товари. Для кожного товару зберігається назва, опис, ціна, залишок на складі, рейтинг та посилання на категорію, до якої він належить.</p>

    <p><b>Таблиця orders</b> реалізує процес оформлення замовлення. У ній міститься посилання на користувача, загальна вартість замовлення, статус і дата створення.</p>

    <p><b>Таблиця order_items</b> зберігає склад замовлення. Для кожного запису фіксуються посилання на замовлення та товар, кількість і ціна товару на момент покупки.</p>
  `,

  'mysql-create': `
    <h2>5. РЕАЛІЗАЦІЯ В MYSQL</h2>

    <p>На першому етапі було створено базу даних <code>pc_components_store</code>. Після цього у ній були створені всі необхідні таблиці з первинними та зовнішніми ключами. Використання зовнішніх ключів забезпечило цілісність даних і правильний зв’язок між сутностями предметної області.</p>

    <p><i>Фрагмент SQL-коду для створення бази даних:</i></p>
    ${codeBlock(`
CREATE DATABASE pc_components_store;
USE pc_components_store;
`)}

    <p><i>Фрагмент SQL-коду для створення таблиць:</i></p>
    ${codeBlock(`
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_count INT NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('new', 'paid', 'cancelled') NOT NULL DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
`)}

    <img src="img/lab2/mysql-create.png" alt="Створення бази даних і таблиць" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 1 — Ініціалізація бази даних і таблиць у MySQL Workbench</i></p>
  `,

  'sql-queries': `
    <h2>6. ВИКОНАННЯ SQL-ЗАПИТІВ</h2>

    <p>У процесі виконання лабораторної роботи були реалізовані стандартні SQL-операції <code>INSERT</code>, <code>SELECT</code>, <code>UPDATE</code> та <code>DELETE</code>. За допомогою <code>INSERT</code> до таблиць додавалися користувачі, категорії, товари, замовлення та позиції замовлення. За допомогою <code>SELECT</code> отримувалися записи з таблиць, що дозволяло перевіряти правильність збережених даних. Операція <code>UPDATE</code> використовувалась для зміни ціни товару, кількості на складі або статусу замовлення. Операція <code>DELETE</code> дозволяла видаляти тестові записи з таблиць.</p>

    <p><i>Приклади SQL-запитів:</i></p>
    ${codeBlock(`
INSERT INTO categories (name)
VALUES ('Процесори'), ('Відеокарти');

SELECT * FROM categories;

UPDATE products
SET price = 13500.00
WHERE id = 2;

DELETE FROM order_items
WHERE id = 1;
`)}
  `,

  'node-mysql': `
    <h2>7. ПІДКЛЮЧЕННЯ NODE.JS ДО MYSQL</h2>

    <p>Після створення бази даних було налаштовано Node.js-застосунок. Для прямого підключення до MySQL використано пакет <code>mysql2</code>. У конфігураційному файлі були вказані параметри з’єднання: адреса сервера, назва бази, ім’я користувача та пароль. Це дало змогу виконувати SQL-запити безпосередньо з JavaScript-коду.</p>

    <p><i>Фрагмент коду підключення:</i></p>
    ${codeBlock(`
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '********',
    database: 'pc_components_store'
});

connection.connect((err) => {
    if (err) {
        console.error('Помилка підключення:', err);
    } else {
        console.log('Підключення до MySQL успішне');
    }
});
`)}

    <p>Окремо було створено файл для демонстрації роботи з <code>mysql2</code>, у якому реалізовано вибірку категорій, додавання тестового запису, його оновлення та видалення. Таким чином було підтверджено можливість прямої взаємодії Node.js застосунку з MySQL.</p>

    <img src="img/lab2/node-mysql.png" alt="Підключення Node.js до MySQL" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 3 — Підключення Node.js до MySQL через mysql2</i></p>
  `,

  'sequelize': `
    <h2>8. ВИКОРИСТАННЯ SEQUELIZE</h2>

    <p>Для більш зручної роботи з базою даних у проєкті також було використано ORM Sequelize. Для кожної таблиці створено відповідну модель: <code>User</code>, <code>Category</code>, <code>Product</code>, <code>Order</code>, <code>OrderItem</code>. У моделях були описані поля таблиць, типи даних, обмеження та значення за замовчуванням.</p>

    <p><i>Фрагмент коду підключення Sequelize:</i></p>
    ${codeBlock(`
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'pc_components_store',
    'root',
    '********',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
`)}

    <p><i>Фрагмент моделі Category:</i></p>
    ${codeBlock(`
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'categories',
    timestamps: false
});

module.exports = Category;
`)}

    <p>Після цього були налаштовані зв’язки між моделями. Модель <code>Category</code> пов’язана з моделлю <code>Product</code> через зв’язок один-до-багатьох. Аналогічно, модель <code>User</code> має багато замовлень, модель <code>Order</code> має багато позицій замовлення, а модель <code>Product</code> також може входити до багатьох позицій замовлення.</p>

    <p><i>Фрагмент коду зв’язків:</i></p>
    ${codeBlock(`
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
`)}
  `,

  'app-work': `
    <h2>9. ОПИС РОБОТИ ЗАСТОСУНКУ</h2>

    <p>У межах лабораторної роботи було реалізовано серверний застосунок для онлайн-каталогу комп’ютерних комплектуючих. Сервер запускається на Node.js і використовує Express. Застосунок надає маршрути для роботи з категоріями, товарами, замовленнями та позиціями замовлення.</p>

    <p>Для демонстрації роботи серверної частини було реалізовано CRUD-операції для основних сутностей вебзастосунку: <code>categories</code>, <code>products</code>, <code>orders</code> та <code>order_items</code>. Перевірка роботи API здійснювалася за допомогою Postman, що дозволило підтвердити коректне виконання операцій отримання, створення, оновлення та видалення записів.</p>

    <p><i>Фрагмент коду підключення маршрутів:</i></p>
    ${codeBlock(`
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);
`)}

    <p>Маршрут <code>GET /categories</code> використовується для отримання списку категорій. Маршрут <code>POST /products</code> дозволяє додати новий товар до каталогу. Через маршрут <code>PUT /products/:id</code> виконується редагування товару, а <code>DELETE /products/:id</code> використовується для його видалення. Аналогічно були реалізовані маршрути для замовлень та складу замовлення.</p>
  `,

  'results': `
    <h2>10. РЕЗУЛЬТАТИ РОБОТИ</h2>

    <p>У результаті виконання лабораторної роботи було створено повноцінну базу даних для системи онлайн-каталогу комп’ютерних комплектуючих. Було реалізовано таблиці для користувачів, категорій, товарів, замовлень та позицій замовлень. Підключення Node.js до MySQL було виконано двома способами: через драйвер <code>mysql2</code> та через ORM <code>Sequelize</code>. У межах застосунку були продемонстровані основні CRUD-операції, а також реалізовані зв’язки між таблицями відповідно до моделі предметної області.</p>

    <p><b>Приклади перевірки API в Postman:</b></p>

    <img src="img/lab2/get-categories.png" alt="GET categories" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 5 — Отримання списку категорій</i></p>

    <img src="img/lab2/post-product.png" alt="POST product" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 6 — Створення нового товару</i></p>

    <img src="img/lab2/put-product.png" alt="PUT product" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 7 — Редагування товару</i></p>

    <img src="img/lab2/delete-product.png" alt="DELETE product" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p>Оброка помилки</p>
    <img src="img/lab2/delete404.png" alt="DELETE product" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 8 — Видалення товару</i></p>

    <img src="img/lab2/get-orders.png" alt="GET orders" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 9 — Отримання списку замовлень</i></p>

    <img src="img/lab2/post-order-item.png" alt="POST order item" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
    <p><i>Рис. 10 — Створення позиції замовлення</i></p>
  `,

  'conclusion': `
    <h2>11. ВИСНОВОК</h2>

    <p>У ході виконання лабораторної роботи було досягнуто поставленої мети. Було створено базу даних у MySQL, спроєктовано структуру таблиць відповідно до теми власного вебзастосунку, реалізовано основні SQL-запити, налаштовано підключення Node.js до MySQL та використано ORM Sequelize для роботи з даними. Також було реалізовано зв’язки між таблицями за принципом One-to-Many.</p>

    <p>Отже, лабораторна робота дозволила закріпити знання з організації баз даних, роботи з SQL, налаштування серверного підключення та побудови backend-частини застосунку на Node.js з використанням сучасних інструментів. Додатково було реалізовано та перевірено CRUD-операції через REST API, що дозволило наблизити лабораторну роботу до структури реального вебзастосунку.</p>
  `
};

      const lab3 = {
  theme3: `
    <h2>1. ТЕМА, МЕТА, ПОСИЛАННЯ</h2>
    <p><b>1.1 Тема:</b> Розробка функціонального REST API. Реєстрація та авторизація користувачів. Валідація даних і обробка помилок.</p>

    <p><b>1.2 Мета:</b> Набути практичних навичок реалізації реєстрації та авторизації користувачів у власному backend-застосунку, додати валідацію даних, обробку помилок, JWT-аутентифікацію, захищені маршрути, рольову модель доступу та розширені механізми безпеки.</p>

    <h3 class="muted">1.3 Посилання</h3>
    <div class="link-buttons">
      <a class="btn" href="https://github.com/MaixmK/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій застосунку</a>
      <a class="btn" href="https://maixmk.github.io/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026//" target="_blank" rel="noopener">Жива сторінка застосунку</a>
      <a class="btn" href="https://github.com/MaixmK/IK-33_appRECORD-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій звітів</a>
      <a class="btn" href="https://github.com/MaixmK/backend" target="_blank" rel="noopener">Репозиторій Backend - частини</a>
    </div>
  `,

  theory3: `
    <h2>2. ТЕОРЕТИЧНІ ВІДОМОСТІ</h2>

    <p><b>REST API</b> — це архітектурний стиль взаємодії клієнта і сервера через HTTP-протокол. У REST усе розглядається як ресурс, а доступ до нього здійснюється через URL та стандартні HTTP-методи: <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>.</p>

    <p><b>Реєстрація користувача</b> — це процес створення нового облікового запису. На цьому етапі сервер перевіряє правильність вхідних даних, хешує пароль та зберігає користувача в базі даних.</p>

    <p><b>Авторизація</b> — це перевірка користувача під час входу в систему. Після успішної перевірки email і пароля сервер генерує токен доступу.</p>

    <p><b>JWT</b> використовується для ідентифікації користувача під час подальших запитів до сервера. Токен передається клієнтом у заголовку <code>Authorization</code> і перевіряється на сервері через middleware.</p>

    <p><b>Валідація даних</b> потрібна для того, щоб не допустити некоректних даних у систему. У межах лабораторної роботи перевіряються обов’язкові поля, формат email, довжина пароля та підтвердження пароля.</p>

    <p><b>Обробка помилок</b> реалізується через конструкцію <code>try/catch</code> та повернення коректних HTTP-кодів стану, наприклад <code>400</code>, <code>401</code>, <code>403</code>, <code>404</code> і <code>500</code>.</p>
  `,

  task3: `
    <h2>3. ПОСТАНОВКА ЗАДАЧІ</h2>

    <p>У межах лабораторної роботи необхідно було розширити існуючий backend вебзастосунку онлайн-каталогу комп’ютерних комплектуючих та додати в нього модуль автентифікації і захисту доступу.</p>

    <p>Для цього потрібно було реалізувати:</p>
    <ul>
      <li>реєстрацію користувача;</li>
      <li>авторизацію користувача;</li>
      <li>валідацію вхідних даних;</li>
      <li>обробку помилок сервера;</li>
      <li>захищений маршрут профілю;</li>
      <li>рольову модель <code>user/admin</code>;</li>
      <li>logout, оновлення профілю та зміну пароля;</li>
      <li>refresh token;</li>
      <li>обмеження кількості спроб входу;</li>
      <li>відновлення пароля та підтвердження email;</li>
      <li>заготівлю для Google login.</li>
    </ul>

    <p>Усі ці можливості інтегруються в уже створений backend із попередньої лабораторної роботи, тобто нова функціональність не є окремим проєктом, а розширює існуючу серверну систему.</p>
  `,

  structure3: `
    <h2>4. ФАЙЛОВА СТРУКТУРА ПРОЄКТУ</h2>

    <p>Для реалізації функціоналу ЛР №3 було розширено існуючу структуру backend-проєкту. Було додано нові middleware, утиліти та маршрути для роботи з автентифікацією.</p>

    ${codeBlock(`
backend/
│
├── config/
│   └── database.js
│
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Product.js
│   ├── Order.js
│   └── OrderItem.js
│
├── routes/
│   ├── auth.routes.js
│   ├── category.routes.js
│   ├── product.routes.js
│   ├── order.routes.js
│   └── orderItem.routes.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── loginLimiter.middleware.js
│
├── utils/
│   ├── token.js
│   ├── logger.js
│   └── randomToken.js
│
├── server.js
├── package.json
└── package-lock.json
`)}
  `,

  install3: `
    <h2>5. ВСТАНОВЛЕННЯ НЕОБХІДНИХ БІБЛІОТЕК</h2>

    <p>Для реалізації лабораторної роботи було використано бібліотеки <code>express</code>, <code>bcryptjs</code> і <code>jsonwebtoken</code>. Вони потрібні для створення серверних маршрутів, хешування паролів і генерації JWT токенів.</p>

    ${codeBlock(`
npm install express bcryptjs jsonwebtoken
`)}

    <p>Додатково в межах already existing backend-проєкту продовжували використовуватися Sequelize і mysql2, які були підключені на попередньому етапі.</p>
  `,

  usermodel3: `
    <h2>6. МОДЕЛЬ КОРИСТУВАЧА</h2>

    <p>Для зберігання даних користувачів у базі даних використовується модель <code>User</code>. Вона відповідає таблиці <code>users</code> і містить базові поля для реєстрації, авторизації, підтвердження email та відновлення пароля.</p>

    ${codeBlock(`
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    is_email_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    email_confirm_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
`)}

    <p>У цій моделі поле <code>password_hash</code> використовується для зберігання хешованого пароля, а не пароля у відкритому вигляді. Також модель містить додаткові поля для підтвердження email і відновлення пароля.</p>
  `,

  auth3: `
    <h2>7. РЕЄСТРАЦІЯ ТА АВТОРИЗАЦІЯ КОРИСТУВАЧА</h2>

    <p>Основний функціонал лабораторної роботи реалізовано у файлі <code>auth.routes.js</code>. У ньому містяться маршрути для реєстрації, логіну, підтвердження email, оновлення профілю, зміни пароля, видалення акаунта та інших дій, пов’язаних із користувачем.</p>

    <p><b>Реєстрація</b> створює нового користувача в базі даних. Перед збереженням сервер перевіряє всі поля, хешує пароль і генерує токен підтвердження email.</p>

    ${codeBlock(`
// Реєстрація
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Всі поля обов’язкові' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Паролі не співпадають' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailConfirmToken = generateRandomToken();

    await User.create({
        name,
        email,
        password_hash: hashedPassword,
        role: role === 'admin' ? 'admin' : 'user',
        is_email_confirmed: false,
        email_confirm_token: emailConfirmToken
    });

    return res.status(201).json({
        message: 'Користувача створено. Підтвердьте email.',
        emailConfirmToken
    });
});
`)}

    <p><b>Авторизація</b> перевіряє email і пароль, а після успішної перевірки повертає користувачу <code>accessToken</code> і <code>refreshToken</code>.</p>

    ${codeBlock(`
// Логін
router.post('/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    if (!user.is_email_confirmed) {
        return res.status(403).json({ message: 'Email не підтверджено' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        return res.status(400).json({ message: 'Невірний пароль' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
        message: 'Авторизація успішна',
        accessToken,
        refreshToken
    });
});
`)}
  `,

  validation3: `
    <h2>8. ВАЛІДАЦІЯ ДАНИХ І ОБРОБКА ПОМИЛОК</h2>

    <p>У серверній частині було додано перевірку вхідних даних. Зокрема перевіряється наявність обов’язкових полів, правильність email, довжина пароля, відповідність пароля та підтвердження пароля, а також дублювання email у базі даних.</p>

    ${codeBlock(`
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Всі поля обов’язкові' });
}

if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Невірний формат email' });
}

if (password.length < 6) {
    return res.status(400).json({ message: 'Пароль мінімум 6 символів' });
}

if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Паролі не співпадають' });
}
`)}

    <p>Для обробки помилок використовується конструкція <code>try/catch</code>. Також було додано окремий логер помилок, який виводить інформацію в консоль і може записувати її у файл.</p>

    ${codeBlock(`
const { logError } = require('../utils/logger');

try {
    // логіка
} catch (error) {
    logError('Помилка при реєстрації', error);
    return res.status(500).json({ message: 'Помилка сервера' });
}
`)}
  `,

  middleware3: `
    <h2>9. JWT, MIDDLEWARE І ЗАХИЩЕНІ МАРШРУТИ</h2>

    <p>Для доступу до захищених ресурсів було реалізовано JWT-аутентифікацію. Після логіну сервер повертає токен, який клієнт передає в заголовку <code>Authorization</code>. Для перевірки токена використовується middleware.</p>

    ${codeBlock(`
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../utils/token');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Немає токена' });
    }

    try {
        const decoded = jwt.verify(authHeader, ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Невірний токен' });
    }
};
`)}

    <p>Після цього було реалізовано захищений маршрут <code>/auth/profile</code>, який повертає інформацію про поточного користувача лише за наявності валідного токена.</p>

    ${codeBlock(`
router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'role', 'created_at']
    });

    return res.status(200).json({
        message: 'Доступ дозволено',
        user
    });
});
`)}
  `,

  advanced3: `
    <h2>10. РОЗШИРЕНІ МОЖЛИВОСТІ БЕЗПЕКИ</h2>

    <p>У лабораторній роботі також було реалізовано низку додаткових механізмів безпеки.</p>

    <p><b>Рольова модель доступу</b> дозволяє обмежити доступ до окремих маршрутів лише для користувачів з роллю <code>admin</code>.</p>

    ${codeBlock(`
module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Користувач не авторизований' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Доступ заборонено' });
        }

        next();
    };
};
`)}

    <p><b>Refresh token</b> дозволяє оновлювати короткоживучий access token без повторного логіну.</p>

    ${codeBlock(`
router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Немає refresh token' });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        ACCESS_SECRET,
        { expiresIn: '15m' }
    );

    return res.status(200).json({ accessToken });
});
`)}

    <p><b>Обмеження спроб входу</b> реалізовано через окремий middleware, який блокує користувача після кількох невдалих спроб логіну.</p>

    <p><b>Logout</b> реалізовано як видалення refresh token із тимчасового сховища.</p>

  `,

  profile3: `
    <h2>11. ОНОВЛЕННЯ ПРОФІЛЮ, ЗМІНА ПАРОЛЯ ТА ВИДАЛЕННЯ АККАУНТА</h2>

    <p>Для розширення функціоналу користувача було реалізовано маршрути:</p>
    <ul>
      <li><code>PUT /auth/profile</code> — оновлення імені та email;</li>
      <li><code>PUT /auth/change-password</code> — зміна пароля;</li>
      <li><code>DELETE /auth/delete-account</code> — видалення власного акаунта.</li>
    </ul>

    ${codeBlock(`
// Оновлення профілю
router.put('/profile', authMiddleware, async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (email && email !== user.email) {
        user.email = email;
        user.is_email_confirmed = false;
        user.email_confirm_token = generateRandomToken();
    }

    if (name) {
        user.name = name;
    }

    await user.save();
});
`)}

    ${codeBlock(`
// Зміна пароля
router.put('/change-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);

    if (!isMatch) {
        return res.status(400).json({ message: 'Старий пароль невірний' });
    }

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await user.save();
});
`)}

  `,

  recovery3: `
    <h2>12. ВІДНОВЛЕННЯ ПАРОЛЯ, ПІДТВЕРДЖЕННЯ EMAIL ТА GOOGLE LOGIN</h2>

    <p><b>Підтвердження email</b> реалізовано через токен, який генерується під час реєстрації. Після надсилання токена на маршрут <code>/auth/confirm-email</code> користувач позначається як підтверджений.</p>

    ${codeBlock(`
router.post('/confirm-email', async (req, res) => {
    const { token } = req.body;
    const user = await User.findOne({ where: { email_confirm_token: token } });

    user.is_email_confirmed = true;
    user.email_confirm_token = null;
    await user.save();
});
`)}

    <p><b>Відновлення пароля</b> реалізовано у два етапи:
    спочатку генерується токен скидання, а потім за цим токеном встановлюється новий пароль.</p>

    ${codeBlock(`
// Запит на відновлення пароля
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    const resetToken = generateRandomToken();
    user.reset_password_token = resetToken;
    await user.save();

    return res.status(200).json({ resetToken });
});
`)}

    ${codeBlock(`
// Скидання пароля
router.post('/reset-password', async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({
        where: { reset_password_token: token }
    });

    user.password_hash = await bcrypt.hash(newPassword, 10);
    user.reset_password_token = null;
    await user.save();
});
`)}

    <p><b>Google login</b> у межах лабораторної реалізовано у вигляді спрощеної заготівлі, яка імітує логіку входу через стороннього постачальника автентифікації.</p>

    ${codeBlock(`
router.post('/google-login', async (req, res) => {
    const { email, name } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
        user = await User.create({
            name,
            email,
            password_hash: await bcrypt.hash(generateRandomToken(), 10),
            role: 'user',
            is_email_confirmed: true
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({ accessToken, refreshToken });
});
`)}
  `,

  test3: `
  <h2>13. ДЕМОНСТРАЦІЯ РОБОТИ API</h2>

  <p>Для перевірки роботи серверної частини було використано Postman. Тестування виконувалося послідовно, щоб показати повний цикл роботи користувача в системі: реєстрація, підтвердження email, авторизація, отримання токенів, доступ до захищених маршрутів, оновлення профілю, зміна пароля, відновлення доступу та перевірка ролі адміністратора.</p>

  <h3>13.1 Реєстрація користувача</h3>
  <p>На першому етапі було виконано реєстрацію нового користувача. Сервер перевірив введені дані, захешував пароль, створив запис у таблиці <code>users</code> та повернув токен для підтвердження email.</p>
  <img src="img/lab3/postman-register.png" alt="Register" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 1 — Реєстрація користувача та отримання токена підтвердження email</i></p>

  <h3>13.2 Перевірка валідації</h3>
  <p>Після цього було перевірено роботу валідації. При введенні некоректних даних сервер повертає повідомлення про помилку та HTTP-код <code>400 Bad Request</code>.</p>
  <img src="img/lab3/postman-validation.png" alt="Validation error" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 2 — Приклад помилки валідації при некоректних даних</i></p>

  <h3>13.3 Підтвердження email</h3>
  <p>Для активації облікового запису було виконано підтвердження email за допомогою токена, отриманого під час реєстрації. Після цього поле <code>is_email_confirmed</code> змінюється на <code>true</code>.</p>
  <img src="img/lab3/postman-confirm-email.png" alt="Confirm email" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 3 — Підтвердження email користувача</i></p>

  <h3>13.4 Авторизація користувача</h3>
  <p>Після підтвердження email було виконано авторизацію користувача. У разі правильного email і пароля сервер повертає <code>accessToken</code> та <code>refreshToken</code>.</p>
  <img src="img/lab3/postman-login.png" alt="Login" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 4 — Авторизація користувача та отримання accessToken і refreshToken</i></p>

  <h3>13.5 Доступ до захищеного маршруту</h3>
  <p>Далі було перевірено захищений маршрут <code>/auth/profile</code>. Без токена сервер повертає помилку доступу, а з валідним токеном повертає дані авторизованого користувача.</p>
  <img src="img/lab3/postman-profile.png" alt="Profile" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 5 — Отримання профілю авторизованого користувача</i></p>

  <h3>13.6 Оновлення профілю</h3>
  <p>На цьому етапі було перевірено зміну даних користувача. Через запит <code>PUT /auth/profile</code> можна оновити ім’я або email користувача. Якщо email змінюється, він знову потребує підтвердження.</p>
  <img src="img/lab3/postman-update-profile.png" alt="Update profile" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 6 — Оновлення профілю користувача</i></p>

  <h3>13.7 Зміна пароля</h3>
  <p>Було реалізовано зміну пароля авторизованого користувача. Сервер перевіряє старий пароль, порівнює новий пароль із підтвердженням і зберігає новий пароль у хешованому вигляді.</p>
  <img src="img/lab3/postman-change-password.png" alt="Change password" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 7 — Зміна пароля користувача</i></p>

  <h3>13.8 Оновлення access token</h3>
  <p>Для продовження сесії було перевірено маршрут <code>/auth/refresh-token</code>. Він приймає <code>refreshToken</code> і повертає новий <code>accessToken</code>.</p>
  <img src="img/lab3/postman-refresh.png" alt="Refresh token" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 8 — Оновлення accessToken за допомогою refreshToken</i></p>

  <h3>13.9 Logout</h3>
  <p>Після цього було перевірено вихід із системи. При logout refresh token видаляється з тимчасового сховища, тому надалі його не можна використовувати для оновлення access token.</p>
  <img src="img/lab3/postman-logout.png" alt="Logout" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 9 — Вихід користувача із системи</i></p>

  <h3>13.10 Відновлення пароля</h3>
  <p>Для перевірки відновлення пароля спочатку було виконано запит <code>/auth/forgot-password</code>, який генерує токен скидання пароля. Після цього через маршрут <code>/auth/reset-password</code> було встановлено новий пароль.</p>
  <img src="img/lab3/postman-forgot-password.png" alt="Forgot password" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 10 — Генерація токена для відновлення пароля</i></p>

  <img src="img/lab3/postman-reset.png" alt="Reset password" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 11 — Скидання пароля за допомогою reset token</i></p>

  <h3>13.11 Перевірка ролі адміністратора</h3>
  <p>Окремо було створено користувача з роллю <code>admin</code>. Після авторизації admin-користувач отримує доступ до маршруту <code>/auth/users</code>, який повертає список усіх користувачів. Для звичайного користувача цей маршрут недоступний.</p>
  <img src="img/lab3/postman-admin.png" alt="Admin route" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 12 — Адмінський маршрут отримання списку користувачів</i></p>

  <h3>13.12 Google login</h3>
  <p>Також було реалізовано спрощену заготівлю для Google login. Вона імітує вхід через сторонній сервіс: якщо користувача з таким email немає, він створюється автоматично, після чого сервер повертає accessToken і refreshToken.</p>
  <img src="img/lab3/postman-google-login.png" alt="Google login" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 13 — Спрощена перевірка Google login</i></p>

  <p>Таким чином, тестування в Postman підтвердило коректну роботу основних механізмів автентифікації, авторизації, валідації, захищених маршрутів, refresh token, ролей користувачів, відновлення пароля та підтвердження email.</p>
`,

  conclusion3: `
    <h2>14. ВИСНОВКИ</h2>

    <p>У результаті виконання лабораторної роботи було реалізовано повноцінний модуль автентифікації та захисту доступу у власному backend-застосунку. Було створено модель користувача, маршрути реєстрації та авторизації, JWT-аутентифікацію, middleware для перевірки токена, рольову модель доступу та механізми безпеки, зокрема refresh token, обмеження спроб входу, логування помилок, зміну пароля, відновлення пароля та підтвердження email.</p>

    <p>Таким чином, лабораторна робота дозволила не лише закріпити знання про REST API, а й наблизити backend застосунку до структури реальної безпечної серверної системи, яка може використовуватися разом із frontend-частиною вебзастосунку.</p>
  `
};
      const lab4 = {};
      const lab5 = {};
      const lab6 = {};


      function setActiveTab(id) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.lab === String(id)));
      }
      
      function setActivePill(menuEl, sec) {
        const btns = Array.from(menuEl.querySelectorAll('.pill'));
        btns.forEach(b => b.classList.toggle('active', b.dataset.section === sec));
      }

      function renderLab(labId, section) {
        setActiveTab(labId);

        sideMenuLab1.style.display = (labId === 1) ? 'block' : 'none';
        sideMenuLab2.style.display = (labId === 2) ? 'block' : 'none';
        sideMenuLab3.style.display = (labId === 3) ? 'block' : 'none';
        sideMenuLab4.style.display = (labId === 4) ? 'block' : 'none';
        sideMenuLab5.style.display = (labId === 5) ? 'block' : 'none';
        sideMenuLab6.style.display = (labId === 6) ? 'block' : 'none';

        if (![1, 2, 3, 4, 5, 6].includes(labId)) {
          content.innerHTML = `<h2>Лабораторна робота №${labId}</h2><p>Матеріали відсутні.</p>`;
          return;
        }

        const secDefault =
          labId === 1 ? 'theme' :
          labId === 2 ? 'sel-tags' :
          labId === 3 ? 'theme3' :
          labId === 4 ? 'theme4' :
          labId === 5 ? 'theme5' :
          labId === 6 ? 'theme6' :
          null;

        const sec = section || secDefault;

        if (labId === 1) {
          setActivePill(sideMenuLab1, sec);
          content.innerHTML = lab1[sec] || `<p>Розділ “${sec}” у підготовці.</p>`;
        } else if (labId === 2) {
          setActivePill(sideMenuLab2, sec);
          content.innerHTML = lab2[sec] || `<p>Розділ “${sec}” у підготовці.</p>`;
        } else if (labId === 3) {
          setActivePill(sideMenuLab3, sec);
          content.innerHTML = lab3[sec] || `<p>Розділ “${sec}” у підготовці.</p>`;
        } else if (labId === 4) {
          setActivePill(sideMenuLab4, sec);
          content.innerHTML = lab4[sec] || `<p>Розділ “${sec}” у підготовці.</p>`;
        } else if (labId === 5) {
          setActivePill(sideMenuLab5, sec);
          content.innerHTML = lab5[sec] || `<p>Розділ “${sec}” у підготовці.</p>`;
        } else if (labId === 6) {
          setActivePill(sideMenuLab6, sec);
          content.innerHTML = lab6[sec] || `<p>Розділ “${sec}” у підготовці.</p>`;
        }
      }

      function navigate(labId, sec, push = true) {
        renderLab(labId, sec);
        if (push) {
          const params = new URLSearchParams();
          params.set('lab', labId);
          if (sec) params.set('sec', sec);
          history.pushState({ lab: labId, sec }, '', `?${params.toString()}`);
          document.title = `ЛР №${labId} — Звіти`;
        }
      }

      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.lab);
          const firstSec =
            id === 1 ? 'theme' :
            id === 2 ? 'sel-tags' :
            id === 3 ? 'theme3' :
            id === 4 ? 'theme4' :
            id === 5 ? 'theme5' :
            id === 6 ? 'theme6' :
            null;
          navigate(id, firstSec, true);
        });
      });

      sideMenuLab1.addEventListener('click', (e) => {
              const btn = e.target.closest('button'); 
              if (!btn) return;
              
              if (btn.classList.contains('pill-parent')) {
                const key = btn.dataset.toggle;
                const sub = sideMenuLab1.querySelector(`.sub-menu[data-parent="${key}"]`);
                if (sub) sub.classList.toggle('open');
                return;
              }
              
              if (btn.classList.contains('pill') && btn.dataset.section) {
                navigate(1, btn.dataset.section, true);
              }
            });

      sideMenuLab2.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (btn.classList.contains('pill-parent')) {
          const key = btn.dataset.toggle;
          const sub = sideMenuLab2.querySelector(`.sub-menu[data-parent="${key}"]`);
          if (sub) sub.classList.toggle('open');
          return;
        }

        if (btn.classList.contains('pill') && btn.dataset.section) {
          navigate(2, btn.dataset.section, true);
        }
      });

      sideMenuLab3.addEventListener('click', (e) => {
        const btn = e.target.closest('button'); 
        if (!btn) return;
        if (btn.classList.contains('pill-parent')) {
          const key = btn.dataset.toggle;
          const sub = sideMenuLab3.querySelector(`.sub-menu[data-parent="${key}"]`);
          if (sub) sub.classList.toggle('open');
          return;
        }
        if (btn.classList.contains('pill') && btn.dataset.section) {
          navigate(3, btn.dataset.section, true);
        }
      });

      sideMenuLab4.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill'); 
        if (!btn) return;
        navigate(4, btn.dataset.section, true);
      });

      sideMenuLab5.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        if (btn.classList.contains("pill-parent")) {
          const key = btn.dataset.toggle;
          const sub = sideMenuLab5.querySelector(`.sub-menu[data-parent="${key}"]`);
          if (sub) sub.classList.toggle("open");
          return;
        }
        if (btn.dataset.section) {
          navigate(5, btn.dataset.section, true);
        }
      });

      sideMenuLab6.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        if (btn.classList.contains("pill-parent")) {
          const key = btn.dataset.toggle;
          const sub = sideMenuLab6.querySelector(`.sub-menu[data-parent="${key}"]`);
          if (sub) sub.classList.toggle("open");
          return;
        }
        if (btn.dataset.section) {
          navigate(6, btn.dataset.section, true);
        }
      });

      window.addEventListener('popstate', () => {
        const params = new URLSearchParams(location.search);
        const lab = Number(params.get('lab')) || 1;
        const sec = params.get('sec') ||
          (lab === 1 ? 'theme' :
          lab === 2 ? 'sel-tags' :
          lab === 3 ? 'theme3' :
          lab === 4 ? 'theme4' :
          lab === 5 ? 'theme5' :
          lab === 6 ? 'theme6' :
          null);
        renderLab(lab, sec);
      });

      (function boot() {
        const params = new URLSearchParams(location.search);
        const lab = Number(params.get('lab')) || 1;
        const sec = params.get('sec') ||
          (lab === 1 ? 'theme' :
          lab === 2 ? 'sel-tags' :
          lab === 3 ? 'theme3' :
          lab === 4 ? 'theme4' :
          lab === 5 ? 'theme5' :
          lab === 6 ? 'theme6' :
          null);
        renderLab(lab, sec);
      })();
    })();

    // Загальні обробники подій
    document.addEventListener('click', (event) => {
      if (event.target.id === 'showMeBtn') {
        const input = document.getElementById('showMeInput');
        if (!input) return;
        console.log('Введене значення:', input.value);
      }

      if (event.target.id === 'passwordToggleBtn') {
        const input = document.getElementById('passwordInput');
        if (!input) return;

        if (input.type === 'text') {
          input.type = 'password';
          event.target.textContent = 'Розкрити';
        } else {
          input.type = 'text';
          event.target.textContent = 'Приховати';
        }
      }
    });

    window.addEventListener('click', function (event) {
      const place = document.getElementById('place');
      if (!place) return;
      const clickedInside = place.contains(event.target);
      console.log(clickedInside);
    });

    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (!form.classList.contains('login-form')) return;

      event.preventDefault();

      const { email, password } = form.elements;
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();

      if (!emailValue || !passwordValue) {
        alert('All form fields must be filled in');
        return;
      }

      const formData = {
        email: emailValue,
        password: passwordValue,
      };

      console.log(formData);
      form.reset();
    });

    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
    }

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('change-color')) {
        const newColor = getRandomHexColor();
        document.body.style.backgroundColor = newColor;

        const colorSpan = document.querySelector('.color');
        if (colorSpan) {
          colorSpan.textContent = newColor;
        }
      }
    });

    function createBoxes(amount) {
      const boxesContainer = document.getElementById('boxes');
      if (!boxesContainer) return;

      boxesContainer.innerHTML = '';
      const boxes = [];
      let size = 30;

      for (let i = 0; i < amount; i++) {
        const box = document.createElement('div');
        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        box.style.backgroundColor = getRandomHexColor();
        boxes.push(box);
        size += 10;
      }

      boxesContainer.append(...boxes);
    }

    function destroyBoxes() {
      const boxesContainer = document.getElementById('boxes');
      if (!boxesContainer) return;
      boxesContainer.innerHTML = '';
    }

    document.addEventListener('click', (event) => {
      if (event.target.matches('#controls [data-create]')) {
        const controls = document.getElementById('controls');
        const input = controls.querySelector('input[type="number"]');
        const value = Number(input.value.trim());

        if (value < 1 || value > 100) {
          alert('Value must be between 1 and 100');
          return;
        }

        createBoxes(value);
        input.value = '';
      }

      if (event.target.matches('#controls [data-destroy]')) {
        destroyBoxes();
      }
    });