let filteredArr = 'all'

let filteredBtn = document.querySelectorAll(".filter-btn");
filteredBtn.forEach(item =>{
  item.addEventListener("click", ()=>{
  // filteredOut(filteredArr);
  })
})




async function loadData(){
  try{
    let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    if(!res.ok) throw new Error();
    let data = await res.json()
    // console.log(data.data)
    renderCard(data.data)
  }
  catch(err){
    console.log(err.message)
  }
}


let parentCard = document.querySelector(".parent-card");

function renderCard(arr){
  parentCard.innerHTML = '';
  if(arr.length > 0){
    arr.forEach(item =>{
      let card = document.createElement("div");
      let h1 = document.createElement("h1");
      h1.textContent = item.title;
      card.append(h1);
      let p = document.createElement("p");
      p.textContent = item.description;
      card.append(p);
      let labels = item.labels
      labels.forEach(item=> {
       let span = document.createElement("span");
       span.textContent = item;
       card.append(span);
      })
      let hr = document.createElement("hr");
      card.append(hr)

      let author = document.createElement("p");
      author.textContent = `${item.id} by ${item.author}`;
      card.append(author);
      let date = document.createElement("p");
      date.textContent = item.createdAt;
      card.append(date)


      parentCard.append(card)
    })
  }
}






loadData();



















// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }