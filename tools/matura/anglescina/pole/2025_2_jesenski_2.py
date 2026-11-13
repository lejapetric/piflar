# Angleščina, jesenski rok 2025, 2. izpitni dan (vzor: M252-241-2 in M252-242-2)
LETO, ROK, IZVEDBA = 2025, "jesenski", 2
DATUM = "sreda, 27. avgust 2025"

POSNETEK_A = REC(
    "A life in comedy",
    "You will listen to an interview with Rosie Clarke, a British comedian and actress, about her career.",
    """Interviewer: Rosie, you've been making people laugh for thirty years, in Britain and in America. Where did it start?

Rosie: In a school canteen in Leeds, actually. I was terribly shy, and I discovered that if I did impressions of the teachers, people stopped noticing that I was shy. Comedy was a disguise. It still is, in a way.

Interviewer: Your first job was not in comedy, though.

Rosie: No, I trained as a dancer. I spent two years in the chorus of West End musicals, and I was quite bad. I was always one step behind everyone else. A director once told me I'd be better off making the audience laugh on purpose, since I was doing it by accident anyway.

Interviewer: And then television.

Rosie: Yes, I got a small part in a sketch show in 1995. Within two years I had my own programme, which was unusual for a woman then. In those days the writers' room was almost entirely male. I remember suggesting a sketch about a mother of four and being told that "women's stuff" wouldn't be funny. It became the most popular sketch of the series.

Interviewer: Why did you move to Los Angeles?

Rosie: Love, mostly. My husband is American, and we decided our children should grow up near both sets of grandparents – so we split our time. It was hard at first. American audiences didn't know me at all, so I had to start again in small clubs, which was terrifying but very good for me.

Interviewer: You're known for playing dozens of different characters. How do you create them?

Rosie: I listen. I sit on buses and in cafés and I eavesdrop shamelessly. Every character starts with a voice – the way someone says a single phrase. Costumes and make-up come much later.

Interviewer: Is there anything you wouldn't joke about?

Rosie: I don't make fun of people who have less power than I do. Politicians, celebrities, myself – yes, all the time. But not people who can't answer back.""")

POSNETEK_B = REC(
    "The hidden lives of pigeons",
    "You will listen to a radio programme about city pigeons and the people who study them.",
    """Presenter: They're everywhere – on statues, railway stations and café tables – and most of us see them as pests. But pigeons have a surprisingly rich history, and scientists are discovering that they're much cleverer than we think. Our reporter, Dan Moss, has been finding out more.

Dan: Pigeons have lived alongside humans for at least five thousand years. They were probably the first birds to be domesticated, kept for their meat and for their droppings, which made an excellent fertiliser. Their most famous skill, of course, is finding their way home. In both world wars, pigeons carried messages across the battlefield, and one of them, a bird called Cher Ami, saved almost two hundred soldiers in 1918.

Dr Ellis: What fascinates me is how they navigate. We know they use the position of the sun, and they seem to be able to sense the Earth's magnetic field. But recent studies suggest they also follow human roads. Pigeons tracked with GPS often fly along motorways and even turn at roundabouts.

Dan: Dr Sarah Ellis studies pigeons at a university in Oxford. Her research has shown that the birds can recognise individual human faces.

Dr Ellis: In one experiment, two researchers fed pigeons in a park. One was friendly, the other chased the birds away. After a few days they swapped coats, but the pigeons still avoided the unfriendly one. They weren't fooled by clothes – they remembered the face.

Dan: Pigeons can also learn to tell the difference between paintings by Monet and Picasso, and they can count up to nine. So why do we dislike them so much?

Dr Ellis: Partly because there are so many of them, and partly because of their droppings, which damage buildings. But the real problem is us. City pigeons are descended from birds that escaped from farms, and they survive on the food we throw away. If we stopped feeding them, their numbers would fall naturally within a few years.

Dan: Some cities are trying a gentler solution: special pigeon lofts where the birds are encouraged to nest, and where their eggs are replaced with plastic ones. In Basel, in Switzerland, the population has been halved this way, without a single bird being killed.""")

