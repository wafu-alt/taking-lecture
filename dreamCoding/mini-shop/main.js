//Fetch the items from the JSON file
// json을 동적으로 읽어와서 item 받아오기

function loadItems() {
  // return fetch("data/data.json").then((response) => console.log(response)); 리스폰스에 body, header, status, url, 등이 들어가있음 원하는 정보는 body에 들어와있음
  // return fetch("data/data.json").then((response) =>
  //   console.log(response.json())
  // ); 프로미스가 반환되는데 [[PromiseResult]]: Object에 items정보가 들어가 있음
  return (
    fetch("data/data.json")
      .then((response) => response.json())
      // .then((json) => console.log(json)) // 깔끔한 items 정보 배열형식으로 받을 수 있음(제이슨 파일로 변환시킨거임)
      .then((json) => json.items)
  );
}

//Update the list with the given items
//items를 받아와서 html요소를 만들어서 html에 표기함
function displayItems(items) {
  const container = document.querySelector(".items");
  //ul.items는 아이템 목록형식으로 되어있는것을 선언해줌
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
  //json을 html li 변환할 것임
  //배열형태를 다른형태의 배열로 변환하는것을 맵핑하는 것을 맵을 이용
  //li 문자열 배열을 하나의 큰 문자열로 변환하는 것은 join을 이용(병합)
  const html = (container.innerHTML = items
    .map((item) => createHTMLString(item))
    .join(""));
  // console.log(html);
}

// create HTML list item from the given data item
// item을 받아와서 item을 li 태그로 만듦
function createHTMLString(item) {
  //스트링 템플릿 만들기 > 문자열 배열
  return ` 
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li> 
  `;
  //data.json에 보면 image=경로, type, gender, size 는 키에 해당함
}

//버튼 클릭 됬을때 처리하는 함수
function onButtonClick(event, items) {
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  //클릭이 될때 정보를 필터링을 해서 화면에 보여질 수 있도록
  if (key == null || value == null) {
    return; //해당하는 함수를 끝냄 (빈공간도 컨테이너라 클릭되면 정보가 입력됨)
  }

  //배열에서 특정한 데이터를 추출해서 새로운 배열 만들때는 필터
  const filtered = items.filter((item) => item[key] === value);
  //console.log(filtered);
  displayItems(filtered);
}

/*
//리스트를 업데이트해서 갈아끼우는것보다 해당하는 아이템을 보이게하고 아닌것을 숨기게 함
function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}

//html요소에 들어있는 아이템들을 해당하는 요소를 클래스를 이용하여 보여지고 안보여지고 하게 함
function updateItems(items, key, value) {
  items.forEach(item => {
    if(item.dataset.[key] === value){
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }

  });
}


*/

//버튼이 클릭 되었을 때 동작
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  //이벤트위임. 컨테이너에 담아 한곳에서 컨트롤함
  logo.addEventListener("click", () => displayItems(items));
  //로고 선택되면 모든 아이템이 보이게 함
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
  //버튼클릭 되면 이벤트 처리
}

//main
// json을 동적으로 읽어와서 item 전달
// 프로미스가 리턴이 되면 > html에 아이템을 보여주고, 버튼을 클릭했을때 필터링 되게함

loadItems() /* 1.loaditems로 items을 동적으로 받아옴 */
  .then((items) => {
    // console.log(items);

    displayItems(items);
    /* 2. 받아온 items을 displayitems함수에 items를 호출해서 함수 안에서 const container 변수에 inner.HTML로 업데이트 함  업데이트는 받아온 items 오브젝트를 li배열 문자열로 변환하고 그것을 하나의 문자열로 합침 */

    setEventListeners(items);
  })
  .catch(console.log);
