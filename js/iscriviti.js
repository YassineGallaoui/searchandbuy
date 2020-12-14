if(localStorage.getItem("clienti") === null){							//INIZIALIZZO LE VARIABILI CHE MI SERVONO
	var clienti=[];
	var i=-1;
} else {
	var clienti=JSON.parse(localStorage.getItem("clienti"));
	var i=clienti.length-1;
}

if(localStorage.getItem("venditori") === null){
	var venditori=[];
	var j=-1;
} else {
	var venditori=JSON.parse(localStorage.getItem("venditori"));
	var j=venditori.length-1;
}


function selectCliente() {document.getElementById("consum").checked = true;}		//AL CARICAMENTO DELLA PAGINA VOGLIO CHE SIA SEMPRE SELEZIONATO IL CLIENTE

function cons(){																//CHE SCHERMATA DI RICHIESTA INFORMAZIONI VISUALIZZO? CLIENTE O VENDITORE?
	document.getElementById("informazioni_cons").style.display= "block";
	document.getElementById("informazioni_vend").style.display= "none";
}

function vend(){
	document.getElementById("informazioni_cons").style.display= "none";
	document.getElementById("informazioni_vend").style.display= "block";
}

function verificaripetipassword(){												//VERIFICO CHE LA RIPETIZIONE DELLA PASSWORD SIA AVVENUTA CORRETTAMENTE
	var pass1 = document.getElementById("pass1c").value;
	var pass2 = document.getElementById("pass2c").value;
	if(pass1!==pass2) {
		document.getElementById("pass2c").value="";
		document.getElementById("pass2c").placeholder="  RIPETI CORRETTAMENTE LA PASSWORD !"
		return false;
	}
	return true;
}

function verificaripetipasswordvenditore(){												//VERIFICO CHE LA RIPETIZIONE DELLA PASSWORD SIA AVVENUTA CORRETTAMENTE
	var pass1 = document.getElementById("pass1v").value;
	var pass2 = document.getElementById("pass2v").value;
	if(pass1!==pass2) {
		document.getElementById("pass2v").value="";
		document.getElementById("pass2v").placeholder="  RIPETI CORRETTAMENTE LA PASSWORD !";
		return false;
	}
	return true;
}

function verificaUsername(){												//VERIFICO CHE LA RIPETIZIONE DELLA PASSWORD SIA AVVENUTA CORRETTAMENTE
	var clienti=JSON.parse(localStorage.getItem("clienti"));
	var venditori=JSON.parse(localStorage.getItem("venditori"));
	var username;
	var tipoUtente;
	if(document.getElementById("usernamec").value==="") {
		username=document.getElementById("usernamev").value;
		tipoUtente="usernamev";}
	if(document.getElementById("usernamev").value==="") {
		username=document.getElementById("usernamec").value;
		tipoUtente="usernamec";}

	for(var j=0; j<clienti.length; j++){
		var cliente=clienti[j];
		if(username===cliente[7])	{document.getElementById(tipoUtente).value=""; document.getElementById(tipoUtente).placeholder="  USERNAME GIÀ IN USO !"; return;}
	}

	for(var k=0; k<venditori.length; k++){
		var venditore=venditori[k];
		if(username===venditore[9])	{document.getElementById(tipoUtente).value=""; document.getElementById(tipoUtente).placeholder="  USERNAME GIÀ IN USO !"; return;}
	}
}

