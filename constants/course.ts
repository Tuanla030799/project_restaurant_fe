import { TCourseType } from '@/global/types'

export const COMPONENT_TYPES = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  VIDEO: 'video',
  FILE: 'attachment',
  EXAM: 'exam',
  EMBED: 'embed',
  IMAGE: 'image',
}

export const COURSE_TYPES: Record<string, TCourseType> = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  SCORM: 'scorm',
}

export const COURSE_TYPE_VALUES = {
  [COURSE_TYPES.ONLINE]: 0,
  [COURSE_TYPES.OFFLINE]: 1,
  [COURSE_TYPES.SCORM]: 2,
}

export const COURSE_STATUSES = {
  GUEST: 'guest',
  PENDING: 'pending',
  APPROVE: 'approve',
  INPROGRESS: 'inprogress',
  ARCHIVE: 'archive',
  DISCARD: 'discard',
  CANCEL: 'cancel',
}

export const COMPONENT_STATUSES = {
  NOT_YET_STARTED: 'not_yet_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  LOCK: 'lock',
}

export const COURSE_VIEWS = {
  GRID: 'grid',
  LIST: 'list',
}

export const COURSE_TABS = {
  ABOUT: 'about',
  CONTENTS: 'contents',
  INSTRUCTORS: 'instructors',
  REVIEWS: 'reviews',
  NOTES: 'notes',
  MESSAGES: 'messages',
  FAQS: 'faqs',
  SUMMARY: 'summary',
}
