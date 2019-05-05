import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class Stats extends Component {
    generateColors = (amount) => {
        const colors = JSON.parse(localStorage.getItem('colors'))
        if (!colors) {
            let colors = []
            for (let i = 0; i < amount; i++) {
                colors.push(this.getRandomColor());
            }
            localStorage.setItem('colors', JSON.stringify(colors))
            return colors
        } else if (colors.length !== Object.keys(this.props.data.list).length ) {
            for (let i = 0; i < amount; i++) {
                colors.push(this.getRandomColor());
            }
            localStorage.setItem('colors', JSON.stringify(colors))
            return colors
        }else{
            return colors

        }
    }
    getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    render() {
        let lengthArr = []
        for (const dir in this.props.data.list) {
            const element = this.props.data.list[dir];
            lengthArr.push(element.length)
        }
        const data = {
            labels: Object.keys(this.props.data.list),
            datasets: [{
                label: 'כמות הקבצים:',
                data: lengthArr,
                backgroundColor: this.generateColors(Object.keys(this.props.data.list).length)
            }]
        };
        const options = {
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontSize: 20
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                    },
                    title: function (tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
            }
        }
        return (
            <div className='col-8' >
                <Pie data={data}
                    width={300}
                    height={550}
                    options={options} />
            </div >
        )
    }
}
export default Stats
