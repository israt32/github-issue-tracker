let filterValue = 'all'

const filteredBtn = document.querySelectorAll(".filter-btn");
filteredBtn.forEach(item =>{
  item.addEventListener("click", ()=>{
    filterValue = item.value;
    // console.log(filterValue)
    filterOut(filterValue);
  })
})

function filterOut(value){
  // console.log(value)
  const query = value.toLowerCase();
  filterArr = [];
  if(query === 'all'){
     renderCard(dynamicData);
  }
  else{
    for(const item of dynamicData){

      if(query === item.status.toLowerCase()){
        console.log(item.status)
        filterArr.push(item)
      }
    }
    renderCard(filterArr);
  }
}

let dynamicData;

async function loadData(){
  try{
    let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    if(!res.ok) throw new Error();
    let data = await res.json()
    // console.log(data.data)
    dynamicData = data.data;
    renderCard(dynamicData)
  }
  catch(err){
    console.log(err.message)
  }
}


const parentCard = document.querySelector(".parent-card");

function renderCard(arr){
  parentCard.innerHTML = '';
  if(arr.length > 0){
    arr.forEach(item =>{
      const card = document.createElement("div");
      const priorityDiv = document.createElement("div");
      const priorityP = document.createElement("p");
      priorityP.textContent = item.priority;
      priorityDiv.append(priorityP);
      if(priorityP.textContent === 'high'){

      }
      if(priorityP.textContent === 'medium'){

      }
      if(priorityP.textContent === 'low'){

      }
      card.append(priorityDiv)
      const h1 = document.createElement("h1");
      h1.textContent = item.title;
      card.append(h1);
      const p = document.createElement("p");
      p.textContent = item.description;
      card.append(p);
      const labels = item.labels
      labels.forEach(item=> {
       const span = document.createElement("span");
       span.textContent = item;
       card.append(span);
      })
      const hr = document.createElement("hr");
      card.append(hr)

      const author = document.createElement("p");
      author.textContent = `${item.id} by ${item.author}`;
      card.append(author);
      const date = document.createElement("p");
      date.textContent = item.createdAt;
      card.append(date)

      /// will do the border
      if(item.status === 'open'){
        
      }
      if(item.status === 'closed'){

      }


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