function logout(){																				//FUNZIONE DI LOGOUT
	localStorage.removeItem("utenteloggato");
}

function caricaDatiPersonali(){

	document.getElementById("togli_login").style.display="none";

	var utenteDaSelezionare = JSON.parse(localStorage.getItem("utenteloggato"));
	if(utenteDaSelezionare[0]==='c') {
		var clienti = JSON.parse(localStorage.getItem("clienti"));
		document.getElementById("venditore").style.display= "none";
		document.getElementById("cliente").style.display= "block";
		document.getElementById("togli_vendi").style.display="none";

		var idcliente = utenteDaSelezionare[1];
		var cliente=clienti[idcliente];
		document.getElementById("tipoc").innerHTML= "Cliente";
		document.getElementById("nomec").innerHTML=cliente[2];
		document.getElementById("cognomec").innerHTML=cliente[3];
		document.getElementById("datanascitac").innerHTML= cliente[4];
		document.getElementById("telefonoc").innerHTML=cliente[6];
		document.getElementById("mailc").innerHTML=cliente[5];
		document.getElementById("usernamec").innerHTML= cliente[7];
		var nomecliente=cliente[7];
		document.getElementById("nomeclient").innerHTML=nomecliente;
		var pref=cliente[10];
		var stringapref="";
		for(var i=0; i<pref.length; i++){
			stringapref=stringapref+pref[i]+(i===pref.length-1 ? "":", ");
		}
		document.getElementById("preferenzec").innerHTML=stringapref;
		document.getElementById("pagamentic").innerHTML=cliente[9];
	}

	if(utenteDaSelezionare[0]==='v') {
		document.getElementById("togli_carrello").style.display="none";
		document.getElementById("togli_acquisti").style.display="none";
		document.getElementById("searchdiv").style.display="none";
		var venditori = JSON.parse(localStorage.getItem("venditori"));
		document.getElementById("venditore").style.display= "block";
		document.getElementById("cliente").style.display= "none";
		var idvenditore = utenteDaSelezionare[1];
		var venditore=venditori[idvenditore];
		var nomevenditore=venditore[9];
		document.getElementById("nomeclient").innerHTML=nomevenditore;
		document.getElementById("tipov").innerHTML= "Venditore";
		document.getElementById("nomev").innerHTML=venditore[2];
		document.getElementById("cognomev").innerHTML=venditore[3];
		document.getElementById("datanascitav").innerHTML= venditore[4];
		document.getElementById("telefonov").innerHTML=venditore[8];
		document.getElementById("mailv").innerHTML=venditore[7];
		document.getElementById("usernamev").innerHTML= venditore[9];
		document.getElementById("attivitav").innerHTML= venditore[5];
		document.getElementById("ivav").innerHTML=venditore[6];
	}
}

function formModificaDativ(){
	document.getElementById("infov").style.width="51%";
	document.getElementById("infov").style.borderRadius ="15px 0px 0px 15px";
	document.getElementById("modifica_infov").style.marginLeft="50%";
}

function formModificaDatic(){
	document.getElementById("infoc").style.width="51%";
	document.getElementById("infoc").style.borderRadius ="15px 0px 0px 15px";
	document.getElementById("modifica_infoc").style.marginLeft="50%";
}

function verificaUsernameC(){												//VERIFICO CHE LA RIPETIZIONE DELLA PASSWORD SIA AVVENUTA CORRETTAMENTE
	var clienti=JSON.parse(localStorage.getItem("clienti"));
	var venditori=JSON.parse(localStorage.getItem("venditori"));
	var usernamec=document.getElementById("cambiausernamec").value;
	var valoreRitorno=false;

	if(clienti!==null){
		for(var j=0; j<clienti.length; j++){
			var cliente=clienti[j];
			if(usernamec===cliente[7])	{
				document.getElementById("cambiausernamec").value="";
				document.getElementById("cambiausernamec").placeholder="  USERNAME GIÀ IN USO !";
				valoreRitorno = true;
			}
		}
	}
	if(venditori!==null){
		for(var k=0; k<venditori.length; k++){
			var venditore=venditori[k];
			if(usernamec===venditore[9])	{
				document.getElementById("cambiausernamec").value="";
				document.getElementById("cambiausernamec").placeholder="  USERNAME GIÀ IN USO !";
				valoreRitorno = true;
			}
		}
	}
	return valoreRitorno;
}

