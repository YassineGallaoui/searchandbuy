function logout(){																				//FUNZIONE DI LOGOUT
	localStorage.removeItem("utenteloggato");
}

var lista;																									//CARICO LA LISTA DEI PRODOTTI DAL FILE JSON
if(localStorage.getItem("prodottiimportati") === null) {
	lista = JSON.stringify(dati);
	localStorage.setItem("prodottiimportati", lista);
}
lista = JSON.parse(localStorage.getItem("prodottiimportati"));
var lunghezza=lista.prodotti.length;


//FUNZIONE DI RICERCA DEI PRODOTTI
function ricerca(){																															//FUNZIONE DI RICERCA DEI PRODOTTI
	var corpo=document.getElementById("corpo");
	while (corpo.hasChildNodes()) {																								//RIMUOVO IL CONTENUTO DENTRO IL DIV CON ID=CORPO
		corpo.removeChild(corpo.firstChild);
	}
	var parolaDaCercare=document.getElementById("barraricerca").value.toUpperCase();				//VALUTO LA PAROLA CHE SI STA CERCANDO

	for(var i=0; i<lunghezza; i++){
		var nomeProdottoInLista=lista.prodotti[i].nome;
		if(nomeProdottoInLista.toUpperCase().indexOf(parolaDaCercare) > -1) {
			var divcontenitore = document.createElement("div");
			var link = document.createElement("a");
			var divprodotto = document.createElement("div");
			var immagine = document.createElement("img");
			var linkimmagine=lista.prodotti[i].urlimmagine;
			var p1=document.createElement("div");
			var p2=document.createElement("div");
			var contenitore_testo=document.createElement("div");
			var contenitore_immagine=document.createElement("div");
			var nome = document.createTextNode(lista.prodotti[i].nome);
			var prezzo = document.createTextNode(lista.prodotti[i].prezzo+" €");
			divcontenitore.setAttribute("class", "contenitore_prodotto");
			contenitore_immagine.setAttribute("class", "contenitore_immagine");
			link.setAttribute("href", "prodotto.html");
			link.setAttribute("onclick", 'localStorage.setItem("prodottodaaprire", JSON.stringify('+i+'))');
			divprodotto.setAttribute("class", "prodotto");
			contenitore_testo.setAttribute("class", "contenitore_testo");
			immagine.setAttribute("src", linkimmagine);
			p1.appendChild(nome);
			p2.appendChild(prezzo);
			contenitore_immagine.appendChild(immagine);
			divprodotto.appendChild(contenitore_immagine);
			contenitore_testo.appendChild(p1);
			contenitore_testo.appendChild(p2);
			divprodotto.appendChild(contenitore_testo);
			link.appendChild(divprodotto);
			divcontenitore.appendChild(link);
			document.getElementById("corpo").appendChild(divcontenitore);
		}
	}
}

var utente;
var numeroUtente
if(localStorage.getItem("utenteloggato") !== null) {
	utente=JSON.parse(localStorage.getItem("utenteloggato"));
	numeroUtente=utente[1];}

