cube(`TeacherRatings`, {
  sql: `SELECT * FROM public.teacher_ratings`,
  
  joins: {
    Teacher: {
      sql: `${CUBE}.teacher_id = ${Teacher}.id`,
      relationship: `belongsTo`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [className, id, adminReviewTimestamp, timestamp]
    },
    badRatingCount: {
      type: `count`,
      drillMembers: [className, id, adminReviewTimestamp, timestamp],
      filters: [
        {
          sql: `NOT ${CUBE.isRetakeWorthy} or ${CUBE.clarity} < 2`
        }
      ],
    },
  },
  
  dimensions: {
    isOnlineClass: {
      sql: `is_online_class`,
      type: `string`
    },
    
    tags: {
      sql: `tags`,
      type: `string`
    },
    
    className: {
      sql: `class_name`,
      type: `string`
    },
    
    isAttendanceMandatory: {
      sql: `is_attendance_mandatory`,
      type: `string`
    },
    
    isTextbookUsed: {
      sql: `is_textbook_used`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    difficulty: {
      sql: `difficulty`,
      type: `number`,
    },
    
    clarity: {
      sql: `clarity`,
      type: `number`,
    },
    
    isRetakeWorthy: {
      sql: `is_retake_worthy`,
      type: `string`
    },
    
    grade: {
      sql: `grade`,
      type: `string`
    },
    
    comment: {
      sql: `comment`,
      type: `string`
    },
    
    isForCredit: {
      sql: `is_for_credit`,
      type: `string`
    },
    
    adminReviewTimestamp: {
      sql: `admin_review_timestamp`,
      type: `time`
    },
    
    timestamp: {
      sql: `timestamp`,
      type: `time`
    }
  }
});
