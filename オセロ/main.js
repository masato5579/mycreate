window.onload = function () { //ページが読み込まれたらこの処理を行う
    let tableElements = document.getElementsByTagName('td'); //tdを取得する
    let order = true;  //trueを取得
    let othelloBlack = '●'; //⚫️を取得
    let othelloWhite = '○'; //○を取得
    let othelloColor = othelloBlack; //othelloBlackをothelloColorに代入


    for (let i = 0; i < tableElements.length; i++) { //iを$tableElementの数になるまで足していく
        tableElements[i].addEventListener('click', function () { //tableElementsの配列iをクリックしたら
            tableElements = [].slice.call(tableElements); //配列に変換する
            let index = tableElements.indexOf(this); //クリックしたときの位置の取得tableElementsをクリックしたところが何文字目かを取得
            putOthello(index); //indexを引数にputOthellを呼び出す
            changeOthello(index);　//indexを引数にchangeOthelloを呼び出す
            changeOrder(); //changeOrderを呼び出す
        });
    }



    function putOthello(index) { //関数putOthelloを定義
        tableElements[index].innerHTML = othelloColor;  //tableのクリックした位置のHTMLを黒にする
    }

    function changeOrder() {
        if (order) { //もしorderがtrueであれば
            othelloColor = othelloWhite; //オセロの色を白にする
            order = false; //そしてorderをfalseにする
        } else {
            othelloColor = othelloBlack; //そうでなければオセロの色を黒にする
            order = true; //そしてorderをtrueにする
        }
    }

    changeOthello = (index) => {
        let rowSpot = [
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30, 31],
            [32, 33, 34, 35, 36, 37, 38, 39],
            [40, 41, 42, 43, 44, 45, 46, 47],
            [48, 49, 50, 51, 52, 53, 54, 55],
            [56, 57, 58, 59, 60, 61, 62, 63]
        ];

        let arrayNumber; //arrayNumberを定義
        let itemNumber; //itemNumberを取得
        let valid = []; //配列をvalidに定義
        let changeIndexs = []; //配列をchangeIndexに取得

        for (let i = 0; i < 8; i++) { //iが8になるまでiをプラスする
            if (rowSpot[i].indexOf(index) !== -1) { //rowSpotの配列[i]のクリックした位置が-1でなければ
                arrayNumber = i; //iをarrayNumberをいれる
                itemNumber = rowSpot[i].indexOf(index);　//itemNumberにクリックした位置を取得
            }
            for (let i = 1; i < arrayNumber; i++) {
                //iがarrayNumberになるまでiを足していく
                let checkNumber = index - (8 * i);　//index-(8*i)をcheckNumberに代入する
                if (tableElements[index - (8 * i)].innerHTML.match(othelloColor)) {
                    //もしtableElementsの[index-(8*i)]のinnerHTMLがothelloColorとmatchしていたら
                    let changeNumber = -((checkNumber - index) / 8);
                    //-((checkNumber-index)/8)をchangeNumberに代入する
                    for (let n = 0; n < changeNumber - 1; n++) {
                        //nがchangeNumberになるまでnをたす
                        changeIndexs[n] = checkNumber + (8 * (n + 1));
                        //checkNumberに（8*(n+1)）を足したものをchangeIndex[n]に代入する
                    }
                    tableElements[changeIndexs[n]].innerHTML = othelloColor;
                    //tableElements[changeIndexs[n]]のinnerHTMLをothelloColorにする
                }

            }
        }


    }



}