function registra(){															//PROCESSO DI REGISRAZIONE DI UN UTENTE: CLIENTE O DI UN VENDITORE

	if(document.getElementById("consum").checked === true) {
		if (!verificaripetipassword() || !controllacampic() || !(document.getElementById("nomec").checkValidity()) || !(document.getElementById("cognomec").checkValidity()) || !(document.getElementById("emailc").checkValidity()) || !(document.getElementById("datanascitac").checkValidity()) || !(document.getElementById("telefonoc").checkValidity()) || !(document.getElementById("usernamec").checkValidity()) || !(document.getElementById("pass1c").checkValidity())){
			alert("Compilare CORRETTAMENTE tutti i campi!");
		}	else 	{
			i++;
			var tipo="cliente";
			var IDc=i
			var nome=document.getElementById("nomec").value;
			var cognome=document.getElementById("cognomec").value;
			var mail=document.getElementById("emailc").value;
			var datanascita=document.getElementById("datanascitac").value;
			var numero=document.getElementById("telefonoc").value;
			var username=document.getElementById("usernamec").value;
			var password=document.getElementById("pass1c").value;
			var pagamento=document.getElementById("seleziona").value;
			var preferenze=[];
			var carrello=[];
			var acquisti=[];
			var p=0;
			if(document.getElementById("ele1").checked === true) {preferenze[p]='elettronica'; p++;}
			if(document.getElementById("ele2").checked === true) {preferenze[p]='elettrodomestici'; p++;}
			if(document.getElementById("canc").checked === true) {preferenze[p]='cancelleria'; p++;}
			if(document.getElementById("gioc").checked === true) {preferenze[p]='giocattoli'; p++;}
			if(document.getElementById("fit").checked === true) {preferenze[p]='sport'; p++;}
			var cliente=[IDc, tipo, nome, cognome, datanascita, mail, numero, username, password, pagamento, preferenze, carrello, acquisti];
			clienti[i]=cliente;
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("clienti", JSON.stringify(clienti));					//SALVO NEL LOCAL STORAGE E PASSO ALLA PAGINA DI LOGIN
				window.location.assign("login.html");
			} else {
				alert("Sorry, your browser does not support Web Storage...");
			}
		}

	} else {																																//STESSE COSE FATTE CON UN VENDITORE
		if(!verificaripetipasswordvenditore() || !controllacampiv() || !(document.getElementById("nomev").checkValidity()) || !(document.getElementById("cognomev").checkValidity()) || !(document.getElementById("emailv").checkValidity()) || !(document.getElementById("datanascitav").checkValidity()) || !(document.getElementById("attivita").checkValidity()) || !(document.getElementById("partitaiva").checkValidity()) || !(document.getElementById("telefonov").checkValidity()) || !(document.getElementById("usernamev").checkValidity()) || !(document.getElementById("pass1v").checkValidity())) {alert("Compilare CORRETTAMENTE tutti i campi!");
	} else {
		j++;
		var tipo="venditore";
		var IDv=j;
		var nome=document.getElementById("nomev").value;
		var cognome=document.getElementById("cognomev").value;
		var mail=document.getElementById("emailv").value;
		var datanascita=document.getElementById("datanascitav").value;
		var attivita=document.getElementById("attivita").value;
		var iva=document.getElementById("partitaiva").value;
		var numero=document.getElementById("telefonov").value;
		var user=document.getElementById("usernamev").value;
		var password=document.getElementById("pass1v").value;
		var venditore=[IDv, tipo, nome, cognome, datanascita, attivita, iva, mail, numero, user, password];
		venditori[j]=venditore;

		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("venditori", JSON.stringify(venditori));
			window.location.assign("login.html");
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}
	}
}
}																																					//QUA FINISCE LA FUNZIONE DI REGISTRAZIONE

function controllacampic(){														//CONTROLLO CHE I CAMPI DEL FORM DI REGISTRAZIONE DEI CLIENTI SIANO STATI RIEMPITI CORRETTAMENTE
	var nome=document.getElementById("nomec").value;
	var cognome=document.getElementById("cognomec").value;
	var mail=document.getElementById("emailc").value;
	var datanascita=document.getElementById("datanascitac").value;
	var numero=document.getElementById("telefonoc").value;
	var username=document.getElementById("usernamec").value;
	var password=document.getElementById("pass1c").value;
	var password2=document.getElementById("pass2c").value;
	var pagamento=document.getElementById("seleziona").value;

	if(nome===""||cognome===""||mail===""||datanascita===""||numero===""||username===""||password===""||password2===""||pagamento==="")
	return false;
	else return true;
}

function controllacampiv(){														//CONTROLLO CHE I CAMPI DEL FORM DI REGISTRAZIONE DEI CLIENTI SIANO STATI RIEMPITI CORRETTAMENTE
	var nome=document.getElementById("nomev").value;
	var cognome=document.getElementById("cognomev").value;
	var mail=document.getElementById("emailv").value;
	var datanascita=document.getElementById("datanascitav").value;
	var numero=document.getElementById("telefonov").value;
	var username=document.getElementById("usernamev").value;
	var password=document.getElementById("pass1v").value;
	var password2=document.getElementById("pass2v").value;
	var attivity=document.getElementById("attivita").value;
	var iva=document.getElementById("partitaiva").value;

	if(nome===""||cognome===""||mail===""||datanascita===""||numero===""||username===""||password===""||password2===""||attivity===""||iva==="")
	return false;
	else return true;
}
