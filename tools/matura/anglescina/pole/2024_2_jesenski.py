# Angleščina, jesenski rok 2024 (vzor: M242-241 in M242-242)
LETO, ROK, IZVEDBA = 2024, "jesenski", 1
DATUM = "torek, 27. avgust 2024"

POSNETEK_A = REC(
    "Mountain rescue volunteer",
    "You are going to listen to an interview with Tom Hughes, a volunteer with a mountain rescue team in the Lake District.",
    """Interviewer: Tom, how long have you been a mountain rescue volunteer?

Tom: Eighteen years now. I joined when I was twenty-four, after I twisted my ankle on a mountain myself and had to be carried down. I was so grateful that I decided I wanted to give something back.

Interviewer: Are all the team members volunteers?

Tom: Every one of them. We have about forty members – teachers, farmers, a dentist, two nurses. Nobody is paid, and we even raise most of the money for our equipment ourselves. A new vehicle costs around sixty thousand pounds, so we spend a lot of weekends shaking collection boxes.

Interviewer: What happens when someone calls for help?

Tom: They ring 999 and ask for the police, who then contact us. Our phones beep, and whoever is free drops what they are doing. I've left a birthday party, a wedding and once even a dentist's chair with my mouth still numb. Usually we're on our way within fifteen minutes.

Interviewer: What kind of people do you rescue?

Tom: All kinds. Many are walkers who are lost or injured, often because they started too late in the day. In summer we see a lot of people in trainers who are not prepared for the weather, which can change very quickly up there. Mobile phones have changed things a lot. People use them to call us, but they also rely on them for maps, and then the battery dies.

Interviewer: What was your most difficult rescue?

Tom: A climber who fell at night in a snowstorm. It took us nine hours to reach him and bring him down. We couldn't use the helicopter because of the wind. He survived, and every Christmas he sends us a card. That makes it all worthwhile.

Interviewer: Any advice for our listeners?

Tom: Tell someone where you're going and when you expect to be back. And carry a paper map. It never runs out of battery.""")

POSNETEK_B = REC(
    "Tiny forests",
    "You are going to listen to an interview with Dr Priya Shah, an ecologist who plants small forests in cities.",
    """Interviewer: Dr Shah, what exactly is a tiny forest?

Dr Shah: It's a very dense forest about the size of a tennis court. The method comes from a Japanese botanist, Akira Miyawaki, who developed it in the 1970s. Instead of planting a few trees far apart, you plant around six hundred young trees very close together – three per square metre.

Interviewer: Why so close?

Dr Shah: Because the trees compete for light, so they grow upwards very fast – about ten times faster than in a normal plantation. After three years the forest needs no more care at all. We also use only native species, at least thirty different ones, so the forest is similar to the one that would have grown there naturally.

Interviewer: What are the benefits in a city?

Dr Shah: Many. A tiny forest can be several degrees cooler than the street next to it on a hot day. It absorbs rainwater, reduces noise and attracts wildlife. In our first forest in Leeds, volunteers counted over five hundred species of insects and animals within two years.

Interviewer: Who does the planting?

Dr Shah: Local people, especially schoolchildren. A planting day usually takes a single morning. We think it's important that people feel the forest belongs to them, so each forest has a group of "tree keepers" from the neighbourhood who collect data and organise events.

Interviewer: Are there any critics?

Dr Shah: Yes. Some foresters say the method is expensive, and that not all the trees will survive in such crowded conditions. That's true – some will die. But that is exactly what happens in a natural forest too.""")

