// @flow

import React from "react";
import Typography from "@mui/material/Typography";

type Props = {

}

const GuidesEnvironment = (props: Props): any => {
    const liStyle = {
        margin: "15px 0"
    };

    return (
        <>
            <Typography paragraph>
                <h1>
                    Ambientazione
                </h1>
            </Typography>

            <Typography paragraph>
                Con questa sezione, comincia la parte di regolamento dedicata alle inforamzioni in gioco. Verr&agrave;
                spiegata la storia, e il suo intreccio con quella descritta nei manuali di Vampiri: la Masquerade&trade; v5,
                e verr&agrave; anche scritto quanto della pi&ugrave; aggioranta manualistica sar&agrave; considerato,
                e cosa no.
            </Typography>

            <Typography paragraph>
                <h2>
                    Glossario
                </h2>
            </Typography>

            <Typography paragraph>
                Proponiamo di seguito un breve glossario di termini che verranno utilizzati in questa e nella prossima
                sezione. <b>Disclaimer</b>: i concetti di seguito sono espressi liberamente ed in modo il pi&ugrave;
                stringato possibile, in modo da poterne fornire un'idea del tutto generale. Si rimanda ai manuali di
                Vampiri: la Masquerade&trade; per approfondire questi concetti.
            </Typography>

            <Typography paragraph>
                <ul>
                    <li>
                        <b>Abbraccio</b>: il rituale soprannaturale attraverso cui un vampiro pu&ograve; crearne un altro.
                        Consiste, molto succintamente, nel privare la vittima mortale di tutto il suo sangue, per poi
                        nutrirla con una quantit&agrave; di <i>vitae</i> del sire. La progenie avr&agrave; quindi
                        una generazione inferiore a quella del Sire, motivo per cui molti tra i vampiri di generazione
                        bassa non riescono a generare progenie, o generano vampiri dal Sangue Debole (vedi voce di glossario
                        relativa).
                    </li>
                    <li>
                        <b>Anarchici</b>: una fazione politica di vampiri che rifiutano l'autorit&agrave; ritenuta
                        opprimente esercitata sia dalla Camarilla che dal Sabbat. Si affida a quella molto pi&grave;
                        "rilassata" (almeno in teoria) dei <b>Baroni</b>, l'equivalente dei <b>Principi</b> della
                        Camarilla in termini strettamente gerarchici.
                    </li>
                    <li>
                        <b>Cainita</b>: il termine cainita si riferisce ai vampiri. Trae la sua etimologia dall'origine
                        ormai quasi del tutto diffusa all'interno dei circoli che i vampiri siano una razza
                        nata dal peccato di Caino, il Progenitore.
                    </li>
                    <li>
                        <b>Camarilla</b>: l'organizzazione politica un tempo pi&ugrave; diffusa ed importante a livello
                        globale. Nacque nel periodo Rinascimentale per controbattere alla minaccia dell'Inquisizione
                        e delle prime Diablerie sofferte dai cainiti di Terza Generazione, e per questa ragione
                        introdusse la Tradizione pi&ugrave; importante di tutte: la <b>Masquerade</b>.
                    </li>
                    <li>
                        <b>Clan</b>: le diverse "famiglie" dettate da vincoli di sangue in cui si dividono i vampiri.
                        Leggenda vuole che i tredici grandi clan siano originati da altrettanti matusalemme, Terza
                        Generazione (da intendere come progenie della progenie, "nipoti" di Caino). Durante la storia
                        i clan hanno cambiato consuetudini, facce, e a volte sono stati persino completamente trasformati
                        in seguito alla Diablerie operata sui membri della Terza Generazione. Nelle Ultime Notti,
                        verranno considerati i seguenti clan, dei quali verr&agrave; dato un aggiornamento rispetto
                        ai fatti descritti nelle versioni precedenti dei manuali (quelli marcati con (*) sono da
                        considerarsi estremamente rari):
                        <ul>
                            <li>Banu Haquim (ex Assamiti): in seguito ad eventi recenti, hanno richiesto ed ottenuto
                            di entrare a far parte della Camarilla.</li>
                            <li>Brujah: una delle cause che ha convinto la Camarilla ad accogliere i Banu Haquim
                            tra le sue fila &egrave; stata la defezione di massa di questo clan, dopo il tradimento
                            di Theo Bell.</li>
                            <li>Gangrel: il clan Gangrel &egrave; ufficialmente indipendente dalla defezione di Xaviar.
                                Poco &egrave; cambiato dalla terza edizione di Vampiri: la Masquerade&trade;, sar&agrave;
                                possibile interpretare liberamente un componente del clan come indipendente, affiliato
                                della Camarilla o Anarchico.
                            </li>
                            <li>Hecata (ex Giovanni): i Giovanni continuano a formare la maggioranza del clan,
                            che adesso ospita anche gli elementi del clan dei Cappadoci nelle loro diverse emanazioni,
                            quasi del tutto spazzato via dopo la Diablerie sull'Antidiluviano operata da Augustus Giovanni.</li>
                            <li>Lasombra: dietro impulso degli <i>Amici Noctis</i>, anche i Lasombra hanno ufficialmente
                            richiesto ed ottenuto di entrare a far parte della Camarilla, con un accordo molto meno
                            vantaggioso rispetto a quello strappato dai Banu Haquim: ogni nuovo Abbraccio dovr&agrave;
                            essere pagato con l'uccisione di un membro Anziano del loro stesso clan.</li>
                            <li>Malkavian: nell'ambientazione si considera che i Malkavian hanno subito pi&ugrave;
                                perdite in termini di non-vite rispetto agli altri clan, dato che la loro maledizione
                                ha a che fare con forme pi&ugrave; o meno accentuate di follia. Ad ogni modo, 
                                il clan non subir&agrave; nessuna restrizione in fase di creazione, e potranno
                                essere creati personaggi appartenenti sia ad Anarchici che alla Camarilla.
                            </li>
                            <li>Ministry (ex Seguaci di Set) (*): (ancora da definire)</li>
                            <li>Ravnos (*): la Settimana degli Incubi, in cui l'Antidiluviano del clan si &egrave;
                                risvegliato, inonando le menti dei componenti del clan di incubi ed incitandoli a 
                                frenesie incontrollate, decimando di fatto dopo una settimana la maggior parte del clan,
                                &egrave; avvenuta. I Ravnos sono estremamente rari, e l'iscrizione potr&agrave; venire
                                negata.
                            </li>
                            <li>Toreador: il clan Toreador fa ancora parte della Camarilla, ed &egrave; stato quello
                                meno interessato dalla violenza della Seconda Inquisizione.
                            </li>
                            <li>Tremere: a seguito dell'attacco della Seconda Inquisizione alla Haus de Hexe, la Chantry
                            principale Tremere a Vienna, il clan ha perso la sua rigida organizzazione gerarchica piramidale.
                            Si &sgrave; spaccato in quattro differenti "sette", ma la maggior parte di loro continua
                            a far parte della Camarilla.</li>
                            <li>Tzimisce (*): la maggior parte degli Tzimisce &egrave; partita coi contingenti Sabbat
                            alla volta del Medio Oriente per combattere la Guerra di Gehenna, e al contrario dei Lasombra
                            non ha tradito la causa.</li>
                            <li>Ventrue: il clan Ventrue &egrave; fondamento della Camarilla, e normalmente si
                                accetteranno personaggi affiliati a questa Setta, a meno di convincenti 
                                motivazioni.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Discipline</b>: i poteri dei cainiti, esercitati "bruciando" o utilizzando una variabile
                        quantit&agrave; di <i>vitae</i> (vedi voce di glossario).
                    </li>
                    <li>
                        <b>Fratelli</b>: altro termine utilizzato per riferirsi ai vampiri, il pi&ugrave; utilizzato,
                        almeno all'interno della Camarilla.
                    </li>
                    <li>
                        <b>Masquerade</b>: il nome di una delle sei Tradizioni, o regole fondamentali, della Camarilla.
                        La regola &egrave; molto semplice, nella sua applicazione diretta: nessun vampiro deve
                        manifestare la sua natura soprannaturale agli umani.
                    </li>
                    <li>
                        <b>Sangue Debole</b>: sono i vampiri la cui generazione &egrave; troppo bassa per manifestare
                        appieno le caratteristiche tipiche del vampirismo, nel bene e nel male. Questo vuol dire che,
                        nonostante debbano incorrere in numerose difficolt&agrave; per poter anche solo simulare
                        i poteri dei cainiti (la loro Alchimia del Sangue), non soffrono i raggi del Sole come i Fratelli
                        di generazione superiore. Sono stati, e sono tutt'ora, oggetto di scherno o di attiva
                        persecuzione da parte dei cainiti, in quanto ritenuti segno della fine dei tempi della Gehenna.
                    </li>
                    <li>
                        <b>Sabbat</b>: per secoli, sicuramente a partire dalla scoperta e successiva colonizzazione
                        del Nuovo Mondo, &egrave; stata la reale antagonista, nonch&eacute; spina nel fianco della
                        Camarilla. Basata su una serie di consuetudini volte a rafforzare (o depennare uccidendo)
                        i cainiti che ne facevano parte, ha nel 2005 intrapreso la Guerra della Gehenna contro gli
                        Antidiluviani e i Matusalemme, per liberarsi dalle catene del sangue che li tenevano
                        a loro imprigionati.
                    </li>
                    <li>
                        <b>Seconda Inquisizione</b>: a seguito di un piano molto ottimista della Camarilla fallito
                        miseramente (o riuscito troppo bene, dipendendo dal punto di vista), diverse organizzazioni
                        governative, ed alcuni servizi segreti, sono entrati a conoscenza dell'esistenza dei cainiti.
                        L'attacco che ha scosso maggiormente la comunit&agrave; cainita, e che l'ha costretta ad un
                        ritorno graduale a forme di comunicazione e di spostamento quasi medievali, &egrave; stato
                        l'attacco mascherato da attentato terroristico al quartier generale a Vienna del clan Tremere,
                        che ha di fatto azzerato gli alti ranghi del clan, il Concilio dei Sette. &Egrave; correntemente
                        il pi&ugrave; grande pericolo per la non-vita cainita.
                    </li>
                    <li>
                        <b>Vitae</b>: sostanza soprannaturale sublimata a partire dal sangue dei mortali, dalla fisiologia
                        dei cainiti. In parole povere, quando i vampiri suggono il sangue dei mortali per cibarsi,
                        trasformano il sangue in una sostanza soprannaturale in grado di sostenere i loro corpi non morti,
                        e di dare sostanza ai poteri che i cainiti esercitano, le Discipline.
                    </li>
                </ul>
            </Typography>

            <Typography paragraph>
                <h2>
                    V5
                </h2>
            </Typography>

            <Typography paragraph>
                Cominceremo col riassumere cosa considereremo dell'ambientazione a livello globale introdotta nell'ultima
                versione dei manuali. Vi invitiamo comunque a leggere i manuali rilasciati dalla White Wolf&trade;.
                Nella sezione <b>Credits</b> troverete tutti i link relativi. Quanto segue non prentede essere un riassunto
                di quanto descritto nei manuali citati, ma sar&agrave; il punto di partenza dell'ambientazione di
                Buenos Aires by Night.

                <ul>
                    <li style={liStyle}>
                        Il <i>Beckoning</i>, la chiamata degli Anziani di tutto il mondo a partecipare alla Guerra della
                        Gehenna iniziata dal Sabbat circa nella met&agrave; del primo decennio di questo secolo, &egrave;
                        avvenuta. Questo vuol dire che l'ambientazione non prevede il gioco Sabbat (non ancora almeno).
                        Questo vuole anche dire che il gioco politico della Camarilla &egrave; reso pi&ugrave; interessante
                        dal fatto che non ci sono pi&ugrave; Anziani arroccati in posizioni di potere prima inaccessibili.
                    </li>

                    <li style={liStyle}>
                        Come conseguenza, gli Anarchici hanno trovato maggiore spazio politico
                        all'interno della societ&agrave; cainita. Sono loro, nelle Notti Moderne, i veri antagonisti
                        e la vera alternativa al potere della Camarilla, soprattutto dopo la defezione del clan Brujah.
                        I rapporti con la Camarilla, comunque, non soffrono della stessa natura antagonistica che la Setta
                        sperimentava col Sabbat nel ventesimo secolo, anche se conti aperti rimangono, come la defezione
                        di Theo Bell, il famoso Brujah che ha ucciso Haderstaadt, il <i>deus ex machina</i> dietro la
                        creazione della Camarilla, e probabilmente anche il suo infante, Jan Pieterzsoon.
                    </li>

                    <li style={liStyle}>
                        La Seconda Inquisizione, miscuglio di servizi segreti vaticani, Societ&agrave; di Leopoldo,
                        ed altre organizzazioni governative statali e interstatali, ha colpito fortemente la societ&agrave;
                        cainita e minato la sua sicurezza nella dominazione dei mortali. Dopo il colpo inferto al
                        clan Tremere con la distruzione della Chantry viennese, Londra &egrave; stata purgata della
                        presenza cainita, Berlino e altre citt&agrave; europee stanno subendo la stessa sorte. Tra
                        questa minaccia e il <i>Beckoning</i>, il Richiamo soprannaturale subito da molti degli Anziani
                        (dalla nona generazione fino ai Matusalemme di quarta generazione), la Camarilla &egrave;
                        rimasta doppiamente sguarnita.
                    </li>

                    <li style={liStyle}>
                        La temporanea sparizione del Sabbat nella Societ&agrave; dei Fratelli, il <i>Beckoning</i> e la
                        persecuzione della Seconda Inquisizione hanno stravolto la geografia politica del potere cainita.
                        Ad approfittarne sono stati Neonati ed Ancillae, un tempo meri esecutori della volont&agrave;
                        dei loro sire, che hanno dovuto assumere le responsabilit&agrave; del potere. Poi, gli
                        Anarchici, che un tempo faticavano a ritagliarsi uno spazio al di fuori dello Stato Libero
                        organizzato in California, ed ora possono addirittura puntare ad assumere il controllo dei
                        domini europei.
                    </li>

                    <li style={liStyle}>
                        Una delle caratteristiche pi&ugrave; significative descritte nei nuovi manuali V5 riguarda
                        il sostanziale abbandono, da parte della gerarchia della Camarilla, di tutte le nuove
                        tecnologie, inclusi smartphone, ma anche personal computer, e in generale tutto ci&ograve;
                        che abbia una fotocamera ed una connessione ad internet. Questo dettaglio verr&agrave;
                        ritenuto significativo, e nel corso delle giocate, l'utilizzo di apparecchiatura elettronica
                        verr&agrave; considerato come potenziale infrazione delle "raccomandazioni" della Camarilla.
                    </li>

                    <li style={liStyle}>
                        In questo contesto, si immerge l'ambientazione della citt&agrave; di Buenos Aires, descritta in
                        seguito. Non verr&agrave; considerato, nello stilare l'ambientazione iniziale, nessun manuale
                        particolare, al di fuori dei seguenti:

                        <ul>
                            <li>Corebook v5</li>
                            <li>Chicago by Night</li>
                            <li>I Culti del Sangue</li>
                        </ul>

                        Considerare troppi manuali sarebbe controproducente, in quanto giocatori meno esperti verrebbero
                        penalizzati, e l'ambientazione verrebbe limitata dalla grande mole di informazioni.
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesEnvironment;
