//------------------------------------------------------------------------------------------------------------------------------------------------------------//
const table1 = {
    size : 7,
    feketecellak : ['0_3', '1_1', '1_5', '3_0','3_3', '3_6', '5_1', '5_5', '6_3'],
    feketeszama : [1,0,2,'','','','',2,3],
    megoldas : ['6_2', '5_3', '6_4', '5_6', '4_5', '1_6', '0_5', '1_3', '5_0', '0_0', '3_1']
}

const table2 =  {
    size : 7,
    feketecellak : ['0_2', '0_4', '2_0', '2_2','2_4', '2_6', '3_3', '4_0', '4_2','4_4', '4_6', '6_2', '6_4'],
    feketeszama : [0,'','','',3,'',1,2,'','','','',2],
    megoldas : ['0_0', '0_6', '1_4', '2_3', '2_5', '3_0', '3_6', '4_1', '5_4', '6_0', '6_3', '6_6']
}

const table3 =  {
    size : 10,
    feketecellak : ['0_1', '1_5', '1_7', '1_9','2_1', '2_2', '2_7', '3_4', '4_1', '4_4','4_5', '4_6', '5_3', '5_4', '5_5', '5_8', '6_5', '7_2', '7_7', '7_8', '8_0', '8_2', '8_4', '9_8'],
    feketeszama : ['',3,2,'',0,'','','',1,'',1,'','','','',3,'',1,0,'',3,'',0,0],
    megoldas: ['9_0', '8_1', '7_0', '7_3', '6_4', '8_6', '6_8', '5_7', '5_9', '1_8', '1_6', '0_5', '1_4', '4_2', '3_3', '3_5']
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------//
//console.log(JSON.stringify(table1))
//console.log(JSON.parse(JSON.stringify(table1)))

megoldott = false
aktiv_tabla = {}
vilagitottak = []
valasztott = ''

function vilagit(id, szin){
    x = parseInt(id[0])
    y = parseInt(id[2])

    kozponti_elem = document.getElementById('' + x + '_' + y)

    let balb = true
    let jobbb = true
    let felb = true
    let leb = true
    let i = 1

    while(balb || jobbb || felb ||leb){
        if(balb){
            if(document.getElementById('' + x + '_' + (y-i)) && document.getElementById('' + x + '_' + (y-i)).className != "fekete"){
                let bal_element = document.getElementById('' + x + '_' + (y-i))
                if(bal_element.innerHTML == '💡'){
                    bal_element.style.backgroundColor = 'red'
                    kozponti_elem.style.backgroundColor = 'red'
                }else{
                    bal_element.style.backgroundColor = szin
                }
            }else{
                balb = false
            }
        }
        if(jobbb){
            if(document.getElementById('' + x + '_' + (y+i)) && document.getElementById('' + x + '_' + (y+i)).className != "fekete"){
                let jobb_element = document.getElementById('' + x + '_' + (y+i))
                if(jobb_element.innerHTML == '💡'){
                    jobb_element.style.backgroundColor = 'red'
                    kozponti_elem.style.backgroundColor = 'red'
                }else{
                    jobb_element.style.backgroundColor = szin
                }
            }else{
                jobbb = false
            }
        }
        if(felb){
            if(document.getElementById('' + (x-i) + '_' + y) && document.getElementById('' + (x-i) + '_' + y).className != "fekete"){
                let fel_element = document.getElementById('' + (x-i) + '_' + y)
                if(fel_element.innerHTML == '💡'){
                    fel_element.style.backgroundColor = 'red'
                    kozponti_elem.style.backgroundColor = 'red'
                }else{
                    fel_element.style.backgroundColor = szin
                }
            }else{
                felb = false
            }
        }
        if(leb){
            if(document.getElementById('' + (x+i) + '_' + y) && document.getElementById('' + (x+i) + '_' + y).className != "fekete"){
                let le_element = document.getElementById('' + (x+i) + '_' + y)
                if(le_element.innerHTML == '💡'){
                    le_element.style.backgroundColor = 'red'
                    kozponti_elem.style.backgroundColor = 'red'
                }else{
                    le_element.style.backgroundColor = szin
                }
            }else{
                leb = false
            }
        }
        i++ 
    }
    if(szin == "white"){
        vilagitottak = vilagitottak.filter(x => x != id);
        console.log(vilagitottak)
        for(let i = 0; i < vilagitottak.length; i++){
            cella = document.getElementById(vilagitottak[i])
            cella.style.backgroundColor = "yellow"
            vilagit(vilagitottak[i], "yellow")
        }
    }
}

function szomszedok_ellenorzese(id, feketeszama){
    x = parseInt(id[0])
    y = parseInt(id[2])

    let szomszedos_villanykortek = 0
    let main_element = document.getElementById('' + x + '_' + y)
    let bal_element = document.getElementById('' + x + '_' + (y-1))
    let jobb_element = document.getElementById('' + x + '_' + (y+1))
    let fel_element = document.getElementById('' + (x-1) + '_' + y)
    let le_element = document.getElementById('' + (x+1) + '_' + y)

    if(bal_element && bal_element.innerHTML == '💡'){
        szomszedos_villanykortek++
    }
    if(jobb_element && jobb_element.innerHTML == '💡'){
        szomszedos_villanykortek++
    }
    if(fel_element && fel_element.innerHTML == '💡'){
        szomszedos_villanykortek++
    }
    if(le_element && le_element.innerHTML == '💡'){
        szomszedos_villanykortek++
    }

    if(szomszedos_villanykortek == feketeszama){
        main_element.style.color = "green"
    }else{
        main_element.style.color = "white"
    }
}

function fekete_ellenorzese(){
    for(let i = 0; i < aktiv_tabla.feketecellak.length; i++){
        if(aktiv_tabla.feketeszama[i] !== ''){
           szomszedok_ellenorzese(aktiv_tabla.feketecellak[i], aktiv_tabla.feketeszama[i])
        }
    }
}

function egyenlo(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every(element => {
        if (array2.includes(element)) {
          return true;
        }
  
        return false;
      });
    }
  
    return false;
  }

