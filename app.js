
(async()=>{
 const response=await fetch('illustrations.html');
 if(!response.ok)throw new Error('Illustrations HTTP '+response.status);
 const raw=await response.text();
 const assetVars=raw.match(/<body style="([^"]+)"/)?.[1];
 const pages=raw.match(/const originalPages=(\{[^\r\n]*\});/)?.[1];
 if(!assetVars||!pages)throw new Error('Illustration data missing');
 document.body.setAttribute('style',assetVars);
 const mapSource=document.body.style.getPropertyValue('--map-image').match(/data:image\/jpeg;base64,[A-Za-z0-9+/=]+/)?.[0];
 if(!mapSource)throw new Error('Map missing');
 document.querySelectorAll('[data-game-map]').forEach(img=>{img.src=mapSource;});
 const originalPages=JSON.parse(pages);
 
const travelTasks=["Назови три вещи, которым нужны батарейки. Какую из них Ведьма взяла бы с собой в тёмный лес?","Покажи руками, как прыгает лягушка, и придумай для неё реплику. Сыграй мини-спектакль.","Придумай указатель для места, где ты сейчас. Что на нём написано и куда он ведёт?","Вспомни три вещи, которые качаются. Придумай, как устроить качели для друзей Медведя.","Придумай для Волка салат из трёх овощей разных цветов и дай ему название.","Придумай три узора для шарфа Пастуха по тому, что видишь в поездке. Опиши их или нарисуй на телефоне."];
function original(key,label='Оригинал письма'){
 return '<details class="original"><summary><span class="original-icon" aria-hidden="true">✉</span> '+label+'</summary>'+originalPages[key].map((src,i)=>'<img src="'+src+'" alt="'+label+', страница '+(i+1)+'">').join('')+'</details>';
}
function reward(count){
 const names=['✦ Значок почтальона','❄ Снежный фонарь','🎄 Ёлочная звезда','✉ Золотой конверт','🧭 Волшебный компас','🏅 Медаль зимней почты'];
 return '<h3>Награды Ангелины</h3><p>За каждые пять доставок открывается награда.</p><ul>'+names.map((n,i)=>'<li>'+(count>=5*(i+1)?n:'🔒 За '+5*(i+1)+' доставок')+'</li>').join('')+'</ul>';
}
const RAW="b|12|knight|🎨|Краски|У турнирных ворот у меня попросили герб, а щит у меня пустой. Я люблю красный и верю, что три подковы приносят удачу. Пришли краски, пожалуйста!|Собери герб в мастерской.\nb|20|gnome|🏮|Фонарь|В шахте темно, а у меня обе руки заняты. Мне нужен фонарь, который сам едет за тележкой, переживёт падение и не боится воды.|Нарисуй или опиши, как устроен такой фонарь.\ng|12|duck|🛶|Каяк|Кряк! кря кря\\nкря кряа кря\\nкряякря кря\\nкря кряк кря|В каждой строке спряталась одна лишняя буква. Убери все «кря» и прочитай остаток.|В первой строке после «кря» остаётся «к».|Сделай из букв название маленькой лодки.\ny|2|library|🐈|Кошка|В библиотеке тихо, а по вечерам ещё и одиноко. Хорошо бы найти кошку, которая любит дремать рядом с книгами.|Нарисуй кошку с белыми лапками, полосатым хвостом и одним загнутым ушком.\nb|1|mayor|🗄️|Сейф|В моём кабинете столько важных бумаг, что я заказал бы сейф. Только у замка целых десять цифр! Подскажи, как их запомнить.|Придумай десять цифр и способ запомнить их. Например, разбей их на группы.\ng|1|hen|⌨️|Пишущая машинка|КОКОПРИНЕСИКОКОМНЕПИШУЩУЮКОКОМАШИНКУ|Убери все «КОКО» и раздели оставшиеся буквы на слова.|Первое слово — «принеси».\ny|30|pirate|🥤|Бумажный стакан|На корабле закончились кружки, а бумага у нас ещё есть. Пришли бумажный стакан: очень хочется устроить чаепитие на палубе.|Попробуй сложить стаканчик из квадрата бумаги.\nb|15|ghost|🏆|Кубок|Живу у старой башни, репетирую страшное «бу», а соседи каждый раз смеются. На конкурсе привидений выдают кубок. Обещаю потренироваться!|Произнеси «бу» шёпотом, голосом великана и очень сонным голосом.\ng|2|owl|⏰|Будильник|Я дежурю на башне по ночам, а утром никак не могу проснуться. Что тикает, а в назначенный час звонит?|Отгадай, какой подарок нужен ночной дежурной.|Он звонит утром, когда пора вставать.\ny|5|horse|📅|Календарь|Мой всадник назначил тренировку на мой день рождения. Мне нужен календарь, чтобы заранее отметить важные даты.|Найди, на какой день недели выпадет следующий Новый год, и отметь чей-нибудь день рождения.\nb|2|smith|📘|Книга стихов|Днём я кую подковы, а вечером пишу стихи. На слове «молот» застрял. Пришли книгу стихов, вдруг найду вдохновение!|Подбери рифмы к словам «молот», «огонь» и «зима». Можно сочинить две строчки.\ng|3|mage|🍔|Гамбургер|На моей башне написано моё имя. А обед я записал наоборот: РЕГРУБМАГ. С чтением заклинаний я справляюсь, а с готовкой куда хуже.|Прочитай последнее слово справа налево.|Получится блюдо из булочки с начинкой.\ny|1|baker|🍰|Торт|Я уже напёк столько тортов, что устал от духовки. Пришли торт, которому она вообще не понадобится.|Придумай торт из пряников, крема и фруктов. Можно нарисовать его или приготовить со взрослым.\nb|3|merchant|🪄|Ковёр-самолёт|Моя лавка полна свёртков, а покупатели живут далеко. Вот бы ковёр-самолёт! Только как закрепить посылки, чтобы их не сдуло?|Придумай три правила полёта: для багажа, пассажиров и посадки.\ng|5|archaeologist|📜|Свиток|У старой башни нашёл шесть плит: ■С■В■И■Т■О■К■. Похоже, это подсказка к тому, чего не хватает в моих раскопках.|Прочитай только буквы между чёрными квадратами.|Ищи предмет, который можно развернуть и прочитать.\ny|3|thief|🎭|Маска|Хожу от замка в город в капюшоне. Хочу сыграть на зимнем маскараде, а маски у меня нет.|Сыграй три роли за минуту! Скажи «Письмо доставлено!» как строгая королева, сонный дракон и хитрая лиса. Пусть кто-нибудь угадает, кого ты изображаешь.\nb|5|gardener|🐇|Кролик|У меня на грядке выросло столько капусты, что уже некуда девать. Вот бы появился кролик! И подскажи, что ещё можно придумать с капустой.|Придумай три необычных применения капустного листа.\ng|10|dragon|🧯|Огнетушитель|Апчхи! Снова дым над крышей замка. Пожарная комиссия просит повесить у ворот предмет, которым можно погасить небольшое пламя.|Выбери, что нужно для пожарной безопасности.|Он обычно красный и хранится у выхода.\ny|10|princess|🥟|Галушки|Наш повар исчез, а я так соскучилась по творожным галушкам! В замке я нашла его рецепт и поварской колпак.|Представь, что ты выбираешь угощения для новогоднего бала. Придумай меню из трёх любимых блюд и дай каждому сказочное название. Расскажи или запиши меню.\nb|10|ranger|🔭|Бинокль|Перед праздником нужно пересчитать ёлки на моём участке. Пришли бинокль! И как думаешь, стоит ли считать нарядную ёлку на городской площади?|Рассмотри карту, посчитай ёлки и отдельно реши, включать ли городскую.\ng|15|witch|🔋|Батарейка|У моей избушки в лесу нет розеток. Мой маленький блендер работал давно, а теперь совсем замолчал. Из него вынимается маленький цилиндр.|Догадайся, какой предмет нужно заменить.|Такой же источник питания бывает в пульте.\ny|12|director|🐸|Лягушка|Вожу театр на колёсах. Для спектакля мне нужна лягушка, которая умеет кланяться и прыгать. Поможешь?|Придумай куклу-лягушку из бумаги и разыграй с ней короткую сценку.\nb|30|monster|🪧|Указатель|Я спокойно живу в своей пещере, но рыцари приходят ко мне каждую неделю. Пришли указатель: напишу, куда им лучше идти.|Придумай смешную надпись, после которой рыцари выберут другой путь.\ng|20|bear|🛝|Качели|Мои друзья-зайцы мечтают о подарке. Они сказали «кач», потом «ели», а дальше заговорили все сразу.|Соедини две части слова. Что можно повесить на крепкой ветке?|На этом можно раскачиваться.\ny|15|wolf|🥗|Салат|В лесу все думают, что я ем только мясо. А я хочу большую миску хрустящих овощей. Пришли салат!|Собери салат из трёх овощей или придумай его на бумаге.\nb|50|shepherd|🧶|Спицы|Пока мои овцы пасутся на холмах, я хочу связать карту на шарфе. Пришли спицы, а узоры я подберу с твоей помощью.|Нарисуй разные узоры для моря, леса, холмов и городских крыш.\ng|30|unicorn|🕶️|Тёмные очки|У моего пруда так ярко блестит вода, что даже радугу толком не видно. В записке про подарок две части: «тёмные» и «о_ки».|Вставь недостающую букву и выбери подарок.|Их надевают на нос, когда светит солнце.\ny|20|balloon|🩹|Скотч|В полёте мой шар зацепился за ветку. Пришли скотч: я хочу понять, как сделать заплатку, которая не отлетит на ветру.|Приклей кусочки бумаги к листу разными способами и сравни, какая заплатка лучше держится.\ng|50|prince|🧰|Сундук|На острове Удидуав меня ждал удав. Теперь подхожу к острову Клумданидад и думаю, что там спрятано.|Соедини две первые и две последние буквы названия последнего острова.|Получится слово «клад». В чём его обычно хранят?\ny|50|jelly|🚀|Ракета|Я плыву у берега и мечтаю увидеть звёзды поближе. Пришли ракету, только такую, чтобы в ней хватило места всем моим щупальцам.|Нарисуй ракету для медузы и придумай, как она будет управлять ею.";
(function app() {
const locations={
 knight:['Рыцарь',76,44,'У моря верхом на коне.'],gnome:['Гном',24,94,'У входа в шахту, в красном колпаке.'],duck:['Уточка',27,34,'В воде у замка.'],
 library:['Библиотекарша',35,49,'В очках возле библиотеки.'],mayor:['Бургомистр',41,45,'Усатый горожанин перед зданием на площади.'],hen:['Курица',55,65,'На площади рядом с маленьким курятником.'],
 pirate:['Пират',87,34,'На корабле с чёрным флагом.'],ghost:['Привидение',41,11,'Летает возле старой башни.'],owl:['Сова',61,36,'Сидит в окне круглой башни.'],
 horse:['Конь',76,50,'На берегу, под рыцарем.'],smith:['Кузнец',60,62,'Работает у наковальни.'],mage:['Маг',58,29,'В остроконечной шляпе у круглой башни.'],
 baker:['Кондитер',60,52,'В белом колпаке у открытой ставни.'],merchant:['Купец',45,61,'За прилавком с ценниками.'],archaeologist:['Археолог',53,23,'Человек в шляпе у старой башни.'],
 thief:['Вор',24,41,'В капюшоне на дороге от замка.'],gardener:['Огородник',30,59,'Стоит у грядки с капустой.'],dragon:['Дракон',26,10,'Летает над замком.'],
 princess:['Принцесса',15,17,'Смотрит с балкона замка.'],ranger:['Лесничий',27,74,'В зелёной шляпе среди елей.'],witch:['Ведьма',12,53,'Рядом с лесной избушкой.'],
 director:['Директор театра',45,76,'Едет на фургоне.'],monster:['Чудовище',77,84,'В большой пещере на холме.'],bear:['Медведь',14,64,'Стоит возле трёх зайцев.'],
 wolf:['Волк',10,74,'Выглядывает из-за дерева в лесу.'],shepherd:['Пастух',77,60,'В зелёной шляпе рядом с овцами.'],unicorn:['Единорог',8,84,'Рядом с маленьким прудом.'],
 balloon:['Путешественник',70,17,'Летит на воздушном шаре.'],prince:['Принц',85,18,'На корабле с белыми парусами.'],jelly:['Медуза',90,50,'Розовая, плывёт рядом с берегом.']
};
function giftSticker(letter) {
 const order='gardener witch archaeologist dragon shepherd ghost thief hen director knight unicorn gnome balloon mage jelly bear mayor prince baker smith library duck ranger monster wolf princess merchant pirate owl horse'.split(' ');
 const i=order.indexOf(letter.person);
 const x=[63,150,239,326,414][i%5], y=[129,216,302,391,479,568][Math.floor(i/5)];
 return '<span class="gift-art" aria-hidden="true" style="--sx:'+((x-36)/848*100)+'%;--sy:'+((y-36)/1228*100)+'%"></span>';
}
const types={b:'Творческое письмо',y:'Поделка или опыт',g:'Шифровка'};
const letters=RAW.split('\n').map(line=>{
 const [type,stamp,person,icon,gift,story,task,hint]=line.split('|');
 return {type,stamp,person,icon,gift,story:story.replaceAll('\\n','\n'),task,hint};
});
const $=id=>document.getElementById(id);
$('enter').disabled=false;$('portalEntry').disabled=false;$('loading').hidden=true;
const testing=new URLSearchParams(location.search).get('test')==='1';
const key=testing?'angelina-winter-post-2026-test':'angelina-winter-post-2026';
let state={seen:false,free:testing,done:{},found:{},notes:{},moods:{}};
try{state={...state,...JSON.parse(localStorage.getItem(key)||'{}')};}catch{}
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{}};
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalized=value=>String(value).toLowerCase().replaceAll('ё','е').replace(/[\s-]+/g,'');
const dateParts=()=>Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Sofia',year:'numeric',month:'numeric',day:'numeric'}).formatToParts().map(({type,value})=>[type,Number(value)]));
const date=dateParts();
const available=date.year>2026?31:date.year===2026&&date.month===12?date.day:0;
function availableToday() {
 const date=dateParts();
 return date.year>2026?31:date.year===2026&&date.month===12?date.day:0;
}
const canOpen=day=>day===0||testing||day<=availableToday();
const daysToNewYear=Math.max(0,Math.round((Date.UTC(2027,0,1)-Date.UTC(date.year,date.month-1,date.day))/86400000));
const moods=[['😊','Радостно'],['😌','Спокойно'],['😟','Тревожно'],['😢','Грустно'],['😠','Сердито'],['😴','Устала']];
const finalClues=[['Что украшает крышу одинокой башни?','месяц'],['Кто жуёт траву на холме?','овца'],['Что общего у бургомистра и директора театра?','усы'],['Какой красный гриб растёт в лесу?','мухомор'],['Что охраняет пугало?','капуста'],['Кто плавает в море? Их шестеро.','рыбы']];
let selected=0,view='post',moodDay=Math.min(31,Math.max(1,available)),chosen=false,tip=false,message='',shieldColor='#a93336',shieldIcon='★';
const panel=$('panel');
const nav=[...document.querySelectorAll('[data-view]')];
function recordRoute(){
 const route={winterPost:true,view,day:selected,chosen,tip};
 const current=history.state;
 if(current?.winterPost&&current.view===view&&current.day===selected)history.replaceState(route,'');
 else history.pushState(route,'');
}
history.replaceState({winterPost:true,view:'home',day:0},'');
window.addEventListener('popstate',event=>{
 const route=event.state;
 if(!route?.winterPost||route.view==='home'){
  $('home').hidden=false;$('game').hidden=true;
  $('portal').classList.remove('dive');$('enter').disabled=false;
  delete document.body.dataset.screen;
  selected=0;view='post';chosen=false;tip=false;message='';
  return;
 }
 showGame();$('play').hidden=false;
 selected=canOpen(route.day)?route.day:0;
 view=route.view;chosen=!!route.chosen&&!state.done[selected];tip=!!route.tip;message='';
 render(true,false);
});
function showGame(){ $('home').hidden=true;$('game').hidden=false; }
function begin(){state.seen=true;save();$('play').hidden=false;render(true);}
function switchView(next){view=next;message='';render(true);}
function openLetter(day){if(!canOpen(day))return;selected=day;view='post';chosen=false;tip=false;message='';render(true);}
function maps(){
 $('points').innerHTML='';
 if(view==='mood')return;
 for(const [person,[name,x,y]] of Object.entries(locations)){
   const button=document.createElement('button');
   button.className='point'+(tip&&letters[selected-1]?.person===person?' hint':'');
   button.type='button';
   button.style.setProperty('--x',x+'%');button.style.setProperty('--y',y+'%');
   button.setAttribute('aria-label',name);
   button.onclick=()=>tap(person);
   $('points').append(button);
 }
 $('stickers').innerHTML=letters.map((l,i)=>{
   if(!state.done[i+1])return '';
   const [name,x,y]=locations[l.person];
   return `<span class="sticker" style="--x:${x}%;--y:${y}%" title="${name}: ${l.gift}" aria-label="${l.gift}">${giftSticker(l)}</span>`;
 }).join('');
}
function tap(person){
 const l=letters[selected-1];
 if(!l||selected===31||view==='mood'){message='Здесь живёт '+locations[person][0].toLowerCase()+'.';render();return;}
 if(l.person!==person){message='Это '+locations[person][0]+'. Письмо написал кто-то другой. Попробуй ещё!';render();return;}
 if(chosen){deliver();return;}
 state.found[selected]=true;tip=false;message='Отправитель найден!';view='post';save();render(true);
}
function deliver(){
 const l=letters[selected-1];
 if(!l||!chosen||!state.found[selected]||!canOpen(selected))return;
 state.done[selected]=true;save();chosen=false;view='delivery';render(true);
}
function mapFocus(){
 const point=locations[letters[selected-1]?.person];
 if(!point)return;
 const frame=$('mapframe'),map=$('map');
 frame.scrollLeft=point[1]/100*map.offsetWidth-frame.clientWidth/2;
 frame.scrollTop=point[2]/100*map.offsetHeight-frame.clientHeight/2;
}
function status(){return `<p class="status" role="status">${escape(message)}</p>`;}
function homePost(){
 const done=Object.keys(state.done).filter(d=>Number(d)<=30).length;
 panel.innerHTML=`<div class="eyebrow">Почтовое отделение</div><h2 tabindex="-1">Почтовый ящик</h2><p>До Нового года ${daysToNewYear} дн. · Доставлено ${done} из 30</p><div class="letters">${Array.from({length:31},(_,i)=>{
   const day=i+1,l=letters[i],open=canOpen(day);
   return `<button class="letter-tile" data-day="${day}" data-type="${l?.type??'w'}" aria-label="${day} декабря${state.done[day]?', пройдено':open?'':', закрыто'}" ${open?'':'disabled'}>${day}<br>${state.done[day]?'✓':open?'✉':'🔒'}</button>`;
 }).join('')}</div><p class="muted">${testing?'Тестовый режим. Все письма открыты.':'Письма открываются по дням декабря, по времени Софии.'}</p>${reward(done)}<details><summary>Предисловие и авторы</summary><p class="muted">Карта — Ксения Ефимова, «Праздник в коробке». Семейная адаптация по мотивам «Невероятного почтальона» Юлии Луговской и Анны Бабушкиной.</p>${original('intro','Предисловие')}</details>`;
 panel.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>openLetter(Number(b.dataset.day)));

}
function puzzleShield(){
 return `<div class="shield" id="shield" style="background:${shieldColor}" aria-label="Герб с тремя подковами">${shieldIcon}<br>∪∪∪</div><div class="row">${[['#a93336','Красный'],['#28538b','Синий'],['#285845','Зелёный']].map(([v,n])=>`<button class="ghost" data-color="${v}" aria-pressed="${v===shieldColor}">${n}</button>`).join('')}${['★','⚔','♞'].map(v=>`<button class="ghost" data-symbol="${v}" aria-pressed="${v===shieldIcon}" aria-label="${{'★':'Звезда','⚔':'Мечи','♞':'Конь'}[v]}">${v}</button>`).join('')}</div>`;
}
function letterPanel(){
 const l=letters[selected-1],found=state.found[selected],done=state.done[selected];
 const isGreen=l.type==='g';
 const choices=[l,...[-2,3].map(n=>letters[(selected-1+n+letters.length)%letters.length])];
 choices.push(...choices.splice(0,selected%3));
 panel.innerHTML=`<div class="date-envelope" role="img" aria-label="${selected} декабря"><svg viewBox="0 0 86 56" aria-hidden="true" focusable="false"><rect x="2" y="2" width="82" height="52" rx="7" fill="#b33743" stroke="#ffe6a5" stroke-width="2"/><path d="M4 50L42 24 82 50" fill="none" stroke="#e98578" stroke-width="2"/><path d="M4 6L39 35Q43 39 47 35L82 6" fill="#205742" stroke="#ffda80" stroke-width="2" stroke-linejoin="round"/><circle cx="43" cy="35" r="13" fill="#ffe29b" stroke="#9d472e" stroke-width="1.5"/></svg><span aria-hidden="true">${selected}</span></div><p class="letter-text">${escape(l.story)}</p>${original(l.type+l.stamp)}
 ${found?`<div class="task"><h3>${locations[l.person][0]}</h3><p>${travelTasks[selected-21]?'<strong>Задание в поездке.</strong> ':''}${escape(travelTasks[selected-21]??l.task)}</p>${tip&&l.hint?`<p><strong>Подсказка.</strong> ${escape(l.hint)}</p>`:''}${l.person==='knight'&&!done?puzzleShield():''}${!isGreen&&!done?`<details ${state.notes[selected]?'open':''}><summary>Записать свою идею</summary><label for="note">Заметка к письму</label><textarea id="note">${escape(state.notes[selected])}</textarea></details>`:''}</div>`:'<p>Кто написал письмо? Найди персонажа на карте.</p>'}
 ${tip&&!found?`<p><strong>Подсказка.</strong> ${escape(locations[l.person][3])}</p>`:''}
 ${done?`<p class="skin">${giftSticker(l)}</p><p>Подарок доставлен.</p>`:found?chosen?`<p>В посылке ${l.icon} ${l.gift.toLowerCase()}. Нажми на персонажа ещё раз, чтобы вручить подарок.</p><button id="deliver" class="delivery-shortcut">Вручить подарок</button>`:`<h3>Что положить в посылку?</h3><div class="row rack">${choices.map(v=>`<button class="choice" data-gift="${v.person}">${giftSticker(v)}${v.gift}</button>`).join('')}</div>`:''}
 <div class="row">${!found?'<button id="find">Искать на карте</button>':''}${!done&&(!found||isGreen)?'<button class="ghost" id="hint">Подсказка</button>':''}</div>${status()}`;

 if($('find'))$('find').onclick=()=>{switchView('map');$('mapframe').focus({preventScroll:true});};
 if($('hint'))$('hint').onclick=()=>{tip=!tip;if(tip&&!found){view='map';message='';render();mapFocus();}else render();};
 if($('deliver'))$('deliver').onclick=deliver;
 if($('note'))$('note').oninput=e=>{state.notes[selected]=e.target.value;save();};
 panel.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{shieldColor=b.dataset.color;render();});
 panel.querySelectorAll('[data-symbol]').forEach(b=>b.onclick=()=>{shieldIcon=b.dataset.symbol;render();});
 panel.querySelectorAll('[data-gift]').forEach(b=>b.onclick=()=>{
   chosen=b.dataset.gift===l.person;message=chosen?'':'Этот подарок не подходит. Проверь письмо или возьми подсказку.';
   render();
 });
}
function finale(){
 const complete=state.done[31],values=state.finalValues??[];
 const solution=finalClues.map(c=>c[1]).join('');
 const ready=finalClues.every((c,i)=>normalized(values[i]??'')===c[1]);
 panel.innerHTML=`<div class="date-envelope" role="img" aria-label="${selected} декабря"><svg viewBox="0 0 86 56" aria-hidden="true" focusable="false"><rect x="2" y="2" width="82" height="52" rx="7" fill="#b33743" stroke="#ffe6a5" stroke-width="2"/><path d="M4 50L42 24 82 50" fill="none" stroke="#e98578" stroke-width="2"/><path d="M4 6L39 35Q43 39 47 35L82 6" fill="#205742" stroke="#ffda80" stroke-width="2" stroke-linejoin="round"/><circle cx="43" cy="35" r="13" fill="#ffe29b" stroke="#9d472e" stroke-width="1.5"/></svg><span aria-hidden="true">${selected}</span></div>${original('final','Новогоднее письмо')}
 ${complete?'<h3>Секрет открыт!</h3><p>Проверь сахарницу или упаковку сахара. Вдруг дома тебя ждёт записка?</p>':ready?`<p>Прочитай третий столбец сверху вниз.</p><div class="grid" aria-label="Сетка со словами">${[...solution].map(c=>`<span>${c.toUpperCase()}</span>`).join('')}</div><form id="secret"><label for="secretWord">Секретное слово</label><input id="secretWord" type="text" autocomplete="off" required><div class="row"><button>Проверить слово</button></div></form>`:`<form id="riddles">${finalClues.map(([question],i)=>`<label for="clue${i}">${i+1}. ${question}</label><input type="text" id="clue${i}" value="${escape(values[i])}" autocomplete="off">`).join('')}<div class="row"><button>Проверить ответы</button></div></form>`}${status()}`;

 if($('riddles')){
   $('riddles').oninput=()=>{state.finalValues=finalClues.map((_,i)=>$('clue'+i).value);save();};
   $('riddles').onsubmit=e=>{e.preventDefault();state.finalValues=finalClues.map((_,i)=>$('clue'+i).value);const wrong=finalClues.flatMap((c,i)=>normalized(state.finalValues[i])===c[1]?[]:[i+1]);message=wrong.length?'Проверь ответы '+wrong.join(', ')+'.':'';save();render();};
 }
 if($('secret'))$('secret').onsubmit=e=>{
  e.preventDefault();
  if(normalized($('secretWord').value)==='сахар'){state.done[31]=true;message='Ты большая молодец! Возьми свой подарочек.';save();}
  else message='Посмотри на выделенный столбец и прочитай буквы сверху вниз.';
  render();
 };
}
function deliveryPanel(){
 const praise=['Ты большая молодец! Возьми свой подарочек.','Отличная работа, почтальон! Теперь твоя очередь получить подарочек.','Сегодняшнее задание выполнено! Забирай свой подарочек.','Ура, ты справилась! Тебя ждёт подарочек.'];
 panel.innerHTML='<h2 tabindex="-1">Посылка доставлена!</h2><p class="skin">'+giftSticker(letters[selected-1])+'</p><p>'+praise[(selected-1)%praise.length]+'</p><button id="returnPost">В почтовый ящик</button>';
 $('returnPost').onclick=()=>openLetter(0);
}
function render(focus=false,record=true){
 const previousScreen=document.body.dataset.screen;
 const scroll=panel.scrollTop;
 const expanded=!focus&&!!panel.querySelector('.original[open]');
 if(record)recordRoute();
 const mapOpen=view==='map';
 document.body.dataset.screen=mapOpen?'map':selected&&view!=='delivery'?'letter':'post';
 $('mapSide').hidden=!mapOpen;panel.hidden=mapOpen;
 $('mapStatus').classList.toggle('shown',mapOpen&&!!message);
 $('mapStatus').textContent=mapOpen?(message||(tip&&letters[selected-1]?'Подсказка. '+locations[letters[selected-1].person][3]:selected&&selected<31?'Найди того, кто написал письмо.':'Нажми на персонажа, чтобы узнать его имя.')):'';
 nav.forEach(b=>b.setAttribute('aria-current',b.dataset.view===view));
 if(mapOpen){maps();return;}
 if(view==='delivery')deliveryPanel();
 else if(selected===31)finale();
 else if(selected)letterPanel();

 else homePost();
 maps();
 if(expanded&&previousScreen==='letter'&&document.body.dataset.screen==='letter'){const scan=panel.querySelector('.original');if(scan)scan.open=true;}
 panel.scrollTop=focus?0:scroll;
 if(focus&&document.body.dataset.screen==='letter')panel.focus({preventScroll:true});
 else if(focus)panel.querySelector('h2')?.focus({preventScroll:true});
}
const flakes=document.createDocumentFragment();
for(let i=0;i<25;i++){
 const flake=document.createElement('i');
 flake.textContent=i%3===0?'❄':'•';
 flake.style.cssText='--x:'+(i*41%100)+'%;--size:'+(8+i*7%14)+'px;--time:'+(7+i%7)+'s;--delay:-'+(i*1.37)+'s;--drift:'+(i%2?44:-37)+'px';
 flakes.append(flake);
}
document.querySelector('.snow').append(flakes);
const introAudio=new Audio('elf-intro.wav');
introAudio.preload='none';
const readIntro=$('readIntro');
const introStatus=document.createElement('p');
introStatus.setAttribute('role','status');
readIntro.parentElement.after(introStatus);
readIntro.hidden=false;
function resetIntroLabel(){readIntro.textContent='Послушать эльфа';}
function stopIntro(){
 introAudio.pause();
 introAudio.currentTime=0;
 resetIntroLabel();
}
introAudio.addEventListener('ended',resetIntroLabel);
readIntro.onclick=async()=>{
 introStatus.textContent='';
 if(!introAudio.paused){stopIntro();return;}
 try{
  await introAudio.play();
  if(!introAudio.paused)readIntro.textContent='Остановить озвучку';
 }catch{
  resetIntroLabel();
  introStatus.textContent='Озвучка не загрузилась. Попробуй ещё раз.';
 }
};

