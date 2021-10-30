// @flow

import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { guideStyle, titleStyle } from "../GuidesStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
  
const GuidesMechanics = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Meccaniche di Gioco V5
                </h1>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Vampiri: la Masquerade&trade; &egrave; un gioco di ruolo horror, basato principalmente sull'interpretazione
                dei personaggi. Questo vuol dire che, in una giocata, il tiro del dado dovrebbe essere secondario rispetto
                allo svolgimento della storia narrata tra i personaggi. Specialmente nei confronti tra personaggi e nell'utilizzo 
                delle loro Discipline, per&ograve;, &egrave; necessario definire le regole di ingaggio, e chiarire come
                procedere per determinare ad esempio il successo o il fallimento di una Disciplina, o la quantit&agrave; di danni
                sofferta da un personaggio in un combattimento.<br />
                Questa guida sar&agrave; il pi&ugrave; sintetica possibile, una specie di <i>cheat-sheet</i> sul combattimento e
                su come considerare gli effetti che i personaggi possono sperimentare in gioco.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Tiro di dado
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Un tiro di dado consiste nel tirare un numero di dadi a 10 facce (da qui in poi, <b>d10</b>),
                contare il numero di dadi il cui punteggio &egrave; uguale o supera il 6, per determinare i successi. Il tiro di dadi avr&agrave;
                una difficolt&agrave; definita dal regolamento, e il tiro si considera superato se il numero di successi &egrave; uguale o 
                maggiore della Difficolt&agrave;. L'ammontare, ovvero il numero di dadi da tirare, molto spesso corrisponde alla
                somma dei valori di un Attributo e di una Abilit&agrave;.<br />
                Per esempio, per determinare se un personaggio riesce a saltare un ostacolo, il Narratore potr&agrave; chiedere al 
                personaggio di tirare Forza + Atletica a Difficolt&agrave; 2. Se il personaggio ha Forza 2 e Atletica 3, tirer&agrave; 
                5 dadi. Supponendo che il risultato sia 1 6 7 2 4, il tiro ha totalizzato 2 success (6 e 7), quindi il tiro, essendo a
                Difficolt&agrave; 2, riesce.<br />
                Il tiro di dadi dovr&agrave; anche tenere conto del punteggio di Fame, ma questo aspetto &egrave; contemplato nel sistema
                di tiro automatico disponibile in chat, cliccando sul tasto con l'icona di dado.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Tiro contrastato
                </h4>
            </Typography>

            <Typography paragraph style={guideStyle}>
                In un tiro contrastato, due personaggi tirano due ammontare diversi. Se un personaggio sta cercando di attaccare e l'altro
                sta cercando di difendersi, l'attacco ha successo se il numero di successi dell'attaccante &egrave; <b>maggiore</b> rispetto
                a quelli del difensore (non uguale, maggiore). Se invece si tratta di un confronto, un pareggio significa che i due personaggi
                hanno totalizzate un... pareggio, appunto.
            </Typography>

            <hr />

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Combattimento
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Le regole del combattimento evolveranno in base alle esigenze del gioco via chat, che pu&ograve; anche dover avere luogo
                senza l'ausilio di un Narratore. Per questo motivo, le regole potrebbero differire da quanto espresso dal <b>Corebook</b>.
                Il combattimento si svolge in turni. Ogni turno, i giocatori dovranno dichiarare uno dopo l'altro cosa faranno, in ordine, 
                e poi in ordine inverso si dovranno <b>risolvere</b> le azioni, ovvero si dovranno tirare i dadi e determinare l'esito di 
                ogni azione. L'ordine di dichiarazione e risoluzione delle azioni viene determinato dalla <b>Iniziativa</b>.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Iniziativa
                </h4>
            </Typography>

            <Typography paragraph style={guideStyle}>
                L'iniziativa, come detto, determina l'ordine di dichiarazione delle azioni, e la risoluzione. Il punteggio di iniziativa
                si determina in questo modo:

                <ul>
                    <li>Combattimento con pi&ugrave; di due partecipanti: Autocontrollo + Allerta</li>
                    <li>Combattimento con due duellanti: (Autocontrollo o Destrezza, la pi&ugrave; alta) + Allerta</li>
                    <li>Combattimento formale tra due duellanti: Fermezza + Allerta</li>
                </ul>

                Nel caso in cui due o pi&ugrave; personaggi possiedano un punteggio uguale di iniziativa, dovranno tirare un dado: chi 
                avr&agrave; il dado pi&ugrave; alto avr&agrave; vinto l'iniziativa sull'altro.<br />
                Il <b>primo</b> a dichiarare sar&agrave; quello con punteggio di iniziativa pi&ugrave; <b>basso</b>, via via fino all'ultimo, 
                quello con punteggio di iniziativa pi&ugrave; alto. In seguito alla dichiarazione di tutti i personaggi, comincer&agrave;
                la risoluzione, e partir&agrave; in senso inverso rispetto alla dichiarazione, a partire dal personaggio con punteggio di
                iniziativa pi&ugrave; <b>alto</b>.<br />
                Il cambio di ordine ha questo senso: il personaggio con iniziativa pi&ugrave; alta potr&agrave; percepire ci&ograve; che gli 
                altri avranno intenzione di fare, ma agir&agrave; per primo, e quindi gli effetti della sua azione avranno luogo <b>prima</b>
                di quelli degli altri personaggi.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Attacco a sorpresa
                </h4>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Un attacco a sorpresa esula dal regolamento di Iniziativa, almeno al primo turno. Per poter effettuare un attacco a sorpresa,
                il personaggio attaccante dovr&agrave; totalizzare pi&ugrave; successi in un tiro di Destrezza + Furtivit&agrave; rispetto al tiro
                di Prontezza + Allerta del difensore.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Manovre
                </h4>
            </Typography>

            <Typography paragraph style={guideStyle}>
                In combattimento, il confronto tra due personaggi potr&agrave; essere di diversi tipi:

                <Box sx={{padding: "10px"}}>
                    <TableContainer component={Paper} sx={{
                        width: "100%", 
                        margin: "0 auto" 
                    }}>
                        <Table aria-label="Tipi di copertura">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Tipo</StyledTableCell>
                                    <StyledTableCell>Dadi dell'attaccante</StyledTableCell>
                                    <StyledTableCell>Dadi del difensore</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Confronto diretto
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Forza + Rissa, Destrezza + Mischia (coltelli, armi leggere), Forza + Mischia (armi a due mani)
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Forza + Rissa, Destrezza + Mischia (coltelli, armi leggere), Forza + Mischia (armi a due mani)
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Confronto contro Schivata
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Forza + Rissa, Destrezza + Mischia (coltelli, armi leggere), Forza + Mischia (armi a due mani)
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Destrezza + Atletica
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Confronto con armi da fuoco
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Destrezza + Armi da fuoco (o Atletica per armi da lancio) + Modificatore di copertura
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Destrezza + Armi da fuoco (o Atletica per armi da lancio) + Modificatore di copertura
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Arma a distanza contro Schivata
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Destrezza + Armi da fuoco (o Atletica per armi da lancio) + Modificatore di copertura
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Destrezza + Atletica + Modificatore di copertura
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Modificatore di copertura
                </h4>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Nel caso di confronto con armi da fuoco, la copertura &egrave; importante: se un personaggio ha un'ottima copertura, sar&agrave;
                in grado di limitare notevolmente i danni che pu&ograve; subire. I modificatori cambieranno l'ammontare, cio&egrave; il numero di
                dadi, che il personaggio pu&ograve; tirare.
            </Typography>

            <Typography paragraph>
                <TableContainer component={Paper} sx={{ width: 400, margin: "0 auto" }}>
                    <Table aria-label="Tipi di copertura">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Copertura</StyledTableCell>
                                <StyledTableCell>Modificatore dell'ammontare</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Nessuna copertura
                                </StyledTableCell>
                                <StyledTableCell>-2</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Solo occultamento (un cespuglio, o un piccolo albero contro cartucce di fucile)
                                </StyledTableCell>
                                <StyledTableCell>-1</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Copertura robusta (angolo di un edificio di cemento, una macchina)
                                </StyledTableCell>
                                <StyledTableCell>0</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Trincea (sacche di sabbia, bunker militare)
                                </StyledTableCell>
                                <StyledTableCell>+1</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Feritoia protetta
                                </StyledTableCell>
                                <StyledTableCell>+2</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Calcolo dei danni
                </h4>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Potr&agrave; provocare danni all'avversario solamente chi ha attaccato. Se qualcuno ha schivato, non potr&agrave;
                ovviamente provocare danni. Il numero dei danni &egrave; pari al numero di successi in pi&ugrave; che l'attaccante
                ha totalizzato contro il difensore. Se ad esempio l'attaccante ha ottenuto <b>6 successi</b> in un tiro di
                Rissa + Mischia contro <b>4 successi</b> di Destrezza + Schivare del difensore, i danni corrisponderanno a 2 
                superficiali.<br />
                In caso di confronto tra due combattenti, chi ha ottenuto pi&ugrave; successi infligge danni pari al numero di
                successi supplementari, e chi ha perso non infligge danni.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Se il personaggio avr&agrave; successo nel tiro contrastato, ai danni che gi&agrave; ha ottenuto sottraendo i
                successi dell'avversario potr&agrave; aggiungere i danni inferti con l'arma utilizzata. In assenza di un 
                regolamento per le armi ancora disponibile, i personaggi potranno considerare il loro valore di <b>Risorse</b> 
                per determinare il danno dell'arma che posseggono, secondo lo schema proposto di seguito.
            </Typography>

            <Typography paragraph>
                <TableContainer component={Paper} sx={{ width: "100%", margin: "0 auto" }}>
                    <Table aria-label="Tipi di copertura">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Risorse</StyledTableCell>
                                <StyledTableCell>Danno massimo armi da fuoco</StyledTableCell>
                                <StyledTableCell>Danno massimo armi da mischia</StyledTableCell>
                                <StyledTableCell>Danno massimo armi da rissa</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    0
                                </StyledTableCell>
                                <StyledTableCell>Nessuna arma</StyledTableCell>
                                <StyledTableCell>Nessuna arma</StyledTableCell>
                                <StyledTableCell>Nessuna arma</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    1
                                </StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    2
                                </StyledTableCell>
                                <StyledTableCell>2</StyledTableCell>
                                <StyledTableCell>2</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    3
                                </StyledTableCell>
                                <StyledTableCell>2</StyledTableCell>
                                <StyledTableCell>2</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    4
                                </StyledTableCell>
                                <StyledTableCell>3</StyledTableCell>
                                <StyledTableCell>3</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    5
                                </StyledTableCell>
                                <StyledTableCell>3</StyledTableCell>
                                <StyledTableCell>3</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Affinch&egrave; l'arma venga considerata, il personaggio all'inizio della giocata dovr&agrave; dichiarare
                di possederla nell'azione iniziale, altrimenti non gli sar&agrave; possibile utilizzarla nel corso del
                combattimento. Ricordiamo che non sar&agrave; possibile usare le Abilit&agrave; di Mischia e Armi da Fuoco
                senza possedere un'arma.<br />
                Se il personaggio acquisisce l'arma in gioco, un Narratore aggiorner&agrave; le note del personaggio, 
                aggiungendo l'arma che, da quel momento, potr&agrave; essere dichiarata normalmente all'inizio dell'azione.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Possono essere arrecati due tipi di danni differenti:

                <ul>
                    <li>
                        <b>Danni superficiali</b>: gli umani subiranno questi danni normalmente, mentre i vampiri dimezzeranno 
                        questo tipo di danni, arrotondando per difetto, prima di applicarli al loro totalizzatore di Salute.
                        <b>Danni aggravati</b>: per gli umani, questi tipi di danno sono potenzialmente fatali, cos&igrave; come
                        per i vampiri, che non dimezzeranno i danni in questo caso.
                    </li>
                </ul>

                Se il personaggio ha riempito tutte le caselle di Salute con danni superficiali, i danni che subir&agrave;  
                successivamente dovranno essere considerati come <b>Aggravati</b>. Se ad esempio un personaggio ha Costituzione 3,
                e quindi possiede 6 caselle di Salute, dopo il sesto danno Superficiale, dovr&agrave; cominciare ad assegnare danni 
                Aggravati partendo da 1. Se il personaggio con Salute 6 subisce quindi un totale di 9 danni Superficiali, il suo 
                contatore di Salute segner&agrave; 3 danni di tipi Aggravato e 3 di tipo Superficiale. I danni aggravati si 
                aggiungeranno direttamente al conteggio degli Aggravati, quindi se, oltre ai 9 danni superficiali, subir&agrave; 
                anche 2 danni Aggravati, il suo totalizzatore segner&agrave; 5 danni Aggravati e 1 Superficiale.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Se un vampiro riempir&agrave; tutte le caselle di Salute con danni Aggravati, entrer&agrave; automaticamente in
                torpore. Se subir&agrave; altri danni aggravati (non Superificiali) in questo stato, raggiunger&agrave; la 
                Morte Ultima.<br />
                Un essere umano che comincia a subire danni Aggravati, invece, dovr&agrave; essere curato immediatamente, o
                potrebbe morire in seguito alle ferite riportate. Se riempie le sue caselle con danni Aggravati, morir&agrave;.
            </Typography>

            <hr />

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Sangue e Fame
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                I cainiti non avranno pi&ugrave; Punti Sangue a disposizione, ma un punteggio di <b>Fame</b>&nbsp;
                variabile da 1 a 5. Ogni volta che un cainita vorr&agrave; spendere sangue, dovr&agrave;
                tirare un dado d10. Se otterr&agrave; pi&ugrave; di 6, non subir&agrave; nessuna penalit&agrave;.
                Un fallimento indicher&agrave; l'aumento della <b>Fame</b>. A livello 5, il cainita sar&agrave;
                da considerare sulla soglia della Frenesia, e dovr&agrave; cibarsi immediatamente per non cadervi.<br />
                La <b>Fame</b> avr&agrave; un riscontro anche sul risultato dei dadi. Per maggior informazioni
                vi invitiamo a leggere il <b>Core Book</b> della versione 5. Comunque, i risultati dei dadi 
                nel sito considereranno gi&agrave; il punteggio di <b>Fame</b> e le sue conseguenze.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Umanit&agrave; e Bestia
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Ogni cainita, dal momento dell'Abbraccio, eredita, assieme ai poteri e alle maledizioni del Sangue,
                anche la <b>Bestia</b>. La Bestia &egrave; un'entit&agrave; di vita propria che si muove nei meandri
                della mente del cainita, spingendolo sempre agli atti pi&ugrave; nefandi e orribili in nome di ci&ograve;
                che per i cainiti &egrave; assieme nutrimento, droga e elisir di vita eterna: il <b>Sangue</b>.
                Oltre alla Fame, descritta precedentemente, la Bestia si adopera per distruggere i frammenti di 
                umanit&agrave; che il cainita ancora segue nella non vita, costringendolo a contravvenire alle
                <b>Convinzioni</b>, da definire in fase di creazione del personaggio.
            </Typography>

            <Typography paragraph style={guideStyle}>
                La discesa nella spirale della Bestia &egrave; una parte estremamente importante di Vampiri: la Masquerade&trade;,
                in quanto rappresenta il centro dell'esistenza del cainita: la resistenza alla Bestia per non cederle il
                potere e abdicarle il proprio libero arbitrio.<br />
                Ogni personaggi parte con un punteggio di Umanit&agrave; nella propria scheda. Il punteggio di umanit&agrave;
                determina quanto vicino il vampiro rimane alle sue convinzioni mortali. Ogni volta che il vampiro
                contravviene ad una di queste convinzioni, riceve una <b>Macchia</b> alla sua umanit&agrave;. Alla fine
                di una scena, il giocatore dovr&agrave; tirare un numero di dadi pari a 10 - Umanit&agrave; - Macchie, per un
                minimo di 1 dado. Ad esempio, se il personaggio ha umanit&agrave; 6, ed ha ricevuto 2 Macchine in una giocata,
                potr&agrave; tirare 2 dadi, mentre invece se il personaggio ha umanit&agrave; 8, e ha ricevuto 2 Macchie, potr&agrave; 
                comunque tirare un dado.<br />
                Se il personaggio totalizza almeno 1 successo (un dado con risultato maggiore o uguale a 6), riesce a pentirsi,
                a sentire rimorso per le sue azioni, e la sua Umanit&agrave; &egrave; salva. Al contrario, se non riesce a
                totalizzare nessun successo, considerer&agrave; le azioni fatte come giustificabili, per qualsasi ragione, e
                perder&agrave; immediatamente un punto di Umanit&agrave;.
            </Typography>

            <Typography paragraph style={guideStyle}>
                La completa perdita di Umanit&agrave;, cio&egrave; arrivare ad umanit&agrave; 0, significa che la Bestia prende
                completamente, totalmente e irrimediabilmente il controllo del cainita, il personaggio non sar&agrave; pi&ugrave;
                giocaile e passer&agrave; ad essere interpretato dal Narratore.
            </Typography>
        </>
    );
}

export default GuidesMechanics;
