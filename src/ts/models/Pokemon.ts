export class Pokemon {
    private _id: number
    private _name: string
    private _image: string
    private _habitat: string
    private _flavor: string
    private _type: string
    
    constructor(id: number, name: string, img_url: string){
        this._id = id
        this._name = name
        this._image = img_url    
    }

    get id(): number {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get image(): string {
        return this._image
    }

    get habitat(): string {
        return this._habitat
    }
}