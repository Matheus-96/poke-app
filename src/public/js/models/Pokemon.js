export class Pokemon {
    constructor(id, name, img_url) {
        this._id = id;
        this._name = name;
        this._image = img_url;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get image() {
        return this._image;
    }
    get habitat() {
        return this._habitat;
    }
}
//# sourceMappingURL=Pokemon.js.map