OR = {
    1: [
        SA("A family torn apart", """# Twenty Years: a documentary about waiting
How long can a family wait for someone? In the remarkable documentary Twenty Years, director Ana Ruiz follows a woman from Texas, Denise Carter, whose husband was sentenced to twenty years in prison for his part in a robbery in which nobody was hurt. Denise was twenty-four at the time, with two small sons and no job.

The film is built almost entirely from home videos. Denise started recording messages for her husband on a cheap camera the week he went to prison, so that he would not miss his sons growing up. Over two decades she filled more than three hundred tapes: birthday parties, first days at school, a broken arm, a graduation. Ruiz found the tapes by chance, when Denise mentioned them during a radio interview, and spent four years editing them.

What makes the film so powerful is that it is not only about prison. It is about the strange, stretched kind of time that families live in when someone is missing. In the early tapes, Denise is angry and frightened. Later she is tired, then determined. She goes back to college, becomes a teacher and starts a campaign for shorter sentences for non-violent crimes.

Her sons, Marcus and Jay, are perhaps the film's real heroes. As children, they speak to the camera as if their father were in the room. As teenagers, they refuse to record anything at all. One of the most moving scenes shows Jay, aged sixteen, finally sitting down in front of the camera and saying nothing for almost a minute before he begins to cry.

The film does not ask us to feel sorry for the father. He made a terrible mistake, and he says so. What it asks is whether a punishment that lasts twenty years punishes only the person who committed the crime. Ruiz never answers the question directly. Instead, she lets the tapes speak.

The ending, when the father is finally released, is shown without music. He walks out of the gate, looks at two grown men he hardly recognises, and asks if he can hold the camera. It is one of the most powerful final scenes I have seen in years.

(Vadbeno besedilo Piflar.si)""", [
            ("What was the husband's crime?", "(Taking part in) a robbery.", "»for his part in a robbery«."),
            ("Why did Denise start recording videos?", "So her husband wouldn't miss his sons growing up.", "»so that he would not miss his sons growing up«."),
            ("How many tapes did Denise record?", "More than three hundred.", "»more than three hundred tapes«."),
            ("How did the director learn about the tapes?", "From a radio interview.", "»when Denise mentioned them during a radio interview«."),
            ("What job did Denise get later?", "(A) teacher.", "»becomes a teacher«."),
            ("What does Denise's campaign aim for?", "Shorter sentences for non-violent crimes.", "»a campaign for shorter sentences for non-violent crimes«."),
            ("How did the sons behave towards the camera as teenagers?", "They refused to record. / They wouldn't record anything.", "»As teenagers, they refuse to record anything at all.«"),
            ("What question does the film raise about long sentences?", "Whether they punish only the criminal. / Whether families are punished too.", "»whether a punishment … punishes only the person who committed the crime«."),
            ("What does the father ask for at the end?", "To hold the camera.", "»asks if he can hold the camera«."),
        ], ("How long was the husband's sentence?", "Twenty years.")),
        GAPS("The last of their kind", """# The last two northern white rhinos
The day the last male northern white rhino died, his keepers sat beside him in the rain, [0]. His name was Sudan, he was forty-five years old, and with his death in 2018 only two members of his subspecies remained on Earth: his daughter Najin and granddaughter Fatu.

The two females live in a nature reserve in Kenya, [1]. Neither of them can carry a pregnancy, and without a male, the subspecies seemed certain to disappear.

Northern white rhinos were once found across several countries in central Africa. Their numbers fell dramatically in the 1970s and 1980s, [2]. Rhino horn, which is made of the same material as human fingernails, is still believed in some countries to cure illnesses, [3].

The story might have ended there. However, before Sudan died, scientists collected and froze samples of his sperm, [4]. They have since removed eggs from Fatu and used them to create embryos in a laboratory in Italy, [5].

The plan is to place these embryos in a southern white rhino, a close relative, [6]. In 2024 the team announced the first successful pregnancy of this kind using southern white embryos, [7].

Not everyone supports the project. Some conservationists argue that the money – millions of euros – would be better spent protecting species [8]. Others point out that a population created from a handful of animals will have very little genetic variety, [9].

The scientists accept that the criticism is fair. But they believe the techniques they are developing could also help other endangered animals. "If we can do this for the northern white rhino," says one of the team, "we can do it for species [10]."

For the keepers in Kenya, the work is more personal. Every day they walk with Najin and Fatu, feed them carrots and talk to them, [11]. "They are not a scientific project to us," says one of them. "They are family."

(Vadbeno besedilo Piflar.si)""", {
            "A": "where they are guarded day and night by armed rangers",
            "B": "which can live for up to fifty years",
            "C": "although there is no scientific evidence for this",
            "D": "which will act as a surrogate mother",
            "E": "that still have a chance of survival in the wild",
            "F": "as if the animals could understand every word",
            "G": "as hunters killed thousands of animals for their horns",
            "H": "that are disappearing right now",
            "I": "which are now stored in liquid nitrogen",
            "J": "which makes them vulnerable to disease",
            "K": "together with the eggs of other, already dead females",
            "L": "which proved that the method works",
            "M": "knowing that they were saying goodbye to a whole subspecies",
            "N": "because rhinos have very poor eyesight",
        }, [
            ("A", "Rezervat, kjer ju noč in dan varujejo oboroženi čuvaji (where se nanaša na kraj)."),
            ("G", "as = ker: lovci so pobijali živali zaradi rogov – razlog za upad."),
            ("C", "although – nasprotje: verjamejo v zdravilnost, a ni dokazov."),
            ("K", "Zamrznili so spermo skupaj z jajčeci že poginulih samic."),
            ("I", "Zarodki so zdaj shranjeni v tekočem dušiku (which → embryos)."),
            ("D", "Južni beli nosorog bo nadomestna mati."),
            ("L", "Uspešna brejost je dokazala, da metoda deluje."),
            ("E", "Denar bi raje porabili za vrste, ki imajo še možnost preživetja v naravi."),
            ("J", "Majhna genska raznolikost – zato so dovzetne za bolezni."),
            ("H", "Tehnike bi pomagale vrstam, ki izginjajo prav zdaj."),
            ("F", "Govorijo z njima, kot da bi razumeli vsako besedo."),
        ], "M"),
        GF("The end of the avocado?", """# Why some chefs are giving up avocados
Give peas a chance – as well _0_ broad beans and pistachios. A growing number of restaurants in Britain have taken avocados off their menus, arguing that the fashionable fruit has become _1_ expensive for the planet.

Avocados need huge amounts of water. It takes around 320 litres to grow a single fruit, and _2_ of the world's avocados are grown in dry regions of Mexico, Peru and Chile. In some areas, farmers have been accused of illegally taking water from rivers, leaving local villages _3_ enough for drinking.

The fruit's popularity has _4_ caused other problems. In Mexico, forests have been cut down to make room for avocado farms, and criminal gangs have taken control _5_ parts of the trade. Because avocados are transported thousands of kilometres, often by air, _6_ carbon footprint is also high.

"I love avocados as _7_ as anyone," says one London chef who removed them from her menu last year. "But I couldn't keep serving something _8_ I knew was causing so much damage." Instead, she now makes a green spread from British peas, mint and lemon, _9_ she says many customers prefer.

Not everyone is convinced. Some experts argue _10_ singling out one fruit is unfair, since meat, cheese and coffee also have a large environmental impact. Others point out that millions of small farmers depend on avocados for _11_ living, and that a boycott could hurt them more than the big companies.

What most people agree on is that consumers should think more about _12_ their food comes from. Buying fruit that is in season and grown closer to home is _13_ of the simplest ways to reduce our impact. "Nobody is saying you can _14_ eat another avocado," says the chef. "Just eat them less often – and enjoy them more _15_ you do."

(Vadbeno besedilo Piflar.si)""", [
            ("as", "primer"),
            ("too", "too + pridevnik: preveč drag za planet."),
            ("most / many / much", "Količinski zaimek: most of the world's avocados."),
            ("without", "leave somebody without something."),
            ("also", "Prislov med pomožnim in glavnim glagolom: has also caused."),
            ("of", "take control of."),
            ("their", "Svojilni zaimek za avocados (množina)."),
            ("much", "as much as anyone."),
            ("that / which", "Oziralni zaimek za something (najpogosteje that); »I knew« je vrinjen."),
            ("which", "Nedoločni oziralni stavek po vejici."),
            ("that", "argue that + stavek."),
            ("a / their", "make a living / depend on something for their living."),
            ("where", "where their food comes from."),
            ("one", "one of the simplest ways."),
            ("never / not", "you can never eat / can not eat another one."),
            ("when", "when you do."),
        ]),
        GF("Boarding schools change", """# Changing times in British boarding schools
While sending children away to school used _0_ (TAKE) for granted among wealthy British families, things have changed a great deal. Fifty years ago, many pupils _1_ (SEND) to boarding school at the age of seven and only saw their parents during the holidays. Today, most boarding schools _2_ (OFFER) "flexi-boarding", which allows pupils to go home at weekends.

The number of full-time boarders _3_ (FALL) steadily for decades. Head teachers say that parents today _4_ (NOT / WANT) to miss their children's childhood, and many pupils say they would rather _5_ (LIVE) at home. "When I was at school, you _6_ (EXPECT) to cope on your own," says a former pupil, now in his sixties. "Nobody asked how you were feeling."

Schools _7_ (FORCE) to adapt in other ways, too. Dormitories that once slept thirty boys _8_ (DIVIDE) into small rooms for two or four. Mobile phones, which were banned completely until about fifteen years ago, are now allowed in the evenings. And wellbeing staff, who were unheard of a generation ago, _9_ (NOW / EMPLOY) by almost every school.

Some traditions remain. Pupils still eat together in a dining hall, and many schools insist on _10_ (WEAR) uniforms, even at weekends. Sport is as important as ever, and pupils at one school in Yorkshire told me they _11_ (TRAIN) since six o'clock that morning when I arrived at nine.

Rising fees are another challenge. If prices _12_ (CONTINUE) to rise at the current rate, many families will no longer be able to afford them. Several schools have already closed, and experts predict that by 2030 a number of others _13_ (MERGE) with nearby schools.

Will boarding schools survive? Most head teachers are optimistic. "Parents _14_ (ALWAYS / LOOK) for an education that gives their children independence," says one. "If we hadn't changed, we _15_ (DISAPPEAR) long ago. But we have, and that is why we are still here."

(Vadbeno besedilo Piflar.si)""", [
            ("to be taken", "primer"),
            ("were sent", "Trpnik v pretekliku: pupils were sent."),
            ("offer", "Sedanja splošna resnica: present simple, množina."),
            ("has fallen / has been falling", "for decades – present perfect (continuous)."),
            ("do not want / don't want", "Splošna resnica, nikalna oblika."),
            ("live", "would rather + nedoločnik brez to."),
            ("were expected", "Trpnik v pretekliku: you were expected to cope."),
            ("have been forced", "Present perfect v trpniku; vpliv na sedanjost."),
            ("have been divided", "Trpnik v present perfect (stanje zdaj)."),
            ("are now employed", "Trpnik v sedanjiku s prislovom now."),
            ("wearing", "insist on + -ing."),
            ("had been training", "Past perfect continuous: trenirali so že od šestih, ko sem prišel ob devetih."),
            ("continue", "Prvi pogojnik: if + present simple."),
            ("will have merged", "by 2030 – future perfect."),
            ("have always looked / will always look / are always looking", "Ponavljajoče se dejanje do sedanjosti: have always looked."),
            ("would have disappeared", "Tretji pogojnik: if we hadn't changed, we would have disappeared."),
        ], vrsta="vb"),
    ],
    2: [
        TF(POSNETEK_A, [
            ("Rosie started doing comedy to hide her shyness.", "T", "»people stopped noticing that I was shy. Comedy was a disguise.«"),
            ("Rosie was a talented dancer.", "F", "»I was quite bad. I was always one step behind«."),
            ("A director suggested that Rosie should try comedy.", "T", "»I'd be better off making the audience laugh on purpose«."),
            ("In the 1990s, most comedy writers on television were women.", "F", "»the writers' room was almost entirely male«."),
            ("The sketch about a mother of four was not successful.", "F", "»It became the most popular sketch of the series.«"),
            ("Rosie moved to America mainly for her career.", "F", "»Love, mostly.«"),
            ("In America, Rosie had to perform in small venues at first.", "T", "»I had to start again in small clubs«."),
            ("Rosie's characters usually begin with a voice.", "T", "»Every character starts with a voice«."),
        ], ("Rosie Clarke has worked in two countries.", "T")),
        LNOTE(POSNETEK_B, [
            ("For how long have pigeons lived with humans?", "(At least) five thousand years.", "»for at least five thousand years«."),
            ("What were pigeon droppings used for?", "(As) fertiliser.", "»droppings, which made an excellent fertiliser«."),
            ("What did Cher Ami do in 1918?", "Saved almost two hundred soldiers.", "»saved almost two hundred soldiers in 1918«."),
            ("Apart from the sun, what helps pigeons to navigate?", "The Earth's magnetic field. / Roads.", "Magnetno polje ali ceste – oboje je navedeno."),
            ("What do pigeons tracked with GPS sometimes do at roundabouts?", "Turn.", "»even turn at roundabouts«."),
            ("What did the two researchers exchange in the experiment?", "(Their) coats.", "»they swapped coats«."),
            ("How did the pigeons recognise the unfriendly researcher?", "By his/her face.", "»they remembered the face«."),
            ("Up to what number can pigeons count?", "Nine.", "»they can count up to nine«."),
            ("What would happen if people stopped feeding pigeons?", "Their numbers would fall.", "»their numbers would fall naturally«."),
            ("What happens to pigeons' eggs in the special lofts?", "They are replaced with plastic ones.", "»their eggs are replaced with plastic ones«."),
        ], ("How do most people see pigeons?", "As pests.")),
    ],
    3: [
        PIS("E-mail", """You are a Slovenian secondary school student applying for a two-week exchange programme with a school in Norway. The programme focuses on protecting the oceans.

Write an e-mail of 120–150 words to the Norwegian programme coordinator, in which you:""", [
            "explain why you are interested in the programme,",
            "describe any experience or knowledge you have related to the environment,",
            "explain how the programme will help you in your future studies.",
        ], "120–150", [
            "## Zgradba e-sporočila",
            ("Dear Sir or Madam,", "Formalni nagovor."),
            ("I am writing to apply for the exchange programme on ocean protection.", "Namen."),
            ("I have always been fascinated by the sea, and I am worried about plastic pollution in the Adriatic.", "Razlog za zanimanje z osebno noto."),
            ("Last year I organised a beach clean-up with my class and took part in a school project on microplastics.", "Konkretna izkušnja."),
            ("I would like to study marine biology, so the programme would give me practical experience and international contacts.", "Korist za prihodnji študij."),
            ("Thank you for considering my application. Yours faithfully, Dominik(a) Novak", "Formalni zaključek."),
        ], "Formalno e-sporočilo z vsemi tremi iztočnicami (zanimanje, izkušnje, korist za študij) in formalnim nagovorom ter zaključkom; 120–150 besed.",
            glava="TO: exchange@oslo-school.no\nSUBJECT: Exchange application\nDear Sir or Madam,"),
        ESEJ(["Dangerous online challenges should be banned.", "Tourists should pay more to visit popular places."], "220–250", [
            "## Načrt",
            ("Uvod: stališče (online challenges that put lives at risk should be removed from social media).", "Jasna teza."),
            ("Argument 1: young people copy what they see; examples of injuries.", "Primer."),
            ("Argument 2: platforms profit from views, so they must take responsibility.", "Povezovalci."),
            ("Protiargument: bans limit free speech and are hard to enforce; zavrnitev: safety comes first.", "Upoštevaj nasprotno stran."),
            ("Sklep: a combination of bans and education.", "Odgovori na vprašanje."),
            "## Ideje za 2. naslov",
            ("For: tourist taxes fund maintenance and reduce crowds (Venice). Against: travel becomes a privilege of the rich.", "Izberi en naslov."),
        ], "Argumentativni esej z jasnim stališčem, argumenti s primeri, protiargumentom in sklepom; 220–250 besed."),
    ],
}

