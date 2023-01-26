function menuCards() {
    class MenuItem {
        constructor (name, description, price, imageLink, imageAlt, parentSelector, ...classes) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.imageLink = imageLink;
            this.imageAlt = imageAlt;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        render(){
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.imageLink} alt=${this.imageAlt}>
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(element);
        }
    }
    const getData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }   
        return await response.json();
    };
    getData('http://127.0.0.1:8000/menus/')
    .then(data => {
        data.forEach(({name, description, price, image}) => {
            new MenuItem(name, description, price, image, name, '.menu__field .container').render();
        });
    });
}

module.exports = menuCards;