// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, storyStyle, titleStyle } from "../GuidesStyles";
import { Box } from "@mui/system";

type Props = {

}

const GuidesNpcs = (props: Props): any => {
    const sheetBoxStyle = {
        marginLeft: "30px",
        marginRight: "30px"
    };

    const characterBox = {
        minHeight: "300px"
    }

    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Personaggi non Giocanti
                </h1>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Aveva ancora nella mente le urla del suo sire. Di sua nonna, quando,
                celata dall'oscurit&agrave; proiettata dal Dono di Mictecacihuatl,
                aveva dovuto assistere inerme alla sua Morte Ultima. Ricordava ancora
                tutti i dettagli della maschera, il pallore bluastro della mano,
                il lampo del pugnale rituale che staccava la testa.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Possiamo cominciare?" La voce melliflua dell'uomo che aveva di fronte,
                un lacch&eacute; di seconda categoria, glabro, tatuato in modo 
                vagamente rituale. Tent&ograve; di non prestare attenzione al tatuaggio
                che scendeva dalla fronte. Quel simbolo... possibile che esistesse una
                qualche connessione con <i>quella</i> maschera? pens&ograve;.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "<i>Claro</i>".
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Dunque, per quanto riguarda la zona di Quilmes... " Lo ascoltava parlare
                mantenendo fissamente lo sguardo su di lui. Molti suoi Fratelli messicani
                erano morti per portarla a questo incontro, il Giovanni in piedi dietro
                di lei aveva dovuto ingoiarsi il suo orgoglio per farla arrivare
                dov'era arrivata. Tanto valeva far parlare il glabro.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Ha finito?" Chiese la donna. Notava solo adesso che i suoi piedi non
                arrivavano a toccare il terreno, sulla sedia che <b>Lu&iacute;s</b> gli aveva
                preparato. Ne avrebbe discusso pi&ugrave; tardi, in privato.<br />
                Al cenno di assenso del sorridente Ministro, si sporse, poggiando
                il gomito destro sul tavolo, facendo roteare una inutile biro
                tra le dita della mano. "So che avete stretto accordi con gli Anarchici.
                Non vi restava altro da fare, dopo che la notizia del rifiuto da parte 
                della Camarilla di accogliere il vostro clan tra le sue fila."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Il Ministro faticava a spegnere il suo sorriso, rimase una espressione
                enigmatica a mezza bocca, gli occhi si fecero fessure. La Pisanob 
                stava accuratamente mantenendo l'inclinazione del capo in modo da
                lasciare solo il suo Occhio che Vede oltre il Velo alla merc&eacute;
                del Setita.<br />
                Aveva, forse, molte pi&ugrave; cose in comune con l'uomo con cui stava
                trattando, che con il viziato rampollo che stava alla sua destra, ma
                la Famiglia veniva prima di tutto. "Quilmes potete tenerla per i 
                traffici che dovrete organizzare per la banducola con cui vi siete 
                aggregati. A noi rimarr&agrave; la parte nord: Lan&uacute;s, Avellaneda
                e Lomas de Zamora."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Il Ministro si irrigid&igrave;. La tensione della mascella tradiva
                la sua vicinanza all'umanit&agrave;. La rilass&ograve; subito dopo,
                dimostrando una grande propriet&agrave; di s&eacute;.<br />
                La donna poteva sentire l'irrigidimento di Luis, alla sua destra.
                Not&ograve; con orgoglio che, eccezion fatta per piccoli fastidi, 
                come quello della sedia in cui l'aveva costretta, la Famiglia era
                importante anche per i Giovanni, qualsiasi essa sia.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "Affare fatto." Il sorriso riapparve ad increspare le labbra del
                glabro Ministro, che si alz&ograve; dalla sedia. "Quilmes rimarr&agrave;
                a noi, voi avrete la parte nord di Banfield. Entrambi prometteremo
                di non interferire ancora nei nostri affari."
            </Typography>
            
            <Typography paragraph sx={storyStyle}>
                La Pisanob rilass&ograve; la sua mano, ma rimase seduta, nascondendo
                il suo occhio sinistro tra le ombre del capannone in cui si erano
                dati appuntamento. "Abbiamo un accordo."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Il Ministro, chin&ograve; leggermente il capo, riuscendo a
                non imprimere nessuna forma di sudditanza o di rispetto in un
                gesto cos&igrave; cordiale. Aveva decisamente un ottimo controllo di
                s&eacute;.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Solo quando fu fuori dal capannone, <b>Mercedes</b> rilass&ograve;
                il braccio. Si alz&ograve;, facendo perno sulle natiche, per 
                raggiungere il pavimento con un piccolo saltello, rivelando
                il suo metro e cinquanta appena attenuato da un piccolo e comodo
                tacco monacale.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                "La prossima volta voglio poter poggiare i piedi a terra. Mi mancava
                contatto con <b>Madre Tierra</b>." L'irritazione fece trasparire appieno
                il suo accento messicano. <b>Luis Giovanni</b> sorrise. "<i>Est&aacute; bien</i>... <b><i>prima</i></b>."
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Era finalmente diventata una di loro.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                In seguito, sar&agrave; possibile consultare un elenco dei personaggi
                non giocanti pi&ugrave; importanti che potrete trovare in Buenos Aires 
                by Night, nelle posizioni di potere, assieme alle dicerie che li seguono.
                Non verranno elencate altre caratteristiche, in quanto queste potranno
                essere scoperte solamente in gioco.
            </Typography>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Isabela Ruiz Diaz - La Reina
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/IsabelaRuizDiaz.webp"
                            align="left"
                            alt="IsabelaRuizDiaz"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Isabela Ruiz Dias &egrave; il Primogenito Ventrue nel Dominio di Buenos Aires.
                            Il suo &egrave; il sobrio aspetto di una morigerata nobilt&agrave; spagnola,
                            adombrato da leggeri difetti del volto tipici del retaggio di cui si vantava,
                            in vita, di far parte, quello dei <b>Borbone</b>. La magneticit&agrave; della sua 
                            presenza non lascia comunque dubbi sulla temibilit&agrave; della sua persona, del 
                            suo status.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Ci&ograve; che si vocifera su di lei &egrave; che sia lei la reale manovratrice
                            per il clan Ventrue dietro la costituzione di un Dominio stabile della Camarilla
                            nell'America del Sud. Sia come sia, svolge il suo ruolo di Primogenito al meglio
                            delle sue possibilit&agrave;, occupandosi anche di parte delle mansioni legate
                            alla protezione della Masquerade, in attesa dell'assegnazione dello Sceriffato.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Maria Augusta Carvalho Sforza - La Florecita
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/MariaAugustaCarvalhoSforza.webp"
                            align="right"
                            alt="MariaAugustaCarvalhoSforza"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Tra i Ventrue, Maria Augusta Carvalho Sforza ha una discendenza tra le pi&ugrave;
                            qualificanti. Infante di uno dei Ventrue pi&ugrave; influenti in Portogallo,
                            la sua mobilitazione fu il maggiore indizio dello sforzo che la Camarilla 
                            stava investendo nel progetto Sudamericano.<br />
                            La realt&agrave;, per chiunque abbia mai avuto a che fare con la Sforza, &egrave;
                            che mai, forse, nella vita di Elysium, si &egrave; vista una Ventrue 
                            comportarsi come una Toreador come lei.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Ci&ograve; per cui ha indefessamente speso le sue energie in Sud America &egrave;
                            stato la creazione di un Elysium, del centro nevralgico di un Dominio, nella
                            scelta sia degli arredamenti che delle persone necessarie per proteggerlo e per
                            farlo funzionare.<br />
                            Nessuno, all'interno del Dominio, &egrave; stato in grado di rubargli la scena,
                            e questo l'ha resa il perfetto candidato al Principato di quello che, a conti fatti,
                            &egrave; stato uno sforzo operato quasi interamente dal <b>Clan dei Re</b>.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Heinrich H&uuml;nger - El Traidor
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/HeinrichHunger.webp"
                            align="left"
                            alt="HeinrichHunger"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Nel continente Sudamericano dominato dal Sabbat, il clan che pi&ugrave; di 
                            tutti gli altri dominava la scena era sicuramente il clan <b>Lasombra</b>. Coi loro 
                            traffici con la Chiesa e la loro spietata capacit&agrave; di comando, riuscivano
                            a tenere sotto controllo l'intero continente. Almeno finch&eacute; da Citt&agrave;
                            del Messico &egrave; partita l'adunata. Gli <b>Amici Noctis</b>, segreto 
                            concistoro di Anziani Lasombra, non poteva lasciare completamente sguarnito
                            questo territorio, e, tra le negoziazioni con la Camarilla, quella per Buenos 
                            Aires ebbe un perno: H&uuml;nger.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Ex Vescovo della Diocesi di Buenos Aires, il suo tradimento &egrave; stato 
                            cos&igrave; importante per l'insediamento della Camarilla a Buenos Aires, per
                            placare la Chiesa e la sua Seconda Inquisizione e per la cattura delle ultime 
                            cellule Sabbat, che nella citt&agrave; porteña &egrave; stata rilassata la regola
                            dell'Abbraccio imposta dagli accordi di Chicago. Poco si sa, oltre questo, del
                            discreto Vescovo H&uuml;nger, a parte il fatto che fu Abbracciato poco dopo la
                            sua fuga dalla Germania post bellica dopo la sconfitta nella Grande Guerra.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Santiago Rinaldi - El Profesor
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/SantiagoRinaldi.webp"
                            align="right"
                            alt="SantiagoRinaldi"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Santiago Rinaldi non &egrave; nuovo alla citt&agrave; di Buenos Aires. Si 
                            possono ancora trovare, nei polverosi archivi della Universidad de Buenos
                            Aires, alcuni dei suoi trattati medici risalenti al diciannovesimo secolo.
                            Rinaldi &egrave; un sopravvissuto al Sabbat: fece parte del tradimento
                            di Milano, quando Gian Galeazzo Visconti si convert&igrave; in Principe 
                            della Camarilla, ma &egrave; l'unica cosa degna di nota di questo Cainita
                            estremamente discreto.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Fece parte della prima spedizione della Camarilla a Montevideo, e non si 
                            lasci&ograve; pregare nel trasferirsi a Buenos Aires. Fece il suo, nella
                            conquista e nella stabilizzazione del Dominio, dopodich&eacute; si insedi&ograve;
                            nel Sanatorio abbandonato in cui operava da mortale.<br />
                            Ha assunto il ruolo di Primogenito Malkavian, ma raramente si vede in 
                            Elysium, e non sembra molto incline a conservarne la carica. Con grande
                            inquietudine dell'establishment Ventrue.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Fabiana Rodriguez - El Castillo
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/FabianaRodriguez.webp"
                            align="left"
                            alt="FabianaRodriguez"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Uno degli effetti della disperazione della Camarilla porteña &egrave;
                            stato sicuramente l'elezione di Fabiana Rodriguez alla carica di <b>Primogenito
                            del clan Tremere</b>. Non si sono nemmeno curati di capire a quale fazione
                            appartenesse prima di nominarla, probabilmente perch&eacute;, data la 
                            difficolt&agrave; nelle comunicazioni imposta dal rigore dopo gli attacchi
                            della Seconda Inquisizione, i Ventrue non riuscirono nemmeno a sapere che 
                            i Tremere si erano scissi in quattro fazioni.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Fabiana Rodriguez &egrave; stata una ricercatrice di talento argentina assunta
                            in piena onda hippie in un laboratorio di Pasadena per lo studio di sostanze 
                            psicotrope. Una volta Abbracciata, diede ascolto alla sua volont&agrave; interiore
                            troppo tempo repressa, e prese parte al <b>Movimento di Carna</b> dopo l'esplosione
                            della Chantry Tremere a Vienna. Non si conoscono i dettagli del suo arrivo
                            a Buenos Aires dopo la creazione del Dominio, ma poco import&ograve; al Principe
                            Sforza. Non fece troppe domande quando, ansiosa di garantirsi l'aiuto Tremere
                            a scapito degli Anarchici, le concesse di installare una Chantry in piena
                            Capital Federal.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Lucrezia Duval - La Obispa
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/LucreziaDuval.webp"
                            align="right"
                            alt="LucreziaDuval"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            La scelta di Lucrezia Duval di continuare a svolgere 
                            il lavoro di Arpia che tanto successo le aveva portato in Francia
                            invece di accettare la Primogenitura, pu&ograve; apparire strana
                            solo se si ignorano due considerazioni: lo sforzo di voler instaurare
                            un Elysium funzionante nella citt&agrave; di Buenos Aires, e la 
                            straordinaria capacit&agrave; della Toreador di far infuriare anche 
                            il pi&ugrave; consumato diplomatico Ventrue.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            La sua non-vita &egrave; nota a qualsiasi Cainita con un po' di
                            conoscenza della Camarilla: una capacissima critica d'arte francese
                            nel periodo della Nouvelle Vague, venne Abbracciata da un Toreador 
                            ossessionato dalle parole di fuoco che periodicamente riceveva sulle 
                            sue opere dalla Duval. Fu cos&igrave; capace di trasferire le sue 
                            capacit&agrave; nella mansione di Arpia, che le fu garantito di 
                            continuare la sua non-vita.<br /> 
                            Si trasfer&igrave; a Buenos Aires in seguito alla fuga di Villon
                            da Parigi, e pretese, in cambio della sua permanenza, di poter
                            continuare ad interpretare la carica di Arpia nell'Elysium.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <hr />

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Rodrigo Manoukian - El Comandante
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/RodrigoManoukian.webp"
                            align="left"
                            alt="RodrigoManoukian"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Rodrigo era il reticente Ductus del branco de <i>Las Calaveras</i> quando
                            Buenos Aires era ancora saldamente in mano al Sabbat. Fece parte della prima 
                            ondata di Cainiti partiti alla volta del Medio Oriente per partecipare alla
                            Guerra della Gehenna. Di comune accordo col suo branco, decise che partecipare
                            alla grande guerra che si preannunciava in Medio Oriente non era qualcosa 
                            di produttivo, e decise di tornare sui suoi passi, approfittando delle lacune 
                            nel controllo della citt&agrave; da parte della Camarilla per imbastire
                            la prima cellula Anarchica di Buenos Aires.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Estendendo il suo controllo alla Provincia di Buenos Aires, strinse accordi
                            coi Cainiti del Ministero di Set, rifiutati ufficilamente dalla Camarilla.
                            Pur non volendo ricoprire ufficilamente il ruolo di <b>Barone Anarchico</b>,
                            anche perch&eacute; tali consuetudini sono estranee e distanti alle abitudini 
                            della capitale argentina, lui e il suo branco rimangono i punti di riferimento
                            per altri ribelli Sabbatici poco inclini a partecipare alla grande guerra,
                            e per i delusi della Camarilla dopo il fallito tentativo di Montevideo.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Rocio Fernandez - La Oficiante
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/RocioFernandez.webp"
                            align="right"
                            alt="RocioFernandez"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Nella sua non-vita, Rocio Fernandez ha continuato a fare quello
                            che faceva in vita: sopravvivere.<br />
                            Fu una delle vittime di un <b>Abbraccio di Massa</b> usato dal Sabbat
                            per tentare di respingere i primi tentativi di espansione della
                            Camarilla in Capital Federal. Sopravvisse, e continu&ograve; a farlo
                            nelle notti successive, superando le dure prove che la vita del
                            Sabbat pone di fronte ai suoi nuovi accoliti.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Entr&ograve; a far parte del nuovo branco organizzato da Manoukian,
                            las <b>Calaveras</b>, e dovette imparare il mestiere di Priest quando
                            il precedente fu brutalmente ucciso in un attacco organizzato dalla 
                            Camarilla. Segu&igrave; il suo branco fino a Montevideo, e lo segu&igrave;
                            ancora tornando a Buenos Aires, appoggiando la decisione con la forza
                            del suo istinto di sopravvivenza.<br />
                            La Gangrel continua a presiedere il rituale della Vaulderie, su preciso
                            ordine di Rodrigo.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Ernesto Herrera - El Tractor
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/ErnestoHerrera.webp"
                            align="left"
                            alt="ErnestoHerrera"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Essere parte di un branco Sabbat, per Ernesto, non fece una grande
                            differenza in termini di morale o di legalit&agrave;. Un trafficante
                            di droga mancato, per via di grandi problemi di dipendenza dalle stesse,
                            nella non-vita continu&ograve; il suo lavoro, non smettendo per&ograve; di 
                            consumare sostanze stupefacienti attraverso la vitae delle sue vittime.<br />
                            Fu rifiutato e accolto nuovamente in diversi branchi, prima di finire 
                            in quello di Manoukian.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Fu uno dei promotori, nel branco, per il ritorno a Buenos Aires, e il
                            rifiuto di una guerra che non capiva e a cui non voleva partecipare.<br />
                            Da allora supporta il branco nell'unico modo che conosce, fornendo 
                            liquidit&agrave; attraverso lo spaccio nel loro locale.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <hr />

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Javier - El Chorro
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/Javier.webp"
                            align="right"
                            alt="Javier"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Di tutti i Fratelli del nuovo Dominio di Buenos Aires, Javier D'Arienzo &egrave; sicuramente
                            il prodotto pi&ugrave; genuino, l'espressione pi&ugrave; verace della citt&agrave; di Buenos
                            Aires. Ed il fatto che sia riuscito a fare il doppio gioco, mercanteggiando Favori con chiunque
                            senza mai esplicitare ufficialmente la sua affiliazione a nessuna setta, dice molto della sua 
                            capacit&agrave; e della considerazione che aveva all'interno del suo clan, anche in una Diocesi
                            Sabbat.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Tutti sanno che in vita era un comunissimo <i>chorro</i>, un ladrone dei bassifondi, dotato per&ograve;
                            di una furbizia fuori dal normale. Una volta Abbracciato, ci mise poco a distanziarsi da qualsiasi
                            forma di affiliazione, nascondendosi nei <b>suoi</b> quartieri di <b>Villa Bosch</b>, stringendo
                            accordi con chiunque avesse qualcosa da offrire, continuando ad accumulare cos&igrave; tanti
                            Favori che, quando un Neonato voleva ispirare una Caccia di Sangue contro di lui, nemmeno i Vescovi
                            della Diocesi osavano dar seguito alla richiesta, indebitati com'erano.<br />
                            Prosegue la sua azione anche nel neonato Dominio della Camarilla: per lui &egrave; cambiato poco,
                            Buenos Aires &egrave; sempre la sua citt&agrave;.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Sardaukar - El Chino
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/Sardaukar.webp"
                            align="left"
                            alt="Sardaukar"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <hr />

            <Box sx={characterBox}>
                <Typography paragraph sx={guideStyle}>
                    <h3 style={titleStyle}>
                        Mercedes Pisanob - La Tana
                    </h3>
                </Typography>

                <Box sx={sheetBoxStyle}>
                    <img src="/MercedesPisanob.webp"
                            align="right"
                            alt="MercedesPisanob"
                            hspace="10px"
                            vspace="10px" />
                    <Box>
                        <Typography paragraph sx={guideStyle}>
                            La vita di Mercedes non &egrave; stata facile, e non ha avuto
                            nulla a che vedere con l'epopea della Famiglia Giovanni nel corso 
                            della storia. Fu una delle mogli di un narcos nella provincia messicana
                            di Sonora, ma in un parossismo di rabbia, uccise nel sonno tutti 
                            i criminali che aveva in casa, e si mise ad aspettare la vendetta
                            del Cartello.<br />
                            Fu per&ograve; Abbracciata da sua nonna, una messicana a sua volta
                            Abbracciata da un componente della Famiglia Pisanob interessato alla
                            sua conoscenza dei rituali Incas. Insieme vissero per diversi decenni
                            almeno fino all'apparizione degli <b>Araldi del Teschio</b>. Uno di questi 
                            le perseguit&ograve;, e grazie al sacrificio della sua Sire,
                            Mercedes riusc&igrave; a fuggire fino a Buenos Aires, assieme ad
                            altri Pisanob fuggiaschi dal Messico.
                        </Typography>
                        <Typography paragraph sx={guideStyle}>
                            Si distinse, una volta arrivata a Buenos Aires, nel respingere gli
                            attacchi dei Ministri di Set, che stavano approfittando del collasso
                            finanziario Giovanni e Dunsirn per epurare Buenos Aires dalla
                            presenza della Famiglia, e fu identificata dalla Famiglia come
                            sua rappresentante nel nuovo <i>rebranding</i> del clan Giovanni,
                            che cambi&ograve; il suo nome in Hecata.<br />
                            Negozi&ograve; la divisione dei territori nel sud della Capital Federal
                            con i Ministri, e con la Camarilla fece valere l'<b>Accordo siglato dal
                            suo Antidiluviano</b>, di fatto reinstaurando l'accordo che port&ograve;
                            la Camarilla a Buenos Aires.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default GuidesNpcs;
