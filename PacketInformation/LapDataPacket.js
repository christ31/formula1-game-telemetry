var head = require("./HeaderPacket");

exports.LapData = [
    ["m_lastLapTime", "float"],
    ["m_currentLapTime", "float"],

    ["m_sector1TimeInMS", "uint16"],
    ["m_sector2TimeInMS", "uint16"],
    ["m_bestLapTime", "float"],
    ["m_bestLapNum",  "uint8"],
    ["m_bestLapSector1TimeInMS", "uint16"],
    ["m_bestLapSector2TimeInMS", "uint16"],
    ["m_bestLapSector3TimeInMS", "uint16"],
    ["m_bestOverallSector1TimeInMS", "uint16"],
    ["m_bestOverallSector1LapNum", "uint8"],
    ["m_bestOverallSector2TimeInMS", "uint16"],
    ["m_bestOverallSector2LapNum", "uint8"],
    ["m_bestOverallSector3TimeInMS", "uint16"],
    ["m_bestOverallSector3LapNum", "uint8"],

    ["m_lapDistance", "float"],
    ["m_totalDistance", "float"],
    ["m_safetyCarDelta", "float"],
    ["m_carPosition", "uint8"],
    ["m_currentLapNum", "uint8"],
    ["m_pitStatus",  "uint8"],
    ["m_sector", "uint8"],
    ["m_currentLapInvalid", "uint8"],
    ["m_penalties", "uint8"],
    ["m_gridPosition", "uint8"],
    ["m_driverStatus", "uint8"],

    ["m_resultStatus", "uint8"]
]

exports.PacketLapData = [
    ["m_header", head.packetheader],
    ["m_lapData[22]", this.LapData]
]