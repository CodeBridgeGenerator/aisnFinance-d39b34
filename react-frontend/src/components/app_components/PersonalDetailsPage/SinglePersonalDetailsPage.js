import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SinglePersonalDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    

    useEffect(() => {
        //on mount
        client
            .service("personalDetails")
            .get(urlParams.singlePersonalDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "PersonalDetails", type: "error", message: error.message || "Failed get personalDetails" });
            });
    }, [props,urlParams.singlePersonalDetailsId]);


    const goBack = () => {
        navigate("/app/personalDetails");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Personal Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>personalDetails/{urlParams.singlePersonalDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Title</label><p className="m-0 ml-3" >{_entity?.title}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">First Name</label><p className="m-0 ml-3" >{_entity?.firstName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Middle Name</label><p className="m-0 ml-3" >{_entity?.middleName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Last Name</label><p className="m-0 ml-3" >{_entity?.lastName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Previous Surname</label><p className="m-0 ml-3" >{_entity?.previousSurname}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Date Of Birth</label><p id="dateOfBirth" className="m-0 ml-3" >{_entity?.dateOfBirth}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Nationality</label><p className="m-0 ml-3" >{_entity?.nationality}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Country Of Residence</label><p className="m-0 ml-3" >{_entity?.countryOfResidence}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Residential Address</label><p className="m-0 ml-3" >{_entity?.residentialAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Post Code</label><p className="m-0 ml-3" >{_entity?.postCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Previous Address</label><p className="m-0 ml-3" >{_entity?.previousAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ContactPreference</label><p className="m-0 ml-3" >{_entity?.contactPreference}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Phone Home</label><p className="m-0 ml-3" >{_entity?.phoneHome}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Phone Mobile</label><p className="m-0 ml-3" >{_entity?.phoneMobile}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email</label><p className="m-0 ml-3" >{_entity?.email}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Capacity Role</label><p className="m-0 ml-3" >{_entity?.capacityRole}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shares Held Pct</label><p className="m-0 ml-3" >{_entity?.sharesHeldPct}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Ever Bankrupt</label><p className="m-0 ml-3" >{_entity?.everBankrupt}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">missedRepayments</label><p className="m-0 ml-3" >{_entity?.missedRepayments}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ivaCva</label><p className="m-0 ml-3" >{_entity?.ivaCva}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">propertyRepossessed</label><p className="m-0 ml-3" >{_entity?.propertyRepossessed}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">courtOrder</label><p className="m-0 ml-3" >{_entity?.courtOrder}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">brokenCreditAgreement</label><p className="m-0 ml-3" >{_entity?.brokenCreditAgreement}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">associatedBusinessFailure</label><p className="m-0 ml-3" >{_entity?.associatedBusinessFailure}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">adverseCreditDetails</label><p className="m-0 ml-3" >{_entity?.adverseCreditDetails}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">employerName</label><p className="m-0 ml-3" >{_entity?.employerName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">jobTitle</label><p className="m-0 ml-3" >{_entity?.jobTitle}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Annua lSalary</label><p className="m-0 ml-3" >{_entity?.annuaLSalary}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Is Employment Continues</label><p className="m-0" ><i id="isEmploymentContinues" className={`pi ${_entity?.isEmploymentContinues?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Signature</label><p className="m-0 ml-3" >{_entity?.signature}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singlePersonalDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="personalDetails"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SinglePersonalDetailsPage);
