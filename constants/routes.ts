export const routes = {
  home: {
    generatePath: () => '/',
  },
  detailFood: {
    generatePath: (slug: string) => `/food/${slug}`,
  },
  listFood: {
    generatePath: () => `/foods`,
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
  setting: {
    general: {
      generatePath: (id: number) => `/manager/course/${id}/settings/general`,
    },
    sequence: {
      generatePath: (id: number) => `/manager/course/${id}/settings/sequence`,
    },
    roadmap: {
      generatePath: (id: number) => `/manager/course/${id}/settings/roadmap`,
    },
    authority: {
      generatePath: (id: number) => `/manager/course/${id}/settings/authority`,
    },
    display: {
      generatePath: (id: number) => `/manager/course/${id}/settings/display`,
    },
    preview: {
      generatePath: (id: number) => `/manager/course/${id}/settings/preview`,
    },
    exams: {
      generatePath: (id: number) => `/manager/course/${id}/settings/exams`,
    },
  },
  learningCourse: {
    content: {
      generatePath: (courseId: number, contentId: number | null) =>
        `/learning/${courseId}/content/${contentId}`,
    },
    attachment: {
      generatePath: (
        courseId: number,
        contentId: number,
        attachmentId: number
      ) =>
        `/learning/${courseId}/content/${contentId}/attachment/${attachmentId}`,
    },
    video: {
      generatePath: (courseId: number, contentId: number, videoId: number) =>
        `/learning/${courseId}/content/${contentId}/video/${videoId}`,
    },
  },
  learningSCORM: {
    content: {
      generatePath: (courseId: number, contentId: number | null) =>
        `/learning-scorm/${courseId}/content/${contentId}`,
    },
  },
  exam: {
    generatePath: (courseId: number, examId: number) =>
      `/learning/${courseId}/exam/${examId}`,
  },
  source: {
    edit: {
      generatePath: (sourceId: number) => `/manager/source/${sourceId}/edit`,
    },
    settings: {
      generatePath: (sourceId: number) =>
        `/manager/source/${sourceId}/settings`,
    },
  },
}
