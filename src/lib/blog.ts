export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  coverEmoji: string;
  keywords: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "erdek-nerede-nasil-gidilir",
    title: "Erdek Nerede? Nasil Gidilir? — Ulasim Rehberi 2025",
    description: "Erdek nerede sorusunun cevabi, Istanbul, Ankara, Izmir'den Erdek'e nasil gidilir, otobus, feribot ve arac ile ulasim secenekleri.",
    date: "2025-06-01",
    readTime: 6,
    category: "Gezi Rehberi",
    coverEmoji: "🗺️",
    keywords: ["erdek nerede", "erdek nasil gidilir", "erdek ulasim", "erdek otobus", "erdek feribot", "balikesir erdek"],
    content: "<p>Erdek, Turkiye'nin kuzeybatisinda, <strong>Balikesir iline bagli</strong> bir ilce ve tatil beldesidir. Marmara Denizi'nin guney kiyisinda, Kapidag Yarimadasi'nin bati ucunda konumlanir.</p><h2>Erdek Nerede?</h2><p>Erdek ilcesi, Balikesir il merkezine yaklasik <strong>95 km</strong> uzaklikta, Marmara Denizi kiyisinda yer alir. Istanbul'a kus ucusu yaklasik 170 km mesafededir.</p><h2>Istanbul'dan Erdek'e Nasil Gidilir?</h2><h3>Otobus ile</h3><p>Istanbul Esenler veya Buyukcekekmece otobus terminallerinden Erdek'e direkt otobus seferleri mevcuttur. Yolculuk suresi yaklasik <strong>3,5-4 saat</strong>tir.</p><h3>Feribot ile</h3><p>Daha keyifli bir alternatif: Istanbul Yenikapi'dan Bandirma'ya feribot (yaklasik 2 saat), ardindan Bandirma'dan Erdek'e miniibus (40 dakika). IDO ve BUDO feribotlari bu hatti isletmektedir.</p><h3>Arac ile</h3><p>Istanbul'dan TEM Otoyolu - Bursa - Mustafakemalpasa - Bandirma - Erdek guzergahini izleyebilirsiniz. Toplam mesafe yaklasik <strong>230 km</strong>, yolculuk suresi 3-3,5 saattir.</p><h2>Ankara'dan Erdek'e Nasil Gidilir?</h2><p>Ankara'dan Erdek'e direkt otobus bulunabilir; aksi halde Bandirma aktarmali gidilir. Aracla yaklasik <strong>350 km</strong> ve 4,5 saattir.</p><h2>Erdek Icinde Ulasim</h2><p>Erdek merkezi yuruyuse oldukca elveriislidir. Cevre koylere ve Kapidag Yarimadasi'na dolmuslar islemektedir. Yazin kiralik bisiklet ve motosiklet secenekleri de mevcuttur.</p><p>Erdek'te konaklama aramak icin <a href='/konaklama'>ErdekOnline konaklama sayfasini</a> ziyaret edin!</p>",
  },
  {
    slug: "erdek-gezilecek-yerler",
    title: "Erdek'te Gezilecek Yerler — 2025 Tam Rehber",
    description: "Erdek'te mutlaka gorulmesi gereken yerler: Kapidag Yarimadasi, Marmara Adalari, tarihi mekanlar, plajlar ve dogal guzellikler.",
    date: "2025-06-05",
    readTime: 8,
    category: "Gezi Rehberi",
    coverEmoji: "🏝️",
    keywords: ["erdek gezilecek yerler", "erdek gorulecek yerler", "erdek tatil", "kapidag yarimadasi", "erdek ne yapilir"],
    content: "<p>Erdek, hem tarihi hem de dogal guzellikleriyle one cikan bir tatil beldesidir.</p><h2>1. Kapidag Yarimadasi</h2><p>Erdek'in en buyuk hazinesi olan <strong>Kapidag Yarimadasi</strong>, ormanlik tepeleri, kristal berrakligindaki koylari ve dogal yuruyus parkurlariyla doga tutkunlarinin gozdesidir.</p><h2>2. Erdek Sahil Seridi</h2><p>Erdek sahil seridi, yuruyus yapilabilecek genis bir promenad ve cevresindeki kafeler ile restoranlarla hareketli bir yasam sunar.</p><h2>3. Marmara Adalari</h2><p>Erdek iskelesi, Marmara Adalari'na duzenli feribot seferlerinin kalkis noktasidir. <strong>Marmara Adasi, Avsa ve Pasalimani</strong> gunubirlik veya konaklanarak ziyaret edilebilir.</p><h2>4. Ocaklar Koyu</h2><p>Turkuaz rengi koyu ve bozulmamis dogasiyla Ege tatil beldelerini aratmaz.</p><h2>5. Narli Golu</h2><p>Kapidag'da yer alan <strong>Narli Golu</strong>, tatli ve tuzlu suyun bulustuugu nadir bir lagunudur.</p><h2>6. Tekne Turlari</h2><p>Erdek iskelesinden kalkan <strong>mavi yolculuk tekneleri</strong>, gunubirlik koy turlari duzenler. <a href='/tekne'>Tekne turu seceneklerini gorun.</a></p>",
  },
  {
    slug: "erdek-plajlari",
    title: "Erdek Plajlari — En Iyi 7 Plaj ve Koy 2025",
    description: "Erdek'in en guzel plajlari ve koylari: Ocaklar, Turan, Yenikos, Kapidag koylari ve daha fazlasi.",
    date: "2025-06-10",
    readTime: 7,
    category: "Plaj & Deniz",
    coverEmoji: "🏖️",
    keywords: ["erdek plajlari", "erdek plaj", "erdek koylari", "erdek deniz", "ocaklar plaji", "kapidag koylari"],
    content: "<p>Erdek ve Kapidag Yarimadasi, Marmara Denizi'nin en temiz sularina ev sahipligi yapar.</p><h2>1. Erdek Merkez Plaji</h2><p>Sehire yurume mesafesinde, genis kum seridiyle aileler icin idealdir.</p><h2>2. Ocaklar Plaji</h2><p>Erdek'e 8 km mesafedeki <strong>Ocaklar Koyu</strong>, berrak turkuaz suyu ve sakin atmosferiyle en populer plajlardan biridir.</p><h2>3. Turan Plaji</h2><p>Kalabaliktan uzak olmak isteyenler icin mukemmeldir.</p><h2>4. Yenikos Plaji</h2><p>Golgeli agaclari ve sig kiyisiyla cocuklu aileler icin en guvenli seceneklerden biridir.</p><h2>5. Kapidag Koylari</h2><p>Yarimada boyunca tekneyle ulasilabilen onlarca gizli koy bulunur. <a href='/tekne'>Erdek tekne turlarina bakin.</a></p><h2>6. Narli Gol Kiyisi</h2><p>Hem tatli hem tuzlu suya sahip lagun kiyisi farkli bir deneyim sunar.</p><h2>7. Ballipinar Koyu</h2><p>Cam ormanlarina cevrili, sakin denizle bir cennet kosesidir. Kamp icin de idealdir.</p>",
  },
  {
    slug: "erdek-restoranlar-yemek",
    title: "Erdek'te Yemek — En Iyi Restoranlar ve Lezzetler 2025",
    description: "Erdek'te yemek yenecek en iyi restoranlar, balik lokantalar ve yoresel lezzetler.",
    date: "2025-06-15",
    readTime: 6,
    category: "Yemek & Lezzet",
    coverEmoji: "🍽️",
    keywords: ["erdek restoranlar", "erdek yemek", "erdek balik restoran", "erdek kahvalti", "erdek lezzetleri"],
    content: "<p>Marmara kiyisinda bir balikci kasabasi olan Erdek, taze deniz urunleri ile gastronomi tutkunlarini cezbeder.</p><h2>Yoresel Lezzetler</h2><p>Levrek, cipura, lufer ve kalkan Marmara'nin bol urunleridir. <strong>Midye dolma</strong>, <strong>Kapidag zeytinyaglilari</strong> ve Marmara bali de one cikar.</p><h2>Balik Restoranlari</h2><p>Erdek rihtimi boyunca siralanan balik restoranlari sabahın erken saatlerinde gelen taze baligi ayni gun servis eder. Gun batiminda denizi izleyerek balik yemek Erdek'in vazgecilmez deneyimlerindendir.</p><p>Online siparis icin <a href='/yemek'>ErdekOnline yemek platformunu</a> kullanabilirsiniz.</p>",
  },
  {
    slug: "erdek-tekne-turu-rehberi",
    title: "Erdek Tekne Turu Rehberi 2025 — Koylar ve Ipuclari",
    description: "Erdek tekne turlari hakkinda her sey: hangi koylar ziyaret edilir, gunubirlik ve cok gunluk tur secenekleri.",
    date: "2025-06-20",
    readTime: 7,
    category: "Tekne & Deniz",
    coverEmoji: "⛵",
    keywords: ["erdek tekne turu", "erdek tekne", "kapidag tekne turu", "erdek mavi yolculuk", "erdek koy turu"],
    content: "<p>Erdek, Kapidag Yarimadasi'nin cevreledigi kristal sulara tekne cikarmak icin Marmara'nin en ideal noktalarindan biridir.</p><h2>Ziyaret Edilen Koylar</h2><p><strong>Ballipinar Koyu</strong>, <strong>Narli Gol</strong>, <strong>Ocaklar Koyu</strong>, Yigitler ve Ilhan Koylari standart rota uzerindedir.</p><h2>Gunubirlik Tur</h2><p>Sabah 09:00'da kalkan, aksam 17:00'de donen gunubirlik koy turu en populer secenektir. Ogle yemegi ve snorkel ekipmani dahildir.</p><p>Rezervasyon icin <a href='/tekne'>ErdekOnline tekne turlari sayfasina</a> bakin.</p>",
  },
  {
    slug: "erdek-konaklama-rehberi",
    title: "Erdek'te Konaklama Rehberi 2025 — Oteller ve Pansiyonlar",
    description: "Erdek'te konaklama secenekleri: oteller, pansiyonlar, tatil evleri. Butcenize gore en iyi Erdek konaklama.",
    date: "2025-06-25",
    readTime: 6,
    category: "Konaklama",
    coverEmoji: "🏨",
    keywords: ["erdek konaklama", "erdek otel", "erdek pansiyon", "erdek tatil evi", "erdek apart"],
    content: "<p>Erdek, her butceye uygun genis bir konaklama yelpazesi sunar.</p><h2>Oteller</h2><p>Sahil seridindeki oteller deniz manzarasi ile one cikar. Temmuz-Agustos doneminde <strong>erken rezervasyon</strong> siddetle tavsiye edilir.</p><h2>Pansiyonlar</h2><p>Kapidag koylerindeki aile pansiyonlari otantik tatil arayanlar icin idealdir. Genellikle ev yapimi kahvalti dahildir.</p><h2>En Iyi Donem</h2><p><strong>Haziran ve Eylul</strong>, fiyatlarin uygun ve Erdek'in sakin oldugu donemdir.</p><p><a href='/konaklama'>ErdekOnline konaklama sayfasinda</a> tum secenekleri karsilastirin.</p>",
  },
  {
    slug: "erdek-hakkinda-her-sey",
    title: "Erdek Hakkinda Her Sey — Tarih, Kultur ve Yasam 2025",
    description: "Erdek ilcesinin tarihi, cografyasi, ekonomisi ve kulturel ozellikleri. Kapsamli Erdek rehberi.",
    date: "2025-07-01",
    readTime: 9,
    category: "Erdek Rehberi",
    coverEmoji: "🏘️",
    keywords: ["erdek hakkinda", "erdek tarihi", "erdek ilcesi", "erdek nufusu", "erdek ekonomisi"],
    content: "<p>Erdek, Marmara Denizi'nin guney kiyisinda, Kapidag Yarimadasi'nin bati ucunda yer alan tarihi bir Balikesir ilcesidir.</p><h2>Tarihi</h2><p>Erdek'in tarihi antik caglara uzanir. Bugunki Erdek'in bulundugu yerde antik cagda <strong>Artake</strong> adli bir yerlesim yeri vardi. Bolge Bizans, Osmanli ve Cumhuriyet donemlerini yasamistir.</p><h2>Ekonomi</h2><p>Temel ekonomik faaliyet alanlari: <strong>turizm</strong>, <strong>balikclik</strong>, <strong>zeytinyagi uretimi</strong> ve <strong>bagcilik</strong>.</p><h2>Kultur</h2><p>Erdek, Ege ve Marmara kulturunun harmanlandigi bir yasam tarzina sahiptir. Balikci kahvehaneleri ve sahil cafeler gunluk yasamin merkezindedir.</p>",
  },
  {
    slug: "erdeke-ne-zaman-gidilir",
    title: "Erdek'e Ne Zaman Gidilir? — Sezon Rehberi 2025",
    description: "Erdek'e gitmek icin en iyi donem hangisi? Hava durumu, deniz sicakliklari ve sezon bilgileriyle tatil planlamasi.",
    date: "2025-07-05",
    readTime: 5,
    category: "Gezi Rehberi",
    coverEmoji: "📅",
    keywords: ["erdek ne zaman gidilir", "erdek hava durumu", "erdek sezon", "erdek yaz tatili", "erdek deniz sicakligi"],
    content: "<p>Erdek'e ne zaman gideceginize karar vermek tatil deneyiminizi dogrudan etkiler.</p><h2>Ilkbahar (Nisan-Mayis)</h2><p>Ormanlar yemyesil, fiyatlar dusuk. Deniz henuz soguk ama doga yuruyusu ve fotograf icin mukemmel.</p><h2>Yaz (Haziran-Agustos)</h2><p>En kalabalik donem, deniz 22-27 derece. <strong>Erken rezervasyon sart.</strong> Haziran basi ve Eylul basi en ideal zamanlardir.</p><h2>Erken Sonbahar (Eylul-Ekim)</h2><p>En cok onerilen donem: deniz hala sicak, kalabalik azalmis, fiyatlar dusmus.</p><h2>Kis (Kasim-Mart)</h2><p>Sakin ve issiz. Fiyatlar en dusuk seviyede, uzlete cekilmek icin ideal.</p><ul><li><strong>Deniz tatili:</strong> Haziran ortasi - Eylul basi</li><li><strong>Ekonomik tatil:</strong> Haziran ilk haftasi veya Eylul-Ekim</li><li><strong>Doga yuruyusu:</strong> Nisan-Mayis veya Ekim</li></ul><p><a href='/'>ErdekOnline</a> ile konaklama, yemek ve tekne turunu tek platformdan planlayabilirsiniz.</p>",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}