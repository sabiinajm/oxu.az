const title = document.getElementById('title')
const img = document.getElementById('img')
const view = document.getElementById('view')
const desc = document.getElementById('description')

function handleSubmit(event) {
    event.preventDefault()
    const titleVal = title.value
    const imgVal = img.value
    const viewVal = view.value
    const descVal = desc.value
    if (titleVal.trim().length < 5 || titleVal.trim().length > 64) {
        return alert('titleinda sehv var')
    }

    const obj = {
        "title": titleVal,
        "img": imgVal,
        "view": viewVal,
        "description": descVal
    }
    fetch('https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            popup()
            NEWS.length = 0
            getAllData()
        })
}

const NEWS = []
function getAllData() {
    fetch("https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz")
        .then((response) => response.json())
        .then((data) => {
            NEWS.push(...data)
            showTable()
            showGallery()
        });
}


function deleteNews(id) {
    fetch(`https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz/${id}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            NEWS = NEWS.find(item => item.id != id)
            showTable()
            showGallery()
        })
}

const form = document.getElementById('form')
function editNews(id) {
    const element = NEWS.find(item => item.id == id)
    popup()
    title.value = element.title
    img.value = element.img
    desc.value = element.description
    view.value = element.view
    form.onsubmit = (e) => {
        e.preventDefault()
        handleEdit(id)
        popup()
    }
}

function handleEdit(id) {
    const titleVal = title.value
    const imgVal = img.value
    const viewVal = view.value
    const descVal = desc.value

    const obj = {
        "title": titleVal,
        "img": imgVal,
        "view": viewVal,
        "description": descVal
    }

    fetch(`https://6704e06b031fd46a830dbb27.mockapi.io/oxuaz/${id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            NEWS.length = 0
            getAllData()
        })
}

const tableContent = document.getElementById("tableContent")
function showTable() {
    if (tableContent) {
        tableContent.innerHTML = `
            <tr class="bg-slate-300">
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 border-b" > Title</ >
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 border-b">View</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 border-b">Delete</th>
            </tr > `
        NEWS.map(item => {
            tableContent.innerHTML += `
            
                <tr class="border-b">
                    <td class="py-2 px-4">${item.title}</td>
                    <td class="py-2 px-4">${item.description}</td>
                    <td class="py-2 px-4">${item.date}</td>
                    <td class="py-2 px-4">${item.view}</td>
                    <td class="py-2 px-4 text-center">
                    <i onclick='deleteNews(${item.id})' class="text-red-700 fa-solid fa-trash-can"></i>
                    <i onclick='editNews(${item.id})' class="text-primary-700 fa-solid fa-edit"></i>
                    </td>
                </tr>
                `
        })
    }
}

const gallery = document.getElementById("gallery")

function showGallery() {
    if (gallery) {
        gallery.innerHTML = ''
        NEWS.map(item => {
            gallery.innerHTML += `
                <div onclick="cardDetails(${item.id})" class="md:w-[85%] flex flex-col md:mx-auto ">
                    <img class="md:rounded-t-md w-full h-[260px] object-cover"
                        src="${item.img}"
                        alt="Taksi sürücüləri üçün növbəti imtahan keçirilib: 1 735 namizəd uğur qazanıb" width="300"
                        height="200">
                    <div class="flex-grow p-4 bg-gray-50 md:rounded-b-md">
                        <div class="flex justify-between py-4">
                            <h4 class="uppercase text-sm text-gray-500 font-bold"><i
                                    class="fa-regular fa-calendar-days"></i> ${item.date}</h4>
                            <h4 class="uppercase text-sm text-gray-500 font-bold pl-6"><i class="fa-solid fa-eye"></i> ${item.view}
                            </h4>
                        </div>
                        <h2 class="text-2xl text-[#051d39] font-semibold pt-2">${item.title}</h2>
                        <div class="flex py-4 justify-between items-center">
                            <h4 class="uppercase text-sm text-[#1894A0] font-bold">Ordu</h4>
                            <div class="flex gap-4 text-lg">
                                <p>
                                    <i class="fa-regular fa-thumbs-up pr-2"></i>
                                    <span class="text-gray-400 font-semibold">2</span>
                                </p>
                                <p>
                                    <i class="fa-regular fa-thumbs-down pr-2"></i>
                                    <span class="text-gray-400 font-semibold">1</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                `
        })
    }
}


function cardDetails(id) {
    const url = window.location.href
    const urlID = `${url}?id=${id}`;
    console.log(urlID);

    const item = NEWS.find(item => item.id == urlID);

    if (item) {
        document.querySelector('main').innerHTML = `
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        `;
    }
}

const menuSection = document.getElementById("menuSection")
const hamburger = document.getElementById("hamburger")
const removeTxt = document.querySelectorAll(".removeTxt")
function showMenu1() {
    if (menuSection.classList.contains('md:max-w-[320px]')) {
        menuSection.classList.remove('md:max-w-[320px]')
        menuSection.classList.add('md:max-w-[80px]')
        hamburger.style.justifyContent = 'center'
        hamburger.style.alignItems = 'center'
        menuSection.classList.add('transition-all', 'duration-300');
        removeTxt.forEach(item => {
            item.style.display = 'none';
            item.style.padding = '10px';
        })
    } else {
        menuSection.classList.add('transition-all', 'duration-300');
        menuSection.classList.remove('md:max-w-[80px]')
        menuSection.classList.add('md:max-w-[320px]')
        hamburger.style.justifyContent = 'space-between'
        removeTxt.forEach(item => {
            item.style.display = 'flex';
            item.style.padding = '16px';
        })
    }

}
function showMenu2() {
    menuSection.classList.toggle('hidden')
}

const showPopup = document.getElementById('showPopup')
function popup() {
    showPopup.classList.toggle('hidden')
    resetForm()
}
function preventClick(event) {
    event.stopPropagation();
}
getAllData()

function resetForm() {
    title.value = '';
    img.value = '';
    view.value = '';
    desc.value = '';
}