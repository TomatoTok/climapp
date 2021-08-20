const API_KEY = 'aeb8bd180dec44cdf47d259e1ac82a9d';

const fetchData = position => {
    const { latitude, longitude} = position.coords;
    fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+latitude+'&lon='+longitude+'&appid='+API_KEY)
    .then(response => response.json())
    .then(data => setClimaData(data))
}

const setClimaData = data =>{
    console.log(data);
    const climaData = {
        localidad: data.name,
        temperatura: data.main.temp,
        descripcion: data.weather[0].main,
        humedad: data.main.humidity,
        presion: data.main.pressure,
        fecha: obtenerFecha(),

    }
    Object.keys(climaData).forEach( key => {
        document.getElementById(key).textContent = climaData[key];
    });
    finLoad();
}

const finLoad = () =>{
    let contenido = document.getElementById('contenido');
    let load = document.getElementById('load');

    load.style.display = 'none';
    contenido.style.display = 'flex';
}
const obtenerFecha = () =>{
    let fecha = new Date();
    return  fecha.getDay()+'/'+( ('0'+(fecha.getMonth())).slice(-2) ) +'/'+fecha.getFullYear();
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);

}

