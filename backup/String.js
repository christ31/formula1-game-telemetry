// var Test = "MarhsalZone[210]";
// var angka = 0;
// for(let i = 0; i < Test.length - 1; i++){
//     var sub = Test.substring(i, i+1);
//     if(sub >= 0){
//         console.log(sub);
//         angka += sub;
//     }
// }
// var number = Number(angka);
// console.log("angka = " + (number + 1));

// console.log(Test.includes("]"));



// var fomatku = ["Bananan"];
// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// var n = fruits.includes(formatku);
// console.log(n);

var header2 = [
    ["m_packetFormat", "uint16"],
    ["m_gameMajorVersion", "uint8"],
    ["m_gameMinorVersion", "uint8"],
    ["m_packetVersion", "uint8"],
    ["m_packetId", "uint8"],
    ["m_sessionUID", "uint64"],
    ["m_sessionTime", "float"],
    ["m_frameIdentifier", "uint32"],
    ["m_playerCarIndex", "uint8"],
    ["m_secondaryPlayerCarIndex","uint8"]
]


var header = require("./PacketInformation/HeaderPacket");
console.log(header.packetheader.length);

// console.table(header);