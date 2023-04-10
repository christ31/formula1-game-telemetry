/* 
    Sumber : https://www.w3schools.com/nodejs/ref_dgram.asp
    Merupakan file untuk "listen" dari port 8080
    Karena F1 memberikan data di UDP Port 20777, maka port diubah
*/

const conver = require("./converter.js");
var packetId = -99;

// dgram adalah Sebuah modul untuk yang disediakan NodeJS memberikan implementasi dari UDP Datagram Sockets
var dgram = require('dgram');
const { checkServerIdentity } = require("tls");
var s = dgram.createSocket('udp4');

// 'message' merupakan sebuah event yang dibuat ketika datagram baru tersedia di socket. Event ini mempunyai function handler menerima 2 argumen yaitu msg(Message) dan rinfo(Remote address information). msg memiliki tipe data "<Buffer>" sedangkan rinfo "<Object>"
s.on('message',
  function (msg, rinfo) {
    // console.log('Data : ' + msg.toString('hex'));
    // console.log('Panjang data : ' + msg.length + ' Bytes'); //msg.length dalam satuan byte
    packetId = conver.checkPId(msg.length);
    if(packetId[0] == 6){
      console.clear();
      console.log(msg.length);
      conver.converter(msg);
    }
    
    // console.log(packetId[0]);
    // console.log('---<>');
  }
);

// bind adalah fungsi untuk mengatur konfigurasi port, address, dan callback. Jika address tidak dimasukkan, maka OS akan "listen" dari semua address. Setelah bind selesai, maka event "listening" akan dijalankan
s.bind(20777, "127.0.0.1");

/*
Module exports function didapat dari ---- 
https://stackify.com/node-js-module-exports/#:~:text=Module%20exports%20are%20the%20instruction,to%20access%20the%20exported%20code.

*/