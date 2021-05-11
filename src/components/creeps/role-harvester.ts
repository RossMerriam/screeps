import {SourceManager} from "../sources/source-manager";
import {roleName, isTargetFull} from "../../utils/helpers";
import {SpawnManager} from "../spawns/spawn-manager";
import {RoomManager} from "../rooms/room-manager";



class Harvester {

    creep: Creep = null;
    role: 'harvester';
    name: string = roleName('harvester');
    body: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE];
    targetSource: Source = SourceManager.getFirstSource();
    targetController: StructureController = null;

    setCreep(creep: Creep): void {
        this.creep = creep;
        this.targetController = this.creep.room.controller;
    }

    spawnCreep(Spawn: StructureSpawn): number {
        return Spawn.spawnCreep(this.body, this.name, {
            memory: {
                role: 'harvester',
                room: String(Spawn.room),
                working: false
            }
        });
    }

    work(): void {
        if(this.isStorageFull()){
            this.emptyStorage();
        } else {
            this.harvest();
        }
    }

    isStorageFull(): boolean {
        return this.creep.store.getFreeCapacity() == 0;
    }

    emptyStorage(): void {
        if(SpawnManager.isSpawnFull()) {
            console.log('updating controller!');
            this.updateController();
        } else {
            console.log('updating SPAWN!');
            this.transferToSpawn();
        }
    }

    transferToSpawn(): void {
        let target = SpawnManager.getFirstSpawn();
        if(this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    updateController(): void {
        let target = this.targetController;
        if(this.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    harvest(): void {
        if(this.creep.harvest(this.targetSource) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.targetSource);
        }
    }


}

export { Harvester }