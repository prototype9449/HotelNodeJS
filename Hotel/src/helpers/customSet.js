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
            this.set.push(object);
        }
    }

    get size() {
        return this.set.length;
    }

    delete(object) {
        _.remove(this.set, (x) => _.isEqual(x, object));
    }

    toArray() {
        return this.set;
    }
}