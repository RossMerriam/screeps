export function roleName(role: string) {
    return role + Game.time;
}

export function isTargetFull(structure: StructureSpawn): boolean {
   return structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
}