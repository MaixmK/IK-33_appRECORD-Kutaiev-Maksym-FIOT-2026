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
const lab4 = {
  theme4: `
    <h2>1. ТЕМА, МЕТА, ПОСИЛАННЯ</h2>

    <p><b>1.1 Тема:</b> Розширені можливості Node.js-додатків: логування, завантаження файлів, моніторинг продуктивності.</p>

    <p><b>1.2 Мета:</b> Ознайомитися з розширеними можливостями серверних застосунків на базі Node.js та Express.js. У межах лабораторної роботи необхідно реалізувати логування HTTP-запитів і подій, завантаження файлів на сервер, валідацію файлів, централізовану обробку помилок, вимірювання часу відповіді сервера та базовий моніторинг продуктивності застосунку.</p>

    <p><b>1.3 Опис роботи:</b> Лабораторну роботу виконано на основі вже створеного backend-проєкту для онлайн-каталогу комп’ютерних комплектуючих. У проєкт було додано технічні можливості, необхідні для стабільної роботи серверного застосунку: логування, приймання файлів, перевірку їх типу та розміру, endpoint стану сервера та запуск через PM2.</p>

    <h3 class="muted">1.4 Посилання</h3>

    <div class="link-buttons">
      <a class="btn" href="https://github.com/MaixmK/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій застосунку</a>
      <a class="btn" href="https://maixmk.github.io/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026//" target="_blank" rel="noopener">Жива сторінка застосунку</a>
      <a class="btn" href="https://github.com/MaixmK/IK-33_appRECORD-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій звітів</a>
      <a class="btn" href="https://github.com/MaixmK/backend" target="_blank" rel="noopener">Репозиторій Backend-частини</a>
    </div>
  `,

  theory4: `
    <h2>2. КОРОТКІ ТЕОРЕТИЧНІ ВІДОМОСТІ</h2>

    <p><b>Node.js</b> — це серверне середовище виконання JavaScript, яке дозволяє створювати backend-застосунки, API, обробляти HTTP-запити, працювати з файлами, базами даних та зовнішніми сервісами.</p>

    <p><b>Express.js</b> — це фреймворк для Node.js, який спрощує створення серверів і REST API. Він дозволяє створювати маршрути, підключати middleware, обробляти запити та повертати відповіді клієнту.</p>

    <p><b>Middleware</b> — це проміжна функція, яка виконується між отриманням запиту сервером і формуванням відповіді. Middleware може перевіряти дані, логувати запити, обробляти помилки, перевіряти авторизацію або змінювати об’єкт запиту.</p>

    <p><b>Логування</b> — це процес запису інформації про події, які відбуваються в застосунку. До таких подій належать HTTP-запити, помилки, запуск сервера, час виконання запитів та інші службові повідомлення.</p>

    <p><b>Morgan</b> використовується для автоматичного логування HTTP-запитів. Він виводить у консоль метод запиту, URL, статус відповіді та час виконання.</p>

    <p><b>Winston</b> — це бібліотека для професійного логування подій. Вона дозволяє записувати логи різних рівнів, наприклад <code>info</code> та <code>error</code>, а також зберігати їх у файли.</p>

    <p><b>Multer</b> — це middleware для Express.js, який використовується для обробки файлів, що надходять на сервер у форматі <code>multipart/form-data</code>. За його допомогою можна приймати один або кілька файлів, перевіряти їх тип і розмір та зберігати у визначену папку.</p>

    <p><b>Моніторинг продуктивності</b> дозволяє оцінити стан сервера під час роботи. До основних показників належать uptime, використання оперативної пам’яті, CPU та час відповіді сервера.</p>

    <p><b>PM2</b> — це менеджер процесів для Node.js-застосунків. Він дозволяє запускати сервер у фоновому режимі, переглядати логи, контролювати процеси та виконувати моніторинг використання ресурсів.</p>
  `,

  task4: `
    <h2>3. ПОСТАНОВКА ЗАДАЧІ</h2>

    <p>У межах лабораторної роботи необхідно було розширити існуючий backend-проєкт онлайн-каталогу комп’ютерних комплектуючих. Основна увага приділялась не створенню нових бізнес-сутностей, а покращенню технічної частини серверного застосунку.</p>

    <p>Потрібно було реалізувати такі завдання:</p>

    <ul>
      <li>запустити серверний застосунок на базі Node.js та Express;</li>
      <li>підключити Morgan для логування HTTP-запитів у консоль;</li>
      <li>інтегрувати Winston для файлового логування подій;</li>
      <li>реалізувати запис логів у файли <code>app.log</code> та <code>error.log</code>;</li>
      <li>створити middleware для централізованої обробки помилок;</li>
      <li>реалізувати endpoint <code>/upload</code> для завантаження одного файлу;</li>
      <li>реалізувати endpoint <code>/upload-multiple</code> для завантаження кількох файлів;</li>
      <li>додати валідацію типу та розміру файлів;</li>
      <li>створити endpoint <code>/status</code> для перегляду стану сервера;</li>
      <li>реалізувати middleware для вимірювання часу відповіді;</li>
      <li>запустити застосунок через PM2 і перевірити моніторинг.</li>
    </ul>

    <p>Усі зміни було реалізовано в межах уже існуючої структури backend-проєкту, який містить моделі, маршрути, контролери та підключення до бази даних MySQL через Sequelize.</p>
  `,

  structure4: `
    <h2>4. СТРУКТУРА ПРОЄКТУ ПІСЛЯ ВИКОНАННЯ ЛАБОРАТОРНОЇ РОБОТИ</h2>

    <p>Після виконання лабораторної роботи структура backend-проєкту була розширена новими файлами та папками. Основні зміни стосуються логування, завантаження файлів і збереження логів.</p>

    <p><b>Основні елементи структури:</b></p>

    <ul>
      <li><code>server.js</code> — головний файл запуску сервера, підключення middleware, маршрутів і бази даних;</li>
      <li><code>routes/upload.routes.js</code> — маршрути для завантаження одного або кількох файлів;</li>
      <li><code>utils/logger.js</code> — налаштування Winston logger;</li>
      <li><code>uploads/</code> — папка для збереження завантажених файлів;</li>
      <li><code>app.log</code> — файл для інформаційних логів;</li>
      <li><code>error.log</code> — файл для логування помилок;</li>
      <li><code>package.json</code> — файл залежностей і команд запуску.</li>
    </ul>

    <p><i>Приклад структури проєкту:</i></p>

    ${codeBlock(`
backend/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Product.js
│   ├── Order.js
│   └── OrderItem.js
├── routes/
│   ├── auth.routes.js
│   ├── category.routes.js
│   ├── product.routes.js
│   ├── order.routes.js
│   ├── orderItem.routes.js
│   └── upload.routes.js
├── utils/
│   └── logger.js
├── uploads/
├── app.log
├── error.log
├── package.json
└── server.js
`)}

    <p>Така структура дозволяє не перевантажувати головний файл сервера і зберігати код більш організованим. Функціонал завантаження файлів винесено в окремий маршрут, а логування — в окремий службовий модуль.</p>
  `,

  logging4: `
    <h2>5. РЕАЛІЗАЦІЯ ЛОГУВАННЯ</h2>

    <h3>5.1 Встановлення залежностей</h3>

    <p>Для реалізації логування було встановлено бібліотеки <code>morgan</code> та <code>winston</code>. Morgan використовується для логування HTTP-запитів у консоль, а Winston — для запису подій і помилок у файли.</p>

    <p><i>Команда встановлення:</i></p>

    ${codeBlock(`
npm install morgan winston multer
`)}

    <h3>5.2 Підключення Morgan</h3>

    <p>У файлі <code>server.js</code> було підключено Morgan. Він використовується як middleware і автоматично фіксує всі HTTP-запити до сервера.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
const morgan = require('morgan');

app.use(morgan('combined'));
`)}

    <p>Формат <code>combined</code> дозволяє отримувати розширену інформацію про HTTP-запит: метод, URL, код відповіді, час виконання та інші службові дані.</p>

    <h3>5.3 Налаштування Winston</h3>

    <p>Для файлового логування було створено файл <code>utils/logger.js</code>. У ньому налаштовано Winston logger, який записує інформаційні повідомлення у файл <code>app.log</code>, а помилки — у файл <code>error.log</code>.</p>

    <p><i>Фрагмент коду <code>utils/logger.js</code>:</i></p>

    ${codeBlock(`
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'app.log' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

const logError = (message, error) => {
    logger.error({
        message,
        error: error.message || error
    });
};

module.exports = {
    logger,
    logError
};
`)}

    <p>Використання Winston дозволило зробити логування більш структурованим. Логи зберігаються у форматі JSON, що спрощує їх подальший аналіз.</p>

    <h3>5.4 Логування часу відповіді</h3>

    <p>Для вимірювання часу обробки кожного запиту було створено middleware. На початку запиту зберігається поточний час, а після завершення відповіді обчислюється різниця.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: \`\${duration}ms\`
        });
    });

    next();
});
`)}

    <p>Цей middleware дозволяє визначати, які запити виконуються швидко, а які можуть потребувати оптимізації.</p>

    <h3>5.5 Обробка помилок</h3>

    <p>У кінці файлу <code>server.js</code> було реалізовано глобальний middleware для обробки помилок. Він записує інформацію про помилку у файл логів і повертає клієнту JSON-відповідь.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
app.use((err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack
    });

    res.status(err.status || 500).json({
        message: err.message || 'Внутрішня помилка сервера'
    });
});
`)}

    <p>Завдяки цьому всі помилки обробляються централізовано, а користувач отримує зрозуміле повідомлення у форматі JSON.</p>
  `,

  upload4: `
    <h2>6. РЕАЛІЗАЦІЯ ЗАВАНТАЖЕННЯ ФАЙЛІВ</h2>

    <p>Для завантаження файлів на сервер було використано бібліотеку <code>Multer</code>. Вона дозволяє обробляти запити у форматі <code>multipart/form-data</code>, отримувати файли з форми та зберігати їх у задану директорію.</p>

    <h3>6.1 Створення папки uploads</h3>

    <p>У корені проєкту було створено папку <code>uploads/</code>. У неї зберігаються всі файли, які користувач завантажує через API.</p>

    <p><i>Папка для файлів:</i></p>

    ${codeBlock(`
backend/
└── uploads/
`)}

    <h3>6.2 Створення маршруту upload.routes.js</h3>

    <p>Для зручності код завантаження файлів було винесено в окремий файл <code>routes/upload.routes.js</code>. У ньому налаштовано місце збереження файлів, формування унікальної назви та перевірку типу файлу.</p>

    <p><i>Фрагмент коду <code>routes/upload.routes.js</code>:</i></p>

    ${codeBlock(`
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Дозволено завантажувати тільки JPG, PNG або PDF'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});
`)}

    <p>У цьому коді дозволено завантаження файлів типу JPG, PNG та PDF. Максимальний розмір файлу обмежено до 5 MB.</p>

    <h3>6.3 Завантаження одного файлу</h3>

    <p>Для завантаження одного файлу реалізовано endpoint <code>POST /upload</code>. Файл передається у полі <code>file</code>.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'Файл не було завантажено'
        });
    }

    res.json({
        message: 'Файл успішно завантажено',
        file: req.file
    });
});
`)}

    <h3>6.4 Завантаження кількох файлів</h3>

    <p>Для завантаження кількох файлів реалізовано endpoint <code>POST /upload-multiple</code>. Файли передаються у полі <code>files</code>. Максимальна кількість файлів — 5.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
