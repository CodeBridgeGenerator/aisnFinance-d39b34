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

const ApplicationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [dealId], setError);
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
            dealId: _entity?.dealId?._id,status: _entity?.status,noContactByTelephone: _entity?.noContactByTelephone,noContactByPost: _entity?.noContactByPost,noContactByElectronicMedia: _entity?.noContactByElectronicMedia,noContactForMarketResearch: _entity?.noContactForMarketResearch,applicationDocuments: _entity?.applicationDocuments,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("applications").create(_data);
        const eagerResult = await client
            .service("applications")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["clientId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Applications updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Applications" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount deals
                    client
                        .service("deals")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDealsId } })
                        .then((res) => {
                            setDealId(res.data.map((e) => { return { name: e['clientId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Deals", type: "error", message: error.message || "Failed get deals" });
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

    const dealIdOptions = dealId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Applications" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="applications-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dealId">Deal Id:</label>
                <Dropdown id="dealId" value={_entity?.dealId?._id} optionLabel="name" optionValue="value" options={dealIdOptions} onChange={(e) => setValByKey("dealId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dealId"]) ? (
              <p className="m-0" key="error-dealId">
                {error["dealId"]}
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
                <label htmlFor="noContactByTelephone">No Contact By Telephone:</label>
                <InputText id="noContactByTelephone" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactByTelephone} onChange={(e) => setValByKey("noContactByTelephone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactByTelephone"]) ? (
              <p className="m-0" key="error-noContactByTelephone">
                {error["noContactByTelephone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactByPost">No Contact By Post:</label>
                <InputText id="noContactByPost" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactByPost} onChange={(e) => setValByKey("noContactByPost", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactByPost"]) ? (
              <p className="m-0" key="error-noContactByPost">
                {error["noContactByPost"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactByElectronicMedia">No Contact By Electronic Media:</label>
                <InputText id="noContactByElectronicMedia" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactByElectronicMedia} onChange={(e) => setValByKey("noContactByElectronicMedia", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactByElectronicMedia"]) ? (
              <p className="m-0" key="error-noContactByElectronicMedia">
                {error["noContactByElectronicMedia"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactForMarketResearch">No Contact For Market Research:</label>
                <InputText id="noContactForMarketResearch" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactForMarketResearch} onChange={(e) => setValByKey("noContactForMarketResearch", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactForMarketResearch"]) ? (
              <p className="m-0" key="error-noContactForMarketResearch">
                {error["noContactForMarketResearch"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicationDocuments">Application Documents:</label>
                <InputText id="applicationDocuments" className="w-full mb-3 p-inputtext-sm" value={_entity?.applicationDocuments} onChange={(e) => setValByKey("applicationDocuments", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationDocuments"]) ? (
              <p className="m-0" key="error-applicationDocuments">
                {error["applicationDocuments"]}
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

export default connect(mapState, mapDispatch)(ApplicationsCreateDialogComponent);
