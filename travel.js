const myHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-apikey': "5a81fb4616d5526228b42399",
    "cache-control": "no-cache"
}

window.addEventListener("load", () => {
  getArticles();
  addFormHandler();
  addFormSubmitHandler();
})

function addFormSubmitHandler(){
    document.querySelector('button[type="submit"]').addEventListener("click", e => {
        e.preventDefault();
        let userTitle = document.querySelector('input[name="title"]');
        let userDate = document.querySelector('input[name="date"]');
        let userContent = document.querySelector('textarea[name="content"]');
        
        let data = {
            title: userTitle.value,
            content: userContent.value,
            date: userDate.value,
        };
        
        let postData = JSON.stringify(data);
        fetch("https://articles-10c9.restdb.io/rest/travel", {
              method: "post",
              headers: myHeaders,
              body: postData
              })
        .then(res => res.json())
        .then(data => console.log(data));
        // awesome!
        // 1. Hide form
        document.querySelector("#modal").style.left="100vw";
        // 2. Show article
        showArticle(data);
        // 3. Clearing data from submit
        document.querySelector('input[name="title"]').value="";
        document.querySelector('input[name="date"]').value="";
        document.querySelector('textarea[name="content"]').value="";
        })
}

function addFormHandler(){
    document.querySelector(".add-new").addEventListener("click",()=>{
        document.querySelector("#modal").style.left="0";
    })
    document.querySelector(".close-modal").addEventListener("click",()=>{
        document.querySelector("#modal").style.left="100vw";
    })
}

function getArticles() {
  fetch("https://articles-10c9.restdb.io/rest/travel", {
    method: "get",
    headers: myHeaders
  })
  .then(res => res.json())
  .then(data => data.forEach(showArticle))
}

function showArticle(articleData) {
  console.log(articleData);
  let parent = document.querySelector("main");
  let template = document.querySelector("#travelTemplate").content;
  let clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = articleData.title;
  clone.querySelector("p").textContent = articleData.content;
  clone.querySelector("article").setAttribute("id", "dynamicid_"+articleData._id);
  clone.querySelector(".delete a").addEventListener("click", (eventInfo)=>{
      document.querySelector("#dynamicid_"+articleData._id).remove()
      
      fetch("https://articles-10c9.restdb.io/rest/travel/5a815c175a885065000107c6", {
          method: "delete",
          headers: myHeaders
      })
          .then(res=>res.json())
          .then(data=>console.log(data));
  })
   
  parent.appendChild(clone);
}
