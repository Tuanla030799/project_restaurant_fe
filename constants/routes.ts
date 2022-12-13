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
  courseType: {
    generatePath: () => '/manager/course/type',
  },
  createNewCourseGeneral: {
    generatePath: () => '/manager/course/new/general',
  },
  editCourse: {
    generatePath: (id: number) => `/manager/course/${id}/edit`,
  },
  editContentCourse: {
    generatePath: (id: number) => `/manager/course/${id}/content`,
  },
  createNewScorm: {
    generatePath: () => '/manager/course/scorm/new',
  },
  editNewScorm: {
    generatePath: (id: number) => `/manager/course/scorm/${id}/edit`,
  },
  createNewCourseStep2: {
    generatePath: (id: number) => `/manager/course/new/${id}/content`,
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
