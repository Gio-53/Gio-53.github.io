let countCorrectAnswers = 0;
let countQuestions =0;
const includedArrayQuestions = [];
const numbers = []
const numQuestion = document.querySelector("span#num-question");
const fetchData = async () => {
    const query = await fetch('https://api.sampleapis.com/futurama/questions')  
    const jsonData = query;
    const data = await jsonData.json()
    return data;   
}

async function createQuestion(){
    const data = await fetchData()
    numQuestion.innerText ='Question: '+ (countQuestions+1)+'/5';
    //console.log(data);
    const container = document.querySelector("#question-container")
    if(data.error === 500) {
        container.append('Loading...')
        return}
    const alternativesContainer = document.querySelector("div#alternatives")
    const questionHeader = document.querySelector("h2.question-header")
    alternativesContainer.innerHTML = ''//só dá uma limpada no html antes de escrever a questão de novo
    btn.style.display='block';
    //como algumas questões parecem má formatadas (elas vem assim do fetch), vou limitar o máximo as questões que parecem normais, no caso 28 
    let randonQuestionNumber = Math.floor(Math.random() * (/*data.length*/ 27 - 0 + 1)) + 0;  
    console.log('n1 : ' + randonQuestionNumber);
    randonQuestionNumber = await pushArray(includedArrayQuestions, randonQuestionNumber)//ele vai retornar um valor a mais do que o planejado
    console.log('n2: ' + randonQuestionNumber);
    const randonQuestion = data[randonQuestionNumber]//futuramente quero criar uma lógica que evite que algumas questões se repitam, mas por ora vamos manter assim
    questionHeader.innerText = randonQuestion.question;
    for(let i=0; i<randonQuestion.possibleAnswers.length; i++){
        let optionContainer = document.createElement('div')
        let input = document.createElement('input')
        let value = randonQuestion.possibleAnswers[i]
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'alternatives');
        input.setAttribute('value', value);
        const id = value.replace(/\s+/g, '').replaceAll(',', "").replaceAll('.', '').replaceAll("'", "");//testei remover o espaço mas algumas alternativas são muito grandes
        //console.log(typeof(id));
        //console.log(parseInt(id))
        if(parseInt(id) !== NaN){//em alguns casos a resposta veio em numeros mas com formato de string então apenas adicionei uma string ao inicio
            input.setAttribute('id', 'id' + id);
            optionContainer.setAttribute('id', 'id'+ id);
        }
        else{
            input.setAttribute('id', id);
            optionContainer.setAttribute('id', id);
        }
        optionContainer.setAttribute('class', 'option-container')
        alternativesContainer.append(optionContainer);
        optionContainer.append(input);

        let span = document.createElement("span")
        optionContainer.append(span)
        span.setAttribute('for', value)
        span.innerText = value;
      
    } 
        
    questionHeader.setAttribute('id', randonQuestionNumber)
    const resposta = randonQuestion.correctAnswer;
    //vou colocar isso aqui dentro de um array, por enquanto é só teste 
} 
const btn = document.querySelector("#next");
const restartBtn = document.querySelector("button#restart-button")
const backBtn = document.querySelector("button#back")
btn.addEventListener('click', async (e)=>{
    /*options()*/
    const allOptions = document.querySelectorAll("input[type='radio']")
    const data = await fetchData()
    const questionHeader = document.querySelector("h2.question-header")
    const currentQuestion = data[questionHeader.id];//o id atribuito já é a posição do vetor
    const correctAnswer = currentQuestion.correctAnswer;
    let alternativaSelecionada = ''
    
    allOptions.forEach((element)=>{
        if(element.checked){
            console.log('selected option: ' + element.value);
            alternativaSelecionada = element.value;
            allOptions.forEach((element)=>{
            let cont = document.querySelector('div#'+element.id);//seleciona o elemento atual do foreach
            if(element.value === correctAnswer || parseInt(element.value) === correctAnswer){//aqui o valor chegava como string e o correct answer é um number, por isso usei o parse, se o valor for convertido e for igual a resposta a condição será atendida
                cont.style.border = '3px solid #019267'//green
                cont.style.outline =' 1px solid #f2f597'
                // $('#'+element.id).css({border: '3px', outline: '1px'});
            }else{
                cont.style.border = '3px solid #D80032'//red
                cont.style.outline =' 1px solid #f2f597'
            }})
        }
    })
    if(alternativaSelecionada === ''){window.alert("Selecione uma opção"); return}//Impede que o quiz seja deixado em branco
    if(alternativaSelecionada === correctAnswer ){
        //console.log("acertou " + alternativaSelecionada); 
        countCorrectAnswers+=1;
    }//aqui ele já está verificando se a resposta é correta, falta fazer uma adaptação que o torne adaptável
    // else{
        //     console.log('Eeeerrou rude');
        // }
        countQuestions+=1;
        
        if(countQuestions<5){
            btn.style.display='none';
            restartBtn.style.display = 'none'
            backBtn.style.display = 'none'
            setTimeout( async () =>{
                await options();
                numQuestion.innerText ='Question: '+ (countQuestions+1) +'/5';
            }, 2000)
        }else{
            btn.style.display='none';
            setTimeout( async () =>{
                const cont = document.querySelector("#question-container")
                cont.innerHTML=''
                const resContainer = document.createElement('div')
                resContainer.setAttribute('id', 'res-container')
                const h3 = document.createElement("h3")
                h3.innerText = `Good job! Correct answers: ${countCorrectAnswers}`//dá pra criar uma lógica que mude de acordo com o numero de acertos, mas por enquanto é isso
                resContainer.append(h3)
                const btnContainer = document.createElement("div")
                btnContainer.append(backBtn);
                btnContainer.append(restartBtn);
                resContainer.append(btnContainer)
                cont.append(resContainer)
                backBtn.style.display = 'block'
                restartBtn.style.display = 'block'
                
               //Aqui é pra criar um botão de voltar
                }, 2000)
        }
        })
