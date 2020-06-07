// Formulário

function populateUFs() {
    let ufSelect =  document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( let state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.sigla}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    let citySelect = document.querySelector("select[name=city]")
    let stateInput = document.querySelector("input[name=state]")

    let ufValue = event.target.value

    let indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        citySelect.innerHTML = "<option>Selecione a Cidade</option>"
        citySelect.disabled = true

        for( let city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta

let itemsToCollet = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

let collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    
    let itemLi = event.target

        // adicionar ou remover classe selected
    itemLi.classList.toggle("selected")

    let itemId = itemLi.dataset.id
 
    // verificar se existem items selecionados
    // se sim, pegá-los
    let alreadySelected = selectedItems.findIndex( item => {
        let itemFound = item == itemId // true ou false
        return itemFound
    })

    // // se já estiver selecionado,
    if( alreadySelected != -1 ) {
        // removê-lo
        let filteredItems = selectedItems.filter( item => {
            let itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else { // se não estiver selecionado,
             // adicioná-lo
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems   
}