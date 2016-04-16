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
    [urls.rooms]: ['Floor', 'Price', 'Comfort', 'Occupation'],
    [urls.roomClient]: ['RoomId', 'ClientId', 'CheckInDate', 'Term'],
    [urls.roomReservation]: ['RoomId', 'ClientId', 'CheckInDate', 'Term']
}