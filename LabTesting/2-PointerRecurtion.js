var pointer = 0; // Variabel global pointer, dapat dimasukkan di berbagai macam function

var testing = true;

recurtion();


function recurtion(){
    pointer = 0;

    var pointerTemp=0;
    if(testing){
        for (let i = 0; i < 5; i++) {
            pointer++;
            console.log(pointer);
        }
        testing = false;

        pointerTemp = pointer;
        recurtion(); // ketika rekursi dipanggil, nilai pointer kembali menjadi 0



        // pointer = pointer + pointerTemp;

        console.log("hayo = ", pointer);
    } else {
        console.log("else = ", pointer);
    }
}