import React, { Component } from 'react';

class InfoContainerItem extends Component {
  render() {
    const { genres } = this.props;

    return (
      <div>
        <input className='infoItem warning' type="button" value={`${genres.length} ${genres.length !== 1 ? " géneros" : " género"}`} />
      </div>
    );
  }
}

export default InfoContainerItem;
