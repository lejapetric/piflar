# Angleščina, spomladanski rok 2024 (vzor: M241-241 in M241-242; izpitne pole 1 višje ravni
# v gradivu ni bilo, zato ta pola sledi zgradbi drugih pol 1 višje ravni)
LETO, ROK, IZVEDBA = 2024, "spomladanski", 1
DATUM = "sobota, 1. junij 2024"

POSNETEK_A = REC(
    "A singer looks back",
    "You will hear a recording in which Liam Doyle, the lead singer of an Irish rock band, talks about his life.",
    """I got my nickname, 'Sparrow', at school in Dublin, because I was the smallest boy in the class and I never stopped singing. I hated it at first. Now it's on the cover of every album, so I suppose I've made my peace with it.

We started the band forty years ago in my parents' garage. There were four of us, all fifteen, and only one of us could actually play an instrument. Our first concert was at a school disco, and we were so nervous that we played the same song three times because we'd forgotten the others. Somehow, people danced anyway.

It's strange, but the four of us are still together. People often ask how we've managed it, and the honest answer is that we never let money divide us. From the very first day, everything has been split equally – four ways – no matter who wrote the song. That has saved us from a lot of arguments.

My mother died when I was fourteen, and I think that's really why I started writing songs. I didn't know how to talk about what I felt, so I wrote it down instead. Many of our most famous songs are, if you listen carefully, about loss.

Over the years I've used our success to support causes I care about, especially the fight against poverty in Africa. I've met presidents and prime ministers, and I'm sometimes criticised for that. People say a rock star should stick to music. But if a politician will listen to me for ten minutes because I'm famous, I think I'd be foolish not to use those ten minutes.

These days I still write every morning, usually before anyone else in the house is awake. I'm not as fast as I used to be. But I've learned that the best songs often come when you stop trying so hard.""")

POSNETEK_B = REC(
    "The surgeon who rebuilt faces",
    "You will hear a recording about a new book on Harold Gillies, a pioneer of plastic surgery.",
    """Presenter: Today I'm talking to the historian Dr Laura Finch, whose new book tells the story of Harold Gillies, the man often called the father of modern plastic surgery. Laura, why did you want to write about him?

Dr Finch: Simply because it's a wonderful story. Gillies was a New Zealander who came to England to study medicine and ended up working as an ear, nose and throat surgeon. When the First World War began, he volunteered for the Red Cross and was sent to France.

Presenter: And that changed his career?

Dr Finch: Completely. The war produced injuries that doctors had never seen before. New weapons, especially shells and machine guns, caused terrible damage to soldiers' faces. In the trenches, a man's head was often the only part of his body above ground, so facial wounds were extremely common.

Presenter: What did Gillies do differently?

Dr Finch: Before him, surgeons simply closed the wound as quickly as possible, which often left men unable to eat or speak properly. Gillies insisted on rebuilding the face step by step, using skin and bone from other parts of the patient's own body. He also made detailed drawings before each operation, with the help of an artist, so that he could plan the result.

Presenter: Where did this work take place?

Dr Finch: At a special hospital in Sidcup, near London, which opened in 1917. More than five thousand men were treated there. Gillies developed a technique called the 'tubed pedicle', a tube of skin that stayed attached to the body and kept its blood supply while it was moved to the face.

Presenter: What happened to the patients after the war?

Dr Finch: Many of them found it very hard to return to normal life. In some towns, benches were painted blue as a signal to the public that men sitting on them might have injured faces. That detail affected me more than anything else I discovered while researching the book.""")

