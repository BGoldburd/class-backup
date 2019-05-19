import React from 'react';

class Form extends React.Component {
    state = {}
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="number" name="zip" onChange={this.props.onZipChange} value={this.props.zip} />
                <button>submit</button>
            </form>
        );
    }
}

export default Form;