import {ErrorMapper} from "utils/ErrorMapper";
import {CreepManager} from "./components/creeps/creep-manager";
import {SourceManager} from "./components/sources/source-manager";
import {RoomManager} from "./components/rooms/room-manager";
import {SpawnManager} from "./components/spawns/spawn-manager";
import {Harvester} from "./components/creeps/role-harvester";
import {spawn} from "child_process";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

export const global = ():void => {
  CreepManager.loadCreeps();
  RoomManager.loadRooms();
  SourceManager.loadSources();
  SpawnManager.loadSpawns();
}

global();

export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);

    if (CreepManager.creepCount < 3) {
      let harvester = new Harvester();
      harvester.spawnCreep(SpawnManager.getFirstSpawn());
    }

    for(let creepName in CreepManager.creeps) {
        let creep = Game.creeps[creepName];
        console.log(creep.memory.role);
        let harvester = new Harvester();
        harvester.setCreep(creep);
        harvester.work();
    }


  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
