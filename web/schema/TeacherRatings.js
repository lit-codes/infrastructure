cube(`TeacherRatings`, {
  sql: `SELECT * FROM public.teacher_ratings`,
  
  joins: {
    Teacher: {
      sql: `${CUBE}.teacher_id = ${Teacher}.id`,
      relationship: `belongsTo`
    }
  },
  
  measures: {
    badRatingPercentage: {
      sql: `${badRatingCount} / 100`,
      type: `number`,
      format: `percent`
    },
    badRatingCount: {
      type: `count`,
      drillMembers: [id, badRating]
    },
    count: {
      type: `count`,
      drillMembers: [id, className, timestamp, adminReviewTimestamp]
    }
  },
  
  dimensions: {
    badRating: {
      type: `boolean`,
      case: {
        when: [
          { sql: `${CUBE}.comment like '%bad%'`, label: `t` },
          { sql: `${CUBE}.comment like '%sh*t%'`, label: `t` },
          { sql: `${CUBE}.comment like '%aweful%'`, label: `t` },
          { sql: `${CUBE}.comment like '%unpleasant%'`, label: `t` },
          { sql: `${CUBE}.comment like '%useless%'`, label: `t` },
          { sql: `${CUBE}.comment like '%boring%'`, label: `t` },
          { sql: `${CUBE}.is_retake_worthy = 'f'`, label: `t` },
        ],
        else: { label: `f` }
      }
    },
    isForCredit: {
      sql: `is_for_credit`,
      type: `string`
    },
    
    comment: {
      sql: `comment`,
      type: `string`
    },
    
    isRetakeWorthy: {
      sql: `is_retake_worthy`,
      type: `string`
    },
    
    grade: {
      sql: `grade`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    isAttendanceMandatory: {
      sql: `is_attendance_mandatory`,
      type: `string`
    },
    
    isTextbookUsed: {
      sql: `is_textbook_used`,
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
    
    isOnlineClass: {
      sql: `is_online_class`,
      type: `string`
    },
    
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    
    adminReviewTimestamp: {
      sql: `admin_review_timestamp`,
      type: `time`
    }
  }
});
