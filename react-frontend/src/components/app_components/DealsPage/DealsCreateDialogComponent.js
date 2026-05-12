import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const DealsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientId, setClientId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [clientId], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            segment: _entity?.segment,currentStage: _entity?.currentStage,status: _entity?.status,clientId: _entity?.clientId?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("deals").create(_data);
        const eagerResult = await client
            .service("deals")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "clientId",
                    service : "clients",
                    select:["userId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Deals updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Deals" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount clients
                    client
                        .service("clients")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleClientsId } })
                        .then((res) => {
                            setClientId(res.data.map((e) => { return { name: e['userId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Clients", type: "error", message: error.message || "Failed get clients" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const clientIdOptions = clientId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Deals" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="deals-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="segment">Segment:</label>
                <InputText id="segment" className="w-full mb-3 p-inputtext-sm" value={_entity?.segment} onChange={(e) => setValByKey("segment", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["segment"]) ? (
              <p className="m-0" key="error-segment">
                {error["segment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="currentStage">Current Stage:</label>
                <InputText id="currentStage" className="w-full mb-3 p-inputtext-sm" value={_entity?.currentStage} onChange={(e) => setValByKey("currentStage", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["currentStage"]) ? (
              <p className="m-0" key="error-currentStage">
                {error["currentStage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientId">Client Id:</label>
                <Dropdown id="clientId" value={_entity?.clientId?._id} optionLabel="name" optionValue="value" options={clientIdOptions} onChange={(e) => setValByKey("clientId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientId"]) ? (
              <p className="m-0" key="error-clientId">
                {error["clientId"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(DealsCreateDialogComponent);