function verificaUsernameV(){												//VERIFICO CHE LA RIPETIZIONE DELLA PASSWORD SIA AVVENUTA CORRETTAMENTE
	var clienti=JSON.parse(localStorage.getItem("clienti"));
	var venditori=JSON.parse(localStorage.getItem("venditori"));
	var usernamev=document.getElementById("cambiausernamev").value;
	var valoreRitorno=false;

	if(clienti!==null){
		for(var j=0; j<clienti.length; j++){
			var cliente=clienti[j];
			if(usernamev===cliente[7])	{
				document.getElementById("cambiausernamev").value="";
				document.getElementById("cambiausernamev").placeholder="USERNAME GIÀ IN USO !";
				valoreRitorno = true;
			}
		}
	}

	if(venditori!==null){
		for(var k=0; k<venditori.length; k++){
			var venditore=venditori[k];
			if(usernamev===venditore[9])	{
				document.getElementById("cambiausernamev").value="";
				document.getElementById("cambiausernamev").placeholder="USERNAME GIÀ IN USO !";
				valoreRitorno = true;
			}
		}
	}
	return valoreRitorno;
}

function formConfermaModifichec(){
	var clienti=JSON.parse(localStorage.getItem("clienti"));
	var utentelogg=JSON.parse(localStorage.getItem("utenteloggato"));
	var chi=utentelogg[1];
	var cliente=clienti[chi];
	if(verificaUsernameC()===true || !(document.getElementById("cambiatelc").checkValidity()) || !(document.getElementById("cambiamailc").checkValidity()) || !(document.getElementById("cambiausernamec").checkValidity()))
	{
		alert("Inserire valori ACCETTABILI !");
	} else {
		var conferma =window.confirm("Sei sicuro di voler modificare i tuoi dati personali?");
		if(!conferma) return;
		if(document.getElementById('cambiatelc').value!=="")		{cliente[6]=document.getElementById('cambiatelc').value;}
		if(document.getElementById('cambiamailc').value!=="")				{cliente[5]=document.getElementById('cambiamailc').value;}
		if(document.getElementById('cambiausernamec').value!=="")		{cliente[7]=document.getElementById('cambiausernamec').value;}
		if(document.getElementById('cambiapagamentic').value!=="")				{cliente[9]=document.getElementById('cambiapagamentic').value;}

		var preferenze = [];
		var p=0;
		if(document.getElementById("ele1").checked === true) {preferenze[p]='elettronica'; p++; cliente[10]=preferenze;}
		if(document.getElementById("ele2").checked === true) {preferenze[p]='elettrodomestici'; p++; cliente[10]=preferenze;}
		if(document.getElementById("canc").checked === true) {preferenze[p]='cancelleria'; p++; cliente[10]=preferenze;}
		if(document.getElementById("toys").checked === true) {preferenze[p]='giocattoli'; p++; cliente[10]=preferenze;}
		if(document.getElementById("fit").checked === true) {preferenze[p]='sport'; p++; cliente[10]=preferenze;}
		if(document.getElementById("elimina").checked === true) {preferenze=[]; cliente[10]=preferenze;}

		clienti[chi]=cliente;
		localStorage.setItem("clienti", JSON.stringify(clienti));
		document.getElementById("modifica_infoc").style.marginLeft="115%";
		document.getElementById("infoc").style.width="100%";
		document.getElementById("infoc").style.borderRadius ="15px 15px 15px 15px";
		caricaDatiPersonali();
	}
}

