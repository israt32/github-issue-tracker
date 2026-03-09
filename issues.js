let filterValue = 'all'
const parentCard = document.querySelector(".parent-card");


const filteredBtn = document.querySelectorAll(".filter-btn");
filteredBtn.forEach(item =>{
  item.addEventListener("click", ()=>{
     filteredBtn.forEach((item) => item.classList.remove("active"));
     item.classList.add("active");
     
    filterValue = item.value;
   
    filterOut(filterValue);
    updateCount()

})
})

function filterOut(value){

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

const counterDiv = document.getElementById("counter")

function updateCount(){
  countAllValue = dynamicData.length;
  counterDiv.textContent = `${countAllValue} Issues`;
  let filterOpen = [];
  let filterClosed = [];
   dynamicData.forEach(item =>{
    if(item.status === 'open'){
      filterOpen.push(item);
    }
    else if(item.status === 'closed'){
       filterClosed.push(item);
    }
  })
  countOpenValue = filterOpen.length;
  countClosedValue = filterClosed.length;

  if(filterValue === 'open'){
    counterDiv.textContent = countOpenValue;
  }
  else if(filterValue === 'closed'){
    counterDiv.textContent = countClosedValue;

  }
  else if(filterValue === 'all'){
    counterDiv.textContent = `${countAllValue} Issues`
  }
}


  //filter for single data
  async function sigleFilterData(id){
    try{
      let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
      if(!res.ok) throw new Error();
      let data = await res.json();
      // console.log(data.data);
      renderModal(data.data);
    }
    catch(err){
      console.log(err.message);
    }
  }

  // let newFilterData;
  async function loadFilterData (value){
    try{
      let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`);
      if(!res.ok)throw new Error();
      let data = await res.json();
      newFilterData = data.data;
      filterSearchValue(newFilterData);
      // console.log(data.data)
    }
    catch(err){
      console.log(err.message)
    }
  }

  function filterSearchValue(value){
  const query = value.trim().toLowerCase();
  let filterDataArr = dynamicData.filter(item => item.title.toLowerCase().includes(query)) || item.description.toLowerCase().includes(query);
  if(query.length > 0){
    renderCard(filterDataArr);
  } 
  else{
    renderCard(dynamicData);
  }

  } 

  let search = document.querySelector('#search');
  search.addEventListener('input', ()=>{
  const value = search.value;
  filterSearchValue(value);
  })

  async function loadData(id){
   parentCard.innerHTML = `<span class="loading loading-spinner loading-lg"></span>`;
   try{
    let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    if(!res.ok) throw new Error();
    let data = await res.json()
    // console.log(data.data)
    dynamicData = data.data;
    renderCard(dynamicData)
    updateCount()
    // renderModal(dynamicData)
  }
  catch(err){
    console.log(err.message)
  }
}




function renderCard(arr){
  parentCard.innerHTML = '';
  if(arr.length > 0){
    arr.forEach(item =>{
      const card = document.createElement("div");
      card.addEventListener('click',()=>{
        my_modal_1.showModal();
        sigleFilterData(item.id)
      })
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

const modalDiv = document.querySelector(".modal-span-div");

function renderModal(obj){
  modalDiv.innerHTML = "";  
    const modalCard = document.createElement("div");
    let modalh1 = document.createElement("h1");
    modalh1.textContent = obj.title;
    modalh1.style.color = '#1F2937';
    modalh1.style.fontSize = '24px';
    modalh1.style.fontWeight = 'bold';
    modalh1.style.marginBottom = '8px';
    modalCard.append(modalh1);
    modalDiv.append(modalCard);
    const statusDiv = document.createElement("div");
    const statusP = document.createElement("p");
    statusP.textContent = obj.status;
    // statusDiv.append(statusP);
    const statusAuthor = document.createElement("p");
    statusAuthor.textContent = `Opened by ${obj.author}`;
    statusAuthor.style.color = '#64748B';
    const statusDate = document.createElement("p");
    statusDate.textContent = obj.createdAt;
    statusDate.style.color = '#64748B';
    statusDiv.append(statusP);
    statusDiv.append(" | ");
    statusDiv.append(statusAuthor);
    statusDiv.append(" | ");
    statusDiv.append(statusDate);
    statusDiv.style.display = 'flex';
    statusDiv.style.alignItems = 'center' ;
    statusDiv.style.gap = '8px'
    if(obj.status === 'open'){
      statusP.style.backgroundColor = '#00A96E';
      statusP.style.padding = '4px 16px';
      statusP.style.borderRadius = '100px'
      statusP.style.color = 'white';
    }
    else if(obj.status === 'closed'){
       statusP.style.backgroundColor = '#A855F7';
      statusP.style.padding = '4px 16px';
      statusP.style.borderRadius = '100px'
      statusP.style.color = 'white';
    }
    
    
    
    modalCard.append(statusDiv)

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














