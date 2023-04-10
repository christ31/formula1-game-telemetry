var head = require("./HeaderPacket");

exports.CarTelemetryData = [
    ["m_speed", "uint16"], //24 lanjut 82
    ["m_throttle", "float"], //26
    ["m_steer", "float"], //30
    ["m_brake", "float"], //34
    ["m_clutch", "uint8"], //38
    ["m_gear",  "int8"], //39
    ["m_engineRPM", "uint16"], //40
    ["m_drs", "uint8"], //42
    ["m_revLightsPercent", "uint8"],
    ["m_revLightsBitValue", "uint16"], 
    ["m_brakesTemperature[4]", "uint16"], 
    ["m_tyresSurfaceTemperature[4]", "uint8"],
    ["m_tyresInnerTemperature[4]", "uint8"], 
    ["m_engineTemperature", "uint16"], 
    ["m_tyresPressure[4]", "float"],
    ["m_surfaceType[4]", "uint8"] 
]

exports.PacketCarTelemetryData = [
    ["m_header",  head.packetheader], // 0
    ["m_carTelemetryData[22]", this.CarTelemetryData], //24
    ["m_mfdPanelIndex", "uint8"], 
    ["m_mfdPanelIndexSecondaryPlayer", "uint8"], 
    ["m_suggestedGear", "int8"]
]