OR = {
    1: [
        SA("The Pre-Party", """# The Pre-Party
As soon as the date for the school leavers' ball was announced, Martin's father, Greg, decided to host the "pre-party". He was not asked. He simply announced it at dinner, with the confidence of a man who had already ordered the balloons.

"Your mum and I will do canapés," he said. "Champagne for the parents, something fizzy and non-alcoholic for you lot. Photos in the garden. The roses will be out by then."

Martin, who was seventeen and had been hoping to arrive at the ball quietly with his two best friends, put down his fork. "Nobody does pre-parties any more, Dad."

"Everybody does pre-parties," said Greg. "Ask Sophie's mother."

It turned out that Sophie's mother had been planning her own pre-party for months, and that she regarded Greg's announcement as a declaration of war. Within a week, the school's parent group had divided into two camps. Messages flew. Some families accepted both invitations and spent anxious evenings working out how to be at two houses at the same time. Others accepted neither and said they would "see how things go", which everyone understood to mean that they were waiting to see which party had the better food.

Martin's mother, Helen, tried to stay out of it. She had been through the same thing when Martin's older sister left school, and she knew that the excitement of parents was always greater than the excitement of their children. But even she could not resist redesigning the garden. She bought new lights for the apple tree and spent a weekend painting the fence a colour called "Seaside Mist".

The night before the ball, it began to rain. It rained all night and all morning, and by lunchtime the garden was a small lake. The roses had been flattened. Greg stood at the kitchen window for an hour without speaking.

At four o'clock, the phone rang. It was Sophie's mother. Her marquee had collapsed in the wind, and she wondered – rather stiffly – whether the two parties might be combined, indoors, at Greg's house, which was bigger.

That evening, forty teenagers and sixty parents squeezed into the living room, the hall and the kitchen. Someone's grandmother played the piano. The photographs, taken on the stairs, were the best anybody could remember. And Martin, to his own surprise, did not want to leave.

(Vadbeno besedilo Piflar.si)""", [
            ("How did Greg let the family know about the pre-party?", "He announced it at dinner.", "»He simply announced it at dinner«."),
            ("Where were the photographs going to be taken?", "In the garden.", "»Photos in the garden.«"),
            ("How had Martin wanted to arrive at the ball?", "Quietly, with his two best friends.", "»hoping to arrive at the ball quietly with his two best friends«."),
            ("How did Sophie's mother see Greg's plan?", "As a declaration of war.", "»regarded Greg's announcement as a declaration of war«."),
            ("What problem did families who accepted both invitations have?", "How to be at two houses at once.", "»working out how to be at two houses at the same time«."),
            ("What were the families who accepted neither invitation really waiting for?", "To see which party had better food.", "»waiting to see which party had the better food«."),
            ("What had Helen learned when her daughter left school?", "Parents are more excited than their children.", "»the excitement of parents was always greater than the excitement of their children«."),
            ("What happened to the garden before the ball?", "It flooded. / It became a lake.", "»the garden was a small lake«."),
            ("Why did Sophie's mother call?", "To combine the two parties. / Her marquee had collapsed.", "Šotor se je podrl, zato predlaga skupno zabavo."),
            ("Where were the best photographs taken?", "On the stairs.", "»The photographs, taken on the stairs«."),
        ], ("Who decided to host the pre-party?", "Martin's father (Greg).")),
        MATCH("Dark stories for children", """# Five children's authors who weren't afraid of the dark
## Fairy tales were never meant to be comfortable. These five writers knew that children can handle more than adults think.""", {
            "A": ("Hans Christian Andersen", "The Danish writer's stories are full of suffering: a little mermaid who feels as if she is walking on knives, a match girl who freezes to death on New Year's Eve. Andersen grew up in poverty, and he never forgot it. Although he became famous across Europe and was received by kings, he remained convinced all his life that he was an outsider, and many of his heroes share that feeling."),
            "B": ("The Brothers Grimm", "Jacob and Wilhelm Grimm did not invent their stories – they collected them from storytellers, many of them women from middle-class families. The first edition of their collection, published in 1812, was criticised for being too violent and not suitable for children, so later editions were rewritten. Ironically, the brothers removed some of the sexual content but added even more violence."),
            "C": ("Roald Dahl", "Dahl's books are packed with cruel adults who get what they deserve. He worked as a fighter pilot in the Second World War and suffered serious head injuries in a crash, an experience that some biographers believe influenced his dark sense of humour. In 2023 his publisher changed hundreds of words in his books, a decision that caused a huge public argument and led to the original versions being republished."),
            "D": ("Neil Gaiman", "Gaiman's novel Coraline tells the story of a girl who discovers a door to another world, where a woman with buttons for eyes wants to keep her forever. Many adults found the book terrifying, but Gaiman noticed that children usually read it as an adventure. He wrote it, he says, for his own daughter, who complained that there were not enough scary stories for girls."),
            "E": ("Lemony Snicket", "Behind the pen name Lemony Snicket is the American writer Daniel Handler. His thirteen-book series about three orphans warns readers on the very first page that the story will not have a happy ending. Handler has said that he was inspired by the frustration he felt as a child with books in which everything turned out fine. The series has been adapted for film and television."),
        }, [
            ("Which writer felt like an outsider despite his success?", "A", "»remained convinced all his life that he was an outsider«."),
            ("Whose work was changed after critics complained?", "B", "Prva izdaja preveč nasilna, poznejše izdaje so prepisali."),
            ("Whose books were edited by a publisher in recent years?", "C", "Leta 2023 je založnik spremenil več sto besed."),
            ("Which writer wrote for a member of his family?", "D", "Coraline je napisal za hčer."),
            ("Who writes under a different name?", "E", "Lemony Snicket je psevdonim Daniela Handlerja."),
            ("Which writers did not create their stories themselves?", "B", "Zgodbe sta zbrala pri pripovedovalcih."),
            ("Whose experience of war may have shaped his writing?", "C", "Vojaški pilot, poškodba glave v nesreči."),
            ("Which author tells readers immediately that the story will end badly?", "E", "»warns readers on the very first page«."),
            ("Who noticed that young and adult readers reacted differently?", "D", "Odrasli so se bali, otroci so knjigo brali kot pustolovščino."),
            ("Whose childhood circumstances are reflected in his characters?", "A", "Revščina v otroštvu; junaki delijo občutek odrinjenosti."),
        ], [("Whose stories include a character who dies of cold?", "A")]),
        GF("Should we keep pets?", """# Is it time to rethink pet ownership?
Research into the emotional lives of animals has raised difficult questions about the ethics of keeping pets. Scientists now agree that dogs, cats and many other animals can feel pain, fear and joy, and some philosophers argue that keeping them _0_ our homes may not always be in their best interests.

Consider the goldfish. It is often kept alone in a small bowl, _1_ in the wild it lives in groups and can grow up to thirty centimetres long. Rabbits, _2_ are among the most popular pets in Britain, are social animals that need space to run, yet many spend their lives in tiny hutches.

Dogs and cats may seem better off, but even they face problems. Some popular breeds have _3_ bred to look "cute" – with flat faces, short legs or very large eyes – and as a result suffer _4_ breathing difficulties and other health conditions all their lives. Vets have called _5_ these breeds to be discouraged.

The pet industry has grown rapidly in recent years. During the pandemic, millions of people bought animals _6_ the first time. When life returned to normal, many found they did not have enough time to look _7_ them, and animal shelters were soon full.

Not everyone agrees _8_ pet ownership is a problem. Studies show that pets can reduce stress, help children learn responsibility and give elderly people company. "The question is not _9_ we should keep pets, but how," says one animal welfare expert. "_10_ owner should ask whether they can meet the animal's needs, not only their own."

Some experts suggest that we should choose animals that are well suited _11_ life in a human home, avoid buying from breeders who put appearance before health, and adopt from shelters whenever possible. Others go further and argue that _12_ exotic animals, such as reptiles and parrots, should be kept as pets at all.

Whatever the answer, most people agree _13_ the way we think about pets is changing. Animals are _14_ longer seen as objects that can be owned, but as individuals with feelings and needs of _15_ own.

(Vadbeno besedilo Piflar.si)""", [
            ("in", "primer"),
            ("although / while / whereas / though", "Nasprotje: v skledi sama, v naravi v skupinah."),
            ("which", "Nedoločni oziralni stavek po vejici za rabbits (živali)."),
            ("been", "Trpnik v present perfect: have been bred."),
            ("from", "suffer from."),
            ("for", "call for something to be done."),
            ("for", "for the first time."),
            ("after", "look after = skrbeti za."),
            ("that", "agree that + stavek."),
            ("whether / if", "Odvisno vprašanje: whether we should keep pets."),
            ("Every / Each / An / Any", "Določilo pred owner (ednina)."),
            ("to", "be suited to."),
            ("no", "no exotic animals … at all."),
            ("that", "agree that + stavek."),
            ("no", "no longer = ne več."),
            ("their", "of their own."),
        ]),
        GF("Boxing Day", """# A brief history of Boxing Day
It is a day we now associate with sales, sport and the _0_ (ENJOY) of Christmas leftovers. But what is Boxing Day, and where does its unusual name come from?

Boxing Day, celebrated on 26 December, is a public holiday in Britain and several other countries. Despite what some people believe, it has nothing to do with the _1_ (SPORT) activity of boxing. The name probably comes from the "Christmas boxes" that wealthy families gave to their servants and to local _2_ (TRADE) as a reward for their work during the year.

In Victorian times, servants were expected to work on Christmas Day, serving their employers' _3_ (CELEBRATE). The following day, they were given time off to visit their own families, taking with them a box of gifts, money and food. For many poor families, this was a very _4_ (VALUE) addition to their household budget.

Another possible origin is the alms box placed in churches during Advent. On 26 December, the money that had been collected was opened and _5_ (DISTRIBUTION) to the poor. The day is also the feast of St Stephen, who was known for his _6_ (GENEROUS) towards people in need.

Over time, the _7_ (TRADITION) meaning of the day has largely disappeared. For many people today, Boxing Day is about _8_ (RELAX): watching football, going for a walk or simply staying at home in front of the television. Horse racing and football matches attract huge crowds, and the day is one of the busiest of the year for the _9_ (ENTERTAIN) industry.

It is also, _10_ (INCREASE), a day for shopping. Big stores open early, and some shoppers queue through the night in the hope of finding _11_ (BARGAIN). In recent years, however, many sales have moved online, and some retailers have even decided to stay closed so that their staff can enjoy a _12_ (DESERVE) break.

Whatever people choose to do, Boxing Day remains a uniquely British _13_ (INSTITUTE). Perhaps its greatest appeal lies in its _14_ (SIMPLE): after the stress of Christmas, it offers a rare chance to do nothing at all – a tradition that most people find _15_ (SURPRISE) easy to keep.

(Vadbeno besedilo Piflar.si)""", [
            ("enjoyment", "primer"),
            ("sporting", "Pridevnik pred activity: sport → sporting."),
            ("tradesmen / traders / tradespeople", "local + oseba v množini."),
            ("celebrations", "employers' + samostalnik v množini."),
            ("valuable", "a very + pridevnik: value → valuable."),
            ("distributed", "was opened and distributed – trpnik."),
            ("generosity", "his + samostalnik: generous → generosity."),
            ("traditional", "Pridevnik pred meaning."),
            ("relaxation / relaxing", "about + samostalnik ali -ing."),
            ("entertainment", "the … industry: samostalnik kot prilastek."),
            ("increasingly", "Prislov, vrinjen med vejici."),
            ("bargains", "finding + samostalnik v množini."),
            ("well-deserved / deserved", "Pridevnik pred break."),
            ("institution", "a uniquely British + samostalnik."),
            ("simplicity", "its + samostalnik: simple → simplicity."),
            ("surprisingly", "Prislov pred pridevnikom easy."),
        ], vrsta="wf"),
    ],
    2: [
        TF(POSNETEK_A, [
            ("Liam liked his nickname from the start.", "F", "»I hated it at first.«"),
            ("The band was formed in a garage.", "T", "»in my parents' garage«."),
            ("All four members could play an instrument when they started.", "F", "»only one of us could actually play an instrument«."),
            ("At their first concert, the band played one song several times.", "T", "»we played the same song three times«."),
            ("The band members share their income equally.", "T", "»everything has been split equally – four ways«."),
            ("Liam started writing songs after the death of a family member.", "T", "Mama mu je umrla pri štirinajstih."),
            ("Liam agrees that rock stars should not get involved in politics.", "F", "Meni, da bi bil neumen, če ne bi izkoristil teh deset minut."),
            ("Liam writes faster now than when he was young.", "F", "»I'm not as fast as I used to be.«"),
        ], ("Liam got his nickname at school.", "T")),
        LNOTE(POSNETEK_B, [
            ("Where was Harold Gillies from?", "New Zealand.", "»Gillies was a New Zealander«."),
            ("What organisation did Gillies volunteer for?", "The Red Cross.", "»he volunteered for the Red Cross«."),
            ("Why were face injuries so common in the trenches?", "The head was above ground.", "»a man's head was often the only part of his body above ground«."),
            ("What problems did the old method often leave patients with?", "They couldn't eat or speak properly.", "»unable to eat or speak properly«."),
            ("Who helped Gillies to plan operations?", "An artist.", "»with the help of an artist«."),
            ("When did the hospital in Sidcup open?", "In 1917.", "»which opened in 1917«."),
            ("How many men were treated at Sidcup?", "More than five thousand.", "»More than five thousand men«."),
            ("What did blue benches signal to the public?", "That men on them might have injured faces.", "Modre klopi so opozarjale na moške s poškodovanim obrazom."),
        ], ("What was the main reason Dr Finch wrote the book?", "It's a wonderful story.")),
    ],
    3: [
        PIS("E-mail", """Last month you ordered a pair of wireless headphones online as a birthday present for your brother. The delivery was two weeks late, and when the parcel arrived, the headphones did not work properly.

Write an e-mail of complaint of 120–150 words to the online shop SoundStore, in which you:""", [
            "describe the problems caused by the late delivery,",
            "explain what was wrong with the headphones,",
            "say what you expect the shop to do.",
        ], "120–150", [
            "## Zgradba pritožbe",
            ("Dear Sir or Madam,", "Formalni nagovor."),
            ("I am writing to complain about an order I placed on your website on 3 May (order no. 4512).", "Namen in podatki o naročilu."),
            ("The headphones arrived two weeks late, which meant that I had nothing to give my brother on his birthday.", "1. iztočnica: posledice zamude."),
            ("Moreover, the left earphone does not work and the battery lasts only twenty minutes instead of the advertised twenty hours.", "2. iztočnica: konkretne napake."),
            ("I would therefore like a full refund, or a replacement sent by express delivery at no extra cost.", "3. iztočnica: jasna zahteva."),
            ("I look forward to your prompt reply. Yours faithfully, Dominik(a) Novak", "Formalni, vljuden, a odločen ton."),
        ], "Formalna pritožba z vsemi tremi iztočnicami (posledice zamude, napaka izdelka, jasna zahteva) ter formalnim nagovorom in zaključkom; 120–150 besed.",
            glava="TO: info@soundstore.com\nSUBJECT: Complaint\nDear Sir or Madam,"),
        ESEJ(["We are what we read.", "Artificial intelligence makes students lazy."], "220–250", [
            "## Načrt",
            ("Uvod: stališče (I partly agree that the books and news we read shape who we are).", "Teza."),
            ("Argument 1: reading builds empathy – we experience other lives; primer knjige.", "Primer."),
            ("Argument 2: what we read online shapes our opinions (algorithms, echo chambers).", "Povezovalci."),
            ("Protiargument: experiences, family and friends matter more than books.", "Delno strinjanje."),
            ("Sklep.", "Odgovor na vprašanje »How far …«."),
            "## Ideje za 2. naslov",
            ("For: students copy answers, stop thinking. Against: AI can be a tutor if used wisely; the problem is how we use it.", "Izberi en naslov."),
        ], "Argumentativni esej z jasnim stališčem, argumenti s primeri, protiargumentom in sklepom; 220–250 besed."),
    ],
}

