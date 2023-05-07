class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };

    // отобразить контент
    renderItems(items, user) {
        items.forEach(item => {
            this._renderer(item, user);
        });
    }

    // добавить контент
    addItem(card) {
        this._container.append(card);
    }
    // добавить карточку в начало
    prependItem(card) {
        this._container.prepend(card);
    }
};

export { Section };