router.post('/upload-multiple', upload.array('files', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            message: 'Файли не було завантажено'
        });
    }

    res.json({
        message: 'Файли успішно завантажено',
        files: req.files
    });
});
`)}

    <h3>6.5 Підключення маршруту в server.js</h3>

    <p>Після створення маршруту його було підключено у головному файлі сервера <code>server.js</code>.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
const uploadRoutes = require('./routes/upload.routes');

app.use('/', uploadRoutes);
`)}

    <p>Після цього стали доступні маршрути:</p>

    <ul>
      <li><code>POST /upload</code> — завантаження одного файлу;</li>
      <li><code>POST /upload-multiple</code> — завантаження кількох файлів.</li>
    </ul>
  `,

  monitoring4: `
    <h2>7. МОНІТОРИНГ СТАНУ СЕРВЕРА</h2>

    <p>Для перегляду стану сервера було створено endpoint <code>GET /status</code>. Він повертає інформацію про час роботи сервера та використання оперативної пам’яті.</p>

    <p><i>Фрагмент коду:</i></p>

    ${codeBlock(`
app.get('/status', (req, res) => {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    res.json({
        status: 'OK',
        uptime,
        memoryUsage
    });
});
`)}

    <p>Метод <code>process.uptime()</code> повертає час безперервної роботи Node.js-процесу в секундах. Метод <code>process.memoryUsage()</code> повертає інформацію про використання пам’яті.</p>

    <p><i>Приклад відповіді сервера:</i></p>

    ${codeBlock(`
{
  "status": "OK",
  "uptime": 125.43,
  "memoryUsage": {
    "rss": 58925056,
    "heapTotal": 17694720,
    "heapUsed": 10391064,
    "external": 2143045,
    "arrayBuffers": 10515
  }
}
`)}

    <p>Цей endpoint дозволяє швидко перевірити, чи працює сервер, скільки часу він активний і скільки пам’яті використовує.</p>
  `,

  pm2_4: `
    <h2>8. ЗАПУСК ЗАСТОСУНКУ ЧЕРЕЗ PM2</h2>

    <p>Для запуску Node.js-застосунку через менеджер процесів було використано PM2. Він дозволяє запускати сервер у фоновому режимі, переглядати список процесів, логи та моніторити використання ресурсів.</p>

    <h3>8.1 Додавання scripts у package.json</h3>

    <p>У файл <code>package.json</code> було додано команди для запуску сервера та роботи з PM2.</p>

    <p><i>Фрагмент package.json:</i></p>

    ${codeBlock(`
"scripts": {
  "start": "node server.js",
  "pm2:start": "pm2 start server.js --name backend-lab4",
  "pm2:logs": "pm2 logs backend-lab4",
  "pm2:monit": "pm2 monit",
  "pm2:stop": "pm2 stop backend-lab4"
}
`)}

    <h3>8.2 Команди PM2</h3>

    <p><i>Встановлення PM2:</i></p>

    ${codeBlock(`
npm install -g pm2
`)}

    <p><i>Запуск сервера:</i></p>

    ${codeBlock(`
npm run pm2:start
`)}

    <p><i>Перегляд списку процесів:</i></p>

    ${codeBlock(`
pm2 list
`)}

    <p><i>Перегляд логів:</i></p>

    ${codeBlock(`
npm run pm2:logs
`)}

    <p><i>Моніторинг:</i></p>

    ${codeBlock(`
npm run pm2:monit
`)}

    <p>PM2 є корисним інструментом для production-середовища, оскільки дозволяє автоматично керувати процесами Node.js-застосунків і контролювати їх стан.</p>
  `,

testing4: `
  <h2>9. ТЕСТУВАННЯ API</h2>

  <p>Після реалізації функціоналу лабораторної роботи було виконано повне тестування backend-застосунку. Перевірка здійснювалась за допомогою браузера, Postman, файлової системи проєкту, лог-файлів та PM2. У процесі тестування було перевірено запуск сервера, головний маршрут, endpoint моніторингу, логування HTTP-запитів, файлове логування, завантаження одного файлу, завантаження кількох файлів, валідацію файлів, обробку помилок і запуск застосунку через PM2.</p>

  <h3>9.1 Запуск сервера</h3>

  <p>На першому етапі було запущено серверний застосунок. Для запуску використовувалась команда:</p>

  ${codeBlock(`
npm start
`)}

  <p>Після запуску в терміналі з’являється повідомлення про старт сервера. Якщо підключення до бази даних налаштовано правильно, також виводиться повідомлення про успішне підключення до MySQL та синхронізацію моделей.</p>

  <img src="img/lab4/server-start.png" alt="Запуск сервера" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 1 — Запуск backend-сервера у терміналі</i></p>

  <h3>9.2 Перевірка головного маршруту</h3>

  <p>Для перевірки працездатності сервера було виконано GET-запит на головний маршрут застосунку:</p>

  ${codeBlock(`
GET http://localhost:3000/
`)}

  <p>У результаті сервер повертає JSON-відповідь із повідомленням про те, що backend працює. Це підтверджує, що сервер успішно запущений і може обробляти HTTP-запити.</p>

  <p><i>Очікувана відповідь:</i></p>

  ${codeBlock(`
{
  "message": "Backend працює"
}
`)}

  <img src="img/lab4/get-root.png" alt="Перевірка головного маршруту" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 2 — Перевірка головного маршруту GET /</i></p>

  <h3>9.3 Перевірка endpoint /status</h3>

  <p>Для перевірки моніторингу стану сервера було виконано GET-запит на endpoint <code>/status</code>:</p>

  ${codeBlock(`
GET http://localhost:3000/status
`)}

  <p>Цей endpoint повертає інформацію про стан сервера: статус роботи, час безперервної роботи процесу та використання оперативної пам’яті. Для отримання цих даних використовуються методи <code>process.uptime()</code> та <code>process.memoryUsage()</code>.</p>

  <p><i>Приклад очікуваної відповіді:</i></p>

  ${codeBlock(`
{
  "status": "OK",
  "uptime": 125.43,
  "memoryUsage": {
    "rss": 58925056,
    "heapTotal": 17694720,
    "heapUsed": 10391064,
    "external": 2143045,
    "arrayBuffers": 10515
  }
}
`)}

  <img src="img/lab4/status.png" alt="Перевірка endpoint status" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 3 — Перевірка endpoint /status для моніторингу стану сервера</i></p>

  <h3>9.4 Перевірка логування HTTP-запитів Morgan</h3>

  <p>Після виконання запитів до сервера було перевірено роботу бібліотеки Morgan. Вона автоматично виводить у консоль інформацію про кожен HTTP-запит: метод, адресу, код відповіді та час обробки.</p>

  <p>Для перевірки було виконано кілька запитів:</p>

  ${codeBlock(`
GET http://localhost:3000/
GET http://localhost:3000/status
`)}

  <p>У терміналі, де запущений сервер, з’являються записи про виконані запити. Це підтверджує, що middleware Morgan підключений і працює коректно.</p>

  <img src="img/lab4/morgan-console.png" alt="Логи Morgan у консолі" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 4 — Логування HTTP-запитів у консолі за допомогою Morgan</i></p>

  <h3>9.5 Перевірка файлового логування Winston</h3>

  <p>Після виконання запитів було перевірено роботу Winston logger. Для цього відкрито файл <code>app.log</code>, який створюється в корені проєкту. У цьому файлі зберігаються інформаційні повідомлення про роботу застосунку.</p>

  <p>У логах фіксуються такі дані:</p>

  <ul>
    <li>HTTP-метод запиту;</li>
    <li>URL endpoint;</li>
    <li>код відповіді сервера;</li>
    <li>час обробки запиту;</li>
    <li>час створення запису.</li>
  </ul>

  <p><i>Приклад запису в app.log:</i></p>

  ${codeBlock(`
{
  "level": "info",
  "message": {
    "method": "GET",
    "url": "/status",
    "status": 200,
    "responseTime": "5ms"
  },
  "timestamp": "2026-05-14T10:00:00.000Z"
}
`)}

  <img src="img/lab4/app-log.png" alt="Файл app.log" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 5 — Запис інформаційних логів у файл app.log</i></p>

  <h3>9.6 Завантаження одного файлу через /upload</h3>

  <p>Для перевірки завантаження одного файлу було використано endpoint <code>POST /upload</code>. Запит виконувався через Postman у режимі <code>form-data</code>.</p>

  <p>Параметри запиту:</p>

  <ul>
    <li>метод: <code>POST</code>;</li>
    <li>адреса: <code>http://localhost:3000/upload</code>;</li>
    <li>Body: <code>form-data</code>;</li>
    <li>назва поля: <code>file</code>;</li>
    <li>тип поля: <code>File</code>.</li>
  </ul>

  <p>Для тестування було обрано файл дозволеного типу: JPG, PNG або PDF. Після відправлення запиту сервер приймає файл, зберігає його у папку <code>uploads/</code> і повертає інформацію про завантажений файл.</p>

  <p><i>Приклад curl-запиту:</i></p>

  ${codeBlock(`
curl -X POST http://localhost:3000/upload -F "file=@./test.png"
`)}

  <p><i>Приклад очікуваної відповіді:</i></p>

  ${codeBlock(`
{
  "message": "Файл успішно завантажено",
  "file": {
    "fieldname": "file",
    "originalname": "test.png",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "uploads/",
    "filename": "1715000000000-test.png",
    "path": "uploads/1715000000000-test.png",
    "size": 15423
  }
}
`)}

  <img src="img/lab4/upload-one.png" alt="Завантаження одного файлу" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 6 — Завантаження одного файлу через endpoint /upload</i></p>

  <h3>9.7 Перевірка збереження файлу у папці uploads</h3>

  <p>Після успішного завантаження було перевірено файлову систему проєкту. У папці <code>uploads/</code> з’явився новий файл із автоматично сформованою назвою. Це підтверджує, що Multer не лише прийняв файл із запиту, а й зберіг його на сервері.</p>

  <p>Назва файлу формується за принципом:</p>

  ${codeBlock(`
Date.now() + '-' + file.originalname
`)}

  <p>Такий підхід дозволяє уникнути конфліктів між файлами з однаковими назвами.</p>

  <img src="img/lab4/uploads-folder.png" alt="Папка uploads" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 7 — Збереження завантаженого файлу в папці uploads</i></p>

  <h3>9.8 Завантаження кількох файлів через /upload-multiple</h3>

  <p>Для перевірки завантаження кількох файлів було використано endpoint <code>POST /upload-multiple</code>. Запит також виконувався через Postman у режимі <code>form-data</code>.</p>

  <p>Параметри запиту:</p>

  <ul>
    <li>метод: <code>POST</code>;</li>
    <li>адреса: <code>http://localhost:3000/upload-multiple</code>;</li>
    <li>Body: <code>form-data</code>;</li>
    <li>назва поля: <code>files</code>;</li>
    <li>тип поля: <code>File</code>;</li>
    <li>максимальна кількість файлів: 5.</li>
  </ul>

  <p>У Postman було додано кілька полів з однаковою назвою <code>files</code>. Після відправлення запиту сервер повернув масив з інформацією про кожен завантажений файл.</p>

  <p><i>Приклад curl-запиту:</i></p>

  ${codeBlock(`
curl -X POST http://localhost:3000/upload-multiple \\
  -F "files=@./file1.png" \\
  -F "files=@./file2.pdf"
`)}

  <p><i>Приклад очікуваної відповіді:</i></p>

  ${codeBlock(`
{
  "message": "Файли успішно завантажено",
  "files": [
    {
      "fieldname": "files",
      "originalname": "file1.png",
      "mimetype": "image/png",
      "destination": "uploads/"
    },
    {
      "fieldname": "files",
      "originalname": "file2.pdf",
      "mimetype": "application/pdf",
      "destination": "uploads/"
    }
  ]
}
`)}

  <img src="img/lab4/upload-multiple.png" alt="Завантаження кількох файлів" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 8 — Завантаження кількох файлів через endpoint /upload-multiple</i></p>

  <h3>9.9 Перевірка валідації типу файлу</h3>

  <p>Для перевірки валідації типу файлу було виконано спробу завантажити файл недозволеного формату, наприклад <code>.exe</code>, <code>.zip</code> або <code>.txt</code>. Оскільки в налаштуваннях Multer дозволено лише JPG, PNG та PDF, сервер відхиляє такий запит.</p>

  <p>Запит виконувався на endpoint:</p>

  ${codeBlock(`
POST http://localhost:3000/upload
`)}

  <p>У відповідь сервер повертає JSON-повідомлення про помилку. Це підтверджує, що перевірка MIME-типу файлу працює коректно.</p>

  <p><i>Очікувана відповідь:</i></p>

  ${codeBlock(`
{
  "message": "Дозволено завантажувати тільки JPG, PNG або PDF"
}
`)}

  <img src="img/lab4/file-type-error.png" alt="Помилка типу файлу" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 9 — Перевірка валідації типу файлу</i></p>

  <h3>9.10 Перевірка обмеження розміру файлу</h3>

  <p>Також було перевірено обмеження розміру файлу. У налаштуваннях Multer встановлено максимальний розмір файлу 5 MB:</p>

  ${codeBlock(`
limits: {
    fileSize: 1024 * 1024 * 5
}
`)}

  <p>Для перевірки було виконано спробу завантажити файл, розмір якого перевищує встановлене обмеження. Сервер відхилив запит і повернув повідомлення про помилку.</p>

  <p><i>Приклад можливої відповіді:</i></p>

  ${codeBlock(`
{
  "message": "File too large"
}
`)}

  <img src="img/lab4/file-size-error.png" alt="Помилка розміру файлу" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 10 — Перевірка обмеження розміру файлу</i></p>

  <h3>9.11 Перевірка обробки помилок і файлу error.log</h3>

  <p>Після виникнення помилки було перевірено файл <code>error.log</code>. У ньому зберігаються помилки, які були перехоплені глобальним middleware обробки помилок і записані через Winston.</p>

  <p>Це підтверджує, що сервер не завершує роботу аварійно, а коректно обробляє помилку, повертає клієнту JSON-відповідь і записує інформацію про проблему у файл логів.</p>

  <img src="img/lab4/error-log.png" alt="Файл error.log" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 11 — Запис помилки у файл error.log</i></p>

  <h3>9.12 Перевірка логування часу відповіді</h3>

  <p>Окремо було перевірено middleware для вимірювання часу відповіді. Після кожного запиту у файл <code>app.log</code> записується інформація про метод, URL, статус відповіді та час обробки запиту.</p>

  <p>У записах логів потрібно звернути увагу на поле <code>responseTime</code>:</p>

  ${codeBlock(`
{
  "method": "GET",
  "url": "/status",
  "status": 200,
  "responseTime": "4ms"
}
`)}

  <p>Наявність цього поля підтверджує, що middleware коректно вимірює тривалість обробки запитів.</p>

  <img src="img/lab4/response-time-log.png" alt="Логування часу відповіді" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 12 — Логування часу відповіді сервера у app.log</i></p>

  <h3>9.13 Запуск застосунку через PM2</h3>

  <p>Для перевірки запуску застосунку через менеджер процесів PM2 спочатку було встановлено PM2 глобально:</p>

  ${codeBlock(`
npm install -g pm2
`)}

  <p>Після цього застосунок було запущено командою:</p>

  ${codeBlock(`
npm run pm2:start
`)}

  <p>Або альтернативною командою:</p>

  ${codeBlock(`
pm2 start server.js --name backend-lab4
`)}

  <p>Для перевірки списку активних процесів було виконано команду:</p>

  ${codeBlock(`
pm2 list
`)}

  <p>У таблиці PM2 має відображатися процес <code>backend-lab4</code> зі статусом <code>online</code>.</p>

  <img src="img/lab4/pm2-list.png" alt="PM2 list" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 13 — Запуск backend-застосунку через PM2</i></p>

  <h3>9.14 Перегляд логів через PM2</h3>

  <p>Для перегляду логів процесу було використано команду:</p>

  ${codeBlock(`
pm2 logs backend-lab4
`)}

  <p>У результаті в терміналі відображаються службові повідомлення застосунку та інформація про виконані HTTP-запити.</p>

  <img src="img/lab4/pm2-logs.png" alt="PM2 logs" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 14 — Перегляд логів backend-застосунку через PM2</i></p>

  <h3>9.15 Моніторинг процесу через PM2</h3>

  <p>Для перегляду використання пам’яті, CPU та стану процесу було використано команду:</p>

  ${codeBlock(`
pm2 monit
`)}

  <p>У вікні моніторингу PM2 відображається список процесів, поточне використання процесора, оперативної пам’яті та загальна інформація про роботу застосунку.</p>

  <img src="img/lab4/pm2-monit.png" alt="PM2 monit" style="max-width:100%; height:auto; border:1px solid #ccc; margin-top:10px;">
  <p><i>Рис. 15 — Моніторинг продуктивності застосунку через PM2</i></p>

  <h3>9.16 Загальний результат тестування</h3>

  <p>У результаті тестування було підтверджено працездатність усіх реалізованих можливостей лабораторної роботи. Сервер успішно запускається, обробляє HTTP-запити, повертає інформацію про стан через endpoint <code>/status</code>, логує запити у консоль через Morgan, записує інформаційні повідомлення та помилки у файли через Winston, приймає один або кілька файлів через Multer, перевіряє тип і розмір файлів, а також може бути запущений і промоніторений через PM2.</p>

  <p>Таким чином, усі основні завдання лабораторної роботи були виконані та перевірені практично.</p>
