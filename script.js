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
  <p><b>1.1 Тема:</b> Вибір предметної області. Аналіз, моделювання та розроблення адаптивного web-застосунку для онлайн-каталогу комп’ютерних комплектуючих.</p>
  <p><b>1.2 Мета:</b> Сформулювати ключові складові опису інформаційної системи: актуальність, мету та завдання, об'єкт і предмет роботи, практичне значення, функціональні та нефункціональні вимоги, Use-case та ER-діаграми. На основі досвіду розроблення адаптивного інтерфейсу створити вебзастосунок для підбору ПК-комплектуючих з використанням сучасних засобів верстки для забезпечення коректного відображення на різних пристроях.</p>

  <h3 class="muted">1.3Посилання</h3>

  <div class="link-buttons">
    <a class="btn" href="https://github.com/MaixmK/IK-33_appWEB-Kutaiev-Maksym-FIOT-2025" target="_blank" rel="noopener">Репозиторій застосунку</a>
    <a class="btn" href="https://maixmk.github.io/IK-33_appWEB-Kutaiev-Maksym-FIOT-2025/" target="_blank" rel="noopener">Жива сторінка застосунку</a>
    <a class="btn" href="https://github.com/MaixmK/IK-33_appRECORD-Kutaiev-Maksym-FIOT-2025" target="_blank" rel="noopener">Репозиторій звітів</a>
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
};




      const lab2 = {};
      const lab3 = {};
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
        const btn = e.target.closest('.pill'); if (!btn) return;
        navigate(2, btn.dataset.section, true);
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