const loadCategory = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)
}
const displayCategory = (categories) => {
    console.log(categories);
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
    console.log(newsCat);
    const url = `https://openapi.programming-hero.com/api/news/category/${newsCat}`;
    const res = await fetch (url);
    const data = await res.json();
    displayNews(data.data)
}
//Display News from the Category
const displayNews = (allNews) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    // console.log(allNews);
    allNews.forEach(news => {
        console.log(news);
        const newsSingle =  document.createElement('div');
        newsSingle.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'mb-5');

        newsSingle.innerHTML = `
        <figure class="w-1/4"><img src="${news.thumbnail_url}" class="h-50"></figure>
        <div class="w-3/4 card-body">
            <h2 class="card-title">${news.title}</h2>
            <p>${news.details.slice(0, 300) + '...'}</p>
            <!-------------Post Details--------------------->
            <div class="flex justify-between">
                <div class="flex items-center gap-3">
                    <img src="${news.author.img}" class="h-10 rounded-full" />
                    <div>
                        <h4 class="text-lg font-semibold">${news.author.name}</h4>
                        <h5>${news.author.published_date}</h5>
                    </div>
                </div>
                <div>
                    <h3 class="text-2xl"><span><i class="fa-solid fa-eye"></i></span> ${news.total_view}</h3>
                </div>
                <div>
                    <a href=""><span class="text-2xl"><i class="fa-solid fa-right-long"></i></span></a>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsSingle);
    });
                    
}