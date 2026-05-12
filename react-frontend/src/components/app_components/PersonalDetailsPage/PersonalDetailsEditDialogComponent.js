/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from "primereact/calendar";


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

const PersonalDetailsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            title: _entity?.title,
firstName: _entity?.firstName,
middleName: _entity?.middleName,
lastName: _entity?.lastName,
previousSurname: _entity?.previousSurname,
dateOfBirth: _entity?.dateOfBirth,
nationality: _entity?.nationality,
countryOfResidence: _entity?.countryOfResidence,
residentialAddress: _entity?.residentialAddress,
postCode: _entity?.postCode,
previousAddress: _entity?.previousAddress,
contactPreference: _entity?.contactPreference,
phoneHome: _entity?.phoneHome,
phoneMobile: _entity?.phoneMobile,
email: _entity?.email,
capacityRole: _entity?.capacityRole,
sharesHeldPct: _entity?.sharesHeldPct,
everBankrupt: _entity?.everBankrupt,
missedRepayments: _entity?.missedRepayments,
ivaCva: _entity?.ivaCva,
propertyRepossessed: _entity?.propertyRepossessed,
courtOrder: _entity?.courtOrder,
brokenCreditAgreement: _entity?.brokenCreditAgreement,
associatedBusinessFailure: _entity?.associatedBusinessFailure,
adverseCreditDetails: _entity?.adverseCreditDetails,
employerName: _entity?.employerName,
jobTitle: _entity?.jobTitle,
annuaLSalary: _entity?.annuaLSalary,
isEmploymentContinues: _entity?.isEmploymentContinues,
signature: _entity?.signature,
signedDate: _entity?.signedDate,
        };

        setLoading(true);
        try {
            
        const result = await client.service("personalDetails").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info personalDetails updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Personal Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="personalDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="title">Title:</label>
                <InputText id="title" className="w-full mb-3 p-inputtext-sm" value={_entity?.title} onChange={(e) => setValByKey("title", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["title"]) && (
              <p className="m-0" key="error-title">
                {error["title"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstName">First Name:</label>
                <InputText id="firstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstName} onChange={(e) => setValByKey("firstName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstName"]) && (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="middleName">Middle Name:</label>
                <InputText id="middleName" className="w-full mb-3 p-inputtext-sm" value={_entity?.middleName} onChange={(e) => setValByKey("middleName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["middleName"]) && (
              <p className="m-0" key="error-middleName">
                {error["middleName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lastName">Last Name:</label>
                <InputText id="lastName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lastName} onChange={(e) => setValByKey("lastName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lastName"]) && (
              <p className="m-0" key="error-lastName">
                {error["lastName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="previousSurname">Previous Surname:</label>
                <InputText id="previousSurname" className="w-full mb-3 p-inputtext-sm" value={_entity?.previousSurname} onChange={(e) => setValByKey("previousSurname", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["previousSurname"]) && (
              <p className="m-0" key="error-previousSurname">
                {error["previousSurname"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <Calendar id="dateOfBirth" value={_entity?.dateOfBirth ? new Date(_entity?.dateOfBirth) : null} onChange={ (e) => setValByKey("dateOfBirth", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateOfBirth"]) && (
              <p className="m-0" key="error-dateOfBirth">
                {error["dateOfBirth"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nationality">Nationality:</label>
                <InputText id="nationality" className="w-full mb-3 p-inputtext-sm" value={_entity?.nationality} onChange={(e) => setValByKey("nationality", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nationality"]) && (
              <p className="m-0" key="error-nationality">
                {error["nationality"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="countryOfResidence">Country Of Residence:</label>
                <InputText id="countryOfResidence" className="w-full mb-3 p-inputtext-sm" value={_entity?.countryOfResidence} onChange={(e) => setValByKey("countryOfResidence", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["countryOfResidence"]) && (
              <p className="m-0" key="error-countryOfResidence">
                {error["countryOfResidence"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="residentialAddress">Residential Address:</label>
                <InputText id="residentialAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.residentialAddress} onChange={(e) => setValByKey("residentialAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["residentialAddress"]) && (
              <p className="m-0" key="error-residentialAddress">
                {error["residentialAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="postCode">Post Code:</label>
                <InputText id="postCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.postCode} onChange={(e) => setValByKey("postCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postCode"]) && (
              <p className="m-0" key="error-postCode">
                {error["postCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="previousAddress">Previous Address:</label>
                <InputText id="previousAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.previousAddress} onChange={(e) => setValByKey("previousAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["previousAddress"]) && (
              <p className="m-0" key="error-previousAddress">
                {error["previousAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="contactPreference">ContactPreference:</label>
                <InputText id="contactPreference" className="w-full mb-3 p-inputtext-sm" value={_entity?.contactPreference} onChange={(e) => setValByKey("contactPreference", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactPreference"]) && (
              <p className="m-0" key="error-contactPreference">
                {error["contactPreference"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phoneHome">Phone Home:</label>
                <InputText id="phoneHome" className="w-full mb-3 p-inputtext-sm" value={_entity?.phoneHome} onChange={(e) => setValByKey("phoneHome", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phoneHome"]) && (
              <p className="m-0" key="error-phoneHome">
                {error["phoneHome"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phoneMobile">Phone Mobile:</label>
                <InputText id="phoneMobile" className="w-full mb-3 p-inputtext-sm" value={_entity?.phoneMobile} onChange={(e) => setValByKey("phoneMobile", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phoneMobile"]) && (
              <p className="m-0" key="error-phoneMobile">
                {error["phoneMobile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="email">Email:</label>
                <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["email"]) && (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="capacityRole">Capacity Role:</label>
                <InputText id="capacityRole" className="w-full mb-3 p-inputtext-sm" value={_entity?.capacityRole} onChange={(e) => setValByKey("capacityRole", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["capacityRole"]) && (
              <p className="m-0" key="error-capacityRole">
                {error["capacityRole"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sharesHeldPct">Shares Held Pct:</label>
                <InputText id="sharesHeldPct" className="w-full mb-3 p-inputtext-sm" value={_entity?.sharesHeldPct} onChange={(e) => setValByKey("sharesHeldPct", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sharesHeldPct"]) && (
              <p className="m-0" key="error-sharesHeldPct">
                {error["sharesHeldPct"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="everBankrupt">Ever Bankrupt:</label>
                <InputText id="everBankrupt" className="w-full mb-3 p-inputtext-sm" value={_entity?.everBankrupt} onChange={(e) => setValByKey("everBankrupt", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["everBankrupt"]) && (
              <p className="m-0" key="error-everBankrupt">
                {error["everBankrupt"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="missedRepayments">missedRepayments:</label>
                <InputText id="missedRepayments" className="w-full mb-3 p-inputtext-sm" value={_entity?.missedRepayments} onChange={(e) => setValByKey("missedRepayments", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["missedRepayments"]) && (
              <p className="m-0" key="error-missedRepayments">
                {error["missedRepayments"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ivaCva">ivaCva:</label>
                <InputText id="ivaCva" className="w-full mb-3 p-inputtext-sm" value={_entity?.ivaCva} onChange={(e) => setValByKey("ivaCva", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ivaCva"]) && (
              <p className="m-0" key="error-ivaCva">
                {error["ivaCva"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="propertyRepossessed">propertyRepossessed:</label>
                <InputText id="propertyRepossessed" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyRepossessed} onChange={(e) => setValByKey("propertyRepossessed", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyRepossessed"]) && (
              <p className="m-0" key="error-propertyRepossessed">
                {error["propertyRepossessed"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="courtOrder">courtOrder:</label>
                <InputText id="courtOrder" className="w-full mb-3 p-inputtext-sm" value={_entity?.courtOrder} onChange={(e) => setValByKey("courtOrder", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["courtOrder"]) && (
              <p className="m-0" key="error-courtOrder">
                {error["courtOrder"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="brokenCreditAgreement">brokenCreditAgreement:</label>
                <InputText id="brokenCreditAgreement" className="w-full mb-3 p-inputtext-sm" value={_entity?.brokenCreditAgreement} onChange={(e) => setValByKey("brokenCreditAgreement", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["brokenCreditAgreement"]) && (
              <p className="m-0" key="error-brokenCreditAgreement">
                {error["brokenCreditAgreement"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="associatedBusinessFailure">associatedBusinessFailure:</label>
                <InputText id="associatedBusinessFailure" className="w-full mb-3 p-inputtext-sm" value={_entity?.associatedBusinessFailure} onChange={(e) => setValByKey("associatedBusinessFailure", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["associatedBusinessFailure"]) && (
              <p className="m-0" key="error-associatedBusinessFailure">
                {error["associatedBusinessFailure"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="adverseCreditDetails">adverseCreditDetails:</label>
                <InputText id="adverseCreditDetails" className="w-full mb-3 p-inputtext-sm" value={_entity?.adverseCreditDetails} onChange={(e) => setValByKey("adverseCreditDetails", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["adverseCreditDetails"]) && (
              <p className="m-0" key="error-adverseCreditDetails">
                {error["adverseCreditDetails"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="employerName">employerName:</label>
                <InputText id="employerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.employerName} onChange={(e) => setValByKey("employerName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employerName"]) && (
              <p className="m-0" key="error-employerName">
                {error["employerName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="jobTitle">jobTitle:</label>
                <InputText id="jobTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobTitle} onChange={(e) => setValByKey("jobTitle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobTitle"]) && (
              <p className="m-0" key="error-jobTitle">
                {error["jobTitle"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="annuaLSalary">Annua lSalary:</label>
                <InputText id="annuaLSalary" className="w-full mb-3 p-inputtext-sm" value={_entity?.annuaLSalary} onChange={(e) => setValByKey("annuaLSalary", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["annuaLSalary"]) && (
              <p className="m-0" key="error-annuaLSalary">
                {error["annuaLSalary"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isEmploymentContinues">Is Employment Continues:</label>
                <Checkbox id="isEmploymentContinues" className="ml-3" checked={_entity?.isEmploymentContinues} onChange={(e) => setValByKey("isEmploymentContinues", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isEmploymentContinues"]) && (
              <p className="m-0" key="error-isEmploymentContinues">
                {error["isEmploymentContinues"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="signature">Signature:</label>
                <InputText id="signature" className="w-full mb-3 p-inputtext-sm" value={_entity?.signature} onChange={(e) => setValByKey("signature", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["signature"]) && (
              <p className="m-0" key="error-signature">
                {error["signature"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="signedDate">Signed Date:</label>
                <Calendar id="signedDate"  value={_entity?.signedDate ? new Date(_entity?.signedDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("signedDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["signedDate"]) && (
              <p className="m-0" key="error-signedDate">
                {error["signedDate"]}
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

export default connect(mapState, mapDispatch)(PersonalDetailsEditDialogComponent);
