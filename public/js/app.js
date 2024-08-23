const list = [
    {   id:1,
        name: 'Deathadder V3 Faker',
        img:'deathadder-v3-faker-removebg-preview',
        price:1709
    },
    {   id:2,
        name: 'Lamzu Maya',
        img:'lamzu-maya-white-removebg-preview',
        price:989
    },
    {   id:3,
        name: 'X2A',
        img:'x2a-removebg-preview',
        price:890
    },
    {   id:4,
        name: 'Mouse Fnatic Edition',
        img:'Mouse-fnatic',
        price:1097
    },    
    {   id:5,
        name: 'Logitech G PRO', 
        img:'Gpro-Teclado',
        price: 645
    },
    {   id:6,
        name: 'Logitech Pop Keys Cosmos',
        img:'cosmo-teclado',
        price:649
    },
    {   id:7,
        name: 'Logitech g613',
        img:'g613',
        price:656
    },
    {
        id:8,
        name: 'Logitech g915',
        img:'g915',
        price:2309
    },
    {   
        id:9,
        name: 'Logitech G335',
        img:'G335-removebg-preview',
        price:599
    },
    {   
        id:10,
        name: 'Logitech G432',
        img:'G432-O-removebg-preview',
        price:599
    },
    {   id:11,
        name: 'Pro X 2 Lightspeed',
        img:'ProX-removebg-preview',
        price:599
    },
    {   id:12,
        name: 'Logitech G535',
        img:'G535-removebg-preview',
        price:599
    },

]


const eSelector = (element) => document.querySelector(element)
const eAllSelector = (element) => document.querySelectorAll(element)

let cardQt = 0
let cart = []
let cardKey = 0




const closeCart = () => eSelector('#cart').classList.remove('active')

list.map(({ img, price, name}, index) => {

const card = eSelector('.models .card').cloneNode('true')

card.querySelector('.card-img img').src = `./img/${img}.png`
card.querySelector('.card-title').innerHTML = name
card.querySelector('.card-price span ').innerHTML += price

card.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()
    cardQt = 1
    cardKey = index

    eSelector('.Big img').src = `./img/${img}.png`
    eSelector('.ModalInfo h1').innerHTML = name
    eSelector('.ModalInfo--actualPrice').innerHTML = `R$ ${price}`
    eSelector('.ModalInfo--qt').innerHTML = cardQt

    eSelector('.ModalWindowArea').style.opacity = 0;
    eSelector('.ModalWindowArea').style.display = 'flex';
        setTimeout(()=>{
            eSelector('.ModalWindowArea').style.opacity = 1;
        }, 200);
closeCart()     
})


eSelector('[data-products="produtos"]').append(card)
}  
)


const closeCard = () => {
eSelector('.ModalWindowArea').style.opacity = 0;
    setTimeout(()=>{
    eSelector('.ModalWindowArea').style.display = 'none'
    }, 200)
}

eAllSelector('.ModalInfo--cancelMobileButton, .ModalInfo--cancelButton').forEach(item => 
    item.addEventListener('click', closeCard)
)

eSelector('.ModalInfo--qtmenos').addEventListener('click', () => {
    if(cardQt > 1){
        cardQt--
        eSelector('.ModalInfo--qt').innerHTML = cardQt
    }

})
eSelector('.ModalInfo--qtmais').addEventListener('click', () => {
    cardQt++
    eSelector('.ModalInfo--qt').innerHTML = cardQt
})


eSelector('#cart-icon').addEventListener('click', () => 
    eSelector('#cart').classList.add('active'))

// eSelector('.checkout').addEventListener('click', closeCart)


const updateCart = () => {
cart.length === 0 
?eSelector('#cart').classList.remove('active')
:eSelector('#cart').classList.add('active')

cart.length > 0
?eSelector('#cart-icon #cart-item-count').style.display = 'flex'
:eSelector('#cart-icon #cart-item-count').style.display = 'none'

cart.length > 0
?eSelector('.empty-message').style.display = 'none'
:eSelector('.empty-message').style.display = 'block'

eSelector('.filled').innerHTML = ''

cart.map((item, index) => {
const arrayCart = list.find(item => item.id === cart[index].id)
const cartItens = eSelector('.models .cart--itens').cloneNode('true')


cartItens.querySelector('img').src = `./img/${arrayCart.img}.png`
cartItens.querySelector('.name').innerHTML = arrayCart.name
cartItens.querySelector('.qtd').innerHTML = cart[index].qt
cartItens.querySelector('.total').innerHTML = `R$ ${(arrayCart.price * cart[index].qt)}`
eSelector('#cart-icon #cart-item-count').innerHTML = cart.length
cartItens.querySelector('.delete').addEventListener('click', (e) => {

if(cart[index].id){
cart.splice(index, 1)
updateCart()

}
saveStorage()
})



localStorage.setItem('total', JSON.stringify(arrayCart.price * cart[index].qt))

eSelector('.filled').appendChild(cartItens)
})

}

eSelector('.ModalInfo--addButton').addEventListener('click', () => {

const identifier = list[cardKey].id+'@'+list[cardKey].id
const key = cart.findIndex( item => item.identifier === identifier)

key > -1 
? cart[key].qt += cardQt
:cart.push(
    {   
        identifier,
        id:list[cardKey].id,
        qt: cardQt
    })
updateCart()
closeCard()
saveStorage()
})

function saveStorage(){
    const filled = document.getElementsByClassName('filled')[0]
    const cartItens = filled.getElementsByClassName('cart--itens')
    const cartStorage = []


    for(let i = 0; i < cartItens.length; i++) {
    const cartItem = cartItens[i]
    const itemImg = cartItem.getElementsByClassName('imgCart')[0].src
    const itemName = cartItem.getElementsByClassName('name')[0]
    const itemPrice = cartItem.getElementsByClassName('total')[0]
    const itemQt = cartItem.getElementsByClassName('qtd')[0]


    const item = {
        name: itemName.innerHTML,
        price: itemPrice.innerHTML,
        qt: itemQt.innerHTML,
        img: itemImg 
    }

    cartStorage.push(item)
    }
localStorage.setItem('cartStorage', JSON.stringify(cartStorage))
}