`,

  questions4: `
    <h2>10. КОНТРОЛЬНІ ЗАПИТАННЯ</h2>

    <h3>1. Що таке middleware у Node.js?</h3>
    <p><b>Middleware</b> — це проміжна функція в Express.js, яка виконується під час обробки HTTP-запиту. Вона має доступ до об’єктів <code>req</code>, <code>res</code> і функції <code>next()</code>. Middleware може перевіряти дані, логувати запити, обробляти помилки, перевіряти авторизацію або передавати керування наступному обробнику.</p>

    <h3>2. Яка різниця між Morgan і Winston?</h3>
    <p><b>Morgan</b> використовується переважно для автоматичного логування HTTP-запитів. Він показує метод запиту, URL, статус відповіді та час виконання. <b>Winston</b> є більш універсальним інструментом логування. Він дозволяє логувати події різних рівнів, наприклад <code>info</code>, <code>warn</code>, <code>error</code>, і зберігати їх у файли.</p>

    <h3>3. Як працює Multer?</h3>
    <p><b>Multer</b> — це middleware для Express.js, який обробляє запити з файлами у форматі <code>multipart/form-data</code>. Він приймає файл із запиту, перевіряє його параметри, зберігає у визначену папку та додає інформацію про файл до об’єкта <code>req.file</code> або <code>req.files</code>.</p>

    <h3>4. Які метрики продуктивності важливі для серверів?</h3>
    <p>До основних метрик продуктивності сервера належать час відповіді на запит, використання оперативної пам’яті, навантаження CPU, uptime сервера, кількість активних запитів і кількість помилок. Ці показники дозволяють оцінити стабільність і швидкодію застосунку.</p>

    <h3>5. Що таке uptime?</h3>
    <p><b>Uptime</b> — це час безперервної роботи сервера або процесу з моменту його запуску. У Node.js цей показник можна отримати за допомогою методу <code>process.uptime()</code>, який повертає час роботи процесу в секундах.</p>
  `,

  conclusion4: `
    <h2>11. ВИСНОВОК</h2>

    <p>У ході виконання лабораторної роботи було досягнуто поставленої мети. Було вивчено розширені можливості Node.js-додатків та реалізовано їх у вже існуючому backend-проєкті онлайн-каталогу комп’ютерних комплектуючих.</p>

    <p>У межах роботи було підключено логування HTTP-запитів за допомогою Morgan, реалізовано файлове логування подій і помилок через Winston, створено middleware для вимірювання часу відповіді сервера та централізованої обробки помилок. Це зробило серверний застосунок більш зручним для налагодження та аналізу роботи.</p>

    <p>Також було реалізовано завантаження файлів за допомогою Multer. Для цього створено маршрути <code>/upload</code> та <code>/upload-multiple</code>, які дозволяють завантажувати один або кілька файлів. Було додано валідацію типу файлів і обмеження їх розміру, що підвищує безпеку роботи сервера.</p>

    <p>Окремо було створено endpoint <code>/status</code>, який повертає інформацію про uptime сервера та використання оперативної пам’яті. Це дозволяє виконувати базовий моніторинг продуктивності без використання додаткових складних інструментів.</p>

    <p>Для запуску та контролю роботи застосунку було використано PM2. Цей менеджер процесів дозволяє запускати Node.js-сервер у фоновому режимі, переглядати логи та контролювати стан процесу.</p>

    <p>Отже, у результаті виконання лабораторної роботи backend-застосунок став більш надійним, контрольованим і підготовленим до подальшого розвитку. Було закріплено практичні навички роботи з middleware, логуванням, завантаженням файлів, обробкою помилок і моніторингом продуктивності Node.js-застосунків.</p>
  `
};
const lab5 = {
  theme5: `
    <h2>1. ТЕМА, МЕТА, ПОСИЛАННЯ</h2>

    <p><b>Тема:</b> Безпека та продуктивність серверних додатків. Безпека Node.js-додатків. Оптимізація запитів і кешування. Тестування API.</p>

    <p><b>Мета роботи:</b> вдосконалити backend-застосунок інтернет-магазину комп’ютерних комплектуючих, реалізувавши базові механізми безпеки, валідацію даних, обмеження кількості запитів, кешування, оптимізацію REST API, Swagger-документацію, Docker-контейнеризацію та тестування API.</p>

    <p>У межах лабораторної роботи було допрацьовано існуючий серверний застосунок на <b>Node.js</b>, <b>Express</b>, <b>Sequelize</b> та <b>MySQL</b>. Проєкт містить маршрути для користувачів, авторизації, категорій, товарів, замовлень, елементів замовлення та завантаження файлів.</p>

    <p>Основну увагу було приділено маршрутам товарів, оскільки саме <code>GET /products</code> є одним із найбільш використовуваних endpoint у застосунку інтернет-магазину.</p>

    <h3 class="muted"> Посилання</h3>

    <div class="link-buttons">
      <a class="btn" href="https://github.com/MaixmK/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій застосунку</a>
      <a class="btn" href="https://maixmk.github.io/IK-33_appWEB-Kutaiev-Maksym-FIOT-2026//" target="_blank" rel="noopener">Жива сторінка застосунку</a>
      <a class="btn" href="https://github.com/MaixmK/IK-33_appRECORD-Kutaiev-Maksym-FIOT-2026" target="_blank" rel="noopener">Репозиторій звітів</a>
      <a class="btn" href="https://github.com/MaixmK/backend" target="_blank" rel="noopener">Репозиторій Backend-частини</a>
    </div>
  `,

  theory5: `
    <h2>2. КОРОТКІ ТЕОРЕТИЧНІ ВІДОМОСТІ</h2>

    <p><b>Безпека backend-застосунку</b> — це набір підходів, які дозволяють захистити серверну частину від некоректних запитів, надмірного навантаження, несанкціонованого доступу та витоку службової інформації.</p>

    <p><b>Helmet</b> — це middleware для Express, який додає захисні HTTP-заголовки. Наприклад, заголовок <code>X-Content-Type-Options: nosniff</code> забороняє браузеру самостійно визначати тип відповіді.</p>

    <p><b>CORS</b> використовується для налаштування доступу до API з інших доменів. У моєму проєкті CORS дозволяє виконувати запити з frontend-частини до backend API.</p>

    <p><b>Rate limiting</b> — це обмеження кількості запитів від одного клієнта за певний проміжок часу. Такий підхід допомагає захистити сервер від brute-force атак і надмірного навантаження.</p>

    <p><b>Валідація даних</b> потрібна для перевірки даних, які надходять від користувача. У роботі використано <code>express-validator</code>, який перевіряє тіло запиту, параметри маршруту та query-параметри.</p>

    <p><b>JWT</b> використовується для автентифікації користувачів. Після входу користувач отримує access token, який передається в заголовку <code>Authorization</code> для доступу до захищених маршрутів.</p>

    <p><b>Кешування</b> дозволяє тимчасово зберігати результати запитів. Якщо користувач повторно звертається до того самого endpoint з однаковими параметрами, сервер може повернути відповідь із кешу без повторного звернення до бази даних.</p>

    <p><b>Swagger</b> використовується для документування API. <b>Jest</b> і <b>Supertest</b> використовуються для автоматизованого тестування, а <b>Artillery</b> — для навантажувального тестування.</p>
  `,

  task5: `
    <h2>3. ПОСТАНОВКА ЗАДАЧІ</h2>

    <p>Необхідно допрацювати існуючий backend-застосунок інтернет-магазину комп’ютерних комплектуючих, підвищивши його безпеку, продуктивність і зручність тестування.</p>

    <p>У межах лабораторної роботи потрібно виконати такі завдання:</p>

    <ul>
      <li>підключити <code>Helmet</code> для захисту HTTP-заголовків;</li>
      <li>налаштувати <code>CORS</code> для роботи frontend і backend частин;</li>
      <li>підключити <code>compression</code> для стискання відповідей сервера;</li>
      <li>обмежити розмір JSON-запитів до <code>1mb</code>;</li>
      <li>реалізувати глобальний <code>rate-limit</code> для всіх маршрутів API;</li>
      <li>реалізувати окремий login-limiter для маршруту авторизації;</li>
      <li>додати валідацію товарів і query-параметрів через <code>express-validator</code>;</li>
      <li>використати JWT-автентифікацію для захищених маршрутів;</li>
      <li>додати перевірку ролі <code>admin</code> для створення, редагування та видалення товарів;</li>
      <li>реалізувати кешування товарів через Redis або in-memory cache;</li>
      <li>оптимізувати маршрут <code>GET /products</code>;</li>
      <li>додати Swagger-документацію;</li>
      <li>підготувати Dockerfile і docker-compose.yml;</li>
      <li>додати автоматизовані тести через Jest/Supertest;</li>
      <li>провести навантажувальне тестування через Artillery;</li>
      <li>проаналізувати продуктивність до та після оптимізації.</li>
    </ul>
  `,

  structure5: `
    <h2>4. СТРУКТУРА ПРОЄКТУ</h2>

    <p>Після виконання лабораторної роботи структура backend-проєкту була розширена файлами для безпеки, кешування, тестування, документації та контейнеризації.</p>

    <table border="1" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th>Файл</th>
          <th>Призначення</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>app.js</code></td>
          <td>Основна конфігурація Express-застосунку, підключення middleware, маршрутів, Swagger і глобальної обробки помилок.</td>
        </tr>
        <tr>
          <td><code>server.js</code></td>
          <td>Запуск сервера, підключення до MySQL, синхронізація моделей і підключення Redis.</td>
        </tr>
        <tr>
          <td><code>routes/product.routes.js</code></td>
          <td>Маршрути товарів, оптимізований <code>GET /products</code>, кешування, очищення кешу, JWT-захист і перевірка ролі admin.</td>
        </tr>
        <tr>
          <td><code>routes/auth.routes.js</code></td>
          <td>Реєстрація, підтвердження email, авторизація, refresh token, logout і отримання профілю користувача.</td>
        </tr>
        <tr>
          <td><code>middleware/productValidation.middleware.js</code></td>
          <td>Правила валідації для id товару, query-параметрів і тіла запиту товару.</td>
        </tr>
        <tr>
          <td><code>middleware/validate.middleware.js</code></td>
          <td>Централізована обробка помилок валідації.</td>
        </tr>
        <tr>
          <td><code>middleware/auth.middleware.js</code></td>
          <td>Перевірка JWT access token.</td>
        </tr>
        <tr>
          <td><code>middleware/role.middleware.js</code></td>
          <td>Перевірка ролі користувача для адміністративних маршрутів.</td>
        </tr>
        <tr>
          <td><code>middleware/loginLimiter.middleware.js</code></td>
          <td>Обмеження кількості невдалих спроб входу за email.</td>
        </tr>
        <tr>
          <td><code>utils/cache.js</code></td>
          <td>Модуль кешування через Redis або in-memory cache.</td>
        </tr>
        <tr>
          <td><code>utils/token.js</code></td>
          <td>Генерація access token і refresh token.</td>
        </tr>
        <tr>
          <td><code>docs/swagger.js</code></td>
          <td>Swagger-документація API.</td>
        </tr>
        <tr>
          <td><code>tests/app.test.js</code></td>
          <td>Автоматизовані тести API через Jest і Supertest.</td>
        </tr>
        <tr>
          <td><code>artillery/products-load.yml</code></td>
          <td>Сценарій навантажувального тестування маршруту товарів.</td>
        </tr>
        <tr>
          <td><code>Dockerfile</code></td>
          <td>Опис Docker-контейнера Node.js-застосунку.</td>
        </tr>
        <tr>
          <td><code>docker-compose.yml</code></td>
          <td>Запуск API, MySQL і Redis через Docker Compose.</td>
        </tr>
      </tbody>
    </table>
  `,

  security5: `
    <h2>5. РЕАЛІЗАЦІЯ ЗАХИСТУ API</h2>

    <p>Базовий захист API реалізовано у файлі <code>app.js</code>. Для цього було підключено <code>helmet</code>, <code>cors</code>, <code>compression</code>, обмеження розміру запитів і глобальний rate limiter.</p>

    <pre class="code">app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));</pre>

    <p><code>Helmet</code> додає безпечні HTTP-заголовки. <code>CORS</code> дозволяє налаштувати доступ до API з інших джерел. <code>compression</code> стискає відповіді сервера. Обмеження розміру запиту до <code>1mb</code> допомагає зменшити ризик надсилання занадто великих тіл запиту.</p>

    <h3>Глобальне обмеження кількості запитів</h3>

    <p>Для обмеження кількості запитів у файлі <code>app.js</code> використано бібліотеку <code>express-rate-limit</code>. Middleware <code>apiLimiter</code> застосовується до всіх маршрутів через <code>app.use(apiLimiter)</code>.</p>

    <pre class="code">const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX || 3),
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Забагато запитів з цієї IP-адреси. Спробуйте пізніше.'
    }
});

