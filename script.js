const checkButtons = [...document.querySelectorAll(".checkButtons")]
const Labels = [...document.querySelectorAll(".Labels")]
const Tbody = document.getElementById("Tbody")
const Form = document.getElementById("Form")
const btnEnviar = document.getElementById("EnviarCompra")
const QtdAtual = [...document.querySelectorAll(".QTDatual")]
let precoFinal = document.getElementById("precoFinal")
const precosTable = [...document.querySelectorAll(".precosTable")]


// relacionando o id da label e aos ids dos inputs
Labels.map((el, indice) => {
    el.setAttribute('for', `produto${indice}`)
})

checkButtons.map((el, indice) => {
    el.id = `produto${indice}`              // adicionando o id aos inputs
    el.addEventListener("click", () => {
        let trow = document.createElement("tr")     // criando a linhas dos produtos marcados
        let tdados = document.createElement("td")   // criando a célula dos produtos marcados
        let tdInput = document.createElement("td")  // criando o a célula do input dos produtos marcados
        let inputQtd = document.createElement("input")  // criando o input para adicionar a quantidade
        inputQtd.type = "number"        // define o tipo do input como number
        inputQtd.classList.add("inputQTD")      // adiciona a classe inputQTD aos inputs marcados
        inputQtd.min = 1
        inputQtd.value = 1
        if (el.checked) {
            inputQtd.setAttribute('name', `F_produto${indice}`)     // adicionando o name aos produtos
        }
        let produtos = [Labels[indice].textContent]     // pega o textos das labels dos inputs que estão marcados
        if (el.checked) {
            tdados.innerHTML = produtos

            Tbody.appendChild(trow)     // adiciona o tr ao Tbody
            trow.appendChild(tdados)    // adiciona as celulas na linha da tabela
            trow.appendChild(tdInput)   // adiciona os inputs na linha da tabela
            tdInput.appendChild(inputQtd)

        }
        el.addEventListener("click", () => {        // ação de desmarcar
            if (Tbody.contains(trow)) {      // se trow existir em Tbody ele executa o código
                Tbody.removeChild(trow)
                trow.removeChild(tdados)
            }
        })
    })
})

btnEnviar.addEventListener("click", () => {
    setTimeout(() => {      // Função para pegar os inputs que foram marcados depois do carregamento da página
        if (document.querySelectorAll(".inputQTD").length <= 0) {       // verificação se pelo menos um produto será comprado
            alert("Selecione pelo menos um produto para finalizar a compra")
        } else {
            const input_qtd = [...document.querySelectorAll(".inputQTD")]   // pega os inputs marcados
            input_qtd.map((el) => {

                let indice = el.name.charAt(el.name.length - 1)     // pega o indice de acordo com o name ex: se o terceiro checkbutton foi marcado indice = 2, porque o name = F_produto2

                if (Number(el.value) > Number(QtdAtual[indice].textContent)) {          // verifica se o valor a ser comprado é maior do que a quantidade atual do estoque
                    alert("Quantidade de produtos excedida!")
                    return false
                } else {
                    Form.submit()           // se tudo estiver correto o formulário é enviado
                }
            })
        }
    }, 0)
})

setInterval(() => {
    // Preço final
    const input_qtd = [...document.querySelectorAll(".inputQTD")]
    const precos = [1.00, 1.50, 4.00, 7.25, 3.75, 6.00, 8.00, 7.00]
    precosTable.map((elem, indice) => {
        elem.innerHTML = precos[indice].toFixed(2)      // adiciona o preço de cada produto na tabela
    })
    let valor = 0
    input_qtd.map((ele) => {
        let indice = ele.name.charAt(ele.name.length - 1)
        valor += Number(ele.value) * Number(precos[indice])
    })
    precoFinal.innerHTML = `Preço: R$ ${valor.toFixed(2)} reais`
}, 0)