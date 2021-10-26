// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { GuideRoutes } from "../GuidesMain";
import { guideStyle, storyStyle, titleStyle } from "../GuidesStyles";

type Props = {

}

const GuidesEnvironmentSects = (props: Props): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Clan e Sette
                </h1>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                La musica del locale era forse troppo alta, considerando che avevano da poco
                aperto e le persone stavano ancora ordinando apertivi. Ma a lui piaceva cos&igrave;.
                Gli altri del branco lo sapevano, e non fiatavano.<br />
                L'impazienza era evidentemente dettata dal fatto che la <b>Serpe</b> era in ritardo.<br />
                Nessuno aveva idea di come chiamarli. <b>Setiti</b>, <b>Seguaci di Set</b>, <b>Ministri</b>. 
                A nessuno era importato poi molto, non erano mai stati in lizza per entrare a far parte del
                club.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Il gruppo si rianim&ograve; quando all'ingresso vennero fermati dai buttafuori
                tre individui. La radiolina sul tavolo gracchi&ograve;.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Sono tre, uno sembra uscito da un film, pelato e tatuato."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <b>Roc&iacute;o</b> prese la radio "Sono loro."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                La descrizione non gli rese giustizia, pens&ograve; il Ravnos. Opinione condivisa,
                a guardare le facce, dagli altri tre del branco. Nessuno si mosse, tutti 
                obbedivano ad una scena, ad una rappresentazione, dettagliatamente studiata
                dal <b>Rodrigo</b> per mostrare sicurezza dove non ce n'era alcuna.<br />
                I tre ospiti salirono le scale che conducevano al piano rialzato del locale
                illuminati dalle luci al neon della sala. Fu una volta illuminati dalle luci
                poste ad intervalli regolari, installate sul soffitto, che si mostrarono in 
                tutta la loro straneit&agrave;.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Voi dovete essere il grande <b>Rodrigo Manoukian</b>. Ho sentito parlare di
                voi quando ancora il Sabbat esisteva. Un peccato non avervi mai incrociato."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Siediti." La voce, ferma, non tradiva inquietudine, irritazione, nulla. Solo
                un leggero eco di fastidio. Il glabro ospite sedette in una delle sedie 
                di fronte al tavolino. Sul volto aveva stampato un sorriso troppo ampio,
                troppo accondiscendente per essere vero.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Fu il Ravnos a prendere parola ancora, i suoi del pack dietro di lui, una
                cortina protettiva sufficientemente minacciosa da allertare la Camarilla.
                "Sappiamo entrambi che non &egrave; stato per caso che non vi ho mai
                incrociati. Il fatto &egrave; che <i>no los banco, a vos y a los otros
                hijos de puta de tus compañeros.</i>" sibil&ograve;, con voce appena 
                accentuata, come se stesse parlando dei coktail che non sarebbero arrivati.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Il problema" continu&ograve; "&egrave; che non abbiano scelta. Lo so io.
                E lo sapete anche voi. Questa &egrave; una pura formalit&agrave; per 
                dettare le rispettive condizioni, e vedere come funziona nei prossimi
                mesi." Il sorriso spar&igrave; dalle labbra del Ministro, lentamente.
                Fece per parlare, ma il Ravnos fu lesto ad alzare la mano per bloccarlo.
                "Prima di cominciare, so che sapete cos'&egrave; la Vaulderie. Vorrei 
                sapeste che Roc&iacute;o, <i>aqui</i>" indic&ograve; la pallida donna 
                di bassa statura i cui occhi rossi riuscivano a risaltare persino sulla 
                folta chioma corvina, leonina, incolta. "Continua a somministrarcela, 
                quindi di legami di sangue non ne potete fare."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Il Ministro si sporse dalla sedia, appena, riprendendo una parvenza di 
                sorriso mellifluo.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Si era aspettato di peggio.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                In Buenos Aires by Night, non sar&agrave; necessario specificare 
                direttamente l'affiliazione di un personaggio, in quanto dovr&agrave; 
                essere chiaro nella sua biografia. In seguito, saranno esposte le
                situazioni attuali delle varie Sette e Congreghe.
            </Typography>

            <Typography paragraph>
                <h2 style={titleStyle}>
                    Camarilla
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Dopo l'accordo concluso col portavoce degli <i>Amici Noctis</i>,
                di cui si parla nella&nbsp;
                <Link to={GuideRoutes.environmentBaires}>sezione di Ambientazione</Link>, 
                la Camarilla ha ottenuto tutto quello di cui aveva bisogno 
                per poter organizzare il Dominio di Buenos Aires, dopo aver perso
                quello di Montevideo. Ha il suo Principe nella persona di&nbsp;
                <b>Maria Augusta Carvalho Sforza</b>, supportata dall'Ancillae&nbsp;
                <b>Isabela Ruiz Diaz</b>, Primogenito Ventrue Il resto dei personaggi
                non giocanti saranno descritti nella&nbsp;
                <Link to={GuideRoutes.npcs}>sezione dei Personaggi non giocanti</Link>.
            </Typography>

            <Typography paragraph>
                <h2 style={titleStyle}>
                    Anarchici
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                L'abbandono da parte del Sabbat dei territori, e la successiva partenza
                verso il Medio Oriente, non ha lasciato spazio solamente alla Camarilla.
                <b>Rodrigo Manoukian</b>, un Ravnos Anticlan, ha rifiutato di asservirsi
                alla Guerra della Gehenna imposta dal suo clan, e col suo branco ha raggiunto
                un accordo di mutua protezione con i Ministri per la protezione dei territori
                della Provincia dalla morsa della Camarilla, che ha rifiutato proprio 
                i Ministri dall'entrare a far parte della Setta.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                In seguito a questo pubblico rifiuto di affiliazione alla Camarilla, e
                alla pretesa di territorio contro la Setta, altri delusi dall'esperienza
                fallita del Dominio di Montevideo hanno deciso di aderire e dare corpo
                al movimento Anarchico a Buenos Aires.<br />
                N&eacute; Manoukian n&eacute; nessuno dei Ministri ha finora avanzato
                la pretesa di assumere la carica di Barone, anche se il Ravnos sta
                svolgendo, grazie anche al suo locale / rifugio e allo status che gli
                garantisce, un ruolo di guida molto simile.
            </Typography>

            <Typography paragraph>
                <h2 style={titleStyle}>
                    Hecata
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I Giovanni sono arrivati negli anni 80 del secolo passato con la Camarilla,
                ufficialmente per dare supporto logistico alla Setta per il suo insediamento,
                sfruttando le loro connessioni tra gli immigranti umani italiani di 
                lungo corso.<br />
                La setta, prima della Constituci&oacute;n del 1994 e le prime vittorie e anche
                dopo, ha continuato ad accusare i Giovanni di doppiogiochismo con il Sabbat,
                sia per nascondere i suoi fallimenti agli occhi degli Anziani in Europa,
                sia perch&eacute; era <b>vero</b>.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Per questo motivo, nonostante dopo il 1994 il loro supporto &egrave; stato
                fondalmentale per l'insediamento del Dominio di Montevideo, la Camarilla
                non ha nemmeno offerto il suo aiuto quando, in seguito all'attacco finanziario 
                della Seconda Inquisizione a tutto ci&ograve; che era anche solo remotamente
                collegato alle famiglie Giovanni e Dunsirn, il clan Giovanni fu sull'orlo del
                fallimento. Gli allora Seguaci di Set ne approfittarono, e cercarono di 
                estirpare la presenza dei Giovanni da Buenos Aires.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Ci sarebbero riusciti, se non ci fosse stata una iniezione di Fratelli
                della famiglia Pisanob, guidati da <b>Mercedes Pisanob</b>, approdati a 
                Buenos Aires per sfuggire alla persecuzione
                degli Araldi, Cappadoci sfuggiti alla mattanza operata dal loro stesso
                Antidiluviano. Grazie all'iniezione di nuove energie, ed alle loro
                capacit&agrave; necromantiche, riuscirono a ritagliarsi uno spazio 
                nella citt&agrave; di Buenos Aires assieme ai Giovanni. Anche a Buenos Aires,
                nacque il clan <b>Hecata</b>.
            </Typography>
        </>
    );
}

export default GuidesEnvironmentSects;