app.use(apiLimiter);</pre>

    <p>Параметр <code>windowMs</code> задає проміжок часу, протягом якого рахуються запити. У моєму випадку це 60 секунд. Параметр <code>max</code> визначає максимальну кількість запитів з однієї IP-адреси за цей час. Якщо користувач перевищує ліміт, сервер повертає статус <code>Забагато запитів з цієї IP-адреси. Спробуйте пізніше.</code>.</p>

    <figure>
      <img src="img/lab5/rate-limit.png" alt="Перевірка rate limit" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 1. Перевірка обмеження кількості запитів через Postman</figcaption>
    </figure>

    <h3>Обмеження спроб входу</h3>

    <p>Окремо у проєкті реалізовано <code>loginLimiter.middleware.js</code>, який використовується у маршруті <code>POST /auth/login</code>. Він блокує користувача за email після кількох невдалих спроб входу.</p>

    <pre class="code">router.post('/login', loginLimiter, async (req, res) =&gt; {
    // логіка авторизації користувача
});</pre>

    <figure>
      <img src="img/lab5/login-limiter.png" alt="Login limiter" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 5. Підключення loginLimiter до маршруту авторизації</figcaption>
    </figure>
  `,

  validation5: `
    <h2>6. РЕАЛІЗАЦІЯ ВАЛІДАЦІЇ ДАНИХ</h2>

    <p>Для перевірки вхідних даних використано бібліотеку <code>express-validator</code>. Усі правила валідації товарів винесено у файл <code>middleware/productValidation.middleware.js</code>.</p>

    <h3>Валідація id товару</h3>

    <pre class="code">const validateProductId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID товару має бути додатним цілим числом')
];</pre>

    <h3>Валідація query-параметрів</h3>

    <p>Для маршруту <code>GET /products</code> перевіряються параметри <code>page</code>, <code>limit</code>, <code>minPrice</code>, <code>maxPrice</code>, <code>category_id</code>, <code>sortBy</code> і <code>sortOrder</code>.</p>

    <pre class="code">const validateProductQuery = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('category_id').optional().isInt({ min: 1 }),
    query('sortBy').optional().isIn(['id', 'name', 'price', 'rating', 'stock_count']),
    query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc'])
];</pre>

    <h3>Валідація тіла запиту товару</h3>

    <pre class="code">const validateProductBody = [
    body('category_id')
        .isInt({ min: 1 })
        .withMessage('category_id обов’язковий і має бути додатним числом'),

    body('name')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Назва товару має містити від 3 до 100 символів'),

    body('description')
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Опис не може перевищувати 1000 символів'),

    body('price')
        .isFloat({ min: 0.01 })
        .withMessage('Ціна має бути числом більше 0'),

    body('stock_count')
        .isInt({ min: 0 })
        .withMessage('Кількість має бути цілим числом від 0'),

    body('rating')
        .optional({ nullable: true })
        .isFloat({ min: 0, max: 5 })
        .withMessage('Рейтинг має бути від 0 до 5')
];</pre>

    <p>Централізована обробка помилок валідації виконується у файлі <code>middleware/validate.middleware.js</code>.</p>

    <pre class="code">module.exports = (req, res, next) =&gt; {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Помилка валідації даних',
            errors: errors.array().map((error) =&gt; ({
                field: error.path,
                message: error.msg
            }))
        });
    }

    next();
};</pre>

    <p>Якщо користувач надсилає неправильні дані, сервер повертає статус <code>400 Bad Request</code> і список помилок.</p>



    <figure>
      <img src="img/lab5/validation-postman.png" alt="Помилка валідації у Postman" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. Перевірка помилки валідації через Postman</figcaption>
    </figure>
  `,

  authRole5: `
    <h2>7. JWT-АВТЕНТИФІКАЦІЯ ТА ПЕРЕВІРКА РОЛІ ADMIN</h2>

    <p>У застосунку реалізовано JWT-автентифікацію. Після успішної авторизації користувач отримує <code>accessToken</code> і <code>refreshToken</code>. Генерація токенів виконується у файлі <code>utils/token.js</code>.</p>

    <pre class="code">const generateAccessToken = (user) =&gt; {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        ACCESS_SECRET,
        { expiresIn: '15m' }
    );
};</pre>

    <p>Для перевірки токена використовується <code>auth.middleware.js</code>. Middleware бере токен із заголовка <code>Authorization</code>, перевіряє його і записує дані користувача в <code>req.user</code>.</p>

    <pre class="code">const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({ message: 'Немає токена' });
}

