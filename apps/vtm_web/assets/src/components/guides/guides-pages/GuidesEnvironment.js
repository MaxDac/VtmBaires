// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";

type Props = {

}

const GuidesEnvironment = (props: Props): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Ambientazione
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Con questa sezione, comincia la parte di regolamento dedicata alle inforamzioni in gioco. Verr&agrave;
                spiegata la storia, e il suo intreccio con quella descritta nei manuali di Vampiri: la Masquerade&trade; v5,
                e verr&agrave; anche scritto quanto della pi&ugrave; aggioranta manualistica sar&agrave; considerato,
                e cosa no.
            </Typography>

            <Typography paragraph>
                <h2 style={titleStyle}>
                    Vampiri: la Masquerade&trade; - La storia
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Prima di riassumere i cambiamenti che la versione 5 dei manuali hanno introdotto, cercheremo di condensare
                in poche parole la conoscenza contenuta nei manuali precedenti, che considereremo conoscenza propedeutica
                se volete giocare un personaggio cainita.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il gioco &egrave; incentrato sulle vicende dei cainiti, o Fratelli, una razza immortale generata, almeno stando
                alle loro leggende, dal Peccato di Caino (da qui la parola cainiti), dal primo omicidio della storia. Da allora, 
                Caino &egrave; costretto a vagare per la Terra, solo di Notte, dato che i raggi del Sole avrebbero bruciato le sue carni,
                n&eacute; vivo n&eacute; morto, cibandosi della sola cosa che lo pu&ograve; sostenere: il sangue degli esseri umani.<br />
                Sempre secondo la leggenda, nel suo vagabondare Caino incontr&ograve; Lilith, la prima moglie di Adamo, che lo 
                prese sotto la sua protezione e lo mise a conoscenza del suo sapere oscuro. Gli insegn&ograve; che il sangue di 
                cui si cibava acquisiva un'energia ed un potere oscuri, la sua fisiologia soprannaturale ne distillava la <i>vitae</i>, 
                che gli garantiva poteri fuori dalla portata degli umani. Possedeva forza e velocit&agrave; soprannaturale, la capacit&agrave;
                di comandare e di ammaliare con la sola forza del pensiero gli umani, ma soprattutto di perpetuare la sua specie tramite
                il rituale che sarebbe poi stato chiamato l'<b>Abbraccio</b>.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Caino, fin&iacute; per allontanare Lilith e, preda della solitudine e della disperazione, commise il secondo peccato:
                Abbracci&ograve; tre umani, rendendoli cainiti di Seconda Generazione. Fece costruire anche una citt&agrave;, la pi&ugrave;
                grande, si dice, dell'antichit&agrave;, ancora oggetto di studi archeologici da parte di rispettati cainiti, la citt&agrave;
                di <b>Enoch</b>, che per&ograve; venne spazzata via dalle acque del Diluvio.<br />
                Una seconda citt&grave; fu eretta, e i suoi Infanti Abbracciarono altri tredici umani, la Terza Generazione. Questi, per&ograve;,
                diedero origine alla Jihad, alla guerra che imperversa e flagella cainiti, e i loro servi mortali, da tutta la storia registrata.
                Sire contro Infante, clan contro clan, da quando la Terza Generazione uccise la Seconda per prenderne il potere, tutti i cainiti
                sono vittime inconsapevole di questa grande guerra, in cui gli Anziani influenzano ed orchestrano dall'ombra le mosse dei Neonati,
                e i Neonati cercano di prendere il posto dei loro Sire, ed anche cainiti di clan diversi si scontrano ed ordiscono l'uno 
                contro l'altro, mettendo in mezzo vittime mortali.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Caino, presagendo l'orrore che ne sarebbe derivato, abbandon&ograve; la citt&agrave; e gli Infanti dei suoi Infanti al loro destino,
                sparendo di fatto dalla storia registrata. Da allora, i tredici cainiti sopravvissuti a loro volta Abbracciarono Infanti, dando
                origine a tredici clan differenti, cainiti con alcune caratteristiche (e maledizioni) in comune che li differenziavano dai cainiti
                degli altri clan, e ne influenzavano il comportamento e il rapporto con gli umani.<br />
                E cos&igrave;, ad esempio, i cainiti del clan Nosferatu persero il loro aspetto umano, divenendo mostri orribili; i Lasombra videro
                la loro immagine in ogni specchio distorta, e cos&igrave; via. Assieme alla maledizione caratteristica del clan, grazie alla 
                condivisione della Vitae col proprio Sire, gli Infanti acquisivano anche la conoscenza delle Discipline di clan, i poteri
                soprannaturali dei cainiti.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Da allora, la storia dei cainiti s'&egrave; intessuta a quella degli umani, sempre rimanendo nell'ombra ed orchestrando le politiche
                degli umani cos&igrave; come quelle dei vari clan. Numerose furono le guerre, le lotte intestine e i confronti tra fazioni differenti
                di cainiti.<br />
                Le guerre puniche furono guidate da Ventrue e Malkavian romani per rompere e debellare l'idillio dei filosofi Brujah con gli 
                umani, che a Cartagine riuscivano a vivere in armonia. Ci&ograve; che rimase del sogno dei Brujah fu cenere, e il sale che i
                Romani sparsero su Cartagine per non far nascere (o uscire) pi&ugrave; nulla da quella terra.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Dopo l'anno Mille, le trame degli Antidiluviani si ritorsero apparentemente contro i loro perpetratori: quattro dei tredici
                Antidiluviani, i mitici nipoti di Caino, furono vittime della Diablerie dei loro Infanti:

                <ul>
                    <li style={liStyle}>
                        Un mago mortale, leader di una setta ermetica, <b>Tremere</b>, dopo aver usato in vari modi la <i>vitae</i> di altri 
                        cainiti, individu&ograve; il corpo indifeso dell'Antidiluviano del clan Salubri, <b>Saulot</b>, e riusc&igrave; a
                        commettere Diablerie su di lui, creando di fatto quello che fu da allora uno dei clan pi&ugrave; potenti ed organzzati:
                        il clan Tremere. Furono addirittura in grado di combattere Tzimisce e altri cainiti su pi&ugrave; fronti, dopo la loro 
                        creazione.
                    </li>

                    <li style={liStyle}>
                        L'Antidiluviano del clan dei Cappadoci per&igrave; a sua volta sotto le zanne di uno dei suoi Infanti, <b>Augustus Giovanni</b>.
                        Anche il nuovo leader del clan cre&ograve; il clan <b>Giovanni</b>, che da allora riusc&igrave; a sopravvivere grazie 
                        alle ampie conoscenze Necromantiche.
                    </li>

                    <li style={liStyle}>
                        Due Diablerie di Antidiluviani diedero il via, poi ad una serie di eventi che disegnarono la storia dei cainiti fino ai
                        primi anni 2000: la diablerie, a distanza di pochi anni, dell'Antidiluviano <b>Tzimisce</b> e di quello <b>Lasombra</b>,
                        rispettivamente per mano di due cainiti del clan, <b>Lugoj lo Spezza Sangue</b> e <b>Gratiano de Veronesi</b>. Gli Tzimisce 
                        che si ribellarono ai loro Anziani, dando il via agli eventi che portarono alla Diablerie dell'Antidiluviano, riuscirono 
                        dopo aver perfezionato un rituale in grado di spezzare i legami di sangue con i Sire, dando origine alla rivolta anarchica,
                        che in seguito si sarebbe condensata nella setta del <b>Sabbat</b>.
                    </li>
                </ul>

                Per far fronte a questi avvenimenti, ed all'avanzata della Prima Inquisizione umana, che stava decimando la popolazione cainita dal 1400, 
                gli altri clan, guidati dai Ventrue, crearono la <b>Camarilla</b>. Proposero un accordo di pace ad <b>Anarchici</b> ed <b>Assamiti</b>,
                le tre fazioni in guerra in quel periodo, durante la famosa <b>Convenzione di Thorns</b>, e cementarono un'organizzazione che resiste
                fino ai giorni nostri, alla quale i ribelli che rifiutarono di aderirvi opposero quella del Sabbat.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Sabbat e Camarilla si confrontarono su pi&ugrave; fronti da allora, la Camarilla cercando di stabilire <b>Domini</b> e il Sabbat 
                opponendo le sue <b>Diocesi</b>, almeno fino al volgere del nuovo Millennio, quando l'ordine durato per pi&ugrave; di cinque secoli
                venne irrimediabilmente sconvolto dagli eventi descritti nella...
            </Typography>

            <Typography paragraph>
                <h2 style={titleStyle}>
                    V5
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
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
                        di Theo Bell, il famoso Brujah che ha ucciso Hardestadt, il <i>deus ex machina</i> dietro la
                        creazione della Camarilla, e probabilmente anche il suo infante, Jan Pieterszoon.
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
