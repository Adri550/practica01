var firebaseConfig = {
    apiKey: "AIzaSyBTjKnIF-iTTdY6d8TjzhwrH9PGO9FiRCo",
  authDomain: "fir-1-e84c5.firebaseapp.com",
  databaseURL: "https://fir-1-e84c5-default-rtdb.firebaseio.com",
  projectId: "fir-1-e84c5",
  storageBucket: "fir-1-e84c5.appspot.com",
  messagingSenderId: "900300191611",
  appId: "1:900300191611:web:11a57b8e2fc5cd7d81efde",
  measurementId: "G-CCX85FDYDW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var celular = document.getElementById("Input3").value;
    var Partner = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Socio = {
            id, //matricula:id
            nombre,
            celular,
            Partner,
        }

        //console.log(Socio);

        firebase.database().ref('Socio/' + id).update(Socio).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Socio').push().key;
    //data[`Socio/${key}`]= Socio;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Socio');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Socio){
    
    if(Socio!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Socio.id;
        cell2.innerHTML = Socio.nombre; 
        cell3.innerHTML = Socio.celular;
        cell4.innerHTML = Socio.Partner; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Socio.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Socio.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Socio/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Socio/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Socio){
    if(Socio!=null)
    {
        document.getElementById("Input1").value=Socio.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Socio.nombre;
        document.getElementById("Input3").value=Socio.celular;
        document.getElementById("Input4").value=Socio.Partner;
    }
}


//Para consulta de Partner
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Socio");
    ref.orderByChild("Partner").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Socio){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Socio.id;
    cell2.innerHTML = Socio.nombre; 
    cell3.innerHTML = Socio.celular;
    cell4.innerHTML = Socio.Partner; 
   
}