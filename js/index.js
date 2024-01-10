import {api} from "./api.js"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let arrApi = api.comics;
let comicId = $('#comic-id');
let comicName = $('.comic-name');
let title = $('title');
let webList = $('#web-list')
let openBox = $('#web-btn');
let webBack = $('#web-back');
/* ---------------------------------------------------------------------------- */
let listImg = $('#web-img > .web-col');
let itemInfor = $('#web-list');
let getRandom = Math.floor(Math.random() * arrApi.length);
let currentComic = arrApi[getRandom];
let imgLength = currentComic.imageLength;


function hanldeComics(){
	function renderComic(){
		title.innerText = "Reading: " + currentComic.nameComic;
		comicName.innerText = currentComic.nameComic;
		comicId.setAttribute('value', +getRandom + 1)
	} renderComic()
} hanldeComics();
function renderListComic(){

} renderListComic();

let listBox = $('.list_box');
	listBox.innerHTML = arrApi.map((item) => {
		return (`
		<div class="item_infor">
			<img src="img/${item.nameImage}/${item.nameImage} (1).jpg" alt="">
			<span>RC-${item.id}</span>
		</div>
		`)
	}).join('');
let webImg = $('#web-img');

function handleListBox(){
	let listBtn = $('.list_close');
	let listItems = $$('.list_box > .item_infor');
	listItems[getRandom].classList.add('choose');
	listItems.forEach((item, index) => {
		item.addEventListener('click', () => {
			let chooseComic = arrApi[index];
			$('.list_box > .item_infor.choose').classList.remove('choose');
			webBack.classList.toggle('close');
			item.classList.add('choose');
			// -------Them item vao cot recent list
			renderRecentComic(index);
			// webImg.removeChild(listImg);
			handleCurrentImg(chooseComic); 
			webList.classList.add('close');
		})
	})
} handleListBox();
// Xoa anh, va them the div moi------------------------------
function handleCurrentImg(cComic){
	let newLength = cComic.imageLength;
	let newListImg = document.createElement('div');
	let newHead = document.createElement('div');
	newListImg.className = "web-col";
	newHead.className = "extra-head";
	webImg.appendChild(newHead);
	webImg.appendChild(newListImg);
	title.innerText = "Extra: " + cComic.nameComic;
	newHead.innerText = "Extra: " + cComic.nameComic;
	newHead.id = cComic.nameImage;
	for (let i = 1; i <= newLength; i++){
		let img = document.createElement('img');
		img.src = 'img/'+ cComic.nameImage +'/'+ cComic.nameImage +' ('+ i + ').jpg';
		newListImg.appendChild(img);
	}
}
function renderImages(comic, length) {
	for (let i = 1; i <= length; i++){
		let img = document.createElement('img');
		img.src = 'img/'+ comic.nameImage +'/'+ comic.nameImage +' ('+ i + ').jpg';
		listImg.appendChild(img);
	}
}renderImages(currentComic, imgLength);
function handleBox(){
	
	openBox.addEventListener('click', () => {
		webList.classList.remove('close');
		webBack.classList.toggle('close');
		
	})
	let closeBox = $('.list_close');
	closeBox.addEventListener('click', () => {
		webList.classList.add('close');
		webBack.classList.toggle('close');

	})
} handleBox();

// Xu ly du lieu o cot recent comic---------------------------------------------------------
let boxRecentComic = $('#recent-comics');
let numValue = getRandom; 
renderRecentComic(numValue);
function renderRecentComic(numValue) {
	let aComic = document.createElement('a');
	aComic.setAttribute('class','recent-comic');
	boxRecentComic.appendChild(aComic);
	let imgComic = document.createElement('img');
	let nameComic = document.createElement('span');
	let inforComic = document.createElement('div');
	aComic.appendChild(imgComic);
	aComic.appendChild(nameComic);
	aComic.appendChild(inforComic);
	function insertValue() {
		let imgValue = 'img/'+ arrApi[numValue].nameImage +'/'+ arrApi[numValue].nameImage +' ('+ 1 + ').jpg'
		aComic.setAttribute('href', '#' +  arrApi[numValue].nameImage)
		imgComic.setAttribute('src', imgValue);
		nameComic.innerText = arrApi[numValue].nameComic;
		inforComic.innerText = 'RC-' + arrApi[numValue].idComic;
	} insertValue();
}