const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

const decoded = jwt.verify(token, ACCESS_SECRET);
req.user = decoded;</pre>

    <p>Захищений маршрут профілю користувача реалізований у файлі <code>routes/auth.routes.js</code>:</p>

    <pre class="code">router.get('/profile', authMiddleware, async (req, res) =&gt; {
    const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'role', 'is_email_confirmed', 'created_at']
    });

    return res.status(200).json({
        message: 'Доступ дозволено',
        user
    });
});</pre>

    <h3>Перевірка ролі admin</h3>

    <p>Для адміністративних маршрутів використовується <code>role.middleware.js</code>. Він перевіряє, чи є користувач авторизованим і чи має він потрібну роль.</p>

    <pre class="code">module.exports = (...allowedRoles) =&gt; {
    const roles = allowedRoles
        .flat()
        .filter(Boolean)
        .map((role) =&gt; String(role).toLowerCase());

    return (req, res, next) =&gt; {
        if (!req.user) {
            return res.status(401).json({
                message: 'Користувач не авторизований'
            });
        }

        const userRole = String(req.user.role || '').toLowerCase();

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: 'Доступ заборонено. Недостатньо прав',
                requiredRoles: roles,
                userRole
            });
        }

        next();
    };
};</pre>

    <p>У файлі <code>routes/product.routes.js</code> маршрути створення, редагування та видалення товарів захищені через <code>authMiddleware</code> і <code>roleMiddleware('admin')</code>.</p>

    <pre class="code">router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    validateProductBody,
    validate,
    async (req, res) =&gt; {
        // створення товару
    }
);</pre>

    <p>Таким чином, звичайний користувач може переглядати товари, але змінювати їх може лише адміністратор.</p>

    <figure>
      <img src="img/lab5/jwt-auth.png" alt="JWT middleware" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 8. Реалізація перевірки JWT-токена</figcaption>
    </figure>

    <figure>
      <img src="img/lab5/admin-role-products.png" alt="Admin role products" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 9. Захист маршрутів товарів через роль admin</figcaption>
    </figure>
  `,
  jwt5: `
  <h2>7. JWT-АВТЕНТИФІКАЦІЯ ТА ПЕРЕВІРКА РОЛІ ADMIN</h2>

  <p>У серверному застосунку інтернет-магазину комп’ютерних комплектуючих реалізовано JWT-автентифікацію. Вона використовується для захисту приватних маршрутів API, щоб доступ до них мали тільки авторизовані користувачі.</p>

  <p>Після успішної авторизації користувач отримує <code>accessToken</code> і <code>refreshToken</code>. Access token використовується для доступу до захищених маршрутів, а refresh token може використовуватися для оновлення access token після завершення його терміну дії.</p>

  <p>Токен передається у заголовку запиту:</p>

  <pre class="code">Authorization: Bearer YOUR_ACCESS_TOKEN</pre>

  <p>Якщо користувач не передає токен, сервер не дозволяє виконати захищену дію та повертає помилку авторизації.</p>

  <figure>
    <img src="img/lab5/jwt-no-token.png" alt="Спроба доступу без JWT-токена" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 1. Спроба створення товару без JWT-токена</figcaption>
  </figure>

  <p>На рисунку показано спробу виконати запит <code>POST /products</code> без заголовка <code>Authorization</code>. Сервер повертає помилку, оскільки створення товару є захищеною операцією.</p>

  <h3>Реєстрація адміністратора</h3>

  <p>Для перевірки ролей було створено користувача з роллю <code>admin</code>. Саме адміністратор має право створювати, редагувати та видаляти товари в системі.</p>

  <p>Запит для реєстрації адміністратора:</p>

  <pre class="code">POST http://localhost:3000/auth/register

{
  "name": "Admin3",
  "email": "admin3@example.com",
  "password": "qwerty123",
  "confirmPassword": "qwerty123",
  "role": "admin"
}</pre>

  <figure>
    <img src="img/lab5/admin-register.png" alt="Реєстрація адміністратора" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 2. Реєстрація користувача з роллю admin</figcaption>
  </figure>

  <p>Після реєстрації користувач повинен підтвердити email. Для цього використовується токен підтвердження, який повертається сервером після створення облікового запису.</p>

  <pre class="code">POST http://localhost:3000/auth/confirm-email

{
  "token": "EMAIL_CONFIRM_TOKEN"
}</pre>

  <figure>
    <img src="img/lab5/admin-confirm-email.png" alt="Підтвердження email адміністратора" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 3. Підтвердження email адміністратора</figcaption>
  </figure>

  <h3>Авторизація та отримання JWT-токена</h3>

  <p>Після підтвердження email адміністратор може авторизуватися через маршрут <code>POST /auth/login</code>. У разі правильного email і пароля сервер повертає JWT-токени.</p>

  <pre class="code">POST http://localhost:3000/auth/login

{
  "email": "admin@example.com",
  "password": "qwerty123"
}</pre>

  <p>У відповіді сервер повертає <code>accessToken</code>. Саме його потрібно використовувати у заголовку <code>Authorization</code> для доступу до захищених маршрутів.</p>

  <figure>
    <img src="img/lab5/admin-login.png" alt="Авторизація адміністратора" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 4. Авторизація адміністратора та отримання accessToken</figcaption>
  </figure>

  <h3>Перевірка профілю через JWT</h3>

  <p>Для перевірки роботи JWT було виконано запит до маршруту <code>GET /auth/profile</code>. У заголовку запиту було передано access token адміністратора.</p>

  <pre class="code">GET http://localhost:3000/auth/profile

Authorization: Bearer ADMIN_ACCESS_TOKEN</pre>

  <p>Якщо токен правильний, сервер повертає дані авторизованого користувача. У відповіді можна побачити ім’я, email і роль користувача.</p>

  <figure>
    <img src="img/lab5/profile-jwt.png" alt="Перевірка профілю через JWT" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 5. Отримання профілю користувача за допомогою JWT</figcaption>
  </figure>

  <h3>Перевірка ролі admin</h3>

  <p>У проєкті створення, редагування та видалення товарів доступне тільки користувачу з роллю <code>admin</code>. Це потрібно для того, щоб звичайні користувачі не могли змінювати каталог товарів інтернет-магазину.</p>

  <p>Для перевірки ролі було виконано запит на створення товару з JWT-токеном адміністратора:</p>

  <pre class="code">POST http://localhost:3000/products

Authorization: Bearer ADMIN_ACCESS_TOKEN

{
  "category_id": 1,
  "name": "SSD Samsung 1TB",
  "description": "NVMe SSD накопичувач",
  "price": 3499.99,
  "stock_count": 15,
  "rating": 4.8
}</pre>

  <p>Оскільки запит виконується з токеном користувача, який має роль <code>admin</code>, сервер дозволяє створення товару та повертає відповідь зі статусом <code>201 Created</code>.</p>

  <figure>
    <img src="img/lab5/product-create-admin.png" alt="Створення товару адміністратором" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 6. Успішне створення товару користувачем з роллю admin</figcaption>
  </figure>

  <p>Таким чином, у застосунку реалізовано два рівні захисту: JWT перевіряє, чи користувач авторизований, а перевірка ролі визначає, чи має він право виконувати адміністративні операції.</p>
`,

  cache5: `
    <h2>8. РЕАЛІЗАЦІЯ КЕШУВАННЯ</h2>

    <p>Для кешування у проєкті створено файл <code>utils/cache.js</code>. У ньому реалізовано роботу з Redis і fallback на in-memory cache через бібліотеку <code>node-cache</code>.</p>

    <pre class="code">const memoryCache = new NodeCache({
    stdTTL: Number(process.env.CACHE_TTL || 60)
});

let redisClient = null;
let redisReady = false;</pre>

    <p>Підключення Redis виконується у функції <code>connectRedis()</code>. Якщо змінна <code>REDIS_ENABLED</code> не дорівнює <code>true</code>, Redis не використовується, а застосунок переходить на кешування в пам’яті.</p>

    <pre class="code">async function connectRedis() {
    if (process.env.REDIS_ENABLED !== 'true') {
        logger.info('Redis вимкнено. Використовується in-memory cache.');
        return null;
    }

    redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    await redisClient.connect();
    redisReady = true;
}</pre>

    <p>Для роботи з кешем реалізовано функції <code>getCache()</code>, <code>setCache()</code> і <code>delCacheByPrefix()</code>.</p>

    <pre class="code">async function getCache(key) {
    if (redisReady && redisClient) {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }

    return memoryCache.get(key) || null;
}