function caricabacheca(){												//COSA VISUALIZZA IL CLIENTE O IL VENDITORE QUANDO ACCEDE ALLA HOMEPAGE DEL SITO?

	if(localStorage.getItem("utenteloggato") === null) {
		document.getElementById("togli_acquisti").style.display="none";
		document.getElementById("togli_logout").style.display="none";
		document.getElementById("togli_carrello").style.display="none";
		document.getElementById("togli_account").style.display="none";
		document.getElementById("togli_vendi").style.display="none";
		var t=0;
		for(t=0; t<lunghezza; t++){																										//VISUALIZZO TUTTI I PRODOTTI CHE VENGONO VENDUTI DA SEARCH&BUY
			var linkimg=lista.prodotti[t].urlimmagine;
			var nome=lista.prodotti[t].nome;
			var prezzo=lista.prodotti[t].prezzo;
			creadivbacheca(linkimg, nome, prezzo, t);
		}
	}
	else{
		if(utente[0]==="c"){												//GUARDO QUALI SONO I PRODOTTI DI INTERESSE E QUINDI, IN BASE A CIÒ, CHIAMO LA FUNZIONE CHE MI CREA UN DIV CON QUEL PRODOTTO
			document.getElementById("togli_login").style.display="none";
			document.getElementById("togli_vendi").style.display="none";

			var divtitolo = document.createElement("div");
			var testo = document.createTextNode("Prodotti che potrebbero interessarti...");
			divtitolo.setAttribute("id", "contenitoretitolo");
			divtitolo.appendChild(testo);
			document.getElementById("corpo").appendChild(divtitolo);

			var clienti=JSON.parse(localStorage.getItem("clienti"));
			var nomecliente=(clienti[numeroUtente])[7];
			document.getElementById("nomeclient").innerHTML=nomecliente;
			var preferenze=(clienti[numeroUtente])[10];
			for(var q=0; q<preferenze.length; q++){
				var x=(preferenze[q]);
				for(var z=0; z<lunghezza; z++) {
					var nomeProdottoInLista=lista.prodotti[z].categoria;
					if(nomeProdottoInLista===x){
						var linkimg = lista.prodotti[z].urlimmagine;
						var nome = lista.prodotti[z].nome;
						var prezzo = lista.prodotti[z].prezzo;
						creadivbacheca(linkimg, nome, prezzo, z);
					}
				}
			}
			if(preferenze.length===0){
				var tt=0;
				for(tt=0; tt<lunghezza; tt++){																										//VISUALIZZO TUTTI I PRODOTTI CHE VENGONO VENDUTI DA SEARCH&BUY
					var linkimg=lista.prodotti[tt].urlimmagine;
					var nome=lista.prodotti[tt].nome;
					var prezzo=lista.prodotti[tt].prezzo;
					creadivbacheca(linkimg, nome, prezzo, tt);
				}
			}
		}

		if(utente[0]==="v"){
			var venditori=JSON.parse(localStorage.getItem("venditori"));
			var nomevenditore=(venditori[utente[1]])[9];
			document.getElementById("nomeclient").innerHTML=nomevenditore;

			document.getElementById("togli_login").style.display="none";
			document.getElementById("togli_carrello").style.display="none";
			document.getElementById("togli_acquisti").style.display="none";
			document.getElementById("searchdiv").style.display="none";

			var nDiv=-1;
			var contatoreUno=0;

			for(var q=0; q<lista.prodotti.length; q++){
				var x=lista.prodotti[q].venditore;
				if(x===nomevenditore){
					contatoreUno=contatoreUno+1;
					if(contatoreUno===1)	{
						var divtitolo = document.createElement("div");
						var testo = document.createTextNode("Ciao "+nomevenditore+" ! Questi sono tutti i prodotti che vendi");
						divtitolo.setAttribute("id", "contenitoretitolo2");
						divtitolo.appendChild(testo);
						document.getElementById("corpo").appendChild(divtitolo);
					}
					var linkimg = lista.prodotti[q].urlimmagine;
					var nome = lista.prodotti[q].nome;
					var prezzo = lista.prodotti[q].prezzo;
					var nProdotti = lista.prodotti[q].quantita;
					var descrizione = lista.prodotti[q].descrizione;
					nDiv=nDiv+1;
					creadivbachecavenditore(linkimg, nome, prezzo, q, nProdotti, descrizione, nDiv);
				}
			}
			if(nDiv===-1){
				var divtitolo = document.createElement("div");
				var divbottoneVendere = document.createElement("div");
				var bottoneVendere = document.createElement("button");
				var link = document.createElement("a");
				var testo = document.createTextNode("Ciao "+nomevenditore+" ! Non vendi ancora nessun prodotto! È ora di cominciare a vendere!");
				var testo2 = document.createTextNode("Comincia a vendere subito !");
				divtitolo.setAttribute("id", "contenitoretitolo2");
				bottoneVendere.setAttribute("id", "bottoneVendere");
				divbottoneVendere.setAttribute("id", "divbottoneVendere");
				link.setAttribute("href", "vendi.html");
				divtitolo.appendChild(testo);
				bottoneVendere.appendChild(testo2);
				link.appendChild(bottoneVendere);
				divbottoneVendere.appendChild(link);
				document.getElementById("corpo").appendChild(divtitolo);
				document.getElementById("corpo").appendChild(divbottoneVendere);
			}
		}
	}
}

