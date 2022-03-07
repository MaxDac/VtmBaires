// @flow

import React from "react";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";
import {GuideRoutes} from "../GuidesMain";
import type {GenericReactComponent} from "../../../_base/types";

const GuidesCurrentSituation = (): GenericReactComponent => {
    return (
        <>
            <Typography component="div">
                <h1 style={titleStyle}>
                    Situazione Attuale
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Se siete arrivati fin qui, probabilmente avrete gi&agrave; letto la storia dei Cainiti, delle Sette che
                popolano il Dominio di Buenos Aires e i personaggi (non giocanti) che le rappresentano. La storia di 
                un <b>Play by Chat</b>, per&ograve;, &egrave; in continuo movimento, soprattutto se ambientata in un
                Dominio che non &egrave; ancora perfettamente stabile: i personaggi che ricoprono una carica possono
                cambiare, o addirittura <b>a cambiare potrebbe essere la Setta che ha il predominio sul 
                territorio</b>. Tutto &egrave; possibile, e tutte le possibilit&agrave; verranno date ai giocatori
                per esprimere il potenziale dei propri personaggi.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Per fare questo, per&ograve;, &egrave; bene aver presente la storia del Dominio, e come inserire il 
                vostro personaggio al suo interno in modo concreto. Questa sezione verr&agrave; aggiornata anche con 
                avvenimenti di grande importanza che avvengono man mano nel gioco.
            </Typography>

            <Typography component="div">
                <h2 style={titleStyle}>
                    Il Dominio Oggi
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La zona metropolitana di Buenos Aires, divisa tra <b>Capital Federal</b>, il centro 
                (locations: <b>Palermo</b>, <b>Centro</b> e <b>La Boca</b>), e la <b>Provincia</b>, la periferia,
                che include anche la zona di <b>Quilmes</b>. La Seconda Inquisizione, arrivata a Buenos Aires in seguito 
                al <b>Tradimento del Principe</b>, e il cambio di governo istigato da Santiago Rinaldi, controlla gran 
                parte della Capital Federal, lasciando ai Cainiti dell'auto proclamata Anarchia i territori pi&ugrave; 
                poveri e disagiati della Provincia, stretti in una morsa che gli impedisce anche di fuggire: porti ed
                aeroporti sono controllati da sistemi di sicurezza d'avanguardia fatti apposta per individuare <b>Blank
                Bodies</b>, come vengono chiamati in codice i Cainiti. I personaggi che potranno essere creati dovranno
                appartenere alla <b>Fazione Anarchica</b>.
            </Typography>

            <Typography component="div">
                <h2 style={titleStyle}>
                    Chi sono i Fratelli
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                L'ex Dominio di Buenos Aires &egrave; diventato un Dominio Anarchico non per scelta, ma per il 
                Tradimento della Camarilla, che ha abbandonato i Fratelli che ne facevano parte alla caccia senza
                quartiere della Seconda Inquisizione: l'insieme dei servizi segreti e di sicurezza che la compongono
                stanno cercando attivamente di bonificare la capitale argentina dalla presenza dei Cainiti, cos&igrave;
                come &egrave; gi&agrave; accaduto a Londra in Europa. L'unico punto di riferimento anarchico 
                rimane <b>Rodrigo Manoukian</b>, che gestisce il suo locale nella Provincia il <b>Zona Este</b>. Per i 
                Cainiti del clan Tremere, esiste anche una Chantry, la cui ubicazione rimane nota solamente ai 
                componenti del clan.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Di seguito vengono proposti alcuni archetipi di personaggi che potrebbero bene inserirsi in questa
                ambientazione. Questi profili sono studiati per potervi prendere spunto nella creazione del vostro 
                personaggio.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    Il Reduce
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il reduce &egrave; un Cainita che &egrave; sopravvissuto ad uno o pi&ugrave; cambi della situazione
                politica di Buenos Aires. Che sia presente in Sud America dai tempi del Dominio di Montevideo, o 
                semplicemente un Europeo trasferitosi a Buenos Aires per scappare all'Inquisizione, il Reduce ha 
                assistito, ed &egrave; sopravvissuto, al radicale cambiamento politico che ha interessato la 
                citt&agrave;, e pu&ograve; covare risentimento per la nuova o per la vecchia gestione, comportandosi di
                conseguenza.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    Il Complottista
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                L'archetipo Complottista &egrave; una variante del Reduce: il Complottista &egrave; un Cainita della
                Camarilla che &egrave; rimasto sul campo, e non ha abbandonato la sua fedelt&agrave; per l'istituzione
                della Camarilla, nonostante quest'ultima l'abbia tradito. Che sia per abitudine, o per mancanza di 
                riferimenti, questo Cainita lavora attivamente per sgominare le bande Anarchiche presenti sul territorio
                della Provincia, e per scacciare la Seconda Inquisizione da Buenos Aires.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    L'Avventuriero
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La non-vita nel Vecchio Continente per l'Avventuriero era troppo noiosa, e la tentazione di potersi 
                misurare su un Dominio Anarchico distante dalle logiche e dalle politiche del Vecchio Continente troppo 
                appetibile per non approfittarne. L'Avventuriero ha speso quasi tutti i suoi risparmi per garantirsi un 
                volo tranquillo fino all'Aeroparque di Buenos Aires, per potersi misurare con l'attuale situazione.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    Il Reietto
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Se l'Avventuriero ha raggiunto Buenos Aires per scelta, il Reietto l'ha fatto per mera necessit&agrave;.
                Il Fratello potrebbe avere un Segreto Oscuro, o addirittura un Nemico (<b>Difetti consigliati</b>) 
                acerrimo ad attenderlo in Europa, e pur di non dover affrontare le conseguenze delle sue azioni in 
                Europa, ha deciso di riparare in un Dominio in difficolt&agrave; per poter essere troppo selettivo nella 
                scelta dei suoi componenti.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    L'Infante
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                (Consigliato per chi per la prima volta si approccia a Vampiri: la Masquerade&trade;) Abbracciato 
                solamente di recente da un Cainita, per l'Infante il mondo dei Fratelli &egrave; del tutto nuovo:
                la terminologia, le caratteristiche della sua nuova vita notturna, l'Inquisizione, sembrano appartenere
                ad un mondo di favole e di invenzione, ma sta scoperndo quanto possono essere reali, e <b>letali</b>. 
                L'Infante &egrave; stato creato da poco, ed &egrave; veramente difficile che possa acquisire il 
                background di <b>Generazione</b>, anzi, pu&ograve; gi&agrave; ritenersi fortunato a non essere un Sangue 
                Debole.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <b>Nota</b>: nel caso in cui scegliate come Sire uno dei personaggi non giocanti esposti in
                questa <Link to={GuideRoutes.npcs}>Sezione</Link>, <b>&egrave; indispensabile contattare un narratore
                    prima di mandare il background</b>. Chi non contatter&agrave; un narratore, potr&agrave; vedere
                    il proprio personaggio <b>rifiutato</b>.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    Il Sangue Debole
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La non-vita per i <i>Duskborn</i> &egrave; normalmente molto complicata nei Domini della Camarilla e 
                nelle Baronie Anarchiche. Screditati e ostracizzati quando va bene, attivamente cacciati quando va 
                male, sono sempre costretti a barcamenarsi e fuggire per non morire, senza nemmeno l'ausilio delle
                Discipline. Buenos Aires non offre una situazione molto migliore rispetto ad altre citt&agrave;: il
                fatto che proprio un Sangue Debole sia ritenuto il responsabile dell'arrivo della Seconda Inquisizione
                rende il resto dei Cainiti generalmente ostili alla loro condizione di "mezzi vampiri".
            </Typography>

            <Typography component="div">
                <h2 style={titleStyle}>
                    La Non-Vita a Buenos Aires
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Avete a questo punto deciso come &egrave; arrivato a Buenos Aires il vostro personaggio. Per decidere
                come ingannare la noia della non-vita del vostro personaggio, dovrete sapere quali questioni sono ancora
                aperte per poterle sfruttare, o quali &egrave; possibile aprire.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    La Questione Anarchica
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Come anticipato, Buenos Aires &egrave; diventato un Dominio Anarchico non per scelta, ma per il 
                precipitarsi degli eventi dell'ultimo anno. In seguito ad una serie di attentati alla Masquerade, 
                infatti, il Principe ed il Siniscalco del Dominio hanno deciso di tradire i Fratelli, rifugiandosi nel
                rinnovato Dominio di Montevideo, scatenando l'ira di Santiago Rinaldi, l'egocentrico Sangue Debole che
                pretendeva di diventare Principe, ed ha invece rovesciato il governo mortale, aprendo di fatto le porte
                dell'Argentina alla Seconda Inquisizione. 
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Di fronte a questa minaccia mortale, la maggior parte dei Cainiti hanno subito la Morte Ultima, sorpresi
                dall'arrivo dei cacciatori mortali, oppure hanno giurato fedelt&agrave; all'unica figura rimasta nella
                metropoli con sufficienti contatti e influenze nei bassifondi da poter garantire protezione nelle zone
                pi&ugrave; malfamate e meno abbienti della <b>Provincia</b>. &Egrave; cos&igrave; che, quindi, i Cainiti
                a Buenos Aires sopravvivono notte dopo notte, dovendosi guardare le spalle ad ogni angolo, relegati alle
                zone pi&ugrave; depresse della citt&agrave;, senza una chiara struttura gerarchica a sostenere i propri 
                diritti di Dominio.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    La Politica
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Pur potendo contare il numero di Fratelli sulle dita di due mani, ogni raggruppamento di Cainiti
                &egrave; un teatro dell'eterna Jihad, e nel caso della Fazione Anarchica, questo non fa differenza.
                La caratteristica principale dell'Anarchia dei Fratelli &egrave; il rifiuto categorico dell'egemonia
                degli Anziani, e delle loro politiche: questo, a Buenos Aires, &egrave; stata una necessit&agrave; 
                pi&ugrave; che una reale scelta, dato che allo stato attuale non esiste un Anziano sopravvissuto al 
                Richiamo che abbia scelto coscientemente di recarsi in questa citt&agrave; di confine e soggiogata dalla
                Inquisizione. Ci&ograve; nonostante l'atavica volont&agrave; di prevalere sul prossimo, la Bestia e 
                l'arroganza tipica dei Cainiti, animano anche i rapporti di forza tra Anarchici, minando la promessa 
                di libert&agrave; e di indipendenza propugnata dalla Fazione.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    La Questione dei Sangue Debole
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                In seguito alle azioni di Santiago Rinaldi, il Sangue Debole con potentissime influenze nel mondo 
                mortale, i Cainiti appartenenti a questo gruppo sono, se possibile, ancora pi&ugrave; discriminati 
                rispetto al resto dei Domini. Qualsiasi Sangue Debole corre il rischio di essere sospettato di 
                collaborare con il nemico, che ancora non &egrave; sceso dalla sua Torre d'Avorio per confrontarsi con
                il resto della popolazione non-morta.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                D'altro canto, proprio la loro condizione potrebbe renderli perfetti come ambasciatori o negoziatori
                con Rinaldi per conto dell'Anarchia, per la costruzione di una possibile alleanza che possa portare 
                ad un ribaltamento della politica mortale, per poter allontanare ancora una volta la Seconda 
                Inquisizione da Buenos Aires. La non-vita per i Sangue Debole &egrave; sicuramente complessa, ma non
                per questo priva di opportunit&agrave;.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    La Questione degli Hecata
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Gli Hecata, il clan, o la Famiglia, precedentemente nota col nome dei Giovanni, &egrave; riuscita a 
                sopravvivere grazie alla discrezione che la rappresentante del clan, <b>Mercedes Pisanob</b>, ha saputo
                imporre a tutti i componenti del clan. Con la fuga della Camarilla dal Dominio, hanno approfittato 
                del vuoto di potere per acqusire un gran numero di influenze nel mondo mortale, appropriandosi anche 
                della zona del Cimitero di Recoleta, grazie all'arrivo di numerosi rampolli della Famiglia Giovanni
                mortale dall'Europa. Questo ha lasciato ancora pi&ugrave; isolati gli Anarchici, privi della copertura
                nel mondo mortale che la Camarilla sapeva fornire ai suoi Fratelli. Se un Cainita ha bisogno di contatti
                tra i mortali, sar&agrave; probabilmente costretto a doversi confrontare con gli Hecata.
            </Typography>

            <Typography component="div">
                <h3 style={titleStyle}>
                    La Questione della Camarilla
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il <b>Tradimento del Principe</b> al Dominio di Buenos Aires &egrave; stato profondo, e cocente. I 
                Cainiti di Buenos Aires che avevano giurato fedelt&agrave; alla Torre d'Avorio sono stati abbandonati a
                loro stessi come carne da macello, come depistaggio per la Seconda Inquisizione, mentre lo stato
                maggiore approfittava di transitare dalle dogane della capitale ancora non controllate dalla Seconda
                Inquisizione, verso Montevideo, dove conservava ancora qualche contatto mortale, e dove un ennesimo
                Dominio &egrave; stato rifondato.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Le mire della Camarilla su Buenos Aires non si sono per&ograve; esaurite con il Tradimento: Montevideo 
                &egrave; una citt&agrave; ad un'ora di traghetto dalla capitale argentina, ed intensamente relazionata
                a quest'ultima. &Egrave; facile immaginare che la Camarilla vorr&agrave; riappropriarsi della 
                citt&agrave; di Buenos Aires prima o poi, ed &egrave; difficile pensare che, una volta stabilmente 
                insediata, aspetter&agrave; pazientemente che la bonifica si concluda, e la Seconda Inquisizione se ne 
                vada, senza tentare di accelearare il processo.
            </Typography>
        </>
    );
}

export default GuidesCurrentSituation;
