/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import AirlineReducer from './AirlineReducer';
import AssetReducer from './AssetReducer';
import authUserReducer from './AuthUserReducer';
import CategoryReducer from './CategoryReducer';
import ItineraryReducer from './ItineraryReducer';
import ContractReducer from './ContractReducer';
import CountryReducer from './CountryReducer';
import customer from './CustomerReducer';
import DestinationReducer from './DestinationReducer';
import GroupReducer from './GroupReducer';
import settings from './settings';
import sidebarReducer from './SidebarReducer';
import TourReducer from './TourReducer';
import { listProduct } from "./ProductReducer"
import ConfigReducer from './ConfigReducer';
import FileManager from './FileManagerReducer';
import ReviewReducer from './ReviewReducer';
import RulesReducer from './RulesReducer';
import FlightReducer from './FlightReducer';
import CommonReducer from './CommonReducer';
import CurrencyReducer from './CurrencyReducer';
import Email_templatesReducer from './Email_templatesReducer';
import WidgetReducer from './WidgetReducer';
import OrderTourReducer from './OrderTourReducer';
import MessagesReducer from './MessagesReducer';
import SubcribersReducer from './SubcribersReducer';
import PagesReducer from './PagesReducer';
import OfficeReducer from './OfficeReducer';
import CouponReducer from './CouponReducer';
import ActivityReducer from './ActivityReducer';
import HotelReducer from './HotelReducer';
import InquiryReducer from './InquiryReducer';
import TicketReducer from './TicketReducer';
import GuideCalendarReducer from './GuideCalendarReducer';
import GitReducer from './GitReducer';
import SendMessagesResucer from './SendMessagesResucer';
import chatAppReducer from './ChatAppReducer';
import InboxReducer from './InboxReducer';
import TicketItineraryReducer from './TicketItineraryReducer';

const reducers = combineReducers({
  settings,
  sidebar: sidebarReducer,
  config: ConfigReducer,
  authUser: authUserReducer,
  customer: customer,
  itinerary: ItineraryReducer,
  flight: FlightReducer,
  group: GroupReducer,
  asset: AssetReducer,
  category: CategoryReducer,
  destination: DestinationReducer,
  country: CountryReducer,
  ticket: TicketReducer,
  tour: TourReducer,
  hotel: HotelReducer,
  airline: AirlineReducer,
  review: ReviewReducer,
  account: AccountReducer,
  rules: RulesReducer,
  common: CommonReducer,
  listProduct,
  fileManager: FileManager,
  currency: CurrencyReducer,
  email_template: Email_templatesReducer,
  widget: WidgetReducer,
  orderTour: OrderTourReducer,
  office: OfficeReducer,
  coupon: CouponReducer,
  inquiry: InquiryReducer,
  guideCalendar: GuideCalendarReducer,
  git: GitReducer,
  messages: MessagesReducer,
  subcribers: SubcribersReducer,
  activity: ActivityReducer,
  send_messages: SendMessagesResucer,
  pages: PagesReducer,
  chatAppReducer,
  inboxReducer: InboxReducer,
  ticketitinerary:TicketItineraryReducer,

});

export default reducers;
