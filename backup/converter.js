// ! Module Exports
module.exports = { //Sumber ada di getData.js bagian bawah
    checkPId, converter
}

const { lookup } = require("dns");
// ! All required file goes here
var head = require("./PacketInformation/HeaderPacket");
var sess = require("./PacketInformation/SessionPacket");
var carTP = require("./PacketInformation/CarTelemetryPacket");
const { info } = require("console");

// ! Variabel Global
var pointer = 0;
var infoByte = 0;
var value = "err"; // Value default
var buffer;
var data;
var packet;
var isipacket = [];

// ! Array yang mau di output sesuai dengan keinginan
var formatku =
    [
        
    ];


// Mengubah file menjadi class converter
function converter(msg) {
    // Sekarang aku punya value ini
    // var data = "e407010e01017e1ece41ac44ba62d0eed5428f0b000000ff";  // Temporary
    data = msg;
    const buf = Buffer.from(data, 'hex');
    const besarData = buf.length;

    /* 
        * Format packetheader[x][0] = nama fungsi
        * Format packetheader[x][1] = format encode
    */

    // Output data per fungsi sehingga mudah dibaca
    console.log("====================================");
    var datalength = sess.PacketSessionData.length;
    // TODO [Done] Bagaimana caranya biar paket bisa dikenali selain packet Session
    packet = checkPId(besarData);
    tampilkan(buf, packet[1], datalength);
    console.log();
}

// TODO [Done] Bagaimana caranya supaya kode mengenali format selain encoding seperti PacketHeader, MarshalZone, dsb
function tampilkan(buf, arr, panjang) {
    pointer = 0;
    // console.log("\n[ T A M P I L K A N ]");
    var arr2;
    var length2;
    for (let i = 0; i < panjang; i++) {
        infoByte = pointerByte(arr[i][1]);
        buffer = Buffer.from(buf.subarray(pointer, pointer + infoByte));
        value = convert(buffer, arr, i);

        if (value == "diff") { // * Jika format selain char encoding
            console.log(">> Format paket berbeda");
            var pointerTemp = pointer; // * Masukkan pointer sebelum di reset ke 0
            arr2 = Array.from(tipePacket(arr[i][1]));
            length2 = arr2.length;

            // TODO [Done] implementasi untuk format yang lainnya seperti WeatherForecast dll
            var check = String(arr[i][0]);
            if (check.includes(']')) {
                tampilkanLoop(buffer, arr2, check);
            } else {
                tampilkan(buffer, arr2, length2);
            }
            console.log("[ S E L E S A I ]\n");
            infoByte = 0;
            pointer = pointer + pointerTemp;
        } else {
            show(arr[i][0], value); // ! Output di sini
        }
        console.log("pointer = ", pointer);
        pointer = pointer + infoByte;
    }
}

function buffers(start, end){

    pointer = pointer + infoByte;
}

// ! Fungsi untuk looping format ber-array
// TODO Cara membaca array di dalam looping
function tampilkanLoop(buf, arr, panjang) {
    pointer = 0;
    console.log(">> Loop start here");
    var Test = String(panjang);
    var total = 0;
    
    // * Buat mencari jumlah array
    for (let i = 0; i < Test.length - 1; i++) { 
        var sub = Test.substring(i, i + 1);
        if (sub >= 0) {
            total += sub;
        }
    }
    total = Number(total);

    var loop = total * arr.length;
    var index = 0;
    for (let i = 0; i < loop; i++) {
        if (index >= arr.length) {
            index = 0;
        }
        infoByte = pointerByte(arr[index][1]);
        buffer = Buffer.from(buf.subarray(pointer, pointer + infoByte));
        value = convert(buffer, arr, index);
        // if (i < arr.length) {
            // show(arr[index][0], value); // ! Output di sini
        // }
        index++;
        pointer = pointer + infoByte;
    }
}

function show(arr, value) {
    if (formatku.length > 0) {
        for (let j = 0; j < formatku.length; j++) { // Untuk output sesuai keinginan
            if (arr.includes(formatku[j])) {
                console.log(arr + " = " + value); // ! Output di sini
            }
        }
    } else {
        console.log(arr + " = " + value);
    }
}

