// sidebar nav links
export default {
  category1: [
    {
      menu_title: 'sidebar.dashboard',
      menu_icon: 'zmdi zmdi-view-dashboard',
      new_item: false,
      type_multi: null,
      child_routes: null,
      path: '/app/dashboard'
    }
  ],
  category2: [
    {
      menu_title: 'sidebar.orders',
      menu_icon: 'zmdi zmdi-shopping-cart',
      path: '/app/new-modules',
      type_multi: null,
      new_item: false,
      child_routes: [
        {
          menu_title: 'sidebar.attraction',
          path: '/app/orders/attraction',
          new_item: false,
        },
        {
          menu_title: 'sidebar.cities_Escape',
          path: '/app/orders/cities_escape',
          new_item: false,
        },
        {
          menu_title: 'sidebar.tours',
          path: '/app/orders/tours',
          new_item: false,
        },
        {
          menu_title: 'sidebar.flight',
          path: '/app/orders/flight',
          new_item: false,
        },
        {
          menu_title: 'sidebar.hotel',
          path: '/app/orders/hotel',
          new_item: false,
        },
        {
          menu_title: 'sidebar.inquiry',
          path: '/app/orders/inquiry',
          new_item: false,
        },
      ]
    }
  ],
  category3: [
    {
      menu_title: 'sidebar.account',
      menu_icon: 'zmdi zmdi-account-box',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.admin',
          path: '/app/account/admin',
          new_item: false,
        },
        {
          menu_title: 'sidebar.registered',
          path: '/app/account/registered',
          new_item: false,
        },
        {
          menu_title: 'sidebar.agent',
          path: '/app/account/agent',
          new_item: false,
        },
        {
          menu_title: 'sidebar.supplier',
          path: '/app/account/supplier',
          new_item: false,
        },
        {
          menu_title: 'sidebar.passenger',
          path: '/app/account/passenger',
          new_item: false,
        },
      ]
    }
  ],
  category4: [
    {
      menu_title: 'sidebar.products',
      menu_icon: 'zmdi zmdi-format-align-center',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.attraction',
          path: '/app/products/attraction',
          new_item: false,
        },
        {
          menu_title: 'sidebar.cities_Escape',
          path: '/app/products/cities_Escape',
          new_item: false,
        },
        {
          menu_title: 'sidebar.flight',
          path: '/app/products/flight',
          new_item: false,
        },
        {
          menu_title: 'sidebar.hotels',
          path: '/app/products/hotels',
          new_item: false,
        },
        {
          menu_title: 'sidebar.reviews',
          path: '/app/products/reviews',
          new_item: false,
        },
        {
          menu_title: 'sidebar.tours',
          path: '/app/products/tours',
          new_item: false,
        },
      
      ]
    }
  ],
  category5: [
    {
      menu_title: 'sidebar.masters',
      menu_icon: 'zmdi zmdi-plus-square',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.country',
          path: '/app/masters/country',
          new_item: false,
        },
        {
          menu_title: 'sidebar.category',
          path: '/app/masters/category',
          new_item: false,
        },
        {
          menu_title: 'sidebar.airlines',
          path: '/app/masters/airlines',
          new_item: false,
        },
        {
          menu_title: 'sidebar.destination',
          path: '/app/masters/destination',
          new_item: false,
        },
        {
          menu_title: 'sidebar.email_templates',
          path: '/app/masters/email_templates',
          new_item: false,
        },
        {
          menu_title: 'sidebar.currency',
          path: '/app/masters/currency',
          new_item: false,
        },
        {
          menu_title: 'sidebar.contract',
          path: '/app/masters/contract',
          new_item: false,
        },
        {
          menu_title: 'sidebar.language',
          path: '/app/masters/language',
          new_item: false,
        }
      ]
    }
  ],
  loyalty: [
    {
      menu_title: 'sidebar.loyalty',
      menu_icon: 'zmdi zmdi-group',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          path: '/app/loyalty/rules',
          menu_title: 'sidebar.rules',
          new_item: false,
        },
        {
          path: '/app/loyalty/activities',
          menu_title: 'sidebar.activities',
          new_item: false,
        },
        {
          menu_title: 'sidebar.coupon',
          path: '/app/loyalty/coupon',
          new_item: false,
        }
      ]
    }
  ],
  category6: [
    {
      menu_title: 'sidebar.grouping',
      menu_icon: 'zmdi zmdi-group',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          path: '/app/grouping/assets',
          menu_title: 'sidebar.assets',
          new_item: false,
        },
        {
          path: '/app/grouping/groups',
          menu_title: 'sidebar.groups',
          new_item: false,
        }
      ]
    }
  ],
  category7: [
    {
      menu_title: 'sidebar.settings',
      menu_icon: 'zmdi zmdi-settings',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.integration',
          path: '/app/settings/integration',
          new_item: false,
        },
        {
          menu_title: 'sidebar.config',
          path: '/app/settings/config',
          new_item: false,
        },
        {
          menu_title: 'sidebar.commonsetting',
          path: '/app/settings/commonsetting',
          new_item: false,
        },
        {
          menu_title: 'sidebar.office',
          path: '/app/settings/office',
          new_item: false,
        }
      ]
    }
  ],
  category8: [
    {
      menu_title: 'sidebar.reports',
      menu_icon: 'zmdi zmdi-alert-triangle',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.sale_reports',
          path: '/app/reports/sale_reports',
          new_item: false,
        },
        {
          menu_title: 'sidebar.customer_report',
          path: '/app/reports/customer_report',
          new_item: false,
        }
      ]
    }
  ],
  category10: [
    {
      menu_title: 'sidebar.file-manager',
      menu_icon: 'zmdi zmdi-folder-outline',
      new_item: false,
      type_multi: null,
      child_routes: null,
      path: '/app/file-manager'
    }
  ],
  category11: [
    {
      menu_title: 'sidebar.widgets',
      menu_icon: 'zmdi zmdi-widgets',
      new_item: false,
      type_multi: null,
      child_routes: null,
      path: '/app/widgets'
    }
  ],
  category12: [
    {
      menu_title: 'sidebar.messages',
      menu_icon: 'zmdi zmdi-notifications-active',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.messages',
          path: '/app/messages/messages',
          new_item: false,
        },
        {
          menu_title: 'sidebar.subcriber',
          path: '/app/messages/subcribers',
          new_item: false,
        }
      ],
      path: '/app/messages'
    }
  ],
  category13: [
    {
      menu_title: 'sidebar.pages',
      menu_icon: 'zmdi zmdi-view-list',
      new_item: false,
      type_multi: null,
      child_routes: null,
      path: '/app/pages'
    }
  ],
  category14: [
    {
      menu_title: 'sidebar.guide',
      menu_icon: 'zmdi zmdi-walk',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.guide',
          path: '/app/guide/guide',
          new_item: false,
        },
        {
          menu_title: 'sidebar.guide_calendar',
          path: '/app/guide/guide_calendar',
          new_item: false,
        },
        {
          menu_title: 'sidebar.git',
          path: '/app/guide/git',
          new_item: false,
        }
      ],
      path: '/app/guide'
    }
  ],
  category15: [
    {
      menu_title: 'sidebar.chat',
      menu_icon: 'zmdi zmdi-comments',
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: 'sidebar.conversation',
          new_item: false,
          type_multi: null,
          path: '/app/conversation'
        }
      ],

    }
  ]
};
