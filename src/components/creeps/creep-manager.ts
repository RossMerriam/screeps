import {CreepBase} from "./creep-base";

namespace CreepManager {

    export let creeps : { [creepName: string]: Creep; } = null;
    export let creepCount :number = 0;

    export function loadCreeps(): void {
        creeps = Game.creeps;
        creepCount = _.size(creeps);

        //console.log(creepCount + " creeps found in the playground.");
    }

}

export { CreepManager };