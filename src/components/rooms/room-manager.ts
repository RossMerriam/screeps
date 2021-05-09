namespace RoomManager {

    export let rooms: any;
    export let roomNames: string[] = [];

    export function loadRooms() {
        rooms = Game.rooms;

        _loadRoomNames();

        console.log(_.size(rooms) + " rooms found.");

    }

    export function getFirstRoom(): Room {
        return rooms[roomNames[0]];
    }

    function _loadRoomNames() {
        for (let roomName in rooms) {
            if (rooms.hasOwnProperty(roomName)) {
                roomNames.push(roomName);
            }
        }
    }
}

export { RoomManager };