function enterCity(){
 stopIntro();

 if ($('enter').disabled) return;
 $('enter').disabled=true;$('portal').classList.add('dive');
 setTimeout(()=>{showGame();begin();},matchMedia('(prefers-reduced-motion: reduce)').matches?25:3360);
}
$('enter').onclick=enterCity;
$('portalEntry').onclick=enterCity;

nav.forEach(b=>b.onclick=()=>{if($('play').hidden)begin(); if(b.dataset.view==='post'){openLetter(0);return;}switchView(b.dataset.view);});


const frame=$('mapframe'), map=$('map'), wrap=document.querySelector('.wrap');
const fingers=new Map();
let gesture=null,moved=false,zoom=1.35;
function mapPosition(event){
 const r=frame.getBoundingClientRect();
 return getComputedStyle(wrap).transform==='none'?[event.clientX-r.left,event.clientY-r.top]:[event.clientY-r.top,r.right-event.clientX];
}
function pinchGeometry(){
 const [a,b]=fingers.values();
 return {x:(a[0]+b[0])/2,y:(a[1]+b[1])/2,d:Math.max(1,Math.hypot(a[0]-b[0],a[1]-b[1]))};
}
function startPan(point){
 gesture={x:point[0],y:point[1],left:frame.scrollLeft,top:frame.scrollTop};
}
frame.addEventListener('pointerdown',e=>{
 if(e.button!==0||fingers.size>=2)return;
 const p=mapPosition(e);
 if(!fingers.size){moved=false;startPan(p);}
 fingers.set(e.pointerId,p);
 if(fingers.size!==2)return;
 const g=pinchGeometry();
 gesture={...g,zoom,fx:(frame.scrollLeft+g.x)/map.offsetWidth,fy:(frame.scrollTop+g.y)/map.offsetHeight};
 moved=true;
 for(const id of fingers.keys())frame.setPointerCapture(id);
});
frame.addEventListener('pointermove',e=>{
 if(!fingers.has(e.pointerId)||!gesture)return;
 const p=mapPosition(e);
 fingers.set(e.pointerId,p);
 if(fingers.size===2){
  const g=pinchGeometry();
  zoom=Math.max(.75,Math.min(3.2,gesture.zoom*g.d/gesture.d));
  map.style.setProperty('--map-zoom',zoom*100+'%');
  frame.scrollLeft=gesture.fx*map.offsetWidth-g.x;
  frame.scrollTop=gesture.fy*map.offsetHeight-g.y;
  return;
 }
 const dx=p[0]-gesture.x,dy=p[1]-gesture.y;
 if(!moved&&Math.hypot(dx,dy)<7)return;
 moved=true;
 if(!frame.hasPointerCapture(e.pointerId))frame.setPointerCapture(e.pointerId);
 frame.scrollLeft=gesture.left-dx;frame.scrollTop=gesture.top-dy;
});
function stopGesture(e){
 if(!fingers.delete(e.pointerId))return;
 if(fingers.size)startPan(fingers.values().next().value);
 else gesture=null;
}
frame.addEventListener('pointerup',stopGesture);
frame.addEventListener('pointercancel',stopGesture);
frame.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!moved)stopGesture(e);});
frame.addEventListener('click',e=>{if(moved&&e.detail){e.stopImmediatePropagation();e.preventDefault();}moved=false;},true);
})();
})().catch(err=>{
 console.error(err);
 document.getElementById('enter').disabled=true;
 document.getElementById('portalEntry').disabled=true;
 document.getElementById('loading').textContent='Карта и письма не загрузились. Обнови страницу, чтобы повторить.';
});