function kattintas(e){
    let td = e.target;
    if(td.className != 'fekete'){
        if(td.innerHTML == '💡'){
            td.innerHTML = '';
            td.style.backgroundColor = "white"
            vilagit(td.id, "white")
        }else{
            td.innerHTML = '💡';
            td.style.backgroundColor = "yellow"
            vilagit(td.id, "yellow")
            vilagitottak.push(td.id)
        }
    }
    fekete_ellenorzese()
    if(egyenlo(vilagitottak,aktiv_tabla.megoldas)){
        var eredmenyjelzo = document.getElementById('eredmenyjelzo')
        var ujragomb = document.getElementById('ujrakezdes')
        var jatekos_nev = document.getElementById('name').value
        vilagitottak = []
        eredmenyjelzo.innerHTML = 'GRATULÁLOK, megfejtetted a király problémáját'
        document.querySelector('#tabla').removeEventListener('click', kattintas, false);
        ujragomb.style.visibility = 'visible';
        stop()

        azon = '' + jatekos_nev + ' - ' + valasztott + ' - ' + stopwatch.innerText
        
        befejezettek = JSON.parse(localStorage.getItem("befejezett"))
        befejezettek.push(azon)
        localStorage.setItem("befejezett", JSON.stringify(befejezettek))

        lista_frissites()
    }
}

function lista_frissites(){
    var korabbi_lista = document.getElementById("befejezett_jatekok")
    korabbi_lista.innerHTML = ''

    lista = JSON.parse(localStorage.getItem("befejezett"))
    for(key in lista){
        const entry = document.createElement('li');
        entry.appendChild(document.createTextNode(lista[key]));
        korabbi_lista.appendChild(entry);  
    }
}

function tablaGen(n){
    let k = 0
    let s = ''
    for(let i = 0; i < n; i++){
        s += '<tr>'
        for(let j = 0;j < n; j++){
            keres_id = '' + i + '_' + j + ''
            if(aktiv_tabla.feketecellak.includes(keres_id)){
                s += '<td id="'+ i + '_' + j + '"class=fekete>'+ aktiv_tabla.feketeszama[k] +'</td>'
                k += 1
            }
            else{
                s += '<td id="'+ i + '_' + j + '"></td>'
            }
        }
        s += '</tr>'
    }
    document.querySelector('#tabla').innerHTML = s
}

