function Leer() {
    const peli = document.getElementById("input").value;
    //obtain an apikey on this web
    //http://www.omdbapi.com/apikey.aspx
    const key='aabcb03af05ec9c4c09cbd1faa1a86ef';
    
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${peli}&appid=${key}&units=metric`
    buscar3(api_url);
}

const buscar3=async(api_url)=>{

    const respuesta= await fetch(api_url);
    const Search = await respuesta.json();
    console.log(respuesta.data);
    
    console.log(Search);

    
    if(Search!=null)
    {
        document.getElementById("lista").innerHTML='';
        
       
                console.log("hola");
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    </div>`;
                    document.getElementById("lista").innerText=Search.main.temp + "°C";
       

    }

}    
