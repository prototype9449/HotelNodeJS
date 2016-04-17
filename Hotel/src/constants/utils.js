export const urls = {
    clients: "Clients",
    rooms: "Rooms",
    roomClient: "RoomClient",
    roomReservation: "RoomReservation"
};

export const verbs = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE"
};

export const fields = {
    [urls.clients]: ['FullName', 'Passport', 'Sex'],
    [urls.rooms]: ['Id', 'Floor', 'Price', 'Comfort', 'Occupation'],
    [urls.roomClient]: ['RoomId', 'ClientId', 'CheckInDate', 'Term'],
    [urls.roomReservation]: ['RoomId', 'ClientId', 'CheckInDate', 'Term']
}

export const fieldTransforms = {
    [urls.clients](field, value){
        if (field == 'Sex') {
            return value ? 'Man' : 'Woman'
        }

        return value
    },
    [urls.rooms](field, value){
        if (field == 'Occupation') {
            return value ? 'Yes' : 'No'
        }

        return value
    },
    [urls.roomClient](field, value) {
        return value
    },
    [urls.roomReservation](field, value) {
        return value
    }
}