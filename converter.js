// ! Module Exports
module.exports = { //Sumber ada di getData.js bagian bawah
   checkPId, converter
}

const { lookup } = require("dns");

// ! All required file goes here
var head = require("./PacketInformation/HeaderPacket"); // * Done
var sess = require("./PacketInformation/SessionPacket"); // * Done
var carTP = require("./PacketInformation/CarTelemetryPacket"); // * Done
var lapD = require("./PacketInformation/LapDataPacket"); // * Done
var carSP = require("./PacketInformation/CarStatusPacket");

const { info } = require("console");

// ! Variabel Global
var pointer = 0;
var infoByte = 0;
var value = "err"; // Value default
var buffer;
var data;
var packet;
var isipacket = [];
var isiSubPacket = [];

var arrTemp;
var arraykah = [];


var indukPacket;
var indukarrcount = 1;

// ! Array yang mau di output sesuai dengan keinginan
var formatku =
   [

   ];


function converter(msg) { // Mengubah file menjadi class converter
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
   var datalength;

   // TODO [Done] Bagaimana caranya biar paket bisa dikenali selain packet Session
   packet = checkPId(besarData);
   datalength = packet[1].length;
   // console.log(buf.toString('hex'));

   // ! Reset Pointer di sini
   pointer = 0;

   tampilkan(buf, packet[1], datalength);
   console.log(isipacket);
   isipacket = [];
}

// TODO [Done] Bagaimana caranya supaya kode mengenali format selain encoding seperti PacketHeader, MarshalZone, dsb
function tampilkan(buf, arr, panjang) {
   var arr2;
   var length2;

   for (let i = 0; i < panjang; i++) {
      infoByte = pointerByte(arr[i][1]);
      // console.log("--- i = ",i);
      // console.log("------->Pointer awal = ", pointer);

      // Cek jika subPacket memiliki array seperti m_brakeTemeperature[4], uint16
      var check = String(arr[i][0]);
      var jumlah = 1;

      // ! [Fixed] Bug pada saat mencari jumlah array pada fungsi. Contoh "m_bestOverallSector2LapNum"
      if (check.includes('[')) {
         jumlah = parseInt(check.replace(/[^0-9]/g, ''), 10); //https://stackoverflow.com/questions/10003683/how-can-i-extract-a-number-from-a-string-in-javascript
      }

      if (infoByte == -1) { //Jika ternyata encode mengarah ke packet lain atau encode dijabarkan namun ternyata dalam bentuk array, maka...
         // ! Bagian sini cuma kepanggil dua kali
         // console.log("---<Another Packet Detected>---");

         // Jika terdeteksi paket lain, insert info ke indeks 0
         arr2 = arr[i][1]; // Get all packet info
         isipacket[arr[i][0]] = "testing";

         for (let f = 0; f < jumlah; f++) { // Rekusi sebanyak jumlah array[panjang]
            // console.log("---<Rekursi Mulai>--- -->", f);
            tampilkan(buf, arr2, arr2.length, f); // ! Recurtion
         }
         // console.log("---<Rekursi Selesai>---");

      } else { // Convert Value from Buffer
         if (jumlah > 1) { // Jika ternyata paket memiliki array seperti m_brakeTemperature[4]
            for (let j = 0; j < jumlah; j++) {
               buffer = Buffer.from(buf.subarray(pointer, pointer + infoByte));
               value = convert(buffer, arr, i);

               show(arr[i][0], value);
               pointer = pointer + infoByte;
            }
         } else {
            buffer = Buffer.from(buf.subarray(pointer, pointer + infoByte));
            value = convert(buffer, arr, i);

            show(arr[i][0], value);
            pointer = pointer + infoByte;
         }
      }
   }
   // console.log("---- Selesai ----");
}

function show(arr, value) {
   if (formatku.length > 0) {
      for (let j = 0; j < formatku.length; j++) { // Untuk output sesuai keinginan
         if (arr.includes(formatku[j])) {
            console.log(arr + " = " + value); // ! Output di sini
         }
      }
   } else {
      insertToArray(arr, value);
      // console.log(arr + " = " + value);
   }
}

// TODO Cara menyimpan ke dalam array
function insertToArray(name, value) {
   // Jika rekursi ke-i lebih dari 0, b

   if (name.includes('[')) {
      var panjang = parseInt(name.replace(/[^0-9]/g, ''), 10);

      arraykah.push(value);

      if (indukarrcount == panjang) {
         // push packet
         isipacket[name] = arraykah;

         // reset counter
         indukarrcount = 0;
         arraykah = [];
      }

      indukarrcount++;

   } else {
      arrTemp = name;

      // ! Masukkan Value ke dalam Array
      isipacket[name] = value;
   }
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
   } else { // kalau format mengarah ke packet lain gimana ? kayak PacketHeader
      point = -1;
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
   else {
      // console.log(header[0][index] + " = " + bff.toString('hex'));
      console.log(header);
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
         obj = [2, lapD.PacketLapData]; break;
      case 35: // * EventPacket
         obj = [3, 0]; break;
      case 1213: // * ParticipantPacket
         obj = [4, 0]; break;
      case 1102: // * CarSetupPacket
         obj = [5, 0]; break;
      case 1347: // * CarTelemetryPacket
         obj = [6, carTP.PacketCarTelemetryData]; break;
      case 1344: // * CarStatusPacket
         obj = [7, carSP.PacketCarStatusData]; break;
      case 839: // * FinalClassificationPacket
         obj = [8, 0]; break;
      case 1169: // * LobbyInfoPacket
         obj = [9, 0]; break;

      default: // * In case something wrong happen
         obj = -99;
   }
   return obj;
}








// ! Deprecated !
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
      if (i < arr.length) {
         show(arr[index][0], value); // ! Output di sini
      }
      index++;
      pointer = pointer + infoByte;
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