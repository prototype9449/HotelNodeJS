import _ from 'lodash';

export default class CustomSet {
    constructor() {
        this.set = [];
    }

    add(object) {
        const isThere = this.set.some(x => {
            _.isEqual(x, object);
        });

        if (!isThere) {
            this.set = [...this.set, object]
        }
        return this
    }

    get size() {
        return this.set.length;
    }

    delete(...deleted) {
        this.set = this.set.filter(x => !deleted.some(y => _.isEqual(x, y)));
        return this
    }

    hasObject(object) {
        return set.some(x=> _.isEqual(x, object))
    }

    clear() {
        this.set = [];
        return this;
    }

    toArray() {
        return this.set;
    }
}