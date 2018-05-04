import React from "react";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      error: false
    };
  }

  render() {
    let { index, attribute } = this.props;
    const heatmap = (idx, val) => {
      let value = parseInt(val);

      if (value < 0 || value === "NaN") {
        return "invalid";
      } else if (value <= 40) {
        return "low";
      } else if (value <= 75) {
        return "medium";
      } else if (value <= 100) {
        return "high";
      } else if (value > 100) {
        return "veryhigh";
      } else {
        // if (idx > 1 && val.match(/[a-z]/i)){
        //   return 'invalid'
        // }

        return "";
      }
    };
    return (
      <td
        className={heatmap(index, this.props.info)}
        onClick={() =>
          this.setState(currState => {
            // console.log(this.props);
            return { clicked: !currState.clicked };
          })
        }
      >
        {heatmap(index, this.props.info) === "invalid"
          ? "ERROR"
          : this.props.info}

        {!this.state.clicked ? (
          ""
        ) : (
          <input
            onChange={e =>
              this.props.changeCell(index, attribute, e.target.value)
            }
            onClick={e => e.stopPropagation()}
            placeholder="Enter Value"
          />
        )}
      </td>
    );
  }
}

export default Cell;
