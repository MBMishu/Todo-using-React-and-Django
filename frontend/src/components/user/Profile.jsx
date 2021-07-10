import React, { useState, useEffect } from "react";
import Axios from "axios";
import { domain, domain2, header } from "../../env/env";
import { alertService } from "../app/service";
import { Alert } from "../app/Alert";
import { Link, useHistory } from "react-router-dom";
import { useGlobalState } from "../../state/provider";

const Profile = () => {
  const [{ profile }, dispatch] = useGlobalState();
  console.log(profile, "from profile page");

  const [fullname, setFullname] = useState(profile?.name);
  const [image, setImage] = useState(null);

  const UpdateProfile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("name", fullname);

    await Axios({
      method: "POST",
      url: `${domain}/profileUpdate/`,
      headers: header,
      data: formdata,
    }).then((response) => {
      console.log(response.data, "profile picture");
      dispatch({
        type: "PAGE_RELOAD",
        pageReload: response.data,
      });
      alertService.success(response.data["msg"], {
        id: "left-alert",
      });
    });
  };

  return (
    <>
      <div className="container mt-5">
        <Alert id="left-alert" />
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <img
              src={`${domain2}${profile?.image}`}
              alt=""
              className="img-fluid "
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <p>
              <strong>Full name- </strong>
              {profile?.name}
            </p>
            <form onSubmit={UpdateProfile} enctype="multipart/form-data">
              <div class="form-group">
                <label for="exampleInputEmail1">full name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  value={fullname}
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Upload image</label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  class="form-control"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary">
                update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