const options = async ()=>{
    await createQuestion()
    function optionsForEach(optionsInputs){
        optionsInputs.forEach((optionInput)=>{//aqui é o outro forEach que verifica cada um dos elementos pra ver se estão marcados como checked ou não
            if(optionInput.checked){
                optionInput.classList.add('selected')
                optionInput.style.backgroundColor = '#0a1d56';
                optionInput.style.outline = '.05rem solid #0a1d56'
                optionInput.style.border= ".1rem solid #f2f597";
            }else{
                optionInput.classList.remove('selected')
                optionInput.style.backgroundColor = '#f2f597';
                optionInput.style.outline = 'none'
                optionInput.style.border = '1.6px solid #0a1d56'
           }
        
        })
        }   
    const optionsInputs = document.querySelectorAll("input[type='radio']")
    const optionsDivs = document.querySelectorAll(".option-container")
    optionsDivs.forEach((optionDiv)=>{//primeiro a gente faz um foreach pra conseguir acessar  o evento de click em cada um dos elementos
        optionDiv.addEventListener("click", ()=>{ //aqui é o evento de clique dentro do container e não diretamente no input
            //console.log(optionDiv.children[0]); 
            optionDiv.children[0].checked = true;//ele localiza o primeiro filho que no nosso caso é o input e marca como checked
            optionsForEach(optionsInputs)//aqui é o outro forEach que verifica cada um dos elementos pra ver se estão marcados como checked ou não
            //coloquei tudo dentro de uma função por conta da reutilização de código, pra evitar ficar repetindo código    
        })
    })
    optionsInputs.forEach((optionInput)=>{//primeiro a gente faz um foreach pra conseguir acessar  o evento de click em cada um dos elementos
        optionInput.addEventListener("click", ()=>{ //aqui é o evento de clique diretamente no input
            //console.log(optionInput.checked); 
            optionsInputs.forEach((optionInput)=>{//aqui é o outro forEach que verifica cada um dos elementos pra ver se estão marcados como checked ou não
                optionsForEach(optionsInputs)
            })
            
        })
    })
}
function restart(){
   window.location.reload()
}

function pushArray(arr, x){
    if(!arr.includes(x)){
        arr.push(x);
    return x;
    }else{
        if(x===27){
            pushArray(arr, 0)//se o valor de x for igual a 27, será o valor máximo do array, por isso a contagem será reiniciada    
            console.log(x);
            return   } 
        else if(x>27){
             console.log('Parece que todas questões já foram respondidas!');
             return
        }
    pushArray(arr, (x+1))//se o valor de x já existir no array, ele vai tentar adicionar a próxima posição do array
    return x+1;
    }
    //console.log(arr)
}
options()

//estou em duvida se uso o id ou a  posição do array
// function pushA(arr,x){
//     if(!arr.includes(x)){
//         arr.push(x)
//     }
//     console.log(arr)
// }essa é uma função de verificação se o array já possui um elemento, caso não possua esse elemento será adicionado ao array

//deve existir uma lógica que ao clicar na caixa e não necessariamente no input a opção também pode ser seelcionada, a lógica é proxima com o código abaixo
// el.children[0].checked = true
// let option = document.querySelectorAll(".option-container")


// const option1 = document.querySelector("#option1")
// const option2 = document.querySelector("#option2")
// const option3 = document.querySelector("#option3") 
// const option4 = document.querySelector("#option4")