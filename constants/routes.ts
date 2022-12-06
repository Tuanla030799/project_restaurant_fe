export const routes = {
  home: {
    generatePath: () => '/',
  },
  detailFood: {
    generatePath: (slug: string) => `/food/${slug}`,
  },
  listFood: {
    generatePath: (status: string) => `/foods/${status}`,
  },
  explore: {
    generatePath: () => '/explore',
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
    dashboard: {
      generatePath: () => '/manager/dashboard',
    },
    courses: {
      generatePath: () => '/manager/courses',
    },
    enrollment: {
      generatePath: () => '/manager/enrollment',
    },
    exams: {
      generatePath: () => '/manager/exams',
    },
    examsSetting: {
      generatePath: (id: number) => `/manager/exams/${id}/settings`,
    },
    createNewSource: {
      generatePath: () => '/manager/source/new',
    },
    questions: {
      generatePath: () => '/manager/questions',
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
    }
  }
}
