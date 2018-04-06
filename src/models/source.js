
/* Модель отражающая одну фотографию */
export class Photo {
    constructor({ id, farm, owner, secret, server, title }) {
        this.id = id;
        this.farm = farm;
        this.owner = owner;
        this.secret = secret;
        this.server = server;
        this.title = title;
    }
    /* Свойство на ссылку на фотографию на основании маски фликера и данных о фотографии */
    get link() {
        return `https://farm${this.farm}.staticflickr.com/${this.server}/${this.id}_${this.secret}_z.jpg`;
    }
};

/* Модель отражающая коллекцию фотографий, полученных от фликера */
class Source {
    constructor({ page, pages, perpage, photo: images, total }) {
        this.page = page;
        this.pages = pages;
        this.perpage = perpage;
        this.total = total;
        this.hasImages = !!images && !!images.length;
        if(this.hasImages) {
            this.images = images.map(imageDTO => new Photo(imageDTO));
        }
    }
    update({ page, photo: images }) {
        if(!images) { return; }
        images = images.map(imageDTO => new Photo(imageDTO));
        this.images = [ ...this.images, ...images ];
    }
};

export default Source;