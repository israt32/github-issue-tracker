let filterValue = 'all'
const parentCard = document.querySelector(".parent-card");
parentCard.style.backgroundColor = '#FBFBFB';
parentCard.style.padding = '24px';




const trackP = document.querySelector("p");
trackP.textContent = "Track and manage your project issues";


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
    counterDiv.textContent = `${countOpenValue} Issues`;
  }
  else if(filterValue === 'closed'){
    counterDiv.textContent = `${countClosedValue} Issues`;

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
   parentCard.innerHTML = `<div class="col-span-4 flex justify-center py-10"><span class="loading loading-spinner loading-xl"></span></div>`;
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
      card.style.padding = '16px';
      card.style.borderRadius = '4px';
      card.style.backgroundColor = 'white';
      card.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      card.style.borderRadius = '4px';
      const img = document.createElement("img");
      img.alt = "User";
     

      card.addEventListener('click',()=>{
        my_modal_1.showModal();
        sigleFilterData(item.id)
      })
      const priorityDiv = document.createElement("div");
      priorityDiv.style.display = 'flex';
      priorityDiv.style.justifyContent  = 'space-between';
      priorityDiv.style.alignItems   = 'center';
      priorityDiv.style.marginBottom = '12px';
      const priorityP = document.createElement("p");
       if(item.status === 'open'){
        card.style.borderTop = "5px solid #00A96E";
        img.src = "./assets/Open-Status.png";
       }
       else if(item.status === 'closed'){
       card.style.borderTop = "5px solid #A855F7";
       img.src = "./assets/Closed- Status .png";
       }
      priorityDiv.append(img);
      priorityDiv.append(priorityP);
      if(item.priority === 'high'){
     priorityP.textContent = 'HIGH';
     priorityP.style.backgroundColor = '#FEECEC';
     priorityP.style.borderRadius = '50px';
     priorityP.style.padding = '2px 31px';
     priorityP.style.color = '#EF4444';
     priorityP.style.width = '100px'
     
      }
      if(item.priority === 'medium'){
     priorityP.textContent = 'MEDIUM';
     priorityP.style.backgroundColor = '#FFF6D1';
     priorityP.style.borderRadius = '50px';
     priorityP.style.padding = '2px 18px';
     priorityP.style.color = '#F59E0B';
     priorityP.style.width = '100px'
      }
      if(item.priority === 'low'){
     priorityP.textContent = 'LOW';
     priorityP.style.backgroundColor = '#EEEFF2';
     priorityP.style.borderRadius = '50px';
     priorityP.style.padding = '2px 32px';
     priorityP.style.color = '#9CA3AF';
     priorityP.style.width = '100px'
      }
      card.append(priorityDiv)
      const h1 = document.createElement("h1");
      h1.textContent = item.title;
      h1.style.fontWeight = '600';
      h1.style.color = '#1F2937';
      card.append(h1);
      const p = document.createElement("p");
      p.textContent = item.description;
      p.style.color = '#64748B';
      p.style.fontSize = '12px';
      card.append(p);
      const labels = item.labels
      let highlightDiv = document.createElement("div");
      highlightDiv.style.display = 'flex';
      highlightDiv.style.gap = '8px';
      highlightDiv.style.margin = '12px 0'
      labels.forEach(item=> {
       const spanP = document.createElement("p");
       spanP.textContent = item;
       spanP.style.backgroundColor = '#FFF8DB';
       spanP.style.padding = '2px 16px';
       spanP.style.borderRadius = '50px';
       spanP.style.color = '#D97706'
       highlightDiv.append(spanP);
       card.append(highlightDiv)
      })
      const hr = document.createElement("hr");
      hr.style.border = "none";
      hr.style.height = "1px";
      hr.style.backgroundColor = "#E4E4E7";
      hr.style.margin = '16px 0'
      card.append(hr)

      const author = document.createElement("p");
      author.textContent = `${item.id} by ${item.author}`;
      author.style.color = '#64748B';
      card.append(author);
      const date = document.createElement("p");
      date.textContent = item.createdAt;
      date.style.color = '#64748B';
      card.append(date)

    

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
    statusAuthor.style.fontSize = '14px';
    const statusDate = document.createElement("p");
    statusDate.textContent = obj.createdAt;
    statusDate.style.color = '#64748B';
    statusDate.style.fontSize = '14px';
    statusDiv.append(statusP);
    statusDiv.append(" | ");
    statusDiv.append(statusAuthor);
    statusDiv.append(" | ");
    statusDiv.append(statusDate);
    statusDiv.style.display = 'flex';
    statusDiv.style.alignItems = 'center' ;
    statusDiv.style.gap = '8px';
    statusDiv.style.marginBottom = '24px';
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
    
    let labels = obj.labels;
    let highlightDiv = document.createElement("div");
    highlightDiv.style.display = 'flex';
    highlightDiv.style.gap = '8px'
    labels.forEach(item=>{
       const span = document.createElement("span");
       span.textContent = item;
       span.style.backgroundColor = '#D97706';
       span.style.fontWeight = '500';
       span.style.borderRadius = '50px';
       span.style.padding = '2px 8px';
       highlightDiv.append(span);
    })
    
    modalCard.append(statusDiv)
    modalCard.append(highlightDiv)

    const descriptionP = document.createElement("p");
    descriptionP.textContent = obj.description;
    descriptionP.style.color = '#64748B';
    descriptionP.style.margin = '24px 0';
    modalCard.append(descriptionP)

    const bottomDiv = document.createElement("div");
    bottomDiv.style.padding = '16px';
    bottomDiv.style.backgroundColor = '#F8FAFC';
    bottomDiv.style.display = 'flex';
    bottomDiv.style.justifyContent = 'space-between';

    const assigneeDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = 'Assignee:';
    h3.style.color = '#64748B';
    h3.style.marginBottom = '4px';
    const nameH2 = document.createElement("h2");
    nameH2.textContent = obj.assignee;
    nameH2.style.color = '#1F2937';
    nameH2.style.fontWeight = '600';
    nameH2.style.fontSize = '18px';
    assigneeDiv.append(h3);
    assigneeDiv.append(nameH2);
    bottomDiv.append(assigneeDiv);

    const prioDiv = document.createElement("div");
    prioDiv.style.marginRight = '150px';
    const prioH3 = document.createElement("h3");
    prioH3.textContent = 'Priority:';
    prioH3.style.marginBottom = '4px';
    prioH3.style.color = '#64748B';
    prioDiv.append(prioH3)
    const highNotice = document.createElement("p");
    // highNotice.textContent = obj.priority;
    prioDiv.append(highNotice);
    bottomDiv.append(prioDiv);

    modalCard.append(bottomDiv);

    if(obj.priority === 'high'){
      highNotice.textContent = 'HIGH';
     highNotice.style.backgroundColor = '#EF4444';
     highNotice.style.borderRadius = '50px';
     highNotice.style.padding = '2px 31px';
     highNotice.style.color = 'white';
     highNotice.style.width = '100px'
    }
    else if(obj.priority === 'medium'){
       highNotice.textContent = 'MEDIUM';
     highNotice.style.backgroundColor = '#F59E0B';
     highNotice.style.borderRadius = '50px';
     highNotice.style.padding = '2px 18px';
     highNotice.style.color = 'white';
      highNotice.style.width = '100px'
    }
    else if(obj.priority === 'low'){
       highNotice.textContent = 'LOW';
     highNotice.style.backgroundColor = '#9CA3AF';
     highNotice.style.borderRadius = '50px';
     highNotice.style.padding = '2px 32px';
     highNotice.style.color = 'white';
      highNotice.style.width = '100px'
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














