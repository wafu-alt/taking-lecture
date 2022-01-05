//Fetch the items from the JSON file
// json을 동적으로 읽어와서 item 받아오기

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => console.log(json));
}

fetch("data/data.json")
  .then((response) => response.json())
  .then((json) => console.log(json));

//main
// json을 동적으로 읽어와서 item 전달
// 프로미스가 리턴이 되면 > html에 아이템을 보여주고, 버튼을 클릭했을때 필터링 되게함

loadItems()
  .then((items) => {
    // displayItems(items);
    // setEventListeners(items);
  })
  .catch(console.log);
