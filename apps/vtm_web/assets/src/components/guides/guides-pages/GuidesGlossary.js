// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";

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
                sezione. <b>Disclaimer</b>: i concetti di seguito sono espressi liberamente ed in modo il pi&ugrave;
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
                        opprimente esercitata sia dalla Camarilla che dal Sabbat. Si affida a quella molto pi&grave;
                        "rilassata" (almeno in teoria) dei <b>Baroni</b>, l'equivalente dei <b>Principi</b> della
                        Camarilla in termini strettamente gerarchici.
                    </li>
                    <li style={liStyle}>
                        <b>Cainita</b>: il termine cainita si riferisce ai vampiri. Trae la sua etimologia dall'origine
                        ormai quasi del tutto diffusa all'interno dei circoli che i vampiri siano una razza
                        nata dal peccato di Caino, il Progenitore.
                    </li>
                    <li style={liStyle}>
                        <b>Camarilla</b>: l'organizzazione politica un tempo pi&ugrave; diffusa ed importante a livello
                        globale. Nacque nel periodo Rinascimentale per controbattere alla minaccia dell'Inquisizione
                        e delle prime Diablerie sofferte dai cainiti di Terza Generazione, e per questa ragione
                        introdusse la Tradizione pi&ugrave; importante di tutte: la <b>Masquerade</b>.
                    </li>
                    <li style={liStyle}>
                        <b>Clan</b>: le diverse "famiglie" dettate da vincoli di sangue in cui si dividono i vampiri.
                        Leggenda vuole che i tredici grandi clan siano originati da altrettanti matusalemme, Terza
                        Generazione (da intendere come progenie della progenie, "nipoti" di Caino). Durante la storia
                        i clan hanno cambiato consuetudini, facce, e a volte sono stati persino completamente trasformati
                        in seguito alla Diablerie operata sui membri della Terza Generazione. Nelle Ultime Notti,
                        verranno considerati i seguenti clan, dei quali verr&agrave; dato un aggiornamento rispetto
                        ai fatti descritti nelle versioni precedenti dei manuali (quelli marcati con (*) sono da
                        considerarsi estremamente rari):
                        <ul>
                            <li style={liStyle}>Banu Haquim (ex Assamiti): in seguito ad eventi recenti, hanno richiesto ed ottenuto
                            di entrare a far parte della Camarilla.</li>
                            <li style={liStyle}>Brujah: una delle cause che ha convinto la Camarilla ad accogliere i Banu Haquim
                            tra le sue fila &egrave; stata la defezione di massa di questo clan, dopo il tradimento
                            di Theo Bell.</li>
                            <li style={liStyle}>Gangrel: il clan Gangrel &egrave; ufficialmente indipendente dalla defezione di Xaviar.
                                Poco &egrave; cambiato dalla terza edizione di Vampiri: la Masquerade&trade;, sar&agrave;
                                possibile interpretare liberamente un componente del clan come indipendente, affiliato
                                della Camarilla o Anarchico.
                            </li>
                            <li style={liStyle}>Hecata (ex Giovanni): i Giovanni continuano a formare la maggioranza del clan,
                            che adesso ospita anche gli elementi del clan dei Cappadoci nelle loro diverse emanazioni,
                            quasi del tutto spazzato via dopo la Diablerie sull'Antidiluviano operata da Augustus Giovanni.</li>
                            <li style={liStyle}>Lasombra: dietro impulso degli <i>Amici Noctis</i>, anche i Lasombra hanno ufficialmente
                            richiesto ed ottenuto di entrare a far parte della Camarilla, con un accordo molto meno
                            vantaggioso rispetto a quello strappato dai Banu Haquim: ogni nuovo Abbraccio dovr&agrave;
                            essere pagato con l'uccisione di un membro Anziano del loro stesso clan.</li>
                            <li style={liStyle}>Malkavian: nell'ambientazione si considera che i Malkavian hanno subito pi&ugrave;
                                perdite in termini di non-vite rispetto agli altri clan, dato che la loro maledizione
                                ha a che fare con forme pi&ugrave; o meno accentuate di follia. Ad ogni modo, 
                                il clan non subir&agrave; nessuna restrizione in fase di creazione, e potranno
                                essere creati personaggi appartenenti sia ad Anarchici che alla Camarilla.
                            </li>
                            <li style={liStyle}>Ministry (ex Seguaci di Set) (*): (ancora da definire)</li>
                            <li style={liStyle}>Ravnos (*): la Settimana degli Incubi, in cui l'Antidiluviano del clan si &egrave;
                                risvegliato, inonando le menti dei componenti del clan di incubi ed incitandoli a 
                                frenesie incontrollate, decimando di fatto dopo una settimana la maggior parte del clan,
                                &egrave; avvenuta. I Ravnos sono estremamente rari, e l'iscrizione potr&agrave; venire
                                negata.
                            </li>
                            <li style={liStyle}>Toreador: il clan Toreador fa ancora parte della Camarilla, ed &egrave; stato quello
                                meno interessato dalla violenza della Seconda Inquisizione.
                            </li>
                            <li style={liStyle}>Tremere: a seguito dell'attacco della Seconda Inquisizione alla Haus de Hexe, la Chantry
                            principale Tremere a Vienna, il clan ha perso la sua rigida organizzazione gerarchica piramidale.
                            Si &sgrave; spaccato in quattro differenti "sette", ma la maggior parte di loro continua
                            a far parte della Camarilla.</li>
                            <li style={liStyle}>Tzimisce (*): la maggior parte degli Tzimisce &egrave; partita coi contingenti Sabbat
                            alla volta del Medio Oriente per combattere la Guerra di Gehenna, e al contrario dei Lasombra
                            non ha tradito la causa.</li>
                            <li style={liStyle}>Ventrue: il clan Ventrue &egrave; fondamento della Camarilla, e normalmente si
                                accetteranno personaggi affiliati a questa Setta, a meno di convincenti 
                                motivazioni.
                            </li>
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
                        <b>Generazione</b>: nella mitologia cainita, i vampiri discendono da Caino attraverso il rituale
                        dell'Abbraccio, che perpetra la razza cainita di generazione in generazione. Che sia vero o meno,
                        &egrave; un fatto dimostrato che pi&ugrave; ci si "allontana" dalla prima generazione, meno potere
                        il sangue ritiene. L'Infante avr&agrave; meno potere del Sire, e così via fino ai Sangue Debole,
                        il cui sangue &egrave;, appunto, cos&igrave; debole da non manifestare pi&ugrave; n&eacute; le 
                        caratteristiche del clan, e nemmeno dei cainiti in generale.<br />
                        La generazione di un cainita esprime quindi la sua lontananza dal progenitore: la tredicesima
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
                        L'attacco che ha scosso maggiormente la comunit&agrave; cainita, e che l'ha costretta ad un
                        ritorno graduale a forme di comunicazione e di spostamento quasi medievali, &egrave; stato
                        l'attacco mascherato da attentato terroristico al quartier generale a Vienna del clan Tremere,
                        che ha di fatto azzerato gli alti ranghi del clan, il Concilio dei Sette. &Egrave; correntemente
                        il pi&ugrave; grande pericolo per la non-vita cainita.
                    </li>
                    <li style={liStyle}>
                        <b>Vitae</b>: sostanza soprannaturale sublimata a partire dal sangue dei mortali, dalla fisiologia
                        dei cainiti. In parole povere, quando i vampiri suggono il sangue dei mortali per cibarsi,
                        trasformano il sangue in una sostanza soprannaturale in grado di sostenere i loro corpi non morti,
                        e di dare sostanza ai poteri che i cainiti esercitano, le Discipline.
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesGlossary;
