export const urls = {
    clients : "Clients",
    rooms : "Rooms",
    roomClient : "RoomClient",
    roomReservation : "RoomReservation"
};

export const verbs = {
    get : "GET",
    post : "POST",
    put : "PUT",
    delete : "DELETE"
};

export const roomFields = ['Floor', 'Price', 'Comfort', 'Occupation'];
export const clientFields = ['FullName', 'Passport', 'Sex'];
export const roomClientFields = ['RoomId', 'ClientId', 'CheckInDate', 'Term'];
export const roomReservationFields = ['RoomId', 'ClientId', 'CheckInDate', 'Term'];
