const phoneHunting = async (searchtext=('13'), isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones, isShowAll)
}
const displayPhone = (phones, isShowAll) => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  // show all btn
  const showAllButton = document.getElementById('show-all-btn');

  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove('hidden');
  }
  else {
    showAllButton.classList.add('hidden')
  }

  // console.log('is show All', isShowAll)
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    // console.log(phone);
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-center">
                        <button onclick="clickShowDetails('${phone.slug}')"; class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  troggolLoadingSpinner(false);
}

// search heandler
const searchHandler = (isShowAll) => {

  troggolLoadingSpinner(true);
  const searchfeild = document.getElementById('search-feild');
  const searchText = searchfeild.value;
  console.log(searchText)
  phoneHunting(searchText, isShowAll);

}

const troggolLoadingSpinner = (isTure) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isTure) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden')
  }
}

const clickShowDetails = async (id) =>{
  // console.log('click',id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  // console.log(data);
  const phone = data.data;

  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{

  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;

  const showPhoneContainer = document.getElementById('show-phone-container');
  showPhoneContainer.innerHTML = `
   <img src="${phone.image}" alt="">
  `

  console.log(phone);
  show_deails_modal.showModal();
}

// show all hendler

const hendlerShowAll = () => {
  searchHandler(true);
}
phoneHunting()