OR = {
    1: [
        SA("Night trains", """# All aboard: the comeback of the European night train
Twenty years ago, the night train seemed to be dying. Budget airlines had made it cheaper to fly from Paris to Rome than to sleep on a train, and one by one, the old sleeper services disappeared from European timetables. Today, the night train is back – and in some places, tickets sell out months in advance.

The revival began in 2016, when Austrian Railways took over several routes that German Railways had decided to close. Many experts thought the decision was a mistake. Instead, passenger numbers grew so quickly that the company ordered a new generation of trains, with private cabins that include their own shower and toilet.

The main reason for the change is climate. A journey by night train produces up to ten times less carbon dioxide than the same journey by plane. For a growing number of travellers, especially young people, this matters. "I used to fly to my grandmother's in Vienna three times a year," says Lena, a 23-year-old student from Brussels. "Now I take the night train. I fall asleep in Belgium and wake up in Austria. It feels like a small adventure every time."

There are practical advantages too. Night trains arrive in the city centre, not at an airport an hour away, and passengers save the cost of a hotel. There is no need to arrive two hours early for security checks, and you can bring as much luggage as you can carry.

The night train still has its problems, however. Tickets are often more expensive than flights, partly because airlines pay no tax on fuel. Delays are common, as trains must pass through several countries with different rail systems. And not everyone can sleep on a moving train.

Still, governments are beginning to listen. France has banned short domestic flights where a train journey of less than two and a half hours exists, and several countries have promised money for new sleeper routes. For travellers like Lena, the message is simple: "The journey is part of the holiday."

(Vadbeno besedilo Piflar.si)""", [
            ("What made flying cheaper than night trains twenty years ago?", "Budget airlines.", "»Budget airlines had made it cheaper to fly …«."),
            ("Which company started the revival of night trains?", "Austrian Railways.", "»Austrian Railways took over several routes«."),
            ("What did experts think of the company's decision?", "That it was a mistake.", "»Many experts thought the decision was a mistake«."),
            ("What do the new private cabins include?", "A shower and a toilet.", "»with private cabins that include their own shower and toilet«."),
            ("What is the main reason for the return of the night train?", "Climate (change). / Lower CO₂ emissions.", "»The main reason for the change is climate«."),
            ("How often did Lena use to fly to Vienna?", "Three times a year.", "»three times a year«."),
            ("Where do night trains arrive?", "In the city centre.", "»arrive in the city centre, not at an airport«."),
            ("What do passengers save on besides travel time to the airport?", "(The cost of) a hotel.", "»passengers save the cost of a hotel«."),
            ("Why are flights often cheaper than night trains?", "Airlines pay no tax on fuel.", "»partly because airlines pay no tax on fuel«."),
            ("What has France banned?", "Short domestic flights (where a train takes under 2.5 hours).", "Prepoved kratkih notranjih letov, kjer obstaja vlak."),
        ], ("When did night trains seem to be dying?", "Twenty years ago.")),
        GAPS("Learning to fail", """# Why schools should teach students how to fail
Most of us are afraid of failure. At school, a bad mark can feel like a disaster, and many students would rather not try at all than risk getting something wrong. [0] Yet psychologists say that learning to deal with failure may be one of the most important skills a young person can have.

The idea is not new. [1] Thomas Edison is said to have tested thousands of materials before he found one that worked in his light bulb.

Some schools are now trying to put this idea into practice. [2] In one London school, pupils take part in a "failure week", during which teachers talk openly about their own mistakes.

The results have been surprising. [3] Students who had previously avoided difficult questions began to put their hands up more often.

Researchers explain this with the idea of a "growth mindset". [4] People who believe that intelligence is fixed tend to give up quickly, while those who believe it can grow see mistakes as information.

Not everyone is convinced, however. [5] Some critics argue that celebrating failure sends the wrong message and that students still need to know when work is not good enough.

Parents, too, play an important role. [6] Children who are always protected from disappointment may find it harder to cope when things go wrong later in life.

The key, experts say, is how adults react. [7] Praising effort and strategy, rather than talent, teaches children that they can improve.

Of course, failure is never pleasant. [8] But it is often the moment when real learning begins.

As one teacher puts it, "If my students never make mistakes, the work is too easy." [9] Perhaps, then, the most useful lesson a school can teach is how to get up again. [10]

(Vadbeno besedilo Piflar.si)""", {
            "A": "Many famous inventors failed many times before they succeeded.",
            "B": "In the long run, this can be more harmful than helpful.",
            "C": "This fear, they say, can stop us from learning.",
            "D": "They believe that resilience can be taught like any other subject.",
            "E": "According to this theory, our attitude towards our abilities matters.",
            "F": "Comments such as 'You're so clever' can actually do harm.",
            "G": "Exam results at the school fell sharply.",
            "H": "Teachers reported that their classes became more willing to take risks.",
            "I": "They worry that standards will fall.",
            "J": "Nobody enjoys getting something wrong.",
            "K": "And that is exactly when they stop learning.",
            "L": "After all, life is full of second chances.",
            "M": "Most students prefer easy tasks.",
        }, [
            ("A", "Ideja ni nova – izumitelji; sledi primer Edisona."),
            ("D", "Šole poskušajo idejo uresničiti – odpornost (resilience) kot predmet; sledi primer šole."),
            ("H", "Presenetljivi rezultati – razredi bolj pripravljeni tvegati; sledi primer učencev."),
            ("E", "Teorija »growth mindset«: odnos do lastnih sposobnosti; sledi razlaga."),
            ("I", "Ni vsak prepričan – skrb, da bodo standardi padli; sledi mnenje kritikov."),
            ("B", "Vloga staršev: pretirana zaščita je dolgoročno škodljiva."),
            ("F", "Odziv odraslih: pohvala »You're so clever« škodi; sledi: pohvali trud."),
            ("J", "Neuspeh ni prijeten – nihče ne uživa v napakah; But … sledi."),
            ("K", "»If my students never make mistakes« – takrat se nehajo učiti."),
            ("L", "Življenje je polno drugih priložnosti – sklep o vstajanju po padcu."),
        ], "C", vrsta="sentences"),
        GF("The last lighthouse keepers", """# Life on the rock: the last lighthouse keepers
For centuries, lighthouse keepers were among the loneliest workers in Britain. Their job was to make sure that the light never went out, _0_ the weather was like.

Most lighthouses were staffed by three men, who worked in shifts of a month or more. During that time they could not leave the rock, and they depended _1_ supply boats for food, water and news. In winter, storms sometimes made it impossible for the boats to land _2_ weeks at a time.

The keepers had to be practical. _3_ cleaning the lamp and winding the clockwork that turned it, they repaired engines, cooked, and kept a detailed record of the weather. Many of them also found ways to fight boredom. Some painted, some built model ships, and _4_ learnt to play musical instruments.

Life on the rock could be dangerous as _5_ as dull. In 1900, three keepers disappeared from a lighthouse on the Flannan Isles, off the west coast of Scotland. When a relief boat arrived, the lighthouse was empty, the clocks _6_ stopped, and one of the keepers' coats was still hanging by the door. _7_ really happened to the men remains a mystery. The most likely explanation is that they _8_ swept into the sea by a huge wave.

The age of the lighthouse keeper came to an end in 1998, _9_ the last lighthouse in Britain was automated. Today the lights are controlled by computers, and engineers visit only _10_ or twice a year. Many of the keepers' cottages have been turned _11_ holiday homes, and visitors often say they understand for the first time _12_ the keepers felt, cut off from the rest of the world.

One former keeper, now in his eighties, still misses the life. "People think it was lonely," he says, "but I have never felt as free as I _13_ out there. The sea teaches you patience. You can't hurry a storm – you just wait _14_ it passes." He keeps his old logbook on the kitchen table, and its pages, _15_ are full of notes on wind and waves, still smell of salt.

(Vadbeno besedilo Piflar.si)""", [
            ("whatever", "primer"),
            ("on", "depend on."),
            ("for", "for weeks at a time – trajanje."),
            ("Besides / Beyond", "Poleg tega, da so čistili svetilko … (besides + -ing)."),
            ("others", "some …, some … and others."),
            ("well", "dangerous as well as dull – as well as = in tudi."),
            ("had", "Predpreteklik: ure so se ustavile že prej (had stopped)."),
            ("What", "What really happened … – samostalniški odvisnik."),
            ("were", "Trpnik v pretekliku: were swept."),
            ("when", "Časovni oziralni odvisnik za letnico."),
            ("once", "once or twice a year."),
            ("into", "turn into – spremeniti v."),
            ("how", "understand how they felt."),
            ("did", "as free as I did (= felt) – pomožni glagol namesto ponovitve."),
            ("until / till", "wait until – dokler."),
            ("which", "Nedoločni oziralni stavek med vejicama: its pages, which are …"),
        ]),
        GF("The wrong suitcase", """# The wrong suitcase
Last summer my sister and I _0_ (FLY) to Lisbon for a week's holiday. When we _1_ (ARRIVE) at the airport, we went straight to the baggage hall. Our flight _2_ (DELAY) by three hours, so we were tired and hungry, and the hall was almost empty. My sister's suitcase _3_ (ALREADY / GO) round the belt twice before she noticed it. She grabbed it and we _4_ (TAKE) a taxi to the hotel.

It was only that evening, when she opened it, that she realised it _5_ (NOT / BELONG) to her. Instead of her summer dresses, it _6_ (CONTAIN) two men's suits, a pair of shoes and a book about birds. "Somebody _7_ (MUST / TAKE) mine by mistake," she said. We called the airport, but the lost luggage office _8_ (ALREADY / CLOSE) for the night.

The next morning a man rang the hotel. He _9_ (LOOK) for his suitcase all night, he said, and he was flying home that afternoon. "If I _10_ (NOT / FIND) it soon, I'll have to give my lecture in a T-shirt," he joked.

We met him in the hotel lobby an hour later. While the two of them _11_ (EXCHANGE) suitcases, he told us he was an ornithologist. By the end of our conversation, he _12_ (INVITE) us to join a birdwatching trip along the coast. My sister, who _13_ (NEVER / BE) interested in birds before, said yes immediately.

Since then she _14_ (JOIN) a birdwatching club, and next spring she _15_ (TRAVEL) to Portugal again – this time with binoculars.

(Vadbeno besedilo Piflar.si)""", [
            ("flew", "primer"),
            ("arrived", "Zaporedje dejanj v pripovedi: past simple."),
            ("had been delayed", "Trpnik v predpretekliku: zamuda je bila pred prihodom."),
            ("had already gone", "Predpreteklik z already: preden je opazila."),
            ("took", "Past simple v zaporedju dejanj."),
            ("didn't belong / did not belong", "belong je glagol stanja – ni -ing oblike."),
            ("contained", "Glagol stanja v pretekliku."),
            ("must have taken", "must have + 3. oblika: sklepanje o preteklosti."),
            ("had already closed", "Predpreteklik: zaprli so pred klicem."),
            ("had been looking", "Predpreteklik trajni: ves večer je iskal (poročani govor)."),
            ("don't find / do not find", "Prvi pogojnik: if + present simple, … will."),
            ("were exchanging", "While + past continuous: dejanje v teku."),
            ("had invited", "By the end of … + past perfect."),
            ("had never been", "Predpreteklik z never … before."),
            ("has joined", "Since then + present perfect."),
            ("is travelling / is going to travel / will travel / will be travelling", "Načrt za prihodnost."),
        ], vrsta="vb"),
    ],
    2: [
        TF(POSNETEK_A, [
            ("Tom joined the team after he had needed rescuing himself.", "T", "Zvil si je gleženj in so ga morali nesti v dolino."),
            ("Some members of the team are paid for their work.", "F", "»Nobody is paid«."),
            ("The team pays for most of its equipment through its own fundraising.", "T", "»we even raise most of the money for our equipment ourselves«."),
            ("People who need help call the rescue team directly.", "F", "Pokličejo 999 in policijo, ta obvesti ekipo."),
            ("Tom once left a dentist's appointment to join a rescue.", "T", "»once even a dentist's chair«."),
            ("Many walkers get into trouble because they start their walk too early.", "F", "Prepozno: »because they started too late in the day«."),
            ("The weather in the mountains can change quickly.", "T", "»the weather, which can change very quickly up there«."),
            ("A helicopter was used in Tom's most difficult rescue.", "F", "»We couldn't use the helicopter because of the wind«."),
            ("Tom recommends taking a paper map.", "T", "»carry a paper map. It never runs out of battery«."),
        ], ("Tom has been a volunteer for eighteen years.", "T")),
        LNOTE(POSNETEK_B, [
            ("How big is a tiny forest?", "About the size of a tennis court.", "»about the size of a tennis court«."),
            ("How many trees are planted per square metre?", "Three.", "»three per square metre«."),
            ("How much faster do the trees grow than in a normal plantation?", "About ten times faster.", "»about ten times faster«."),
            ("After how many years does the forest need no more care?", "Three (years).", "»After three years the forest needs no more care«."),
            ("What kind of tree species are used?", "Native species (at least thirty).", "»we also use only native species«."),
            ("How many species were counted in the Leeds forest?", "Over five hundred.", "»over five hundred species … within two years«."),
            ("What do the 'tree keepers' do?", "Collect data and organise events.", "»who collect data and organise events«."),
            ("What do some foresters criticise about the method?", "It is expensive. / Not all trees survive.", "Dovolj je ena od obeh kritik."),
        ], ("Who developed the method?", "Akira Miyawaki.")),
    ],
    3: [
        PIS("E-mail", """Two months ago you joined a fitness club in your town. The advertisement promised modern equipment, small groups and personal advice from a qualified trainer. Unfortunately, you are not satisfied with the club.

Write an e-mail of complaint of 120–150 words to the club's manager, in which you:""", [
            "explain two problems you have had and give an example for each of them,",
            "say what you expect the club to do.",
        ], "120–150", [
            "## Zgradba pritožbe",
            ("Dear Sir or Madam,", "Formalni nagovor (ime ni znano)."),
            ("I am writing to complain about the service at your fitness club, which I joined two months ago.", "Namen v prvem stavku."),
            ("Firstly, although your advertisement promised small groups, there are often more than thirty people in my evening class, so the trainer cannot correct our exercises.", "1. težava + primer; primerjava z oglasom."),
            ("Secondly, two of the running machines have been out of order for over three weeks, and nobody has repaired them.", "2. težava + konkreten primer."),
            ("I would therefore expect you to repair the equipment as soon as possible and to offer me a month's free membership as compensation.", "Pričakovanje – vljudno, a odločno."),
            ("I look forward to your prompt reply. Yours faithfully, Dominik(a) Novak", "Formalni zaključek."),
        ], "Formalna pritožba z namenom, dvema težavama (vsaka s primerom, primerjava z obljubami oglasa) in jasnim pričakovanjem (popravilo, nadomestilo); 120–150 besed.",
            glava="TO: manager@fitclub.si\nSUBJECT: Complaint\nDear Sir or Madam,"),
        ESEJ(["Travelling teaches us more than school does.", "Social media is changing friendship for the worse."], "220–250", [
            "## Načrt",
            ("Uvod: stališče (I partly agree: travel teaches lessons that school cannot, but it cannot replace school).", "Jasna teza že v uvodu."),
            ("Argument 1: travel teaches independence and problem-solving, e.g. finding your way in a foreign city without help.", "Argument + konkreten primer."),
            ("Argument 2: meeting other cultures builds tolerance and improves language skills.", "Povezovalci: Moreover, In addition."),
            ("Protiargument: school gives systematic knowledge and is available to everyone, while travel is expensive.", "However, … – upoštevaj drugo stran."),
            ("Sklep: the two complement each other.", "Sklep odgovori na naslov."),
            "## Ideje za 2. naslov",
            ("For: fewer face-to-face meetings, likes instead of real support. Against: easier to stay in touch with friends abroad.", "Izberi en naslov."),
        ], "Argumentativni esej z jasnim stališčem, argumenti s primeri, protiargumentom in sklepom; 220–250 besed."),
    ],
}

