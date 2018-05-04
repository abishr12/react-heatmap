import React from "react";
import Cell from "./cell";

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    // console.log(this.props)
  }

  render() {
    return (
      <tr>
        {Object.entries(this.props.data).map((data, idx) => (
          <Cell
            key={idx}
            changeCell={this.props.changeVal}
            attribute={data[0]}
            index={this.props.index}
            info={data[1]}
          />
        ))}
      </tr>
    );
  }
}

export default Row;
