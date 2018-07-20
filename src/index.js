import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const css = require('./app.scss');

class Cell extends Component {
    render() {
        return <div className="cell" id={this.props.x + ' ' + this.props.y}>{this.props.num}</div>
    }
}

class Game extends Component {
    constructor() {
        super();

        this.state = {
            start: this.initData()
        };

        this.startPosition = [];

        this.mainX = 3;
        this.mainY = 3;

        this.isWin = () => {
            let winComb = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, '']
            ];

            if (JSON.stringify(winComb) === JSON.stringify(this.state.start)) {
                alert('Congratulation! You won!');
            }

        };

        this.onKeyDown = (event) => {
            let emptyI = this.mainX,
                emptyJ = this.mainY;

            const {start} = this.state;

            switch (event.keyCode) {
                case 37:
                    if (emptyJ !== 3) {
                        this.swapPosition(start, emptyI, emptyJ, emptyI, ++emptyJ);
                        this.mainY = this.mainY + 1;
                        this.isWin();
                    }
                    break;
                case 38:
                    if (emptyI !== 3) {
                        this.swapPosition(start, emptyI, emptyJ, ++emptyI, emptyJ);
                        this.mainX = this.mainX + 1;
                        this.isWin();
                    }
                    break;
                case 39:
                    if (emptyJ !== 0) {
                        this.swapPosition(start, emptyI, emptyJ, emptyI, --emptyJ);
                        this.mainY = this.mainY - 1;

                    }
                    break;
                case 40:
                    if (emptyI !== 0) {
                        this.swapPosition(start, emptyI, emptyJ, --emptyI, emptyJ);
                        this.mainX = this.mainX - 1;
                    }
                    break;
            }

            this.setState({
                start: start
            });

        };


        this.swapPosition = (arr, i1, j1, i2, j2) => {
            let elem = arr[i1][j1];
            arr[i1][j1] = arr[i2][j2];
            arr[i2][j2] = elem;
        };


        this.randomizeTable = () => {

            const {start} = this.state;

            let emptyI = this.mainX,
                emptyJ = this.mainY;

            for (let i = 0; i < 1000; i++) {
                let randRoute = Math.round(Math.random() * 3);

                switch (randRoute) {
                    case 0:
                        if (emptyI !== 0) this.swapPosition(start, emptyI, emptyJ, --emptyI, emptyJ);
                        break;
                    case 1:
                        if (emptyJ !== 3) this.swapPosition(start, emptyI, emptyJ, emptyI, ++emptyJ);
                        break;
                    case 2:
                        if (emptyI !== 3) this.swapPosition(start, emptyI, emptyJ, ++emptyI, emptyJ);
                        break;
                    case 3:
                        if (emptyJ !== 0) this.swapPosition(start, emptyI, emptyJ, emptyI, --emptyJ);
                        break;
                }
            }

            start.forEach((row, i) => {
                row.forEach((elem, j) => {
                    if (elem === '') {
                        this.mainX = i;
                        this.mainY = j;
                    }
                })
            });


            this.setState({
                start: start
            });

        };


    };

    componentWillMount() {
        document.addEventListener("keyup", this.onKeyDown);
    };

    initData() {
        this.startGame();
        return this.startPosition;
    }

    startGame() {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            arr[i] = [];
            for (let j = 0; j < 4; j++) {
                if (i + j !== 6) {
                    arr[i][j] = (i * 4) + j + 1;
                } else {
                    arr[i][j] = '';
                }
            }
        }
        this.startPosition = arr;
    };


    render() {

        const {start} = this.state;

        return (
            <div className="main-game">
                <button className="reset-btn"
                        onClick={this.randomizeTable}>
                    Shuffle
                </button>

                <div className="game-table">
                    {
                        start.map((row, i) => {
                            return row.map((col, j) => {
                                return (
                                    <Cell num={col} y={i} x={j}/>
                                )
                            })
                        })

                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render (
    <Game />,
        document.getElementById('root')
);