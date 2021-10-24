// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";
import Box from "@mui/material/Box";

type Props = {

}

const GuidesCredits = (props: Props): any => {
    const imageLinkStyle = {
        maxHeight: "60px",
        maxWidth: "auto"
    };

    return (
        <>
            <Typography paragraph sx={guideStyle}>
                <h1 style={titleStyle}>
                    Credits
                </h1>
            </Typography>

            <Box sx={{minHeight: "95px"}}>
                <a href="https://www.worldofdarkness.com/" target="_blank" rel="noreferrer">
                    <img alt="WhiteWolfLogo" src="/WhiteWolfLogo.webp" align="left" hspace="10px" vspace="10px" style={imageLinkStyle} />
                </a>

                <Typography paragraph sx={guideStyle}>
                    <h2 style={titleStyle}>
                        White Wolf&trade; World of Darkness
                    </h2>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    Questo sito non sarebbe stato possibile senza il lavoro fatto dalla White Wolf&trade; con
                    il World of Darkness. Questo gioco si basa sul regolamento incluso nella Versione 5 dei 
                    manuali di Vampiri: la Masquerade.
                </Typography>
            </Box>

            <Box sx={{minHeight: "95x"}}>
                <a href="https://whitewolf.fandom.com/wiki/Main_Page" target="_blank" rel="noreferrer">
                    <img alt="WhiteWolfWikiLogo" src="/WhiteWolfWikiLogo.webp" align="right" hspace="10px" vspace="10px" style={imageLinkStyle} />
                </a>

                <Typography paragraph sx={guideStyle}>
                    <h2 style={titleStyle}>
                        White Wolf Wiki
                    </h2>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    In questa guida non ufficiale sono elencate la maggior parte delle informazioni sul 
                    mondo di Vampiri: la Masquerade. Un utile riferimento per tutti i giocatori, dai pi&ugrave;
                    esperti per consultare informazioni specifiche, ai meno esperti, per studiare in breve
                    tutto quello che c'&egrave; da sapere sul Mondo di Tenebra.
                </Typography>
            </Box>

            <Box sx={{minHeight: "95x"}}>
                <a href="https://www.studioronin.com" target="_blank" rel="noreferrer">
                    <img alt="StudioRoninLogo" src="/StudioRoninLogo.webp" align="left" hspace="10px" vspace="10px" style={imageLinkStyle} />
                </a>

                <Typography paragraph sx={guideStyle}>
                    <h2 style={titleStyle}>
                        Studio Ronin
                    </h2>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    Molte delle immagini utilizzate nel sito sono state prese direttamente dai manuali della
                    White Wolf&trade;, e l'artista pi&ugrave; utilizzato &egrave; stato sicuramente Christopher
                    Shy. <b>Studio Ronin</b>&trade; &egrave; il sito dove potrete trovare le sue opere, e ci
                    sembrava giusto citarlo.
                </Typography>
            </Box>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Contenuti consigliati
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Di seguito elencheremo alcuni contenuti (per lo pi&ugrave; <i>videogames</i>) che possono
                aiutare a comprendere l'ambientazione, la storia, e il lessico di <b>Vampiri: la Masquearade</b>&trade;.
                Ovviamente, <b>non sar&agrave; necessario comprare o giocare ai titoli descritti di seguito
                per poter entrare e giocare in chat</b>, ma stimiamo che, soprattutto per giocatori alle 
                prime armi, questi giochi aiutino ad acquisire le informazioni essenziali per giocare
                correttamente.
            </Typography>

            <Box sx={{minHeight: "95x"}}>
                <a href="https://whitewolf.fandom.com/wiki/Main_Page" target="_blank" rel="noreferrer">
                    <img alt="WhiteWolfWikiLogo" src="/WhiteWolfWikiLogo.webp" align="right" hspace="10px" vspace="10px" style={imageLinkStyle} />
                </a>

                <Typography paragraph sx={guideStyle}>
                    <h2 style={titleStyle}>
                        White Wolf Wiki
                    </h2>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    In questa guida non ufficiale sono elencate la maggior parte delle informazioni sul 
                    mondo di Vampiri: la Masquerade. Un utile riferimento per tutti i giocatori, dai pi&ugrave;
                    esperti per consultare informazioni specifiche, ai meno esperti, per studiare in breve
                    tutto quello che c'&egrave; da sapere sul Mondo di Tenebra.
                </Typography>
            </Box>
        </>
    );
}

export default GuidesCredits;
