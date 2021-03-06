function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var Celular = document.getElementById("Input3").value;
    var Partner = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var alumno = {
            id, //matricula:id    id:idR
            nombre,//nombre:nombre
            Celular,
            Partner,
        }

        var lista_Socios=JSON.parse(localStorage.getItem("Socios"));

        if(lista_Socios==null)
        { 
            var lista_Socios = [];
        }
        
        const existe = lista_Socios.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_Socios=lista_Socios.filter(alumno=>alumno.id!=id);

            }
                
            lista_Socios.push(alumno);
            var temporal = lista_Socios.sort((a,b) => a.id-b.id);
            localStorage.setItem("Socios", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de alumno","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_Socios = JSON.parse(localStorage.getItem("Socios"));
    
     
    if(lista_Socios)
    {
        lista_Socios.forEach((alumno)=>printRow(alumno));
    }
}


function printRow(alumno){
    
    if(alumno!=null){
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
        cell1.innerHTML = alumno.id;
        cell2.innerHTML = alumno.nombre; 
        cell3.innerHTML = alumno.Celular;
        cell4.innerHTML = alumno.Partner; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${alumno.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+alumno.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_Socios = JSON.parse(localStorage.getItem("Socios"));
    var temporal=lista_Socios.filter(alumno=>alumno.id!=id);
    localStorage.setItem("Socios", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Socios");
    }
  
    read();
    
}

function seekR(id){

    const lista_Socios = JSON.parse(localStorage.getItem("Socios"));
    var alumno=lista_Socios.filter(alumno=>alumno.id==id);
    //console.log(alumno[0]);
    updateR(alumno[0]);
}

function updateR(alumno){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=alumno.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=alumno.nombre;
        document.getElementById("Input3").value=alumno.Celular;
        document.getElementById("Input4").value=alumno.Partner;
    }
}


//Para consulta de Partner
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_Socios = JSON.parse(localStorage.getItem("Socios"));
    var SociosC=lista_Socios.filter(alumno=>alumno.Partner==c);
    if(SociosC)
    {
        SociosC.forEach((alumno)=>printRowQ(alumno));
    }
    //console.log(SociosC)

}


function printRowQ(alumno){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.nombre; 
    cell3.innerHTML = alumno.Celular;
    cell4.innerHTML = alumno.Partner; 
   
}