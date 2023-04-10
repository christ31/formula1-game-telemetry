exports.CarTelemetryData = [
    ["m_speed", "uint16"],
    ["m_throttle", "float"],
    ["m_steer", "float"],
    ["m_brake", "float"],
    ["m_clutch", "uint8"],
    ["m_gear",  "int8"],
    ["m_engineRPM", "uint16"],
    ["m_drs", "uint8"],
    ["m_revLightsPercent", "uint8"],
    ["m_brakesTemperature[4]", "uint16"]
    ["m_tyresSurfaceTemperature[4]", "uint8"],
    ["m_tyresInnerTemperature[4]", "uint8"],
    ["m_engineTemperature", "uint16"],
    ["m_tyresPressure[4]", "float"],
    ["m_surfaceType[4]", "uint8"]
]

exports.PacketCarTelemetryData = [
    ["m_header",  "PacketHeader"],
    ["m_carTelemetryData[22]", "CarTelemetryData"],
    ["m_buttonStatus", "uint32"],
    ["m_mfdPanelIndex", "uint8"],
    ["m_mfdPanelIndexSecondaryPlayer", "uint8"],
    ["m_suggestedGear", "int8"]
]