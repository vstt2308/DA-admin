/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// login
// const AsyncLoginComponent = Loadable({
//    loader: () => import("Routes/auth/index"),
//    loading: () => <RctPageLoader />,
// });
const AsyncAttractionOrderComponent = Loadable({
  loader: () => import('Routes/orders/attraction/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCitiescapeOrderComponent = Loadable({
  loader: () => import('Routes/orders/cities_escape/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncToursComponent = Loadable({
  loader: () => import('Routes/orders/tours/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncFlightComponent = Loadable({
  loader: () => import('Routes/orders/flight/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncHotelComponent = Loadable({
  loader: () => import('Routes/orders/hotel/index.js'),
  loading: () => <RctPageLoader />
});

const AsyncInquiryComponent = Loadable({
  loader: () => import('Routes/orders/inquiry/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncPassengerComponent = Loadable({
  loader: () => import('Routes/account/passenger/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncVoucherComponent = Loadable({
  loader: () => import('Routes/vouchers/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAssignmentComponent = Loadable({
  loader: () => import('Routes/assignment/index.js'),
  loading: () => <RctPageLoader />
});

//itineraries
const AsyncItinerariesComponent = Loadable({
  loader: () => import('Routes/itineraries/index.js'),
  loading: () => <RctPageLoader />
});
// ticket itineraries

const AsyncTicketItinerariesComponent = Loadable({
  loader: () => import('Routes/products/itineraries/index.js'),
  loading: () => <RctPageLoader />
});
//product
const AsyncToursProductComponent = Loadable({
  loader: () => import('Routes/products/tours/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncHotelsProductComponent = Loadable({
  loader: () => import('Routes/products/hotels/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncFlightProductComponent = Loadable({
  loader: () => import('Routes/products/flights/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAttractionProductComponent = Loadable({
  loader: () => import('Routes/products/attraction/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCitiesEscapeProductComponent = Loadable({
  loader: () => import('Routes/products/cities_Escape/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncProductComponent = Loadable({
  loader: () => import('Routes/products/product/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCountryComponent = Loadable({
  loader: () => import('Routes/masters/country/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAirlinesMastersComponent = Loadable({
  loader: () => import('Routes/masters/airlines/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCurrencyComponent = Loadable({
  loader: () => import('Routes/masters/currency/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncDestinationComponent = Loadable({
  loader: () => import('Routes/masters/destination/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncEmail_TemplatesComponent = Loadable({
  loader: () => import('Routes/masters/email_templates/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncLanguageComponent = Loadable({
  loader: () => import('Routes/masters/language/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncIntegrationComponent = Loadable({
  loader: () => import('Routes/settings/integration/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncSale_ReportsComponent = Loadable({
  loader: () => import('Routes/reports/sale_reports/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCusmer_ReporttoComponent = Loadable({
  loader: () => import('Routes/reports/customer_report/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAssetsComponent = Loadable({
  loader: () => import('Routes/grouping/assets/index.js'),
  loading: () => <RctPageLoader />
});

const AsyncGroupsComponent = Loadable({
  loader: () => import('Routes/grouping/groups/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCategoryMastersComponent = Loadable({
  loader: () => import('Routes/masters/category/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncReviewsProductComponent = Loadable({
  loader: () => import('Routes/products/reviews/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncContractComponent = Loadable({
  loader: () => import('Routes/masters/contract/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAdminComponent = Loadable({
  loader: () => import('Routes/account/admin/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncRegisteredComponent = Loadable({
  loader: () => import('Routes/account/registered/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAgentComponent = Loadable({
  loader: () => import('Routes/account/agent/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncSupplierComponent = Loadable({
  loader: () => import('Routes/account/supplier/index.js'),
  loading: () => <RctPageLoader />
});


const AsyncMessagesComponent = Loadable({
  loader: () => import('Routes/messages/messages/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncSubcriberMessagesComponent = Loadable({
  loader: () => import('Routes/messages/subcribers/index.js'),
  loading: () => <RctPageLoader />
});

const AsyncGuideComponent = Loadable({
  loader: () => import('Routes/guide/guide/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncGuideCalendarComponent = Loadable({
  loader: () => import('Routes/guide/guide_calendar/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncGitComponent = Loadable({
  loader: () => import('Routes/guide/git/index.js'),
  loading: () => <RctPageLoader />
});

const AsyncConfigComponent = Loadable({
  loader: () => import('Routes/settings/config/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncOfficeComponent = Loadable({
  loader: () => import('Routes/settings/office/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncFileManagerComponent = Loadable({
  loader: () => import('Routes/fileManager/FileManager.js'),
  loading: () => <RctPageLoader />
});
const AsyncRulesComponent = Loadable({
  loader: () => import('Routes/loyalty/rules/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncActivitiesComponent = Loadable({
  loader: () => import('Routes/loyalty/activities/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCouponComponent = Loadable({
  loader: () => import('Routes/loyalty/coupon/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncPagesComponent = Loadable({
  loader: () => import('Routes/pages/page_index.js'),
  loading: () => <RctPageLoader />
});

const AsyncCommonAppSettingComponent = Loadable({
  loader: () => import('Routes/settings/commonSetting/index.js'),
  loading: () => <RctPageLoader />
});

// chat app
const AsyncChatComponent = Loadable({
  loader: () => import("Routes/chat"),
  loading: () => <RctPageLoader />,
});

export {
  AsyncProductComponent,
  AsyncToursComponent,
  AsyncFlightComponent,
  AsyncHotelComponent,
  AsyncGuideComponent,
  AsyncGuideCalendarComponent,
  AsyncGitComponent,
  AsyncCouponComponent,
  AsyncInquiryComponent,
  AsyncItinerariesComponent,
  AsyncTicketItinerariesComponent,
  AsyncVoucherComponent,
  AsyncToursProductComponent,
  AsyncHotelsProductComponent,
  AsyncAirlinesMastersComponent,
  AsyncFlightProductComponent,
  AsyncReviewsProductComponent,
  AsyncCountryComponent,
  AsyncCurrencyComponent,
  AsyncDestinationComponent,
  AsyncEmail_TemplatesComponent,
  AsyncLanguageComponent,
  AsyncIntegrationComponent,
  AsyncSale_ReportsComponent,
  AsyncCusmer_ReporttoComponent,
  AsyncAssetsComponent,
  AsyncGroupsComponent,
  AsyncCategoryMastersComponent,
  AsyncMessagesComponent,
  AsyncSubcriberMessagesComponent,
  AsyncContractComponent,
  AsyncAdminComponent,
  AsyncRegisteredComponent,
  AsyncAgentComponent,
  AsyncSupplierComponent,
  AsyncConfigComponent,
  AsyncFileManagerComponent,
  AsyncOfficeComponent,
  AsyncRulesComponent,
  AsyncActivitiesComponent,
  AsyncPassengerComponent,
  AsyncPagesComponent,
  AsyncAssignmentComponent,
  AsyncCommonAppSettingComponent,
  AsyncChatComponent,
  AsyncCitiesEscapeProductComponent,
  AsyncAttractionProductComponent,
  AsyncCitiescapeOrderComponent,
  AsyncAttractionOrderComponent
};