function creadivbacheca(linkimg, nome, prezzo, nProdotto){									//CREO UN DIV IN BASE AI PARAMETRI CHE MI ARRIVANO IN INPUT
	var divcontenitore = document.createElement("div");
	var link = document.createElement("a");
	var divprodotto = document.createElement("div");
	var immagine = document.createElement("img");
	var linkimmagine = linkimg;
	var p1 = document.createElement("div");
	var p2 = document.createElement("div");
	var contenitore_testo = document.createElement("div");
	var contenitore_immagine = document.createElement("div");
	var nome = document.createTextNode(nome);
	var prezzo = document.createTextNode(prezzo+" €");
	divcontenitore.setAttribute("class", "contenitore_prodotto");
	contenitore_immagine.setAttribute("class", "contenitore_immagine");
	divprodotto.setAttribute("class", "prodotto");
	link.setAttribute("href", "prodotto.html");
	link.setAttribute("onclick", 'localStorage.setItem("prodottodaaprire", JSON.stringify('+nProdotto+'))');
	contenitore_testo.setAttribute("class", "contenitore_testo");
	immagine.setAttribute("src", linkimmagine);
	p1.appendChild(nome);
	p2.appendChild(prezzo);
	contenitore_immagine.appendChild(immagine);
	divprodotto.appendChild(contenitore_immagine);
	contenitore_testo.appendChild(p1);
	contenitore_testo.appendChild(p2);
	divprodotto.appendChild(contenitore_testo);
	link.appendChild(divprodotto);
	divcontenitore.appendChild(link);
	document.getElementById("corpo").appendChild(divcontenitore);
}

