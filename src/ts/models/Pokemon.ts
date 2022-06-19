export class Pokemon {
    private _name: string
    private _image: string

    constructor(name: string, img_url: string){
    this._name = name
    this._image = img_url    
    }

    get name(): string {
        return this._name
    }

    get image(): string {
        return this._image
    }
}