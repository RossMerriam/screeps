import {SourceManager} from "../sources/source-manager";
import {creepName} from "../../utils/helpers";
import {SpawnManager} from "../spawns/spawn-manager";
import {RoomManager} from "../rooms/room-manager";



class Harvester {

    creep: Creep = null;
    name: string = creepName();
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

    setRole(newRole:string): void {
        this.creep.memory.role = newRole;
    }

    work(): void {
        switch (this.creep.memory.role) {
            case 'harvester': {
                this.harvestLoop();
                break;
            }
            case 'updater': {
                this.updaterLoop();
            }
        }
    }

    isStorageEmpty(): boolean {
        return this.creep.store[RESOURCE_ENERGY] == 0;
    }

    isStorageFull(): boolean {
        return this.creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
    }

    transferToSpawn(): void {
        let target = SpawnManager.getFirstSpawn();
        if(this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    updaterLoop():void {
        if(this.isStorageEmpty()) {
            this.harvest();
        } else {
            this.updateController();
        }
    }

    updateController(): void {
        let target = this.targetController;
        if(this.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    harvestLoop(): void {
        if(!this.isStorageFull()) {
            this.harvest();
        }else if (!SpawnManager.isSpawnFull()) {
            this.transferToSpawn();
        } else {
            this.setRole('updater');
        }
    }

    harvest(): void {
        if(this.creep.harvest(this.targetSource) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.targetSource);
        }
    }


}

export { Harvester }