function creadivbachecavenditore(linkimg, nome, prezzo, numeroProdotto, nProdotti, descrizione, nDiv){									//CREO UN DIV IN BASE AI PARAMETRI CHE MI ARRIVANO IN INPUT

	var divcontenitore = document.createElement("div");
	var divprodotto = document.createElement("div");
	var immagine = document.createElement("img");
	var linkimmagine = linkimg;
	var p1 = document.createElement("div");
	var p2 = document.createElement("div");
	var contenitore_testo = document.createElement("div");
	var contenitore_immagine = document.createElement("div");
	var contenitore_informazioni = document.createElement("div");
	var nome = document.createTextNode(nome);
	var prezzo2 = document.createTextNode(prezzo+" €");
	var text1 = document.createElement("span");
	var testo1 = document.createTextNode("Numero prodotti disponibili");
	var field1 = document.createElement("input");
	var text2 = document.createElement("span");
	var testo2 = document.createTextNode("Prezzo");
	var field2 = document.createElement("input");
	var text3 = document.createElement("span");
	var testo3 = document.createTextNode("Descrizione");
	var field3 = document.createElement("textarea");
	var acapo = document.createElement("br");
	var acapo2 = document.createElement("br");
	var acapo3 = document.createElement("br");
	var acapo4 = document.createElement("br");
	var acapo5 = document.createElement("br");
	var acapo6 = document.createElement("br");
	var bottone1 = document.createElement("button");
	var testob1 = document.createTextNode("Apporta modifiche");
	var bottone2 = document.createElement("button");
	var testob2 = document.createTextNode("Elimina prodotto");



	divcontenitore.setAttribute("class", "contenitore_prodotto2");
	contenitore_immagine.setAttribute("class", "contenitore_immagine2");
	divprodotto.setAttribute("class", "prodotto2");
	contenitore_testo.setAttribute("class", "contenitore_testo2");
	contenitore_informazioni.setAttribute("class", "contenitore_informazioni");
	text1.setAttribute("class", "infoDaModificare");
	text2.setAttribute("class", "infoDaModificare");
	text3.setAttribute("class", "infoDaModificare");
	p2.setAttribute("id", "prezzodacambiare");
	field1.setAttribute("type", "number");
	field1.setAttribute("id", "field1"+nDiv);
	field1.setAttribute("min", 0);
	field1.setAttribute("value", nProdotti);
	field2.setAttribute("type", "number");
	field2.setAttribute("id", "field2"+nDiv);
	field2.setAttribute("min", 0);
	field2.setAttribute("value", prezzo);
	field3.setAttribute("type", "text");
	field3.setAttribute("id", "field3"+nDiv);
	field3.setAttribute("class", "descrizione");
	field3.setAttribute("value", descrizione);
	immagine.setAttribute("src", linkimmagine);
	bottone1.setAttribute("class", "bott1");
	bottone1.setAttribute("onclick", "salvamodifiche("+numeroProdotto+", "+nDiv+")");
	bottone2.setAttribute("class", "bott2");
	bottone2.setAttribute("onclick", "eliminaprodotto("+numeroProdotto+")");

	p1.appendChild(nome);
	p2.appendChild(prezzo2);
	contenitore_immagine.appendChild(immagine);
	divprodotto.appendChild(contenitore_immagine);
	text1.appendChild(testo1);
	text2.appendChild(testo2);
	text3.appendChild(testo3);
	bottone1.appendChild(testob1);
	bottone2.appendChild(testob2);
	contenitore_informazioni.appendChild(text1);
	contenitore_informazioni.appendChild(acapo4);
	contenitore_informazioni.appendChild(field1);
	contenitore_informazioni.appendChild(acapo);
	contenitore_informazioni.appendChild(text2);
	contenitore_informazioni.appendChild(acapo5);
	contenitore_informazioni.appendChild(field2);
	contenitore_informazioni.appendChild(acapo2);
	contenitore_informazioni.appendChild(text3);
	contenitore_informazioni.appendChild(acapo6);
	contenitore_informazioni.appendChild(field3);
	contenitore_informazioni.appendChild(acapo3);
	contenitore_informazioni.appendChild(bottone1);
	contenitore_informazioni.appendChild(bottone2);
	divprodotto.appendChild(contenitore_informazioni);
	contenitore_testo.appendChild(p1);
	contenitore_testo.appendChild(p2);
	divprodotto.appendChild(contenitore_testo);
	divcontenitore.appendChild(divprodotto);
	document.getElementById("corpo").appendChild(divcontenitore);
	var idDesc="field3"+nDiv;
	document.getElementById(idDesc).innerHTML=descrizione;
}

function salvamodifiche(numeroProdotto, nDiv){

	var nome=lista.prodotti[numeroProdotto].nome;
	var categoria=lista.prodotti[numeroProdotto].categoria;
	var urlimmagine=lista.prodotti[numeroProdotto].urlimmagine;
	var venditore=lista.prodotti[numeroProdotto].venditore;
	var prezzo=document.getElementById("field2"+nDiv).value*1;
	var quantita=document.getElementById("field1"+nDiv).value*1;
	var descrizione=document.getElementById("field3"+nDiv).value;
	var nuovoprodotto={
		"nome": nome,
		"prezzo": prezzo,
		"categoria": categoria,
		"urlimmagine": urlimmagine,
		"quantita": quantita,
		"venditore": venditore,
		"descrizione": descrizione
	}
	var prodotti=lista.prodotti;
	prodotti.splice(numeroProdotto, 1);
	prodotti.push(nuovoprodotto);
	lista.prodotti=prodotti;
	localStorage.setItem("prodottiimportati", JSON.stringify(lista));
	alert("Modifiche apportate!");
	window.location.reload();
}

function eliminaprodotto(numeroProdotto){
	var prodotti=lista.prodotti;
	prodotti.splice(numeroProdotto, 1);
	lista.prodotti=prodotti;
	localStorage.setItem("prodottiimportati", JSON.stringify(lista));
	alert("Prodotto eliminato!");
	window.location.reload();
}
