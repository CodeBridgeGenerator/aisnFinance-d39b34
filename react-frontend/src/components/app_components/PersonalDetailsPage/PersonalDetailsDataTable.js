import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const PersonalDetailsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);
  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5 className="m-0"></h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

const pTitleTemplate0 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
const pFirstNameTemplate1 = (rowData, { rowIndex }) => <p >{rowData.firstName}</p>
const pMiddleNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.middleName}</p>
const pLastNameTemplate3 = (rowData, { rowIndex }) => <p >{rowData.lastName}</p>
const pPreviousSurnameTemplate4 = (rowData, { rowIndex }) => <p >{rowData.previousSurname}</p>
const p_calendarDateOfBirthTemplate5 = (rowData, { rowIndex }) => <p >{moment(rowData.dateOfBirth).fromNow()}</p>
const pNationalityTemplate6 = (rowData, { rowIndex }) => <p >{rowData.nationality}</p>
const pCountryOfResidenceTemplate7 = (rowData, { rowIndex }) => <p >{rowData.countryOfResidence}</p>
const pResidentialAddressTemplate8 = (rowData, { rowIndex }) => <p >{rowData.residentialAddress}</p>
const pPostCodeTemplate9 = (rowData, { rowIndex }) => <p >{rowData.postCode}</p>
const pPreviousAddressTemplate10 = (rowData, { rowIndex }) => <p >{rowData.previousAddress}</p>
const pContactPreferenceTemplate11 = (rowData, { rowIndex }) => <p >{rowData.contactPreference}</p>
const pPhoneHomeTemplate12 = (rowData, { rowIndex }) => <p >{rowData.phoneHome}</p>
const pPhoneMobileTemplate13 = (rowData, { rowIndex }) => <p >{rowData.phoneMobile}</p>
const pEmailTemplate14 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
const pCapacityRoleTemplate15 = (rowData, { rowIndex }) => <p >{rowData.capacityRole}</p>
const pSharesHeldPctTemplate16 = (rowData, { rowIndex }) => <p >{rowData.sharesHeldPct}</p>
const pEverBankruptTemplate17 = (rowData, { rowIndex }) => <p >{rowData.everBankrupt}</p>
const pMissedRepaymentsTemplate18 = (rowData, { rowIndex }) => <p >{rowData.missedRepayments}</p>
const pIvaCvaTemplate19 = (rowData, { rowIndex }) => <p >{rowData.ivaCva}</p>
const pPropertyRepossessedTemplate20 = (rowData, { rowIndex }) => <p >{rowData.propertyRepossessed}</p>
const pCourtOrderTemplate21 = (rowData, { rowIndex }) => <p >{rowData.courtOrder}</p>
const pBrokenCreditAgreementTemplate22 = (rowData, { rowIndex }) => <p >{rowData.brokenCreditAgreement}</p>
const pAssociatedBusinessFailureTemplate23 = (rowData, { rowIndex }) => <p >{rowData.associatedBusinessFailure}</p>
const pAdverseCreditDetailsTemplate24 = (rowData, { rowIndex }) => <p >{rowData.adverseCreditDetails}</p>
const pEmployerNameTemplate25 = (rowData, { rowIndex }) => <p >{rowData.employerName}</p>
const pJobTitleTemplate26 = (rowData, { rowIndex }) => <p >{rowData.jobTitle}</p>
const pAnnuaLSalaryTemplate27 = (rowData, { rowIndex }) => <p >{rowData.annuaLSalary}</p>
const p_booleanIsEmploymentContinuesTemplate28 = (rowData, { rowIndex }) => <p >{String(rowData.isEmploymentContinues)}</p>
const pSignatureTemplate29 = (rowData, { rowIndex }) => <p >{rowData.signature}</p>
const p_dateSignedDateTemplate30 = (rowData, { rowIndex }) => <p >{moment(rowData.signedDate).fromNow()}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        globalFilter={globalFilter}
        header={header}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="title" header="Title" body={pTitleTemplate0} filter={selectedFilterFields.includes("title")} hidden={selectedHideFields?.includes("title")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="firstName" header="First Name" body={pFirstNameTemplate1} filter={selectedFilterFields.includes("firstName")} hidden={selectedHideFields?.includes("firstName")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="middleName" header="Middle Name" body={pMiddleNameTemplate2} filter={selectedFilterFields.includes("middleName")} hidden={selectedHideFields?.includes("middleName")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="lastName" header="Last Name" body={pLastNameTemplate3} filter={selectedFilterFields.includes("lastName")} hidden={selectedHideFields?.includes("lastName")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="previousSurname" header="Previous Surname" body={pPreviousSurnameTemplate4} filter={selectedFilterFields.includes("previousSurname")} hidden={selectedHideFields?.includes("previousSurname")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="dateOfBirth" header="Date Of Birth" body={p_calendarDateOfBirthTemplate5} filter={selectedFilterFields.includes("dateOfBirth")} hidden={selectedHideFields?.includes("dateOfBirth")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="nationality" header="Nationality" body={pNationalityTemplate6} filter={selectedFilterFields.includes("nationality")} hidden={selectedHideFields?.includes("nationality")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="countryOfResidence" header="Country Of Residence" body={pCountryOfResidenceTemplate7} filter={selectedFilterFields.includes("countryOfResidence")} hidden={selectedHideFields?.includes("countryOfResidence")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="residentialAddress" header="Residential Address" body={pResidentialAddressTemplate8} filter={selectedFilterFields.includes("residentialAddress")} hidden={selectedHideFields?.includes("residentialAddress")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="postCode" header="Post Code" body={pPostCodeTemplate9} filter={selectedFilterFields.includes("postCode")} hidden={selectedHideFields?.includes("postCode")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="previousAddress" header="Previous Address" body={pPreviousAddressTemplate10} filter={selectedFilterFields.includes("previousAddress")} hidden={selectedHideFields?.includes("previousAddress")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="contactPreference" header="Contact Preference" body={pContactPreferenceTemplate11} filter={selectedFilterFields.includes("contactPreference")} hidden={selectedHideFields?.includes("contactPreference")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="phoneHome" header="Phone Home" body={pPhoneHomeTemplate12} filter={selectedFilterFields.includes("phoneHome")} hidden={selectedHideFields?.includes("phoneHome")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="phoneMobile" header="Phone Mobile" body={pPhoneMobileTemplate13} filter={selectedFilterFields.includes("phoneMobile")} hidden={selectedHideFields?.includes("phoneMobile")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="email" header="Email" body={pEmailTemplate14} filter={selectedFilterFields.includes("email")} hidden={selectedHideFields?.includes("email")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="capacityRole" header="Capacity Role" body={pCapacityRoleTemplate15} filter={selectedFilterFields.includes("capacityRole")} hidden={selectedHideFields?.includes("capacityRole")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="sharesHeldPct" header="Shares Held Pct" body={pSharesHeldPctTemplate16} filter={selectedFilterFields.includes("sharesHeldPct")} hidden={selectedHideFields?.includes("sharesHeldPct")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="everBankrupt" header="Ever Bankrupt" body={pEverBankruptTemplate17} filter={selectedFilterFields.includes("everBankrupt")} hidden={selectedHideFields?.includes("everBankrupt")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="missedRepayments" header="Missed Repayments" body={pMissedRepaymentsTemplate18} filter={selectedFilterFields.includes("missedRepayments")} hidden={selectedHideFields?.includes("missedRepayments")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="ivaCva" header="Iva Cva" body={pIvaCvaTemplate19} filter={selectedFilterFields.includes("ivaCva")} hidden={selectedHideFields?.includes("ivaCva")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="propertyRepossessed" header="Property Repossessed" body={pPropertyRepossessedTemplate20} filter={selectedFilterFields.includes("propertyRepossessed")} hidden={selectedHideFields?.includes("propertyRepossessed")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="courtOrder" header="Court Order" body={pCourtOrderTemplate21} filter={selectedFilterFields.includes("courtOrder")} hidden={selectedHideFields?.includes("courtOrder")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="brokenCreditAgreement" header="Broken Credit Agreement" body={pBrokenCreditAgreementTemplate22} filter={selectedFilterFields.includes("brokenCreditAgreement")} hidden={selectedHideFields?.includes("brokenCreditAgreement")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="associatedBusinessFailure" header="Associated Business Failure" body={pAssociatedBusinessFailureTemplate23} filter={selectedFilterFields.includes("associatedBusinessFailure")} hidden={selectedHideFields?.includes("associatedBusinessFailure")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="adverseCreditDetails" header="Adverse Credit Details" body={pAdverseCreditDetailsTemplate24} filter={selectedFilterFields.includes("adverseCreditDetails")} hidden={selectedHideFields?.includes("adverseCreditDetails")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="employerName" header="Employer Name" body={pEmployerNameTemplate25} filter={selectedFilterFields.includes("employerName")} hidden={selectedHideFields?.includes("employerName")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="jobTitle" header="Job Title" body={pJobTitleTemplate26} filter={selectedFilterFields.includes("jobTitle")} hidden={selectedHideFields?.includes("jobTitle")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="annuaLSalary" header="Annua L Salary" body={pAnnuaLSalaryTemplate27} filter={selectedFilterFields.includes("annuaLSalary")} hidden={selectedHideFields?.includes("annuaLSalary")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="isEmploymentContinues" header="Is Employment Continues" body={p_booleanIsEmploymentContinuesTemplate28} filter={selectedFilterFields.includes("isEmploymentContinues")} hidden={selectedHideFields?.includes("isEmploymentContinues")}    style={{ minWidth: "8rem" }} />
<Column field="signature" header="Signature" body={pSignatureTemplate29} filter={selectedFilterFields.includes("signature")} hidden={selectedHideFields?.includes("signature")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="signedDate" header="Signed Date" body={p_dateSignedDateTemplate30} filter={selectedFilterFields.includes("signedDate")} hidden={selectedHideFields?.includes("signedDate")}  sortable  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload PersonalDetails Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="personalDetails"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search PersonalDetails" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default PersonalDetailsDataTable;