VR = {
    1: [
        SC("An Hour", """# The Telegram
Knowing that Mrs Hale had a weak heart, the family took great care to tell her the news as gently as possible. It was her sister Clara who did it, in broken sentences and half-finished hints, while Mr Hale's old friend Robert waited in the hall. He had been at the newspaper office when the telegram arrived, listing the names of those lost in the railway accident, and Brently Hale's name had been at the top.

Mrs Hale did not react as other women might have done, unable to accept the truth. She wept at once, suddenly and wildly, in her sister's arms. When the first storm of grief was over, she went to her room alone. She would have no one follow her.

There, facing the open window, stood a comfortable armchair. She sank into it, exhausted. Outside, the tops of the trees were trembling with new spring life. The smell of rain was in the air. In the street below a man was selling vegetables, and somewhere a voice was singing. Sparrows were arguing on the roof.

She sat quite still, except when a sob came up into her throat and shook her, like a child who has cried itself to sleep and continues to sob in its dreams. She was young, with a calm face whose lines showed a certain strength.

Something was coming to her, and she was waiting for it, fearfully. What was it? She did not know; it was too subtle to name. But she felt it creeping out of the sky, through the sounds and the colours that filled the air.

When she let it come, a little whispered word escaped from her lips. She said it over and over: "Free, free, free!" The empty stare and the look of terror went from her eyes. Her pulse beat fast, and her blood warmed every part of her body.

She knew that she would weep again when she saw his kind hands folded in death. But beyond that bitter moment she saw a long procession of years that would belong to her absolutely. There would be no one to live for during those coming years; she would live for herself.

Clara was kneeling at the closed door, begging her to come out. "You will make yourself ill," she said. But Mrs Hale was drinking in the very air of life through that open window.

At last she rose and opened the door. There was a feverish triumph in her eyes, and she carried herself unconsciously like a goddess of victory. Someone was opening the front door with a key. It was Brently Hale who entered, a little dusty, carrying his bag and umbrella. He had been far from the scene of the accident and did not even know there had been one.

When the doctors came, they said she had died of heart disease – of joy that kills.

(Vadbeno besedilo Piflar.si, po motivih kratke zgodbe Kate Chopin)""", [
            ("The person who broke the news to Mrs Hale was ___.", "her sister (Clara)", "»It was her sister Clara who did it«."),
            ("Robert had learned about the accident at ___.", "the newspaper office", "»He had been at the newspaper office when the telegram arrived«."),
            ("Unlike many women, Mrs Hale reacted to the news by ___.", "weeping at once", "»She wept at once, suddenly and wildly«."),
            ("After crying, Mrs Hale wanted to be ___.", "alone (in her room)", "»she went to her room alone. She would have no one follow her«."),
            ("Through the window she noticed signs of ___.", "(new) spring life / spring", "»trembling with new spring life«."),
            ("Her occasional sobbing is compared to that of ___.", "a child (crying in its sleep)", "»like a child who has cried itself to sleep«."),
            ("The feeling that came to her was too subtle ___.", "to name", "»it was too subtle to name«."),
            ("The word she kept repeating was ___.", "free", "»Free, free, free!«"),
            ("She looked forward to years in which she would live ___.", "for herself", "»she would live for herself«."),
            ("Mr Hale had not been in the accident because ___.", "he had been far from the scene", "»He had been far from the scene of the accident«."),
            ("The doctors believed that Mrs Hale had died of ___.", "joy (that kills) / heart disease", "Ironija: zdravniki mislijo, da je umrla od veselja."),
        ], ("Mrs Hale suffered from ___.", "a weak heart")),
        GAPS("What TikTok users know", """# A billion users can't all be wrong
Many people still think of TikTok as an app for dance videos. [0] For millions of young people, it has become a place to learn, to find a community and, increasingly, to get the news.

When politicians discuss the platform, they usually focus on two issues: data security and the effect of short videos on attention spans. [1] What they rarely discuss is why so many people use the app in the first place.

The answer, according to researchers, is the algorithm. Unlike older social networks, TikTok does not depend mainly on who you follow. [2] As a result, an unknown creator can reach millions of viewers with a single video.

This has changed who gets heard. [3] A nurse explaining a medical procedure, a farmer showing how cheese is made, a teenager talking about living with a disability – all of them can find an audience without the help of a television channel or a publisher.

Of course, the same system can spread false information just as quickly. [4] Fact-checkers say they cannot keep up with the speed at which misleading videos go viral.

Young users are not as naïve as adults often assume, however. [5] Many say they check information they see on TikTok against other sources, and that they treat the app as a starting point rather than an authority.

There is also a question of fairness. [6] If the platform were banned, they argue, millions of small businesses that sell products through the app would lose an important source of income.

Supporters of tighter regulation reply that this is precisely why rules are needed. [7] They call for more transparency about how the algorithm works and stronger protection for children.

Perhaps the real lesson is that politicians need to understand the platforms they want to control. [8] Until they do, they risk making decisions that a billion users will simply ignore. [9]

(Vadbeno besedilo Piflar.si)""", {
            "A": "Both are serious concerns that deserve attention.",
            "B": "Instead, it shows each user videos it predicts they will enjoy, from anyone at all.",
            "C": "Surveys suggest that they are often more sceptical than their parents.",
            "D": "That impression is now several years out of date.",
            "E": "Voices that were once ignored by traditional media are now among the most popular.",
            "F": "A video with a shocking claim can be watched ten million times before anyone corrects it.",
            "G": "Many creators point out that TikTok is not only entertainment but also work.",
            "H": "When a company has that much influence, it cannot be left to regulate itself.",
            "I": "That means spending time on them, not just talking about them.",
            "J": "And a billion users, as the title of this article suggests, are hard to ignore in return.",
            "K": "The company was founded in China in 2016.",
            "L": "Most users spend less than ten minutes a day on the app.",
        }, [
            ("A", "Both se nanaša na dve vprašanji (varnost podatkov in pozornost)."),
            ("B", "Instead – algoritem ne temelji na sledenju, ampak predvideva, kaj ti bo všeč."),
            ("E", "Kdo je slišan: glasovi, ki jih tradicionalni mediji niso opazili; sledijo primeri."),
            ("F", "Lažne informacije se širijo hitro – primer z deset milijoni ogledov."),
            ("C", "Mladi so bolj skeptični, kot mislijo odrasli; naslednja poved to podkrepi."),
            ("G", "Vprašanje pravičnosti: TikTok je tudi delo; nato argument o malih podjetjih."),
            ("H", "Zagovorniki pravil: tako vpliven podjetje se ne more samo nadzorovati."),
            ("I", "That means … – razumeti platforme pomeni preživeti čas na njih."),
            ("J", "Zaključna poved se vrne k naslovu (a billion users)."),
        ], "D", vrsta="sentences"),
        GF("A darker Bambi", """# The dark story behind Bambi
Most people know Bambi as the cute little deer from the 1942 Disney film. Far fewer know that the story was originally a novel written for adults, and _0_ it was banned by the Nazis.

Its author, Felix Salten, was a journalist in Vienna. He published Bambi: A Life in the Woods in 1923, and it quickly became a success across Europe. Unlike the film, the book is a serious, often violent story _1_ shows how hard life is for animals in the forest. Deer are hunted, friends die, and the young Bambi learns that he must survive alone.

Many readers saw the novel as a political allegory. Salten was Jewish, and the hunted deer were interpreted as a symbol of Jewish people _2_ faced persecution in Europe. For this reason, the book was banned in Nazi Germany in 1936, and Salten was forced to leave Austria two years _3_. He spent the rest of his life in Switzerland, where he died in 1945.

By then, Walt Disney _4_ bought the film rights – reportedly for just 1,000 dollars. Disney's team spent several years working on the film. They brought real deer into the studio _5_ the artists could study how they moved, and they even visited forests in Maine to photograph the light.

The finished film was much gentler than the book, _6_ it still contained one of the most famous scenes in cinema history: the death of Bambi's mother. Generations of children have been shocked by it, and _7_ adults admit that they still cannot watch it without crying.

Salten earned almost nothing from the film's enormous success. He had sold the rights to an American director, _8_ then sold them to Disney, and the money he received was small. Today his name is barely remembered, _9_ the deer he created is known all over the world.

In recent years, a new English translation of the novel _10_ appeared, restoring the darkness of the original. Its translator argues that Salten's message is more relevant _11_ ever. "This is a book about how fear changes us," she says. "It asks _12_ we can stay kind in a world full of danger."

Perhaps _13_ is why the story still matters. Behind the cartoon, there is a warning about what happens when one group is hunted by _14_. It is a warning that Salten learned from _15_ own experience.

(Vadbeno besedilo Piflar.si)""", [
            ("that", "primer"),
            ("that / which", "Oziralni zaimek za story."),
            ("who", "Oziralni zaimek za osebe: people who faced persecution."),
            ("later", "two years later."),
            ("had", "Predpreteklik: do takrat je že kupil pravice."),
            ("so", "so (that) the artists could study."),
            ("but / although / though", "Nasprotje: nežnejši, a vseeno …"),
            ("many / some", "Količinski zaimek: many adults admit."),
            ("who", "Nedoločni oziralni stavek za osebo (director)."),
            ("but / while / although / though / yet", "Nasprotje: ime je pozabljeno, srnjak pa poznan."),
            ("has", "Present perfect: has appeared."),
            ("than", "more relevant than ever."),
            ("whether / if / how", "Odvisno vprašanje: asks whether we can stay kind."),
            ("that / this", "Perhaps that is why."),
            ("another / others", "hunted by another (group)."),
            ("his", "Svojilni zaimek: his own experience."),
        ]),
        GF("A safe haven?", """# Is New Zealand really a safe place to escape the apocalypse?
New Zealand has become the favourite destination for the world's _0_ (WEALTH) elite. Over the past decade, several billionaires have bought large properties there, some of them with underground bunkers. Their reasoning is simple: in the event of a global _1_ (CATASTROPHIC), a remote island nation might be the safest place on Earth.

Researchers have even published studies supporting this idea. One paper ranked New Zealand first among the countries most likely to survive a _2_ (BREAK) of global trade, thanks to its ability to produce food and its _3_ (ISOLATE) from conflict zones.

But many New Zealanders are _4_ (COMFORT) with their country's new reputation. Critics say the arrival of rich foreigners has pushed up property prices and made housing _5_ (AFFORD) for local families. Others point out the _6_ (ODD) of the whole idea: if civilisation collapses, a bunker full of tinned food will not protect anyone for long.

There is also the question of _7_ (DEPEND). New Zealand imports nearly all of its fuel, medicines and electronic equipment. Without them, modern life would quickly become _8_ (SUSTAIN). The country also faces natural risks of its own, including earthquakes and volcanic _9_ (ERUPT).

Some locals have responded with humour. A popular website offers "survival tips for billionaires", including "learn the names of your neighbours" – a reminder that in a real crisis, communities matter far more than private _10_ (PROTECT).

The government, meanwhile, has introduced new rules. Since 2018, most foreign buyers have been _11_ (ABLE) to purchase existing homes, although exceptions are made for large _12_ (INVEST).

Perhaps the real lesson is about our _13_ (FASCINATE) with escape. Instead of planning how to survive the end of the world, argue the critics, the super-rich would do better to use their wealth to make it less _14_ (LIKE). As one columnist put it: "There is no safe haven from a disaster you helped to create." It is an _15_ (COMFORT) thought, but a necessary one.

(Vadbeno besedilo Piflar.si)""", [
            ("wealthiest", "primer"),
            ("catastrophe", "a global + samostalnik: catastrophic → catastrophe."),
            ("breakdown", "a + samostalnik: break → breakdown (sestavljenka)."),
            ("isolation", "its + samostalnik: isolate → isolation."),
            ("uncomfortable", "Nezadovoljstvo z ugledom: un- + comfortable."),
            ("unaffordable", "make + pridevnik z nikalnim pomenom: un- + afford + -able."),
            ("oddity / oddness", "the + samostalnik: odd → oddity."),
            ("dependence / dependency", "the question of + samostalnik."),
            ("unsustainable", "become + pridevnik (nevzdržno): un- + sustain + -able."),
            ("eruptions", "volcanic + samostalnik v množini."),
            ("protection", "private + samostalnik: protect → protection."),
            ("unable", "have been unable to purchase."),
            ("investments / investors", "large + samostalnik v množini: investments ali investors."),
            ("fascination", "our + samostalnik + with."),
            ("likely", "make it less + pridevnik."),
            ("uncomfortable", "an + pridevnik z nikalnim pomenom (but a necessary one)."),
        ], vrsta="wf"),
    ],
    2: [
        LSC(POSNETEK_A, [
            ("Rosie first discovered comedy in a school canteen in ___.", "Leeds", "»In a school canteen in Leeds«."),
            ("At school, she did impressions of ___.", "the teachers", "»if I did impressions of the teachers«."),
            ("Before comedy, Rosie trained as a ___.", "dancer", "»I trained as a dancer«."),
            ("Rosie got her first television role in a ___ in 1995.", "sketch show", "»a small part in a sketch show in 1995«."),
            ("Rosie was told that sketches about ___ would not be funny.", "women's stuff / women", "»'women's stuff' wouldn't be funny«."),
            ("Rosie and her husband wanted their children to live near ___.", "both sets of grandparents", "»near both sets of grandparents«."),
            ("To create characters, Rosie listens to people on buses and ___.", "in cafés", "»I sit on buses and in cafés«."),
            ("Rosie does not make jokes about people with ___.", "less power (than her)", "»people who have less power than I do«."),
        ], ("Rosie Clarke has been a comedian for ___.", "thirty years")),
        LNOTE(POSNETEK_B, [
            ("For how long have pigeons lived with humans?", "(At least) five thousand years.", "»for at least five thousand years«."),
            ("What were pigeon droppings used for?", "(As) fertiliser.", "»droppings, which made an excellent fertiliser«."),
            ("What did Cher Ami do in 1918?", "Saved almost two hundred soldiers.", "»saved almost two hundred soldiers in 1918«."),
            ("Apart from the sun, what helps pigeons to navigate?", "The Earth's magnetic field. / Roads.", "Magnetno polje ali ceste – oboje je navedeno."),
            ("What do pigeons tracked with GPS sometimes do at roundabouts?", "Turn.", "»even turn at roundabouts«."),
            ("What did the two researchers exchange in the experiment?", "(Their) coats.", "»they swapped coats«."),
            ("How did the pigeons recognise the unfriendly researcher?", "By his/her face.", "»they remembered the face«."),
            ("Up to what number can pigeons count?", "Nine.", "»they can count up to nine«."),
            ("What would happen if people stopped feeding pigeons?", "Their numbers would fall.", "»their numbers would fall naturally«."),
            ("What happens to pigeons' eggs in the special lofts?", "They are replaced with plastic ones.", "»their eggs are replaced with plastic ones«."),
        ], ("How do most people see pigeons?", "As pests.")),
    ],
    3: [
        PIS("E-mail", """A European youth magazine is looking for young writers from Central Europe to write a monthly column about the lives of teenagers in their countries. You have decided to apply to the editorial board.

Write an e-mail of application of 150–180 words, in which you:""", [
            "explain why you would like to write about young people's lives,",
            "describe your experience in writing or journalism,",
            "outline two topics you would like to write about and explain why.",
        ], "150–180", [
            "## Zgradba prošnje",
            ("Dear Members of the Editorial Board,", "Formalni nagovor skupini naslovnikov."),
            ("I am writing to apply for the position of columnist advertised in your latest issue.", "Namen."),
            ("I believe that teenagers are often described by adults but rarely given the chance to describe themselves.", "Motivacija – izvirna misel prinese točke za vsebino."),
            ("For two years I have edited our school newspaper and published an article in a national youth magazine.", "Izkušnje z dokazi."),
            ("I would like to write about the housing crisis, which forces young people to live with their parents until their thirties, and about mental health, since many of my peers struggle with anxiety.", "Dve temi in utemeljitev za vsako."),
            ("I would be delighted to send you samples of my work. Yours faithfully, Dominik(a) Novak", "Zaključek s ponudbo."),
        ], "Formalna prošnja z vsemi tremi iztočnicami: motivacija, izkušnje (konkretno) in dve temi z utemeljitvijo; 150–180 besed.",
            glava="TO: editors@youngeurope.eu\nSUBJECT: Columnist application\nDear Members of the Editorial Board,"),
        LIT("Discuss the theme of acceptance in Kazuo Ishiguro's Never Let Me Go.", "Kazuo Ishiguro: Never Let Me Go", "250–300", [
            "## Načrt eseja",
            ("Uvod: teza – the most disturbing aspect of the novel is not the cruelty of the system but how calmly the characters accept it.", "Teza že v uvodu."),
            ("Jedro 1 – education at Hailsham: the students are 'told and not told'; Miss Lucy's warning is ignored.", "Pokaži, kako vzgoja oblikuje sprejemanje."),
            ("Jedro 2 – the rumour of deferrals: Kathy and Tommy hope for more time, not for escape; they never think of running away.", "Ključno: tudi upanje ostane znotraj pravil sistema."),
            ("Jedro 3 – Tommy's anger in the field vs. Kathy's quiet acceptance at the end in Norfolk.", "Primerjava dveh odzivov."),
            ("Sklep: Ishiguro makes readers ask what they accept in their own lives without question.", "Širši pomen v sklepu."),
        ], "Esej s tezo o sprejemanju usode, podprt z vzgojo na Hailshamu, upanjem na odlog (ne na pobeg) in odzivi Tommyja in Kathy; 250–300 besed."),
    ],
}
