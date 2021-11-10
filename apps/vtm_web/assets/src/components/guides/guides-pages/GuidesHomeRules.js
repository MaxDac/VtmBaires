// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import StyledTableRow from "../components/StyledTableRow";
import StyledTableCell from "../components/StyledTableCell";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";
import {Link} from "react-router-dom";
import {GuideRoutes} from "../GuidesMain";

const percentageCellStyle = {
    textAlign: "center"
};

const GuidesHomeRules = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Adattamenti e Differenze
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Lo scopo di questa sezione &egrave; quello di definire le cos&igrave; dette <b>Home Rules</b>,
                ovvero gli adattamenti e gli scostamenti alle regole indicate nei Manuli di riferimento, volte principalmente
                ad aiutare e rendere possibile lo svolgimento del gioco <b>Play by Chat</b>, che per sua natura
                segue logiche e dinamiche molto diverse dal gioco cartaceo, il vero <i>target</i> delle case editrici.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Accanto alle <b>Home Rules</b>, saranno elencate anche le principali differenze tra la Versione 5 dei manuali 
                e le vecchie versioni/regolamenti. La commistione &egrave; dovuta al fatto che molte delle Home Rules
                sono volte a limare proprio alcune nuove caratteristiche di regolamento che si discostano dalla V20.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <b>Nota</b>: alcune <i>Home Rules</i> che riguardano il regolamento sono state esposte nella sezione
                apposita della <Link to={GuideRoutes.mechanics}>guida</Link>.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Tiro di dado
                </h3>
            </Typography>

            <Typography paragraph>
                Il calcolo dei successi e la determinazione della Difficolt&agrave; sono stati ripensati nella versione 5 del 
                manuale in modo del tutto differente rispetto alle versioni precedenti. Chi ha giocato alle versioni 
                precedenti pu&ograve; trovare la guida completa al nuovo regolamento 
                nella <Link to={GuideRoutes.mechanics}>sezione apposita</Link>.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Fame
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Senza alcun dubbio, la gestione della <b>Fame</b> &egrave; la caratteristica pi&ugrave; importante introdotta
                nei nuovi manuali V5. La Fame rappresenta la tensione naturale del vampiro verso ci&ograve; che per lui
                &egrave; assieme una dipendenza, l'unica fonte di nutrimento e ci&ograve; che pi&ugrave; si avvicina
                all'amplesso per un non-morto: il Sangue. Il pensiero fisso di un Cainita per tutta la sua non-vita &egrave;
                quello di nutrirsi, ancora ed ancora, ed &egrave;, in profondit&agrave;, dietro le briciole di umanit&agrave;
                che gli sono rimaste dopo l'Abbraccio, l'unica cosa cosa che realmente importa al Cainita.
            </Typography>

            <Typography paragraph>
                <h5 style={titleStyle}>
                    Cambiamenti rispetto alle versioni precedenti
                </h5>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il concetto di Fame ha preso il posto dei punti sangue nei regolamenti precedenti. La principale differenza
                &egrave; che, invece di calibrare la Difficolt&agrave; dei tiri per resistere alla Frenesia quando i 
                Punti Sangue erano vicini allo 0, la Fame &egrave; &egrave; un concetto pervasivo, si manifesta
                in ogni singolo tiro di dado, oltre che dettare l'interpretazione del personaggio riguardo la sua 
                Bestia.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                L'impressione che se ne ha leggendo i Manuali &egrave; che gli autori abbiano modificato il regolamento
                per meglio trasmettere la loro idea della Bestia e dello stato di coscienza del vampiro, dopo aver
                raccolto sufficienti <i>feedback</i> dalla comunit&agrave; e dal tipo di gioco che veniva messo in scena,
                quindi, nello spirito della nuova manualistica, la Fame sar&agrave; trasposta quasi integralmente nel 
                regolamento di chat.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Sistema
                </h4>
            </Typography>
            
            <Typography paragraph sx={guideStyle}>
                Ogni Cainita ha a disposizione 5 punti di <b>Fame</b>. La situazione normale di un Cainita &egrave; quella
                di avere 1 punto di Fame, poich&eacute; l'unico modo per saziarsi completamente &egrave; quella di drenare
                tutto il sangue di un mortale, uccidendolo (e lasciando una potenziale infrazione alla <b>Masquerade</b>).
                Ogni volta che un Cainita vorr&agrave; usare una Disciplina che richiede il Sangue, vorr&agrave; curarsi o
                guarire ferite superficiali, dovr&agrave; verificare se la spesa aumenta la fame o meno. 
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il sistema &egrave; attualmente automatico: potrete comunicare al sistema che il vostro personaggio intende
                spendere Sangue dagli appositi controlli in chat. &Egrave; anche possibile tirare i dadi comunicando che 
                il personaggio ha intenzione di spendere sangue per aumentare gli Attributi. L'unica cosa che dovrete tener
                presente &egrave; che la probabilit&agrave; di aumentare la Fame del personaggio a fronte della spesa di 
                Sangue dipende dalla <b>Potenza del Sangue</b>: a Potenza del Sangue da 1 in poi, la probabilit&agrave; 
                &egrave; dimezzata. L'aumento di Attributi per un tiro invece ha una probabilit&agrave; del 50%, 
                per qualunque valore di Potenza del Sangue.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Probabilit&agrave; di aumentare la Fame (Home Rule)
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <Box sx={{padding: "10px"}}>
                    <TableContainer component={Paper} sx={{
                        width: "100%", 
                        margin: "0 auto" 
                    }}>
                        <Table aria-label="Difficoltà">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Potenza di Sangue</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Curare ferite superficiali</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Uso di Discipline</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Aumento Attributo</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Altre spese (parvenza di umanit&agrave;, ecc.)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        0 (Sangue Debole)
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        50%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        50%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        50%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        50%
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        1 (Neonato)
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        25%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        25%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        50%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        25%
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        2 (Ancillae)
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        25%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        25%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        50%
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        25%
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La Fame, poi, influenza qualsiasi tiro di dado. Anche in questo caso, in chat potrete trovare i controlli
                per tirare, che prenderanno automaticamente in considerazione il livello di Fame del personaggio,
                simuleranno il tiro di ogni singolo dado, e forniranno l'esito, secondo quanto descritto nei manuali. 
                L'esito di ogni tiro andr&agrave; interpretato in funzione del rapporto che il Cainita ha con la Bestia: 
                alti livelli di Autocontrollo o Risolutezza possono mantenere il Cainita perfettamente controllato anche con 
                livelli di  Fame elevati; in caso contrario, il Cainita potrebbe apparire ansioso, come un tossicodipendente 
                in crisi d'astinenza (quest'ultimo esempio, forse, &egrave; il pi&ugrave; calzante di tutti, per dare un'idea di 
                cos'&egrave; la Fame).
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Potenza del Sangue
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La Potenza del Sangue &egrave; un'altra caratteristica introdotta nel regolamento a partire dalla Versione 5.
                Questo Attributo indica la Forza che la Vitae del Cainita ha nel sostenere il personaggio, l'efficacia nel
                curare le ferite, aumentare gli Attributi ed usare le Discipline. La Potenza del Sangue &egrave; un Attributo
                che aumenta di pari passo con il tempo di attivit&agrave; del personaggio. In generale, da regolamento si 
                considera che un personaggio aumenta di un punto la sua Potenza di Sangue ogni 100 anni di attivit&agrave;. 
                Nell'ambientazione sar&agrave; possibile acquistare un punto di Potenza del Sangue con la spesa naturale di 10
                punti esperienza, fino ad arrivare ad un massimo di 2 punti. Di contro, un personaggio perde un punto di 
                Potenza del Sangue ogni 50 anni passati in torpore. 
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La Potenza del Sangue, per certi versi, sostituisce l'importanza che ha la <b>Generazione</b> di un personaggio:
                in altre parole, con i nuovi manuali, alcune caratteristiche del Sangue, come la quantit&agrave; di ferite
                che il personaggio potr&agrave; guarire per turno, e il numero di punti Attributo che potr&agrave; aumentare
                sempre per turno dipenderanno ora dalla Potenza del Sangue. La Generazione continuer&agrave; comunque ad essere
                importante, in quanto determina il massimo livello di Potenza del Sangue raggiungibile da un personaggio,
                e rimane indispensabile per contrastare gli effetti della Disciplina di <b>Dominazione</b>.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Un'altra caratteristica della Potenza del Sangue &egrave; anche l'aggravarsi della difficolt&agrave; nel cacciare,
                e la gravit&agrave; del Difetto di Clan, cos&igrave; come della sua Compulsione. Vi invitiamo a rileggere, se 
                non l'avete ancora fatto, la lista dei clan di Vampiri: la Masquerade&trade; nella 
                <Link to={GuideRoutes.clans}>sezione della guida</Link>.<br />
                I vampiri che non presentano nessuna caratteristica non solo di clan, ma addirittura vampirica, i <b>Sangue Debole</b>,
                non avranno Potenza del Sangue, e non potranno acquistarne. Il lato positivo di questo &egrave; che non soffriranno
                nemmeno delle maledizioni dei cainiti normali: la luce solare infligger&agrave; danni superficiali, cos&igrave; come il 
                Fuoco, ma subiranno i danni come normali esseri umani, non avendo la resistenza dei Cainiti.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Ogni personaggio Cainita partir&agrave; da un valore di Potenza di Sangue a 1, mentre i Sangue Debole partiranno dal 
                valore 0. Nella tabella di seguito, saranno esposte le caratteristiche dei vari livelli di Potenza del Sangue.

                <Box sx={{padding: "10px"}}>
                    <TableContainer component={Paper} sx={{
                        width: "100%", 
                        margin: "0 auto" 
                    }}>
                        <Table aria-label="Difficoltà">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Potenza di Sangue</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Aumento di Attributo per turno</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Danni superficiali curabili per turno</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Dadi aggiuntivi per Disciplina</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Severit&agrave; della Maledizione</StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>Penalit&agrave; della Caccia</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        0 (Sangue Debole)
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        Impossibile
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        0
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        0
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        Nessuna
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        1 (Neonato)
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        0
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        Nessuna
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        2 (Ancillae)
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        2
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell sx={percentageCellStyle}>
                                        Animali e sacche di sangue soddisfano per la met&agrave;
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Risonanza
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Altra aggiunta della Versione 5 rispetto alle edizioni precedenti, la <b>Risonanza</b> &egrave; una caratteristica
                emotiva del Sangue di cui il vampiro si nutre. Il principio &egrave; semplice: in base alle emozioni della preda,
                il Sangue di cui il vampiro si nutre avr&agrave; una "risonanza" particolare. La risonanza emotiva della vittima
                avr&agrave; anche un'intensit&agrave; particolare, e potr&agrave; influenzare, a livelli alti, anche l'umore
                del Cainita per la Notte.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Una delle caratteristiche pi&ugrave; importanti della Caccia &egrave; che pu&ograve; influenzare anche l'efficacia
                delle Discipline. A discrezione del Narratore, una particolare Disciplina potr&agrave; avere una Difficolt&agrave; 
                minore, o potranno essere aggiunti dadi all'ammontare. &Egrave; anche vero il contrario: una particolare risonanza
                potr&agrave;, sempre a discrezione del Narratore, svantaggiare l'utilizzo di altre Discipline.<br />
                Questo tipo di valutazioni saranno appannaggio del Narratore e <b>in situazioni di gioco libero non sar&agrave; 
                possibile attribuire diminuzioni di Difficolt&agrave; o all'ammontare</b>. Potr&agrave; essere comunque interpretato 
                l'umore assorbito col Sangue.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Sistema (Home Rule)
                </h4>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La Caccia &egrave; un sistema automatico integrato nel sito, disponibile tra le opzioni nel menu a sinistra. Sar&agrave;
                possibile far cacciare il proprio personaggio una volta al giorno. La <b>Risonanza</b> e la sua intensit&agrave; saranno
                determinate automaticamente, e compariranno come notifica sulla chat e sulla scheda, nella sezione <b>Stats</b>.<br />
                Le intensit&agrave; possibili saranno le seguenti:

                <ul>
                    <li style={liStyle}>Trascurabile</li>
                    <li style={liStyle}>Fugace</li>
                    <li style={liStyle}>Intensa</li>
                    <li style={liStyle}>Acuta (Discrasia)</li>
                </ul>

                La tabella di seguito presenta i vari effetti delle varie Risonanze, e la loro influenza sulle Discipline.
            </Typography>

            <Typography paragraph>
                <h5 style={titleStyle}>
                    Tipi di Risonanze e Discipline influenzate
                </h5>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <Box sx={{padding: "10px"}}>
                    <TableContainer component={Paper} sx={{
                        width: "60%", 
                        margin: "0 auto" 
                    }}>
                        <Table aria-label="Difficoltà">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Risonanza</StyledTableCell>
                                    <StyledTableCell>Discipline</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Collerica
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Potenza, Velocit&agrave;
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Malinconica
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Oscurazione, Robustezza
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Distaccata
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Auspex, Dominazione, Oblivion
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Sanguigna
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Ascendente, Blood Sorcery
                                    </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Sangue Animale
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Animalit&agrave;, Proteide
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Typography>
        </>
    );
}

export default GuidesHomeRules;
