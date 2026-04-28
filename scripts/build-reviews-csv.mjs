import fs from "fs";

function escapeCsvField(field) {
  const s =
    field === null || field === undefined ? "" : String(field);
  if (/[,"\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const records = [
  {
    id: "2ac22cd0-0347-49a7-bb42-402592937aff",
    customer_name: "Malak Ahmed",
    customer_subtitle: "Retired Firefighter",
    rating: "5",
    review_text:
      "As a former first responder, I can tell you that having this info instantly is a game changer.",
    is_featured: "true",
    created_at: "2026-03-26T04:47:49.84218+00",
    is_visible: "true",
    title_en: "A First Responder's Perspective",
    description_en: `After 28 years as a firefighter and paramedic, I've responded to thousands of emergency calls. I've seen firsthand how critical those first few minutes are, and how much time we lose trying to gather basic medical information from someone who can't communicate.

I've had too many calls where we found medications in a house but didn't know what condition the patient had. I've arrived at scenes where bystanders knew the person was diabetic but couldn't tell us what medications they were on. I've had to make treatment decisions with incomplete information because we couldn't reach emergency contacts.

When I retired last year, one of my friends showed me their Qlink band. As soon as I understood what it was, I knew I had to have one. I immediately thought of all the times this technology could have saved us precious minutes - or even saved a life.

I've recommended Qlink to every person I know, especially those with medical conditions. From a first responder's perspective, this isn't just a nice-to-have - it's a potential lifesaver. The minutes you save could be the difference between a good outcome and a tragedy.`,
    title_ar: "وجهة نظر مستجيب أول",
    description_ar: `بعد 28 عامًا كإطفائي ومسعف، استجبت لآلاف المكالمات الطارئة. رأيتُ عن كثب مدى أهمية الدقائق الأولى، وكم نفقد من الوقت بينما نحاول جمع المعلومات الطبية الأساسية من شخص لا يستطيع التواصل.

مرّت مواقف كثيرة: أدوية في المنزل دون تشخيص واضح؛ وحضورٌ يعرف أن الشخص سكّري دون أن يُسمّي أدويته؛ وقرارات علاج أخذتها وأنا بمعلومات ناقصة لأننا لم نصل إلى جهات الاتصال في الوقت المناسب.

عند تقاعدي قبل عام حمل صديقٌ سوار Qlink أمامي؛ فهمت المعنى وعلمت أني أريد واحدًا. فكرت في كل المواقف التي كان في مجالها ذلك أن يوفر زمنًا وأن يمنحنا نتيجة أفضل.

أوصي به كل من أعرفه، خصوصًا من لديهم حالات طبية. من منظور أول المستجيبين ليس رفاهية إضافية؛ إنه أداة قد تنقذ حياة. الدقائق التي توفرها قد تغيّر بين نتيجة جيدة وبين مأساة.`,
  },
  {
    id: "2ffda526-4a80-4a05-b327-cd405203eb2f",
    customer_name: "TESTTTTTTTT",
    customer_subtitle: "testt",
    rating: "5",
    review_text: "<p>TEST— maryamessam22@gmail.com</p>",
    is_featured: "true",
    created_at: "2026-04-10T04:29:15.061+00",
    is_visible: "false",
    title_en: "",
    description_en: "",
    title_ar: "",
    description_ar: "",
  },
  {
    id: "4d0fd2c9-0702-436f-876e-89dea92036f8",
    customer_name: "Salma Ahmed",
    customer_subtitle: "Diabetes Patient",
    rating: "5",
    review_text:
      "Qlink gives me the confidence to go for my morning runs alone.",
    is_featured: "true",
    created_at: "2026-03-26T04:47:49.84218+00",
    is_visible: "true",
    title_en: "The Full Story",
    description_en: `As someone living with Type 1 diabetes, running has always been my passion and my therapy. But there was always that underlying fear - what if my blood sugar drops while I'm alone on a trail? What if I can't communicate my condition to someone who finds me?

When I discovered Qlink, it felt like the solution I'd been searching for. The QR code on my band contains all my critical medical information - my diabetes diagnosis, my insulin regimen, my emergency contacts, and even my allergies.

Now, I run with confidence. Whether I'm on a familiar route or exploring new trails, I know that if anything happens, the person who helps me will have all the information they need with a simple scan. It's not just a piece of technology - it's peace of mind in wearable form.

The band is comfortable, waterproof, and stylish enough that I never want to take it off. My family loves knowing I'm protected, and I love the freedom it gives me to pursue my passion without fear.`,
    title_ar: "القصة الكاملة",
    description_ar: `كمن يعيش مع السكّري من النوع الأول، كان الركض شغفي وعلاجي النفسي. لكن ظلَّ هناك خوف: ماذا لو انخفض السكر وأنا وحيدًا في الممر؟ ماذا لو لم أستطع شرح حالتي لمن يجدني؟

عندما اكتشفت Qlink شعرت أنني وجدت الحل: رمز الاستجابة السريعة على السوار يحوي تشخيصي، مخطّط الأنسولين، جهات الطوارئ، وحتى حساسياتي.

الآن أجري وأنا أكثر ثقة؛ سواء في طريق مألوف أو مسارات جديدة، وأعلم أن من يسعفني قد يحصل على كل ما يحتاجه بمجرد مسح واحد؛ إنه ليس مجرد تقنية—بل طمأنينة تقبل أن تُرتدى.

السوّار مريح ومضاد للماء وبشكل لا أودّعه عن معصمي؛ وأفراد أسرتي يجدون الطمأنينة بينما أفوز بالحرّية لمتابعة شغفي دون تهيُّب.`,
  },
  {
    id: "610bc744-60ee-4b13-8138-1c36a725984d",
    customer_name: "Sarah Hany",
    customer_subtitle: "Mother of two",
    rating: "5",
    review_text:
      "The peace of mind knowing my contact info is on their wrist is priceless.",
    is_featured: "true",
    created_at: "2026-03-26T04:47:49.84218+00",
    is_visible: "true",
    title_en: "The Full Story",
    description_en: `Planning our family trip to Disney World was exciting, but I couldn't shake the worry of keeping track of my two energetic kids in those massive crowds. I'd heard too many stories of children getting separated from their parents in theme parks.

That's when I found Qlink. I ordered matching bands for both my kids - a blue one for my 6-year-old son and a pink one for my 8-year-old daughter. I programmed each one with their names, my phone number, my husband's number, and our hotel information.

The best part? My kids actually thought the bands were cool! They loved choosing their colors and thought it made them look like they had "special powers." For me, it meant I could relax and enjoy our vacation, knowing that if they wandered off, any staff member or helpful person could scan the QR code and contact us immediately.

We didn't have any incidents during our trip, but just knowing we were prepared gave me the freedom to actually enjoy the magic of Disney with my family instead of being in constant panic mode. Now they wear their bands every day - to school, to the playground, everywhere. It's become part of their daily routine.`,
    title_ar: "القصة الكاملة",
    description_ar: `خططْنا للرحلة العائلية إلى ديزني بحماس لا يخطئه المرء، ظلَّ قَلَقي حاضرًا: كيف أتابع ولديّ بين الزحام؟ ولقد بلغني كثيرٌ عن انفصال الأطفال عن ذويهم في المتنزهات.

اكتشفتُ Qlink وطلبتُ سوارًا لكل واحد؛ أزرق لابني (6) ووردي لفتاي (8)، وغرستُ الاسم وبياناتي ورقم الزوج وحجز الفندق.

الأروع أن الأطفال أُعجبوا بلون السوار وحسبوا أنه يمنحهم «قوًى خاصة». بالنسبة لي راح أي قلق: إن ابتعدوا كان بوسع الموظَّف أيّ شخص مساعِد مسح الرمز ثمَّ الاتصال بنا.

لم نزل لحادثٍ أثناء الرحلة، لكن العلم أننا مستعدّون أعطاني أن أستمتع بالسحر مع العائلة—واليوم يَرتدون السوار يوميًا إلى المدرسة والملعب وغيرهما كعادة في يومهم.`,
  },
  {
    id: "f5e80ae6-40e3-49ba-9eca-62b79c084e2d",
    customer_name: "Ann Mazen",
    customer_subtitle: "Allergy Sufferer",
    rating: "4",
    review_text:
      "The waterproof design is great. I never take it off.",
    is_featured: "true",
    created_at: "2026-03-26T04:47:49.84218+00",
    is_visible: "true",
    title_en: "Style Meets Safety",
    description_en: `Living with severe food allergies means I have to be constantly vigilant about what I eat and where I go. I've had a few scary reactions in the past, including one that landed me in the ER after accidentally eating something with peanuts.

I've tried medical alert bracelets before, but honestly, they were all pretty ugly. They looked clinical and screamed "medical device," which made me self-conscious. I'd often take them off before going out, which defeated the entire purpose.

When I discovered Qlink, I was immediately drawn to the sleek design. It doesn't look like a medical alert device - it looks like a stylish accessory. I chose the rose gold finish, and I genuinely get compliments on it regularly.

My only minor complaint is that I wish there were more color options, which is why I gave it 4 stars instead of 5. But honestly, that's a small thing compared to the peace of mind and style it provides.`,
    title_ar: "الأناقة تلتقي بالأمان",
    description_ar: `العيش مع حساسيات غذائيّة شديدة يفرض انتباهًا مستمرًا لما أكله وأين أذهب. تجاوزت تجارب أفزعتني وفِي مرة واحدة انتهيتُ إلى الطوارئ بعد قضمة وفِيها فول سُوداني.

جرّبتُ أساور تنبيهٍ قبلَ أن تكن قبيحةً في صورتها ومُذكّرةً بتصميم سريري؛ فكنتُ أزيلها قبل الخروج فتتلاشى المنفعة أصلًا.

عند رؤيتي لـ Qlink انجذبتُ لمظهرٍ نظيف؛ لا يشبه الجهاز السريري—بل قطعة لا تخطئ نظرًا. رشحْت الذهب الوردي وتلقَّيتُ تعريفًا يكتر.

شكتي الوحيدة قلة الخيارات اللونية؛ لذلك أعطيتُ أربع نجوم. مع ذلك لا يهمّ ذلك مقارنة بطمأنينة الشكل وحضور الأمان.`,
  },
];

const header = [
  "id",
  "customer_name",
  "customer_subtitle",
  "rating",
  "review_text",
  "is_featured",
  "created_at",
  "is_visible",
  "title_en",
  "description_en",
  "title_ar",
  "description_ar",
];

const lines = [
  header.map(escapeCsvField).join(","),
  ...records.map((row) =>
    header.map((k) => escapeCsvField(row[k])).join(",")
  ),
];

fs.writeFileSync(new URL("../reviews_import.csv", import.meta.url), lines.join("\n"), {
  encoding: "utf8",
});

console.log("Wrote reviews_import.csv rows:", records.length);
