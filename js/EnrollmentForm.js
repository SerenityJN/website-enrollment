document.addEventListener("DOMContentLoaded", () => {
    
    const API_BASE_URL = 'https://website-backend-lxwz.onrender.com/api';
    let currentStep = 0;
    let studentType = "New Enrollee";

    const philippineLocations = {
        "Abra": ["Bangued", "Boliney", "Bucay", "Bucloc", "Daguioman", "Danglas", "Dolores", "La Paz", "Lacub", "Lagangilang", "Lagayan", "Langiden", "Licuan-Baay", "Luba", "Malibcong", "Manabo", "Peñarrubia", "Pidigan", "Pilar", "Sallapadan", "San Isidro", "San Juan", "San Quintin", "Tayum", "Tineg", "Tubo", "Villaviciosa"],
        "Agusan del Norte": ["Buenavista", "Butuan City", "Cabadbaran City", "Carmen", "Jabonga", "Kitcharao", "Las Nieves", "Magallanes", "Nasipit", "Remedios T. Romualdez", "Santiago", "Tubay"],
        "Agusan del Sur": ["Bayugan City", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luis", "Santa Josefa", "Sibagat", "Talacogon", "Trento", "Veruela"],
        "Aklan": ["Altavas", "Balete", "Banga", "Batan", "Buruanga", "Ibajay", "Kalibo", "Lezo", "Libacao", "Madalag", "Makato", "Malay", "Malinao", "Nabas", "New Washington", "Numancia", "Tangalan"],
        "Albay": ["Bacacay", "Camalig", "Daraga", "Guinobatan", "Jovellar", "Legazpi City", "Libon", "Ligao City", "Malilipot", "Malinao", "Manito", "Oas", "Pio Duran", "Polangui", "Rapu-Rapu", "Santo Domingo", "Tabaco City", "Tiwi"],
        "Antique": ["Anini-y", "Barbaza", "Belison", "Bugasong", "Caluya", "Culasi", "Hamtic", "Laua-an", "Libertad", "Pandan", "Patnongon", "San Jose de Buenavista", "San Remigio", "Sebaste", "Sibalom", "Tibiao", "Tobias Fornier", "Valderrama"],
        "Apayao": ["Calanasan", "Conner", "Flora", "Kabugao", "Luna", "Pudtol", "Santa Marcela"],
        "Aurora": ["Baler", "Casiguran", "Dilasag", "Dinalungan", "Dingalan", "Dipaculao", "Maria Aurora", "San Luis"],
        "Basilan": ["Akbar", "Al-Barka", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Isabela City", "Lamitan City", "Lantawan", "Maluso", "Sumisip", "Tabuan-Lasa", "Tipo-Tipo", "Tuburan", "Ungkaya Pukan"],
        "Bataan": ["Abucay", "Bagac", "Balanga City", "Dinalupihan", "Hermosa", "Limay", "Mariveles", "Morong", "Orani", "Orion", "Pilar", "Samal"],
        "Batanes": ["Basco", "Itbayat", "Ivana", "Mahatao", "Sabtang", "Uyugan"],
        "Batangas": ["Agoncillo", "Alitagtag", "Balayan", "Balete", "Batangas City", "Bauan", "Calaca", "Calatagan", "Cuenca", "Ibaan", "Laurel", "Lemery", "Lian", "Lipa City", "Lobo", "Mabini", "Malvar", "Mataasnakahoy", "Nasugbu", "Padre Garcia", "Rosario", "San Jose", "San Juan", "San Luis", "San Nicolas", "San Pascual", "Santa Teresita", "Santo Tomas", "Taal", "Talisay", "Tanauan City", "Taysan", "Tingloy", "Tuy"],
        "Benguet": ["Atok", "Baguio City", "Bakun", "Bokod", "Buguias", "Itogon", "Kabayan", "Kapangan", "Kibungan", "La Trinidad", "Mankayan", "Sablan", "Tuba", "Tublay"],
        "Biliran": ["Almeria", "Biliran", "Cabucgayan", "Caibiran", "Culaba", "Kawayan", "Maripipi", "Naval"],
        "Bohol": ["Albuquerque", "Alicia", "Anda", "Antequera", "Baclayon", "Balilihan", "Batuan", "Bien Unido", "Bilar", "Buenavista", "Calape", "Candijay", "Carmen", "Catigbian", "Clarin", "Corella", "Cortes", "Dagohoy", "Danao", "Dauis", "Dimiao", "Duero", "Garcia Hernandez", "Guindulman", "Inabanga", "Jagna", "Jetafe", "Lila", "Loay", "Loboc", "Loon", "Mabini", "Maribojoc", "Panglao", "Pilar", "Pres. Carlos P. Garcia", "Sagbayan", "San Isidro", "San Miguel", "Sevilla", "Sierra Bullones", "Sikatuna", "Tagbilaran City", "Talibon", "Trinidad", "Tubigon", "Ubay", "Valencia"],
        "Bukidnon": ["Baungon", "Cabanglasan", "Damulog", "Dangcagan", "Don Carlos", "Impasugong", "Kadingilan", "Kalilangan", "Kibawe", "Kitatao", "Lantapan", "Libona", "Malaybalay City", "Malitbog", "Manolo Fortich", "Maramag", "Pangantucan", "Quezon", "San Fernando", "Sumilao", "Talakag", "Valencia City"],
        "Bulacan": ["Angat", "Balagtas", "Baliuag", "Bocaue", "Bulakan", "Bustos", "Calumpit", "Doña Remedios Trinidad", "Guiguinto", "Hagonoy", "Malolos City", "Marilao", "Meycauayan City", "Norzagaray", "Obando", "Pandi", "Paombong", "Plaridel", "Pulilan", "San Ildefonso", "San Jose del Monte City", "San Miguel", "San Rafael", "Santa Maria"],
        "Cagayan": ["Abulug", "Alcala", "Allacapan", "Amulung", "Aparri", "Baggao", "Ballesteros", "Buguey", "Calayan", "Camalaniugan", "Claveria", "Enrile", "Gattaran", "Gonzaga", "Iguig", "Lal-lo", "Lasam", "Pamplona", "Peñablanca", "Piat", "Rizal", "Sanchez-Mira", "Santa Ana", "Santa Praxedes", "Santa Teresita", "Santo Niño", "Solana", "Tuao", "Tuguegarao City"],
        "Camarines Norte": ["Basud", "Capalonga", "Daet", "Jose Panganiban", "Labo", "Mercedes", "Paracale", "San Lorenzo Ruiz", "San Vicente", "Santa Elena", "Talisay", "Vinzons"],
        "Camarines Sur": ["Baao", "Balatan", "Bato", "Bombon", "Buhi", "Bula", "Cabusao", "Calabanga", "Camaligan", "Canaman", "Caramoan", "Del Gallego", "Gainza", "Garchitorena", "Goa", "Iriga City", "Lagonoy", "Libmanan", "Lupi", "Magarao", "Milaor", "Minalabac", "Nabua", "Naga City", "Ocampo", "Pamplona", "Pasacao", "Pili", "Presentacion", "Ragay", "Sagñay", "San Fernando", "San Jose", "Sipocot", "Siruma", "Tigaon", "Tinambac"],
        "Camiguin": ["Catarman", "Guinsiliban", "Mahinog", "Mambajao", "Sagay"],
        "Capiz": ["Cuartero", "Dao", "Dumalag", "Dumarao", "Ivisan", "Jamindan", "Maayon", "Mambusao", "Panay", "Panitan", "Pilar", "Pontevedra", "President Roxas", "Roxas City", "Sapi-an", "Sigma", "Tapaz"],
        "Catanduanes": ["Bagamanoc", "Baras", "Bato", "Caramoran", "Gigmoto", "Pandan", "Panganiban", "San Andres", "San Miguel", "Viga", "Virac"],
        "Cavite": ["Alfonso", "Amadeo", "Bacoor City", "Carmona", "Cavite City", "Dasmariñas City", "General Emilio Aguinaldo", "General Trias City", "Imus City", "Indang", "Kawit", "Magallanes", "Maragondon", "Mendez", "Naic", "Noveleta", "Rosario", "Silang", "Tagaytay City", "Tanza", "Ternate", "Trece Martires City"],
        "Cebu": ["Alcantara", "Alcoy", "Alegria", "Aloguinsan", "Argao", "Asturias", "Badian", "Balamban", "Bantayan", "Barili", "Bogo City", "Boljoon", "Borbon", "Carcar City", "Carmen", "Catmon", "Cebu City", "Compostela", "Consolacion", "Cordoba", "Daanbantayan", "Dalaguete", "Danao City", "Dumanjug", "Ginatilan", "Lapu-Lapu City", "Liloan", "Madridejos", "Malabuyoc", "Mandaue City", "Medellin", "Minglanilla", "Moalboal", "Naga City", "Oslob", "Pilar", "Pinamungahan", "Poro", "Ronda", "Samboan", "San Fernando", "San Francisco", "San Remigio", "Santa Fe", "Santander", "Sibonga", "Sogod", "Tabogon", "Tabuelan", "Talisay City", "Toledo City", "Tuburan", "Tudela"],
        "Cotabato": ["Alamada", "Aleosan", "Antipas", "Arakan", "Banisilan", "Carmen", "Kabacan", "Kidapawan City", "Libungan", "M'lang", "Magpet", "Makilala", "Matalam", "Midsayap", "Pigcawayan", "Pikit", "President Roxas", "Tulunan"],
        "Davao de Oro": ["Compostela", "Laak", "Mabini", "Maco", "Maragusan", "Mawab", "Monkayo", "Montevista", "Nabunturan", "New Bataan", "Pantukan"],
        "Davao del Norte": ["Asuncion", "Braulio E. Dujali", "Carmen", "Kapalong", "New Corella", "Panabo City", "Samal City", "San Isidro", "Santo Tomas", "Tagum City", "Talaingod"],
        "Davao del Sur": ["Bansalan", "Davao City", "Digos City", "Hagonoy", "Kiblawan", "Magsaysay", "Malalag", "Matanao", "Padada", "Santa Cruz", "Sulop"],
        "Davao Occidental": ["Don Marcelino", "Jose Abad Santos", "Malita", "Santa Maria", "Sarangani"],
        "Davao Oriental": ["Baganga", "Banaybanay", "Boston", "Caraga", "Cateel", "Governor Generoso", "Lupon", "Manay", "Mati City", "San Isidro", "Tarragona"],
        "Dinagat Islands": ["Basilisa", "Cagdianao", "Dinagat", "Libjo", "Loreto", "San Jose", "Tubajon"],
        "Eastern Samar": ["Arteche", "Balangiga", "Balangkayan", "Borongan City", "Can-avid", "Dolores", "General MacArthur", "Giporlos", "Guiuan", "Hernani", "Jipapad", "Lawaan", "Llorente", "Maslog", "Maydolong", "Mercedes", "Oras", "Quinapondan", "Salcedo", "San Julian", "San Policarpo", "Sulat", "Taft"],
        "Guimaras": ["Buenavista", "Jordan", "Nueva Valencia", "San Lorenzo", "Sibunag"],
        "Ifugao": ["Aguinaldo", "Alfonso Lista", "Asipulo", "Banaue", "Hingyon", "Hungduan", "Kiangan", "Lagawe", "Lamut", "Mayoyao", "Tinoc"],
        "Ilocos Norte": ["Adams", "Bacarra", "Badoc", "Bangui", "Banna", "Batac City", "Burgos", "Carasi", "Currimao", "Dingras", "Dumalneg", "Laoag City", "Marcos", "Nueva Era", "Pagudpud", "Paoay", "Pasuquin", "Piddig", "Pinili", "San Nicolas", "Sarrat", "Solsona", "Vintar"],
        "Ilocos Sur": ["Alilem", "Banayoyo", "Bantay", "Burgos", "Cabugao", "Candon City", "Caoayan", "Cervantes", "Galimuyod", "Gregorio del Pilar", "Lidlidda", "Magsingal", "Nagbukel", "Narvacan", "Quirino", "Salcedo", "San Emilio", "San Esteban", "San Ildefonso", "San Juan", "San Vicente", "Santa", "Santa Catalina", "Santa Cruz", "Santa Lucia", "Santa Maria", "Santiago", "Santo Domingo", "Sigay", "Sinait", "Sugpon", "Suyo", "Tagudin", "Vigan City"],
        "Iloilo": ["Ajuy", "Alimodian", "Anilao", "Badiangan", "Balasan", "Banate", "Barotac Nuevo", "Barotac Viejo", "Batad", "Bingawan", "Cabatuan", "Calinog", "Carles", "Concepcion", "Dingle", "Dueñas", "Dumangas", "Estancia", "Guimbal", "Igbaras", "Janiuay", "Lambunao", "Leganes", "Lemery", "Leon", "Maasin", "Miagao", "Mina", "New Lucena", "Oton", "Passi City", "Pavia", "Pototan", "San Dionisio", "San Enrique", "San Joaquin", "San Miguel", "San Rafael", "Santa Barbara", "Sara", "Tigbauan", "Tubungan", "Zarraga"],
        "Isabela": ["Alicia", "Angadanan", "Aurora", "Benito Soliven", "Burgos", "Cabagan", "Cabatuan", "Cauayan City", "Cordon", "Delfin Albano", "Dinapigue", "Divilacan", "Echague", "Gamu", "Ilagan City", "Jones", "Luna", "Maconacon", "Mallig", "Naguilian", "Palanan", "Quezon", "Quirino", "Ramon", "Reina Mercedes", "Roxas", "San Agustin", "San Guillermo", "San Isidro", "San Manuel", "San Mariano", "San Mateo", "San Pablo", "Santa Maria", "Santiago City", "Santo Tomas", "Tumauini"],
        "Kalinga": ["Balbalan", "Lubuagan", "Pasil", "Pinukpuk", "Rizal", "Tabuk City", "Tanudan", "Tinglayan"],
        "La Union": ["Agoo", "Aringay", "Bacnotan", "Bagulin", "Balaoan", "Bangar", "Bauang", "Burgos", "Caba", "Luna", "Naguilian", "Pugo", "Rosario", "San Fernando City", "San Gabriel", "San Juan", "Santo Tomas", "Santol", "Sudipen", "Tubao"],
        "Laguna": ["Alaminos", "Bay", "Biñan City", "Cabuyao City", "Calamba City", "Calauan", "Cavinti", "Famy", "Kalayaan", "Liliw", "Los Baños", "Luisiana", "Lumban", "Mabitac", "Magdalena", "Majayjay", "Nagcarlan", "Paete", "Pagsanjan", "Pakil", "Pangil", "Pila", "Rizal", "San Pablo City", "San Pedro City", "Santa Cruz", "Santa Maria", "Santa Rosa City", "Siniloan", "Victoria"],
        "Lanao del Norte": ["Bacolod", "Baloi", "Baroy", "Iligan City", "Kapatagan", "Kauswagan", "Kolambugan", "Lala", "Linamon", "Magsaysay", "Maigo", "Matungao", "Munai", "Nunungan", "Pantao Ragat", "Pantar", "Poona Piagapo", "Salvador", "Sapad", "Sultan Naga Dimaporo", "Tagoloan", "Tangcal", "Tubod"],
        "Lanao del Sur": ["Bacolod-Kalawi", "Balabagan", "Balindong", "Bayang", "Binidayan", "Buadiposo-Buntong", "Bubong", "Butig", "Calanogas", "Ditsaan-Ramain", "Ganassi", "Kapai", "Kapatagan", "Lumba-Bayabao", "Lumbatan", "Lumbaca-Unayan", "Lumbayanague", "Madalum", "Madamba", "Maguing", "Malabang", "Marantao", "Marawi City", "Masiu", "Mulondo", "Pagayawan", "Piagapo", "Poona Bayabao", "Pualas", "Saguiaran", "Sultan Dumalondong", "Tagoloan II", "Tamparan", "Taraka", "Tubaran", "Tugaya", "Wao"],
        "Leyte": ["Abuyog", "Alangalang", "Albuera", "Babatngon", "Barugo", "Bato", "Baybay City", "Burauen", "Calubian", "Capoocan", "Carigara", "Dagami", "Dulag", "Hilongos", "Hindang", "Inopacan", "Isabel", "Jaro", "Javier", "Julita", "Kananga", "La Paz", "Leyte", "MacArthur", "Mahaplag", "Matag-ob", "Matalom", "Mayorga", "Merida", "Ormoc City", "Palo", "Palompon", "Pastrana", "San Isidro", "San Miguel", "Santa Fe", "Tabango", "Tabontabon", "Tacloban City", "Tanauan", "Tolosa", "Tunga", "Villaba"],
        "Maguindanao": ["Ampatuan", "Barira", "Buldon", "Buluan", "Datu Abdullah Sanki", "Datu Anggal Midtimbang", "Datu Blah T. Sinsuat", "Datu Hoffer Ampatuan", "Datu Montawal", "Datu Odin Sinsuat", "Datu Paglas", "Datu Piang", "Datu Salibo", "Datu Saudi-Ampatuan", "Datu Unsay", "General Salipada K. Pendatun", "Guindulungan", "Kabuntalan", "Mamasapano", "Mangudadatu", "Matanog", "Northern Kabuntalan", "Pagalungan", "Paglat", "Pandag", "Parang", "Rajah Buayan", "Shariff Aguak", "Shariff Saydona Mustapha", "South Upi", "Sultan Kudarat", "Sultan Mastura", "Sultan sa Barongis", "Talayan", "Talitay", "Upi"],
        "Marinduque": ["Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Torrijos"],
        "Masbate": ["Aroroy", "Baleno", "Balud", "Batuan", "Cataingan", "Cawayan", "Claveria", "Dimasalang", "Esperanza", "Mandaon", "Masbate City", "Milagros", "Mobo", "Monreal", "Palanas", "Pio V. Corpuz", "Placer", "San Fernando", "San Jacinto", "San Pascual", "Uson"],
        "Metro Manila": ["Caloocan City", "Las Piñas City", "Makati City", "Malabon City", "Mandaluyong City", "Manila City", "Marikina City", "Muntinlupa City", "Navotas City", "Parañaque City", "Pasay City", "Pasig City", "Pateros", "Quezon City", "San Juan City", "Taguig City", "Valenzuela City"],
        "Misamis Occidental": ["Aloran", "Baliangao", "Bonifacio", "Calamba", "Clarin", "Concepcion", "Don Victoriano Chiongbian", "Jimenez", "Lopez Jaena", "Oroquieta City", "Ozamiz City", "Panaon", "Plaridel", "Sapang Dalaga", "Sinacaban", "Tangub City", "Tudela"],
        "Misamis Oriental": ["Alubijid", "Balingasag", "Balingoan", "Binuangan", "Cagayan de Oro City", "Claveria", "El Salvador City", "Gingoog City", "Gitagum", "Initao", "Jasaan", "Kinogitan", "Lagonglong", "Laguindingan", "Libertad", "Lugait", "Magsaysay", "Manticao", "Medina", "Naawan", "Opol", "Salay", "Sugbongcogon", "Tagoloan", "Talisayan", "Villanueva"],
        "Mountain Province": ["Barlig", "Bauko", "Besao", "Bontoc", "Natonin", "Paracelis", "Sabangan", "Sadanga", "Sagada", "Tadian"],
        "Negros Occidental": ["Bacolod City", "Bago City", "Binalbagan", "Cadiz City", "Calatrava", "Candoni", "Cauayan", "Enrique B. Magalona", "Escalante City", "Himamaylan City", "Hinigaran", "Hino.ba-an", "Ilog", "Isabela", "Kabankalan City", "La Carlota City", "La Castellana", "Manapla", "Moises Padilla", "Murcia", "Pontevedra", "Pulupandan", "Sagay City", "Salvador Benedicto", "San Carlos City", "San Enrique", "Silay City", "Sipalay City", "Talisay City", "Toboso", "Valladolid", "Victorias City"],
        "Negros Oriental": ["Amlan", "Ayungon", "Bacong", "Bais City", "Basay", "Bayawan City", "Bindoy", "Canlaon City", "Dauin", "Dumaguete City", "Guihulngan City", "Jimalalud", "La Libertad", "Mabinay", "Manjuyod", "Pamplona", "San Jose", "Santa Catalina", "Siaton", "Sibulan", "Tayasan", "Valencia", "Vallehermoso", "Zamboanguita"],
        "Northern Samar": ["Allen", "Biri", "Bobon", "Capul", "Catarman", "Catubig", "Gamay", "Laoang", "Lapinig", "Las Navas", "Lavezares", "Mapanas", "Mondragon", "Palapag", "Pambujan", "Rosario", "San Antonio", "San Isidro", "San Jose", "San Roque", "San Vicente", "Silvino Lobos", "Victoria"],
        "Nueva Ecija": ["Aliaga", "Bongabon", "Cabanatuan City", "Cabiao", "Carranglan", "Cuyapo", "Gabaldon", "Gapan City", "General Mamerto Natividad", "General Tinio", "Guimba", "Jaen", "Laur", "Licab", "Llanera", "Lupao", "Muñoz City", "Nampicuan", "Palayan City", "Pantabangan", "Peñaranda", "Quezon", "Rizal", "San Antonio", "San Isidro", "San Jose City", "San Leonardo", "Santa Rosa", "Santo Domingo", "Talavera", "Talugtug", "Zaragoza"],
        "Nueva Vizcaya": ["Alfonso Castaneda", "Ambaguio", "Aritao", "Bagabag", "Bambang", "Bayombong", "Diadi", "Dupax del Norte", "Dupax del Sur", "Kasibu", "Kayapa", "Quezon", "Santa Fe", "Solano", "Villaverde"],
        "Occidental Mindoro": ["Abra de Ilog", "Calintaan", "Looc", "Lubang", "Magsaysay", "Mamburao", "Paluan", "Rizal", "Sablayan", "San Jose", "Santa Cruz"],
        "Oriental Mindoro": ["Baco", "Bansud", "Bongabong", "Bulalacao", "Calapan City", "Gloria", "Mansalay", "Naujan", "Pinamalayan", "Pola", "Puerto Galera", "Roxas", "San Teodoro", "Socorro", "Victoria"],
        "Palawan": ["Aborlan", "Agutaya", "Araceli", "Balabac", "Bataraza", "Brooke's Point", "Busuanga", "Cagayancillo", "Coron", "Culion", "Cuyo", "Dumaran", "El Nido", "Kalayaan", "Linapacan", "Magsaysay", "Narra", "Puerto Princesa City", "Quezon", "Rizal", "Roxas", "San Vicente", "Sofronio Española", "Taytay"],
        "Pampanga": ["Angeles City", "Apalit", "Arayat", "Bacolor", "Candaba", "Floridablanca", "Guagua", "Lubao", "Mabalacat City", "Macabebe", "Magalang", "Masantol", "Mexico", "Minalin", "Porac", "San Fernando City", "San Luis", "San Simon", "Santa Ana", "Santa Rita", "Santo Tomas", "Sasmuan"],
        "Pangasinan": ["Agno", "Aguilar", "Alaminos City", "Alcala", "Anda", "Asingan", "Balungao", "Bani", "Basista", "Bautista", "Bayambang", "Binalonan", "Binmaley", "Bolinao", "Bugallon", "Burgos", "Calasiao", "Dagupan City", "Dasol", "Infanta", "Labrador", "Laoac", "Lingayen", "Mabini", "Malasiqui", "Manaoag", "Mangaldan", "Mangatarem", "Mapandan", "Natividad", "Pozzorubio", "Rosales", "San Carlos City", "San Fabian", "San Jacinto", "San Manuel", "San Nicolas", "San Quintin", "Santa Barbara", "Santa Maria", "Santo Tomas", "Sison", "Sual", "Tayug", "Umingan", "Urbiztondo", "Urdaneta City", "Villasis"],
        "Quezon": ["Agdangan", "Alabat", "Atimonan", "Buenavista", "Burdeos", "Calauag", "Candelaria", "Catanauan", "Dolores", "General Luna", "General Nakar", "Guinayangan", "Gumaca", "Infanta", "Jomalig", "Lopez", "Lucban", "Lucena City", "Macalelon", "Mauban", "Mulanay", "Padre Burgos", "Pagbilao", "Panukulan", "Patnanungan", "Perez", "Pitogo", "Plaridel", "Polillo", "Quezon", "Real", "Sampaloc", "San Andres", "San Antonio", "San Francisco", "San Narciso", "Sariaya", "Tagkawayan", "Tayabas City", "Tiaong", "Unisan"],
        "Quirino": ["Aglipay", "Cabarroguis", "Diffun", "Maddela", "Nagtipunan", "Saguday"],
        "Rizal": ["Angono", "Antipolo City", "Baras", "Binangonan", "Cainta", "Cardona", "Jalajala", "Morong", "Pililla", "Rodriguez", "San Mateo", "Tanay", "Taytay", "Teresa"],
        "Romblon": ["Alcantara", "Banton", "Cajidiocan", "Calatrava", "Concepcion", "Corcuera", "Ferrol", "Looc", "Magdiwang", "Odiongan", "Romblon", "San Agustin", "San Andres", "San Fernando", "San Jose", "Santa Fe", "Santa Maria"],
        "Samar": ["Almagro", "Basey", "Calbayog City", "Calbiga", "Catbalogan City", "Daram", "Gandara", "Hinabangan", "Jiabong", "Marabut", "Matuguinao", "Motiong", "Pagsanghan", "Paranan", "Pinabacdao", "San Jorge", "San Jose de Buan", "San Sebastian", "Santa Margarita", "Santa Rita", "Santo Niño", "Tagapul-an", "Talalora", "Tarangnan", "Villareal", "Zumarraga"],
        "Sarangani": ["Alabel", "Glan", "Kiamba", "Maasim", "Maitum", "Malapatan", "Malungon"],
        "Siquijor": ["Enrique Villanueva", "Larena", "Lazi", "Maria", "San Juan", "Siquijor"],
        "Sorsogon": ["Barcelona", "Bulan", "Bulusan", "Casiguran", "Castilla", "Donsol", "Gubat", "Irosin", "Juban", "Magallanes", "Matnog", "Pilar", "Prieto Diaz", "Santa Magdalena", "Sorsogon City"],
        "South Cotabato": ["Banga", "General Santos City", "Koronadal City", "Lake Sebu", "Norala", "Polomolok", "Santo Niño", "Surallah", "T'Boli", "Tampakan", "Tantangan", "Tupi"],
        "Southern Leyte": ["Anahawan", "Bontoc", "Hinunangan", "Hinundayan", "Libagon", "Liloan", "Limasawa", "Maasin City", "Macrohon", "Malitbog", "Padre Burgos", "Pintuyan", "Saint Bernard", "San Francisco", "San Juan", "San Ricardo", "Silago", "Sogod", "Tomas Oppus"],
        "Sultan Kudarat": ["Bagumbayan", "Columbio", "Esperanza", "Isulan", "Kalamansig", "Lambayong", "Lebak", "Lutayan", "Palimbang", "President Quirino", "Senator Ninoy Aquino", "Tacurong City"],
        "Sulu": ["Banguingui", "Hadji Panglima Tahil", "Indanan", "Jolo", "Kalingalan Caluang", "Lugus", "Luuk", "Maimbung", "Old Panamao", "Omar", "Pandami", "Panglima Estino", "Pangutaran", "Parang", "Pata", "Patikul", "Siasi", "Talipao", "Tapul", "Tongkil"],
        "Surigao del Norte": ["Alegria", "Bacuag", "Burgos", "Claver", "Dapa", "Del Carmen", "General Luna", "Gigaquit", "Mainit", "Malimono", "Pilar", "Placer", "San Benito", "San Francisco", "San Isidro", "Santa Monica", "Sison", "Socorro", "Surigao City", "Tagana-an", "Tubod"],
        "Surigao del Sur": ["Barobo", "Bayabas", "Bislig City", "Cagwait", "Cantilan", "Carmen", "Carrascal", "Cortes", "Hinatuan", "Lanuza", "Lianga", "Lingig", "Madrid", "Marihatag", "San Agustin", "San Miguel", "Tagbina", "Tago", "Tandag City"],
        "Tarlac": ["Anao", "Bamban", "Camiling", "Capas", "Concepcion", "Gerona", "La Paz", "Mayantoc", "Moncada", "Paniqui", "Pura", "Ramos", "San Clemente", "San Jose", "San Manuel", "Santa Ignacia", "Tarlac City", "Victoria"],
        "Tawi-Tawi": ["Bongao", "Languyan", "Mapun", "Panglima Sugala", "Sapa-Sapa", "Sibutu", "Simunul", "Sitangkai", "South Ubian", "Tandubas", "Turtle Islands"],
        "Zambales": ["Botolan", "Cabangan", "Candelaria", "Castillejos", "Iba", "Masinloc", "Olongapo City", "Palauig", "San Antonio", "San Felipe", "San Marcelino", "San Narciso", "Santa Cruz", "Subic"],
        "Zamboanga del Norte": ["Baliguian", "Dapitan City", "Dipolog City", "Godod", "Gutalac", "Jose Dalman", "Kalawit", "Katipunan", "La Libertad", "Labason", "Liloy", "Manukan", "Mutia", "Piñan", "Polanco", "President Manuel A. Roxas", "Rizal", "Salug", "Sergio Osmeña Sr.", "Siayan", "Sibuco", "Sibutad", "Sindangan", "Siocon", "Sirawai", "Tampilisan"],
        "Zamboanga del Sur": ["Aurora", "Bayog", "Dimataling", "Dinas", "Dumalinao", "Dumingag", "Guipos", "Josefina", "Kumalarang", "Labangan", "Lakewood", "Lapuyan", "Mahayag", "Margosatubig", "Midsalip", "Molave", "Pagadian City", "Pitogo", "Ramon Magsaysay", "San Miguel", "San Pablo", "Sominot", "Tabina", "Tambulig", "Tigbao", "Tukuran", "Vincenzo A. Sagun"],
        "Zamboanga Sibugay": ["Alicia", "Buug", "Diplahan", "Imelda", "Ipil", "Kabasalan", "Mabuhay", "Malangas", "Naga", "Olutanga", "Payao", "Roseller Lim", "Siay", "Talusan", "Titay", "Tungawan"]
    };

    const stepConfig = {
        "New Enrollee": ["Welcome", "Profile", "Education", "Family", "Uploads", "Review"],
        "Transferee": ["Welcome", "Profile", "Education", "Family", "Uploads", "Review"],
        "Returnee": ["Welcome", "Verify", "Readmission", "Review"],
    };
    
    const welcomeContent = {
        "New Enrollee": { 
            title: "Welcome, New Enrollees!", 
            requirements: `<ul><li>Learner Reference Number (LRN)</li><li>Basic personal information</li><li>Parent/Guardian details</li><li><em>Documents are optional but recommended</em></li></ul>` 
        },
        "Transferee": { 
            title: "Welcome, Transferee!", 
            requirements: `<ul><li>Learner Reference Number (LRN)</li><li>Basic personal information</li><li>Parent/Guardian details</li><li><em>Documents are optional but recommended</em></li></ul>` 
        },
        "Returnee": { 
            title: "Welcome Back, Returnee!", 
            requirements: `<ul><li>Your Learner Reference Number (LRN)</li><li>Updated contact information</li></ul>` 
        },
    };
    
    const uploadRequirements = {
        "New Enrollee": [
            { name: "birth_cert", label: "Birth Certificate (PDF or Image) - Required *" }, 
            { name: "form137", label: "Form 137 (PDF or Image) - Optional" }, 
            { name: "good_moral", label: "Good Moral Certificate (PDF or Image) - Optional" }, 
            { name: "report_card", label: "Report Card (PDF or Image) - Optional" }, 
            { name: "picture", label: "2X2 Picture (Image) - Optional" }
        ],
        "Transferee": [
            { name: "birth_cert", label: "Birth Certificate (PDF or Image) - Required *" }, 
            { name: "transcript_records", label: "Transcript of Records (PDF or Image) - Optional" }, 
            { name: "honorable_dismissal", label: "Honorable Dismissal (PDF or Image) - Optional" }, 
            { name: "picture", label: "2X2 Picture (Image) - Optional" }
        ],
        "Returnee": [],
    };
    
    
    async function fetchStrands() {
        const strandSelect = document.getElementById('strandSelect');
        
        try {
            // Change '/strands' to your actual backend endpoint if different
            const response = await fetch(`${API_BASE_URL}/strands`); 
            const data = await response.json();
    
            if (data.success) {
                // Clear current options
                strandSelect.innerHTML = '<option value="">-- Select --</option>';
                
                // Populate with data from database
                // Assuming your database returns an array of objects like [{ strand_name: 'STEM' }]
                data.data.forEach(strand => {
                    const option = document.createElement('option');

                    option.value = strand.strand_code; 
                    option.textContent = `${strand.strand_code} - ${strand.strand_name}`;
                    strandSelect.appendChild(option);
                });
            } else {
                strandSelect.innerHTML = '<option value="">Error loading strands</option>';
            }
        } catch (error) {
            console.error('Error fetching strands:', error);
            strandSelect.innerHTML = '<option value="">Failed to load strands</option>';
        }
    }
    

    const form = document.getElementById("regForm");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const formSection = document.getElementById("apply");
    const stepperContainer = document.querySelector(".stepper");
    const typeButtons = document.querySelectorAll(".student-type-btn");
    const applicantStepsContainer = document.querySelector('.applicant-steps');
    const returneeStepsContainer = document.querySelector('.returnee-steps');
    const provinceSelect = document.getElementById('province-select');
    const municipalitySelect = document.getElementById('municipality-select');
    const birthdateInput = document.querySelector('input[name="birthdate"]');
    const ageInput = document.querySelector('input[name="age"]');
    const ipCheckbox = document.getElementById('ip_community');
    const ipSpecifyInput = document.getElementById('ip_specify');
    const fourpsCheckbox = document.getElementById('fourps_beneficiary');
    const fourpsIdInput = document.getElementById('fourps_id');
    
    function updateUI() {
        const activeSteps = stepConfig[studentType];
        
        document.getElementById('welcome-title').textContent = welcomeContent[studentType].title;
        document.getElementById('welcome-requirements').innerHTML = welcomeContent[studentType].requirements;

        stepperContainer.innerHTML = activeSteps.map(title => `<div class="step"><div class="icon"><i class="fas fa-check"></i></div><p>${title}</p></div>`).join('');
        stepperContainer.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === currentStep) step.classList.add('active');
            if (index < currentStep) step.classList.add('completed');
        });

        // --- FIX: Correctly show/hide form sections based on student type ---
        const isReturnee = studentType === "Returnee";
        applicantStepsContainer.style.display = isReturnee ? 'none' : 'block';
        returneeStepsContainer.style.display = isReturnee ? 'block' : 'none';

        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        
        let currentStepEl;
        if (currentStep === 0) {
            currentStepEl = document.querySelector('.form-step[data-step-index="0"]');
        } else if (currentStep === activeSteps.length - 1) {
            currentStepEl = document.getElementById('review-step');
        } else {
            const activeContainer = isReturnee ? returneeStepsContainer : applicantStepsContainer;
            currentStepEl = activeContainer.querySelector(`.form-step[data-step-index="${currentStep}"]`);
        }
        if (currentStepEl) currentStepEl.classList.add('active');

        const yearLevelSelect = document.getElementById('yearLevelSelect');
        if (studentType === 'New Enrollee') {
            yearLevelSelect.disabled = false;
        } else {
            yearLevelSelect.disabled = false;
        }

        prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        nextBtn.textContent = currentStep === activeSteps.length - 1 ? 'Submit' : 'Next';
    }

    function handleNextClick() {
        if (nextBtn.disabled) return;
    
        if (currentStep === 0) {
            const consentCheckbox = document.getElementById("privacy-consent-checkbox");
            if (!consentCheckbox.checked) {
                alert("You must agree to the Data Privacy Notice to continue.");
                return;
            }
        }
    
        const activeStepEl = document.querySelector('.form-step.active');
        let isValid = true;
        if (activeStepEl) {
            // Check only visible and required inputs within the active step
            // EXCLUDE file inputs from validation
            activeStepEl.querySelectorAll('input:required:not([type="file"]), select:required, textarea:required').forEach(input => {
                if(input.offsetParent !== null && !input.checkValidity()){ // Check if element is visible
                    input.reportValidity();
                    isValid = false;
                }
            });
        }
        if (!isValid) return;
    
        if (currentStep < stepConfig[studentType].length - 1) {
            currentStep++;
            if (currentStep === stepConfig[studentType].length - 1) {
                populateReview();
            }
            updateUI();
        } else {
            handleSubmit();
        }
    }

    function handlePrevClick() {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    }

    provinceSelect.innerHTML = '<option value="">-- SELECT --</option>' + Object.keys(philippineLocations).map(p => `<option value="${p.toUpperCase()}">${p.toUpperCase()}</option>`).join('');
    municipalitySelect.innerHTML = '<option value="">-- SELECT --</option>';
    municipalitySelect.disabled = true;
    
    provinceSelect.addEventListener('change', function() {
        const selectedProvince  = this.options[this.selectedIndex].text; // Get text for matching
        const provinceKey = Object.keys(philippineLocations).find(k => k.toUpperCase() === selectedProvince);

        municipalitySelect.innerHTML = '<option value="">-- SELECT --</option>';
        
        if (provinceKey) {
            municipalitySelect.disabled = false;
            const municipalities = philippineLocations[provinceKey];
            if (municipalities) {
                municipalities.forEach(municipality => {
                    const option = document.createElement('option');
                    option.value = municipality.toUpperCase();
                    option.textContent = municipality.toUpperCase();
                    municipalitySelect.appendChild(option);
                });
            }
        } else {
            municipalitySelect.disabled = true;
        }
    });
    
    ageInput.readOnly = true;
    
    
    
    ipCheckbox.addEventListener('change', function() {
        ipSpecifyInput.disabled = !this.checked;
        if (!this.checked) {
            ipSpecifyInput.value = '';
        }
    });
    
    fourpsCheckbox.addEventListener('change', function() {
        fourpsIdInput.disabled = !this.checked;
        if (!this.checked) {
            fourpsIdInput.value = '';
        }
    });
    
    
    
    function calculateAge(birthdate) {
        if (!birthdate) return '';
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age > 0 ? age : 0;
    }

    birthdateInput.addEventListener('change', function() {
        ageInput.value = calculateAge(this.value);
    });

    function populateReview() {
        const q = (name) => form.querySelector(`[name='${name}']`);
        const getFile = (name) => q(name)?.files?.[0]?.name || "Not uploaded";
        const safeSet = (id, value) => { document.getElementById(id).textContent = value || "N/A"; };
        
        const isReturnee = studentType === 'Returnee';
        
        safeSet("rev_student_type", studentType);
        document.getElementById('review-applicant-details').style.display = !isReturnee ? 'contents' : 'none';
        document.getElementById('review-returnee-details').style.display = isReturnee ? 'contents' : 'none';
        document.getElementById('review-parents-section').style.display = !isReturnee ? 'block' : 'none';
        document.getElementById('review-docs-section').style.display = !isReturnee ? 'block' : 'none';

        if (!isReturnee) {
            safeSet("rev_lrn", q("lrn")?.value);
            safeSet("rev_name", `${q("firstname")?.value} ${q("middlename")?.value} ${q("lastname")?.value} ${q("suffix")?.value}`.replace(/\s+/g, " ").trim());
            safeSet("rev_email", q("email")?.value);
            safeSet("rev_phone", q("phone")?.value);
            safeSet("rev_birthdate", q("birthdate")?.value);
            safeSet("rev_age", q("age")?.value);
            safeSet("rev_sex", q("sex")?.value);
            safeSet("rev_status", q("status")?.value);
            safeSet("rev_nationality", q("nationality")?.value);
            safeSet("rev_religion", q("religion")?.value);
            safeSet("rev_pob", `${q("birth_municipality")?.value}, ${q("birth_province")?.value}`);
            safeSet("rev_address", `${q("lot_blk")?.value}, ${q("street")?.value}, ${q("barangay")?.value}, ${q("municipality")?.value}, ${q("province")?.value} ${q("zipcode")?.value}`);
            
            safeSet("rev_fathersName", `${q("fathers_firstname")?.value} ${q("fathers_middlename")?.value} ${q("fathers_lastname")?.value}`.trim());
            safeSet("rev_fathersContact", q("fathers_contact")?.value);
            // --- FIX: Use the correct field for mother's contact number ---
            safeSet("rev_mothersName", `${q("mothers_firstname")?.value} ${q("mothers_middlename")?.value} ${q("mothers_lastname")?.value}`.trim());
            safeSet("rev_mothersContact", q("mothers_contact")?.value);
            safeSet("rev_guardianName", `${q("guardian_firstname")?.value} ${q("guardian_middlename")?.value} ${q("guardian_lastname")?.value}`.trim());
            safeSet("rev_guardianContact", q("guardian_contact")?.value);
        } else {
            safeSet("rev_lrn", q("returnee_lrn")?.value);
            safeSet("rev_name", "N/A"); // No name fields for returnee verification
            safeSet("rev_email", q("returnee_email")?.value);
            safeSet("rev_phone", q("returnee_phone")?.value);
            safeSet("rev_reason_leaving", q("reason_leaving")?.value);
            safeSet("rev_reason_returning", q("reason_returning")?.value);
        }

        const reviewDocsContainer = document.getElementById("rev_docs_container");
        const currentUploads = uploadRequirements[studentType];
        if (currentUploads.length > 0) {
            reviewDocsContainer.innerHTML = currentUploads.map(doc => `<p><strong>${doc.label.replace(" *", "")}:</strong> <span>${getFile(doc.name)}</span></p>`).join('');
        } else {
            reviewDocsContainer.innerHTML = `<p>No documents are required for this application type.</p>`;
        }
    }

    function handleSubmit() {
    const yearLevelSelect = document.getElementById('yearLevelSelect');
    const wasDisabled = yearLevelSelect.disabled;
    
    if (wasDisabled) {
        yearLevelSelect.disabled = false;
    }
    
    const formData = new FormData(form);
    
    // Add all required fields explicitly to ensure they're included
    formData.append("student_type", studentType);
    
    // Add returnee-specific fields if applicable
    if (studentType === 'Returnee') {
        formData.append("lrn", document.querySelector('[name="returnee_lrn"]').value);
        formData.append("email", document.querySelector('[name="returnee_email"]').value);
        formData.append("phone", document.querySelector('[name="returnee_phone"]').value);
    }
    
    // Log form data for debugging (remove in production)
    console.log("Submitting form data:");
    for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
    }
    
    if (wasDisabled) {
        yearLevelSelect.disabled = true;
    }

    nextBtn.disabled = true;
    nextBtn.textContent = "Submitting...";

    // Real submission to your backend
    fetch(`${API_BASE_URL}/enroll`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response received:", data);
        if (data.success) {
            document.getElementById("form-content").style.display = "none";
            document.querySelector(".buttons").style.display = "none";
            const success = document.getElementById("success-message");
            success.style.display = "block";
            document.getElementById("success-ref-id").textContent = data.reference;
            document.getElementById("success-text").textContent = data.message;
        } else {
            throw new Error(data.message || "Submission failed");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Submission failed: " + error.message);
        nextBtn.disabled = false;
        nextBtn.textContent = "Submit";
    });
}
    
    function generateUploadFields(type) {
        const applicantUploadsContainer = document.getElementById('applicant-uploads');
        const currentUploads = uploadRequirements[type] || [];
        applicantUploadsContainer.innerHTML = currentUploads.map(doc => 
            `<div class="form-group"><label>${doc.label}</label><input type="file" name="${doc.name}" accept=".pdf, image/*"></div>`
        ).join('') || '<h3>No Documents Required</h3>';
    }

    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            studentType = btn.dataset.type;
            
            generateUploadFields(studentType);
            
            currentStep = 0;
            form.reset(); 
            // After reset, re-apply default disabled states and values
            document.getElementById('privacy-consent-checkbox').checked = false;
            ageInput.value = '';
            municipalitySelect.innerHTML = '<option value="">-- SELECT MUNICIPALITY --</option>';
            municipalitySelect.disabled = true;

            updateUI();
        });
    });

    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
    
    document.getElementById('registerAgainBtn').addEventListener('click', () => {
        document.getElementById('form-content').style.display = 'block';
        document.querySelector(".buttons").style.display = "flex";
        document.getElementById('success-message').style.display = 'none';
        currentStep = 0;
        studentType = 'New Enrollee';
        typeButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('.student-type-btn[data-type="New Enrollee"]').classList.add('active');
        form.reset();
        document.getElementById('privacy-consent-checkbox').checked = false;
        ageInput.value = '';
        municipalitySelect.innerHTML = '<option value="">-- SELECT MUNICIPALITY --</option>';
        municipalitySelect.disabled = true;
        generateUploadFields(studentType);
        updateUI();
    });
    
    const applyBtn = document.querySelector('.apply-now');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    const scrollToForm = (e) => {
        e.preventDefault();
        formSection.scrollIntoView({ behavior: 'smooth' });
    };

    applyBtn.addEventListener('click', scrollToForm);

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.dataset.target === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (btn.dataset.target === 'apply') {
                scrollToForm(e);
            }
        });
    });
    
    const revealOnScroll = () => {
        if(formSection.getBoundingClientRect().top < window.innerHeight - 150) {
            formSection.classList.add('visible');
        }
    };
    
    const updateActiveNav = () => {
        const scrollPos = window.scrollY;
        const formTop = formSection.offsetTop - 75; // Adjust offset to match header height
        navButtons.forEach(b => b.classList.remove('active'));
        if (scrollPos >= formTop) {
            document.querySelector('.nav-btn[data-target="apply"]').classList.add('active');
        } else {
            document.querySelector('.nav-btn[data-target="home"]').classList.add('active');
        }
    };

    window.addEventListener('scroll', () => {
        revealOnScroll();
        updateActiveNav();
    });

    // Initial setup
    fetchStrands();
    generateUploadFields(studentType);
    revealOnScroll();
    updateActiveNav();
    updateUI();
    
});