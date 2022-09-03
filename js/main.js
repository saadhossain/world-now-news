const loadCategory = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)
}
const displayCategory = (categories) => {
    const newsCategory = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.innerHTML = `
            <a href="#" onclick="loadNews('${category.category_id}')">${category.category_name}</a>
        `
        newsCategory.appendChild(categoryLi);
    });
}

loadCategory()
//Load News from Category
const loadNews = async (newsCat) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsCat}`;
    const res = await fetch (url);
    const data = await res.json();
    displayNews(data.data);
}
//Display News from the Category
const displayNews = (allNews) => {
    //News lenth in every category
    const newsLength = allNews.length;
    //News Count
    const newsCount = document.getElementById('found-item');
    newsCount.innerText = '';
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    allNews.forEach(news => {
        newsCount.innerText = newsLength;
        //Show category in found line
        document.getElementById('found-category').innerText = '';
        //Single news
        const newsSingle =  document.createElement('div');
        newsSingle.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'mb-5');
        newsSingle.innerHTML = `
        <figure class="w-1/4"><img src="${news.thumbnail_url}" class="h-64"></figure>
        <div class="w-3/4 card-body">
            <h2 class="card-title">${news.title}</h2>
            <p>${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>
            <!-------------Post Details--------------------->
            <div class="flex justify-between">
                <div class="flex items-center gap-3">
                    <img src="${news.author.img}" class="h-10 rounded-full" />
                    <div>
                        <h4 class="text-lg font-semibold">${news.author.name ? news.author.name : 'Anonymous'}</h4>
                        <h5>${news.author.published_date ? news.author.published_date: 'Not Found'}</h5>
                    </div>
                </div>
                <div>
                    <h3 class="text-2xl"><span><i class="fa-solid fa-eye"></i></span> ${news.total_view ? news.total_view: 'Not Found'}</h3>
                </div>
                <div>
                    <label for="news-modal" class="modal-button cursor-pointer" onclick="loadDetails('${news._id}')"><span class="text-2xl"><i class="fa-solid fa-right-long"></i></span></label>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsSingle);  
    });
                    
}
const loadDetails = async(newsID) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsID}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = (newsDetails) => {
    const newsModal = document.getElementById('modal');
    const { title, details, image_url} = newsDetails;
    newsModal.innerHTML = `
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-3">${title}</h3>
            <img src="${image_url}"/>
            <p class="py-4">${details}</p>
            <div class="flex items-center gap-3">
                <img src="${newsDetails.author.img}" class="h-10 rounded-full" />
                <div>
                    <h4 class="text-lg font-semibold">${newsDetails.author.name ? newsDetails.author.name : 'Anonymous'}</h4>
                    <h5>${newsDetails.author.published_date ? newsDetails.author.published_date: 'Not Found'}</h5>
                </div>
            </div>
            <div class="modal-action">
                <label for="news-modal" class="btn">Close!</label>
            </div>
        </div>
    `
}

