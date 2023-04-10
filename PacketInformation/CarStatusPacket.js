var head = require("./HeaderPacket");

exports.CarStatusData = [
    ["m_tractionControl", "uint8"],
    ["m_antiLockBrakes", "uint8"],
    ["m_fuelMix", "uint8"],
    ["m_frontBrakeBias", "uint8"],
    ["m_pitLimiterStatus", "uint8"],
    ["m_fuelInTank",  "float"],
    ["m_fuelCapacity", "float"],
    ["m_fuelRemainingLaps", "float"],
    ["m_maxRPM", "uint16"],
    ["m_idleRPM", "uint16"],
    ["m_maxGears", "uint8"],
    ["m_drsAllowed", "uint8"],

    ["m_drsActivationDistance", "uint16"],

    ["m_tyresWear[4]", "uint8"],
    ["m_actualTyreCompound", "uint8"],
    ["m_visualTyreCompound", "uint8"],

    ["m_tyresAgeLaps", "uint8"],
    ["m_tyresDamage[4]", "uint8"],
    ["m_frontLeftWingDamage", "uint8"],
    ["m_frontRightWingDamage", "uint8"],
    ["m_rearWingDamage",  "uint8"],

    ["m_drsFault", "uint8"],

    ["m_engineDamage", "uint8"],
    ["m_gearBoxDamage", "uint8"],
    ["m_vehicleFiaFlags", "int8"],

    ["m_ersStoreEnergy", "float"],
    ["m_ersDeployMode", "uint8"],

    ["m_ersHarvestedThisLapMGUK", "float"],
    ["m_ersHarvestedThisLapMGUH", "float"],
    ["m_ersDeployedThisLap", "float"],
]

exports.PacketCarStatusData = [
    ["m_header", head.packetheader],
    ["m_carStatusData[22]", this.CarStatusData]
]