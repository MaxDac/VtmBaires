// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, titleStyle } from "../GuidesStyles";

const GuidesAttributes = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Clan
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                In creazione, il personaggio all'inizio dovr&agrave; scegliere il clan del proprio personaggio.
                Mentre l'affiliazione di una Setta pu&ograve; avere a che fare con il libero arbitrio del personaggio,
                il clan ha a che fare col sangue del Sire: &egrave; impossibile cambiarne le caratteristiche.<br />
                Il Sangue determina i poteri del cainita, porta con s&eacute; le maledizioni del Sangue (debolezza 
                al fuoco e ai raggi solari, e la Bestia), e una maledizione caratteristica del clan, che ha la 
                doppia funzione di tormentare la non-vita del cainita, e di riconoscerlo come appartenente 
                ad una di queste grandi "famiglie" ancestrali.<br />
                Siccome in Buenos Aires by Night sar&agrave; possibile solamente interpretare Fratelli appartenenti
                alla Camarilla, anche la scelta dei clan sar&agrave; ridotta ai soli clan affiliati alla setta.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Nella leggenda cainita, i clan hanno avuto origine dai mitici Antidiluviani, esseri dai poteri
                leggendari che infestano la terra da migliaia di anni. Qualunque sia la loro origine, &egrave; 
                indubbio che i differenti clan hanno delle caratteristiche differenti tra di loro. Esistono poi
                i <b>Caitiff</b>, o Vili, che, pur essendo vampiri a tutti gli effetti, non mostrano i segni
                caratteristici dell'appartenenza ad un clan, e i <b>Sangue Debole</b>, o Thin-Blood, ovvero
                vampiri la cui Generazione, o lontananza in Abbracci dai mitici progenitori, &egrave; cos&igrave;
                grande che il loro sangue ha perso molte delle caratteristiche tipiche dei cainiti, come la
                debolezza ai raggi solari, il pallore cadaverico, o l'impossibilit&agrave; di mangiare cibo.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Banu Haquim
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Sempre chiamati Assamiti fuori dal clan, i Banu Haquim sono un clan di guerrieri formidabili, 
                come anche di maghi sapienti e di dotti diplomatici. La loro struttura &egrave; sempre stata
                indipendente, e il loro quartier generale arroccato ad <b>Alamut</b>, in Medio Oriente.<br />
                Sono stati recentemente accettati nella Camarilla. La loro debolezza &egrave; una strana 
                dipendenza dal sangue degli altri cainiti, e la difficolt&agrave; che dimostrano nel resistere
                alla tentazione della Diablerie.<br />
                <b>Affiliazioni</b>: Camarilla, o Indipendenti.<br />
                <b>Discipline</b>: Oscurazione, Blood Sorcery, Velocit&agrave;.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Brujah
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I cainiti del clan Brujah sono notoriamente scelti tra iconoclasti, idealisti, ribelli. Il loro
                sangue &egrave; naturalmente portato all'ira, e questa tendenza si &egrave; esplicitata col
                recente abbandono di massa del clan dalla Camarilla. Alcuni cainiti <br />
                La maledizione del loro sangue &egrave; la tendenza alla frenesia, sull'onda dell'ira che 
                esprime il loro Sangue.<br /> 
                <b>Affiliazioni</b>: Anarchici, pochi cainiti hanno deciso di rimanere nella Camarilla.<br />
                <b>Discipline</b>: Ascendente, Potenza, Velocit&agrave;.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Gangrel
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il clan Gangrel &egrave; composto da persone che, per Abbraccio o gi&agrave; nel corso della 
                loro vita mortale, hanno una profonda connessione con la natura e con la Bestia. Attivisti
                per l'ambiente, ma anche solitari ed eremiti, trovano spazio in questo clan, che ha gi&agrave;
                da un paio di decenni abbandonato in massa la Camarilla per rendersi indipendente, o anarchico.<br />
                La maledizione del loro sangue &egrave; la tendenza alla frenesia, sull'onda dell'ira che 
                esprime il loro Sangue.<br /> 
                <b>Affiliazioni</b>: Anarchici o Indipendenti, pochi cainiti hanno deciso di rimanere nella Camarilla.<br />
                <b>Discipline</b>: Ascendente, Potenza, Velocit&agrave;.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Hecata
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Originariamente Cappadoci, poi Giovanni, in seguito alla Diablerie operata da Augustus Giovanni, poi Hecata,
                in seguito all'attacco finanziario della Seconda Inquisizione, gli Hecata sono un variegato gruppo di cainiti 
                dediti alla Necromanzia. Data la complessit&agrave; della storia di questo clan, &egrave; consigliato a giocatori 
                pi&ugrave; esperti.<br />
                La maledizione del loro sangue si manifesta nel Bacio: invece di portare sensazioni di estasi, trasmette un dolore
                inimmaginabile nella vittima, che deve essere costretta, se sveglia.<br /> 
                <b>Affiliazioni</b>: rigorosamente Indipendenti.<br />
                <b>Discipline</b>: Giovanni: Potenza, Dominazione, Oblivion, Pisanob/altri: Auspex, Oblivion, Robustezza.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Lasombra
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I Lasombra sono cainiti noti per la loro brutalit&agrave; e mancanza di scrupoli, oltre che per la loro connessione
                che sfocia in feticismo con le Ombre, che controllano grazie al potere della loro Vitae. La loro tendenza &egrave; 
                quella di dominare soggiogando, in maniera pi&ugrave; o meno plateale, dipendendo dal contesto. Hanno recentemente
                stretto un accordo con la Camarilla per garantirsi l'affiliazione alla Setta, ma alcuni ribelli Sabbat possono 
                ora far parte degli Anarchici, se non sono partiti col Sabbat per la Guerra della Gehenna.<br />
                La maledizione del loro sangue consiste nell'impossibilit&agrave; di riflettere la loro immagine chiaramente sugli 
                specchi: i Neonati vedranno la loro immagine sfocata, disturbata, mentre gli Anziani non la vedranno affatto. Questo
                difetto influenza curiosamente anche tutta la tecnologia moderna: non possono essere registrati da telecamere, o 
                da microfoni, e tutta la tecnologia attorno a loro tende a non funzionare correttamente, o affatto. Nonostante questo,
                o proprio per l'effetto che fanno alla tecnologia, la Seconda Inquisizione riesce a capire immediatamente che ha a che 
                fare con cainiti di questo clan.<br /> 
                <b>Affiliazioni</b>: Camarilla, alcuni Anarchici.<br />
                <b>Discipline</b>: Potenza, Dominazione, Oblivion.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Malkavian
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il clan Malkavian &egrave; uno dei clan che nessuno comprende appieno, la loro storia &egrave; stata tormentata e
                si intreccia con la Maledizione del loro Sangue: la Follia. Tutti i membri del clan hanno, o avevano gi&agrave; in vita,
                una patologia mentale pi&ugrave; o meno accentuata, che li ha resi vittime delle Inquisizioni e degli altri Fratelli.
                Ma assieme alla Follia, hanno sempre avuto una profonda intuizione, e i loro movimenti apparentemente casuali hanno
                sempre inquietato chi aveva coscienza del fatto che non era saggio derubricare i Malkavian a semplici pazzi imprevedibili.
                L'Abbraccio Malkavian &egrave; apparentemente causale, quindi non c'&egrave; nessuna limitazione al tipo di personaggio
                che si vuole fare.<br />
                La maledizione del loro sangue come detto, &egrave; la pazzia: ogni membro del clan ha una patologia mentale, e
                dovr&agrave; essere indicata in fase di creazione.<br /> 
                <b>Affiliazioni</b>: Camarilla, alcuni Anarchici.<br />
                <b>Discipline</b>: Auspex, Dominazione, Oscurazione.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Ministry
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <i>In costruzione</i>.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Nosferatu
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Se il Sangue Malkavian rovina la mente dei cainiti, il Sangue Nosferatu ne rovina le fattezze. Chiunque venga
                Abbracciato da un Nosferatu, finisce irrimediabilmente per diventare un orrore deambulante. Questo difetto ha
                ovviamente influenzato la storia del clan: un clan di spie, di sopravvissuti, di hacker formidabili e soprattutto
                unito al loro interno.<br />
                La maledizione del loro sangue come detto, &egrave; l'eccessiva bruttezza, la totale mostruosit&agrave;. Acquisiscono
                il difetto <b>Repulsivo</b> in creazione, e ovviamente non sar&agrave; possibile acquisirlo tra i difetti.<br /> 
                <b>Affiliazioni</b>: Camarilla, Anarchici o Indipendenti.<br />
                <b>Discipline</b>: Animalit&agrave;, Oscurazione, Potenza.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Ravnos
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La storia del clan Ravnos ha origine in India, ma si &egrave; spostata in Europa con le carovane degli zingari, e
                questi sono tutti quelli che sono sopravvissuti alla terribile <b>Settimana degli Incubi</b>. Da allora, gli elementi 
                del clan in un continente si contano sulle dita di una mano. I Narratori si riservano di poter non accettare il personaggio,
                data la loro estrema scarsit&agrave;.<br />
                La maledizione del loro sangue &egrave; la tendenza al vizio: ogni Ravnos ha un vizio, ed &egrave; quasi impossibile
                resistervi quando l'occasione si presenta.<br /> 
                <b>Affiliazioni</b>: Indipendenti o Anarchici.<br />
                <b>Discipline</b>: Animalit&agrave;, Ascendente, Robustezza.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Salubri
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il clan dei Salubri si pensava del tutto estinto per mano dei Tremere, che ne hanno diablerizzato l'Antidiluviano, ma
                evidentemente coi guai che stanno attraversando ora i Tremere, i pochi Salubri rimasti hanno deciso di uscire allo scoperto.
                Questo clan &egrave; avvolto nel mistero, nelle Notti Moderne, e sono ancora pi&ugrave; rari dei Ravnos, motivo per cui 
                i Narratori si riservano di non accettare nemmeno questi personaggi.<br />
                La maledizione del loro sangue li costringe a potersi nutrire solo di vittime consenzienti. Inoltre, la loro Vitae sembra
                essere molto pi&ugrave; dolce di quella degli altri cainiti, e per questo motivo sono costantemente cacciati dagli altri clan.<br /> 
                <b>Affiliazioni</b>: Indipendenti o Anarchici.<br />
                <b>Discipline</b>: Auspex, Dominazione, Robustezza.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Toreador
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I Toreador sono da sempre considerati gli artisti tra i cainiti, i Fratelli con pi&ugrave; sensibilit&agrave; e pi&ugrave; connessione
                con gli umani e l'umanit&agrave;. Ed &egrave; vero, nel bene e nel male. Maestri diplomatici, li si pu&ograve; trovare a loro agio
                tanto in Elysium come Arpie, tanto in mostre d'arte, come artisti o mecenati. Questo clan disprezza la volgarit&agrave; e la bruttezza,
                ed apprezza la bellezza: vien da s&eacute; che i personaggi Toreador sono mediamente artisti, o... semplicemente affascinanti.<br />
                La maledizione del loro sangue ha a che fare con la Bellezza: il Toreador non riesce a tollerare ci&ograve; che definisce brutto, e 
                invece si ferma in estasi a contemplare ci&ograve; che per lui &egrave; il bello. Essendo questi termini del tutto arbitrari, chi 
                vorr&agrave; interpretare un personaggio Toreador dovr&agrave; porre tra le Note cosa il suo personaggio ritiene bello e cosa brutto.<br /> 
                <b>Affiliazioni</b>: Camarilla, alcuni Anarchici.<br />
                <b>Discipline</b>: Ascendente, Auspex, Velocit&agrave;.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Tremere
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il clan dei magi, degli stregoni del Sangue, &egrave; sicuramente quello che ha ricevuto il pi&ugrave; duro colpo da parte della Seconda
                Inquisizione. Un tempo chiuso in una rigida gerarchia piramidale tenuta insieme da legami di Sangue, con la distruzione della Haus de Hexe
                il clan ha perso la punta della piramide, e il castello di carte &egrave; venuto gi&ugrave;. Ora, esistono diverse fazioni di Tremere,
                alcuni nella Camarilla, pochi addirittura tra gli Anarchici. In generale, comunque, il clan Abbraccia persone estremamente intelligenti
                e portate allo studio.<br />
                La maledizione del loro sangue ha subito una mutazione con la distruzione della struttura piramidale: adesso, il loro sangue non riesce
                ad imprimere legami di sangue con la potenza degli altri cainiti.<br /> 
                <b>Affiliazioni</b>: Camarilla, alcuni Anarchici.<br />
                <b>Discipline</b>: Auspex, Blood Sorcery, Dominazione.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Tzimisce
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I Dragoni, gli appartenenti del clan Tzimisce, sono tra i cainiti pi&ugrave; inumani, ed orgogliosi di esserlo. Un tempo signori dei
                Carpazi, alla loro abilit&agrave; di modellare carne e ossa a loro piacimento, si &egrave; aggiunta, nella rivolta Anarchica, la 
                capacit&agrave; di spezzare i legami di sangue tramite il rituale che in seguito sarebbe stato conosciuto come Vaulderie. Da sempre
                affiliati del Sabbat, la stragrande maggioranza di loro &egrave; partita per la Guerra di Gehenna, ed allo stato attuale sono 
                estremamente rari. Per questo motivo, i Narratori potranno decidere di rifiutare un personaggio di questo clan.<br />
                La maledizione del loro sangue li costringe a dover dormire vicino a qualcosa che abbia estrema importanza per il cainita, il che
                pu&ograve; essere la loro terra natale, o un gruppo di persone affiliate ad una organizzazione. Se non riescono a farlo, subiranno un
                danno alla Forza di Volont&agrave; pari alla gravit&agrave; della loro Maledizione per ogni notte passata in questo modo.<br /> 
                <b>Affiliazioni</b>: Anarchici o Indipendenti.<br />
                <b>Discipline</b>: Animalit&agrave;, Dominazione, Proteide (Vicissitudine).
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Ventrue
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il clan dei Re, il clan che ha modellato la Camarilla e la sua struttura di potere e ne ha istituito le Tradizioni, o leggi, e ne ha 
                importo la loro osservazione. I Ventrue vedono il comando come la loro naturale aspirazione, ci&ograve; che sono nati per fare, e 
                pongono in pratica questa loro naturale propensione con la loro rigida gerarchia, il rispetto e l'imposizione dell'autorit&agrave;.
                Al contrario dei Lasombra, che vedono nella prevaricazione una compulsione, i Ventrue vedono il Dominio come quasi un loro dovere.<br />
                La maledizione del loro sangue gli impedisce di nutrirsi di mortali al di furoi di uno specifico tipo, siano essi donne d'affari, 
                nobili o vergini. Se si cibano di sangue non appartenente alla categoria da loro prediletta, lo vomitano.<br /> 
                <b>Affiliazioni</b>: Camarilla.<br />
                <b>Discipline</b>: Ascendente, Dominazione, Robustezza.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Caitiff
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I Caitiff, o Vili, sono vampiri in tutto e per tutto, tranne che per il clan. Dopo l'Abbraccio, non hanno presentato nessuna caratteristica
                tipica del clan: Nosferatu con aspetto normale, Malkavian sani di mente, o Ventrue in grado di cibarsi di qualsiasi forma di Sangue. 
                Cainiti di questo tipo sono notoriamente stati sempre ostracizzati e esiliati dal clan, e addirittura dalla Camarilla, considerati poco 
                meglio dei Sangue Debole. Il loro numero adesso &egrave; per&ograve; aumentato, e costituiscono una forza notevole, da non ignorare.<br />
                I Vili non soffrono nessuna maledizione di clan, anche se soffrono normalmente della maledizione del Sangue cainita, e quindi raggi del Sole
                e fuoco hanno lo stesso effetto su di loro, e la loro Bestia non ha nulla da invidiare a quella dei "normali" cainiti.<br /> 
                <b>Affiliazioni</b>: Anarchici, in rari casi nei bassi ranghi della Camarilla, ma non potranno assumere Status.<br />
                <b>Discipline</b>: i Vili manifestano la loro duttilit&agrave; riuscendo ad apprendere qualsiasi Disciplina non rara (non potranno apprendere
                Blood Sorcery o Oblivion, per esempio).
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Sangue Debole
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Nelle Ultime Notti, molti Abbracci di tredicesime generazioni hanno generato dei vampiri con un Sangue cos&igrave; debole e diluito da non 
                riuscire nemmeno, in alcuni casi, a sostenere i loro corpi non morti, e a soffrire molto di meno le maledizioni ancestrali del Sangue di 
                Caino. Alcuni di questi cainiti possono addirittura camminare al Sole, mangiare cibo umano senza vomitarlo, altri hanno addirittura
                battito e sono indistinguibili da altri umani. In ogni caso, i Sangue Debole sono generalmente cacciati e sterminati senza piet&agrave;
                dalla Camarilla, ignorati nel migliore dei casi, attivamente esiliati o uccisi nel peggiore dagli Anarchici, in quanto secondo le leggende
                la loro apparizione &egrave; un segno dell'arrivo della Gehenna, la fine dei tempi per i cainiti.<br />
                I Sangue Debole soffrono di una serie di Pregi e Difetti caratteristici del loro "clan", che dovranno essere specificati in creazione.<br /> 
                <b>Affiliazioni</b>: Nessuna, sono generalmente cacciati a vista da tutti gli altri cainiti.<br />
                <b>Discipline</b>: &egrave; possibile per loro apprendere l'Alchimia del Sangue.
            </Typography>
        </>
    );
}

export default GuidesAttributes;