VR = {
    1: [
        SA("The Visitor", """# The Visitor
The woman who came to the door that Thursday was wearing a red coat that was far too warm for September. She asked for my grandmother by her first name, Nell, which nobody had used for years, and when I said that Nell had died in the spring, she sat down on the doorstep as if her legs had been taken away.

I did not know what to do, so I made tea. That was what my grandmother would have done. The woman – she said her name was Irene – drank it slowly, holding the cup with both hands, and told me that she and Nell had been at school together in Glasgow during the war. They had been evacuated to the same farm in the Highlands, aged eight, with labels tied to their coats and a gas mask each in a cardboard box.

"We promised to write," Irene said. "And we did, for a while. Then her family moved to England and mine went to Canada, and the letters stopped. I always thought I'd find her one day."

She had flown from Toronto, at eighty-four, with an address that was thirty years out of date. It had taken her two days and the help of a very patient postman to find our house.

I showed her the photographs I had found while clearing out my grandmother's bedroom. Most of them meant nothing to me: unsmiling children in front of a stone farmhouse, a dog, a man with a horse. Irene knew every face. She named the farmer and his wife, the dog – Bess – and a boy called Archie who had fallen through the ice on the pond and been pulled out by my grandmother. I had never heard that story. My grandmother, who could talk for an hour about the price of butter, had never mentioned it.

When Irene left, I gave her one of the photographs: two girls on a gate, squinting into the sun. She put it inside her coat, against her chest, and did not say anything.

A week later a parcel arrived from Canada. Inside was a bundle of letters tied with ribbon, all written in my grandmother's round, careful hand, and all signed "your sister, Nell". There was a note from Irene, too. "These belong in your family now," it said. "She was braver than she ever let you know."

(Vadbeno besedilo Piflar.si)""", [
            ("What was unusual about the visitor's clothing?", "Her coat was too warm (for September).", "»a red coat that was far too warm for September«."),
            ("How did the visitor react to the news of Nell's death?", "She sat down on the doorstep.", "»she sat down on the doorstep as if her legs had been taken away«."),
            ("Why did the narrator make tea?", "Grandmother would have done it.", "»That was what my grandmother would have done.«"),
            ("Where were the two girls sent during the war?", "To a farm in the Highlands.", "»evacuated to the same farm in the Highlands«."),
            ("Why did the girls stop writing to each other?", "Their families moved (to England and Canada).", "Družini sta se preselili, pisma so prenehala."),
            ("Who helped Irene to find the house?", "A (very patient) postman.", "»the help of a very patient postman«."),
            ("What did Nell do for Archie?", "She pulled him out of the (icy) pond.", "Archie je padel skozi led, Nell ga je potegnila ven."),
            ("What surprised the narrator about the story of Archie?", "Grandmother had never mentioned it.", "Babica, ki je govorila o ceni masla, te zgodbe ni nikoli omenila."),
            ("What did the narrator give Irene?", "A photograph (of two girls on a gate).", "»I gave her one of the photographs«."),
            ("How did Nell sign her letters?", "Your sister, Nell.", "»all signed 'your sister, Nell'«."),
        ], ("When did the narrator's grandmother die?", "In the spring.")),
        GAPS("Living in public", """# Our online selves are not as private as we think
However hard we try to keep "real life" separate from social media, the two are becoming impossible to separate. [0] What we post – and what others post about us – increasingly shapes how we are seen at school, at work and even in court.

Employers are a good example. Surveys suggest that around seven in ten companies look at candidates' social media profiles before offering them a job. [1] A photograph from a party five years ago or an angry comment in an online argument can be enough to tip the balance.

Young people are often more aware of this than adults assume. [2] Many keep two accounts: a public one, carefully designed to impress, and a private one for close friends, where they can be more honest.

Yet even careful users cannot control everything. [3] A friend might share a photograph, a classmate might take a screenshot, and once something has been copied, it can never be fully deleted.

The consequences can be serious. [4] Psychologists say that teenagers who are bullied online often feel there is no escape, because the bullying follows them home on their phones.

Some countries have introduced a "right to be forgotten", which allows people to ask search engines to remove certain information about them. [5] Critics say it is too easy to abuse, while supporters argue that people should not be judged forever by a single mistake.

Schools are beginning to respond as well. [6] Lessons on digital citizenship teach students how to protect their privacy, think before posting and support friends who are targeted.

Experts agree, however, that rules and lessons are not enough. [7] We need to accept that people change, and that the person someone was at fifteen is not necessarily the person they are at twenty-five.

Perhaps the healthiest approach is to remember that an online profile is never the whole story. [8] Behind every post is a real person – complicated, imperfect and still growing. [9]

So the next time you are about to post something in anger, wait a moment. [10]

(Vadbeno besedilo Piflar.si)""", {
            "A": "In the European Union, this right has been part of the law since 2018.",
            "B": "Some even admit that they have rejected applicants because of what they found.",
            "C": "What happens on a screen no longer stays on a screen.",
            "D": "They know that anything they post may be seen by a future employer.",
            "E": "Other people's posts can reveal what we have chosen to hide.",
            "F": "What we really need is a change in attitude.",
            "G": "Most students say they have never used social media.",
            "H": "Cyberbullying, for example, has been linked to anxiety and depression.",
            "I": "That is something worth remembering every time we scroll.",
            "J": "Several have added online safety to the timetable.",
            "K": "It is like a shop window: it shows only what we want people to see.",
            "L": "Many adults spend more time online than their children.",
            "M": "Tomorrow, you may be glad you did.",
        }, [
            ("B", "Nadaljuje misel o delodajalcih in pripravi primer s fotografijo z zabave."),
            ("D", "Mladi vedo, da lahko objave vidi bodoči delodajalec – zato dva računa."),
            ("E", "Tudi previdni ne nadzorujejo vsega: objave drugih razkrijejo skrito."),
            ("H", "Resne posledice – primer spletnega nadlegovanja."),
            ("A", "Pravica do pozabe – v EU del zakonodaje."),
            ("J", "Šole se odzivajo: varnost na spletu na urniku, sledi opis pouka."),
            ("F", "Pravila niso dovolj – potrebujemo spremembo odnosa; sledi »We need to accept …«."),
            ("K", "Profil kot izložba: kaže le, kar želimo pokazati."),
            ("I", "Zaključna misel: zapomniti si ob vsakem drsenju po zaslonu."),
            ("M", "Nasvet »počakaj« – jutri boš morda vesel, da si."),
        ], "C", vrsta="sentences"),
        GF("A rocket in the shed", """# The teenager who built a rocket in his garden shed
When fifteen-year-old Tom Reid told his parents he wanted to build a rocket, they assumed he meant a model. _0_ they did not expect was that, two years later, his rocket would reach a height of more than three kilometres – and attract the attention _1_ a space company.

Tom built the rocket in the family's garden shed, using parts he bought online and materials he found in a local scrapyard. He taught himself the necessary maths and physics _2_ watching university lectures on the internet. "I failed many times," he admits. "The first engine I built exploded _3_ it even left the ground."

Safety was a constant concern. Tom's parents insisted _4_ every test take place at a special site run by a rocketry club, and that he wear protective equipment at _5_ times. The club, whose members include engineers and retired pilots, became Tom's second family. "They never told me my ideas were impossible," he says. "They just helped me find out _6_ they were or not."

The final launch took place on a cold morning in March. Around fifty people gathered to watch, including Tom's grandmother, _7_ had travelled from Scotland for the occasion. The rocket rose so quickly that most spectators lost sight of it _8_ seconds. Data from an onboard computer later showed that it had reached 3.2 kilometres before returning safely to Earth by parachute.

A video of the launch was viewed _9_ than two million times. Among the viewers was the founder of a British space start-up, _10_ invited Tom to spend his summer holidays working with its engineers. "He has the kind of curiosity you can't teach," she said.

Tom is now studying aerospace engineering at university. He still visits the rocketry club most weekends, where he helps younger members with their projects. "When I started, I didn't know anyone _11_ understood what I was doing," he says. "Now I want to be that person for someone _12_."

His advice to other young inventors is simple: "Don't be afraid _13_ failing. Every explosion taught me something." His mother adds one more piece of advice: "And _14_ sure your parents know what's going on in the shed." Tom laughs. "They found out _15_ the hard way."

(Vadbeno besedilo Piflar.si)""", [
            ("What", "primer"),
            ("of", "attract the attention of."),
            ("by", "by + -ing = s tem, da …"),
            ("before", "before it even left the ground."),
            ("that", "insist that + stavek (s konjunktivom: take, wear)."),
            ("all", "at all times."),
            ("whether / if", "find out whether they were (possible) or not."),
            ("who", "Nedoločni oziralni stavek za osebo."),
            ("within / in", "within seconds."),
            ("more", "more than two million times."),
            ("who", "Nedoločni oziralni stavek za osebo (founder)."),
            ("who / that", "anyone who understood."),
            ("else", "someone else."),
            ("of", "be afraid of + -ing."),
            ("make", "make sure."),
            ("about / that", "found out about it the hard way – pri tej vrzeli je smiselna tudi beseda that."),
        ]),
        GF("A city that sleeps", """# Why some cities are switching off at night
Night-time darkness used to be taken for granted. Today, more than eighty per cent of the world's population lives under skies affected by artificial light, and in Europe and North America the figure is close to _0_ (HUNDRED) per cent. Scientists warn that this "light pollution" has serious _1_ (CONSEQUENT) for both people and wildlife.

For animals, the effects can be _2_ (DESTROY). Birds that migrate at night use the stars to navigate, and bright city lights can draw them off course, causing millions of _3_ (COLLIDE) with buildings every year. Newly hatched sea turtles head towards the brightest horizon, which should be the sea but is often a road. Insects, which play an _4_ (ESSENCE) role in pollinating plants, are attracted to street lamps in such numbers that local populations can _5_ (APPEAR) altogether.

Humans are affected too. Our bodies produce a hormone called melatonin in the dark, which helps us sleep. Exposure to light at night reduces its _6_ (PRODUCE) and has been linked to sleep disorders, _7_ (OBESE) and even some forms of cancer.

Some towns have decided to act. In parts of France, shops must now switch off their window lights after 1 a.m., and several towns have reduced street _8_ (LIGHT) in quiet areas. The results have been _9_ (ENCOURAGE): energy bills have fallen, and residents report that they can see the stars again.

Critics worry that darker streets will make people feel less safe. However, research from several countries suggests that crime does not _10_ (NECESSARY) increase when lights are dimmed. What matters, experts say, is not the amount of light but its _11_ (DIRECT): lamps that shine downwards light the pavement without lighting up the sky.

In 2001, the town of Flagstaff in Arizona became the world's first "International Dark Sky Community". Since then, dozens of places have followed, attracting tourists who are _12_ (WILL) to travel long distances to see the Milky Way. For many visitors, it is an _13_ (FORGET) experience.

Perhaps the most _14_ (REMARK) thing about light pollution is how easily it could be solved. Unlike most environmental problems, it disappears almost _15_ (INSTANT) when we switch off the lights.

(Vadbeno besedilo Piflar.si)""", [
            ("a hundred / one hundred", "primer"),
            ("consequences", "serious + samostalnik v množini."),
            ("destructive / devastating", "be + pridevnik: destroy → destructive."),
            ("collisions", "millions of + samostalnik v množini."),
            ("essential", "an + pridevnik pred role."),
            ("disappear", "can + glagol; nikalna predpona dis-."),
            ("production", "its + samostalnik."),
            ("obesity", "Samostalnik v naštevanju bolezni."),
            ("lighting", "street lighting – samostalnik."),
            ("encouraging", "be + pridevnik (spodbudni rezultati)."),
            ("necessarily", "Prislov: does not necessarily increase."),
            ("direction", "its + samostalnik."),
            ("willing", "be willing to."),
            ("unforgettable", "an + pridevnik (samoglasnik): unforgettable."),
            ("remarkable", "the most + pridevnik."),
            ("instantly / instantaneously", "Prislov za almost: instant → instantly."),
        ], vrsta="wf"),
    ],
    2: [
        LSC(POSNETEK_A, [
            ("Liam got his nickname because he was small and never stopped ___.", "singing", "»I never stopped singing«."),
            ("The band was started forty years ago in ___.", "his parents' garage", "»in my parents' garage«."),
            ("At their first concert they played one song three times because they had ___.", "forgotten the others", "»we'd forgotten the others«."),
            ("According to Liam, the band never allowed ___ to divide them.", "money", "»we never let money divide us«."),
            ("Liam started writing songs after his ___ died.", "mother", "»My mother died when I was fourteen«."),
            ("Many of the band's best-known songs are about ___.", "loss", "»about loss«."),
            ("Liam supports the fight against ___.", "poverty in Africa", "»the fight against poverty in Africa«."),
            ("Some people say a rock star should ___.", "stick to music", "»a rock star should stick to music«."),
            ("Liam usually writes ___.", "every morning (before others wake up)", "»I still write every morning«."),
        ], ("Liam got his nickname at ___.", "school")),
        LNOTE(POSNETEK_B, [
            ("Where was Harold Gillies from?", "New Zealand.", "»Gillies was a New Zealander«."),
            ("What organisation did Gillies volunteer for?", "The Red Cross.", "»he volunteered for the Red Cross«."),
            ("Why were face injuries so common in the trenches?", "The head was above ground.", "»a man's head was often the only part of his body above ground«."),
            ("What problems did the old method often leave patients with?", "They couldn't eat or speak properly.", "»unable to eat or speak properly«."),
            ("Who helped Gillies to plan operations?", "An artist.", "»with the help of an artist«."),
            ("When did the hospital in Sidcup open?", "In 1917.", "»which opened in 1917«."),
            ("How many men were treated at Sidcup?", "More than five thousand.", "»More than five thousand men«."),
            ("What did blue benches signal to the public?", "That men on them might have injured faces.", "Modre klopi so opozarjale na moške s poškodovanim obrazom."),
        ], ("What was the main reason Dr Finch wrote the book?", "It's a wonderful story.")),
    ],
    3: [
        PIS("Report", """You have just returned from a four-week Erasmus+ exchange in Ireland, where you lived with a host family and attended a secondary school. You have been asked to write a report for the programme coordinators.

Write a report of 150–180 words in which you:""", [
            "describe your experience with the host family,",
            "describe the most rewarding course or activity at the school,",
            "give an account of a cultural event you took part in.",
        ], "150–180", [
            "## Zgradba poročila",
            ("To: Erasmus+ Coordinators / From: Dominik(a) Novak / Subject: Exchange in Galway", "Glava in naslov."),
            ("Introduction: The purpose of this report is to describe my four-week exchange in Galway.", "Namen."),
            ("## Host family",),
            ("I stayed with a welcoming family of five who involved me in daily life, including weekend trips to Connemara.", "Konkretni podatki in vtis."),
            ("## School",),
            ("The most rewarding course was Irish history, as the teacher used local sources and museum visits.", "Kaj in zakaj."),
            ("## Cultural event",),
            ("I took part in a traditional céilí, an evening of Irish dancing, where I learned two dances and met many local students.", "Opis dogodka."),
            ("Conclusion: I would strongly recommend the programme to other students.", "Sklep s priporočilom."),
        ], "Formalno poročilo z glavo, namenom, tremi odstavki s podnaslovi (gostiteljska družina, najkoristnejši predmet, kulturni dogodek) in sklepom; 150–180 besed.",
            glava="To: Erasmus+ Coordinators\nFrom: Dominik(a) Novak\nSubject: Exchange in Ireland"),
        LIT("Discuss how Will Freeman changes in Nick Hornby's About a Boy.", "Nick Hornby: About a Boy", "250–300", [
            "## Načrt eseja",
            ("Uvod: teza – Will changes from a man who avoids all responsibility into someone who accepts that he needs other people.", "Teza."),
            ("Jedro 1 – Will at the beginning: lives on royalties from his father's Christmas song, invents a son to meet single mothers (SPAT).", "Konkreten prizor: izmišljeni sin Ned."),
            ("Jedro 2 – the turning point: Marcus forces his way into Will's life; Will buys him trainers and starts to care.", "Pokaži, kako odnos z Marcusom sproži spremembo."),
            ("Jedro 3 – the ending: Will falls in love with Rachel, is honest about himself, and supports Marcus at the school concert.", "Razvoj: od laži do iskrenosti."),
            ("Sklep: the boy in the title is as much Will as Marcus.", "Pomen naslova kot sklepna misel."),
        ], "Esej o razvoju Willa Freemana: od neodgovornega samotarja (izmišljeni sin, »units of time«) prek odnosa z Marcusom do iskrenosti in povezanosti; 250–300 besed."),
    ],
}
