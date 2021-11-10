// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, liStyle, titleStyle} from "../GuidesStyles";
import {Link} from "react-router-dom";
import {GuideRoutes} from "../GuidesMain";

type Props = {

}

const GuidesGlossary = (props: Props): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Glossario
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Proponiamo di seguito un breve glossario di termini che verranno utilizzati in questa e nella prossima
                sezione.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <b>Disclaimer</b>: i concetti di seguito sono espressi liberamente ed in modo il pi&ugrave;
                    stringato possibile, in modo da poterne fornire un'idea del tutto generale. Si rimanda ai manuali di
                    Vampiri: la Masquerade&trade; per approfondimenti.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    <li style={liStyle}>
                        <b>Abbraccio</b>: il rituale soprannaturale attraverso cui un vampiro pu&ograve; crearne un altro.
                        Consiste, molto succintamente, nel privare la vittima mortale di tutto il suo sangue, per poi
                        nutrirla con una quantit&agrave; di <i>vitae</i> del sire. La progenie avr&agrave; quindi
                        una generazione inferiore a quella del Sire, motivo per cui molti tra i vampiri di generazione
                        bassa non riescono a generare progenie, o generano vampiri dal Sangue Debole (vedi voce di glossario
                        relativa).
                    </li>
                    <li style={liStyle}>
                        <b>Anarchici</b>: una fazione politica di vampiri che rifiutano l'autorit&agrave; ritenuta
                        opprimente esercitata sia dalla Camarilla che dal Sabbat. Si affida a quella molto pi&ugrave;
                        "rilassata" (almeno a parole) dei <b>Baroni</b>, l'equivalente dei <b>Principi</b> della
                        Camarilla in termini strettamente gerarchici.
                    </li>
                    <li style={liStyle}>
                        <b>Antidiluviani</b>: col termine Antidiluviani si intendono i tredici cainiti, nipoti di Caino, che
                        furono Abbracciati dai tre vampiri di seconda generazione prima del Diluvio biblico. Le loro figure 
                        appartengono ormai alla leggenda, ma risalgono a loro le caratteristiche che ancora oggi sono riconoscibili 
                        nei diversi clan.
                    </li>
                    <li style={liStyle}>
                        <b>Bestia</b>: la Bestia &egrave; un'entit&agrave; indipendente dal vampiro, che dimora nella sua mente, 
                        e che lo spinge costantemente ad atti nefandi per poter procacciare l'unica sostanza che pu&ograve; 
                        soddisfarlo: il Sangue. La Bestia &egrave; una costante minaccia, e tenter&agrave; sempre di prendere
                        il controllo del Cainita. Se il livello di <Link to={GuideRoutes.homeRules}>Fame</Link> aumenta
                        fino a 5, di fronte a pesanti umiliazioni o se confrontato a grandi pericoli, il Cainita rischia
                        di perdere il controllo in favore della Bestia, uno stato che viene chiamato <b>Frenesia</b>.
                    </li>
                    <li style={liStyle}>
                        <b>Cainita</b>: il termine Cainita si riferisce ai vampiri. Trae la sua etimologia dall'origine
                        ormai del tutto accettata nei circoli che i vampiri siano una razza nata dal peccato di Caino, 
                        il Progenitore.
                    </li>
                    <li style={liStyle}>
                        <b>Camarilla</b>: l'organizzazione politica Cainita un tempo pi&ugrave; diffusa ed importante a livello
                        globale. Nacque nel periodo Rinascimentale per controbattere alla minaccia dell'Inquisizione
                        e delle prime Diablerie sofferte dai cainiti di Terza Generazione, e per questa ragione
                        introdusse la Tradizione pi&ugrave; importante di tutte: la <b>Masquerade</b>.
                    </li>
                    <li style={liStyle}>
                        <b>Clan</b>: le diverse "famiglie", unite da vincoli di sangue, in cui si dividono i cainiti.
                        Leggenda vuole che i tredici grandi clan siano originati da altrettanti matusalemme, Terza
                        Generazione (da intendere come progenie della progenie, "nipoti" di Caino). Durante la storia
                        i clan hanno cambiato consuetudini, facce, e a volte sono stati persino completamente trasformati
                        a seguito delle Diablerie sofferte dai membri della Terza Generazione. Nelle Ultime Notti,
                        verranno considerati i seguenti clan, dei quali verr&agrave; dato solo un aggiornamento rispetto
                        ai fatti descritti nelle versioni precedenti dei manuali (quelli marcati con (*) sono da
                        considerarsi estremamente rari). Per maggior informazioni, consultate i manuali o i contenuti
                        disponibili online (vedi <Link to={GuideRoutes.credits}>Credits</Link>):
                        <ul>
                            <li style={liStyle}><b>Banu Haqim (ex Assamiti)</b>: hanno di recente formalmente richiesto ed ottenuto
                            di entrare a far parte della Camarilla.</li>
                            <li style={liStyle}><b>Brujah</b>: una delle cause che ha convinto la Camarilla ad accogliere i Banu Haqim
                            tra le sue fila &egrave; stata la defezione di massa di questo clan, dopo il tradimento
                            di Theo Bell al Conclave di Praga. Non tutti i Brujah hanno deciso di seguirlo, ed &egrave; considerato
                            perfettamente lecito creare un personaggio Brujah affiliato alla Camarilla.</li>
                            <li style={liStyle}><b>Gangrel</b>: il clan Gangrel &egrave; ufficialmente indipendente dalla defezione di Xaviar.
                                Anche alcuni Gangrel, come nel caso dei Brujah, hanno per&ograve; deciso di rimanere nella Camarilla,
                                quindi &egrave; lecito creare personaggi Gangrel affiliati alla Setta.<br />
                                Poco &egrave; cambiato dalla terza edizione di Vampiri: la Masquerade&trade;, sar&agrave;
                                possibile interpretare liberamente un componente del clan come indipendente, affiliato
                                della Camarilla o Anarchico.
                            </li>
                            <li style={liStyle}><b>Hecata (ex Giovanni)</b>: ex clan Giovanni. i Giovanni continuano a formare la maggioranza del clan,
                            che adesso ospita anche gli elementi del clan dei Cappadoci nelle loro diverse emanazioni,
                            quasi del tutto spazzato via dopo la Diablerie sull'Antidiluviano operata da Augustus Giovanni.</li>
                            <li style={liStyle}><b>Lasombra</b>: dietro impulso degli <i>Amici Noctis</i>, anche i Lasombra hanno ufficialmente
                            richiesto ed ottenuto di entrare a far parte della Camarilla, con un accordo molto meno
                            vantaggioso rispetto a quello strappato dai Banu Haqim: ogni nuovo Abbraccio dovr&agrave;
                            essere pagato con l'uccisione di un membro Anziano del loro stesso clan.</li>
                            <li style={liStyle}><b>Malkavian</b>: nell'ambientazione si considera che i Malkavian hanno subito pi&ugrave;
                                perdite in termini di non-vite rispetto agli altri clan, dato che la loro maledizione
                                ha a che fare con forme pi&ugrave; o meno accentuate di follia. Nonostante questo, 
                                il clan non subir&agrave; nessuna restrizione in fase di creazione, e potranno
                                essere creati personaggi appartenenti sia ad Anarchici che alla Camarilla.
                            </li>
                            <li style={liStyle}><b>Ministry (ex Seguaci di Set) (*)</b>: (ancora da definire)</li>
                            <li style={liStyle}><b>Ravnos (*)</b>: la Settimana degli Incubi, in cui l'Antidiluviano del clan si &egrave;
                                risvegliato a cavallo tra il Ventesimo e il Ventunesimo secolo, &egrave; avvenuta. Durante questo periodo,
                                inonando le menti dei componenti del clan di incubi ed incitandoli a frenesie incontrollate, l'Antidiluviano 
                                ha di fatto decimato gran parte del clan dopo una settimana. I Ravnos sono estremamente rari, e 
                                l'iscrizione potr&agrave; venire negata.
                            </li>
                            <li style={liStyle}><b>Toreador</b>: il clan Toreador fa ancora parte della Camarilla, ed &egrave; stato quello
                                meno interessato dalla violenza della Seconda Inquisizione. In altre parole, poco &egrave; cambiato 
                                rispetto alla Terza Edizione.
                            </li>
                            <li style={liStyle}><b>Tremere</b>: a seguito dell'attacco della Seconda Inquisizione alla Haus de Hexe, la Chantry
                            principale Tremere a Vienna, molti dei legami di sangue che tenevano saldamente legati i membri del clan sono stati
                            spezzati, il Concilio dei Sette &egrave; disperso. Come conseguenza, i Tremere, una volta potenti e uniti, hanno perso 
                            la loro rigida organizzazione gerarchica piramidale. Il clan si &egrave; spaccato in quattro differenti "sette", 
                            ma la maggior parte di loro continua a far parte della Camarilla.</li>
                            <li style={liStyle}><b>Tzimisce (*)</b>: la maggior parte degli Tzimisce &egrave; partita coi contingenti Sabbat
                            alla volta del Medio Oriente per combattere la Guerra di Gehenna, e al contrario dei Lasombra non ha tradito la causa.<br />
                            Un personaggio Tzimisce per questa ragione &egrave; considerato raro, la sua accettazione non deve essere data per scontata,
                            e dovr&agrave; essere fornita un'ottima motivazione in fase di creazione.</li>
                            <li style={liStyle}><b>Ventrue</b>: il clan Ventrue &egrave; fondamento della Camarilla, ed si &egrave; ovviamente trovato 
                            a dover risolvere la maggior parte dei problemi dovuti al disfacimento della Camarilla. Non sar&agrave; impedita la creazione
                            di personaggi Ventrue affiliati alla Camarilla. Personaggi Ventrue Anarchici, per&ograve;, dovranno essere adeguatamente 
                            giustificati.</li>
                        </ul>
                    </li>
                    <li style={liStyle}>
                        <b>Discipline</b>: i poteri dei cainiti, esercitati "bruciando" o utilizzando una variabile
                        quantit&agrave; di <i>vitae</i> (vedi voce di glossario).
                    </li>
                    <li style={liStyle}>
                        <b>Fratelli</b>: altro termine utilizzato per riferirsi ai vampiri, il pi&ugrave; utilizzato,
                        almeno all'interno della Camarilla.
                    </li>
                    <li style={liStyle}>
                        <b>Frenesia</b>: la Frenesia &egrave; uno stato in cui le azioni del vampiro non sono sue
                        proprie, ma viene come posseduto dall'entit&agrave; soprannaturale che abita la sua mente 
                        dall'Abbraccio: la <b>Bestia</b>. Il vampiro, quando confrontato con il pericolo di essere
                        dominato dalla Bestia, ha di fronte a s&eacute; due opzioni: la prima &egrave; quella di
                        resistere, allontanandosi dalla fonte di pericolo, o sfamandosi autonomamente prima che lo 
                        faccia la Bestia per lui; l'altra opzione &egrave; quella di "cavalcare" la Bestia,
                        ovvero fare in modo che la Bestia prenda il sopravvento, ma mantenendo un'oncia di controllo
                        per direzionarla dove ritiene pi&ugrave; conveniente.
                    </li>
                    <li style={liStyle}>
                        <b>Generazione</b>: nella mitologia Cainita, i vampiri discendono da Caino attraverso il rituale
                        dell'Abbraccio, che perpetra la razza Cainita di generazione in generazione. Che sia vero o meno,
                        &egrave; un fatto dimostrato che pi&ugrave; ci si "allontana" dalla prima generazione, meno potere
                        il sangue ritiene. L'Infante avr&agrave; meno potere del Sire, e così via fino ai Sangue Debole,
                        il cui sangue &egrave;, appunto, cos&igrave; debole da non manifestare pi&ugrave; n&eacute; le 
                        caratteristiche del clan, e nemmeno dei cainiti in generale.<br />
                        La generazione di un Cainita esprime quindi la sua lontananza dal progenitore: la tredicesima
                        generazione &egrave; ritenuta l'ultima generazione in cui il sangue ritiene ancora le caratteristiche
                        dei cainiti.
                    </li>
                    <li style={liStyle}>
                        <b>Masquerade</b>: il nome di una delle sei Tradizioni, o regole fondamentali, della Camarilla.
                        La regola &egrave; molto semplice, nella sua applicazione diretta: nessun vampiro deve
                        manifestare la sua natura soprannaturale agli umani.
                    </li>
                    <li style={liStyle}>
                        <b>Sangue Debole</b>: sono i vampiri la cui generazione &egrave; troppo bassa per manifestare
                        appieno le caratteristiche tipiche del vampirismo, nel bene e nel male. Questo vuol dire che,
                        nonostante debbano incorrere in numerose difficolt&agrave; per poter anche solo simulare
                        i poteri dei cainiti (la loro Alchimia del Sangue), non soffrono i raggi del Sole come i Fratelli
                        di generazione superiore. Sono stati, e sono tutt'ora, oggetto di scherno o di attiva
                        persecuzione da parte dei cainiti, in quanto ritenuti segno della fine dei tempi della Gehenna.
                    </li>
                    <li style={liStyle}>
                        <b>Sabbat</b>: per secoli, sicuramente a partire dalla scoperta e successiva colonizzazione
                        del Nuovo Mondo, &egrave; stata la reale antagonista, nonch&eacute; spina nel fianco della
                        Camarilla. Basata su una serie di consuetudini volte a rafforzare (o depennare uccidendo)
                        i cainiti che ne facevano parte, ha nel 2005 intrapreso la Guerra della Gehenna contro gli
                        Antidiluviani e i Matusalemme, per liberarsi dalle catene del sangue che li tenevano
                        a loro imprigionati.
                    </li>
                    <li style={liStyle}>
                        <b>Seconda Inquisizione</b>: a seguito di un piano molto ottimista della Camarilla fallito
                        miseramente (o riuscito troppo bene, dipendendo dal punto di vista), diverse organizzazioni
                        governative, ed alcuni servizi segreti, sono entrati a conoscenza dell'esistenza dei cainiti.
                        L'attacco che ha scosso maggiormente la comunit&agrave; Cainita, e che l'ha costretta ad un
                        ritorno graduale a forme di comunicazione e di spostamento quasi medievali, &egrave; stato
                        quello mascherato da attentato terroristico al quartier generale a Vienna del clan Tremere,
                        che ha di fatto azzerato gli alti ranghi del clan, il Concilio dei Sette. &Egrave; correntemente
                        il pi&ugrave; grande pericolo per la non-vita Cainita.
                    </li>
                    <li style={liStyle}>
                        <b>Vitae</b>: sostanza soprannaturale sublimata a partire dal sangue dei mortali, dalla fisiologia
                        dei cainiti. In parole povere, quando i vampiri suggono il sangue dei mortali per cibarsi,
                        trasformano il sangue in una sostanza soprannaturale in grado di sostenere i loro corpi non morti,
                        e di dare sostanza ai poteri che esercitano, le Discipline.
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesGlossary;
