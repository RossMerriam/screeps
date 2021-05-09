import { RoomManager } from "../rooms/room-manager";

export namespace SourceManager {
    export let sources: any;
    export let sourceCount: number = 0;

    export function loadSources() {
        sources = RoomManager.getFirstRoom().find(FIND_SOURCES_ACTIVE);
        sourceCount = _.size(sources);

        sources = RoomManager.getFirstRoom();
    }

    export function getFirstSource(): Source {
        return sources[0];
    }
}