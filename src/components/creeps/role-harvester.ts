import {SourceManager} from "../sources/source-manager";
import {roleName} from "../../utils/helpers";
import {SpawnManager} from "../spawns/spawn-manager";

class Harvester {

    creep: Creep;
    role: 'harvester';
    name: string = roleName('harvester');
    body: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE];

    setCreep(creep: Creep): void {
        this.creep = creep;
    }

    spawn(Spawn: StructureSpawn): number {

        return Spawn.spawnCreep(this.body, this.name, {
            memory: {
                role: 'harvester',
                room: String(Spawn.room),
                working: false
            }
        });

    }

    work(): void {

    }

    harvest(): void {
        let source = SourceManager.getFirstSource();
        let spawn = SpawnManager.getFirstSpawn();

        if (!this.isFull()) {
           if(this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
              this.creep.moveTo(source);
           }
        } else {
           if(this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               this.creep.moveTo(spawn);
           }
        }
    }

    isFull(): boolean {
        return this.creep.store.getFreeCapacity() == 0;
    }


}

export { Harvester }