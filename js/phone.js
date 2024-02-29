const phoneHunting = async (searchtext) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones)
}
const displayPhone = phones => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // show all btn
    const showAllButton = document.getElementById('show-all-btn');

    if(phones.length >  12){
      showAllButton.classList.remove('hidden');
    }
    else{
      showAllButton.classList.add('hidden')
    }

    phones = phones.slice(0,12);

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

// search heandler
const searchHandler = () =>{
  const searchfeild =  document.getElementById('search-feild');
  const searchText = searchfeild.value;
  console.log(searchText)
  phoneHunting(searchText);

}

// phoneHunting()

