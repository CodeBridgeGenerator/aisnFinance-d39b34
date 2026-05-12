/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ApplicationsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount deals
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

    const onSave = async () => {
        let _data = {
            dealId: _entity?.dealId?._id,
status: _entity?.status,
noContactByTelephone: _entity?.noContactByTelephone,
noContactByPost: _entity?.noContactByPost,
noContactByElectronicMedia: _entity?.noContactByElectronicMedia,
noContactForMarketResearch: _entity?.noContactForMarketResearch,
applicationDocuments: _entity?.applicationDocuments,
        };

        setLoading(true);
        try {
            
        await client.service("applications").patch(_entity._id, _data);
        const eagerResult = await client
            .service("applications")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["clientId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info applications updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
        <Dialog header="Edit Applications" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="applications-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dealId">Deal Id:</label>
                <Dropdown id="dealId" value={_entity?.dealId?._id} optionLabel="name" optionValue="value" options={dealIdOptions} onChange={(e) => setValByKey("dealId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dealId"]) && (
              <p className="m-0" key="error-dealId">
                {error["dealId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactByTelephone">No Contact By Telephone:</label>
                <InputText id="noContactByTelephone" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactByTelephone} onChange={(e) => setValByKey("noContactByTelephone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactByTelephone"]) && (
              <p className="m-0" key="error-noContactByTelephone">
                {error["noContactByTelephone"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactByPost">No Contact By Post:</label>
                <InputText id="noContactByPost" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactByPost} onChange={(e) => setValByKey("noContactByPost", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactByPost"]) && (
              <p className="m-0" key="error-noContactByPost">
                {error["noContactByPost"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactByElectronicMedia">No Contact By Electronic Media:</label>
                <InputText id="noContactByElectronicMedia" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactByElectronicMedia} onChange={(e) => setValByKey("noContactByElectronicMedia", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactByElectronicMedia"]) && (
              <p className="m-0" key="error-noContactByElectronicMedia">
                {error["noContactByElectronicMedia"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noContactForMarketResearch">No Contact For Market Research:</label>
                <InputText id="noContactForMarketResearch" className="w-full mb-3 p-inputtext-sm" value={_entity?.noContactForMarketResearch} onChange={(e) => setValByKey("noContactForMarketResearch", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noContactForMarketResearch"]) && (
              <p className="m-0" key="error-noContactForMarketResearch">
                {error["noContactForMarketResearch"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicationDocuments">Application Documents:</label>
                <InputText id="applicationDocuments" className="w-full mb-3 p-inputtext-sm" value={_entity?.applicationDocuments} onChange={(e) => setValByKey("applicationDocuments", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationDocuments"]) && (
              <p className="m-0" key="error-applicationDocuments">
                {error["applicationDocuments"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(ApplicationsEditDialogComponent);