async function setCache(key, value, ttl = Number(process.env.CACHE_TTL || 60)) {
    if (redisReady && redisClient) {
        await redisClient.setEx(key, ttl, JSON.stringify(value));
        return;
    }

    memoryCache.set(key, value, ttl);
}</pre>

    <p>У маршруті <code>GET /products</code> ключ кешу формується на основі query-параметрів. Це дозволяє окремо кешувати різні варіанти запиту, наприклад різні сторінки, сортування або фільтри.</p>

    <pre class="code">const cacheKey = 'products:' + JSON.stringify(req.query);
const cachedProducts = await getCache(cacheKey);

if (cachedProducts) {
    return res.json({
        source: 'cache',
        ...cachedProducts
    });
}</pre>

    <p>Якщо даних у кеші немає, сервер звертається до бази даних, формує відповідь і записує її в кеш:</p>

    <pre class="code">const response = {
    source: 'database',
    page,
    limit,
    total: result.count,
    totalPages: Math.ceil(result.count / limit),
    data: result.rows
};

await setCache(cacheKey, response);
res.json(response);</pre>

    <p>Після створення, редагування або видалення товару кеш очищається через <code>delCacheByPrefix('products:')</code>.</p>

    <pre class="code">await delCacheByPrefix('products:');</pre>

    <figure>
      <img src="img/lab5/cache-database.png" alt="Дані з database" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 11. Перший запит до товарів із джерелом database</figcaption>
    </figure>

    <figure>
      <img src="img/lab5/cache-hit.png" alt="Дані з cache" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 12. Повторний запит до товарів із джерелом cache</figcaption>
    </figure>
  `,

  optimization5: `
    <h2>9. ОПТИМІЗАЦІЯ МАРШРУТУ GET /products</h2>

    <p>Для оптимізації було обрано маршрут <code>GET /products</code>, оскільки він повертає список товарів інтернет-магазину і може часто використовуватися користувачами.</p>

    <p>У маршруті реалізовано такі механізми оптимізації:</p>

    <ul>
      <li>пагінація через <code>page</code> і <code>limit</code>;</li>
      <li>фільтрація за категорією через <code>category_id</code>;</li>
      <li>фільтрація за мінімальною та максимальною ціною через <code>minPrice</code> і <code>maxPrice</code>;</li>
      <li>пошук товару за назвою через <code>search</code>;</li>
      <li>сортування за <code>id</code>, <code>name</code>, <code>price</code>, <code>rating</code> або <code>stock_count</code>;</li>
      <li>вибір тільки потрібних полів через <code>attributes</code>;</li>
      <li>підключення категорії товару через <code>include</code>;</li>
      <li>кешування результату запиту.</li>
    </ul>

    <pre class="code">const page = Number(req.query.page || 1);
const limit = Number(req.query.limit || 10);
const offset = (page - 1) * limit;
const sortBy = req.query.sortBy || 'id';
const sortOrder = String(req.query.sortOrder || 'ASC').toUpperCase();

const where = {};

if (req.query.category_id) {
    where.category_id = Number(req.query.category_id);
}

if (req.query.minPrice || req.query.maxPrice) {
    where.price = {};
    if (req.query.minPrice) where.price[Op.gte] = Number(req.query.minPrice);
    if (req.query.maxPrice) where.price[Op.lte] = Number(req.query.maxPrice);
}

if (req.query.search) {
    where.name = { [Op.like]: '%' + req.query.search + '%' };
}</pre>

    <p>Для отримання товарів використано метод <code>findAndCountAll()</code>, який дозволяє одночасно отримати записи та загальну кількість елементів для пагінації.</p>

    <pre class="code">const result = await Product.findAndCountAll({
    where,
    attributes: ['id', 'category_id', 'name', 'price', 'stock_count', 'rating'],
    include: [{
        model: Category,
        attributes: ['id', 'name']
    }],
    order: [[sortBy, sortOrder]],
    limit,
    offset
});</pre>

    <p>У відповіді сервер повертає інформацію про сторінку, ліміт, загальну кількість товарів, кількість сторінок і самі дані.</p>

    <pre class="code">{
    "source": "database",
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "data": []
}</pre>

    <p>Окремо в моделі <code>Product</code> додано індекси для полів, які часто використовуються під час фільтрації, пошуку та сортування.</p>

    <figure>
      <img src="img/lab5/products-optimized-postman.png" alt="Оптимізований GET products у Postman" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 14. Перевірка пагінації, фільтрації та сортування товарів</figcaption>
    </figure>
  `,

  swagger5: `
    <h2>10. SWAGGER-ДОКУМЕНТАЦІЯ ТА DOCKER-КОНТЕЙНЕРИЗАЦІЯ</h2>

    <h3>Swagger-документація</h3>

    <p>Для документування API у проєкті створено файл <code>docs/swagger.js</code>. У ньому описано документацію для REST API інтернет-магазину комп’ютерних комплектуючих.</p>

    <pre class="code">const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PC Components Store API',
            version: '1.0.0',
            description: 'Документація REST API для лабораторної роботи №5'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: []
};</pre>

    <p>Swagger UI підключено у файлі <code>app.js</code> за маршрутом <code>/api-docs</code>.</p>

    <pre class="code">app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));</pre>

    <p>Після запуску сервера документація доступна за адресою:</p>

    <pre class="code">http://localhost:3000/api-docs</pre>

    <figure>
      <img src="img/lab5/swagger.png" alt="Swagger документація" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 15. Відображення Swagger-документації API</figcaption>
    </figure>

    <h3>Docker-контейнеризація</h3>

    <p>Для контейнеризації проєкту створено <code>Dockerfile</code>. Він використовує образ <code>node:20-alpine</code>, копіює файли проєкту, встановлює залежності та запускає сервер.</p>

    <pre class="code">FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</pre>

    <p>Також створено <code>docker-compose.yml</code>, який дозволяє запускати кілька сервісів одночасно:</p>

    <ul>
      <li><code>api</code> — Node.js backend-застосунок;</li>
      <li><code>mysql</code> — база даних MySQL;</li>
      <li><code>redis</code> — Redis для кешування.</li>
    </ul>

    <p>Запуск контейнерів виконується командою:</p>

    <pre class="code">docker compose up --build</pre>

    <figure>
      <img src="img/lab5/docker-compose-file.png" alt="Docker compose файл" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 16. Файл docker-compose.yml для запуску API, MySQL і Redis</figcaption>
    </figure>

    <figure>
      <img src="img/lab5/docker-compose-run.png" alt="Запуск Docker Compose" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 17. Запуск застосунку через Docker Compose</figcaption>
    </figure>

        <figure>
      <img src="img/lab5/docker.png" alt="Запуск Docker Compose" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 17. Запуск застосунку через Docker Compose</figcaption>
    </figure>
  `,

testing5: `
  <h2>11. ТЕСТУВАННЯ API ЧЕРЕЗ POSTMAN</h2>

  <p>Для перевірки роботи backend-застосунку було виконано ручне тестування API через Postman. У процесі тестування перевірялися основні маршрути застосунку, отримання списку товарів, кешування, фільтрація, сортування, пошук, JWT-автентифікація, перевірка ролі адміністратора, валідація даних, rate-limit та login-limiter.</p>

  <h3>1. Перевірка головного маршруту</h3>

  <p>Спочатку було перевірено головний маршрут API:</p>

  <pre class="code">GET http://localhost:3000/</pre>

  <p>Сервер повертає повідомлення про те, що backend-застосунок працює.</p>

  <figure>
    <img src="img/lab5/api-root.png" alt="Перевірка головного маршруту API" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 18. Перевірка головного маршруту API</figcaption>
  </figure>

  <h3>2. Перевірка стану сервера</h3>

  <p>Для перевірки стану сервера було використано маршрут:</p>

  <pre class="code">GET http://localhost:3000/status</pre>

  <p>У відповіді сервер повертає інформацію про стан застосунку, час роботи, використання пам’яті та CPU.</p>

  <figure>
    <img src="img/lab5/api-status.png" alt="Перевірка стану сервера" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 19. Перевірка endpoint /status</figcaption>
  </figure>

  <h3>3. Отримання списку товарів</h3>

  <p>Для перевірки маршруту товарів було виконано GET-запит з параметрами пагінації:</p>

  <pre class="code">GET http://localhost:3000/products?page=1&amp;limit=10</pre>

  <p>У відповіді сервер повертає список товарів, номер сторінки, ліміт, загальну кількість товарів і кількість сторінок.</p>

  <figure>
    <img src="img/lab5/products-list.png" alt="Отримання списку товарів" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 20. Отримання списку товарів з пагінацією</figcaption>
  </figure>

  <h3>4. Перевірка кешування</h3>

  <p>Для перевірки кешування було двічі виконано однаковий GET-запит:</p>

  <pre class="code">GET http://localhost:3000/products?page=1&amp;limit=10&amp;sortBy=price&amp;sortOrder=ASC</pre>

  <p>Перший запит повертає <code>source: database</code>, тобто дані були отримані з бази даних.</p>

  <figure>
    <img src="img/lab5/cache-database.png" alt="Перший запит до товарів із database" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 21. Перший запит до товарів із джерелом database</figcaption>
  </figure>

  <p>Повторний запит з такими самими параметрами повертає <code>source: cache</code>, тобто відповідь була отримана з кешу.</p>

  <figure>
    <img src="img/lab5/cache-hit.png" alt="Повторний запит до товарів із cache" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 22. Повторний запит до товарів із джерелом cache</figcaption>
  </figure>

  <h3>5. Перевірка пагінації, фільтрації та сортування</h3>

  <p>Для перевірки оптимізованого маршруту було виконано запит з параметрами <code>page</code>, <code>limit</code>, <code>minPrice</code>, <code>maxPrice</code>, <code>sortBy</code> та <code>sortOrder</code>.</p>

  <pre class="code">GET http://localhost:3000/products?page=1&amp;limit=5&amp;minPrice=1000&amp;maxPrice=50000&amp;sortBy=price&amp;sortOrder=DESC</pre>

  <figure>
    <img src="img/lab5/products-optimized-postman.png" alt="Оптимізований GET products у Postman" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 23. Перевірка пагінації, фільтрації та сортування товарів</figcaption>
  </figure>

  <h3>6. Перевірка пошуку товарів</h3>

  <p>Для перевірки пошуку було виконано GET-запит з параметром <code>search</code>. Сервер повертає тільки ті товари, у назві яких є вказаний пошуковий запит.</p>

  <pre class="code">GET http://localhost:3000/products?search=SSD</pre>

  <figure>
    <img src="img/lab5/products-search.png" alt="Пошук товарів" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. Перевірка пошуку товару за назвою</figcaption>
  </figure>

  <h3>7. Перевірка JWT-захисту без токена</h3>

  <p>Маршрут створення товару є захищеним. Якщо виконати запит без JWT-токена, сервер не дозволяє створити товар і повертає помилку авторизації.</p>

  <pre class="code">POST http://localhost:3000/products</pre>

  <p>Очікуваний результат:</p>

  <pre class="code">{
  "message": "Немає токена"
}</pre>

  <figure>
    <img src="img/lab5/jwt-no-token.png" alt="Спроба створення товару без JWT-токена" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 25. Спроба створення товару без JWT-токена</figcaption>
  </figure>

  <h3>8. Реєстрація адміністратора</h3>

  <p>Для перевірки ролей було створено користувача з роллю <code>admin</code>.</p>

  <pre class="code">POST http://localhost:3000/auth/register

