import React from 'react'

class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      field1: 'field1',
      field2: 'field2',
    }
    this.generateChangeHandle = this.generateChangeHandle.bind(this);
  }
  generateChangeHandle(stateField) {
    return (e) => {
      const value = e.target.value;
      this.setState({
        [stateField]: value,
      })
    }
  }
  render() {
    const { field1, field2 } = this.state;
    return (
      <form>
        <input name="field1" data-bind="field1" onChange={this.generateChangeHandle('field1')} value={field1} />
        <input name="field2" data-bind="field2" onChange={this.generateChangeHandle('field2')} value={field2} />
        <button type="button">Submit</button>
      </form>
    )
  }
}

export default MyForm;
