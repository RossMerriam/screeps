import {Config} from "../../config/config";

export namespace SpawnManager {

    export var spawns: any;
    export var spawnNames: string[] = [];
    export var spawnCount: number = 0;

    export function loadSpawns() {
        spawns = Game.spawns;
        spawnCount = _.size(spawns);

        _loadSpawnNames();

        if (Config.VERBOSE) {
            console.log(spawnCount + " spawns in room.");
        }
    }

    export function getFirstSpawn(): any {
        return spawns[spawnNames[0]];
    }

    export const isSpawnFull = (): boolean => {
        let spawn = getFirstSpawn();
        return spawn.store.getFreeCapacity() == 0;
    }

    function _loadSpawnNames() {
        for (let spawnName in spawns) {
            if (spawns.hasOwnProperty(spawnName)) {
                spawnNames.push(spawnName);
            }
        }
    }

}