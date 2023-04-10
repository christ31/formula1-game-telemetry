exports.packetheader = [ // info pointer
    ["m_packetFormat", "uint16"], //0
    ["m_gameMajorVersion", "uint8"], //2
    ["m_gameMinorVersion", "uint8"], //3
    ["m_packetVersion", "uint8"], //4
    ["m_packetId", "uint8"], // 5
    ["m_sessionUID", "uint64"], // 6
    ["m_sessionTime", "float"], // 14
    ["m_frameIdentifier", "uint32"], //18
    ["m_playerCarIndex", "uint8"], //22
    ["m_secondaryPlayerCarIndex", "uint8"] //23
]