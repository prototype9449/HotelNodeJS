import _ from 'lodash';

export default class CustomSet {
    constructor(array = []) {
        this.set = array.slice();
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

    delete(deleted) {
        const forDelete = [].concat(deleted)
        this.set = this.set.filter(x => {
                return forDelete.some(y => !_.isEqual(x, y))
            }
        );
        return this
    }

    update(oldObject, newObject){
        const index = this.set.findIndex(x => _.isEqual(x, oldObject))
        const setLength = this.size;
        this.set = [...this.set.slice(0, index), newObject, ...this.set.slice(index + 1, setLength)]
        return this
    }

    hasObject(object) {
        return this.set.some(x=> _.isEqual(x, object))
    }

    toSet() {
        return new CustomSet(this.set)
    }

    get(index){
        return this.set[index]
    }

    clear() {
        this.set = [];
        return this;
    }

    toArray() {
        return [...this.set];
    }
}