function formConfermaModifichev(){
	var venditori=JSON.parse(localStorage.getItem("venditori"));
	var utentelogg=JSON.parse(localStorage.getItem("utenteloggato"));
	var chi=utentelogg[1];
	var venditore=venditori[chi];
	if(verificaUsernameV()===true || !(document.getElementById("cambiatelefonov").checkValidity()) || !(document.getElementById("cambiamailv").checkValidity()) || !(document.getElementById("cambiausernamev").checkValidity()) || !(document.getElementById("cambiaattivitav").checkValidity()) || !(document.getElementById("cambiaivav").checkValidity()))
	{
		alert("Inserire valori ACCETTABILI !");
	} else {
		var conferma =window.confirm("Sei sicuro di voler modificare i tuoi dati personali?");
		if(!conferma) return;
		if(document.getElementById('cambiatelefonov').value!=="")		{venditore[8]=document.getElementById('cambiatelefonov').value;}
		if(document.getElementById('cambiamailv').value!=="")				{venditore[7]=document.getElementById('cambiamailv').value;}
		if(document.getElementById('cambiausernamev').value!=="")		{
			var nomeVecchio=document.getElementById('usernamev').textContent;
			venditore[9]=document.getElementById('cambiausernamev').value;
			for(var q=0; q<lista.prodotti.length; q++){
				var x=lista.prodotti[q].venditore;
				if(x===nomeVecchio){
					lista.prodotti[q].venditore=venditore[9];
				}
			}
		}
		if(document.getElementById('cambiaattivitav').value!=="")		{venditore[5]=document.getElementById('cambiaattivitav').value;}
		if(document.getElementById('cambiaivav').value!=="")				{venditore[6]=document.getElementById('cambiaivav').value;}
		venditori[chi]=venditore;
		localStorage.setItem("venditori", JSON.stringify(venditori));
		localStorage.setItem("prodottiimportati", JSON.stringify(lista));

		document.getElementById("modifica_infov").style.marginLeft="115%";
		document.getElementById("infov").style.width="100%";
		document.getElementById("infov").style.borderRadius ="15px 15px 15px 15px";
		caricaDatiPersonali();
	}
}

function deleteAccount() {
	var utentelogg=JSON.parse(localStorage.getItem("utenteloggato"));
	var tipodiutente=utentelogg[0];
	var conferma =window.confirm("ATTENZIONE. Questo è un punto di non ritorno.\n\nUna volta data la conferma di CANCELLAZIONE del tuo account, NON potrai più tornare indietro.\n\nSei sicuro di voler eliminare il tuo account?\n\n");
	if(!conferma) return;
	if(tipodiutente==="c"){
		var chi=utentelogg[1];
		var clienti=JSON.parse(localStorage.getItem("clienti"));
		eliminaTuttiIProdotti();
		clienti.splice(chi, 1);
		localStorage.setItem("clienti", JSON.stringify(clienti));
		localStorage.removeItem("utenteloggato");
		window.location.assign("login.html");
	}
	if(tipodiutente==="v"){
		var chi=utentelogg[1];
		var venditori=JSON.parse(localStorage.getItem("venditori"));
		var usernamev=(venditori[chi])[9];
		var lista=JSON.parse(localStorage.getItem("prodottiimportati"));
		var prodotti=lista.prodotti;
		for(var i=0; i<prodotti.length; i++){
			var venditoreprodotto=prodotti[i].venditore;
			if(venditoreprodotto===usernamev){
				prodotti.splice(i, 1);
			}
		}
		lista.prodotti=prodotti;
		localStorage.setItem("prodottiimportati", JSON.stringify(lista));
		venditori.splice(chi, 1);
		localStorage.setItem("venditori", JSON.stringify(venditori));
		localStorage.removeItem("utenteloggato");
		window.location.assign("login.html");
	}
}
