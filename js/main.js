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
