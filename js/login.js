function verificaregistrazione() {												//VERIFICO CHE ESISTA UN UTENTE, CLIENTE O VENDITORE, CHE ABBIA TALI PARAMETRI PER USERNAME E PASSWORD
	var username=document.getElementById("user").value;
	var password=document.getElementById("pass").value;

	var clienti=JSON.parse(localStorage.getItem("clienti"));
	var venditori=JSON.parse(localStorage.getItem("venditori"));

	var i=0;
	if(clienti!==null) {var n=clienti.length;									//GUARDO FRA I CLIENTI
		for(i=0; i<n; i++){
			if(username===(clienti[i])[7] && password===(clienti[i])[8]){
				var utenteloggato=["c", i];
				localStorage.setItem("utenteloggato", JSON.stringify(utenteloggato));
				window.location.assign("index.html");
				}
			}
		}

	i=0;
	if(venditori!==null) {var m=venditori.length;								//GUARDO FRA I VENDITORI
		for(i=0; i<m; i++){
			if(username===(venditori[i])[9] && password===(venditori[i])[10]){
				var utenteloggato=["v", i];
				localStorage.setItem("utenteloggato", JSON.stringify(utenteloggato));
				window.location.assign("index.html");
				}
			}
		}

	alert("Non è presente alcun cliente e alcun venditore con tale combinazione di username e password!!\n\n");

		}
