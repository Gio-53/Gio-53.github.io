const n1 = document.querySelector("input")
const select1 = document.querySelector("#select1")
const quote = document.querySelector("#quote")
let arrData = []
const fetchData = async() => {
    const res = await fetch(`https://api.sampleapis.com/futurama/characters`)
    const data = await res.json()
    //console.log(data);
    return data
}
const selectGenerator = async()=>{
    const data = await fetchData()
    let options = ''
    data.forEach(element=> {
       options+=`<option value="${element.id}">${element.name.first + " " + element.name.middle + " " + element.name.last}</option>`
       arrData.push(element.age)
    });
    select1.innerHTML=options;
    //console.log(arrData);
}
const randomQuotes = async(data, id)=>{
    const qtdSayings = data[id].sayings.length;
    quote.innerText = `"${data[id].sayings[getRandomNumber(0, qtdSayings-1)]}"` //esse bloco retorna o numero de falas que o personagem possui*/
}
async function busca(x){
    const data = await fetchData()
    //let id= 0//9
    //uma breve explicação, caso o valor de data esteja vazio, ele será por padrão os valores de fry
    if(!x){
        id=0;
        randomQuotes(data, id);
        setInterval(() => {
            randomQuotes(data, id);
        }, 30000);
        
    }else{
        id=x;
        randomQuotes(data, id);
        setTimeout(() => {
            randomQuotes(data, id);
        }, 30000);
        /*setInterval(()=>{
        randomQuotes(data, id);
        }, 6000);*/
    };
    const currentData = data[id]; 
    const name = currentData.name.first + " " + currentData.name.middle + " " + currentData.name.last
    const container = document.querySelector("div#character");
    const figureImage = document.querySelector("#photo")
    const paragrafro = document.querySelector("#photoFigure")
    //figureImage.src = currentData.images.main
    paragrafro.innerText = name
    const planet = document.querySelector("#homePlanet");
    if(currentData.homePlanet){
    planet.innerText = currentData.homePlanet}
    else{
        planet.innerText = 'Unknown'
    }
    const especie = document.querySelector("#species")
    especie.innerText = currentData.species
    const idade = document.querySelector("#age");
    idade.innerText = currentData.age
    const genero = document.querySelector("#gender");
    genero.innerText = currentData.gender    
    const job = document.querySelector('#occupation')
    job.innerText = currentData.occupation
    if(currentData.occupation === "")job.innerText = 'Unknown'
    figureImage.src =data[id].images.main; 
    figureImage.alt = "Futurama character: " + name;
    paragrafro.innerText = name;
    //console.log(data[id].name);
}
const button = document.querySelector('button')
// button.addEventListener('click', async ()=>{
//     await busca(select1.value-1)
// })
select1.addEventListener('change',async()=>{
    quote.innerText = ''
    await busca(select1.value-1)//ele está fazendo a busca com base no valor de id que é informado na primeira busca
})
async function infoSerie(){
    /*const res = await fetch(`https://api.sampleapis.com/futurama/info`)
    const dataJson = await res.json()
    const data = dataJson[0]//vem um unico objeto dentro de um array*/
    const data = {
        "synopsis": "Philip J. Fry is a 25 year old delivery boy living in New York City who is cryogenically frozen on New Year's 1999 for 1000 years, where he wakes up in New New York City on December 31, 2999. There, he meets Turanga Leela, a tough but loving, beautiful one-eyed alien; and Bender, an alcohol-powered bending robot who is addicted to liquor, cigars, stealing, amongst other things. Eventually, they all meet up with Fry's Great, Great, Great, etc... Nephew, Hubert J. Farnsworth. Farnsworth is a very old man who is a genius but is very senile and forgetful. Fry, Leela, and Bender wind up working for Farnsworth's Planet Express Delivery Service. They then meet their co-workers; Amy Wong, who is a Martian intern who comes from a rich family, but is still a human who is very hip. Also, there is Hermes Conrad, who manages the delivery service and is pretty strict. Hermes seems Jamaican in voice and look. And finally, there's Dr. John Zoidberg, a lobster-like alien who is the crew's doctor. Unfortunately, he knows nothing about humans. Fry, Leela, Bender, and sometimes Amy and Dr. Zoidberg travel around the universe risking life and limb delivering packages and performing charitable tasks for tax deductions.",
        "yearsAired": "1999–2013",
        "creators": [
          {
            "name": "David X. Cohen",
            "url": "http://www.imdb.com/name/nm0169326"
          },
          {
            "name": "Matt Groening",
            "url": "http://www.imdb.com/name/nm0004981"
          }
        ],
        "id": 1
      }//como o json retornado é bem curto eu colei pra ele fazer uma requisição a menos, mas o bloco do fetch está acima caso seja necessário
    //console.log(data);
    const synopsis = document.createElement("p")
    synopsis.innerText = data.synopsis;
    const infoSerie = document.querySelector("#info-serie")
    infoSerie.append(synopsis)
    const yAired = document.createElement("h2")
    yAired.innerText = 'Years Aired: ' + data.yearsAired
    infoSerie.append(yAired)
    const creators = document.createElement("h2")
    creators.innerText = 'Created by: '
    const ul = document.createElement("ul")
    data.creators.forEach((creator)=>{
        const li = document.createElement('a')
        //const a = document.createElement('a')
        li.innerText = creator.name
        li.href = creator.url
        li.target = '_blank';
        ul.append(li)
    })
    infoSerie.append(creators)
    infoSerie.append(ul)
}
async function load(){
await selectGenerator()
await infoSerie()
await busca()
}

load()
// Função para gerar um número aleatório dentro de um intervalo específico
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