VR = {
    1: [
        SA("The Lodger", """# The Lodger
The lodger arrived on the first Monday of October, carrying a single suitcase and a cello case that was almost as tall as he was. My mother had put a card in the newsagent's window – ROOM TO LET, QUIET PERSON PREFERRED – and I think she regretted the word "quiet" the moment she saw the cello.

His name was Mr Adler, and he was older than she had expected, with white hair and a coat that had once been expensive. He paid three months' rent in cash, in advance, which was more money than I had ever seen on our kitchen table. My mother counted it twice and then hid it in the biscuit tin.

For the first week we hardly heard him. He left the house at seven every morning and came back after dark. Then, on Saturday afternoon, the music began. It came through the ceiling of my bedroom, slow and deep, and I sat on the floor with my back against the wall and did not move until it stopped. I was twelve, and I had never heard anything like it.

After that I began to wait for Saturdays. Sometimes he played the same short passage again and again, as if he were trying to find something he had lost. My mother complained that it gave her a headache, but I noticed she stopped hoovering whenever he started.

In December, Mr Adler fell ill. My mother took him soup and, because he could not climb the stairs to the bathroom, she moved him into our front room. That was when I learned that he had played in an orchestra in Vienna, that he had left in a hurry many years before, and that he had not spoken to his brother since.

He recovered by the spring, and in April he told us he was leaving. A letter had come from Vienna. On his last evening he played for us in the front room, with the curtains open, and people stopped in the street to listen. The next morning his room was empty, except for an envelope addressed to me. Inside was a ticket for a concert, and a note: "For the girl who listens through walls."

(Vadbeno besedilo Piflar.si)""", [
            ("What did the narrator's mother think when she saw the cello?", "That she should not have written 'quiet' (in the card). / That he would not be quiet.", "»she regretted the word 'quiet'«."),
            ("What suggested that Mr Adler had once had money?", "His (once expensive) coat.", "»a coat that had once been expensive«."),
            ("Where did the mother keep the rent money?", "In the biscuit tin.", "»hid it in the biscuit tin«."),
            ("When did Mr Adler first play the cello in the house?", "On Saturday afternoon (in his first week).", "»Then, on Saturday afternoon, the music began«."),
            ("How did the narrator react to the music the first time?", "She sat on the floor and did not move until it stopped.", "Sedela je pri steni in se ni premaknila."),
            ("What did Mr Adler's repetition of a passage seem like to the narrator?", "Like looking for something he had lost.", "»as if he were trying to find something he had lost«."),
            ("What shows that the mother secretly liked the music?", "She stopped hoovering when he played.", "Pritoževala se je, a je nehala sesati, ko je začel igrati."),
            ("Why was Mr Adler moved into the front room?", "He could not climb the stairs (to the bathroom).", "»because he could not climb the stairs«."),
            ("Who had Mr Adler not spoken to for many years?", "His brother.", "»had not spoken to his brother since«."),
            ("What did Mr Adler leave for the narrator?", "A (concert) ticket and a note.", "Ovojnica z vstopnico za koncert in listkom."),
        ], ("What did the lodger carry when he arrived?", "A suitcase and a cello (case).")),
        GAPS("Why we keep things", """# The psychology of keeping things
Almost everyone has a drawer full of objects they never use but cannot throw away: old concert tickets, a broken watch, a stone from a beach. [0] Psychologists have long been interested in why we hold on to such things.

Part of the answer lies in memory. [1] An old ticket can bring back an entire evening – the music, the weather, the people we were with.

Objects can also help us feel connected to people we have lost. [2] For many, a parent's handwriting on a birthday card is more precious than any expensive gift.

Interestingly, the attachment often begins in early childhood. [3] Around the age of two, many children choose a blanket or a soft toy that comforts them when their parents are not there.

In one famous experiment, researchers offered young children an identical copy of their favourite toy. [4] Most refused to swap, even though the copy was, in every way, the same.

Adults behave in a similar way. [5] Economists call this the "endowment effect": once something is ours, we value it more highly than before.

For some people, however, keeping things becomes a serious problem. [6] Their homes fill up until there is no room to cook, sleep or move safely.

Therapists who work with such people do not simply tell them to throw everything away. [7] Instead, they help them understand what each object represents, and find other ways of keeping the memory alive.

Some families have found their own solutions. [8] One woman photographed every object in her late father's workshop before giving the tools to a local school.

In the end, perhaps what we keep says less about the objects themselves than about who we are. [9] A drawer of "useless" things may, in fact, be a kind of autobiography. [10]

(Vadbeno besedilo Piflar.si)""", {
            "A": "We are often unwilling to sell something for the price we would pay to buy it.",
            "B": "Each of these objects carries a story.",
            "C": "That approach usually makes the anxiety worse.",
            "D": "They believed that the original had something the copy lacked.",
            "E": "A familiar object can act as a key that opens the door to the past.",
            "F": "Psychologists call these 'transitional objects'.",
            "G": "This condition, known as hoarding disorder, affects around two per cent of adults.",
            "H": "Instead of keeping the things, they keep a record of them.",
            "I": "Clothes that still smell of someone, for instance, can be impossible to give away.",
            "J": "They tell the story of what we have loved and lost.",
            "K": "And, unlike a diary, nobody else can read it.",
            "L": "Children usually lose interest in their toys by the age of five.",
            "M": "Most people throw away the majority of their possessions every few years.",
        }, [
            ("E", "Spomin: predmet kot ključ do preteklosti; sledi primer vstopnice."),
            ("I", "Povezanost z umrlimi – oblačila, ki še dišijo po nekom; sledi primer voščilnice."),
            ("F", "Navezanost v otroštvu – »prehodni predmeti«; sledi opis odeje ali igrače."),
            ("D", "Poskus s kopijo – otroci so verjeli, da ima izvirnik nekaj, česar kopija nima."),
            ("A", "Odrasli: učinek lastništva – predmet, ki je naš, cenimo više."),
            ("G", "Resna težava – kopičenje (hoarding disorder); sledi opis domov."),
            ("C", "Terapevti ne rečejo »vrzi vse stran«, ker to poveča tesnobo; Instead …"),
            ("H", "Družinske rešitve: namesto predmetov hranijo zapis; sledi primer fotografij."),
            ("J", "Kaj hranimo – zgodba o tem, kaj smo imeli radi in izgubili."),
            ("K", "Predal kot avtobiografija, ki je nihče drug ne more prebrati."),
        ], "B", vrsta="sentences"),
        GF("The whistled language", """# The island where people talk by whistling
On La Gomera, one of the smaller Canary Islands, you may hear something strange as you walk through the mountains: two people having a conversation _0_ a single spoken word. They are using Silbo Gomero, a language _1_ consists entirely of whistles.

The island is full of deep valleys, and walking from one village to the next can take hours. Whistling, _2_ the other hand, can be heard up to five kilometres away. For centuries, shepherds and farmers used it to pass on news, warn of danger and arrange meetings _3_ having to leave their fields.

Silbo is not a code but a way of whistling Spanish. Speakers replace vowels and consonants _4_ changes in pitch and length, and listeners who know the language can understand _5_ is being said almost as easily as normal speech.

In the second half of the twentieth century, the language nearly disappeared. Roads and telephones made it less necessary, and many young people moved away _6_ search of work. By the 1980s, only a few elderly speakers were left, and linguists feared that within a generation it would be lost _7_ ever.

The turning point came in 1999, _8_ the local government made Silbo a compulsory subject in island schools. Today every child on La Gomera learns it for at _9_ two years, and in 2009 UNESCO added it to its list of the world's intangible cultural heritage.

Scientists have become interested _10_ well. Brain scans show that experienced whistlers process Silbo in the same areas of the brain that are used for spoken language, _11_ suggests that the brain treats it as real language rather than as music.

Not everyone is optimistic about the future. Although children learn the language at school, few of them use it in everyday life, _12_ there are fewer and fewer reasons to whistle across a valley. "_13_ a language is not spoken at home, it becomes a museum piece," warns one teacher. Others point out that Silbo has survived _14_ worse moments. As long as there are people willing to learn it, they say, the mountains of La Gomera will not fall silent – _15_ yet.

(Vadbeno besedilo Piflar.si)""", [
            ("without", "primer"),
            ("which / that", "Oziralni zaimek za stvari: a language which consists of."),
            ("on", "on the other hand – stalna zveza."),
            ("without", "without + -ing."),
            ("with", "replace something with something."),
            ("what", "understand what is being said – samostalniški odvisnik."),
            ("in", "in search of – stalna zveza."),
            ("for", "lost for ever."),
            ("when", "Časovni oziralni odvisnik za letnico."),
            ("least", "at least – vsaj."),
            ("as", "as well – tudi."),
            ("which", "which se nanaša na ves predhodni stavek."),
            ("because / as / since", "Vzrok: ker je vse manj razlogov."),
            ("If / When / Once", "Pogoj: če se jezik ne govori doma."),
            ("even", "survived even worse moments – poudarek."),
            ("not", "not yet – še ne."),
        ]),
        GF("Ghosting", """# Gone without a word: the rise of ghosting
It happens to almost everyone sooner or later. You have been chatting with someone for weeks, and then, _0_ (SUDDEN), they stop answering. No explanation, no goodbye – just silence. The practice has become so common that it has its own name: ghosting.

Although the word is new, the behaviour is not. People have always found ways to avoid _1_ (PLEASANT) conversations. What has changed is how easy it has become. When most of our _2_ (RELATION) are carried on through screens, ending one requires nothing more than ignoring a _3_ (NOTIFY).

For the person who is ghosted, the experience can be surprisingly painful. Psychologists say that the lack of an _4_ (EXPLAIN) is the worst part: without one, people tend to blame themselves and go over every message, looking for a mistake. Some describe a feeling of _5_ (HELP), because they have no chance to respond.

Why do people ghost? Surveys suggest that most do it not out of _6_ (CRUEL) but to avoid conflict. Many say they did not want to hurt the other person, or simply did not know what to say. Others admit that the relationship was so _7_ (SIGNIFY) to them that they did not think an ending was necessary.

Ghosting is not limited to romance. Friends drift apart in the same way, and even employers have been accused of ghosting job _8_ (APPLY) after several rounds of interviews. Interestingly, the opposite also happens: _9_ (INCREASE) numbers of new employees accept a job offer and then never turn up on their first day.

Experts disagree about how serious the problem is. Some see ghosting as a sign of a wider _10_ (WILLING) to deal with difficult emotions, made worse by technology. Others argue that it is sometimes _11_ (JUSTIFY), for example when someone feels unsafe or has been treated badly.

What most agree on is that a short, honest message is almost always _12_ (PREFER) to silence. It does not need to be long or detailed. A simple "I don't think this is working, but I wish you well" can save the other person weeks of _13_ (CERTAIN). As one psychologist puts it, "Closure is a form of _14_ (KIND). It costs us a few seconds, and it shows that we respect the other person's _15_ (FEEL)."

(Vadbeno besedilo Piflar.si)""", [
            ("suddenly", "primer"),
            ("unpleasant", "Pridevnik pred conversations; smisel: neprijetni pogovori."),
            ("relationships", "our + samostalnik v množini: relation → relationships."),
            ("notification", "a + samostalnik: notify → notification."),
            ("explanation", "an + samostalnik: explain → explanation."),
            ("helplessness", "a feeling of + samostalnik: help → helplessness."),
            ("cruelty", "out of + samostalnik: cruel → cruelty."),
            ("insignificant / unimportant", "Smisel: odnos jim ni bil pomemben: in- + significant."),
            ("applicants", "job + oseba v množini: apply → applicants."),
            ("increasing", "Pridevnik pred numbers: increase → increasing."),
            ("unwillingness", "a wider + samostalnik z nikalno predpono: un- + willing + -ness."),
            ("justified / justifiable", "is + pridevnik: justify → justified."),
            ("preferable", "preferable to – boljši od."),
            ("uncertainty", "weeks of + samostalnik: un- + certain + -ty."),
            ("kindness", "a form of + samostalnik: kind → kindness."),
            ("feelings", "the other person's + samostalnik v množini."),
        ], vrsta="wf"),
    ],
    2: [
        LSC(POSNETEK_A, [
            ("Tom decided to volunteer because he felt ___ after his own rescue.", "grateful / so grateful", "»I was so grateful that I decided …«."),
            ("The team has about ___ members.", "forty", "»about forty members«."),
            ("A new rescue vehicle costs about ___.", "sixty thousand pounds / £60,000", "»around sixty thousand pounds«."),
            ("On weekends, team members often collect money with ___.", "collection boxes", "»shaking collection boxes«."),
            ("The team is usually on its way within ___.", "fifteen minutes", "»within fifteen minutes«."),
            ("In summer many walkers are wearing ___.", "trainers", "»people in trainers«."),
            ("Walkers who rely on phones for maps get into trouble when ___.", "the battery dies", "»and then the battery dies«."),
            ("Tom's most difficult rescue took ___.", "nine hours", "»It took us nine hours«."),
            ("Every Christmas the climber sends the team ___.", "a card", "»every Christmas he sends us a card«."),
        ], ("Tom has been a volunteer for ___.", "eighteen years")),
        LNOTE(POSNETEK_B, [
            ("How big is a tiny forest?", "About the size of a tennis court.", "»about the size of a tennis court«."),
            ("How many trees are planted per square metre?", "Three.", "»three per square metre«."),
            ("How much faster do the trees grow than in a normal plantation?", "About ten times faster.", "»about ten times faster«."),
            ("After how many years does the forest need no more care?", "Three (years).", "»After three years the forest needs no more care«."),
            ("What kind of tree species are used?", "Native species (at least thirty).", "»we also use only native species«."),
            ("How many species were counted in the Leeds forest?", "Over five hundred.", "»over five hundred species … within two years«."),
            ("What do the 'tree keepers' do?", "Collect data and organise events.", "»who collect data and organise events«."),
            ("What do some foresters criticise about the method?", "It is expensive. / Not all trees survive.", "Dovolj je ena od obeh kritik."),
        ], ("Who developed the method?", "Akira Miyawaki.")),
    ],
    3: [
        PIS("Report", """Last summer you spent four weeks working as a volunteer guide at a city museum in your town as part of a youth volunteering programme. The programme organisers have asked participants to write a report.

Write a report of 150–180 words in which you:""", [
            "describe your main tasks at the museum,",
            "explain what you found most challenging and how you dealt with it,",
            "recommend one change that would make the programme better for future volunteers.",
        ], "150–180", [
            "## Zgradba poročila",
            ("To: Programme Organisers / From: Dominik(a) Novak / Subject: Volunteering at the City Museum", "Glava in naslov."),
            ("Introduction: The aim of this report is to describe my four-week placement at the City Museum and to suggest an improvement.", "Namen."),
            ("## Main tasks",),
            ("I guided groups of foreign tourists through the permanent exhibition and helped with children's workshops at weekends.", "Konkretne naloge."),
            ("## Challenges",),
            ("The greatest challenge was answering detailed historical questions; I dealt with it by preparing notes with the curators and admitting politely when I did not know an answer.", "Izziv + rešitev; višja raven: zapletenejše povedi."),
            ("## Recommendation",),
            ("I would recommend a short training course before the placement begins, as this would give new volunteers more confidence.", "Predlog + utemeljitev."),
            ("Conclusion: Overall, the experience was extremely valuable, and I would encourage other students to take part.", "Kratek sklep."),
        ], "Formalno poročilo z glavo, namenom, tremi odstavki s podnaslovi (naloge, izziv in rešitev, predlog izboljšave z utemeljitvijo) in sklepom; 150–180 besed.",
            glava="To: Programme Organisers\nFrom: Dominik(a) Novak\nSubject: Volunteering at the City Museum"),
        LIT("Discuss the role of Hailsham in Kazuo Ishiguro's Never Let Me Go.", "Kazuo Ishiguro: Never Let Me Go", "250–300", [
            "## Načrt eseja",
            ("Uvod: teza – Hailsham is both a protective home and a carefully built illusion that prepares the students to accept their fate.", "Teza na začetku; brez obnove."),
            ("Jedro 1 – a privileged childhood: art, Exchanges and the Gallery give the students a sense of being special; the guardians protect them from the outside world.", "Konkretni prizori: Exchanges, Madame's Gallery."),
            ("Jedro 2 – 'told and not told': the students learn about donations gradually, so they never really question them; Miss Lucy is the only guardian who tells the truth.", "Pokaži dvoumnost vzgoje."),
            ("Jedro 3 – Hailsham after Hailsham: Kathy keeps returning to it in memory; Miss Emily reveals it was an experiment to prove that clones have souls.", "Razkritje na koncu spremeni pomen kraja."),
            ("Sklep: Hailsham gave its students a happy childhood but not freedom; it is the centre of Kathy's identity.", "Vrnitev k tezi."),
        ], "Esej o vlogi Hailshama: privilegirano otroštvo (umetnost, Galerija) in hkrati iluzija (»told and not told«), razkritje Miss Emily ter pomen Hailshama za Kathyjin spomin; 250–300 besed, brez obnove."),
    ],
}
