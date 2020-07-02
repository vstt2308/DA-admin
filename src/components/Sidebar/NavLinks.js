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
          menu_title: 'sidebar.tours',
          path: '/app/orders/tours',
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
          menu_title: 'sidebar.destination',
          path: '/app/masters/destination',
          new_item: false,
        },
      ]
    }
  ],
  // category6: [
  //   {
  //     menu_title: "sidebar.widgets",
  //     menu_icon: "zmdi zmdi-widgets",
  //     new_item: false,
  //     type_multi: null,
  //     child_routes: null,
  //     path: "/app/widgets",
  //   },
  // ],


  
};
