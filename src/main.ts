import { ErrorMapper } from "utils/ErrorMapper";
import { CreepManager } from "./components/creeps/creep-manager";
import { SourceManager } from "./components/sources/source-manager";
import { RoomManager } from "./components/rooms/room-manager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

export const global = ():void => {
  CreepManager.loadCreeps();
  RoomManager.loadRooms();
  SourceManager.loadSources();
}

global();



export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