function mehet(){
    var jatekos_nev = document.getElementById('name').value
    var valasztas = document.getElementsByName('valaszto')
    var jatekosnev_mezo = document.getElementById('jatekos')
    for(let i = 0; i < valasztas.length; i++){
        if(valasztas[i].checked){
            valasztott = valasztas[i].value
        }
    }
    if(valasztott == "7x7 Könnyű"){
        aktiv_tabla = table1
        tablaGen(aktiv_tabla.size)
    } else if(valasztott == "7x7 Haladó"){
        aktiv_tabla = table2
        tablaGen(aktiv_tabla.size)
    } else if(valasztott == "10x10 Extrém"){
        aktiv_tabla = table3
        tablaGen(aktiv_tabla.size)
    }
    
    jatekosnev_mezo.innerHTML = 'Játékos: ' + jatekos_nev
    var ora = document.getElementById('ora')
    ora.style.visibility = 'visible'
    ido()
    document.querySelector('#mehet').removeEventListener('click', mehet, false);
}

function ujra(){
    var ora = document.getElementById('ora')
    var jatekosnev_mezo = document.getElementById('jatekos')
    var eredmenyjelzo = document.getElementById('eredmenyjelzo')
    var ujragomb = document.getElementById('ujrakezdes')
    document.getElementById('myform').reset()
    ora.style.visibility = 'hidden'
    jatekosnev_mezo.innerHTML = ''
    eredmenyjelzo.innerHTML = ''
    ujragomb.style.visibility = 'hidden'
    document.querySelector('#tabla').innerHTML = ''
    document.querySelector('#tabla').addEventListener('click', kattintas, false);
    document.querySelector('#mehet').addEventListener('click', mehet, false);
    reset()
}

//-----------------------------------------------------------------------------------------------------------------------------------------//
let seconds = 0;
let interval = null;

function timer(){
	seconds++;

	let hrs = Math.floor(seconds / 3600);
	let mins = Math.floor((seconds - (hrs * 3600)) / 60);
	let secs = seconds % 60;

	if (secs < 10) secs = '0' + secs;
	if (mins < 10) mins = "0" + mins;
	if (hrs < 10) hrs = "0" + hrs;

	stopwatch.innerText = `${hrs}:${mins}:${secs}`;
}

function start(){
	if(interval){
	    return
	}
	interval = setInterval(timer, 1000);
}

function stop(){
	clearInterval(interval);
	interval = null;
}

function reset () {
	stop();
	seconds = 0;
	stopwatch.innerText = '00:00:00';
}

function ido(){    
    var stopwatch = document.getElementById('stopwatch').innerHTML;
    console.log(stopwatch)
    start()
}

//--------------------------------------------------------------------------------------------------------------------------------

function kilepes(){
    var ora = document.getElementById('ora')
    var jatekosnev_mezo = document.getElementById('jatekos')
    var eredmenyjelzo = document.getElementById('eredmenyjelzo')

    document.getElementById('myform').reset()
    ora.style.visibility = 'hidden'
    jatekosnev_mezo.innerHTML = ''
    eredmenyjelzo.innerHTML = ''
    vilagitottak = []
    document.querySelector('#tabla').innerHTML = ''
    document.querySelector('#mehet').addEventListener('click', mehet, false);
    document.querySelector('#tabla').addEventListener('click', kattintas, false);
    document.querySelector('#mehet').addEventListener('click', mehet, false);
    reset()
}

function init(){
    if(localStorage.getItem("befejezett")){
        lista_frissites()
    }else{
        befejezettek = []
        localStorage.setItem("befejezett", JSON.stringify(befejezettek))
    }

    document.querySelector('#tabla').addEventListener('click', kattintas, false);
    document.querySelector('#mehet').addEventListener('click', mehet, false);
    document.querySelector('#ujrakezdes').addEventListener('click', ujra, false);
    document.querySelector('#kilepes').addEventListener('click', kilepes, false);
}

window.addEventListener('load', init, false)