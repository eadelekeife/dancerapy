import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0FB77A', '#599EEA', '#FAB70A', '#F09468', '#844FF6'];

export default class PieChartDefault extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';
    constructor(props) {
        super(props);
    }
    render() {
        const data = this.props.categoryData;
        const COLORS = this.props.colorBox;
        return (
            // <ResponsiveContainer>
            <PieChart width={160} height={150} onMouseEnter={this.onPieEnter} >
                <Pie
                    data={data}
                    cx={70}
                    cy={70}
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
            // </ResponsiveContainer>
        );
    }
}