{
  "name": "Admin3",
  "email": "admin3@example.com",
  "password": "qwerty123",
  "confirmPassword": "qwerty123",
  "role": "admin"
}</pre>

  <figure>
    <img src="img/lab5/admin-register.png" alt="Реєстрація адміністратора" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 26. Реєстрація користувача з роллю admin</figcaption>
  </figure>

  <h3>9. Підтвердження email</h3>

  <p>Після реєстрації email користувача було підтверджено за допомогою токена підтвердження.</p>

  <pre class="code">POST http://localhost:3000/auth/confirm-email

{
  "token": "EMAIL_CONFIRM_TOKEN"
}</pre>

  <figure>
    <img src="img/lab5/admin-confirm-email.png" alt="Підтвердження email адміністратора" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 27. Підтвердження email адміністратора</figcaption>
  </figure>

  <h3>10. Авторизація адміністратора</h3>

  <p>Після підтвердження email було виконано авторизацію адміністратора. У відповіді сервер повернув <code>accessToken</code> і <code>refreshToken</code>.</p>

  <pre class="code">POST http://localhost:3000/auth/login

{
  "email": "admin3@example.com",
  "password": "qwerty123"
}</pre>

  <figure>
    <img src="img/lab5/admin-login.png" alt="Авторизація адміністратора" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 28. Авторизація адміністратора та отримання JWT-токена</figcaption>
  </figure>

  <h3>11. Перевірка профілю через JWT</h3>

  <p>Для перевірки роботи JWT було виконано запит до профілю користувача з передачею <code>accessToken</code> у заголовку <code>Authorization</code>.</p>

  <pre class="code">GET http://localhost:3000/auth/profile

Authorization: Bearer ADMIN_ACCESS_TOKEN</pre>

  <figure>
    <img src="img/lab5/profile-jwt.png" alt="Профіль користувача через JWT" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 29. Отримання профілю авторизованого користувача через JWT</figcaption>
  </figure>

  <h3>12. Перевірка валідації даних</h3>

  <p>Для перевірки валідації було виконано запит на створення товару з неправильними даними. Запит виконувався з admin-токеном, тому сервер дійшов до перевірки тіла запиту і повернув помилку валідації.</p>

  <pre class="code">POST http://localhost:3000/products

Authorization: Bearer ADMIN_ACCESS_TOKEN

{
  "category_id": 0,
  "name": "PC",
  "price": -1,
  "stock_count": -5,
  "rating": 10
}</pre>

  <figure>
    <img src="img/lab5/validation-postman.png" alt="Помилка валідації" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 30. Перевірка помилки валідації через Postman</figcaption>
  </figure>

  <h3>13. Успішне створення товару адміністратором</h3>

  <p>Після авторизації адміністратор може створити товар, передавши accessToken у заголовку <code>Authorization</code>. Це підтверджує роботу JWT-захисту та перевірки ролі <code>admin</code>.</p>

  <pre class="code">POST http://localhost:3000/products

Authorization: Bearer ADMIN_ACCESS_TOKEN

{
  "category_id": 1,
  "name": "SSD Samsung 1TB",
  "description": "NVMe SSD накопичувач",
  "price": 3499.99,
  "stock_count": 15,
  "rating": 4.8
}</pre>

  <figure>
    <img src="img/lab5/product-create-admin.png" alt="Створення товару адміністратором" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 31. Успішне створення товару адміністратором</figcaption>
  </figure>

  <h3>14. Перевірка rate-limit</h3>

  <p>Для перевірки глобального обмеження кількості запитів було кілька разів поспіль виконано один і той самий запит. Після перевищення ліміту сервер повернув статус <code>429 Too Many Requests</code>.</p>

  <figure>
    <img src="img/lab5/rate-limit.png" alt="Rate limit" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 32. Перевірка спрацювання rate-limit</figcaption>
  </figure>

  <h3>15. Перевірка login-limiter</h3>

  <p>Для перевірки обмеження невдалих спроб входу було кілька разів виконано запит <code>POST /auth/login</code> з неправильним паролем. Після перевищення допустимої кількості спроб сервер повернув повідомлення про тимчасове блокування входу.</p>

  <figure>
    <img src="img/lab5/login-limiter.png" alt="Login limiter" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
    <figcaption>Рис. 33. Перевірка обмеження невдалих спроб входу</figcaption>
  </figure>
`,
  autoTesting5: `
    <h2>12. АВТОМАТИЗОВАНЕ ТЕСТУВАННЯ API</h2>

    <p>Для автоматизованого тестування API використано <code>Jest</code> і <code>Supertest</code>. Тести знаходяться у файлі <code>tests/app.test.js</code>.</p>

    <p>У тестах перевіряється:</p>

    <ul>
      <li>доступність головного маршруту <code>GET /</code>;</li>
      <li>робота маршруту <code>GET /status</code>;</li>
      <li>наявність security headers від Helmet;</li>
      <li>захист маршруту <code>POST /products</code> без JWT-токена;</li>
      <li>валідація некоректних даних при створенні товару з admin-токеном.</li>
    </ul>

    <p>Приклад тесту головного маршруту:</p>

    <pre class="code">test('GET / повертає статус 200', async () =&gt; {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Backend працює');
});</pre>

    <p>Приклад тесту для <code>/status</code>:</p>

    <pre class="code">test('GET /status повертає інформацію про сервер', async () =&gt; {
    const response = await request(app).get('/status');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body).toHaveProperty('memoryUsage');
});</pre>

    <p>Після підключення JWT-захисту до <code>POST /products</code> запит без токена має повертати <code>401</code>, а не <code>400</code>.</p>

    <pre class="code">test('POST /products без токена повертає 401', async () =&gt; {
    const response = await request(app)
        .post('/products')
        .send({
            category_id: 1,
            name: 'SSD Samsung 1TB',
            price: 3499.99,
            stock_count: 15
        });

    expect(response.statusCode).toBe(401);
});</pre>

    <p>Тест на наявність заголовків Helmet:</p>

    <pre class="code">test('Helmet додає безпечні HTTP-заголовки', async () =&gt; {
    const response = await request(app).get('/');

    expect(response.headers).toHaveProperty('x-content-type-options');
});</pre>

    <p>Запуск тестів виконується командою:</p>

    <pre class="code">npm test</pre>

    <figure>
      <img src="img/lab5/jest-tests-result.png" alt="Результат Jest тестів" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. 34. Результат виконання автоматизованих тестів</figcaption>
    </figure>
  `,

  loadTesting5: `
    <h2>13. НАВАНТАЖУВАЛЬНЕ ТЕСТУВАННЯ ЧЕРЕЗ ARTILLERY</h2>

    <p>Для перевірки роботи API під навантаженням використано Artillery. У проєкті створено файл <code>artillery/products-load.yml</code>, який тестує маршрут <code>GET /products</code>.</p>

    <pre class="code">config:
  target: "http://localhost:3000"
  phases:
    - duration: 30
      arrivalRate: 10
scenarios:
  - name: "Products cache and pagination load test"
    flow:
      - get:
          url: "/products?page=1&amp;limit=10&amp;sortBy=price&amp;sortOrder=ASC"
      - get:
          url: "/products?page=1&amp;limit=10&amp;sortBy=price&amp;sortOrder=ASC"</pre>

    <p>У сценарії два рази виконується однаковий GET-запит. Це дозволяє перевірити не тільки навантаження на API, а й роботу кешування, оскільки повторний запит може бути оброблений швидше.</p>

    <p>Запуск навантажувального тестування:</p>

    <pre class="code">npm run test:load</pre>

    <p>Також можна виконати швидкий тест командою:</p>

    <pre class="code">artillery quick --count 50 --num 20 http://localhost:3000/products</pre>

    <p>У результаті Artillery показує кількість запитів, статуси відповідей, час відповіді та кількість завершених віртуальних користувачів.</p>

    <pre class="code">PS C:\Frontend\backend> npm run test:load

> backend@1.0.0 test:load
> artillery run artillery/products-load.yml

Test run id: tz56k_3jaxwkt9ezzg55ywzf9d5edajxmxb_py37
Phase started: unnamed (index: 0, duration: 30s) 19:26:39(+0300)

--------------------------------------
Metrics for period to: 19:26:50(+0300) (width: 9.507s)
--------------------------------------

http.codes.200: ................................................................ 100
http.codes.429: ................................................................ 100
http.downloaded_bytes: ......................................................... 100603
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 200
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 21
  mean: ........................................................................ 0.9
  median: ...................................................................... 1
  p95: ......................................................................... 2
  p99: ......................................................................... 3
http.response_time.2xx:
  min: ......................................................................... 0
  max: ......................................................................... 21
  mean: ........................................................................ 1.3
  median: ...................................................................... 1
  p95: ......................................................................... 2
  p99: ......................................................................... 4
http.response_time.4xx:
  min: ......................................................................... 0
  max: ......................................................................... 2
  mean: ........................................................................ 0.6
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 2
http.responses: ................................................................ 200
vusers.completed: .............................................................. 100
vusers.created: ................................................................ 100
vusers.created_by_name.Products cache and pagination load test: ................ 100
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 3.3
  max: ......................................................................... 44.9
  mean: ........................................................................ 6.9
  median: ...................................................................... 4.9
  p95: ......................................................................... 24.3
  p99: ......................................................................... 25.8


--------------------------------------
Metrics for period to: 19:27:00(+0300) (width: 9.507s)
--------------------------------------

http.codes.429: ................................................................ 200
http.downloaded_bytes: ......................................................... 21800
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 200
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 1
  mean: ........................................................................ 0.6
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 1
http.response_time.4xx:
  min: ......................................................................... 0
  max: ......................................................................... 1
  mean: ........................................................................ 0.6
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 1
http.responses: ................................................................ 200
vusers.completed: .............................................................. 100
vusers.created: ................................................................ 100
vusers.created_by_name.Products cache and pagination load test: ................ 100
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 3
  max: ......................................................................... 5.8
  mean: ........................................................................ 3.8
  median: ...................................................................... 3.7
  p95: ......................................................................... 4.7
  p99: ......................................................................... 5.5


Phase completed: unnamed (index: 0, duration: 30s) 19:27:09(+0300)

--------------------------------------
Metrics for period to: 19:27:10(+0300) (width: 9.507s)
--------------------------------------

http.codes.429: ................................................................ 200
http.downloaded_bytes: ......................................................... 21800
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 200
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 2
  mean: ........................................................................ 0.6
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 1
http.response_time.4xx:
  min: ......................................................................... 0
  max: ......................................................................... 2
  mean: ........................................................................ 0.6
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 1
http.responses: ................................................................ 200
vusers.completed: .............................................................. 100
vusers.created: ................................................................ 100
vusers.created_by_name.Products cache and pagination load test: ................ 100
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 3.2
  max: ......................................................................... 4.6
  mean: ........................................................................ 3.6
  median: ...................................................................... 3.6
  p95: ......................................................................... 4.2
  p99: ......................................................................... 4.5


