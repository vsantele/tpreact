import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap'
/*
import $ from 'jquery';
import {table } from 'bootstrap';
*/
import Row from './Row';

export default class Tableau extends React.Component {
  static propTypes = {
    tp: PropTypes.array,
    random: PropTypes.array,
 
  }
  render () {
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th>
              Français
            </th>
            <th>
              Neerlandais
            </th>
            <th>
              OVT
            </th>
            <th>
              Participe Passé
            </th>
            <th>
              Submit
            </th>
          </tr>
        </thead>
          <Row keyRow={this.props.key} random={this.props.random} tp = {this.props.tp}/>
      </Table>
    );
  }
}
