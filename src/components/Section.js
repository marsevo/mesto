class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };

    // отобразить контент
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    // добавить контент
    addItem(card) {
        this._container.prepend(card);
    }
};

export { Section };