All VUs finished. Total time: 31 seconds

--------------------------------
Summary report @ 19:27:11(+0300)
--------------------------------

http.codes.200: ................................................................ 100
http.codes.429: ................................................................ 500
http.downloaded_bytes: ......................................................... 144203
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 600
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 21
  mean: ........................................................................ 0.7
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 2
http.response_time.2xx:
  min: ......................................................................... 0
  max: ......................................................................... 21
  mean: ........................................................................ 1.3
  median: ...................................................................... 1
  p95: ......................................................................... 2
  p99: ......................................................................... 4
http.response_time.4xx:
  min: ......................................................................... 0
  max: ......................................................................... 2
  mean: ........................................................................ 0.6
  median: ...................................................................... 1
  p95: ......................................................................... 1
  p99: ......................................................................... 2
http.responses: ................................................................ 600
vusers.completed: .............................................................. 300
vusers.created: ................................................................ 300
vusers.created_by_name.Products cache and pagination load test: ................ 300
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 3
  max: ......................................................................... 44.9
  mean: ........................................................................ 4.8
  median: ...................................................................... 3.8
  p95: ......................................................................... 6.4
  p99: ......................................................................... 25.3</pre>
  `,

  performance5: `
    <h2>14. АНАЛІЗ ПРОДУКТИВНОСТІ ДО ТА ПІСЛЯ ОПТИМІЗАЦІЇ</h2>

    <p>До оптимізації маршрут <code>GET /products</code> міг створювати зайве навантаження на базу даних, оскільки кожен запит потребував звернення до MySQL. Крім того, без пагінації сервер міг повертати занадто великий обсяг даних.</p>

    <p>Після оптимізації було реалізовано пагінацію, фільтрацію, пошук, сортування, вибір тільки потрібних полів, підключення категорії товару, індекси в моделі та кешування результатів.</p>

    <table border="1" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th>Показник</th>
          <th>До оптимізації</th>
          <th>Після оптимізації</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Звернення до бази даних</td>
          <td>При кожному GET-запиті</td>
          <td>Перший запит бере дані з БД, повторний може повертатися з кешу</td>
        </tr>
        <tr>
          <td>Обсяг відповіді</td>
          <td>Міг бути великим</td>
          <td>Обмежується через <code>limit</code> і вибір потрібних полів</td>
        </tr>
        <tr>
          <td>Пагінація</td>
          <td>Відсутня або не була основним механізмом</td>
          <td>Реалізована через <code>page</code> і <code>limit</code></td>
        </tr>
        <tr>
          <td>Фільтрація</td>
          <td>Обмежена</td>
          <td>Є фільтрація за категорією та ціною</td>
        </tr>
        <tr>
          <td>Пошук</td>
          <td>Обмежений</td>
          <td>Є пошук за назвою товару</td>
        </tr>
        <tr>
          <td>Сортування</td>
          <td>Обмежене</td>
          <td>Є сортування за <code>id</code>, <code>name</code>, <code>price</code>, <code>rating</code>, <code>stock_count</code></td>
        </tr>
        <tr>
          <td>Кешування</td>
          <td>Відсутнє</td>
          <td>Redis або in-memory cache</td>
        </tr>
        <tr>
          <td>Захист від надмірних запитів</td>
          <td>Відсутній</td>
          <td>Реалізовано через <code>express-rate-limit</code></td>
        </tr>
      </tbody>
    </table>

    <p>Під час перевірки перший запит до <code>/products</code> повертає <code>source: database</code>. Повторний запит з такими самими query-параметрами повертає <code>source: cache</code>. Це підтверджує, що повторні запити не потребують повторного звернення до бази даних.</p>

    <figure>
      <img src="img/lab5/performance-before.png" alt="До оптимізації" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. Перевірка роботи API до використання кешування</figcaption>
    </figure>

    <figure>
      <img src="img/lab5/cache-hit.png" alt="Після оптимізації" style="max-width:100%; border:1px solid #ccc; border-radius:8px;">
      <figcaption>Рис. Перевірка роботи API після оптимізації та кешування</figcaption>
    </figure>
    <p>Для порівняння продуктивності було виконано два однакові GET-запити до маршруту <code>/products</code>. Перший запит отримав дані з бази даних, про що свідчить поле <code>source: database</code>. Повторний запит з такими самими параметрами був оброблений через кеш і повернув <code>source: cache</code>. Це показує, що після оптимізації сервер може не звертатися повторно до бази даних для однакових запитів.</p>
  `,

  examples5: `
    <h2>15. ПРИКЛАДИ ЗАПИТІВ ДЛЯ ПЕРЕВІРКИ</h2>

    <h3>Головний маршрут</h3>
    <pre class="code">curl http://localhost:3000/</pre>

    <h3>Стан сервера</h3>
    <pre class="code">curl http://localhost:3000/status</pre>

    <h3>Swagger-документація</h3>
    <pre class="code">http://localhost:3000/api-docs</pre>

    <h3>Отримання списку товарів</h3>
    <pre class="code">curl -i "http://localhost:3000/products?page=1&amp;limit=10"</pre>

    <h3>Фільтрація товарів за ціною</h3>
    <pre class="code">curl -i "http://localhost:3000/products?minPrice=1000&amp;maxPrice=50000"</pre>

    <h3>Пошук товару за назвою</h3>
    <pre class="code">curl -i "http://localhost:3000/products?search=RTX"</pre>

    <h3>Сортування товарів за ціною</h3>
    <pre class="code">curl -i "http://localhost:3000/products?sortBy=price&amp;sortOrder=DESC"</pre>

    <h3>Реєстрація адміністратора</h3>
    <pre class="code">curl -X POST http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d "{\\"name\\":\\"Admin\\",\\"email\\":\\"admin@example.com\\",\\"password\\":\\"qwerty123\\",\\"confirmPassword\\":\\"qwerty123\\",\\"role\\":\\"admin\\"}"</pre>

    <h3>Підтвердження email</h3>
    <pre class="code">curl -X POST http://localhost:3000/auth/confirm-email \\
  -H "Content-Type: application/json" \\
  -d "{\\"token\\":\\"EMAIL_CONFIRM_TOKEN\\"}"</pre>

    <h3>Авторизація</h3>
    <pre class="code">curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d "{\\"email\\":\\"admin@example.com\\",\\"password\\":\\"qwerty123\\"}"</pre>

    <h3>Отримання профілю</h3>
    <pre class="code">curl http://localhost:3000/auth/profile \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"</pre>

    <h3>Створення товару адміністратором</h3>
    <pre class="code">curl -X POST http://localhost:3000/products \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN" \\
  -d "{\\"category_id\\":1,\\"name\\":\\"SSD Samsung 1TB\\",\\"description\\":\\"NVMe SSD накопичувач\\",\\"price\\":3499.99,\\"stock_count\\":15,\\"rating\\":4.8}"</pre>

    <h3>Запуск автоматизованих тестів</h3>
    <pre class="code">npm test</pre>

    <h3>Запуск навантажувального тестування</h3>
    <pre class="code">npm run test:load</pre>

    <h3>Запуск через Docker</h3>
    <pre class="code">docker compose up --build</pre>
  `,

  questions5: `
    <h2>16. КОНТРОЛЬНІ ЗАПИТАННЯ</h2>

    <h3>1. Що таке Helmet у Node.js?</h3>
    <p>Helmet — це middleware для Express, який додає захисні HTTP-заголовки та допомагає зменшити ризик типових атак на веб-застосунок.</p>

    <h3>2. Для чого використовується rate limiting?</h3>
    <p>Rate limiting використовується для обмеження кількості запитів від одного клієнта за певний проміжок часу. Це допомагає захистити API від brute-force атак і надмірного навантаження.</p>

    <h3>3. Які переваги кешування?</h3>
    <p>Кешування зменшує кількість звернень до бази даних, пришвидшує повторні запити та знижує навантаження на сервер.</p>

    <h3>4. Чим відрізняється unit testing від integration testing?</h3>
    <p>Unit testing перевіряє окремі функції або модулі, а integration testing перевіряє взаємодію кількох частин системи, наприклад маршруту, middleware і бази даних.</p>

    <h3>5. Для чого потрібна валідація даних?</h3>
    <p>Валідація потрібна для перевірки коректності даних, які надходять від користувача. Вона не дозволяє обробляти порожні, неправильні або небезпечні значення.</p>

    <h3>6. Що таке JWT?</h3>
    <p>JWT — це токен, який використовується для автентифікації користувача. Він містить закодовану інформацію про користувача і дозволяє серверу перевіряти доступ до захищених маршрутів.</p>

    <h3>7. Які типи кешування існують?</h3>
    <p>Існують in-memory cache, Redis cache, CDN cache, browser cache та кешування запитів до бази даних.</p>

    <h3>8. Які існують способи оптимізації API?</h3>
    <p>До способів оптимізації API належать пагінація, кешування, індексація бази даних, фільтрація, сортування, вибір лише потрібних полів, стиснення відповідей та оптимізація SQL-запитів.</p>
  `,

  conclusion5: `
    <h2>17. ВИСНОВОК</h2>

    <p>У ході виконання лабораторної роботи було вдосконалено backend-застосунок інтернет-магазину комп’ютерних комплектуючих. Було реалізовано механізми безпеки, оптимізації, кешування, документування та тестування API.</p>

    <p>У файлі <code>app.js</code> було підключено <code>Helmet</code>, <code>CORS</code>, <code>compression</code>, обмеження розміру запитів і глобальний <code>rate-limit</code>. Це підвищило базовий рівень захисту серверного застосунку та дозволило обмежити кількість запитів від одного клієнта.</p>

    <p>Для перевірки вхідних даних було використано <code>express-validator</code>. Правила валідації для товарів і query-параметрів винесено в окремий middleware, а помилки обробляються централізовано через <code>validate.middleware.js</code>.</p>

    <p>У застосунку реалізовано JWT-автентифікацію. Захищені маршрути перевіряють access token, а для адміністративних операцій з товарами використовується <code>roleMiddleware('admin')</code>. Завдяки цьому створювати, редагувати та видаляти товари може лише адміністратор.</p>

    <p>Для підвищення продуктивності було реалізовано кешування товарів через Redis або in-memory cache. Перший запит до <code>/products</code> отримує дані з бази даних, а повторний запит з такими самими параметрами може повертатися з кешу. Після зміни товарів кеш очищається.</p>

    <p>Маршрут <code>GET /products</code> було оптимізовано за допомогою пагінації, фільтрації, пошуку, сортування, вибору потрібних полів і підключення категорії товару. Це зменшує обсяг відповіді та навантаження на базу даних.</p>

    <p>Також було додано Swagger-документацію, Docker-контейнеризацію, автоматизовані тести через Jest/Supertest і навантажувальне тестування через Artillery. У результаті застосунок став більш захищеним, продуктивним, краще задокументованим і зручним для подальшого розвитку.</p>
  `
};
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

        sideMenuLab4.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

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