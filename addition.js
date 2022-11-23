var nbOperation = 10;
//Declarer un tableau à deux dimentions qui va stoker les deux termes des opérations
var tab = new Array(20);
var son = new Audio('applaudissement.wav');
var seconde = 0;
var minute = 0;
var secondeAff;
var minuteAff;
var interval = "";



for (var e = 0; e < 20; e++){
	tab[e] = new Array(2);
}

function afficherAddition(){
	
	
	
	var terme1;
	var terme2;
		
	seconde = 0;
	minute = 0;
	document.getElementById("temps").value  = "00:00";
		
	nbOperation = Number(document.getElementById("nbOp").value);
	
	//Afficher les opérations et enregistrer les deux termes des pérations
	document.getElementById("exercice").innerHTML = "";
	for(var i = 0 ; i < nbOperation ; i++){
		//Créer une nouvelle input 
		var zone = document.createElement("input");
		zone.setAttribute("type", "number");
		zone.id = "z" + i;
		zone.style.height = "20px";
		zone.style.fontSize = "22px";
		zone.style.width = "60px";
		terme1 = Math.floor(Math.random() * 10);
		terme2 = Math.floor(Math.random() * 10);
		tab[i][0] = terme1;
		tab[i][1] = terme2;
		document.getElementById("exercice").innerHTML  = document.getElementById("exercice").innerHTML +
		terme1 + " + " + terme2 + " = ";
		document.getElementById("exercice").appendChild(zone);
		document.getElementById("exercice").innerHTML  = document.getElementById("exercice").innerHTML + "<br/>";
	}
	disabledTexte(true);	
	if ((document.getElementById("tempsLimite").value > 0) && (document.getElementById("nbOp").value > 0)){
		//masquer la note et la remarque
		
		document.getElementById("tempExpire").style.display = "none";
		document.getElementById("note").style.display = "none";
		document.getElementById("remarque").style.display = "none";
		document.getElementById("btStart").disabled = false;
		document.getElementById("btChek").disabled = false;
		window.clearInterval(interval);
	}
	else{
		document.getElementById("tempExpire").innerHTML = "Parameters mogen niet nul zijn !!!";
		document.getElementById("tempExpire").style.display = "block";
		document.getElementById("note").style.display = "none";
		document.getElementById("remarque").style.display = "none";
		document.getElementById("btStart").disabled = true;
		document.getElementById("btChek").disabled = true;
		window.clearInterval(interval);
	}
	
		
}

function start(){
	seconde++;
	if(seconde === 60){
		seconde = 0;
		minute++;
	}
	if(seconde < 10){
		secondeAff = "0" + seconde;
	}
	else{
		secondeAff = String(seconde);
	}
	if(minute < 10){
		minuteAff = "0" + minute;
	}
	else{
		minuteAff = String(minute);
	}
	document.getElementById("temps").value  = minuteAff + ":" + secondeAff;
	if((minute * 60 + seconde) >= Number(document.getElementById("tempsLimite").value)){
		window.clearInterval(interval);
		document.getElementById("tempExpire").style.display = "block";
		document.getElementById("tempExpire").innerHTML  =  "Verstreken tijd !!!";
		document.getElementById("btChek").disabled = true;
		disabledTexte(true);
		corrigerAddition();
	}
}


function commencerExercice(){
	interval = window.setInterval(start, 1000);
	document.getElementById("btStart").disabled = true;
	disabledTexte(false);
}



function corrigerAddition(){
	var note = 0;
	for(var i = 0 ; i < nbOperation ; i++){
		if ((document.getElementById("z" + i).value !=="") && 
		   (tab[i][0] + tab[i][1] === Number(document.getElementById("z" + i).value))){
			document.getElementById("z"+i).style.border = "2px solid green";
			document.getElementById("z"+i).style.boxShadow = "2px 2px 5px green";
			note = note+1;
		}
		else{
			document.getElementById("z"+i).style.border = "2px solid red";
			document.getElementById("z"+i).style.boxShadow = "2px 2px 5px red";
		}
		
	}
	document.getElementById("note").innerHTML  = note + " / " + nbOperation;
	if(note === nbOperation){
		window.clearInterval(interval);
		document.getElementById("remarque").innerHTML  =  "Zeer goed";
		son.play();
	}
	else if(note / nbOperation >= 0.8){
		document.getElementById("remarque").innerHTML  =  "Goed";
	}
	else {
		document.getElementById("remarque").innerHTML  =  "Je kan beter";
	}
	//afficher la note et la remarque
	document.getElementById("note").style.display = "block";
	document.getElementById("remarque").style.display = "block";
}

function disabledTexte(v){
	for(var i = 0 ; i < nbOperation ; i++){
		document.getElementById("z" + i).disabled = v;   
	}
}