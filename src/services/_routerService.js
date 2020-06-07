import Dashboard from 'Routes/dashboard';
import Orders from '../routes/orders';
import Account from '../routes/account';
import Products from '../routes/products';
import Masters from '../routes/masters';
import Settings from '../routes/settings';
import Itineraries from '../routes/itineraries';
import Reports from '../routes/reports';
import Grouping from '../routes/grouping';
import GoPandaCalendar from '../routes/calendar';
import FileManager from '../routes/fileManager';
import Loyalty from '../routes/loyalty';
import Widgets from '../routes/widgets';
import Messages from '../routes/messages';
import Pages from '../routes/pages';
import Guide from '../routes/guide';
import Vouchers from 'Routes/vouchers';
import TicketItineraries from '../routes/products/itineraries'
// import Assignment from 'Routes/assignment';
// async component
import {
   AsyncChatComponent,
} from 'Components/AsyncComponent/AsyncComponent';
// import Login from 'Routes/auth';

export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'orders',
      component: Orders
   },
   {
      path: 'account',
      component: Account
   },
   {
      path: 'products',
      component: Products
   },
   {
      path: 'masters',
      component: Masters
   },
   {
      path: 'settings',
      component: Settings
   },
   {
      path: 'reports',
      component: Reports
   },
   {
      path: 'grouping',
      component: Grouping
   },
   {
      path: 'calendar/:id',
      component: GoPandaCalendar
   },
   {
      path: 'itineraries/:id',
      component: Itineraries
   },
   {
      path: 'ticket_itineraries/:id',
      component: TicketItineraries
   },
   {
      path: 'vouchers/:id',
      component: Vouchers
   },
   {
      path: 'file-manager',
      component: FileManager
   },
   {
      path: 'messages',
      component: Messages
   },
   // {
   //    path: 'assignment',
   //    component: Assignment
   // },
   {
      path: 'loyalty',
      component: Loyalty
   },
   {
      path: 'guide',
      component: Guide
   },
   {
      path: 'widgets',
      component: Widgets
   },
   {
      path: 'pages',
      component: Pages
   },
   {
      path: 'conversation',
      component: AsyncChatComponent

   }


]