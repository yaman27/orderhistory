import React, { Component } from "react";
import { url } from "../../../config/constants";
import axios from "axios";
import { Link } from "react-router-dom";

export default class userDetails extends Component {
  constructor() {
    super();
    this.state = {
      details: []
    };
  }
  componentDidMount() {
    axios
      .post(url + "/api/customer/userdetails", {
        userEmail: this.props.location.state.email
      })
      .then(res => {
        console.log(res.data.body.data);
        this.setState({
          details: res.data.body.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.details);

    const orderplaced = this.state.details.filter(eachuser => {

      if (eachuser.isPlaced == true) {
        return eachuser;
      }
    })
    return (
      <div className="container">
        <div>
          <Link to="/admin/landing">
            <button type="button" class="btn btn-indigo" id="promo_add">
              <i class="fas fa-arrow-left fa-sm pr-2" aria-hidden="true" />
              Back
            </button>
          </Link>
        </div>

        <h2>Order History</h2>
        <div >

          {orderplaced.map(userdetail => (
            <div>
              <h1>{userdetail.resName}</h1>
              <h3>{userdetail.date}</h3>
              <table className="table">
                <tr>
                  <th style={{ width: 50 + `%` }}>Item</th>
                  <th style={{ width: 50 + `%` }}>Item Price</th>
                </tr>
                {
                  userdetail.resMenu.map(eachmenu => (

                    <tr>
                      <td>{eachmenu.resItem}</td>
                      <td>{eachmenu.resPrice}</td>
                    </tr>
                  ))
                }
              </table>
            </div>

          ))}
        </div>

      </div>

    )
  }
}