window.onload = function () { //ページが読み込まれたらこの処理を行う
    let tableElements = document.getElementsByTagName('td'); //tdを取得する
    let order = true;  //trueを取得
    let othelloBlack = '●'; //⚫️を取得
    let othelloWhite = '○'; //○を取得
    let othelloColor = othelloBlack;


    for (let i = 0; i < tableElements.length; i++) { //iを$tableElementの数になるまで足していく
        tableElements[i].addEventListener('click', function () { //tableElementsの配列iをクリックしたら
            tableElements = [].slice.call(tableElements); //配列に変換する
            let index = tableElements.indexOf(this); //クリックしたときの位置の取得tableElementsをクリックしたところが何文字目かを取得
            putOthello(index); //indexを引数にputOthellを呼び出す
            changeOthello(index);
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
        //indexを引数にchangeOthelloという関数を定義
        let prevLeftOthello = tableElements[index - 2].innerHTML; //クリックした位置の二つ前のHTMLの中身を取得
        let prevOthello = tableElements[index - 1].innerHTML; //クリックした位置の一つ前のHTMLの中身を取得
        let nextRightOthello = tableElements[index + 2].innerHTML;　//クリックした位置の2つ後のHTMLの中身を取得
        let nextOthello = tableElements[index + 1].innerHTML; //クリックした位置の後のHTMLの中身を取得

        let unavalableListLeft = [9, 17, 25, 33, 41, 49, 57]; //左端の配列を取得
        let unavalableListRight = [6, 14, 22, 30, 38, 46, 54]; //右端の配列

        const validLeftSide = []; //[]を取得
        const validRightSide = []; //[]を取得
        let leftnumber = 0;  //0を取得
        let rightnumber = 0; //0を取得

        unavalableListLeft.forEach(function () { //配列の各要素に対して行う
            if (index === unavalableListLeft[leftnumber]) { //もしunavalableListLeftの配列が
                validLeftSide.push(true); //配列の中にtrueをいれる
            } else {
                validLeftSide.push(false); //配列の中にfalseをいれる
            }
            leftnumber++; //Leftnumberを増やしていく
        });

        let Leftresult = validLeftSide.some((value) => {
            return value === true; //validLeftSideのtrueを返す;
        });

        unavalableListRight.forEach(function () { //配列の各要素に対して行う
            if (index === unavalableListRight[rightnumber]) { //もしunavalableListRightの配列が
                validRightSide.push(true); //配列の中にtrueをいれる
            } else {
                validRightSide.push(false); //配列の中にfalseをいれる
            }
            rightnumber++; //Rightnumberを増やしていく
        });

        let Rightresult = validRightSide.some((value) => {
            return value === true; //validRightSideのtrueを返す;
        });



        //黒
        //左
        //左
        if (!Leftresult) {
            if (prevLeftOthello.match(othelloBlack) && prevOthello.match(othelloWhite)) {
                //左隣の次のますがおいたオセロと同じ色で左隣のますが別の色ならば
                let targetIndex = index - 1; //indexの一つ前の位置
                putOthello(targetIndex, index); //targetIndexの色を黒にする
            }
            if (prevLeftOthello.match(othelloWhite) && prevOthello.match(othelloBlack)) {
                //左隣の次のますがおいたオセロと同じ色で左隣のますが別の色ならば
                let targetIndex = index - 1; //indexの一つ前の位置
                putOthello(targetIndex, index); //targetIndexの色を白にする
            }
        }

        //白
        //右
        //右
        if (!Rightresult) {
            if (nextRightOthello.match(othelloBlack) && nextOthello.match(othelloWhite)) {
                //右隣の次のますがおいたオセロと同じ色で隣のますが違う色ならば
                let targetIndex = index + 1; //indexの一つ前の位置
                putOthello(targetIndex, index); //targetIndexの色を黒にする
            }
            if (nextRightOthello.match(othelloWhite) && nextOthello.match(othelloBlack)) {
                //右隣の次のますがおいたオセロと同じ色で隣のますが違う色ならば
                let targetIndex = index + 1; //indexの一つ前の位置
                putOthello(targetIndex, index); //targetIndexの色を白にする
            }
        }



        //上にindexをおく(相手のますが下にある場合)
        //黒

        if (index > 15) {
            let topOthello = tableElements[index - 8].innerHTML; //クリックした位置の上の位置を取得
            let upperTopOthello = tableElements[index - 16].innerHTML; //クリックした位置の2つ上の位置を取得
            if (upperTopOthello.match(othelloBlack) && topOthello.match(othelloWhite)) {
                //もしクリックした位置の2つ上のますが黒で1つ上のますが白ならば
                let targetIndex = index - 8; //targetIndexにindex-8を定義する
                putOthello(targetIndex, index); //targetIndexのinner.HTMLを黒にする
            }
            //白
            if (upperTopOthello.match(othelloWhite) && topOthello.match(othelloBlack)) {
                //もしクリックした位置の2つ上のますが白で1つ上のますが黒ならば
                let targetIndex = index - 8; //targetIndexにindex-8を定義する
                putOthello(targetIndex, index); //targetIndexのinner.HTMlを白にする
            }

        }



        //下にindexをおく（相手のますが上にある場合）
        //黒

        if (index < 48) {
            let bottomOthllo = tableElements[index + 8].innerHTML; //クリックした位置の下の位置を取得
            let lowerBottomOthello = tableElements[index + 16].innerHTML; //クリックした位置の2つ下の位置を取得
            if (lowerBottomOthello.match(othelloBlack) && bottomOthllo.match(othelloWhite)) {
                //もしクリックした位置の2つ下のますが黒で1つ下のますが白ならば
                let targetIndex = index + 8; //targetIndexに index+8を定義する
                putOthello(targetIndex, index); //targetIndexのinner.HTMLを黒にする
            }
            //白
            //下
            if (lowerBottomOthello.match(othelloWhite) && bottomOthllo.match(othelloBlack)) {
                //もしクリックした位置の2つ下のますが白で1つ下のますが黒ならば
                let targetIndex = index + 8; //targetIndexに index+8を定義する
                putOthello(targetIndex, index); //targetIndexのinner.HTMLを白にする
            }
        }

        // for (let i = 0; i < 8; i++) {
        //     let rowSpot = [
        //         [0, 1, 2, 3, 4, 5, 6, 7],
        //         [8, 9, 10, 11, 12, 13, 14, 15],
        //         [16, 17, 18, 19, 20, 21, 22, 23],
        //         [24, 25, 26, 27, 28, 29, 30, 31],
        //         [32, 33, 34, 35, 36, 37, 38, 39],
        //         [40, 41, 42, 43, 44, 45, 46, 47],
        //         [48, 49, 50, 51, 52, 53, 54, 55],
        //         [56, 57, 58, 59, 60, 61, 62, 63]
        //     ]


        //     let target = rowSpot[i][selectNumber];
        //     //選択した以外のマス目をチェック
        //     if (target !== index) {
        //         //黒か白かの判定
        //         if (order) {
        //             if ($tableElements[target].innerHTML.match(othelloBlack)) {
        //                 let othelloChangeNumber = (i - 1) - selectArray;
        //                 for (var n = 0; n < othelloChangeNumber; n++) {
        //                     let changeTarget = rowSpot[n + othelloChangeNumber][selectNumber];
        //                     $tableElements[changeTarget].innerHTML = othelloColor;
        //                 }
        //             }
        //         } else {
        //             if ($tableElements[target].innerHTML.match(othelloWhte)) {

        //             }
        //         }
        //     }

        // }




    }



}



