import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    dela: [["Vilinski kralj", "Franz Schubert"], ["Zimsko potovanje", "Franz Schubert"], ["Fantastična simfonija", "Hector Berlioz"], ["Prstan Nibelungov", "Richard Wagner"], ["Tristan in Izolda", "Richard Wagner"], ["Aida", "Giuseppe Verdi"], ["La traviata", "Giuseppe Verdi"], ["Moja domovina (Vltava)", "Bedřich Smetana"], ["Slike z razstave", "Modest Musorgski"], ["Labodje jezero", "Pjotr Iljič Čajkovski"], ["Peer Gynt", "Edvard Grieg"], ["Carmen", "Georges Bizet"], ["Simfonija Iz novega sveta", "Antonín Dvořák"], ["Madame Butterfly", "Giacomo Puccini"]],
    osebe: [["Franz Schubert", "dunajski skladatelj več kot 600 samospevov"], ["Frédéric Chopin", "poljski »pesnik klavirja«, avtor mazurk, polonez in nokturnov"], ["Franz Liszt", "madžarski klavirski virtuoz, utemeljitelj simfonične pesnitve"], ["Richard Wagner", "avtor glasbene drame in vodilnih motivov (leitmotivov)"], ["Giuseppe Verdi", "največji italijanski operni skladatelj 19. stoletja"], ["Bedřich Smetana", "utemeljitelj češke nacionalne glasbe"], ["Hector Berlioz", "francoski skladatelj programske simfonije z idée fixe"], ["Johannes Brahms", "nemški romantik, ki je ohranjal klasične oblike"], ["Robert Schumann", "skladatelj klavirskih ciklov in glasbeni kritik"], ["Gustav Mahler", "pozni romantik, avtor obsežnih simfonij"]],
  });
  pojmi([
    ["samospev", "Pesem za glas in klavir na umetniško pesem."],
    ["programska glasba", "Inštrumentalna glasba, ki ponazarja zunajglasbeno vsebino."],
    ["absolutna glasba", "Glasba brez zunajglasbene vsebine."],
    ["simfonična pesnitev", "Enostavčna programska skladba za orkester."],
    ["leitmotiv", "Vodilni motiv, ki v Wagnerjevih delih označuje osebo ali idejo."],
    ["glasbena drama", "Wagnerjeva celostna umetnina, v kateri so glasba, besedilo in prizorišče enakovredni."],
    ["nacionalne šole", "Smeri, ki so v glasbo vnašale ljudsko glasbo in zgodovino svojega naroda."],
    ["virtuoz", "Izvajalec izjemnih tehničnih sposobnosti."],
    ["nokturno", "Sanjava, lirična klavirska skladba."],
    ["etuda", "Skladba za urjenje tehnike, pri romantikih tudi koncertna."],
  ]);
  vprasanja([
    [4, "Kaj je idée fixe v Berliozovi Fantastični simfoniji?", "ponavljajoča se melodija, ki ponazarja ljubljeno žensko", ["opera v petih dejanjih", "vrsta takta", "konec simfonije"], "Spreminja se glede na vsebino stavkov.", "visja"],
    [4, "Katera skupina ruskih skladateljev je gradila nacionalno glasbo (Peterica)?", "Balakirev, Cui, Musorgski, Borodin, Rimski-Korsakov", ["Čajkovski, Rahmaninov, Skrjabin, Glinka, Stravinski", "Šostakovič, Prokofjev, Glinka, Stravinski, Cui", "Smetana, Dvořák, Janáček, Suk, Martinů"], "Imenujejo jo tudi Mogočna peščica.", "visja"],
  ]);
}
