import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleClientsPage from "../components/app_components/ClientsPage/SingleClientsPage";
import ClientProjectLayoutPage from "../components/app_components/ClientsPage/ClientProjectLayoutPage";
import SingleDealsPage from "../components/app_components/DealsPage/SingleDealsPage";
import DealProjectLayoutPage from "../components/app_components/DealsPage/DealProjectLayoutPage";
import SingleDealStageHistoryPage from "../components/app_components/DealStageHistoryPage/SingleDealStageHistoryPage";
import DealStageHistoryProjectLayoutPage from "../components/app_components/DealStageHistoryPage/DealStageHistoryProjectLayoutPage";
import SingleApplicationsPage from "../components/app_components/ApplicationsPage/SingleApplicationsPage";
import ApplicationProjectLayoutPage from "../components/app_components/ApplicationsPage/ApplicationProjectLayoutPage";
import SingleMortageDetailsPage from "../components/app_components/MortageDetailsPage/SingleMortageDetailsPage";
import MortageDetailProjectLayoutPage from "../components/app_components/MortageDetailsPage/MortageDetailProjectLayoutPage";
import SinglePersonalDetailsPage from "../components/app_components/PersonalDetailsPage/SinglePersonalDetailsPage";
import PersonalDetailProjectLayoutPage from "../components/app_components/PersonalDetailsPage/PersonalDetailProjectLayoutPage";
import SingleBusinessDetailsPage from "../components/app_components/BusinessDetailsPage/SingleBusinessDetailsPage";
import BusinessDetailProjectLayoutPage from "../components/app_components/BusinessDetailsPage/BusinessDetailProjectLayoutPage";
import SingleSecurityPropertiesPage from "../components/app_components/SecurityPropertiesPage/SingleSecurityPropertiesPage";
import SecurityPropertyProjectLayoutPage from "../components/app_components/SecurityPropertiesPage/SecurityPropertyProjectLayoutPage";
import SingleAssetsLiabilitiesPage from "../components/app_components/AssetsLiabilitiesPage/SingleAssetsLiabilitiesPage";
import AssetsLiabilityProjectLayoutPage from "../components/app_components/AssetsLiabilitiesPage/AssetsLiabilityProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/clients/:singleClientsId" exact element={<SingleClientsPage />} />
<Route path="/clients" exact element={<ClientProjectLayoutPage />} />
<Route path="/deals/:singleDealsId" exact element={<SingleDealsPage />} />
<Route path="/deals" exact element={<DealProjectLayoutPage />} />
<Route path="/dealStageHistory/:singleDealStageHistoryId" exact element={<SingleDealStageHistoryPage />} />
<Route path="/dealStageHistory" exact element={<DealStageHistoryProjectLayoutPage />} />
<Route path="/applications/:singleApplicationsId" exact element={<SingleApplicationsPage />} />
<Route path="/applications" exact element={<ApplicationProjectLayoutPage />} />
<Route path="/mortageDetails/:singleMortageDetailsId" exact element={<SingleMortageDetailsPage />} />
<Route path="/mortageDetails" exact element={<MortageDetailProjectLayoutPage />} />
<Route path="/personalDetails/:singlePersonalDetailsId" exact element={<SinglePersonalDetailsPage />} />
<Route path="/personalDetails" exact element={<PersonalDetailProjectLayoutPage />} />
<Route path="/businessDetails/:singleBusinessDetailsId" exact element={<SingleBusinessDetailsPage />} />
<Route path="/businessDetails" exact element={<BusinessDetailProjectLayoutPage />} />
<Route path="/securityProperties/:singleSecurityPropertiesId" exact element={<SingleSecurityPropertiesPage />} />
<Route path="/securityProperties" exact element={<SecurityPropertyProjectLayoutPage />} />
<Route path="/assetsLiabilities/:singleAssetsLiabilitiesId" exact element={<SingleAssetsLiabilitiesPage />} />
<Route path="/assetsLiabilities" exact element={<AssetsLiabilityProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
