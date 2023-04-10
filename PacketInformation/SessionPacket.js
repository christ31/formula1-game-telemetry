var head = require("./HeaderPacket");

exports.name = "SessionPacket";

exports.marshalZone = [
    ["m_zoneStart", "float"],
    ["m_zoneFlag", "int8"]
]

exports.WeatherForecastSample = [
    ["m_sessionType", "uint8"],
    ["m_timeOffset", "uint8"],
    ["m_weather", "uint8"],
    ["m_trackTemperature", "int8"],
    ["m_airTemperature", "int8"]
]

exports.PacketSessionData = [
    ["m_header", head.packetheader],
    ["m_weather",  "uint8"],
    ["m_trackTemperature", "int8"],
    ["m_airTemperature", "int8"],
    ["m_totalLaps", "uint8"],
    ["m_trackLength", "uint16"],
    ["m_sessionType", "uint8"],
    ["m_trackId", "int8"],
    ["m_formula", "uint8"],
    ["m_sessionTimeLeft", "uint16"],
    ["m_sessionDuration", "uint16"],
    ["m_pitSpeedLimit", "uint8"],
    ["m_gamePaused", "uint8"],
    ["m_isSpectating", "uint8"],
    ["m_spectatorCarIndex", "uint8"],
    ["m_sliProNativeSupport", "uint8"],
    ["m_numMarshalZones", "uint8"],
    ["m_marshalZones[21]", this.marshalZone],
    ["m_safetyCarStatus", "uint8"],
    ["m_networkGame", "uint8"],
    ["m_numWeatherForecastSamples", "uint8"],
    ["m_weatherForecastSamples[20]", this.WeatherForecastSample]
]