function tipePacket(format) {
    var tipe = 0;
    switch (format) {
        case "PacketHeader":
            tipe = head.packetheader;
            break;

        // Untuk Packet Session
        case "MarshalZone":
            tipe = sess.marshalZone;
            break;

        case "WeatherForecastSample":
            tipe = sess.WeatherForecastSample;
            break;

        // Untuk Packet CarTP
        case "CarTelemetryData":
            tipe = carTP.CarTelemetryData;
            break;

        default:
    }

    return tipe;
}

// * Digunakan untuk mengembalikan besar pointer sesuai formatnya
function pointerByte(formatData) {
    const uint8 = 1;
    const int8 = 1;
    const uint16 = 2;
    const int16 = 2;
    const uint32 = 4; //Funfact, ini gak ada disebut di forum Codemaster
    const uint64 = 8;
    const float = 4;

    var point = 0;
    if (formatData == "uint8" || formatData == "int8") {
        point = uint8;
    } else if (formatData == "uint16" || formatData == "int16") {
        point = uint16;
    } else if (formatData == "uint32" || formatData == "float") {
        point = float;
    } else if (formatData == "uint64") {
        point = uint64;
    } else if (formatData == "MarshalZone") { // MarshalZone
        point = 5 * 21; // * Rumusnya total byte x list array
    } else if (formatData == "WeatherForecastSample") {
        point = 5 * 20;
    } else if (formatData == "PacketHeader") {
        for (let i = 0; i < head.packetheader.length; i++) {
            point = point + pointerByte(head.packetheader[i][1]);
        }
    } else if (formatData == "CarTelemetryData") {
        for (let i = 0; i < carTP.CarTelemetryData.length; i++) {
            point = point + pointerByte(carTP.CarTelemetryData[i][1]);
        }
        point = point * 22;
    } else { // kalau format mengarah ke packet lain gimana ? kayak PacketHeader

    }

    return point;
}


// * Digunakan untuk mengubah value sesuai dengan formatnya
function convert(bff, header, index) {
    var value = "Error";
    if (header[index][1] == "uint8") {
        value = bff.readIntLE(0, 1);
    }
    else if (header[index][1] == "int8") {
        value = bff.readIntLE(0, 1);
    }
    else if (header[index][1] == "uint16") {
        value = bff.readUInt16LE();
    }
    else if (header[index][1] == "int16") {
        value = bff.readInt16LE();
    }
    else if (header[index][1] == "float") {
        value = bff.readFloatLE();
    }
    else if (header[index][1] == "uint64") {
        value = bff.readBigUInt64LE();
    }
    else if (header[index][1] == "uint32") {
        value = bff.readUInt32LE();
    }
    else if (header[index][1] == "extra") { // Tambahan extra kalau ternyata ada format lain
    }
    else {
        // console.log(header[0][index] + " = " + bff.toString('hex'));
        value = "diff";
    }
    return value;
}


// * Digunakan untuk mengetahui ID packet berdasarkan besar packet dalam byte
// * Format kembalian Array[id, Tipe Packet];
function checkPId(size) {
    var obj = -255;
    switch (size) {
        case 1464: // * MotionPacket
            obj = [0, 0]; break;
        case 251: // * SessionPacket
            obj = [1, sess.PacketSessionData]; break;
        case 1190: // * LapPacket
            obj = 2; break;
        case 35: // * EventPacket
            obj = 3; break;
        case 1213: // * ParticipantPacket
            obj = 4; break;
        case 1102: // * CarSetupPacket
            obj = 5; break;
        case 1307: // * CarTelemetryPacket
            obj = [6, carTP.PacketCarTelemetryData]; break;
        case 1344: // * CarStatusPacket
            obj = 7; break;
        case 839: // * FinalClassificationPacket
            obj = 8; break;
        case 1169: // * LobbyInfoPacket
            obj = 9; break;

        default: // * In case something wrong happen
            obj = -99;
    }
    return obj;
}