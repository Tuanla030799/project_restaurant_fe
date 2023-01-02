export const routes = {
  home: {
    generatePath: () => '/',
  },
  detailFood: {
    generatePath: (slug: string) => `/food/${slug}`,
  },
  listFood: {
    generatePath: (slug: string) => `/foods/${slug}`,
  },
  orders: {
    generatePath: () => '/orders',
  },
  order: {
    generatePath: () => '/order',
  },
  manager: {
    orders: {
      generatePath: () => '/manager/orders',
    },
    listFood: {
      generatePath: () => `/manager/foods`,
    },
    users: {
      generatePath: () => `/manager/users`,
    },
    seats: {
      generatePath: () => `/manager/seats`,
    },
    blogs: {
      generatePath: () => `/manager/blogs`,
    },
  },
  auth: {
    login: {
      generatePath: () => '/login',
    },
    register: {
      generatePath: () => '/register',
    },
    forgot_pass: {
      generatePath: () => '/forgot-password',
    },
  },
}
