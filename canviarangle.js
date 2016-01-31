var m;

function loadCastellers() {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'castellers.json', true); 
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      m=xobj.responseText;
      m=JSON.parse(m);
    }
  };
  xobj.send(null);
}

//This function changes the angle rotation and prints the information on the screen.
function canviarangle(){
	angle=Number(document.getElementById("Angle").value);
	angle=angle/180;
	for (i=0; i<m.length; i++){
		rotation=m[i].position.rotation_y;
		rotation=rotation*Math.PI;
		m[i].position.rotation_x=String(Math.sin(rotation)*angle);
   		m[i].position.rotation_z=String(Math.cos(rotation)*angle);
   	}
    escriure(m);
}

//This function prints the changed information on screen.
function escriure(m){
  document.getElementById('link').innerHTML='';
  var json = JSON.stringify(m);
  json=json.replace(/",/g,'",\n');
  json=json.replace(/}/g,'}\n');
  var blob = new Blob([json], {type: "application/json"});
  var url  = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.download    = "castellers.json";
  a.href        = url;
  a.textContent = "Baixar castellers.json amb angles canviats";
  document.getElementById('link').appendChild(a);
  
  var text;
  text='';
  for (i=0; i<m.length; i++){
    text+='<BR>"id:"'+m[i].id+'<BR><BR>';
    text+='"rotation_x":"'+m[i].position.rotation_x+'",<BR>';
    text+='"rotation_z":"'+m[i].position.rotation_z+'",<BR>';
  }
  console.log('ok');
  document.getElementById('escriure').innerHTML=text;
}